import React from 'react';
import logo from '../assets/logo_blue_B.png';

export default function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <>
      {/* Light mode */}
      <img src={logo} alt="RivoPlus" className={`${className} block dark:hidden filter brightness-95`} />
      {/* Dark mode — slightly adjusted for visibility */}
      <img src={logo} alt="RivoPlus" className={`${className} hidden dark:block filter contrast-115 drop-shadow-sm`} />
    </>
  );
}
