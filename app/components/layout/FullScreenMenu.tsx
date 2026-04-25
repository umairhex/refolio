"use client";

import { createPortal } from "react-dom";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL_PROFILES } from "@/constants";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { SoundButton, SoundLink, SoundAnchor } from "@/app/components/ui/Sound";

export default function FullScreenMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  useScrollLock(isOpen);

  const menuVariants: Variants = {
    closed: { y: "-100%" },
    open: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  const linkVariants: Variants = {
    closed: { y: 100, opacity: 0, rotateX: 45 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  const hoverVariants = {
    initial: { scaleX: 0, scaleY: 0.05 },
    hover: { scaleX: 1, scaleY: 1 },
  };

  const textVariants = {
    initial: { rotateY: 0, rotateX: 0, x: 0, color: "var(--foreground)" },
    hover: {
      rotateY: -8,
      rotateX: 5,
      x: 20,
      color: "var(--background)",
    },
  };

  return createPortal(
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="exit"
      data-testid="full-screen-menu"
      className="bg-background text-foreground fixed inset-0 z-100 flex flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      <SoundButton
        onClick={onClose}
        className="group absolute top-6 right-6 flex cursor-pointer items-center gap-3 text-[10px] font-bold tracking-[0.15em] uppercase focus:outline-none md:top-10 md:right-10 md:text-[11px]"
        aria-label="Close Menu"
      >
        <span>CLOSE</span>
        <div className="border-foreground/40 group-hover:border-foreground flex h-4.5 w-4.5 items-center justify-center rounded-full border-[1.5px] transition-colors">
          <div className="bg-foreground h-0.75 w-0.75 animate-pulse rounded-full" />
        </div>
      </SoundButton>

      <div className="mt-16 flex flex-col md:mt-0">
        {NAV_LINKS.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <div key={i} className="border-foreground/5 group border-b last:border-0">
              <div
                className="w-full overflow-hidden"
                style={{ padding: "20px 0", margin: "-20px 0" }}
              >
                <motion.div
                  custom={i}
                  variants={linkVariants}
                  className="w-full origin-top-left transform"
                  style={{ perspective: "1000px" }}
                >
                  <SoundLink
                    href={link.href}
                    onClick={onClose}
                    className="font-arsenica-display relative block w-full cursor-pointer py-3 text-[14vw] leading-none font-medium tracking-tighter uppercase focus:outline-none md:py-5 md:text-[10vw] lg:text-[90px]"
                    style={{
                      transformStyle: "preserve-3d",
                      opacity: isActive ? 1 : 0.4,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <motion.div
                      initial="initial"
                      whileHover="hover"
                      className="relative w-full h-full"
                    >
                      <motion.div
                        variants={hoverVariants}
                        className="bg-foreground pointer-events-none absolute inset-0 z-0"
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        style={{ originX: 0 }}
                      />
                      <motion.span
                        variants={textVariants}
                        className="relative z-10 flex origin-left transform-gpu items-center gap-6 pb-2 pl-2 lg:pl-4"
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {link.name}
                        {isActive && (
                          <span className="mt-4 text-[10px] font-bold tracking-[0.4em] italic opacity-30 md:mt-8">
                            (CURRENT)
                          </span>
                        )}
                      </motion.span>
                    </motion.div>
                  </SoundLink>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-foreground/50 border-foreground/10 absolute right-6 bottom-6 left-6 flex flex-col items-start justify-between gap-4 border-t pt-6 text-[10px] tracking-[0.15em] uppercase md:right-16 md:bottom-10 md:left-16 md:flex-row md:items-center md:text-[11px] lg:right-24 lg:left-24">
        <span>{`© ${new Date().getFullYear()} M UMAIR KHAN`}</span>
        <div className="flex gap-6">
          {SOCIAL_PROFILES.map((p) => (
            <SoundAnchor
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground cursor-pointer capitalize transition-colors focus:outline-none"
            >
              {p.key}
            </SoundAnchor>
          ))}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
