import { demoMode, firebaseConfig } from './firebase-config.js';

const fallback = {
  products: [
    {model:'F07', name:'Khóa vân tay F07 cho căn hộ', price:'1.850.000đ', category:'Căn hộ / composite / chống cháy', features:['Vân tay','Mã số','Thẻ từ','Chìa cơ','App TTLock'], slug:'khoa-f07-can-ho.html'},
    {model:'S01', name:'Khóa vân tay S01 cho cửa nhôm Xingfa', price:'Liên hệ', category:'Cửa nhôm Xingfa', features:['Chống nước','TTLock','Mật khẩu từ xa','Lắp giữ form'], slug:'khoa-s01-cua-nhom-xingfa.html'},
    {model:'569 WiFi', name:'Khóa cổng sắt 569 WiFi', price:'Liên hệ', category:'Cổng sắt / ngoài trời', features:['Inox 304','WiFi Tuya','2 mặt chìa','Tiếng Việt'], slug:'khoa-569-wifi-cong-sat.html'},
    {model:'FaceID', name:'Khóa nhận diện khuôn mặt', price:'Từ 2.900.000đ', category:'Nhà phố / căn hộ cao cấp', features:['FaceID 3D','Palm vein','Camera','WiFi'], slug:'khoa-faceid.html'}
  ],
  projects: [
    'Mường Thanh Đà Nẵng – F07 căn hộ cho thuê',
    'Bàu Tràm – S40/S300 căn hộ chung cư',
    'Châu Thị Vĩnh Tế – 15 bộ F07',
    'Ngũ Hành Sơn – F568/F07 khu căn hộ',
    'Hội An – khóa cổng sắt chống gió biển'
  ],
  faqs: [
    ['Khóa F07 giá 1.850.000đ đã gồm gì?','Giá đã gồm VAT, miễn phí lắp đặt cơ bản tại Đà Nẵng và bảo hành 24 tháng tận nhà.'],
    ['Căn hộ cho thuê có cấp mật khẩu từ xa được không?','Có. Với app TTLock, chủ nhà có thể tạo mật khẩu theo giờ/ngày cho khách tự check-in.'],
    ['SIMILOCK có lắp cho cửa nhôm Xingfa không?','Có. Model S01/S168 chuyên dùng cho cửa nhôm Xingfa, hạn chế khoét phá và giữ form cửa đẹp.'],
    ['Có bảo hành tận nơi không?','Có. SIMILOCK Đà Nẵng hỗ trợ kỹ thuật và bảo hành 24 tháng tận nhà.']
  ]
};

async function initFirebase(){
  if(demoMode || firebaseConfig.apiKey.includes('PASTE')) return null;
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
  const { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');
  const app = initializeApp(firebaseConfig);
  return { db:getFirestore(app), collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp };
}

function renderProducts(products){
  const el = document.querySelector('[data-products]');
  if(!el) return;
  el.innerHTML = products.map(p=>`<article class="card product-card"><div class="product-top"><span>${p.model}</span></div><div class="product-body"><h3>${p.name}</h3><div class="product-price">${p.price}</div><p>${p.category}</p><div class="pill-row">${(p.features||[]).map(f=>`<span class="pill">${f}</span>`).join('')}</div><a class="btn btn-outline" href="${p.slug||'#'}">Xem chi tiết SEO</a></div></article>`).join('');
}
function renderProjects(projects){
  const el = document.querySelector('[data-projects]');
  if(!el) return;
  el.innerHTML = projects.map(x=>`<div>✅ ${x}</div>`).join('');
}
function renderFaq(faqs){
  const el = document.querySelector('[data-faq]');
  if(!el) return;
  el.innerHTML = faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
}

async function loadCMS(){
  let products=fallback.products, projects=fallback.projects, faqs=fallback.faqs;
  try{
    const fb = await initFirebase();
    if(fb){
      const ps = await fb.getDocs(fb.query(fb.collection(fb.db,'products'), fb.limit(20)));
      const pr = await fb.getDocs(fb.query(fb.collection(fb.db,'projects'), fb.limit(20)));
      const fq = await fb.getDocs(fb.query(fb.collection(fb.db,'faqs'), fb.limit(20)));
      if(!ps.empty) products = ps.docs.map(d=>d.data());
      if(!pr.empty) projects = pr.docs.map(d=>d.data().title || d.data().name);
      if(!fq.empty) faqs = fq.docs.map(d=>[d.data().question,d.data().answer]);
    }
  }catch(e){ console.warn('CMS fallback:', e.message); }
  renderProducts(products); renderProjects(projects); renderFaq(faqs);
}

async function handleLeadForm(){
  const form=document.querySelector('[data-lead-form]');
  if(!form) return;
  const msg=form.querySelector('[data-form-message]');
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    data.page=location.pathname; data.createdAt=new Date().toISOString();
    try{
      const fb=await initFirebase();
      if(fb){ await fb.addDoc(fb.collection(fb.db,'leads'), {...data, createdAt: fb.serverTimestamp()}); }
      else { localStorage.setItem('similock_demo_lead_'+Date.now(), JSON.stringify(data)); }
      msg.textContent='Đã nhận thông tin. SIMILOCK sẽ liên hệ tư vấn ngay.'; msg.style.color='#12b76a'; form.reset();
    }catch(err){ msg.textContent='Chưa gửi được dữ liệu. Anh vui lòng gọi/Zalo 0902950816.'; msg.style.color='#f04438'; }
  });
}

loadCMS(); handleLeadForm();
