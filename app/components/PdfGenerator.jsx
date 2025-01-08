import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#000",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateTime: {
    textAlign: "right",
    fontSize: 10,
    color: "#555",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#eee",
    padding: 5,
    marginBottom: 10,
    color: "#333",
  },
  table: {
    border: "1px solid #ddd",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    fontSize: 11,
  },
  tableCellHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "red",
    textAlign: "justify",
  },
});

// Composant PDF
const PdfGenerator = ({ formData }) => {
  const fetchLogo = async () => {
    const response = await fetch(
      "http://localhost:3000/photo_2024-12-13_14-23-38.jpg"
    );
    const imageBlob = await response.blob();
    const imageBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(imageBlob);
    });
    console.log(imageBase64);
    return imageBase64;
  };

  const now = new Date();
  const dateH = now.toLocaleDateString();
  const timeH = now.toLocaleTimeString();

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Image src={fetchLogo} style={{ width: "80px", height: "80px" }} />
          <View style={styles.dateTime}>
            <Text>Date : {dateH}</Text>
            <Text>Heure : {timeH}</Text>
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.title}>APPROBATION DU DOSSIER DE CRÉDIT</Text>

        {/* Informations sur le dossier */}
        <Text style={styles.sectionTitle}>INFORMATION DOSSIER DE CRÉDIT</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Dossier Numéro</Text>
            <Text style={styles.tableCell}>Motif du crédit</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.dossierNumero}</Text>
            <Text style={styles.tableCell}>{formData.credit_motif}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Date de la demande</Text>
            <Text style={styles.tableCell}>Mois de remboursement</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.request_date}</Text>
            <Text style={styles.tableCell}>{formData.remboursement}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Date de l'approbation</Text>
            <Text style={styles.tableCell}>Remboursement mensuel</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.date_approval}</Text>
            <Text style={styles.tableCell}>{formData.mensual_payment}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Montant du crédit</Text>
            <Text style={styles.tableCell}>Date du premier remboursement</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.credit}</Text>
            <Text style={styles.tableCell}>{formData.first_payment_date}</Text>
          </View>
        </View>

        {/* Informations personnelles */}
        <Text style={styles.sectionTitle}>INFORMATION PERSONNELLE</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Nom</Text>
            <Text style={styles.tableCell}>Institution</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.name}</Text>
            <Text style={styles.tableCell}>{formData.receive_institute}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Ville</Text>
            <Text style={styles.tableCell}>Pays</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.city}</Text>
            <Text style={styles.tableCell}>{formData.country}</Text>
          </View>
        </View>

        {/* Frais administratifs */}
        <Text style={styles.sectionTitle}>FRAIS ADMINISTRATIFS ET FISCAUX</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>Taxe sur dossier</Text>
            <Text style={styles.tableCell}>Statut de la taxe</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formData.taxe}</Text>
            <Text style={styles.tableCell}>{formData.taxe_status}</Text>
          </View>
        </View>

        {/* Texte en bas */}
        <Text style={styles.footer}>
          * Le présent document fait valoir à titre de droit l’approbation de la
          demande de crédit du dossier de crédit ci-dessus.
          {"\n\n"}
          Décision du Conseil Administratif: Le dossier de crédit{" "}
          {formData.dossierNumero} a été approuvé sous la juridiction du conseil
          administratif. Vous êtes prié de contacter l’agent responsable pour
          finaliser les procédures nécessaires.
        </Text>
      </Page>
    </Document>
  );

  return (
    <PDFViewer width="100%" height="600">
      <PDFDocument />
    </PDFViewer>
  );
};

export default PdfGenerator;
