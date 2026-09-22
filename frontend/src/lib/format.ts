export const formatVnd = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
export const formatNumber = (value: number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(value);
