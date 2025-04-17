import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Urban Monkey logo URL (replace with actual logo URL or local asset)
const logoUrl = "https://www.urbanmonkey.com/cdn/shop/files/UM-Logo-02_180x.png";

const OrdersPage = () => {
  const navigate = useNavigate();
  const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');

  const generateInvoicePDF = (order) => {
    const doc = new jsPDF();

    // Add Logo
    try {
      doc.addImage(logoUrl, 'PNG', 20, 10, 40, 20); // Adjust size and position as needed
    } catch (error) {
      console.error("Error loading logo:", error);
      // Fallback: Add text-based logo
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Urban Monkey", 20, 20);
    }

    // Header
    doc.setFillColor(34, 34, 34); // Dark gray for Urban Monkey branding
    doc.rect(0, 35, 210, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("INVOICE", 20, 45);

    // Invoice Details
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 140, 45);
    doc.text(`Date: ${order.date}`, 140, 50);

    // Company Details
    doc.setFont("Helvetica", "bold");
    doc.text("Urban Monkey", 20, 60);
    doc.setFont("Helvetica", "normal");
    doc.text("220A, Ira Needles", 20, 65);
    doc.text("Kitchener, ON N2N 0C4", 20, 70);
    doc.text("Email: contact@urbanmonkey.com", 20, 75);
    doc.text("Phone: +1 (519) 555-1234", 20, 80);

    // Customer Details
    doc.setFont("Helvetica", "bold");
    doc.text("Billed To:", 140, 60);
    doc.setFont("Helvetica", "normal");
    doc.text(order.billing.name, 140, 65);
    doc.text(order.billing.address, 140, 70);
    doc.text(`${order.billing.city}, ${order.billing.zip}`, 140, 75);

    // Divider Line
    doc.setDrawColor(34, 34, 34);
    doc.setLineWidth(0.5);
    doc.line(20, 85, 190, 85);

    // Items Table
    autoTable(doc, {
      startY: 90,
      head: [['Item Description', 'Quantity', 'Unit Price', 'Total']],
      body: order.items.map(item => [
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.price * item.quantity).toFixed(2)}`
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [34, 34, 34],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 20, right: 20 },
      styles: {
        cellPadding: 3,
        font: "Helvetica",
      },
      columnStyles: {
        0: { cellWidth: 80 }, // Item Description
        1: { cellWidth: 30, halign: 'center' }, // Quantity
        2: { cellWidth: 30, halign: 'right' }, // Unit Price
        3: { cellWidth: 30, halign: 'right' }, // Total
      },
    });

    // Totals Section
    const finalY = doc.lastAutoTable.finalY;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Subtotal:", 140, finalY + 10);
    doc.text(`$${order.total.toFixed(2)}`, 170, finalY + 10, { align: 'right' });
    doc.text("Shipping:", 140, finalY + 15);
    doc.text("Free", 170, finalY + 15, { align: 'right' });
    doc.setFontSize(12);
    doc.text("Total:", 140, finalY + 25);
    doc.text(`$${order.total.toFixed(2)}`, 170, finalY + 25, { align: 'right' });

    // Payment Information
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Payment Method: Credit Card", 20, finalY + 35);
    doc.text("Payment Status: Paid", 20, finalY + 40);

    // Thank You Note
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for shopping with Urban Monkey!", 20, finalY + 50);

    // Footer
    doc.setFillColor(34, 34, 34);
    doc.rect(0, 270, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Urban Monkey | 220A, Ira Needles, Kitchener, ON N2N 0C4", 20, 280);
    doc.text("contact@urbanmonkey.com | +1 (519) 555-1234", 20, 285);
    doc.text("© 2025 Urban Monkey. All rights reserved.", 20, 290);

    // Save PDF
    doc.save(`UrbanMonkey_Invoice_${order.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                      <p className="text-gray-600">Date: {order.date}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => generateInvoicePDF(order)}
                      className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      <FaDownload className="mr-2" /> Download Invoice
                    </motion.button>
                  </div>
                  <div className="border-t pt-4">
                    {order.items.map(item => (
                      <div key={item._id || item.productId} className="flex items-center gap-4 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-gray-600">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;