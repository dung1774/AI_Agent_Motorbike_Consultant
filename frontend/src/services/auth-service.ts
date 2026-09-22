import type { AuthSession, AuthUser, LoginCredentials, RegisterData, UserRole } from "@/types/auth";
import type { ServiceResult } from "@/lib/types";

const SESSION_KEY = "xe_x_auth_session";
const REGISTERED_USERS_KEY = "xe_x_registered_users";

export const DEMO_CREDENTIALS: Array<{
  role: UserRole;
  roleLabel: string;
  email: string;
  password: string;
  name: string;
  description: string;
}> = [
  {
    role: "user",
    roleLabel: "Khách hàng",
    email: "user@xex.vn",
    password: "Demo@123",
    name: "Nguyễn Văn An",
    description: "Trải nghiệm tư vấn, chọn xe, so sánh và đặt cọc",
  },
  {
    role: "employee",
    roleLabel: "Nhân viên / Tư vấn viên",
    email: "employee@xex.vn",
    password: "Demo@123",
    name: "Trần Thị Vy",
    description: "Quản lý lead, tiếp nhận handoff và tư vấn khách",
  },
  {
    role: "admin",
    roleLabel: "Quản trị viên",
    email: "admin@xex.vn",
    password: "Demo@123",
    name: "Quản trị viên Hệ thống",
    description: "Theo dõi chuyển đổi, định tuyến AI và catalog",
  },
];

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
const toResult = <T,>(data: T): ServiceResult<T> => ({
  data,
  receivedAt: new Date().toISOString(),
});

interface RegisteredAccount {
  user: AuthUser;
  passwordDigest: string;
}

async function digestPassword(password: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RegisteredAccount[];
    return Array.isArray(parsed)
      ? parsed.filter((account) => account?.user?.role === "user" && Boolean(account.passwordDigest))
      : [];
  } catch {
    window.localStorage.removeItem(REGISTERED_USERS_KEY);
    return [];
  }
}

function saveRegisteredAccount(account: RegisteredAccount) {
  if (typeof window === "undefined") return;
  try {
    const accounts = getRegisteredAccounts();
    accounts.push(account);
    window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(accounts));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export interface AuthService {
  login(credentials: LoginCredentials): Promise<ServiceResult<AuthUser>>;
  register(data: RegisterData): Promise<ServiceResult<AuthUser>>;
  logout(): Promise<ServiceResult<void>>;
  getCurrentUser(): AuthUser | null;
  getStoredSession(): AuthSession | null;
}

export const mockAuthService: AuthService = {
  async login(credentials) {
    await wait(400);
    const emailNorm = credentials.email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(emailNorm) || !credentials.password) {
      throw new Error("Vui lòng nhập email và mật khẩu hợp lệ.");
    }

    // Check predefined demo fixtures
    const demo = DEMO_CREDENTIALS.find((u) => u.email.toLowerCase() === emailNorm);
    if (demo) {
      if (credentials.password !== demo.password) {
        throw new Error("Email hoặc mật khẩu không đúng.");
      }
      const user: AuthUser = {
        id: `demo-${demo.role}`,
        name: demo.name,
        email: demo.email,
        role: demo.role,
        phone: demo.role === "user" ? "0912 345 678" : "0901 888 999",
      };
      const session: AuthSession = {
        user,
        token: `mock-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      return toResult(user);
    }

    // Check accounts created through public registration.
    const registered = getRegisteredAccounts().find(
      (account) => account.user.email.toLowerCase() === emailNorm
    );
    if (registered && registered.passwordDigest === (await digestPassword(credentials.password))) {
      const session: AuthSession = {
        user: registered.user,
        token: `mock-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      return toResult(registered.user);
    }

    throw new Error("Email hoặc mật khẩu không đúng.");
  },

  async register(data) {
    await wait(500);
    if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.password) {
      throw new Error("Vui lòng điền đầy đủ các thông tin bắt buộc.");
    }
    if (data.password.length < 6 || data.password !== data.confirmPassword) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự và khớp phần xác nhận.");
    }
    const emailNorm = data.email.trim().toLowerCase();

    // Prevent registering under demo emails
    if (DEMO_CREDENTIALS.some((u) => u.email.toLowerCase() === emailNorm)) {
      throw new Error("Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.");
    }
    if (getRegisteredAccounts().some((account) => account.user.email.toLowerCase() === emailNorm)) {
      throw new Error("Email này đã được đăng ký.");
    }

    // New registrations are ALWAYS role = "user"
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: emailNorm,
      phone: data.phone.trim(),
      role: "user",
    };

    saveRegisteredAccount({
      user: newUser,
      passwordDigest: await digestPassword(data.password),
    });

    const session: AuthSession = {
      user: newUser,
      token: `mock-token-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return toResult(newUser);
  },

  async logout() {
    await wait(150);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_KEY);
    }
    return toResult(undefined);
  },

  getCurrentUser() {
    const session = this.getStoredSession();
    return session ? session.user : null;
  },

  getStoredSession() {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthSession;
      const validRole = ["user", "employee", "admin"].includes(parsed?.user?.role);
      if (!validRole || !parsed.expiresAt || new Date(parsed.expiresAt).getTime() < Date.now()) {
        window.localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return parsed;
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },
};
