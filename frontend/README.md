# Xe X frontend

Interactive, mobile-first Next.js demo for the Xe X electric motorbike consultation journey. This frontend runs independently with local mock data and mock services; it does not call FastAPI, a database, or an LLM.

## Chạy frontend trên Windows

Frontend này chạy độc lập bằng dữ liệu mock; không cần bật FastAPI, database hoặc cấu hình API key.

### 1. Cài Node.js và pnpm (chỉ làm một lần trên mỗi máy)

Tải **Node.js 24 LTS** từ [trang tải chính thức của Node.js](https://nodejs.org/en/download), chọn bản cài đặt Windows và chạy trình cài đặt. Node.js đi kèm `npm`. Sau khi cài, **đóng PowerShell cũ và mở cửa sổ mới**, rồi kiểm tra:

```powershell
node --version
npm --version
```

Nếu PowerShell vẫn báo không nhận `node` hoặc `npm`, kiểm tra lại quá trình cài Node.js và mở terminal mới. Tiếp theo cài pnpm bằng npm:

```powershell
npm install --global pnpm@11.19.0
pnpm --version
```

Các lệnh của dự án đã được kiểm tra với Node.js `v24.19.0` và pnpm `11.19.0`. Nếu lệnh `pnpm` chưa được nhận sau khi cài, mở PowerShell mới rồi thử lại. Thông báo có phiên bản pnpm mới chỉ là gợi ý cập nhật, không cản trở chạy dự án.

### 2. Cài Next.js và chạy dự án

Sau khi clone, mở **PowerShell tại thư mục gốc của repo** (thư mục chứa `frontend`), rồi chạy:

```powershell
Set-Location -LiteralPath '.\frontend'
Test-Path -LiteralPath 'package.json'
pnpm install --frozen-lockfile
pnpm exec next --version
pnpm dev
```

`Test-Path` phải trả về `True`. Lệnh `pnpm install --frozen-lockfile` sẽ tự cài **Next.js 15.5.10**, React và các thư viện được khai báo trong `package.json` vào `frontend/node_modules`; `pnpm exec next --version` xác nhận phiên bản đã cài. Không cần cài Next.js toàn cục hoặc tạo lại dự án bằng `create-next-app` ([hướng dẫn Next.js](https://nextjs.org/docs/app/getting-started/installation)). Giữ terminal chạy và mở URL hiện ở dòng `Local:` (thông thường là <http://localhost:3000>). Dừng server bằng `Ctrl+C`. Nếu bạn dùng **Git Bash / MINGW64**, thay lệnh `Set-Location` bằng `cd frontend`; các lệnh còn lại giữ nguyên.

Nếu cổng `3000` đang được sử dụng, dừng server cũ hoặc chạy `pnpm exec next dev -p 3001` và mở <http://localhost:3001>. Không chạy `pnpm dev` ở thư mục gốc của repo, vì `package.json` nằm trong `frontend`.

Để kiểm tra mã nguồn, dừng dev server trước rồi chạy `pnpm run typecheck` và `pnpm run build`. Muốn chạy bản production, dùng `pnpm start` **sau khi** build thành công; `pnpm start` không thay cho `pnpm dev` ở lần chạy đầu.

## Demo authentication

The browser-only mock session is stored in `localStorage`. Public registration always creates a `user`; it cannot create employee or admin accounts.

| Role | Email | Password | Home |
|---|---|---|---|
| User | `user@xex.vn` | `Demo@123` | `/user` |
| Employee | `employee@xex.vn` | `Demo@123` | `/employee` |
| Admin | `admin@xex.vn` | `Demo@123` | `/admin` |

Protected routes redirect guests to `/login` and signed-in users without the required role to `/unauthorized`.

## Main routes

- `/` — landing page
- `/user` — customer dashboard
- `/advisor` — conversational needs discovery, recommendation, and employee handoff
- `/vehicles` — filterable vehicle catalog
- `/compare` — responsive vehicle comparison
- `/cost` — electric-versus-petrol energy cost calculator
- `/installment` — installment estimate and staff handoff
- `/stores` — mock store search and map abstraction
- `/deposit` — validated mock vehicle-hold flow
- `/profile` — customer profile and mock activity
- `/employee` — employee lead queue and status workflow
- `/sales` — backward-compatible alias for the employee workspace
- `/admin` — minimal mock-system overview
- `/login`, `/register` — demo login and public customer registration

## Frontend structure

Business UI is grouped by feature under `src/features` (for example `vehicles`, `consultation`, and `reservation`). Truly reusable UI, layouts, and route guards live under `src/shared`. Next.js App Router entrypoints remain thin files under `src/app`; data, types, contexts, and service boundaries stay outside presentation folders. `src/pages` is intentionally not used because Next.js reserves it for the Pages Router.

## Integration boundary

UI components consume typed service interfaces from `src/lib/api.ts`. The current implementation lives in `src/services/mock-services.ts`; a future FastAPI adapter can replace it without rewriting the pages or domain components.

All vehicle, store, and lead fixtures are isolated in `src/data/mock/`. Numeric vehicle data is explicitly marked as demo data until verified catalog sources are available.
