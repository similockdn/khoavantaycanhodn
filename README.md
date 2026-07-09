# SIMILOCK Enterprise SEO + Firebase CMS

## Bộ này gồm gì?
- Website nhiều trang SEO: Trang chủ, khóa căn hộ, khóa cửa nhôm Xingfa, khóa cổng sắt, khóa FaceID, dự án bàn giao, blog, liên hệ.
- Firebase Firestore lưu lead, sản phẩm, dự án, FAQ.
- Admin CMS: `admin.html`.
- SEO kỹ thuật: title/meta/canonical, LocalBusiness schema, sitemap.xml, robots.txt, mobile CTA, internal link.
- Form lead lưu vào Firestore hoặc localStorage khi demoMode=true.

## Cấu hình Firebase
1. Tạo Firebase Project.
2. Tạo Web App và copy config.
3. Mở `assets/js/firebase-config.js`.
4. Dán config thật.
5. Đổi `demoMode = false`.
6. Thêm email admin vào `adminEmails` và Firestore Rules.
7. Bật Authentication > Email/Password.
8. Tạo user admin.
9. Firestore Database > Rules > dán `firestore.rules` > Publish.

## Deploy Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting firestore
firebase deploy
```

## Việc cần làm để SEO mạnh hơn sau khi upload
- Thay ảnh minh họa bằng ảnh thật SIMILOCK và ảnh bàn giao thật.
- Gửi sitemap trong Google Search Console.
- Gắn GA4, Facebook Pixel, TikTok Pixel, Zalo OA nếu chạy quảng cáo.
- Cập nhật dự án bàn giao hằng tuần trong Admin.
- Viết thêm 2-3 bài blog/tháng theo keyword trong SEO_KEYWORD_PLAN.md.
