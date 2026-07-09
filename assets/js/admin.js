import { demoMode, firebaseConfig, adminEmails } from './firebase-config.js';
let fb=null, currentUser=null;
async function init(){
  if(demoMode || firebaseConfig.apiKey.includes('PASTE')) { document.body.dataset.demo='true'; return null; }
  const appMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
  const authMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
  const fs=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');
  const app=appMod.initializeApp(firebaseConfig);
  return {auth:authMod.getAuth(app), ...authMod, db:fs.getFirestore(app), ...fs};
}
function $(s){return document.querySelector(s)}
function show(id){document.querySelectorAll('[data-panel]').forEach(p=>p.classList.add('hidden')); $(id).classList.remove('hidden')}
async function addDocTo(col, data){
  if(!fb){ localStorage.setItem('similock_'+col+'_'+Date.now(), JSON.stringify(data)); alert('Đã lưu DEMO trên trình duyệt. Cấu hình Firebase thật để lưu cloud.'); return; }
  await fb.addDoc(fb.collection(fb.db,col), {...data, updatedAt:fb.serverTimestamp(), createdAt:fb.serverTimestamp()}); alert('Đã lưu lên Firebase');
}
async function loadLeads(){
  const tbody=$('#leadRows'); if(!tbody) return; tbody.innerHTML='';
  if(!fb){
    Object.keys(localStorage).filter(k=>k.startsWith('similock_demo_lead_')).forEach(k=>{let x=JSON.parse(localStorage[k]); tbody.innerHTML += `<tr><td>${x.name||''}</td><td>${x.phone||''}</td><td>${x.need||''}</td><td>Demo</td></tr>`}); return;
  }
  const snap=await fb.getDocs(fb.query(fb.collection(fb.db,'leads'), fb.orderBy('createdAt','desc'), fb.limit(100)));
  snap.forEach(d=>{const x=d.data(); tbody.innerHTML += `<tr><td>${x.name||''}</td><td>${x.phone||''}</td><td>${x.need||''}</td><td>${x.page||''}</td></tr>`});
}
window.openPanel=(id)=>{show(id); if(id==='#leads') loadLeads();};
window.saveProduct=async()=>addDocTo('products',{model:$('#pModel').value,name:$('#pName').value,price:$('#pPrice').value,category:$('#pCat').value,slug:$('#pSlug').value,features:$('#pFeatures').value.split(',').map(x=>x.trim()).filter(Boolean)});
window.saveProject=async()=>addDocTo('projects',{title:$('#projectTitle').value,location:$('#projectLocation').value,model:$('#projectModel').value,content:$('#projectContent').value});
window.saveFAQ=async()=>addDocTo('faqs',{question:$('#faqQ').value,answer:$('#faqA').value});
window.login=async()=>{
  fb=await init();
  const email=$('#email').value, pass=$('#pass').value;
  if(!fb){ $('#login').classList.add('hidden'); $('#admin').classList.remove('hidden'); return; }
  const cred=await fb.signInWithEmailAndPassword(fb.auth,email,pass); currentUser=cred.user;
  if(!adminEmails.includes(currentUser.email)){ alert('Email này chưa nằm trong adminEmails của firebase-config.js'); await fb.signOut(fb.auth); return; }
  $('#login').classList.add('hidden'); $('#admin').classList.remove('hidden');
};
window.logout=async()=>{ if(fb) await fb.signOut(fb.auth); location.reload(); };
show('#dashboard');
