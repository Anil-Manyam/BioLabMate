import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductImage from '@/assets/Product.jpg';

const Product = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: 'Bio-Rad PCR Plates',
      description: 'High-quality Bio-Rad PCR plates designed for reliable and consistent performance in PCR and qPCR experiments. These plates ensure accurate sample handling, excellent thermal transfer, and compatibility with most PCR instruments, making them ideal for molecular biology research and diagnostics.',
      features: ['96-well format', 'Optical clarity', 'Thermal stability', 'Compatible with most instruments']
    },
    {
      id: 2,
      name: 'Thermo-Manual Clip Tips',
      description: 'Precision pipette tips engineered for secure fitting and leak-free performance. Thermo-manual clip tips provide accuracy, consistency, and ease of use in liquid handling, reducing contamination risk and ensuring reliable results in every experiment.',
      features: ['Universal fit', 'Leak-proof design', 'Sterile packaging', 'Low retention']
    },
    {
      id: 3,
      name: 'Centrifuge Tubes',
      description: 'Durable, high-strength centrifuge tubes suitable for a wide range of laboratory applications. These tubes are designed to withstand high-speed centrifugation, ensuring sample safety, clarity, and convenience for routine lab use.',
      features: ['High-speed compatible', 'Graduated markings', 'Screw cap design', 'Autoclavable']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Products</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our premium laboratory equipment designed for precision, reliability, and exceptional performance
            </p>
          </motion.div>

          {/* Main Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mb-20"
          >
                         <div className="relative overflow-hidden rounded-2xl shadow-2xl">
               <img
                 src={ProductImage}
                 alt="Laboratory Products"
                 className="w-full h-[400px] md:h-[500px] object-cover"
               />
             </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                                     {/* Product Header */}
                   <div className="mb-4">
                     <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                       {product.name}
                     </h3>
                   </div>

                  {/* Product Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                                     {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Contact our team to learn more about our products and how they can enhance your laboratory workflow.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                Contact Us Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product;
