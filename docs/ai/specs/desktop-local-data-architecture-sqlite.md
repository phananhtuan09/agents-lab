## Tier
Extended

## Problem
Nếu data access của desktop app không có kiến trúc lớp, chiến lược migration, và ranh giới repository rõ ràng, component UI sẽ nhanh chóng đọc/ghi `SQLite` trực tiếp theo nhiều kiểu khác nhau và làm mất kiểm soát về state, schema, và khả năng thay đổi về sau.
Cần một spec riêng để khóa các pattern bền cho dữ liệu local: layered architecture phía app, dependency injection nhẹ, repository pattern, DTO boundary, và migration foundation cho `SQLite`.

## Scope
- Định nghĩa layered architecture cho desktop app ở mức renderer services, application logic, data access, và native boundary.
- Định nghĩa dependency injection baseline để wiring và testing không bị cứng.
- Định nghĩa repository pattern cho truy cập `SQLite`.
- Xác định vai trò của DTO trong mối quan hệ giữa database rows, app model, và presentation state.
- Thiết lập migration foundation cho `SQLite`.
- Xác định nguyên tắc phối hợp giữa frontend feature modules, repository layer, và local database file.

## Assumption Check
### Confirmed
- Có yêu cầu `design pattern`, `Layered Architecture`, `Dependency Injection`, `Repository Pattern`, và `DTO Pattern`.
- Kiến trúc đã đổi sang desktop app `Tauri`.
- Dữ liệu chính dùng `SQLite` local-first.

### Inferred But Safe
- Dù không có backend riêng, app vẫn cần kiến trúc lớp để tránh logic dữ liệu trộn vào component tree.
- DI vẫn cần ở mức practical để test app services và thay repository implementation khi cần.
- Migration foundation phải có ngay khi schema local dự kiến tiến hóa theo thời gian.
- Với app cá nhân local-first, `SQLite` là database đủ mạnh cho giai đoạn nền mà không cần tăng độ phức tạp hệ thống.

### Needs Confirmation
- Không có.

### Chosen To Keep Scope Small
- Slice này chỉ chốt pattern và foundation, chưa mô tả domain model nghiệp vụ cụ thể.
- Repository pattern được giới hạn ở contract và trách nhiệm, chưa mở rộng sang query DSL hoặc specification pattern.
- Migration baseline chỉ cần đủ cho tiến hóa schema có kiểm soát, chưa bao trùm sync, replication, hay multi-device reconciliation.
- DI được giữ ở mức composition root và testability, chưa thêm container abstraction nặng.
- Nếu feature đầu tiên còn rất nhỏ, có thể dùng service + mapper đơn giản trước khi mở rộng repository abstraction sâu hơn.

## Key Behavioral Rules
- Ứng dụng phải tách rõ UI, application/service logic, repository/data access, và native command concerns ở mức cấu trúc và trách nhiệm.
- Component UI không được gọi truy vấn `SQLite` trực tiếp cho application data nếu đã có feature service hoặc repository tương ứng.
- Truy cập dữ liệu phải đi qua repository boundary nhất quán thay vì query rải rác trong component hoặc state store.
- DTO không thay thế app model; DTO chỉ là contract dữ liệu giữa data source, app service, và UI/state.
- Schema changes phải đi qua migration workflow, không sửa tay không kiểm soát trên database file runtime.
- Database file phải nằm ở vị trí phù hợp với app desktop, không ghi tạm bợ vào thư mục làm việc ngẫu nhiên.

## Agent Constraints Chosen For This Slice
- Chọn layered architecture cổ điển ở cấp app thay vì CQRS hoặc event sourcing ở giai đoạn nền.
- Chọn DI ở mức practical composition và testability, chưa thêm IoC container.
- Chọn repository pattern như chuẩn bắt buộc cho `SQLite` data access của application data.
- Chọn migration workflow đơn giản, version-controlled, phù hợp với local database.

## Technical Approach
Xem dữ liệu của desktop app như một hệ thống nhiều lớp trong chính client application: feature UI gọi application services, application services gọi repositories, repositories nói chuyện với `SQLite`, và mọi kết quả được map qua DTO trước khi đi vào state hoặc component. Migrations được quản lý như một phần của database contract để giữ schema local thay đổi có kiểm soát trong suốt vòng đời ứng dụng.

## Architecture / Pattern Notes
- Layered architecture là rule tổ chức trách nhiệm, không chỉ là cách đặt thư mục.
- Repository là boundary cho data access, không phải nơi nhồi business rule presentation.
- DI phải phục vụ testability và thay thế implementation, không biến thành ceremony.

## Acceptance Criteria
### Layer boundaries
- [ ] AC1: App có quy ước kiến trúc lớp rõ để UI, application/service logic, repository/data access, và native command concerns không bị trộn trách nhiệm.
- [ ] AC2: Application logic có thể được mô tả và test mà không cần render UI thật hoặc gọi raw database access trực tiếp.
- [ ] AC3: State management không kiêm luôn vai trò data source; `Zustand` chỉ tiêu thụ data qua service/repository boundary.

### Dependency injection
- [ ] AC4: Hệ thống có cơ chế wiring dependency đủ rõ để thay repository implementation theo môi trường hoặc mục đích test.
- [ ] AC5: App service hoặc use-case layer không tự tạo phụ thuộc dữ liệu theo kiểu hard-coded bên trong feature flow.

### Persistence and migration
- [ ] AC6: Truy cập `SQLite` application data đi qua repository boundary nhất quán.
- [ ] AC7: Schema changes đi qua migration workflow chuẩn của app.
- [ ] AC8: Có baseline để quản lý vòng đời migration trong local development và khi app mở database lần đầu.
- [ ] AC9: Database file được tạo và dùng ở vị trí local ổn định, phù hợp với desktop app runtime.

### Data contract boundaries
- [ ] AC10: DTO được dùng ở những ranh giới cần trao đổi dữ liệu, không để raw row hoặc driver response rò thẳng vào state hoặc component.
- [ ] AC11: Repository contract và DTO boundary đủ rõ để các feature sau có thể thêm entity/use-case mới mà không phải phá nền kiến trúc đã chọn.

## Edge Cases / Failure States
- Component UI gọi trực tiếp truy vấn database và bỏ qua repository boundary.
- Schema bị đổi ngoài migration workflow dẫn tới lệch trạng thái database local.
- State store lưu raw row/driver response khiến presentation phụ thuộc chặt vào data source.
- Database file không khởi tạo được hoặc path không hợp lệ nhưng app fail im lặng.

## Out of Scope
- Thiết kế domain model cụ thể.
- Cloud sync, multi-device sync, hoặc remote backup.
- Event sourcing, CQRS, và saga orchestration.
- Native local database đồng bộ offline với server ngoài.

## Open Questions
- Không có.

## Decision Log
- Tách riêng data architecture để mọi quyết định pattern nhạy cảm được review trước khi có business code.
- Chọn `SQLite` local-first thay vì `Supabase` để giữ data layer nhỏ và dễ hiểu cho app cá nhân.
- Chọn migration workflow version-controlled ngay từ đầu để tránh drift schema local.
