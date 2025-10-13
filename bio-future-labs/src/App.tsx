// // old one 
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import About from "./pages/About";
// import Product from "./pages/Product";
// import Blog from "./pages/Blog";
// import SustainabilityCalculatorPage from "./pages/SustainabilityCalculator";
// import NotFound from "./pages/NotFound";

// const App = () => (
//   <TooltipProvider>
//     <Toaster />
//     <Sonner />
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/sustainability-calculator" element={<SustainabilityCalculatorPage />} />
//         {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   </TooltipProvider>
// );

// export default App;


// // new one 
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import About from "./pages/About";
// import Product from "./pages/Product";
// import Blog from "./pages/Blog";
// import BlogAdmin from "./pages/BlogAdmin";
// import SustainabilityCalculatorPage from "./pages/SustainabilityCalculator";
// import NotFound from "./pages/NotFound";

// const App = () => (
//   <TooltipProvider>
//     <Toaster />
//     <Sonner />
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/blog/admin" element={<BlogAdmin />} />
//         <Route path="/sustainability-calculator" element={<SustainabilityCalculatorPage />} />
//         {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   </TooltipProvider>
// );

// export default App;









import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import BlogAdmin from "./pages/BlogAdmin";
import SustainabilityCalculator from "./pages/SustainabilityCalculator";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

export default function App() {
  return (
    <div className="App relative">
      <CustomCursor videoSrc="/background.mp4" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-admin" element={<BlogAdmin />} />
          <Route path="/blog/admin" element={<BlogAdmin />} /> 
          <Route
            path="/sustainability-calculator"
            element={<SustainabilityCalculator />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
