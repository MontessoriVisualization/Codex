import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  BookMarked,
  GraduationCap,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  X,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";

interface NavigationProps {
  technologies: string[];
  navSearch: string;
  setNavSearch: (value: string) => void;
}

const Navigation = ({
  technologies,
  navSearch,
  setNavSearch,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Left Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300"
              >
                Codex
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {["Tutorials", "Exercises", "Certificates"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
              <div className="relative group">
                <Link
                  to="/services"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/70 transition-colors duration-200 flex items-center"
                >
                  Services{" "}
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block animate-in fade-in duration-200">
                  <div className="py-1">
                    {[
                      "Consulting",
                      "Code Review",
                      "Mentoring",
                      "Custom Projects",
                    ].map((service) => (
                      <Link
                        key={service}
                        to={`/services/${service
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <div className="w-full relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full bg-gray-800/70 border border-gray-700 rounded-full py-1.5 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="Search content..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {[
              { icon: <Plus className="h-5 w-5" />, label: "Create" },
              { icon: <Users className="h-5 w-5" />, label: "Community" },
              { icon: <BookMarked className="h-5 w-5" />, label: "Bookmarks" },
            ].map((item, index) => (
              <button
                key={index}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
            <Link
              to="/certification"
              className="flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 px-3 py-1.5 rounded-md transition-colors"
            >
              <GraduationCap className="h-5 w-5 mr-1.5" /> Get Certified
            </Link>
            <div className="ml-3 flex items-center space-x-2">
              <Button className="px-4 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0">
                Sign Up
              </Button>
              <Button className="px-4 py-1.5 rounded-md text-sm font-medium border border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent">
                Log in
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/70 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Technology Navigation Bar */}
        <div className="py-2">
          <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide snap-x">
            {technologies.map((tech, index) => (
              <Link
                key={index}
                to={`/map/${tech.toLowerCase()}`}
                className="flex-shrink-0 px-3 py-1.5 text-sm rounded-full bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors snap-start whitespace-nowrap ring-1 ring-gray-700/50 hover:ring-green-500/50"
              >
                {tech}
              </Link>
            ))}
            <button className="flex-shrink-0 px-3 py-1.5 text-sm rounded-full bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center whitespace-nowrap">
              <Plus className="h-3.5 w-3.5 mr-1" /> More
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 px-2 pt-2 pb-4">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Search content..."
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {["Tutorials", "Exercises", "Certificates"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Mobile Services Dropdown */}
              <div className="relative">
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-300">
                  Services
                </div>
                <div className="pl-4 space-y-1 border-l border-gray-700 ml-3">
                  {[
                    "Consulting",
                    "Code Review",
                    "Mentoring",
                    "Custom Projects",
                  ].map((service) => (
                    <Link
                      key={service}
                      to={`/services/${service
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="block px-3 py-1 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Links */}
              <Link
                to="/certification"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap className="h-5 w-5 mr-2" /> Get Certified
              </Link>

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-2 pt-2 px-2">
                <Button className="w-full py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  Sign Up
                </Button>
                <Button className="w-full py-2 border border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent">
                  Log in
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Links */}
        <div className="py-3 flex justify-center md:hidden space-x-4 border-t border-gray-800 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="Discord"
          >
            <FaDiscord className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
