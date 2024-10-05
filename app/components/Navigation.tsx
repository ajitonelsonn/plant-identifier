"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LinkProps } from "next/link";

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/check-auth");
      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Plant Identifier 🇹🇱
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <NavItems
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
          />
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <NavItems
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
            mobile
          />
        </ul>
      )}
    </nav>
  );
}

interface NavItemsProps {
  isAuthenticated: boolean;
  handleLogout: () => Promise<void>;
  handleLogin: () => void;
  mobile?: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({
  isAuthenticated,
  handleLogout,
  handleLogin,
  mobile = false,
}) => (
  <>
    <NavLink href="/" label="Home" mobile={mobile} />
    <NavLink href="/about" label="About" mobile={mobile} />
    <NavLink href="/contact" label="Contact" mobile={mobile} />
    <NavLink href="/gallery" label="Plant Gallery" mobile={mobile} />
    <li className={mobile ? "py-2" : ""}>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      )}
    </li>
  </>
);

interface NavLinkProps {
  href: LinkProps["href"];
  label: string;
  mobile: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, mobile }) => (
  <li className={mobile ? "py-2" : ""}>
    <Link href={href} className="text-white hover:text-green-200">
      {label}
    </Link>
  </li>
);
