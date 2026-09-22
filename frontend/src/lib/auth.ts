import type { UserRole } from "@/types/auth";

const roleHome: Record<UserRole, string> = {
  user: "/user",
  employee: "/employee",
  admin: "/admin",
};

const rolePrefixes: Record<UserRole, string[]> = {
  user: ["/user", "/advisor", "/vehicles", "/compare", "/cost", "/installment", "/stores", "/deposit", "/profile"],
  employee: ["/employee", "/sales"],
  admin: ["/admin"],
};

export function getRedirectPathForRole(role: UserRole): string {
  return roleHome[role];
}

export function canRoleAccessPath(role: UserRole, pathname: string): boolean {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  return rolePrefixes[role].some(
    (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
  );
}

export function getSafeRedirectPath(role: UserRole, requestedPath?: string | null): string {
  if (!requestedPath || !requestedPath.startsWith("/") || requestedPath.startsWith("//")) {
    return getRedirectPathForRole(role);
  }
  return canRoleAccessPath(role, requestedPath)
    ? requestedPath
    : getRedirectPathForRole(role);
}
