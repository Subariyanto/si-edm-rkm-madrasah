export default function PrintFooter({ page }) {
  return (
    <div className="print-only text-center text-xs text-gray-500 mt-8 pt-4 border-t">
      <p>Dokumen ini dicetak pada: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      {page && <p>Halaman {page}</p>}
    </div>
  );
}