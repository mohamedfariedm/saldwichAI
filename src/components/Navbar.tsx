"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useLocale } from "next-intl";

const links = [
  { href: "home", label: "Home" },
  { href: "features", label: "Features" },
  { href: "ContactUs", label: "Contact Us" },
  { href: "faq", label: "FAQ" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Type the ref as HTMLDivElement
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const offset = element.offsetTop - navHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (sectionId: string) => {
    if (sectionId === "home") {
      if (pathname !== "/") {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsMenuOpen(false);
      return;
    }

    if (pathname !== "/") {
      // router.push("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    } else {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    console.log(pathname);
    
    router.push(pathname.includes("/ar") ? pathname.replace("/ar", `/${lang}`) : pathname.replace("/en", `/${lang}`));
    setIsDropdownOpen(false); // Close dropdown after selecting a language
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the dropdownRef exists and if the click is outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white" >
    <nav className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Image
                  src="/menu.svg"
                  alt="menu"
                  width={24}
                  height={24}
                  priority
                />
              )}
            </button>
          </div>
          <div className="md:flex-shrink-0 flex-1 md:flex-none flex justify-center md:justify-start">
            <Image
              src="/logo.svg"
              alt="Mizan logo"
              width={140}
              height={38}
              className="w-24 md:w-[140px]"
              priority
            />
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-2 relative">
              {links.map(({ href, label }) => (
                <li
                  key={href}
                  className="text-charcoal px-3 py-2 text-lg font-medium cursor-pointer"
                  onClick={() => handleScroll(href)}
                >
                  {t(label)}
                </li>
              ))}
              {/* Language switcher button */}
              <button
                className={`inline-flex w-10 h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the dropdown visibility
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span className="sr-only">Switch language</span>
              </button>
              {/* Language dropdown menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef} // Attach ref to the dropdown
                  className="absolute end-0 mt-2 w-32 bg-white shadow-lg rounded-md z-50"
                  style={{ top: "100%" }}
                >
                  <div
                    className="cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </div>
                  <div
                    className="cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(({ href, label }) => (
            <div
              key={href}
              className="text-charcoal hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              onClick={() => handleScroll(href)}
            >
              {t(label)}
            </div>
          ))}
          {/* Language switcher for mobile */}
          <div className="px-3 py-2">
            <div
              className="cursor-pointer py-2 text-charcoal"
              onClick={() => handleLanguageChange("en")}
            >
              English
            </div>
            <div
              className="cursor-pointer py-2 text-primary"
              onClick={() => handleLanguageChange("ar")}
            >
              العربية
            </div>
          </div>
        </div>
      </div>
    </nav>

    </div>
  );
};

export default Navbar;
