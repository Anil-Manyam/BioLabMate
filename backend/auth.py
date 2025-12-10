from datetime import datetime, timedelta
from typing import Optional, List
import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config import config
from models import TokenData, UserRole

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def authenticate_admin(username: str, password: str) -> bool:
    """Authenticate admin user (legacy support)"""
    if username != config.ADMIN_USERNAME:
        return False
    
    if password != config.ADMIN_PASSWORD:
        return False
    
    return True

async def authenticate_user(database, username: str, password: str) -> Optional[dict]:
    """Authenticate user against database"""
    if username == config.ADMIN_USERNAME and password == config.ADMIN_PASSWORD:
        return {
            "_id": "default_admin",
            "username": config.ADMIN_USERNAME,
            "full_name": "Default Admin",
            "role": UserRole.SUPER_ADMIN,
            "email": "admin@biolabmate.com",
            "is_active": True
        }
    
    user = await database.users.find_one({"username": username, "is_active": True})
    if not user:
        return None
    
    if not verify_password(password, user["password_hash"]):
        return None
    
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token = credentials.credentials
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        username: str = payload.get("sub")
        user_id: str = payload.get("user_id")
        role: str = payload.get("role")
        
        if username is None:
            raise credentials_exception
            
        token_data = TokenData(username=username, user_id=user_id, role=role)
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise credentials_exception
    
    return token_data

async def get_current_admin(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Get current authenticated admin"""
    if current_user.role not in [UserRole.ADMIN, UserRole.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions. Admin access required."
        )
    return current_user

async def get_current_super_admin(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Get current authenticated super admin"""
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions. Super admin access required."
        )
    return current_user

def check_permission(user_role: UserRole, required_roles: List[UserRole]) -> bool:
    """Check if user has required permissions"""
    return user_role in required_roles

def require_roles(required_roles: List[UserRole]):
    """Decorator to require specific roles"""
    def role_checker(current_user: TokenData = Depends(get_current_user)) -> TokenData:
        if not check_permission(current_user.role, required_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions. Required roles: {[role.value for role in required_roles]}"
            )
        return current_user
    return role_checker

admin_required = require_roles([UserRole.ADMIN, UserRole.SUPER_ADMIN])
super_admin_required = require_roles([UserRole.SUPER_ADMIN])

PERMISSIONS = {
    "blog": {
        "create": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "read": [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "update": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "delete": [UserRole.SUPER_ADMIN]
    },
    "team": {
        "create": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "read": [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "update": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "delete": [UserRole.SUPER_ADMIN]
    },
    "user": {
        "create": [UserRole.SUPER_ADMIN],
        "read": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "update": [UserRole.SUPER_ADMIN],
        "delete": [UserRole.SUPER_ADMIN]
    },
    "milestone": {
        "create": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "read": [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "update": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "delete": [UserRole.SUPER_ADMIN]
    },
    "contact": {
        "read": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "update": [UserRole.ADMIN, UserRole.SUPER_ADMIN],
        "delete": [UserRole.SUPER_ADMIN]
    }
}

def check_operation_permission(user_role: UserRole, resource: str, operation: str) -> bool:
    """Check if user has permission for specific operation on resource"""
    if resource not in PERMISSIONS or operation not in PERMISSIONS[resource]:
        return False
    
    return user_role in PERMISSIONS[resource][operation]

def require_operation_permission(resource: str, operation: str):
    """Decorator to require specific operation permission"""
    def permission_checker(current_user: TokenData = Depends(get_current_user)) -> TokenData:
        if not check_operation_permission(current_user.role, resource, operation):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions for {operation} operation on {resource}"
            )
        return current_user
    return permission_checker