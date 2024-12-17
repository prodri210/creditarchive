import jsPDF from "jspdf";

const PdfGenerator = ({ formData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text("APPROBATION DU DOSSIER DE CREDIT", 10, 10);
    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(
        `${key.replace(/([A-Z])/g, " $1")}: ${value}`,
        10,
        20 + index * 10
      );
    });

    doc.save(`dossier-${formData.dossierNumero}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      TELECHARGER LE DOSSIER DU CREDIT
    </button>
  );
};

export default PdfGenerator;
