import Link from "next/link";

export function BrandMark({ compact = false, href = "/" }: { compact?: boolean; href?: string }) {
  return (
    <Link className="brand" href={href} aria-label="Xe X — về trang chủ">
      <span className="brand-mark" aria-hidden="true">X</span>
      {!compact && (
        <span>
          <strong>XE X</strong>
          <small>Trợ lý xe điện</small>
        </span>
      )}
    </Link>
  );
}
