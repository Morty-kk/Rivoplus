import { motion } from "framer-motion";
import { Play, Tv, Music, Gamepad2, Cloud, ShieldCheck, MessageCircle, Send } from "lucide-react";
import logo from "@/assets/logo_blue_B.png";
import heroBg from "@/assets/hero-bg.jpg";

const products = [
  {
    icon: Tv,
    title: "ريفو بلس ستريم",
    description: "بث مباشر لأفضل المسلسلات والأفلام بجودة 4K مع محتوى حصري",
    badge: "الأكثر مبيعاً",
    featured: true,
  },
  {
    icon: Music,
    title: "ريفو ميوزك",
    description: "ملايين الأغاني والبودكاست بجودة عالية بدون إعلانات",
    badge: null,
    featured: false,
  },
  {
    icon: Gamepad2,
    title: "ريفو قيمز",
    description: "مكتبة ضخمة من الألعاب السحابية على جميع الأجهزة",
    badge: "جديد",
    featured: false,
  },
  {
    icon: Cloud,
    title: "ريفو كلاود",
    description: "تخزين سحابي آمن مع مساحة غير محدودة ومشاركة سهلة",
    badge: null,
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "ريفو VPN",
    description: "تصفح آمن وسريع مع حماية خصوصيتك على الإنترنت",
    badge: null,
    featured: false,
  },
];

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className={`relative rounded-lg p-6 transition-all duration-300 hover:scale-[1.03] ${
      product.featured
        ? "glass glow-blue border border-primary/30"
        : "glass hover:border-primary/20"
    }`}
  >
    {product.badge && (
      <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
        {product.badge}
      </span>
    )}
    <product.icon className="mb-4 h-10 w-10 text-primary" />
    <h3 className="mb-2 text-xl font-bold text-foreground">{product.title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {product.description}
    </p>
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen font-cairo" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <img src={logo} alt="ريفو بلس" className="h-10" />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#products" className="transition-colors hover:text-foreground">
              المنتجات
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              الأسعار
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              الدعم
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              تواصل معنا
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <motion.img
            src={logo}
            alt="ريفو بلس"
            className="mx-auto mb-8 h-28 animate-float"
          />
          <h1 className="mb-4 text-4xl font-black leading-tight text-foreground md:text-6xl">
            كل ما تحتاجه في <span className="text-gradient">مكان واحد</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            بث، موسيقى، ألعاب، وأكثر — اكتشف منتجاتنا الرقمية المصممة لك
          </p>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 glow-blue"
          >
            <Play className="h-5 w-5" />
            استكشف الآن
          </a>
        </motion.div>
      </section>

      {/* Products */}
      <section id="products" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
              منتجاتنا
            </h2>
            <p className="text-muted-foreground">
              اختر ما يناسبك من خدماتنا الرقمية المتنوعة
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.title} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
              تواصل معنا
            </h2>
            <p className="text-muted-foreground">
              نحن هنا لمساعدتك — تواصل معنا عبر قنواتنا المفضلة
            </p>
          </motion.div>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/message/WT2U3TVLWAPAL1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              واتساب
            </a>
            <a
              href="https://t.me/rivoplus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#229ED9] px-8 py-4 font-bold text-white transition-all hover:opacity-90"
            >
              <Send className="h-5 w-5" />
              تيليجرام
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p>© 2026 ريفو بلس — جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
};

export default Index;
