import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ScrollToHash from "@/components/ScrollToHash";
import { CartProvider } from "@/lib/cart";
import { WallpaperEngine } from "@/components/WallpaperEngine";
import { LoadingScreen } from "@/components/LoadingScreen";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const onLoadDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("theme", "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          {/* Animated canvas wallpaper — always behind everything */}
          <WallpaperEngine />

          {!loaded && <LoadingScreen onDone={onLoadDone} />}

          {loaded && (
            <>
              <ScrollToHash />
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Navigate to="/#products" replace />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Navigate to="/#cart" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          )}
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
