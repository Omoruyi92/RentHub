
'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={\`\${scrolling
        ? "bg-white bg-opacity-60 backdrop-blur-lg shadow-md dark:bg-gray-900 dark:bg-opacity-80"
        : "bg-transparent"
      } text-gray-700 dark:text-gray-200 fixed w-full top-0 left-0 z-50 transition-all ease-in-out duration-300\`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            <Logo />
          </span>
        </Link>

        <!-- the rest of the code stays the same as before, no changes needed beyond fixing the Logo wrapping issue -->
      </div>
    </nav>
  );
}
