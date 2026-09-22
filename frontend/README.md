# Xe X frontend

Interactive, mobile-first Next.js demo for the Xe X electric motorbike consultation journey. This frontend runs independently with local mock data and mock services; it does not call FastAPI, a database, or an LLM.

## Chạy frontend trên Windows

Frontend này chạy độc lập bằng dữ liệu mock; không cần bật FastAPI, database hoặc cấu hình API key.

Các lệnh dưới đây đã được kiểm tra với Node.js `v24.19.0` và pnpm `11.19.0`. Cài Node.js trước nếu PowerShell báo không nhận lệnh `node`. Sau khi cài, mở **cửa sổ terminal mới** và kiểm tra:

```powershell
node --version
npm --version
pnpm --version
```

Nếu chỉ thiếu `pnpm`, cài bằng `npm install --global pnpm@11.19.0`, rồi mở terminal mới và chạy lại `pnpm --version`.

Trong **PowerShell**, vào đúng thư mục chứa `package.json` của frontend:

```powershell
Set-Location -LiteralPath 'C:\Users\DELL\Desktop\VinUni\AI_Agent_Motorbike_Consultant\frontend'
Test-Path -LiteralPath 'package.json'
pnpm install --frozen-lockfile
pnpm dev
```

`Test-Path` phải trả về `True`. Giữ terminal chạy và mở URL hiện ở dòng `Local:` (thông thường là <http://localhost:3000>). Dừng server bằng `Ctrl+C`. Nếu bạn dùng **Git Bash / MINGW64**, lệnh vào thư mục tương ứng là `cd /c/Users/DELL/Desktop/VinUni/AI_Agent_Motorbike_Consultant/frontend`; ba lệnh còn lại giữ nguyên.

Nếu cổng `3000` đang được sử dụng, dừng server cũ hoặc chạy `pnpm exec next dev -p 3001` và mở <http://localhost:3001>. Không chạy `pnpm dev` ở thư mục gốc `AI_Agent_Motorbike_Consultant`, vì `package.json` nằm trong `frontend`.

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
