
import PDFDocument from 'pdfkit';
import fs from 'fs';
export default function generateInvoicePDF(invoice, outPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);
    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Total: ₹${invoice.total}`);
    doc.moveDown();
    doc.text('Thank you for your business.');
    doc.end();
    stream.on('finish', () => resolve(outPath));
    stream.on('error', reject);
  });
}
