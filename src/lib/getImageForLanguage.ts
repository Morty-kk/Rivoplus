import type { Language } from "@/pages/index-content";

/**
 * Get the appropriate image based on language with Arabic fallback support.
 * 
 * Strategy:
 * - For Arabic (ar): Try to use the Arabic-specific image if it exists (e.g., adobe_pic_ar.png)
 * - For English (en) and German (de): Use the default image
 * - If Arabic image is missing, fall back to the default image gracefully
 * 
 * @param language - The current language (ar | en | de)
 * @param defaultImage - The default/primary image (used for en, de, and fallback for ar)
 * @param arabicImage - Optional Arabic-specific image variant
 * @returns The image path to use for the given language
 */
export function getImageForLanguage(
  language: Language,
  defaultImage: string,
  arabicImage?: string
): string {
  // For Arabic, try to use the Arabic variant if it exists
  if (language === "ar" && arabicImage) {
    return arabicImage;
  }
  
  // For English and German, always use the default image
  // For Arabic without an Arabic variant, fall back to default
  return defaultImage;
}

/**
 * Alternative type-safe approach for products with default and Arabic image properties.
 * Usage:
 * const image = getProductImage(product, language);
 */
export function getProductImage(
  product: { defaultImage: string; arabicImage?: string },
  language: Language
): string {
  return getImageForLanguage(language, product.defaultImage, product.arabicImage);
}
