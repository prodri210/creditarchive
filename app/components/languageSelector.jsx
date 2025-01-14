"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Définir les langues disponibles
  const languages = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
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
    i18n.changeLanguage(language.code); // Changer la langue via i18next
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative ml-4 cursor-pointer" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="flex items-center">
        <FaGlobe size={24} className="text-blue-500" />
        <span className="ml-2">{currentLanguage.label}</span>
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
          {languages.map((language) => (
            <div
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                language.code === i18n.language ? "font-bold" : ""
              }`}
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
