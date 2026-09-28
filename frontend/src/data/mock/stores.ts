export interface DemoStore {
  id: string;
  name: string;
  area: string;
}

// Khu vực minh họa, không phải địa chỉ cửa hàng VinFast thật.
export const demoStores: DemoStore[] = [
  { id: "demo-hn", name: "Điểm demo Hà Nội", area: "Hà Nội" },
  { id: "demo-dn", name: "Điểm demo Đà Nẵng", area: "Đà Nẵng" },
  { id: "demo-hcm", name: "Điểm demo TP.HCM", area: "TP. Hồ Chí Minh" },
];
