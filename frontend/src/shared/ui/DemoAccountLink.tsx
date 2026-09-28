"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDemoRole } from "@/lib/demo-workflows";

export function DemoAccountLink() {
  const [isCustomer, setIsCustomer] = useState(false);
  useEffect(() => {
    const refresh = () => setIsCustomer(getDemoRole() === "customer");
    refresh();
    window.addEventListener("xe-x-demo-change", refresh);
    return () => window.removeEventListener("xe-x-demo-change", refresh);
  }, []);
  return <Link className="header-login" href={isCustomer ? "/account" : "/login"}>{isCustomer ? "Tài khoản demo" : "Đăng nhập"}</Link>;
}
