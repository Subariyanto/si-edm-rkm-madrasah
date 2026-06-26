export default function PrintHeader({ title, subtitle, madrasahName }) {
  return (
    <div className="print-only text-center mb-8 border-b-2 border-black pb-4">
      <p className="text-xs">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
      <p className="text-xs">KANTOR WILAYAH KEMENTERIAN AGAMA PROVINSI JAWA BARAT</p>
      {madrasahName && <p className="text-sm font-bold mt-1">{madrasahName}</p>}
      <h1 className="text-lg font-bold mt-3 uppercase">{title}</h1>
      {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
    </div>
  );
}