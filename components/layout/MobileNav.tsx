"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[80vw] max-w-sm bg-background border-l-2 border-border shadow-[-4px_0_0_0_hsl(var(--shadow-color))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-heading font-extrabold text-lg text-foreground">
                Menu
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="border-2 border-border hover:bg-muted rounded-full"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </Button>
            </div>

            {/* Nav links */}
            <nav className="space-y-2 px-5 pt-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                          : "text-foreground hover:bg-muted border-2 border-transparent"
                      }`}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom decorative shapes */}
            <div className="absolute bottom-8 left-5 flex items-center gap-3 opacity-30">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <div className="w-3 h-3 rotate-45 bg-tertiary" />
              <div className="w-4 h-4 rounded-full bg-secondary" />
              <div className="w-3 h-3 bg-quaternary" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
