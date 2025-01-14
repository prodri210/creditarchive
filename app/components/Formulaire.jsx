"use client";

import React, { useEffect, useState } from "react";
import logo from "@/public/photo_2024-12-13_14-23-38.jpg";
import Image from "next/image";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "react-i18next";

const Formulaire = ({ onSubmit }) => {
  const { t } = useTranslation("common");

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const [countries, setCountries] = useState([]); // Stocker les pays

  // Date et Heure
  useEffect(() => {
    // Fonction pour mettre à jour la date et l'heure
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString(); // Format: jj/mm/aaaa
      const formattedTime = now.toLocaleTimeString(); // Format: hh:mm:ss
      setDateTime({ date: formattedDate, time: formattedTime });
    };

    // Mise à jour initiale
    updateDateTime();

    // Mise à jour toutes les secondes
    const timer = setInterval(updateDateTime, 1000);

    // Nettoyage du timer
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();
        const countryNames = data.data.map((country) => country.country);
        console.log(countryNames);
        setCountries(countryNames.sort());
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des pays:",
          error.message
        );
      }
    };

    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    dossierNumero: "", // Numéro de dossier
    name: "", // Nom & Prénoms
    juridic_status: "Emprunteur", // Statut juridique (fixé par défaut)
    country: "", // Pays
    city: "", // Ville
    receive_institute: "", // Institution de réception du crédit
    request_date: "", // Date de la demande
    credit: "", // Montant du crédit
    credit_motif: "", // Motif du crédit
    remboursement: "1", // Temps de remboursement
    date_approval: "", // Date d'approbation
    mensual_payment: "", // Remboursement mensuel
    first_payment_date: "", // Date du premier remboursement
    eligibility: "Excellent", // Critère d'éligibilité (fixé par défaut)
    dossier_status: "Approuvé", // Statut du dossier (fixé par défaut)
    decaissement_status: "En attente", // Statut du décaissement (fixé par défaut)
    taxe: "", // Taxe sur dossier (fixé par défaut)
    taxe_status: "Non acquitté", // Statut du paiement de la taxe (fixé par défaut)
  });

  const [step, setStep] = useState(1); // Étape actuelle du formulaire

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (
      step < 2 &&
      formData.name &&
      formData.country &&
      formData.receive_institute
    )
      setStep(step + 1);
    else alert("Remplissez les champs obligatoires pour continuez !!!");
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si une date de demande est définie
    const requestDate = formData.request_date
      ? new Date(formData.request_date)
      : new Date(); // Si pas de date, utiliser la date actuelle

    formData.request_date = new Date(requestDate).toLocaleDateString();

    // Ajouter un jour pour calculer la date d'approbation
    const date_approval = new Date(
      requestDate.setDate(requestDate.getDate() + 1)
    ).toLocaleDateString();

    // Calcul de la mensualité (simple exemple : crédit divisé par le temps de remboursement)
    const mensual_payment =
      formData.credit && formData.remboursement
        ? (
            (parseFloat(formData.credit) + parseFloat(formData.credit) * 0.02) /
            parseInt(formData.remboursement)
          ).toFixed(2) + " $"
        : "";

    // Calcul de la date du premier remboursement (un mois après la demande)
    const first_payment_date = new Date(
      requestDate.setMonth(requestDate.getMonth() + 1)
    ).toLocaleDateString();

    const taxe = formData.credit < 5000 ? "100 $" : "200 $";

    formData.credit = `${formData.credit} $`;

    formData.remboursement = `${formData.remboursement} mois`;

    const dossierNumero =
      formData.dossierNumero || `F-${Math.floor(Math.random() * 1000000000)}`;

    // Compléter les autres champs
    const completedData = {
      ...formData,
      date_approval,
      mensual_payment,
      first_payment_date,
      dossierNumero,
      taxe,
    };

    onSubmit(completedData); // Envoie les données une fois terminé
  };

  return (
    <div className="m-2">
      <div className="flex max-w-6xl justify-between mx-auto mb-5">
        <Image
          src={logo}
          alt={t("logoAlt")}
          width={100}
          height={100}
          className="rounded-full"
        />

        <LanguageSelector />

        <div className="flex flex-col space-y-2 my-auto">
          <div className="flex items-center">
            <span className="font-bold text-gray-700 mr-1">
              {t("dateLabel")} :
            </span>
            <span className="text-gray-900">{dateTime.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-gray-700 mr-1">
              {t("timeLabel")} :
            </span>
            <span className="text-gray-900">{dateTime.time}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h1 className="text-2xl text-center font-bold mb-4">
                INFORMATIONS PERSONNELLES
              </h1>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Nom & Prénoms{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required={true}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Statut Juridique
                    </label>
                    <input
                      type="text"
                      name="juridic_status"
                      value={formData.juridic_status}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Pays <span className="text-red-500 text-lg">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required
                    >
                      <option value="">-- Sélectionner un pays --</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Institution de réception du crédit{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </label>
                    <input
                      type="text"
                      name="receive_institute"
                      value={formData.receive_institute}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Banque ou western-union ou autre"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl text-center font-bold mb-4">
                INFORMATIONS DU CREDIT
              </h1>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Date de la demande
                    </label>
                    <input
                      type="date"
                      name="request_date"
                      value={formData.request_date}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required={true}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Montant du crédit
                    </label>
                    <input
                      type="number"
                      min={1000}
                      max={5000000}
                      name="credit"
                      value={formData.credit}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required={true}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Motif du crédit
                    </label>
                    <textarea
                      name="credit_motif"
                      value={formData.credit_motif}
                      onChange={handleChange}
                      className="w-full border px-2 py-1 rounded"
                      required={true}
                    ></textarea>
                  </div>
                  <div className="flex-3">
                    <label className="block text-sm font-medium mb-1">
                      Temps de remboursement
                    </label>
                    <select
                      name="remboursement"
                      value={formData.remboursement}
                      onChange={handleChange}
                      className="w-auto border px-2 py-1 rounded"
                      required={true}
                    >
                      {[
                        1, 2, 3, 4, 5, 6, 12, 24, 36, 48, 60, 72, 84, 96, 108,
                        120,
                      ].map((value) => (
                        <option key={value} value={value}>
                          {value} mois
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Précédent
              </button>
            )}
            {step < 2 && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Suivant
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Soumettre mes informations
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulaire;
