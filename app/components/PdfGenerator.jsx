import React from "react";
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
    marginBottom: 5,
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
      `${window.location.origin}/photo_2024-12-13_14-23-38.jpg`
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
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Dossier Numéro :</Text>{" "}
              {formData.dossierNumero}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Motif du crédit :</Text>{" "}
              {formData.credit_motif}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Date de la demande :</Text>{" "}
              {formData.request_date}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Mois de remboursement :</Text>{" "}
              {formData.remboursement}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Date de l'approbation :</Text>{" "}
              {formData.date_approval}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Remboursement mensuel :</Text>{" "}
              {formData.mensual_payment}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Montant du crédit :</Text>{" "}
              {formData.credit}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                Date du premier remboursement :
              </Text>{" "}
              {formData.first_payment_date}
            </Text>
          </View>
        </View>

        {/* Informations personnelles */}
        <Text style={styles.sectionTitle}>INFORMATION PERSONNELLE</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Nom :</Text> {formData.name}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                Institution de réception du crédit :
              </Text>{" "}
              {formData.receive_institute}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Ville :</Text> {formData.city}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Critère d'éligibilité :</Text>{" "}
              {formData.eligibility}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Pays :</Text> {formData.country}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Statut du dossier :</Text>{" "}
              {formData.dossier_status}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Statut Juridique :</Text>{" "}
              {formData.juridic_status}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Statut du décaissement :</Text>{" "}
              {formData.decaissement_status}
            </Text>
          </View>
        </View>

        {/* Frais administratifs */}
        <Text style={styles.sectionTitle}>FRAIS ADMINISTRATIFS ET FISCAUX</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Taxe sur dossier :</Text>
            </Text>
            <Text style={styles.tableCell}>{formData.taxe_status}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>Statut de la taxe :</Text>
            </Text>
            <Text style={styles.tableCell}>{formData.taxe}</Text>
          </View>
        </View>

        {/* Texte en bas */}
        <Text style={styles.footer}>
          * Le présent document fait valoir à titre de droit l’approbation de la
          demande de crédit du dossier de crédit ci-dessus.
          {"\n\n"}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Décision du Conseil Administratif
          </Text>
          {"\n"}
          Le dossier de crédit {formData.dossierNumero} a légalement été
          approuvé sous la juridiction du conseil administratif du groupe de
          financement Finanzas Investment. Le statut actuel de ce dossier
          nécessite l’obligation de s’acquitter de la taxe sur dossier de crédit
          selon l’article 47 du code d’octroi de crédit entre particulier afin
          que soit pris en charge par la cellule comptable du transfert de la
          valeur au moyen de réception demandé par l’emprunteur.
          {"\n\n"}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Recommandation à suivre par le client
          </Text>
          {"\n"}
          Vous êtes priez de communiquez avec l’agent en charge de votre dossier
          de crédit afin que vous soit expliqués les dispositions à prendre pour
          le paiement de la taxe de votre dossier de crédit dans les plus brefs
          délais. Il sera suivi du décaissement de votre crédit après
          confirmation de paiement présenté à la cellule comptable
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
