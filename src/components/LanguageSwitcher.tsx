"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (lang: string) => {
    const newPath = pathname.includes("/ar")
      ? pathname.replace("/ar", `/${lang}`)
      : pathname.replace("/en", `/${lang}`);
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Globe Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow hover:bg-gray-100 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-globe text-[#045746]"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white border shadow-lg rounded-md z-50">
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
    </div>
  );
};

export default LanguageSwitcher;
