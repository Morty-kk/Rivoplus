import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Language, Product } from "@/pages/index-content";
import { getImageForLanguage } from "@/lib/getImageForLanguage";

interface ProductShowcaseProps {
  products: Product[];
  language: Language;
  productDetailsLabel: string;
  exploreLabel: string;
  ctaLabel: string;
}

/**
 * Premium ProductShowcase component
 * 
 * Displays products in an animated grid with:
 * - Responsive layout (4 cols desktop, 2 tablet, 1-2 mobile)
 * - Smooth staggered entrance animations
 * - Premium hover effects (scale, lift, glow)
 * - Language-based image switching with Arabic fallback
 * - RTL support for Arabic
 * - Polished, high-end digital storefront feel
 */
export function ProductShowcase({
  products,
  language,
  productDetailsLabel,
  exploreLabel,
  ctaLabel,
}: ProductShowcaseProps) {
  // Container animation - items slide in staggered
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Hover animation for cards - lift and scale effect
  const hoverVariants = {
    scale: 1.03,
    y: -12,
    transition: {
      duration: 0.4,
    },
  };

  // Image animation on hover - subtle scale
  const imageHoverVariants = {
    scale: 1.08,
    transition: {
      duration: 0.5,
    },
  };

  return (
    <section className="relative z-10 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max"
      >
        {products.map((product, index) => {
          // Get the right image based on language
          const productImage = getImageForLanguage(
            language,
            product.showcaseImage || product.heroImage,
            product.showcaseImageAr || product.heroImageAr
          );

          return (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              whileHover={hoverVariants}
              className="group h-full"
            >
              <Link
                to={`/product/${product.slug}`}
                className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/70 via-card/50 to-card/30 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:from-card/80 hover:via-card/60"
              >
                {/* Image Container with Overlay */}
                <div className="relative w-full overflow-hidden bg-gradient-to-br from-muted/40 via-muted/10 to-transparent aspect-square">
                  {/* Animated gradient background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ opacity: 0.15 }}
                  />

                  {/* Product Image */}
                  <motion.img
                    src={productImage}
                    alt={product.title[language]}
                    className="w-full h-full object-cover object-center"
                    whileHover={imageHoverVariants}
                    loading="lazy"
                  />

                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Discount Badge - Premium Style */}
                  {product.offer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative px-4 py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-primary via-primary to-primary/90 text-white backdrop-blur-md border border-primary-foreground/20 shadow-xl">
                          -{product.offer.discountPercent}%
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Featured Badge - Premium Amber */}
                  {product.featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                        <div className="relative px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white backdrop-blur-md border border-amber-300/30 shadow-xl">
                          ★ {language === "ar" ? "مميز" : language === "de" ? "Top" : "Featured"}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CTA Arrow - appears on hover with premium styling */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, x: 8 }}
                    whileHover={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-4 right-4 z-20"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-3 rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground backdrop-blur-md border border-primary-foreground/20 shadow-xl">
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="relative flex flex-col flex-1 p-5 space-y-3">
                  {/* Icon Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex w-fit"
                  >
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 group-hover:from-primary/25 group-hover:to-primary/10 transition-colors duration-300">
                      <product.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-base font-extrabold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {product.title[language]}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                    {product.description[language]}
                  </p>

                  {/* CTA Text - visible on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-[gap] duration-300 pt-1"
                  >
                    <span>{exploreLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" strokeWidth={2.5} />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
