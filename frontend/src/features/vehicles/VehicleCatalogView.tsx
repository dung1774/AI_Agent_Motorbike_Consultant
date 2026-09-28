import { VehicleCatalog } from "./VehicleCatalog";
import Link from "next/link";

export function VehicleCatalogView() {
  return (
    <div className="page compact-page">
      <div className="container">
        <h1 className="sr-only">Mẫu xe Xe X</h1>
        <div className="cluster route-actions"><Link className="button button-secondary" href="/compare">So sánh mẫu xe</Link><Link className="button button-secondary" href="/installment">Ước tính trả góp</Link></div>
        <VehicleCatalog />
      </div>
    </div>
  );
}
