/* ============================================
   VEDICFUELOON — E-BILLING ENGINE
   Exact Replication of bill.pdf Format
   Tailored with VedicFueloon Branding & Details
   Supports Direct PDF Download & High-Fidelity Print
   ============================================ */

import html2pdf from 'html2pdf.js';
import { ICONS, formatPrice } from './components.js';
import { Orders } from './store.js';

// ── Date & Time Formatters matching bill.pdf (e.g. "31 Aug 2026", "06:15 PM") ──
export function formatInvoiceDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return '21 Sep 2026';
  
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatInvoiceTime(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return '10:15 AM';

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  const formattedHours = hours.toString().padStart(2, '0');
  return `${formattedHours}:${minutes} ${ampm}`;
}

// ── Standardize & Enrich Order for Invoice ──
export function getInvoiceData(order) {
  const createdAt = order.createdAt || new Date().toISOString();
  const orderDate = formatInvoiceDate(createdAt);
  const orderTime = formatInvoiceTime(createdAt);
  
  // Invoice time is typically 1 minute after order creation, matching bill.pdf
  const invoiceDateObj = new Date(new Date(createdAt).getTime() + 60000);
  const invoiceDate = formatInvoiceDate(invoiceDateObj);
  const invoiceTime = formatInvoiceTime(invoiceDateObj);

  const dateCode = new Date(createdAt).toISOString().slice(2, 10).replace(/-/g, '');
  const rawId = (order.id || '1').replace(/\D/g, '').slice(-5) || '00125';
  const invoiceNo = order.invoiceNo || `VF/${dateCode}/${rawId.padStart(5, '0')}`;

  const customer = order.customer || {};
  const customerName = customer.name || 'Valued Patron';
  const customerPhone = customer.phone ? (customer.phone.startsWith('+91') ? customer.phone : '+91 ' + customer.phone) : '+91 98765 43210';
  const customerEmail = customer.email || `${customerName.toLowerCase().replace(/\s+/g, '.') || 'patron'}@email.com`;
  
  // Parse address parts
  const fullAddress = customer.address || '45, Anna Nagar West, Chennai, Tamil Nadu - 600040';
  const pincodeMatch = fullAddress.match(/\b\d{6}\b/);
  const pincode = customer.pincode || (pincodeMatch ? pincodeMatch[0] : '600040');

  // Split address into street and city/state
  const addressParts = fullAddress.split(',').map(s => s.trim());
  let street = addressParts.slice(0, 2).join(', ');
  let cityState = addressParts.slice(2).join(', ');
  if (!street) street = fullAddress;
  if (!cityState) cityState = 'Tamil Nadu - ' + pincode;

  const items = (order.items && order.items.length > 0) ? order.items : [
    { name: 'Karupu Kauvni Kanji (500ml)', qty: 1, price: 89 },
    { name: 'Sprouted Pulses Bowl (200g)', qty: 1, price: 69 }
  ];

  const subtotal = order.subtotal || items.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0);
  const shippingCharges = order.delivery !== undefined ? order.delivery : (subtotal >= 499 ? 0 : 40);
  const discount = order.discount || 0;
  const grandTotal = order.total || (subtotal + shippingCharges - discount);

  const paymentMethod = order.paymentMethod || 'UPI';
  const paymentStatus = order.paymentStatus || (order.status === 'cancelled' ? 'Refunded' : 'Paid');
  const paymentId = order.paymentId || ('UPI/' + (dateCode + '98415' + Math.floor(Math.random() * 899 + 100)));
  const transactionId = order.transactionId || ('3XQ' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'Z1');

  const customerId = customer.id || ('CUS-' + (Math.abs(customerName.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)) % 9000000 + 1000000));

  return {
    invoiceNo,
    orderDate,
    orderTime,
    invoiceDate,
    invoiceTime,
    customerName,
    customerId,
    customerPhone,
    customerEmail,
    street,
    cityState,
    pincode,
    items,
    subtotal,
    shippingCharges,
    discount,
    grandTotal,
    paymentMethod,
    paymentStatus,
    paymentId,
    transactionId
  };
}

// ── Generate Pixel-Perfect HTML Matching bill.pdf Layout Exactly ──
export function generateEBillHTML(order) {
  const data = getInvoiceData(order);

  return `
    <div class="vf-ebill-sheet" id="invoiceSheet-${data.invoiceNo.replace(/[\/]/g, '_')}">
      <style>
        .vf-ebill-sheet {
          background: #ffffff;
          color: #111111;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, Helvetica, sans-serif;
          width: 100%;
          max-width: 794px;
          margin: 0 auto;
          padding: 36px 42px;
          box-sizing: border-box;
          font-size: 13.5px;
          line-height: 1.45;
          position: relative;
        }

        /* ── Header Section ── */
        .ebill-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 8px;
        }

        .ebill-brand-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex-shrink: 0;
          width: 130px;
        }

        .ebill-brand-logo {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #1a3a2d;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        }

        .ebill-brand-logo-text {
          font-size: 14px;
          font-weight: 800;
          color: #1b3a2d;
          margin-top: 4px;
          letter-spacing: -0.2px;
          line-height: 1.1;
        }

        .ebill-brand-logo-sub {
          font-size: 9px;
          font-weight: 700;
          color: #555555;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .ebill-company-col {
          flex: 1;
          text-align: center;
          padding-right: 20px;
        }

        .ebill-company-title {
          font-size: 24px;
          font-weight: 900;
          color: #111111;
          margin: 0 0 4px 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .ebill-company-tagline {
          font-size: 13px;
          color: #333333;
          font-weight: 600;
          margin: 0 0 3px 0;
        }

        .ebill-company-web {
          font-size: 13px;
          color: #1b3a2d;
          font-weight: 600;
          margin: 0;
        }

        /* ── Tax Invoice Banner ── */
        .ebill-tax-banner {
          border-top: 1.5px solid #222222;
          border-bottom: 1.5px solid #222222;
          padding: 7px 0;
          margin: 14px 0 16px 0;
          text-align: center;
        }

        .ebill-tax-banner h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #111111;
        }

        /* ── Invoice Meta Grid ── */
        .ebill-meta-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 24px;
          padding: 4px 6px 14px 6px;
          border-bottom: 1.5px solid #222222;
          font-size: 13.5px;
        }

        .ebill-kv-row {
          display: grid;
          grid-template-columns: 110px 14px 1fr;
          margin-bottom: 6px;
          align-items: baseline;
        }

        .ebill-kv-label {
          color: #222222;
          font-weight: 500;
        }

        .ebill-kv-colon {
          font-weight: 600;
        }

        .ebill-kv-val {
          color: #111111;
          font-weight: 500;
        }

        .ebill-kv-val.bold {
          font-weight: 700;
        }

        .ebill-kv-val.paid {
          color: #145a32;
          font-weight: 700;
        }

        /* ── Parties Grid (Customer & Delivery) ── */
        .ebill-parties-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 24px;
          padding: 16px 6px;
          border-bottom: 1.5px solid #222222;
          font-size: 13.5px;
        }

        .ebill-section-heading {
          font-size: 13.5px;
          font-weight: 800;
          color: #111111;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* ── Table Section ── */
        .ebill-items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 18px 0;
          font-size: 13.5px;
        }

        .ebill-items-table th,
        .ebill-items-table td {
          border: 1px solid #333333;
          padding: 8px 12px;
          box-sizing: border-box;
        }

        .ebill-items-table th {
          background: #fdfdfd;
          font-weight: 700;
          color: #111111;
          text-align: left;
        }

        .ebill-items-table td.center,
        .ebill-items-table th.center {
          text-align: center;
        }

        .ebill-items-table td.right,
        .ebill-items-table th.right {
          text-align: right;
        }

        /* ── Bottom Section (Payment Details + Totals Box) ── */
        .ebill-bottom-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 24px;
          align-items: start;
          margin-top: 16px;
        }

        .ebill-totals-box {
          border: 1px solid #333333;
          padding: 14px 16px;
          box-sizing: border-box;
          font-size: 13.5px;
          background: #fafafa;
        }

        .ebill-totals-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .ebill-totals-row.discount {
          color: #c0392b;
          font-weight: 600;
        }

        .ebill-grand-total-row {
          border-top: 1.5px solid #222222;
          padding-top: 10px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          font-weight: 900;
          color: #111111;
        }

        .ebill-tax-inclusive-text {
          font-size: 11px;
          color: #555555;
          text-align: right;
          margin-top: 4px;
          font-style: italic;
        }

        /* ── Appreciation Notice ── */
        .ebill-appreciation {
          border-top: 1.5px solid #222222;
          padding-top: 16px;
          margin-top: 24px;
          text-align: center;
        }

        .ebill-appreciation p {
          margin: 0 0 3px 0;
          font-size: 13.5px;
          color: #333333;
        }

        .ebill-appreciation h3 {
          margin: 3px 0;
          font-size: 16px;
          font-weight: 800;
          color: #111111;
        }

        /* ── Footer Contact Strip ── */
        .ebill-footer-bar {
          border-top: 1px solid #333333;
          margin-top: 16px;
          padding-top: 10px;
          font-size: 12px;
          color: #333333;
        }

        .ebill-footer-label {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .ebill-footer-links {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ebill-footer-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #222222;
          font-weight: 500;
        }

        /* ── Print Isolation ── */
        @media print {
          body * {
            visibility: hidden;
          }
          .vf-ebill-sheet, .vf-ebill-sheet * {
            visibility: visible;
          }
          .vf-ebill-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px 30px;
            box-shadow: none !important;
          }
        }
      </style>

      <!-- Top Header -->
      <div class="ebill-header">
        <div class="ebill-brand-col">
          <img src="./vedicfueloon logo.jpeg" alt="VedicFueloon" class="ebill-brand-logo" />
          <div class="ebill-brand-logo-text">VedicFueloon</div>
          <div class="ebill-brand-logo-sub">FOOD PRODUCTS</div>
        </div>
        <div class="ebill-company-col">
          <h1 class="ebill-company-title">VEDICFUELOON FOOD PRODUCTS</h1>
          <p class="ebill-company-tagline">Healthy Food | Traditional Products</p>
          <p class="ebill-company-web">www.vedicfueloon.com</p>
        </div>
      </div>

      <!-- Tax Invoice Banner -->
      <div class="ebill-tax-banner">
        <h2>TAX INVOICE / BILL</h2>
      </div>

      <!-- Invoice Metadata Grid -->
      <div class="ebill-meta-grid">
        <div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Invoice No.</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val bold">${data.invoiceNo}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Order Date</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.orderDate}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Order Time</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.orderTime}</span>
          </div>
        </div>
        <div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Payment Status</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val paid">${data.paymentStatus}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Invoice Date</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.invoiceDate}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Invoice Time</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.invoiceTime}</span>
          </div>
        </div>
      </div>

      <!-- Customer & Delivery Details -->
      <div class="ebill-parties-grid">
        <div>
          <div class="ebill-section-heading">CUSTOMER DETAILS</div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Customer Name</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val bold">${data.customerName}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Customer ID</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.customerId}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Mobile Number</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.customerPhone}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Email Address</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.customerEmail}</span>
          </div>
        </div>

        <div>
          <div class="ebill-section-heading">DELIVERY DETAILS</div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Delivery Address</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.street},</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label"></span>
            <span class="ebill-kv-colon"></span>
            <span class="ebill-kv-val">${data.cityState}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Pincode</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val bold">${data.pincode}</span>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table class="ebill-items-table">
        <thead>
          <tr>
            <th style="width: 8%;" class="center">S.No.</th>
            <th style="width: 46%;">Product</th>
            <th style="width: 14%;" class="center">Quantity</th>
            <th style="width: 16%;" class="right">Unit Price (₹)</th>
            <th style="width: 16%;" class="right">Total Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map((it, idx) => `
            <tr>
              <td class="center">${idx + 1}</td>
              <td><strong>${it.name}</strong></td>
              <td class="center">${it.qty || 1}</td>
              <td class="right">${Number(it.price).toFixed(2)}</td>
              <td class="right"><strong>${(Number(it.price) * (it.qty || 1)).toFixed(2)}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Bottom Details & Totals -->
      <div class="ebill-bottom-grid">
        <div>
          <div class="ebill-section-heading">PAYMENT DETAILS</div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Payment Method</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val bold">${data.paymentMethod}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Payment ID</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.paymentId}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Transaction ID</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.transactionId}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Payment Date</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.orderDate}</span>
          </div>
          <div class="ebill-kv-row">
            <span class="ebill-kv-label">Payment Time</span>
            <span class="ebill-kv-colon">:</span>
            <span class="ebill-kv-val">${data.orderTime}</span>
          </div>
        </div>

        <div class="ebill-totals-box">
          <div class="ebill-totals-row">
            <span>Subtotal</span>
            <span>₹ ${Number(data.subtotal).toFixed(2)}</span>
          </div>
          <div class="ebill-totals-row">
            <span>Shipping Charges</span>
            <span>${data.shippingCharges === 0 ? '₹ 0.00' : '₹ ' + Number(data.shippingCharges).toFixed(2)}</span>
          </div>
          ${data.discount > 0 ? `
            <div class="ebill-totals-row discount">
              <span>Discount</span>
              <span>- ₹ ${Number(data.discount).toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="ebill-grand-total-row">
            <span>GRAND TOTAL</span>
            <span>₹ ${Number(data.grandTotal).toFixed(2)}</span>
          </div>
          <div class="ebill-tax-inclusive-text">(Inclusive of all taxes)</div>
        </div>
      </div>

      <!-- Appreciation Notice -->
      <div class="ebill-appreciation">
        <p>Thank you for shopping with</p>
        <h3>VedicFueloon Food Products!</h3>
        <p>We appreciate your support.</p>
      </div>

      <!-- Footer Contact Bar -->
      <div class="ebill-footer-bar">
        <div class="ebill-footer-label">For any queries, contact us:</div>
        <div class="ebill-footer-links">
          <span class="ebill-footer-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 98765 43210
          </span>
          <span class="ebill-footer-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            support@vedicfueloon.com
          </span>
          <span class="ebill-footer-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            www.vedicfueloon.com
          </span>
        </div>
      </div>
    </div>
  `;
}

// ── Client-Side PDF Generation & Instant File Download ──
export async function downloadEBillPDF(order) {
  const data = getInvoiceData(order);
  const cleanInvoiceName = data.invoiceNo.replace(/[\/\\?%*:|"<>]/g, '_');
  const filename = `VedicFueloon_Invoice_${cleanInvoiceName}.pdf`;

  // Create temporary container off-screen
  const tempWrap = document.createElement('div');
  tempWrap.style.position = 'fixed';
  tempWrap.style.left = '-9999px';
  tempWrap.style.top = '0';
  tempWrap.style.width = '794px';
  tempWrap.style.background = '#ffffff';
  tempWrap.innerHTML = generateEBillHTML(order);
  document.body.appendChild(tempWrap);

  const element = tempWrap.firstElementChild;

  const opt = {
    margin: [6, 8, 6, 8],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 794
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  try {
    if (window.showToast) {
      window.showToast('Generating E-Bill', 'Preparing your official PDF invoice...', 'info');
    }

    // Wait a frame for any images to complete rendering
    await new Promise(r => setTimeout(r, 100));

    await html2pdf().set(opt).from(element).save();

    if (window.showToast) {
      window.showToast('E-Bill Downloaded', `Saved as ${filename}`, 'success');
    }
  } catch (err) {
    console.error('html2pdf generation error, falling back to print dialog:', err);
    // Fallback: Trigger print preview
    printEBill(order);
  } finally {
    if (document.body.contains(tempWrap)) {
      document.body.removeChild(tempWrap);
    }
  }
}

// ── High-Fidelity Print Window / Fallback ──
export function printEBill(order) {
  const invoiceHtml = generateEBillHTML(order);
  const data = getInvoiceData(order);

  const printWindow = window.open('', '_blank', 'width=840,height=960');
  if (!printWindow) {
    // Popup blocked, open in iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    iframe.contentDocument.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>VedicFueloon Invoice ${data.invoiceNo}</title>
      </head>
      <body style="margin:0; padding:10px;">
        ${invoiceHtml}
      </body>
      </html>
    `);
    iframe.contentDocument.close();
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 2000);
    }, 400);
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>VedicFueloon Invoice - ${data.invoiceNo}</title>
      <style>
        body { margin: 0; padding: 20px; background: #eaeded; display: flex; justify-content: center; }
        .vf-ebill-sheet { box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 4px; }
      </style>
    </head>
    <body>
      ${invoiceHtml}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// ── Interactive Modal Preview for Customer & Admin ──
export function openEBillModal(order) {
  const data = getInvoiceData(order);
  let modalEl = document.getElementById('ebillPreviewModal');

  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'ebillPreviewModal';
    modalEl.className = 'modal-overlay ebill-modal-overlay';
    document.body.appendChild(modalEl);
  }

  modalEl.innerHTML = `
    <div class="modal ebill-modal-window">
      <!-- Modal Top Action Header -->
      <div class="ebill-modal-top-bar">
        <div class="ebill-modal-title-group">
          <div class="ebill-modal-badge">${ICONS.sparkle} OFFICIAL TAX INVOICE</div>
          <h2 class="ebill-modal-title">${data.invoiceNo}</h2>
          <span class="ebill-modal-sub">Order Total: ₹${Number(data.grandTotal).toFixed(2)} · ${data.paymentStatus}</span>
        </div>

        <div class="ebill-modal-actions">
          <button class="btn btn-primary btn-ripple btn-sm" id="btnDownloadPDFModal" style="display:inline-flex; align-items:center; gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download PDF
          </button>
          
          <button class="btn btn-outline btn-sm btn-ripple" id="btnPrintModal" style="display:inline-flex; align-items:center; gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print
          </button>

          <button class="modal-close ebill-close-btn" id="btnCloseModal" title="Close Invoice" style="font-size:24px; color:var(--cream-100);">
            ${ICONS.x}
          </button>
        </div>
      </div>

      <!-- Scrollable Paper Canvas -->
      <div class="ebill-paper-scroll">
        <div class="ebill-paper-shadow">
          ${generateEBillHTML(order)}
        </div>
      </div>
    </div>
  `;

  // Attach handlers
  document.getElementById('btnDownloadPDFModal').onclick = () => downloadEBillPDF(order);
  document.getElementById('btnPrintModal').onclick = () => printEBill(order);
  document.getElementById('btnCloseModal').onclick = () => modalEl.classList.remove('active');
  
  modalEl.onclick = (e) => {
    if (e.target === modalEl) modalEl.classList.remove('active');
  };

  modalEl.classList.add('active');
}

// Attach globally to window for onclick in template strings
if (typeof window !== 'undefined') {
  window.downloadEBill = function(orderId) {
    const order = Orders.getById(orderId) || Orders.get().find(o => o.id === orderId || o.invoiceNo === orderId);
    if (order) {
      downloadEBillPDF(order);
    } else {
      alert('Order not found for ID: ' + orderId);
    }
  };

  window.previewEBill = function(orderId) {
    const order = Orders.getById(orderId) || Orders.get().find(o => o.id === orderId || o.invoiceNo === orderId);
    if (order) {
      openEBillModal(order);
    } else {
      alert('Order not found for ID: ' + orderId);
    }
  };

  window.printEBillDirect = function(orderId) {
    const order = Orders.getById(orderId) || Orders.get().find(o => o.id === orderId || o.invoiceNo === orderId);
    if (order) {
      printEBill(order);
    } else {
      alert('Order not found for ID: ' + orderId);
    }
  };
}
