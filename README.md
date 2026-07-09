# SIMILOCK V3 Enterprise Design + Firebase CMS

## Đã có
- Giao diện Ultra/Enterprise gọn, sang, mobile-first.
- Firebase config của project similock-enterprise-seo.
- Form lead lưu Firestore collection `leads`.
- Admin login bằng Firebase Authentication, email admin: `jackphamvn@gmail.com`.
- Firestore rules bảo mật: khách chỉ tạo lead, admin mới đọc/sửa dữ liệu.
- Trang SEO: trang chủ, khóa căn hộ, cửa nhôm Xingfa, cổng sắt, FaceID, dự án, blog, liên hệ.
- Khu vực gắn YouTube, TikTok, Google Maps.
- Chỗ dán GA4, Facebook Pixel, TikTok Pixel trong `<head>`.

## Việc cần làm trên Firebase
1. Bật Firestore Database ở Production mode.
2. Bật Authentication > Email/Password.
3. Tạo user `jackphamvn@gmail.com`.
4. Copy `firestore.rules` vào Firestore Rules và Publish.
5. Deploy bằng Firebase Hosting.

## Gắn YouTube
Trong `index.html`, tìm iframe YouTube và thay bằng video/playlist thật nếu cần.

## Gắn TikTok
Vào TikTok > Share > Embed > copy mã embed và dán vào khu vực TikTok trong `index.html`.

## Gắn Google Analytics / Pixel
Dán mã GA4, Facebook Pixel, TikTok Pixel tại phần comment trong `<head>` của các file HTML.
