import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronRight,
  Check,
  Star,
  Filter,
  Package,
  Sparkles,
  X,
  ArrowLeft,
  Phone,
  Mail,
  ShoppingBag,
  Eye,
  Zap
} from 'lucide-react';


interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price?: number;
  image_url: string;
  features: string[];
  specifications?: Record<string, string>;
  category: string;
  is_featured: boolean;
  order_index: number;
}

const resolveImageSrc = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("uploads/") || path.startsWith("/uploads/")) {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    return `${API_BASE}/${path.replace(/^\/+/, '')}`;
  }

  let cleanPath = path
    .replace(/^@\//, "src/")                    // @/assets/... → src/assets/...
    .replace(/^\.?\/*src\//, "src/")            // ./src/... → src/...
    .replace(/^\.?\/*assets\//, "src/assets/"); // assets/... → src/assets/...

  try {
    return new URL(`/${cleanPath}`, import.meta.url).href;
  } catch (error) {
    console.warn("Failed to resolve image:", path);
    return path; 
  }
};

const shouldDisplayPrice = (price?: number): boolean => {
  return price !== undefined && price !== null && price > 0;
};

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: delay,
        },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(4px)' }}
      animate={controls}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/40 via-blue-400/30 to-teal-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-500/40 via-green-400/30 to-lime-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 120, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 -left-20 w-96 h-96 bg-gradient-to-r from-teal-400/30 via-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-l from-green-400/25 via-emerald-400/15 to-lime-300/10 rounded-full blur-2xl"
        animate={{
          x: [-50, 50, -30, 0],
          y: [30, -30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      {[...Array(40)].map((_, i) => {
        const colors = [
          'bg-cyan-300/20',
          'bg-teal-300/20',
          'bg-emerald-300/20',
          'bg-green-300/15',
          'bg-blue-300/15',
        ];
        return (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${colors[i % colors.length]} rounded-full`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="ecoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecoGrid)" />
      </svg>
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          animate={{ d: ["M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z", "M0,60 Q150,80 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};


const AnimatedGradientText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent bg-size-200"
      animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {text}
    </motion.span>
  );
};


const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);


  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);


  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(['All', ...data.categories]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };


  const loadProducts = async (category?: string) => {
    try {
      setLoading(true);
      const url =
        category && category !== 'All'
          ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
          : `${API_BASE}/api/products`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        
        setProducts(data);
        setDisplayedProducts(data);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    loadProducts(category);
  };


  const handleContactForPricing = () => {
    navigate('/', { replace: true });

    setTimeout(() => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };


  const featuredProducts = displayedProducts.filter((p) => p.is_featured);
  const regularProducts = displayedProducts.filter((p) => !p.is_featured);
  if (selectedProduct) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-emerald-950/95 via-teal-900/95 to-cyan-950/95 backdrop-blur-xl z-50"
        >
          <AnimatedBackground />
          <Navigation />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="pt-24 pb-20 px-4 overflow-y-auto max-h-screen relative z-10"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex justify-between items-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={() => setSelectedProduct(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
                  <span className="font-semibold">Close</span>
                </motion.button>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                >
                  <span className="text-white/80 text-sm">Product Details</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
              >
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl"></div>
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={resolveImageSrc(selectedProduct.image_url)}
                    alt={selectedProduct.name}
                    className="relative w-full h-full object-contain rounded-3xl bg-white/10 backdrop-blur-sm p-8 border border-white/20 shadow-2xl"
                    onLoad={() => console.log(`Loaded: ${selectedProduct.image_url}`)}
                    onError={(e) => {
                      console.error(`Failed: ${selectedProduct.image_url}`);
                      console.error('Attempted URL:', e.currentTarget.src);
                    }}
                  />
                  {selectedProduct.is_featured && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-6 right-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-slate-900" /> 
                      <span className="font-bold text-sm">Featured</span>
                    </motion.div>
                  )}
                </motion.div>
                <motion.div 
                  className="text-white"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.h1 
                    className="text-5xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedProduct.name}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-cyan-100 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {selectedProduct.tagline}
                  </motion.p>
                  
                  {shouldDisplayPrice(selectedProduct.price) && (
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-8"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      ${selectedProduct.price!.toFixed(2)}
                    </motion.div>
                  )}
                  
                  <motion.p 
                    className="text-cyan-50 mb-8 leading-relaxed text-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {selectedProduct.description}
                  </motion.p>
                  
                  {selectedProduct.features.length > 0 && (
                    <motion.div 
                      className="mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <h3 className="font-bold text-2xl text-white mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-emerald-300" />
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedProduct.features.map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-300/20"
                          >
                            <Check className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                            <span className="text-cyan-50">{f}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.button
                      onClick={handleContactForPricing}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2 shadow-xl font-semibold"
                    >
                      <Phone className="w-5 h-5" />
                      Contact for Pricing
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-center"
              >
                <motion.button
                  onClick={() => setSelectedProduct(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 mx-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full border border-cyan-300/30 hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold">Back to Products</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      <AnimatedBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-100/30 via-transparent to-cyan-100/30 pointer-events-none" />
      
      <Navigation />
      
      <div className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-cyan-100 backdrop-blur-sm rounded-full text-sm font-medium mb-12 border border-emerald-200/60"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </motion.div>
                <motion.span
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Explore Our Products
                </motion.span>
              </motion.div>
              <motion.h1 
                className="text-7xl md:text-8xl font-bold mb-8 leading-tight"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <AnimatedGradientText text="Sustainable Lab Solutions" />
              </motion.h1>
              
              <motion.p 
                className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Innovative, eco-friendly products for modern laboratories. 
                Experience the future of sustainable scientific solutions.
              </motion.p>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 text-teal-700 mb-2">
                <Filter className="w-5 h-5" />
                <span className="text-lg font-semibold">Categories:</span>
              </div>
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  onClick={() => handleCategoryChange(cat)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-300/50'
                      : 'bg-white/80 border border-emerald-200 text-teal-700 hover:bg-white hover:shadow-xl hover:border-emerald-300'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </AnimatedSection>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"
              />
              <p className="text-teal-700 text-lg font-medium">Loading amazing products...</p>
            </div>
          ) : (
            <>
              {featuredProducts.length > 0 && (
                <AnimatedSection delay={0.4}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mb-20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredProducts.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 40, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                          whileHover={{ y: -12, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            onClick={() => setSelectedProduct(product)}
                            className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100/60 to-cyan-100/60 backdrop-blur-md cursor-pointer"
                          >
               
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-emerald-300/40 via-cyan-300/40 to-teal-300/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              layoutId={`border-${product.id}`}
                            />
                            
                            <div className="relative aspect-square bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 flex items-center justify-center overflow-hidden">
                              <motion.img
                                whileHover={{ scale: 1.1, rotate: 3 }}
                                transition={{ duration: 0.6 }}
                                src={resolveImageSrc(product.image_url)}
                                alt={product.name}
                                className="object-contain w-full h-full group-hover:drop-shadow-2xl transition-all duration-500"
                                onLoad={() => console.log(` Loaded featured: ${product.image_url}`)}
                                onError={(e) => {
                                  console.error(` Failed to load featured: ${product.image_url}`);
                                  console.error('Attempted URL:', e.currentTarget.src);
                                }}
                              />
                              
                              <motion.div 
                                className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 text-xs px-3 py-2 rounded-full flex items-center gap-1 shadow-lg"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Star className="w-3 h-3 fill-slate-900" /> Featured
                              </motion.div>

                    
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileHover={{ scale: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="bg-white/90 backdrop-blur-sm rounded-full p-3"
                                >
                                  <Eye className="w-6 h-6 text-emerald-600" />
                                </motion.div>
                              </motion.div>
                            </div>
                            
                            <CardContent className="relative p-6">
                              <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">
                                {product.name}
                              </h3>
                              <p className="text-teal-700 mb-4 text-sm line-clamp-2 leading-relaxed">
                                {product.tagline}
                              </p>
                              <motion.button 
                                className="text-emerald-600 font-semibold flex items-center gap-2 text-sm group-hover:gap-3 transition-all duration-300"
                                whileHover={{ x: 5 }}
                              >
                                View Details 
                                <ChevronRight className="w-4 h-4" />
                              </motion.button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatedSection>
              )}

              <AnimatedSection delay={0.6}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-12">
                    <ShoppingBag className="w-8 h-8 text-emerald-600" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                      All Products
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          onClick={() => setSelectedProduct(product)}
                          className="group border border-emerald-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md cursor-pointer"
                        >
                          <div className="relative aspect-square bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.4 }}
                              src={resolveImageSrc(product.image_url)}
                              alt={product.name}
                              className="object-contain w-full h-full p-6 group-hover:drop-shadow-lg transition-all duration-300"
                              onLoad={() => console.log(`Loaded: ${product.image_url}`)}
                              onError={(e) => {
                                console.error(` Failed to load: ${product.image_url}`);
                                console.error('Attempted URL:', e.currentTarget.src);
                              }}
                            />

                            {/* Hover Overlay */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-emerald-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                              >
                                <Eye className="w-5 h-5 text-emerald-600" />
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-teal-700 mb-3 text-sm line-clamp-2 leading-relaxed">
                              {product.tagline}
                            </p>
                            <motion.button 
                              className="text-emerald-600 font-semibold flex items-center gap-1 text-sm group-hover:gap-2 transition-all duration-300"
                              whileHover={{ x: 3 }}
                            >
                              Learn More <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>

              
              {displayedProducts.length === 0 && (
                <AnimatedSection>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-32"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Package className="w-24 h-24 text-emerald-200 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-emerald-800 mb-4">
                      No products found
                    </h3>
                    <p className="text-teal-700 text-lg">
                      {selectedCategory !== 'All'
                        ? `No products in "${selectedCategory}" category.`
                        : 'Products will appear here once added.'}
                    </p>
                  </motion.div>
                </AnimatedSection>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
