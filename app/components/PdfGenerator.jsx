import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("common");

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
            <Text>
              {t("dateLabel")} : {dateH}
            </Text>
            <Text>
              {t("timeLabel")} : {timeH}
            </Text>
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.title}>{t("approvment")}</Text>

        {/* Informations sur le dossier */}
        <Text style={styles.sectionTitle}>{t("infoCredit")}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formdossierNumeroLabel")} :
              </Text>{" "}
              {formData.dossierNumero}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formcredit_motifLabel")} :
              </Text>{" "}
              {formData.credit_motif}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formrequest_dateLabel")} :
              </Text>{" "}
              {formData.request_date}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("rembouresementMonth")} :
              </Text>{" "}
              {formData.remboursement}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formdate_approvalLabel")} :
              </Text>{" "}
              {formData.date_approval}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formmensual_paymentLabel")} :
              </Text>{" "}
              {formData.mensual_payment}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>{t("formcreditLabel")} :</Text>{" "}
              {formData.credit}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formfirst_payment_dateLabel")} :
              </Text>{" "}
              {formData.first_payment_date}
            </Text>
          </View>
        </View>

        {/* Informations personnelles */}
        <Text style={styles.sectionTitle}>{t("personalInfoTitle")}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>{t("formnameLabel")} :</Text>{" "}
              {formData.name}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formreceive_instituteLabel")} :
              </Text>{" "}
              {formData.receive_institute}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>{t("formcityLabel")} :</Text>{" "}
              {formData.city}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formeligibilityLabel")} :
              </Text>{" "}
              {formData.eligibility}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>{t("formcountryLabel")} :</Text>{" "}
              {formData.country}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formdossier_statusLabel")} :
              </Text>{" "}
              {formData.dossier_status}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formjuridic_statusLabel")} :
              </Text>{" "}
              {formData.juridic_status}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formdecaissement_statusLabel")} :
              </Text>{" "}
              {formData.decaissement_status}
            </Text>
          </View>
        </View>

        {/* Frais administratifs */}
        <Text style={styles.sectionTitle}>{t("adminFiscaux")}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableCellHeader]}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>{t("formtaxeLabel")} :</Text>
            </Text>
            <Text style={styles.tableCell}>{formData.taxe_status}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={{ fontWeight: 700 }}>
                {t("formtaxe_statusLabel")} :
              </Text>
            </Text>
            <Text style={styles.tableCell}>{formData.taxe}</Text>
          </View>
        </View>

        {/* Texte en bas */}
        <Text style={styles.footer}>
          * {t("droitDoc")}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            {t("decisionConseil")}
          </Text>
          {"\n"}
          {t("dossier")} {formData.dossierNumero} {t("decisionText")}
          {"\n\n"}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            {t("recommendation")}
          </Text>
          {"\n"}
          {t("recommendationText")}
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
