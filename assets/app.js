import { db, demoMode } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const forms = document.querySelectorAll('[data-lead-form]');
forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const old = btn?.textContent || 'Gửi';
    if (btn) btn.textContent = 'Đang gửi...';
    const data = Object.fromEntries(new FormData(form).entries());
    data.source = location.pathname;
    data.createdAt = serverTimestamp();
    try {
      if (demoMode) {
        console.log('DEMO lead', data);
      } else {
        await addDoc(collection(db, 'leads'), data);
      }
      form.reset();
      alert('SIMILOCK đã nhận thông tin. Kỹ thuật sẽ liên hệ tư vấn sớm.');
    } catch (err) {
      console.error(err);
      alert('Chưa gửi được dữ liệu. Anh vui lòng gọi/Zalo 0902950816.');
    } finally {
      if (btn) btn.textContent = old;
    }
  });
});
