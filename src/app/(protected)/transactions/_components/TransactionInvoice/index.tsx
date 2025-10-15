'use client';

import React, { useRef } from 'react';

import { Categories } from '@/domains/product/types';
import { TransactionData, TransactionStatus } from '@/domains/transaction/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Button from '@/components/shared/Button';

import { formatCurrency, normalCase, parseDate } from '@/lib/utils/helper';

interface TransactionInvoiceModalProps {
  transaction: TransactionData;
}

const TransactionInvoice: React.FC<TransactionInvoiceModalProps> = ({ transaction }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    console.log('Generating invoice PDF...');

    const element = invoiceRef.current;

    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(element, {
      scale: 5, // higher for better clarity
      useCORS: true,
      backgroundColor: '#ffffff', 
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(`${transaction.referenceNumber}.pdf`);
  };

  const totalBill =
    transaction.products?.reduce((sum, p) => sum + (p.priceAtSale ?? 0) * (p.quantity ?? 0), 0) ??
    0;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Download button */}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleDownloadPDF}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--chart-1-hover)] rounded-[var(--radius)]"
        >
          Download PDF
        </Button>
      </div>

      {/* Invoice card */}
      <div
        ref={invoiceRef}
        className="w-full max-w-md rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm p-6 text-[var(--foreground)]"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 space-y-2">
          <h1 className="text-xl font-semibold text-[var(--primary)]">Transaction Invoice</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Ref: {transaction.referenceNumber}
          </p>

          <div className="flex justify-center mt-6">
            <span
              className={`
      inline-block px-5 py-2 font-extrabold text-lg uppercase tracking-widest
      border-2 rounded-sm select-none
      ${
        transaction.status === TransactionStatus.PAID
          ? 'text-[var(--success)] border-[var(--success)]'
          : 'text-[var(--destructive)] border-[var(--destructive)]'
      }
    `}
              style={{
                transform: 'rotate(-8deg)',
                display: 'inline-block',
                letterSpacing: '2px',
                boxShadow: '0 0 0 2px currentColor inset',
                opacity: 0.9,
              }}
            >
              {normalCase(TransactionStatus[transaction.status])}
            </span>
          </div>
        </div>

        {/* Transaction info */}
        <div className="text-sm space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Date:</span>
            <span>{parseDate(transaction.createdAt)}</span>
          </div>
          {transaction.paidAt && (
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">Paid At:</span>
              <span>{parseDate(transaction.paidAt)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Total Items:</span>
            <span>{transaction.products?.length ?? 0}</span>
          </div>
        </div>

        {/* Product list */}
        <div className="border-t border-[var(--border)] pt-4 space-y-4">
          {transaction.products?.map((p) => {
            const product = typeof p.product === 'object' && p.product !== null ? p.product : null;
            const subtotal = (p.priceAtSale ?? 0) * (p.quantity ?? 0);

            return (
              <div
                key={p._id}
                className="flex flex-col border-b border-dashed border-[var(--border)] pb-3 last:border-none"
              >
                <div className="flex justify-between font-medium">
                  <span>{product?.name ?? 'Unknown Product'}</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="text-xs text-[var(--muted-foreground)] flex justify-between mt-1">
                  <span>
                    Category:{' '}
                    {product ? normalCase(Categories[product.category] ?? product.category) : '-'}
                  </span>
                  <span>
                    {p.quantity} × {formatCurrency(p.priceAtSale)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="mt-6 border-t border-[var(--border)] pt-4 text-right">
          <p className="text-lg font-semibold">Total Amount</p>
          <p className="text-2xl font-bold text-[var(--primary)]">{formatCurrency(totalBill)}</p>
        </div>

        {/* Note */}
        {transaction.note && (
          <div className="mt-6 text-sm italic text-[var(--muted-foreground)] border-t border-[var(--border)] pt-3">
            Note: {transaction.note}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionInvoice;
