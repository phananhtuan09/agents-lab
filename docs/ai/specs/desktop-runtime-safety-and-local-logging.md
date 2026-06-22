## Tier
Standard

## Problem
Desktop app vẫn cần một lớp an toàn runtime tối thiểu để không tự mở rộng capability native quá mức, đồng thời cần log file local đủ để debug khi có lỗi.
Không cần auth ở phase này, nhưng vẫn cần nguyên tắc an toàn cho renderer, native host, và local logging.

## Scope
- Định nghĩa baseline an toàn cho `Tauri` capabilities/native permissions.
- Định nghĩa baseline `CSP` và giảm rủi ro XSS cho renderer.
- Thiết lập local file logging ở mức đủ dùng cho debug và theo dõi lỗi thủ công.
- Thiết lập error boundary và loading/error fallback nền ở renderer.

## Assumption Check
### Confirmed
- Không cần auth cho project cá nhân ở phase hiện tại.
- Log file local là đủ; chưa cần external logging service.

### Inferred But Safe
- Dù là app cá nhân local-first, renderer vẫn cần `CSP` và native host vẫn cần allowlist capability để tránh surface thừa.
- Error boundary và fallback nền có giá trị ngay cả khi chưa có nghiệp vụ thật.

### Needs Confirmation
- Không có.

### Chosen To Keep Scope Small
- Slice này không bao gồm auth, role, permission system, hoặc account management.
- Slice này không bao gồm Sentry, telemetry, crash reporting service, hoặc audit trail sâu.
- Logging chỉ cần ở mức file local đủ đọc bằng tay, chưa cần hệ thống phân tích log.

## Key Behavioral Rules
- Tauri native permissions/capabilities phải theo allowlist tối thiểu, không mở shell/file-system/process nếu chưa thật sự dùng.
- Renderer phải có baseline `CSP` và giảm rủi ro XSS cho bề mặt hiển thị.
- App phải có local file logging đủ để ghi lỗi và sự kiện nền quan trọng.
- Error runtime không được biến mất im lặng; renderer phải có fallback đủ rõ để người dùng biết app đang lỗi.
- Logging không được lộ bí mật hoặc dữ liệu nhạy cảm ra file log một cách vô tội vạ.

## Agent Constraints Chosen For This Slice
- Chọn runtime safety ở mức capability allowlist, `CSP`, file logging, và error boundary; không mở rộng sang security analytics.
- Chọn file logging local thay vì external logging service để giữ foundation nhỏ.

## Technical Approach
Đặt runtime safety thành một lớp foundation tách biệt với feature logic: Tauri host chỉ mở những capability thật sự cần, renderer có `CSP` và error boundary nền, còn logging ghi ra file local để hỗ trợ debug và chẩn đoán thủ công. Spec này không kéo theo auth hay cloud observability.

## Architecture / Pattern Notes
- Runtime safety là cross-cutting concern của renderer và native host.
- Logging là công cụ hỗ trợ vận hành local, không phải business feature.

## Acceptance Criteria
### Native safety baseline
- [ ] AC1: Tauri capabilities/native permissions được giới hạn ở mức tối thiểu cần thiết cho foundation này.
- [ ] AC2: Native surface không mặc định mở shell hoặc capability nguy hiểm khi chưa thật sự dùng.

### Renderer resilience
- [ ] AC3: Có baseline `CSP` và giảm rủi ro XSS cho renderer.
- [ ] AC4: Frontend có error boundary nền để chặn lỗi render ngoài ý muốn và hiển thị fallback an toàn.
- [ ] AC5: Frontend có loading/error fallback nền đủ để không fail im lặng trong các thao tác async cơ bản.

### Local logging
- [ ] AC6: App có local file logging đủ để ghi lỗi và sự kiện nền quan trọng.
- [ ] AC7: Khi file log hoặc log path có lỗi, app không được fail im lặng.

## Edge Cases / Failure States
- Capability cấu hình quá rộng so với nhu cầu thực tế của foundation.
- `CSP` quá chặt làm hỏng bề mặt renderer cơ bản.
- File log không tạo được hoặc không ghi được nhưng app không báo rõ.

## Out of Scope
- Auth, account management, và session handling.
- Sentry, telemetry, hoặc external crash reporting.
- Permission matrix và runtime policy phức tạp theo người dùng.

## Open Questions
- Không có.

## Decision Log
- Bỏ auth khỏi foundation để phù hợp use case app cá nhân local-first.
- Chọn file logging local thay vì external logging để giữ hệ thống nhỏ và dễ debug.
