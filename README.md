# SIMILOCK Final Premium Design

Bản thiết kế lại theo hướng gọn, sang, tập trung chuyển đổi và tránh các thành phần nhúng dễ gây lỗi trên trang chủ.

## Cách dùng
1. Upload toàn bộ file lên hosting hoặc Firebase Hosting.
2. Firebase config đã có trong `assets/firebase-config.js`.
3. Firestore rules nằm trong `firestore.rules`.
4. Trang chủ dùng nút dẫn tới YouTube/TikTok/Google Maps thay vì nhúng video lỗi.
5. Bản đồ chỉ nhúng tại `lien-he.html` để tránh làm trang chủ nặng và rối.

## File chính
- `index.html`: Trang chủ thiết kế lại.
- `khoa-can-ho.html`: SEO F07/căn hộ.
- `khoa-cua-nhom-xingfa.html`: SEO cửa nhôm.
- `khoa-569-wifi-cong-sat.html`: SEO cổng sắt.
- `khoa-faceid.html`: SEO FaceID.
- `du-an-ban-giao.html`: Công trình bàn giao.
- `blog.html`: Blog SEO.
- `lien-he.html`: Liên hệ + Google Maps.
- `admin.html`: Admin CMS.

## Kiểm tra đã thực hiện
- Trang chủ không dùng iframe video để tránh lỗi hiển thị.
- YouTube/TikTok/Google Maps chuyển sang nút hành động và trang liên hệ.
- Liên kết nội bộ cơ bản đã có.
- Form lead dùng Firebase Firestore.
