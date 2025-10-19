# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
# from typing import List
# from config import config
# import logging

# # Email configuration
# conf = ConnectionConfig(
#     MAIL_USERNAME=config.MAIL_USERNAME,
#     MAIL_PASSWORD=config.MAIL_PASSWORD,
#     MAIL_FROM=config.MAIL_FROM,
#     MAIL_PORT=config.MAIL_PORT,
#     MAIL_SERVER=config.MAIL_SERVER,
#     MAIL_STARTTLS=config.MAIL_STARTTLS,
#     MAIL_SSL_TLS=config.MAIL_SSL_TLS,
#     USE_CREDENTIALS=True,
#     VALIDATE_CERTS=True
# )

# # Initialize FastMail
# fastmail = FastMail(conf)

# async def send_contact_email(name: str, email: str, message: str):
#     """Send contact form email to admin"""
#     try:
#         # Email content
#         html_content = f"""
#         <html>
#         <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
#             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
#                 <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
#                     New Contact Form Submission - BioLabMate
#                 </h2>
                
#                 <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
#                     <p><strong>Name:</strong> {name}</p>
#                     <p><strong>Email:</strong> {email}</p>
#                 </div>
                
#                 <div style="margin: 20px 0;">
#                     <h3 style="color: #2c5530;">Message:</h3>
#                     <div style="background-color: #f0f8f0; padding: 15px; border-left: 4px solid #2c5530; border-radius: 0 5px 5px 0;">
#                         {message.replace(chr(10), '<br>')}
#                     </div>
#                 </div>
                
#                 <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
#                     <p>This email was sent from the BioLabMate contact form.</p>
#                     <p>Please respond directly to: {email}</p>
#                 </div>
#             </div>
#         </body>
#         </html>
#         """
        
#         # Create message
#         message_schema = MessageSchema(
#             subject=f"New Contact Form Submission from {name}",
#             recipients=[config.CONTACT_EMAIL],
#             body=html_content,
#             subtype="html"
#         )
        
#         # Send email
#         await fastmail.send_message(message_schema)
#         logging.info(f"Contact email sent successfully for {name} ({email})")
#         return True
        
#     except Exception as e:
#         logging.error(f"Failed to send contact email: {str(e)}")
#         raise Exception(f"Failed to send email: {str(e)}")

# async def send_notification_email(subject: str, content: str, recipients: List[str]):
#     """Send notification email (for future use)"""
#     try:
#         html_content = f"""
#         <html>
#         <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
#             <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
#                 <h2 style="color: #2c5530;">BioLabMate Notification</h2>
#                 <div style="margin: 20px 0;">
#                     {content}
#                 </div>
#             </div>
#         </body>
#         </html>
#         """
        
#         message_schema = MessageSchema(
#             subject=subject,
#             recipients=recipients,
#             body=html_content,
#             subtype="html"
#         )
        
#         await fastmail.send_message(message_schema)
#         return True
        
#     except Exception as e:
#         logging.error(f"Failed to send notification email: {str(e)}")
#         raise Exception(f"Failed to send email: {str(e)}")


# # import smtplib
# # import logging
# # from email.mime.text import MIMEText
# # from email.mime.multipart import MIMEMultipart
# # from config import config

# # logger = logging.getLogger(__name__)

# # def send_contact_email_sync(name: str, email: str, message: str):
# #     """Simple synchronous email sending"""
# #     try:
# #         # Create message
# #         msg = MIMEMultipart()
# #         msg['From'] = config.MAIL_FROM
# #         msg['To'] = config.CONTACT_EMAIL
# #         msg['Subject'] = f"Contact Form: {name}"
        
# #         # Email body
# #         body = f"""
# # BioLabMate Contact Form Submission

# # Name: {name}
# # Email: {email}

# # Message:
# # {message}

# # ---
# # Sent from BioLabMate website
# # """
        
# #         msg.attach(MIMEText(body, 'plain'))
        
# #         # Send via Gmail
# #         with smtplib.SMTP('smtp.gmail.com', 587) as server:
# #             server.starttls()
# #             server.login(config.MAIL_USERNAME, config.MAIL_PASSWORD)
# #             server.sendmail(config.MAIL_FROM, config.CONTACT_EMAIL, msg.as_string())
        
# #         logger.info(f"✅ Email sent successfully from {email}")
# #         return True
        
# #     except Exception as e:
# #         logger.error(f" Email failed: {str(e)}")
# #         return False

# # # Async wrapper for FastAPI
# # async def send_contact_email(name: str, email: str, message: str):
# #     """Async wrapper for contact email"""
# #     return send_contact_email_sync(name, email, message)