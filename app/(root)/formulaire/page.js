"use client";

import { appWithTranslation } from "next-i18next";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import Formulaire from "@/app/components/Formulaire";
import PdfGenerator from "@/app/components/PdfGenerator";
import { useState } from "react";
import i18n from "@/app/i18n";

const Home = () => {
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setConfirmData(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setConfirmData(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!confirmData && !showModal && <Formulaire onSubmit={handleFormSubmit} />}
      {showModal && (
        <ConfirmationModal
          formData={formData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {confirmData && !showModal && <PdfGenerator formData={formData} />}
    </div>
  );
};

export default appWithTranslation(Home);
