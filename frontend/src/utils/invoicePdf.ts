import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInvoice = (invoice: any) => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("ERP PRO", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceNo}`, 14, 32);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 40);

    doc.text(`Customer: ${invoice.customer.name}`, 14, 52);
    doc.text(`Email: ${invoice.customer.email}`, 14, 60);
    doc.text(`Phone: ${invoice.customer.phone}`, 14, 68);

    autoTable(doc, {
        startY: 80,
        head: [["Product", "Qty", "Price", "Total"]],
        body: invoice.items.map((item: any) => [
            item.product.name,
            item.quantity,
            `₹${item.price}`,
            `₹${item.total}`
        ])
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;

    doc.text(`Subtotal : ₹${invoice.subtotal}`, 14, finalY);
    doc.text(`Tax (18%) : ₹${invoice.tax}`, 14, finalY + 10);

    doc.setFontSize(14);
    doc.text(`Grand Total : ₹${invoice.total}`, 14, finalY + 25);

    doc.save(`${invoice.invoiceNo}.pdf`);
};