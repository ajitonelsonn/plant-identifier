"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { LinkProps } from "next/link";

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-green-500 rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        setIsLogoutModalOpen(false);
        router.push("/");
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

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />
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
    {isAuthenticated && (
      <NavLink
        href="/profile"
        label="Profile"
        mobile={mobile}
        icon={<User size={16} />}
      />
    )}
    <li className={mobile ? "py-2" : ""}>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
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
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, mobile, icon }) => (
  <li className={mobile ? "py-2" : ""}>
    <Link
      href={href}
      className="text-white hover:text-green-200 flex items-center"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  </li>
);
