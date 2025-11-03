// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowLeft, CheckCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import ProductImage from '@/assets/Product.jpg';

// const Product = () => {
//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

//   const products = [
//     {
//       id: 1,
//       name: 'Bio-Rad PCR Plates',
//       description: 'High-quality Bio-Rad PCR plates designed for reliable and consistent performance in PCR and qPCR experiments. These plates ensure accurate sample handling, excellent thermal transfer, and compatibility with most PCR instruments, making them ideal for molecular biology research and diagnostics.',
//       features: ['96-well format', 'Optical clarity', 'Thermal stability', 'Compatible with most instruments']
//     },
//     {
//       id: 2,
//       name: 'Thermo-Manual Clip Tips',
//       description: 'Precision pipette tips engineered for secure fitting and leak-free performance. Thermo-manual clip tips provide accuracy, consistency, and ease of use in liquid handling, reducing contamination risk and ensuring reliable results in every experiment.',
//       features: ['Universal fit', 'Leak-proof design', 'Sterile packaging', 'Low retention']
//     },
//     {
//       id: 3,
//       name: 'Centrifuge Tubes',
//       description: 'Durable, high-strength centrifuge tubes suitable for a wide range of laboratory applications. These tubes are designed to withstand high-speed centrifugation, ensuring sample safety, clarity, and convenience for routine lab use.',
//       features: ['High-speed compatible', 'Graduated markings', 'Screw cap design', 'Autoclavable']
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       {/* Navigation Back Button */}
//       <div className="fixed top-6 left-6 z-50">
//         <Link
//           to="/"
//           className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 group"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           <span>Back to Home</span>
//         </Link>
//       </div>

//       {/* Hero Section */}
//       <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//               Our <span className="text-blue-400">Products</span>
//             </h1>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Discover our premium laboratory equipment designed for precision, reliability, and exceptional performance
//             </p>
//           </motion.div>

//           {/* Main Product Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="relative mb-20"
//           >
//                          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//                <img
//                  src={ProductImage}
//                  alt="Laboratory Products"
//                  className="w-full h-[400px] md:h-[500px] object-cover"
//                />
//              </div>
//           </motion.div>

//           {/* Products Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
//                 onMouseEnter={() => setHoveredProduct(product.id)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//                 className="group relative"
//               >
//                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
//                                      {/* Product Header */}
//                    <div className="mb-4">
//                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
//                        {product.name}
//                      </h3>
//                    </div>

//                   {/* Product Description */}
//                   <p className="text-gray-300 mb-6 leading-relaxed">
//                     {product.description}
//                   </p>

//                   {/* Features List */}
//                   <div className="mb-6">
//                     <h4 className="text-white font-semibold mb-3">Key Features:</h4>
//                     <ul className="space-y-2">
//                       {product.features.map((feature, featureIndex) => (
//                         <li key={featureIndex} className="flex items-center space-x-2">
//                           <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
//                           <span className="text-sm text-gray-300">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                                      {/* Hover Effect Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Call to Action */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="text-center mt-20"
//           >
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//               <h3 className="text-3xl font-bold text-white mb-4">
//                 Ready to Get Started?
//               </h3>
//               <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
//                 Contact our team to learn more about our products and how they can enhance your laboratory workflow.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
//               >
//                 Contact Us Today
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;







// // new product with backend and product image issue resloved
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   ChevronRight,
//   Check,
//   Star,
//   Filter,
//   Package,
//   Sparkles,
//   X
// } from 'lucide-react';


// interface Product {
//   id: string;
//   name: string;
//   tagline: string;
//   description: string;
//   price?: number;
//   image_url: string;
//   features: string[];
//   specifications?: Record<string, string>;
//   category: string;
//   is_featured: boolean;
//   order_index: number;
// }


// // ✅ Helper function: resolves both local & remote image URLs
// const resolveImageSrc = (path: string) => {
//   if (!path) return "";

//   // Remote URLs - return as-is
//   if (path.startsWith("http://") || path.startsWith("https://")) {
//     return path;
//   }

//   // Backend-served images (uploads folder)
//   if (path.startsWith("uploads/") || path.startsWith("/uploads/")) {
//     const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
//     return `${API_BASE}/${path.replace(/^\/+/, '')}`;
//   }

//   // Local asset paths: @/assets/... or src/assets/...
//   let cleanPath = path
//     .replace(/^@\//, "src/")                    // @/assets/... → src/assets/...
//     .replace(/^\.?\/*src\//, "src/")            // ./src/... → src/...
//     .replace(/^\.?\/*assets\//, "src/assets/"); // assets/... → src/assets/...

//   try {
//     // Vite's special asset resolution
//     return new URL(`/${cleanPath}`, import.meta.url).href;
//   } catch (error) {
//     console.warn("⚠️ Failed to resolve image:", path);
//     return path; // Fallback to original path
//   }
// };

// // ✅ Helper function: check if price should be displayed
// const shouldDisplayPrice = (price?: number): boolean => {
//   return price !== undefined && price !== null && price > 0;
// };


// const Products = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);


//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


//   useEffect(() => {
//     loadCategories();
//     loadProducts();
//   }, []);


//   const loadCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/api/products/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(['All', ...data.categories]);
//       }
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//     }
//   };


//   const loadProducts = async (category?: string) => {
//     try {
//       setLoading(true);
//       const url =
//         category && category !== 'All'
//           ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
//           : `${API_BASE}/api/products`;

//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
        
//         // ✅ Just set the data directly - let resolveImageSrc handle path resolution
//         setProducts(data);
//         setDisplayedProducts(data);
//       }
//     } catch (err) {
//       console.error('Error loading products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     loadProducts(category);
//   };


//   const featuredProducts = displayedProducts.filter((p) => p.is_featured);
//   const regularProducts = displayedProducts.filter((p) => !p.is_featured);


//   // Product Detail Modal
//   if (selectedProduct) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
//         <Navigation />
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="pt-24 pb-20"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <button
//               onClick={() => setSelectedProduct(null)}
//               data-cursor="clickable"
//               className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors"
//             >
//               <X className="w-5 h-5 mr-2" /> Close
//             </button>
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-12"
//             >
//               <div className="relative">
//                 <motion.img
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                   src={resolveImageSrc(selectedProduct.image_url)}
//                   alt={selectedProduct.name}
//                   className="w-full h-full object-contain rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 shadow-lg"
//                   onLoad={() => console.log(`✅ Loaded: ${selectedProduct.image_url}`)}
//                   onError={(e) => {
//                     console.error(`❌ Failed: ${selectedProduct.image_url}`);
//                     console.error('Attempted URL:', e.currentTarget.src);
//                   }}
//                 />
//                 {selectedProduct.is_featured && (
//                   <div className="absolute top-4 right-4 bg-primary text-white rounded-full px-3 py-1 flex items-center gap-1">
//                     <Star className="w-3 h-3 fill-white" /> Featured
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-900 mb-3">
//                   {selectedProduct.name}
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-4">
//                   {selectedProduct.tagline}
//                 </p>
//                 {shouldDisplayPrice(selectedProduct.price) && (
//                   <div className="text-3xl font-bold text-primary mb-6">
//                     ${selectedProduct.price!.toFixed(2)}
//                   </div>
//                 )}
//                 <p className="text-gray-700 mb-6 leading-relaxed">
//                   {selectedProduct.description}
//                 </p>
//                 {selectedProduct.features.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="font-bold text-xl text-gray-900 mb-3">
//                       Key Features
//                     </h3>
//                     <ul className="space-y-2">
//                       {selectedProduct.features.map((f, i) => (
//                         <motion.li
//                           key={i}
//                           initial={{ x: -10, opacity: 0 }}
//                           animate={{ x: 0, opacity: 1 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="flex items-center gap-2 text-gray-700"
//                         >
//                           <Check className="w-4 h-4 text-green-500" /> {f}
//                         </motion.li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {/* <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
//                   Contact for Pricing <ChevronRight className="w-4 h-4" />
//                 </button> */}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//         <Footer />
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
//       <Navigation />
//       <div className="pt-24 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', duration: 0.6 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
//             >
//               <Sparkles className="w-4 h-4" /> Explore Our Range
//             </motion.div>
//             <h1 className="text-5xl font-bold text-gray-900 mb-4">
//               Sustainable Lab Solutions
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Innovative, eco-friendly products for modern laboratories
//             </p>
//           </motion.div>


//           {/* Category Filters */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="flex flex-wrap justify-center gap-3 mb-12"
//           >
//             <div className="flex items-center gap-2 text-gray-600">
//               <Filter className="w-4 h-4" />{' '}
//               <span className="text-sm font-medium">Category:</span>
//             </div>
//             {categories.map((cat, i) => (
//               <motion.button
//                 key={cat}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.3 + i * 0.05 }}
//                 onClick={() => handleCategoryChange(cat)}
//                 data-cursor="clickable"
//                 className={`px-5 py-2 rounded-full font-medium transition-all ${
//                   selectedCategory === cat
//                     ? 'bg-primary text-white shadow-lg'
//                     : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {cat}
//               </motion.button>
//             ))}
//           </motion.div>


//           {loading ? (
//             <div className="flex justify-center py-20">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, duration: 1 }}
//                 className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
//               />
//             </div>
//           ) : (
//             <>
//               {featuredProducts.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="mb-16"
//                 >
//                   <div className="flex items-center gap-3 mb-8">
//                     <Star className="w-6 h-6 text-primary fill-primary" />
//                     <h2 className="text-3xl font-bold text-gray-900">
//                       Featured Products
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {featuredProducts.map((product, i) => (
//                       <motion.div
//                         key={product.id}
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5 + i * 0.1 }}
//                         whileHover={{ y: -8 }}
//                       >
//                         <Card
//                           onClick={() => setSelectedProduct(product)}
//                           data-cursor="clickable"
//                           className="group border border-transparent hover:border-primary/40 hover:shadow-xl transition-all rounded-2xl overflow-hidden"
//                         >
//                           <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
//                             <motion.img
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.6 }}
//                               src={resolveImageSrc(product.image_url)}
//                               alt={product.name}
//                               className="object-contain w-full h-full p-6"
//                               onLoad={() => console.log(`✅ Loaded featured: ${product.image_url}`)}
//                               onError={(e) => {
//                                 console.error(`❌ Failed to load featured: ${product.image_url}`);
//                                 console.error('Attempted URL:', e.currentTarget.src);
//                               }}
//                             />
//                             <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                               <Star className="w-3 h-3 fill-white" /> Featured
//                             </div>
//                           </div>
//                           <CardContent className="p-6">
//                             <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
//                               {product.name}
//                             </h3>
//                             <p className="text-gray-600 mb-3 text-sm line-clamp-2">
//                               {product.tagline}
//                             </p>
//                             <button className="text-primary font-medium flex items-center gap-1 text-sm hover:gap-2 transition-all">
//                               View Details <ChevronRight className="w-4 h-4" />
//                             </button>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}


//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <div className="flex items-center gap-3 mb-8">
//                   <Package className="w-6 h-6 text-gray-600" />
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     All Products
//                   </h2>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {regularProducts.map((product, i) => (
//                     <motion.div
//                       key={product.id}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7 + i * 0.1 }}
//                       whileHover={{ y: -8 }}
//                     >
//                       <Card
//                         onClick={() => setSelectedProduct(product)}
//                         data-cursor="clickable"
//                         className="group border border-gray-200 hover:border-primary/40 hover:shadow-lg transition-all rounded-2xl overflow-hidden"
//                       >
//                         <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
//                           <motion.img
//                             whileHover={{ scale: 1.05 }}
//                             transition={{ duration: 0.6 }}
//                             src={resolveImageSrc(product.image_url)}
//                             alt={product.name}
//                             className="object-contain w-full h-full p-6"
//                             onLoad={() => console.log(`✅ Loaded: ${product.image_url}`)}
//                             onError={(e) => {
//                               console.error(`❌ Failed to load: ${product.image_url}`);
//                               console.error('Attempted URL:', e.currentTarget.src);
//                             }}
//                           />
//                         </div>
//                         <CardContent className="p-6">
//                           <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
//                             {product.name}
//                           </h3>
//                           <p className="text-gray-600 mb-3 text-sm line-clamp-2">
//                             {product.tagline}
//                           </p>
//                           <button className="text-primary font-medium flex items-center gap-1 text-sm hover:gap-2 transition-all">
//                             Learn More <ChevronRight className="w-4 h-4" />
//                           </button>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>


//               {displayedProducts.length === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center py-20"
//                 >
//                   <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                     No products found
//                   </h3>
//                   <p className="text-gray-600">
//                     {selectedCategory !== 'All'
//                       ? `No products in "${selectedCategory}" category.`
//                       : 'Products will appear here once added.'}
//                   </p>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };


// export default Products;









// // everything above with animated background and section
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useInView } from 'react-intersection-observer';
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   ChevronRight,
//   Check,
//   Star,
//   Filter,
//   Package,
//   Sparkles,
//   X,
//   ArrowLeft,
//   Phone,
//   Mail,
//   ShoppingBag,
//   Eye,
//   Zap
// } from 'lucide-react';


// interface Product {
//   id: string;
//   name: string;
//   tagline: string;
//   description: string;
//   price?: number;
//   image_url: string;
//   features: string[];
//   specifications?: Record<string, string>;
//   category: string;
//   is_featured: boolean;
//   order_index: number;
// }


// // ✅ Helper function: resolves both local & remote image URLs
// const resolveImageSrc = (path: string) => {
//   if (!path) return "";

//   // Remote URLs - return as-is
//   if (path.startsWith("http://") || path.startsWith("https://")) {
//     return path;
//   }

//   // Backend-served images (uploads folder)
//   if (path.startsWith("uploads/") || path.startsWith("/uploads/")) {
//     const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
//     return `${API_BASE}/${path.replace(/^\/+/, '')}`;
//   }

//   // Local asset paths: @/assets/... or src/assets/...
//   let cleanPath = path
//     .replace(/^@\//, "src/")                    // @/assets/... → src/assets/...
//     .replace(/^\.?\/*src\//, "src/")            // ./src/... → src/...
//     .replace(/^\.?\/*assets\//, "src/assets/"); // assets/... → src/assets/...

//   try {
//     // Vite's special asset resolution
//     return new URL(`/${cleanPath}`, import.meta.url).href;
//   } catch (error) {
//     console.warn("⚠️ Failed to resolve image:", path);
//     return path; // Fallback to original path
//   }
// };

// // ✅ Helper function: check if price should be displayed
// const shouldDisplayPrice = (price?: number): boolean => {
//   return price !== undefined && price !== null && price > 0;
// };

// /**
//  * 🌟 AnimatedSection with parallax and blur effects
//  */
// const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         filter: 'blur(0px)',
//         transition: {
//           duration: 0.8,
//           ease: [0.25, 0.1, 0.25, 1],
//           delay: delay,
//         },
//       });
//     }
//   }, [controls, inView, delay]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(4px)' }}
//       animate={controls}
//       className="relative w-full"
//     >
//       {children}
//     </motion.div>
//   );
// };

// /**
//  * 🎨 Animated Background Elements
//  */
// const AnimatedBackground = () => {
//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Large Animated Orbs */}
//       <motion.div
//         className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-full blur-3xl"
//         animate={{
//           x: [0, 100, -50, 0],
//           y: [0, -100, 50, 0],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
      
//       <motion.div
//         className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/30 to-purple-500/20 rounded-full blur-3xl"
//         animate={{
//           x: [0, -80, 60, 0],
//           y: [0, 120, -60, 0],
//         }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       <motion.div
//         className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-3xl"
//         animate={{
//           x: [0, 100, -100, 0],
//           y: [0, 50, -50, 0],
//         }}
//         transition={{
//           duration: 22,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.5,
//         }}
//       />

//       {/* Floating Particles */}
//       {[...Array(30)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-primary/20 rounded-full"
//           initial={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//           }}
//           animate={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             opacity: [0.3, 0.8, 0.3],
//           }}
//           transition={{
//             duration: Math.random() * 15 + 15,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       ))}

//       {/* Grid Pattern */}
//       <svg className="absolute inset-0 w-full h-full opacity-5">
//         <defs>
//           <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
//             <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   );
// };

// /**
//  * 🎨 Gradient Animated Text
//  */
// const AnimatedGradientText = ({ text }: { text: string }) => {
//   return (
//     <motion.span
//       className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent bg-size-200"
//       animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
//       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//       style={{
//         backgroundSize: '200% 200%',
//       }}
//     >
//       {text}
//     </motion.span>
//   );
// };


// const Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);


//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


//   useEffect(() => {
//     loadCategories();
//     loadProducts();
//   }, []);


//   const loadCategories = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/api/products/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(['All', ...data.categories]);
//       }
//     } catch (err) {
//       console.error('Error fetching categories:', err);
//     }
//   };


//   const loadProducts = async (category?: string) => {
//     try {
//       setLoading(true);
//       const url =
//         category && category !== 'All'
//           ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
//           : `${API_BASE}/api/products`;

//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
        
//         setProducts(data);
//         setDisplayedProducts(data);
//       }
//     } catch (err) {
//       console.error('Error loading products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     loadProducts(category);
//   };

//   // ✅ Enhanced Contact Navigation
//   const handleContactForPricing = () => {
//     // Navigate to home page
//     navigate('/', { replace: true });
    
//     // Wait for navigation and scroll
//     setTimeout(() => {
//       const contactSection = document.querySelector('#contact');
//       if (contactSection) {
//         contactSection.scrollIntoView({ 
//           behavior: 'smooth',
//           block: 'start'
//         });
//       }
//     }, 300);
//   };


//   const featuredProducts = displayedProducts.filter((p) => p.is_featured);
//   const regularProducts = displayedProducts.filter((p) => !p.is_featured);


//   // ✅ Enhanced Product Detail Modal
//   if (selectedProduct) {
//     return (
//       <AnimatePresence>
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl z-50"
//         >
//           <AnimatedBackground />
//           <Navigation />
          
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ type: "spring", duration: 0.6 }}
//             className="pt-24 pb-20 px-4 overflow-y-auto max-h-screen relative z-10"
//           >
//             <div className="max-w-7xl mx-auto">
//               {/* ✅ Enhanced Close Button */}
//               <motion.div 
//                 className="flex justify-between items-center mb-8"
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <motion.button
//                   onClick={() => setSelectedProduct(null)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
//                   <span className="font-semibold">Close</span>
//                 </motion.button>
                
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.3, type: "spring" }}
//                   className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
//                 >
//                   <span className="text-white/80 text-sm">Product Details</span>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 initial={{ y: 40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
//               >
//                 {/* Product Image */}
//                 <motion.div 
//                   className="relative group"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-xl"></div>
//                   <motion.img
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     src={resolveImageSrc(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="relative w-full h-full object-contain rounded-3xl bg-white/10 backdrop-blur-sm p-8 border border-white/20 shadow-2xl"
//                     onLoad={() => console.log(`✅ Loaded: ${selectedProduct.image_url}`)}
//                     onError={(e) => {
//                       console.error(`❌ Failed: ${selectedProduct.image_url}`);
//                       console.error('Attempted URL:', e.currentTarget.src);
//                     }}
//                   />
//                   {selectedProduct.is_featured && (
//                     <motion.div 
//                       initial={{ scale: 0, rotate: -45 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ delay: 0.5, type: "spring" }}
//                       className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
//                     >
//                       <Star className="w-4 h-4 fill-black" /> 
//                       <span className="font-bold text-sm">Featured</span>
//                     </motion.div>
//                   )}
//                 </motion.div>

//                 {/* Product Info */}
//                 <motion.div 
//                   className="text-white"
//                   initial={{ x: 40, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <motion.h1 
//                     className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     {selectedProduct.name}
//                   </motion.h1>
                  
//                   <motion.p 
//                     className="text-xl text-gray-300 mb-6"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     {selectedProduct.tagline}
//                   </motion.p>
                  
//                   {shouldDisplayPrice(selectedProduct.price) && (
//                     <motion.div 
//                       className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8"
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ delay: 0.7, type: "spring" }}
//                     >
//                       ${selectedProduct.price!.toFixed(2)}
//                     </motion.div>
//                   )}
                  
//                   <motion.p 
//                     className="text-gray-300 mb-8 leading-relaxed text-lg"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                   >
//                     {selectedProduct.description}
//                   </motion.p>
                  
//                   {selectedProduct.features.length > 0 && (
//                     <motion.div 
//                       className="mb-8"
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.9 }}
//                     >
//                       <h3 className="font-bold text-2xl text-white mb-4 flex items-center gap-2">
//                         <Zap className="w-6 h-6 text-primary" />
//                         Key Features
//                       </h3>
//                       <div className="grid grid-cols-1 gap-3">
//                         {selectedProduct.features.map((f, i) => (
//                           <motion.div
//                             key={i}
//                             initial={{ x: -20, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             transition={{ delay: 1 + i * 0.1 }}
//                             className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//                           >
//                             <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
//                             <span className="text-gray-200">{f}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
                  
//                   {/* Action Buttons */}
//                   <motion.div 
//                     className="flex flex-col sm:flex-row gap-4"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 1.2 }}
//                   >
//                     <motion.button
//                       onClick={handleContactForPricing}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="flex-1 py-4 bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl hover:from-primary/90 hover:to-blue-500/90 transition-all flex items-center justify-center gap-2 shadow-xl font-semibold"
//                     >
//                       <Phone className="w-5 h-5" />
//                       Contact for Pricing
//                       <ChevronRight className="w-5 h-5" />
//                     </motion.button>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               {/* ✅ Back to Products Button */}
//               <motion.div
//                 initial={{ y: 40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.3 }}
//                 className="text-center"
//               >
//                 <motion.button
//                   onClick={() => setSelectedProduct(null)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group flex items-center gap-3 mx-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
//                 >
//                   <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
//                   <span className="font-semibold">Back to Products</span>
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 relative overflow-hidden">
//       {/* ✅ Enhanced Animated Background */}
//       <AnimatedBackground />

//       {/* Gradient Overlay */}
//       <div className="fixed inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />
      
//       <Navigation />
      
//       <div className="relative pt-24 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* ✅ Enhanced Hero Section - All in One Line */}
//           <AnimatedSection>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-center mb-20"
//             >
//               {/* ✅ Explore Our Range with Same Animations as Before */}
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ type: 'spring', duration: 1, delay: 0.2 }}
//                 className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-12 border border-primary/30"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
//                 >
//                   <Sparkles className="w-5 h-5 text-primary" />
//                 </motion.div>
//                 <motion.span
//                   className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold"
//                   animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   style={{ backgroundSize: '200% 200%' }}
//                 >
//                   Explore Our Range
//                 </motion.span>
//               </motion.div>
              
//               {/* ✅ Main Heading - All in One Line */}
//               <motion.h1 
//                 className="text-7xl md:text-8xl font-bold mb-8 leading-tight"
//                 initial={{ y: 40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.4, duration: 0.8 }}
//               >
//                 <AnimatedGradientText text="Sustainable Lab Solutions" />
//               </motion.h1>
              
//               <motion.p 
//                 className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.8 }}
//               >
//                 Innovative, eco-friendly products for modern laboratories. 
//                 Experience the future of sustainable scientific solutions.
//               </motion.p>
//             </motion.div>
//           </AnimatedSection>

//           {/* ✅ Enhanced Category Filters */}
//           <AnimatedSection delay={0.2}>
//             <motion.div
//               className="flex flex-wrap justify-center gap-4 mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <div className="flex items-center gap-3 text-slate-400 mb-2">
//                 <Filter className="w-5 h-5" />
//                 <span className="text-lg font-semibold">Categories:</span>
//               </div>
//               {categories.map((cat, i) => (
//                 <motion.button
//                   key={cat}
//                   initial={{ opacity: 0, scale: 0.8, y: 20 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
//                   onClick={() => handleCategoryChange(cat)}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm ${
//                     selectedCategory === cat
//                       ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-primary/50'
//                       : 'bg-white/10 border border-white/20 text-slate-200 hover:bg-white/20 hover:shadow-xl hover:border-primary/50'
//                   }`}
//                 >
//                   {cat}
//                 </motion.button>
//               ))}
//             </motion.div>
//           </AnimatedSection>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-32">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, duration: 1 }}
//                 className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4"
//               />
//               <p className="text-slate-300 text-lg">Loading amazing products...</p>
//             </div>
//           ) : (
//             <>
//               {/* ✅ Featured Products - No Title */}
//               {featuredProducts.length > 0 && (
//                 <AnimatedSection delay={0.4}>
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.1 }}
//                     className="mb-20"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                       {featuredProducts.map((product, i) => (
//                         <motion.div
//                           key={product.id}
//                           initial={{ opacity: 0, y: 40, scale: 0.9 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
//                           whileHover={{ y: -12, scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <Card
//                             onClick={() => setSelectedProduct(product)}
//                             className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md cursor-pointer"
//                           >
//                             {/* Gradient Border Effect */}
//                             <motion.div 
//                               className="absolute inset-0 bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                               layoutId={`border-${product.id}`}
//                             />
                            
//                             <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800 p-6 flex items-center justify-center overflow-hidden">
//                               <motion.img
//                                 whileHover={{ scale: 1.1, rotate: 3 }}
//                                 transition={{ duration: 0.6 }}
//                                 src={resolveImageSrc(product.image_url)}
//                                 alt={product.name}
//                                 className="object-contain w-full h-full group-hover:drop-shadow-2xl transition-all duration-500"
//                                 onLoad={() => console.log(`✅ Loaded featured: ${product.image_url}`)}
//                                 onError={(e) => {
//                                   console.error(`❌ Failed to load featured: ${product.image_url}`);
//                                   console.error('Attempted URL:', e.currentTarget.src);
//                                 }}
//                               />
                              
//                               <motion.div 
//                                 className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs px-3 py-2 rounded-full flex items-center gap-1 shadow-lg"
//                                 whileHover={{ scale: 1.1 }}
//                               >
//                                 <Star className="w-3 h-3 fill-black" /> Featured
//                               </motion.div>

//                               {/* Hover Overlay */}
//                               <motion.div
//                                 className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
//                                 initial={{ opacity: 0 }}
//                                 whileHover={{ opacity: 1 }}
//                               >
//                                 <motion.div
//                                   initial={{ scale: 0 }}
//                                   whileHover={{ scale: 1 }}
//                                   transition={{ delay: 0.1 }}
//                                   className="bg-white/90 backdrop-blur-sm rounded-full p-3"
//                                 >
//                                   <Eye className="w-6 h-6 text-primary" />
//                                 </motion.div>
//                               </motion.div>
//                             </div>
                            
//                             <CardContent className="relative p-6">
//                               <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-1">
//                                 {product.name}
//                               </h3>
//                               <p className="text-slate-400 mb-4 text-sm line-clamp-2 leading-relaxed">
//                                 {product.tagline}
//                               </p>
//                               <motion.button 
//                                 className="text-primary font-semibold flex items-center gap-2 text-sm group-hover:gap-3 transition-all duration-300"
//                                 whileHover={{ x: 5 }}
//                               >
//                                 View Details 
//                                 <ChevronRight className="w-4 h-4" />
//                               </motion.button>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </AnimatedSection>
//               )}

//               {/* ✅ All Products */}
//               <AnimatedSection delay={0.6}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.3 }}
//                 >
//                   <div className="flex items-center justify-center gap-4 mb-12">
//                     <ShoppingBag className="w-8 h-8 text-slate-300" />
//                     <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
//                       All Products
//                     </h2>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {regularProducts.map((product, i) => (
//                       <motion.div
//                         key={product.id}
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
//                         whileHover={{ y: -8, scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <Card
//                           onClick={() => setSelectedProduct(product)}
//                           className="group border border-slate-700 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-md cursor-pointer"
//                         >
//                           <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
//                             <motion.img
//                               whileHover={{ scale: 1.08 }}
//                               transition={{ duration: 0.4 }}
//                               src={resolveImageSrc(product.image_url)}
//                               alt={product.name}
//                               className="object-contain w-full h-full p-6 group-hover:drop-shadow-lg transition-all duration-300"
//                               onLoad={() => console.log(`✅ Loaded: ${product.image_url}`)}
//                               onError={(e) => {
//                                 console.error(`❌ Failed to load: ${product.image_url}`);
//                                 console.error('Attempted URL:', e.currentTarget.src);
//                               }}
//                             />

//                             {/* Hover Overlay */}
//                             <motion.div
//                               className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
//                               initial={{ opacity: 0 }}
//                               whileHover={{ opacity: 1 }}
//                             >
//                               <motion.div
//                                 initial={{ scale: 0 }}
//                                 whileHover={{ scale: 1 }}
//                                 className="bg-white/90 backdrop-blur-sm rounded-full p-2"
//                               >
//                                 <Eye className="w-5 h-5 text-primary" />
//                               </motion.div>
//                             </motion.div>
//                           </div>
                          
//                           <CardContent className="p-6">
//                             <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
//                               {product.name}
//                             </h3>
//                             <p className="text-slate-400 mb-3 text-sm line-clamp-2 leading-relaxed">
//                               {product.tagline}
//                             </p>
//                             <motion.button 
//                               className="text-primary font-semibold flex items-center gap-1 text-sm group-hover:gap-2 transition-all duration-300"
//                               whileHover={{ x: 3 }}
//                             >
//                               Learn More <ChevronRight className="w-4 h-4" />
//                             </motion.button>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </AnimatedSection>

//               {/* ✅ Empty State */}
//               {displayedProducts.length === 0 && (
//                 <AnimatedSection>
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6 }}
//                     className="text-center py-32"
//                   >
//                     <motion.div
//                       animate={{ y: [0, -10, 0] }}
//                       transition={{ repeat: Infinity, duration: 2 }}
//                     >
//                       <Package className="w-24 h-24 text-slate-600 mx-auto mb-6" />
//                     </motion.div>
//                     <h3 className="text-3xl font-bold text-white mb-4">
//                       No products found
//                     </h3>
//                     <p className="text-slate-400 text-lg">
//                       {selectedCategory !== 'All'
//                         ? `No products in "${selectedCategory}" category.`
//                         : 'Products will appear here once added.'}
//                     </p>
//                   </motion.div>
//                 </AnimatedSection>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Products;
















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


// ✅ Helper function: resolves both local & remote image URLs
const resolveImageSrc = (path: string) => {
  if (!path) return "";

  // Remote URLs - return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Backend-served images (uploads folder)
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
    console.warn("⚠️ Failed to resolve image:", path);
    return path; 
  }
};

const shouldDisplayPrice = (price?: number): boolean => {
  return price !== undefined && price !== null && price > 0;
};

/**
 * 🌟 AnimatedSection with parallax and blur effects
 */
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

/**
 * 🌊 Ocean & Plant Themed Animated Background
 */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top Ocean Blue - Large Animated Orb */}
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
      
      {/* Bottom Plant Green - Large Animated Orb */}
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

      {/* Middle Ocean Teal - Medium Animated Orb */}
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

      {/* Accent Plant Green - Small Animated Orb */}
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

      {/* Floating Eco Particles - Teal & Green Mix */}
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

      {/* Animated Grid Pattern with Eco Colors */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="ecoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecoGrid)" />
      </svg>

      {/* Wave Pattern Overlay */}
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

  // ✅ Enhanced Contact Navigation
  const handleContactForPricing = () => {
    // Navigate to home page
    navigate('/', { replace: true });
    
    // Wait for navigation and scroll
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


  // ✅ Enhanced Product Detail Modal
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
              {/* ✅ Enhanced Close Button */}
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
                {/* Product Image */}
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
                    onLoad={() => console.log(`✅ Loaded: ${selectedProduct.image_url}`)}
                    onError={(e) => {
                      console.error(`❌ Failed: ${selectedProduct.image_url}`);
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

                {/* Product Info */}
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
                  
                  {/* Action Buttons */}
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

              {/* ✅ Back to Products Button */}
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
      {/* ✅ Enhanced Ocean & Plant Themed Animated Background */}
      <AnimatedBackground />

      {/* Gradient Overlay - Subtle */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-100/30 via-transparent to-cyan-100/30 pointer-events-none" />
      
      <Navigation />
      
      <div className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ✅ Enhanced Hero Section - All in One Line */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              {/* ✅ Explore Our Range with Same Animations as Before */}
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
              
              {/* ✅ Main Heading - All in One Line */}
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

          {/* ✅ Enhanced Category Filters */}
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
              {/* ✅ Featured Products - No Title */}
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
                            {/* Gradient Border Effect */}
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
                                onLoad={() => console.log(`✅ Loaded featured: ${product.image_url}`)}
                                onError={(e) => {
                                  console.error(`❌ Failed to load featured: ${product.image_url}`);
                                  console.error('Attempted URL:', e.currentTarget.src);
                                }}
                              />
                              
                              <motion.div 
                                className="absolute top-4 right-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 text-xs px-3 py-2 rounded-full flex items-center gap-1 shadow-lg"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Star className="w-3 h-3 fill-slate-900" /> Featured
                              </motion.div>

                              {/* Hover Overlay */}
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

              {/* ✅ All Products */}
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
                              onLoad={() => console.log(`✅ Loaded: ${product.image_url}`)}
                              onError={(e) => {
                                console.error(`❌ Failed to load: ${product.image_url}`);
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

              {/* ✅ Empty State */}
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
