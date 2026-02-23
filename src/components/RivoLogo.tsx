import { motion } from "framer-motion";
import logoLight from "@/assets/logo_black_no_B.png";
import logoDark from "@/assets/logo white no B.png";

type RivoLogoProps = {
  className?: string;
  animated?: boolean;
};

const RivoLogo = ({ className, animated = false }: RivoLogoProps) => {
  const Wrapper = animated ? motion.div : "div";

  return (
    <Wrapper
      className={className}
      {...(animated
        ? {
            animate: {
              y: [0, -6, 0],
              scale: [1, 1.03, 1],
            },
            transition: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }
        : {})}
    >
      <img src={logoLight} alt="Rivo Plus logo" className="block h-full w-full object-contain dark:hidden" />
      <img src={logoDark} alt="Rivo Plus logo" className="hidden h-full w-full object-contain dark:block" />
    </Wrapper>
  );
};

export default RivoLogo;
