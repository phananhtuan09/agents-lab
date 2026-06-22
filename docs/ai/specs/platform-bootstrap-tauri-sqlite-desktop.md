## Tier
Extended

## Problem
Repository hiện chưa có codebase desktop-first tối giản để chạy như ứng dụng cài đặt trên `Linux`, `macOS`, và `Windows`.
Cần một nền tảng thống nhất cho `Tauri + React/Vite + SQLite`, có theme, state, local data, file logging, và ranh giới native đủ rõ để bắt đầu làm feature mà không phải dựng lại foundation.

## Scope
- Khởi tạo codebase desktop app với `Tauri 2`, frontend `React + TypeScript + Vite`, và `pnpm`.
- Áp dụng dark theme `Signal Noir` theo tài liệu nền tại `docs/patterns/theme.md`.
- Thiết lập `Feature-based Architecture` cho frontend và baseline `Zustand` cho shared client state.
- Chuẩn hóa hợp đồng `.env` tối thiểu cho app desktop và các cấu hình build thật sự cần.
- Thiết lập nền dữ liệu local bằng `SQLite`.
- Thiết lập local file logging ở mức đủ dùng cho debug và theo dõi lỗi thủ công.
- Tạo app shell tối thiểu để xác nhận toàn bộ foundation hoạt động trong cửa sổ desktop.

## Assumption Check
### Confirmed
- Ứng dụng mục tiêu là desktop app chạy trên `Linux`, `macOS`, và `Windows`.
- Frontend phải dùng `Tailwind CSS`, `globals.css`, và theme đã chốt ở `docs/patterns/theme.md`.
- Có yêu cầu `.env`, `Zustand`, và `Feature-based Architecture`.
- Không cần auth cho phase hiện tại.
- Có thể dùng `SQLite` thay vì `Supabase`.

### Inferred But Safe
- Với desktop-first, `React + Vite` phù hợp hơn `Next.js` vì không cần `SSR` hay web server runtime.
- `pnpm` là package manager phù hợp cho codebase này để giảm overhead cài dependency.
- `SQLite` là lựa chọn thực dụng cho app cá nhân local-first, ít moving parts hơn cloud database.

### Needs Confirmation
- Không có.

### Chosen To Keep Scope Small
- Slice này chỉ dựng foundation chạy được, chưa triển khai nghiệp vụ thật.
- Slice này chưa bao gồm auth, sync cloud, sidecar binaries, system tray, deep-linking, hay multi-window flow.
- Slice này chưa bao gồm Sentry, auto-update, code signing, hoặc notarization workflow hoàn chỉnh.
- Frontend chỉ cần baseline `Zustand` store cho app-level state chung, chưa cần mô hình state phức tạp theo nhiều miền nghiệp vụ.

## Key Behavioral Rules
- Repository phải tạo ra một desktop app duy nhất, không có backend service riêng chạy kèm.
- Frontend phải khởi chạy với dark theme mặc định và tiêu thụ token từ `docs/patterns/theme.md`.
- Frontend phải được tổ chức theo `Feature-based Architecture`, trong đó feature modules là đơn vị chính cho UI, state, và presentation logic.
- `Zustand` là state management baseline cho shared client state; không đưa global app state quan trọng vào ad-hoc React context nếu không có lý do rõ ràng.
- Dữ liệu ứng dụng lưu local bằng `SQLite`; không phụ thuộc cloud database ở phase foundation này.
- App phải có file logging local đủ để xem lại lỗi và hành vi quan trọng mà không cần external logging service.
- Tauri native surface phải theo nguyên tắc allowlist: không bật plugin hoặc capability không thật sự cần.
- `.env` contract chỉ chứa những cấu hình thật sự cần cho local runtime hoặc build; thiếu cấu hình bắt buộc phải cho lỗi rõ ràng.

## Agent Constraints Chosen For This Slice
- Chọn `Tauri 2` làm desktop shell chuẩn cho toàn bộ slice nền.
- Chọn `React + TypeScript + Vite` làm renderer chuẩn thay vì `Next.js`.
- Chọn `SQLite` local-first thay vì `Supabase` để giảm độ phức tạp nền.
- Chọn không dùng sidecar, shell plugin, hoặc filesystem/plugin mở rộng ngoài những gì cần cho `SQLite` và file logging.

## Technical Approach
Thiết kế repository như một desktop application codebase gồm một webview frontend và một native host mỏng. Frontend dùng token-driven theming dựa trên `docs/patterns/theme.md`, `Feature-based Architecture`, và `Zustand` cho shared state. Native host của `Tauri` chỉ giữ các ranh giới native cần thiết. Dữ liệu ứng dụng lưu local bằng `SQLite`, còn log được ghi vào file local để phục vụ debug và support thủ công.

## Architecture / Pattern Notes
- Theme là foundation concern của renderer, không để component tự phát minh palette.
- Tauri host là native boundary, không phải nơi tái tạo một backend nội bộ nếu chưa có nhu cầu rõ.
- `SQLite` là data platform chính cho phase local-first này.

## Acceptance Criteria
### Repository foundation
- [ ] AC1: Repository có codebase desktop app chạy local được bằng luồng chuẩn của `Tauri`.
- [ ] AC2: Repository dùng `pnpm` cho dependency management phía frontend/workspace.
- [ ] AC3: Repository có mô tả rõ ràng để người mới có thể khởi chạy desktop app mà không phải đoán thêm cấu trúc nền.

### Renderer baseline
- [ ] AC4: Renderer dùng `React + TypeScript + Vite + Tailwind CSS` và dark theme `Signal Noir` làm mặc định, bám theo `docs/patterns/theme.md`.
- [ ] AC5: Global styling của renderer tiêu thụ token trung tâm cho background, surface, border, text, primary, và accent từ theme doc đã chốt.
- [ ] AC6: Renderer có một app shell đủ để nhìn thấy typography, panel, CTA, trạng thái muted, và accent theo theme.
- [ ] AC7: Renderer được tổ chức theo `Feature-based Architecture`, trong đó các feature mới có điểm đặt rõ cho UI, state, và presentation logic.
- [ ] AC8: Renderer có baseline `Zustand` store dùng được cho shared client state và được tách khỏi state cục bộ của component.

### Native host baseline
- [ ] AC9: Tauri host khởi chạy được cùng renderer và mở một desktop window chuẩn cho ứng dụng.
- [ ] AC10: Tauri host có ranh giới rõ cho native capabilities, không mặc định phơi toàn bộ API native cho renderer.
- [ ] AC11: Native host có điểm mở rộng rõ cho dữ liệu local, logging, và native command tối thiểu mà không phá kiến trúc nền.

### Local platform concerns
- [ ] AC12: `SQLite` được cấu hình ở mức foundation cho dữ liệu local của ứng dụng.
- [ ] AC13: App có local file logging đủ để ghi lại lỗi và sự kiện nền quan trọng ở mức dùng tay được.
- [ ] AC14: Thiếu biến môi trường hoặc cấu hình quan trọng tạo ra lỗi hoặc hướng dẫn khởi tạo rõ ràng ở đúng bề mặt liên quan.

## Edge Cases / Failure States
- Local environment thiếu cấu hình cần thiết nhưng app vẫn phải cho biết thiếu gì thay vì khởi động nửa chừng.
- Renderer chạy được nhưng theme token không thực sự áp lên UI mặc định.
- Tauri window mở được nhưng native capability surface bị cấu hình quá rộng so với nhu cầu foundation.
- File database hoặc file log không khởi tạo được nhưng app không được fail im lặng.

## Out of Scope
- Auth, sync cloud, Supabase, multi-user data, và remote API.
- Sidecar binaries, system tray, deep links, và multi-window orchestration.
- Sentry, auto-update, code signing, notarization, và release packaging hoàn chỉnh cho từng OS.
- Dashboard thật hoặc domain feature đầu tiên.

## Open Questions
- Không có.

## Decision Log
- Tách riêng bootstrap nền tảng khỏi data và quality để tránh biến foundation thành epic không thực thi được.
- Chọn `Tauri 2` để tối ưu desktop distribution và runtime footprint cho app cá nhân.
- Chọn `React + Vite` thay vì `Next.js` vì app không cần web server-first architecture.
- Chọn `SQLite` local-first thay vì `Supabase` để giữ foundation nhỏ, dễ hiểu, và dễ đóng gói.
- Chọn `Feature-based Architecture` và `Zustand` ngay từ slice nền để FE không tự hình thành nhiều cách tổ chức/state khác nhau.
