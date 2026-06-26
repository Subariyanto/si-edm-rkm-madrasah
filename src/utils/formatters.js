export function formatRupiah(amount) {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatPercent(value) {
  if (value === null || value === undefined) return '-';
  return `${Math.round(value)}%`;
}

export function getSKPMColor(skpm) {
  if (skpm > 80) return 'text-green-700';
  if (skpm > 60) return 'text-blue-700';
  if (skpm > 40) return 'text-yellow-700';
  return 'text-red-700';
}

export function getSKPMBgColor(skpm) {
  if (skpm > 80) return 'bg-green-500';
  if (skpm > 60) return 'bg-blue-500';
  if (skpm > 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function getTahunAjaran() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-based
  if (month >= 7) {
    return `${year}/${year + 1}`;
  }
  return `${year - 1}/${year}`;
}

export default { formatRupiah, formatNumber, formatDate, formatDateTime, formatPercent, getSKPMColor, getSKPMBgColor, getTahunAjaran };