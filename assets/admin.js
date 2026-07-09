import { auth, db, adminEmails } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';

const login = document.querySelector('#loginForm');
const app = document.querySelector('#adminApp');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const out = document.querySelector('#out');
const leadsBox = document.querySelector('#leadsBox');
const productForm = document.querySelector('#productForm');

login?.addEventListener('submit', async e => {
  e.preventDefault();
  try { await signInWithEmailAndPassword(auth, email.value, password.value); }
  catch(err){ alert('Sai email hoặc mật khẩu.'); }
});
out?.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async user => {
  const ok = user && adminEmails.includes(user.email);
  login.style.display = ok ? 'none':'grid';
  app.style.display = ok ? 'block':'none';
  if (user && !ok) alert('Tài khoản này chưa được cấp quyền admin.');
  if (ok) loadLeads();
});

async function loadLeads(){
  const q = query(collection(db,'leads'), orderBy('createdAt','desc'), limit(50));
  const snap = await getDocs(q);
  leadsBox.innerHTML = '';
  snap.forEach(doc => {
    const d = doc.data();
    leadsBox.insertAdjacentHTML('beforeend', `<div class="row"><b>${d.name||'Khách'}</b><span>${d.phone||''}</span><em>${d.need||''}</em></div>`);
  });
}

productForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(productForm).entries());
  data.createdAt = serverTimestamp();
  await addDoc(collection(db,'products'), data);
  productForm.reset();
  alert('Đã lưu sản phẩm.');
});
