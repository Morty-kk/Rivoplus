import { motion } from "framer-motion";
import logo2 from "@/assets/logo_blue_B.png";
import logo from "@/assets/logo_black_no_B.png";

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
        <img
            src={logo}
            alt="Rivo Plus logo"
            className="h-full w-full object-contain"
        />
      </Wrapper>
  );
};

export default RivoLogo;