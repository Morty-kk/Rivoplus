import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import ScrollToHash from "@/components/ScrollToHash";
import { CartProvider } from "@/lib/cart";
import { WallpaperEngine } from "@/components/WallpaperEngine";
import { LoadingScreen } from "@/components/LoadingScreen";

import Index from "./pages/Index";
// Lazy-loaded so their code (and product-only assets) stays out of the homepage bundle.
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

          {/*
            The routes mount immediately and the loading screen sits on top of
            them until it fades. Previously this was `{loaded && ...}`, which
            meant React only started rendering the page *after* the overlay
            finished — so a slow device paid the overlay wait and the render cost
            back to back. Rendering underneath overlaps the two.
          */}
          {!loaded && <LoadingScreen onDone={onLoadDone} />}

          <ScrollToHash />
          <Toaster />
          <Sonner />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Navigate to="/#products" replace />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Navigate to="/#cart" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
