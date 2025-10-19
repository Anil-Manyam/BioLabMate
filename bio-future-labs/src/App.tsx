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









// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import About from "./pages/About";
// import Product from "./pages/Product";
// import Blog from "./pages/Blog";
// import BlogAdmin from "./pages/BlogAdmin";
// import SustainabilityCalculator from "./pages/SustainabilityCalculator";
// import NotFound from "./pages/NotFound";
// import CustomCursor from "./components/CustomCursor";
// import "./App.css";

// export default function App() {
//   return (
//     <div className="App relative">
//       <CustomCursor videoSrc="/background.mp4" />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/product" element={<Product />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog-admin" element={<BlogAdmin />} />
//           <Route path="/blog/admin" element={<BlogAdmin />} /> 
//           <Route
//             path="/sustainability-calculator"
//             element={<SustainabilityCalculator />}
//           />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }



// Updated App.tsx with new admin routing structure
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Product from "./pages/Product";
import Blog from "./pages/Blog";
import SustainabilityCalculator from "./pages/SustainabilityCalculator";
import NotFound from "./pages/NotFound";

// New Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminBlogs from "@/pages/admin/AdminBlogs";
import AdminTeam from "@/pages/admin/AdminTeam";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminMilestones from "@/pages/admin/AdminMilestones";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminLayout from "./components/admin/AdminLayout";

import CustomCursor from "./components/CustomCursor";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sustainability-calculator" element={<SustainabilityCalculator />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="milestones" element={<AdminMilestones />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
        
        {/* Legacy redirects */}
        <Route path="/blog/admin" element={<AdminLogin />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}