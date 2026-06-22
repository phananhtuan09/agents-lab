## Tier
Standard

## Problem
Nếu nền dự án không có baseline chất lượng local từ sớm, regressions sẽ xuất hiện ngay khi số lượng module tăng và việc debug sẽ phụ thuộc hoàn toàn vào cảm tính.
Cần một spec riêng cho baseline kiểm tra local tối thiểu để bảo vệ codebase desktop `Tauri` mà không lôi thêm CI/CD hay automation chưa cần.

## Scope
- Thiết lập baseline cho test/check ở renderer và native host.
- Xác định những kiểm tra tối thiểu phải chạy trước khi coi một thay đổi là an toàn.
- Xác định tiêu chí pass/fail cơ bản cho codebase mới.

## Assumption Check
### Confirmed
- Không cần `CI/CD` hoặc `Github Actions` trong phase hiện tại.
- Vẫn cần baseline chất lượng tối thiểu để tránh vỡ foundation.

### Inferred But Safe
- Renderer TypeScript và native Rust host đều cần check riêng vì có runtime và rủi ro khác nhau.
- Với phase đầu, local lint/type-check/test có giá trị hơn release automation.

### Needs Confirmation
- Không có.

### Chosen To Keep Scope Small
- Slice này chỉ cần local quality baseline, không bao gồm CI, CD, hoặc pipeline từ xa.
- Chưa yêu cầu end-to-end testing, visual regression, hay performance benchmarking.
- Chưa yêu cầu gate theo coverage cứng nếu chưa có đủ bề mặt test ổn định.

## Key Behavioral Rules
- Renderer và native host phải có cách chạy test/check nhất quán và tài liệu hóa được.
- Renderer phải có lint và type-check baseline chạy được local.
- Native host phải có format/lint và test/check baseline chạy được local.
- Một thay đổi không được coi là hoàn chỉnh nếu làm vỡ các check nền đã chọn.

## Agent Constraints Chosen For This Slice
- Chọn local-first quality baseline, không thêm GitHub Actions hoặc CI service.
- Chọn baseline static checks gồm `eslint` và TypeScript type-check cho renderer, `cargo fmt --check`, `cargo clippy`, và `cargo test` cho native host.
- Chọn unit test/check nền trước, chưa kéo theo integration test hay end-to-end để tránh dàn trải.

## Technical Approach
Thiết lập quality gate nền ở mức vừa đủ để giữ cho repository mới không trượt nhanh về độ tin cậy: renderer và native host đều có test/check entrypoint rõ ràng, và mọi người làm việc với repo có thể chạy cùng một bộ lệnh local trước khi tiếp tục phát triển. Slice này chỉ tập trung vào lint, type-check, test, và buildability cơ bản.

## Architecture / Pattern Notes
- Testing là năng lực của từng lớp, không chỉ là bước sau cùng.
- Quality foundation phải thực dụng, tránh build một hệ automation lớn khi codebase còn chưa có nghiệp vụ thật.

## Acceptance Criteria
### Local quality baseline
- [ ] AC1: Renderer có `eslint` và TypeScript type-check chạy được local.
- [ ] AC2: Native host có `cargo fmt --check`, `cargo clippy`, và `cargo test` chạy được local.
- [ ] AC3: Có cách chạy test/check cho renderer và native host được tài liệu hóa rõ ràng.
- [ ] AC4: Repository có baseline quality gate đủ để ngăn tiếp tục phát triển trên nền đang fail lint, type-check, hoặc test nền.

## Edge Cases / Failure States
- Renderer pass nhưng native host fail, hoặc ngược lại, và người làm phải nhìn ra rõ lớp nào đang hỏng.
- Test/check baseline quá gắn với hạ tầng ngoài khiến local không lặp lại được.

## Out of Scope
- GitHub Actions, CI/CD, và remote automation.
- End-to-end testing.
- Visual regression testing.
- Load testing hoặc security scanning nâng cao.

## Open Questions
- Không có.

## Decision Log
- Tách local quality baseline khỏi bootstrap để có thể siết chất lượng dần mà không kéo theo CI/CD.
- Chọn local commands rõ ràng thay vì automation từ xa trong phase hiện tại.
