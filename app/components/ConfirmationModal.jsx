"use client";

import { useTranslation } from "react-i18next";

const ConfirmationModal = ({
  formData,
  formDataLabel,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{t("confirmInfo")}</h2>
        <ul className="mb-4">
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{formDataLabel[key]} : </strong> {value}
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            {t("confirm")}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onCancel}
          >
            {t("annule")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
