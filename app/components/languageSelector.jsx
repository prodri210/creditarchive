import { useTranslation } from "next-i18next";
import React, { useState, useEffect, useRef } from "react";
import { FaGlobe } from "react-icons/fa";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
  ];

  const currentLanguage = languages.find(
    (language) => language.code === i18n.language
  ) || { code: "en", label: "English" };

  // Fermer le dropdown si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language.code);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative ml-4 cursor-pointer" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="flex items-center">
        <FaGlobe size={24} className="text-blue-500" />
        <span>{currentLanguage.label}</span>
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
          {languages.map((language) => (
            <div
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {language.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
