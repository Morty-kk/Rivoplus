import { motion } from "framer-motion";

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
      <svg viewBox="0 0 210 64" role="img" aria-label="Rivo Plus logo" className="h-full w-full">
        <defs>
          <linearGradient id="rivoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" rx="14" ry="14" width="60" height="60" fill="url(#rivoGradient)" />
        <path
          d="M20 19h16.5c7.7 0 13.2 4.8 13.2 11.7 0 7.6-6.2 12.2-14.3 12.2H30v12H20V19Zm10 16h5.1c2.8 0 4.7-1.6 4.7-3.9S38 27 35.2 27H30v8Z"
          fill="white"
        />

        <text x="74" y="30" className="fill-foreground" fontSize="22" fontWeight="700" fontFamily="Inter, Cairo, sans-serif">
          Rivo
        </text>
        <text
          x="74"
          y="52"
          className="fill-muted-foreground"
          fontSize="16"
          fontWeight="600"
          fontFamily="Inter, Cairo, sans-serif"
        >
          Plus
        </text>
      </svg>
    </Wrapper>
  );
};

export default RivoLogo;
