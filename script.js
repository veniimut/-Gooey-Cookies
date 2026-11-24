/* =========================================================
   Gooey Cookies — script.js
   ========================================================= */
const WA_NUMBER = '6289514308895';
const DELIVERY_FEE = 10000;
const STORAGE_KEY = 'gooey_cart_v1';
const OPEN_TIME = '09:00';
const CLOSE_TIME = '21:00';

const PRODUCTS = [
  { id: 'og', name: 'Gooey OG', flavor: 'Chocolate chunk', price: 18000, img: 'images/gooey-og.png', tag: 'Best Seller', cat: ['klasik', 'choco'], fav: true,
    desc: 'Cookie klasik kami: adonan butter brown sugar dengan potongan dark chocolate besar yang lumer di tengah.' },
  { id: 'cnc', name: "Cookies N' Cream", flavor: 'Oreo + white chocolate', price: 20000, img: 'images/cookies-n-cream.png', tag: 'Favorit', cat: ['klasik'], fav: true,
    desc: 'Remahan Oreo renyah berpadu white chocolate creamy dalam cookie tebal yang lembut.' },
  { id: 'melt', name: 'Choco Melt', flavor: 'Double chocolate', price: 20000, img: 'images/choco-melt.png', tag: 'Choco Lover', cat: ['klasik', 'choco'], fav: true,
    desc: 'Adonan cokelat pekat dengan inti cokelat leleh. Surga untuk pecinta cokelat sejati.' },
  { id: 'caramel', name: 'Caramel Hug', flavor: 'Caramel + sea salt', price: 20000, img: 'images/caramel-hug.png', tag: 'Sweet & Salty', cat: ['klasik'],
    desc: 'Siraman karamel buatan sendiri dengan taburan sea salt — manis-gurih yang bikin nagih.' },
  { id: 'smore', name: "Gooey S'more", flavor: 'Chocolate + marshmallow + biscuit', price: 25000, img: 'images/gooey-smore.png', tag: 'Premium', cat: ['premium', 'choco'],
    desc: 'Marshmallow panggang, cokelat, dan biskuit graham terjepit di cookie tebal. Rasa api unggun!' },
  { id: 'lotus', name: 'Lotus Cheez', flavor: 'Lotus/Biscoff + cheesecake', price: 27000, img: 'images/lotus-cheez.png', tag: 'Signature', cat: ['premium'], fav: true,
    desc: 'Cookie Biscoff dengan isian cheesecake lembut, lotus spread, dan biskuit Lotus utuh di atasnya.' },
];

const TESTIMONIALS = [
  { name: 'Nadia Putri', role: 'Mahasiswi UNIPMA', text: 'Gooey OG-nya beneran lumer! Tebal banget dan nggak bikin eneg. Jadi teman nugas wajib.' },
  { name: 'Rizky Pratama', role: 'Karyawan, Madiun', text: 'Pesan Lotus Cheez buat kantor, semua pada nanya beli di mana. Pengiriman cepat & packaging rapi.' },
  { name: 'Sinta Ayu', role: 'Ibu rumah tangga', text: 'Anak-anak suka banget Cookies N\' Cream. Dihangatkan sebentar langsung kayak baru keluar oven.' },
  { name: 'Kenneth Alvaro', role: 'Pecinta cokelat', text: 'Choco Melt itu juara. Cokelatnya pekat dan premium, harga masih ramah di kantong.' },
  { name: 'Laras Wulandari', role: 'Pesan hampers', text: 'Order 50 pcs hampers lebaran, semua sesuai jadwal. Adminnya ramah & fast response.' },
  { name: 'Dian Retno', role: 'Mahasiswa PNM', text: 'Cookies-nya enak banget! Isiannya lumer dan premium banget! Pesen lewat WhatsApp gampang, jadwalnya juga bisa pilih sendiri lho.' },
];

const GOO_LINES = ['Halo! 👋', 'Satu gigitan, bikin jatu cinta!🍪', 'Hihi, geli! 😆', 'Satu gigitan, bikin jatuh cinta! 🤤', 'Pesan yuk! 🛒', 'Aku sayang kamu 💛', 'Siap antar! 🚚', 'Hai! Senang kamu mampir'];
const STEP_CAPTIONS = [
  '🛒 Pilih cookies favoritmu di halaman Menu.',
  '🗓️ Atur tanggal & jam sesukamu.',
  '💬 Pesanan otomatis tersusun, kirim via WhatsApp.',
  '💳 Bayar, lalu nikmati cookies pilihanmu!',
];

const ROUTES = {
  '':           { page: 'beranda',    title: 'Gooey Cookies — A Little Bite, A Lot of Happines.' },
  'lokasi':     { page: 'beranda',    title: 'Lokasi Kami — Gooey Cookies', anchor: 'lokasi', nav: '' },
  'menu':       { page: 'menu',       title: 'Menu — Gooey Cookies' },
  'testimoni':  { page: 'testimoni',  title: 'Testimoni — Gooey Cookies' },
  'cara-pesan': { page: 'cara-pesan', title: 'Cara Pesan — Gooey Cookies' },
  'faq':        { page: 'faq',        title: 'FAQ — Gooey Cookies' },
};

const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const findProduct = id => PRODUCTS.find(p => p.id === id);
const pad = n => String(n).padStart(2, '0');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   LELEHAN (drip) — dibuat otomatis sesuai lebar layar
   ========================================================= */
function dripSVG(width, height, seed) {
  // Lelehan bulat & pendek seperti contoh: gelombang lembut, kedalaman tetes bervariasi
  let s = seed * 7919 + 13;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const count = Math.max(8, Math.min(18, Math.round(width / 80)));
  const P = width / count;
  const top = height * .12;
  const depths = [.55, .95, .62, .78, 1, .58, .85, .66];
  const off = Math.floor(rnd() * depths.length);
  let d = `M0,0 L0,${top}`;
  for (let i = 0; i < count; i++) {
    const x = i * P;
    const yb = top + (height - top) * (depths[(i + off) % depths.length] * (.92 + rnd() * .08));
    d += ` C${x + P * .26},${top} ${x + P * .3},${yb} ${x + P * .5},${yb}`;
    d += ` C${x + P * .7},${yb} ${x + P * .74},${top} ${x + P},${top}`;
  }
  d += ` L${width},0 Z`;
  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
}
function renderDrips() {
  $$('[data-drip]').forEach(el => {
    const w = Math.round(el.clientWidth || innerWidth);
    const h = Math.round(el.clientHeight || 60);
    if (!w || (el.dataset.w == w && el.dataset.h == h)) return;
    el.dataset.w = w; el.dataset.h = h;
    el.innerHTML = dripSVG(w, h, +el.dataset.drip);
  });
}
let dripTimer;
addEventListener('resize', () => { clearTimeout(dripTimer); dripTimer = setTimeout(renderDrips, 150); });

/* =========================================================
   PARTIKEL (remahan, emoji) — dipakai di banyak interaksi
   ========================================================= */
function burst(x, y, { count = 14, emojis = ['🍪', '✨'], crumbs = true, spread = 120 } = {}) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    const isCrumb = crumbs && i % 2 === 0;
    el.className = 'particle' + (isCrumb ? ' crumb' : '');
    if (!isCrumb) el.textContent = emojis[i % emojis.length];
    else el.style.background = ['#C98A4B', '#8B5A2B', '#E8B37C', '#B13701'][i % 4];
    el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = spread * (.4 + Math.random() * .8);
    const dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist - 40;
    const rot = (Math.random() - .5) * 720;
    el.animate([
      { transform: 'translate(-50%,-50%) scale(.4) rotate(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx * .7}px), calc(-50% + ${dy * .7}px)) scale(1.1) rotate(${rot / 2}deg)`, opacity: 1, offset: .5 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 90}px)) scale(.6) rotate(${rot}deg)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => el.remove();
  }
}
const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

/* ---------- Toast ---------- */
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  $('#toastWrap').appendChild(el);
  setTimeout(() => { el.classList.add('hide'); setTimeout(() => el.remove(), 300); }, 2400);
}

/* ---------- Cookie terbang ke keranjang ---------- */
function flyToCart(sourceEl) {
  const cartBtn = $('#openCart');
  if (!sourceEl || !cartBtn) return;
  const start = sourceEl.getBoundingClientRect();
  const end = cartBtn.getBoundingClientRect();
  if (!start.width) return;
  const cookie = sourceEl.cloneNode(true);
  Object.assign(cookie.style, {
    position: 'fixed', left: `${start.left}px`, top: `${start.top}px`, width: `${start.width}px`, height: `${start.height}px`,
    objectFit: 'cover', borderRadius: '50%', zIndex: 9999, pointerEvents: 'none', margin: 0,
  });
  document.body.appendChild(cookie);
  const moveX = end.left + end.width / 2 - start.left - start.width / 2;
  const moveY = end.top + end.height / 2 - start.top - start.height / 2;
  cookie.animate([
    { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
    { transform: `translate(${moveX * .5}px, ${moveY * .5 - 80}px) scale(.5) rotate(200deg)`, opacity: 1 },
    { transform: `translate(${moveX}px, ${moveY}px) scale(.08) rotate(400deg)`, opacity: .3 },
  ], { duration: 850, easing: 'cubic-bezier(.22,.8,.3,1)' }).onfinish = () => {
    cookie.remove();
    const [cx, cy] = centerOf(cartBtn);
    burst(cx, cy, { count: 8, emojis: ['✨', '💛'], spread: 50 });
  };
  cartBtn.classList.remove('shake'); void cartBtn.offsetWidth; cartBtn.classList.add('shake');
  setTimeout(() => cartBtn.classList.remove('shake'), 500);
}

/* ---------- Keranjang (localStorage) ---------- */
let cart = loadCart();
function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return data.filter(i => findProduct(i.id) && i.qty > 0);
  } catch { return []; }
}
function saveCart() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {} }
const cartSubtotal = () => cart.reduce((s, i) => s + findProduct(i.id).price * i.qty, 0);
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);

function addToCart(id, qty = 1, sourceEl = null) {
  if (sourceEl) flyToCart(sourceEl);
  const item = cart.find(i => i.id === id);
  if (item) item.qty += qty; else cart.push({ id, qty });
  saveCart(); renderCart();
  const c = $('#cartCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  toast(`🍪 ${findProduct(id).name} ×${qty} ditambahkan`);
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeItem(id); return; }
  saveCart(); renderCart();
}
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
  toast(`${findProduct(id).name} dihapus dari keranjang`);
}
function renderCart() {
  $('#cartCount').textContent = cartQty();
  const wrap = $('#cartItems');
  if (!cart.length) {
    wrap.innerHTML = `<div class="cart-empty"><img src="images/goo-love.png" alt="Goo" /><p>Keranjangmu masih kosong.<br/>Yuk pilih cookies favoritmu!</p><br/><a href="#/menu" class="btn btn-primary btn-sm" data-close-cart>Lihat Menu</a></div>`;
  } else {
    wrap.innerHTML = cart.map(i => {
      const p = findProduct(i.id);
      return `<div class="cart-item">
        <img src="${p.img}" alt="${p.name}" />
        <div class="ci-info"><h4>${p.name}</h4><small>${rupiah(p.price * i.qty)}</small>
          <div class="qty"><button data-dec="${p.id}" aria-label="Kurangi">−</button><span>${i.qty}</span><button data-inc="${p.id}" aria-label="Tambah">+</button></div>
        </div>
        <button class="ci-remove" data-remove="${p.id}" aria-label="Hapus">🗑</button>
      </div>`;
    }).join('');
  }
  const sub = cartSubtotal();
  $('#cartSubtotal').textContent = rupiah(sub);
  $('#cartTotal').textContent = rupiah(sub);
  $('#checkoutBtn').disabled = !cart.length;
}
$('#cartItems').addEventListener('click', e => {
  if (e.target.closest('[data-close-cart]')) { closeCart(); return; }
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.inc) changeQty(t.dataset.inc, 1);
  if (t.dataset.dec) changeQty(t.dataset.dec, -1);
  if (t.dataset.remove) removeItem(t.dataset.remove);
});

function openCart() { $('#cart').classList.add('open'); $('#cart').setAttribute('aria-hidden', 'false'); $('#cartBackdrop').classList.add('show'); document.body.style.overflow = 'hidden'; closeNav(); }
function closeCart() { $('#cart').classList.remove('open'); $('#cart').setAttribute('aria-hidden', 'true'); $('#cartBackdrop').classList.remove('show'); if (!$('.overlay.show')) document.body.style.overflow = ''; }
$('#openCart').addEventListener('click', openCart);
$$('[data-open-cart]').forEach(b => b.addEventListener('click', openCart));
$('#closeCart').addEventListener('click', closeCart);
$('#cartBackdrop').addEventListener('click', closeCart);
$('#clearCart').addEventListener('click', () => {
  if (!cart.length) { toast('Keranjang sudah kosong'); return; }
  cart = []; saveCart(); renderCart(); toast('Keranjang dikosongkan');
});
$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) { toast('Keranjang masih kosong'); return; }
  closeCart(); prepareSchedule(); renderSummary(); openModal('checkoutModal');
});

/* ---------- Produk ---------- */
const productCard = p => `
  <article class="product" data-cat="${p.cat.join(' ')}">
    <div class="product-img" data-detail="${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy" /><span class="product-tag">${p.tag}</span></div>
    <div class="product-body">
      <h3>${p.name}</h3><p class="flavor">${p.flavor}</p>
      <div class="product-foot"><span class="price">${rupiah(p.price)}</span>
        <div class="btns"><button class="btn btn-sm btn-detail" data-detail="${p.id}">Detail</button><button class="btn btn-sm btn-primary" data-add="${p.id}">+ Tambah</button></div>
      </div>
    </div>
  </article>`;

// Kartu miring 3D mengikuti kursor
function bindTilt(root) {
  if (!finePointer || reduceMotion) return;
  root.querySelectorAll('.product').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.classList.add('tilting');
      card.style.transform = `perspective(900px) rotateX(${(.5 - py) * 10}deg) rotateY(${(px - .5) * 12}deg) translateY(-6px)`;
      card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
    });
    card.addEventListener('pointerleave', () => { card.classList.remove('tilting'); card.style.transform = ''; });
  });
}

function renderProducts(filter = 'all') {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat.includes(filter));
  const grid = $('#productGrid');
  grid.innerHTML = list.map(productCard).join('');
  grid.querySelectorAll('.product').forEach((el, i) => { el.style.animationDelay = `${i * 70}ms`; el.classList.add('pop-in'); });
  bindTilt(grid);
}
$('#favGrid').innerHTML = PRODUCTS.filter(p => p.fav).map(productCard).join('');
$$('#favGrid .product').forEach(el => el.classList.add('reveal'));
bindTilt($('#favGrid'));
renderProducts();

$('#menuChips')?.addEventListener('click', e => {
  const chip = e.target.closest('.chip'); if (!chip) return;
  $$('#menuChips .chip').forEach(c => c.classList.toggle('active', c === chip));
  renderProducts(chip.dataset.filter);
});

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    const [x, y] = centerOf(add);
    burst(x, y, { count: 12, emojis: ['🍪', '✨', '🍫'], spread: 90 });
    addToCart(add.dataset.add, 1, add.closest('.product').querySelector('.product-img img'));
    return;
  }
  const det = e.target.closest('[data-detail]');
  if (det) openProduct(det.dataset.detail);
});

/* ---------- Modal ---------- */
function openModal(id) { const m = document.getElementById(id); m.classList.add('show'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal(id) { const m = document.getElementById(id); m.classList.remove('show'); m.setAttribute('aria-hidden', 'true'); if (!$('.overlay.show') && !$('#cart.open')) document.body.style.overflow = ''; }
$$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.close)));
$$('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) closeModal(o.id); }));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  $$('.overlay.show').forEach(o => closeModal(o.id));
  closeCart(); closeNav();
});

let pmCurrent = null, pmQty = 1;
function openProduct(id) {
  const p = findProduct(id); pmCurrent = p; pmQty = 1;
  $('#pmImg').src = p.img; $('#pmImg').alt = p.name;
  $('#pmName').textContent = p.name; $('#pmFlavor').textContent = p.flavor;
  $('#pmDesc').textContent = p.desc; $('#pmQty').textContent = 1;
  $('#pmPrice').textContent = rupiah(p.price);
  openModal('productModal');
}
function updatePm() { $('#pmQty').textContent = pmQty; $('#pmPrice').textContent = rupiah(pmCurrent.price * pmQty); }
$('#pmPlus').addEventListener('click', () => { pmQty++; updatePm(); });
$('#pmMinus').addEventListener('click', () => { if (pmQty > 1) { pmQty--; updatePm(); } });
$('#pmAdd').addEventListener('click', () => {
  const [x, y] = centerOf($('#pmAdd'));
  burst(x, y, { count: 12, emojis: ['🍪', '✨'], spread: 90 });
  addToCart(pmCurrent.id, pmQty, $('#pmImg')); closeModal('productModal');
});

/* ---------- Checkout (hanya via WhatsApp) ---------- */
const form = $('#checkoutForm');
const pickup = $('#pickupSelect');
const dateInput = $('#dateInput');
const timeInput = $('#timeInput');
const scheduleHint = $('#scheduleHint');
const HINT_DEFAULT = scheduleHint.textContent;

const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const nowTime = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };

function prepareSchedule() {
  dateInput.min = todayStr();
  const max = new Date(); max.setDate(max.getDate() + 60);
  dateInput.max = `${max.getFullYear()}-${pad(max.getMonth() + 1)}-${pad(max.getDate())}`;
}
function scheduleError() {
  const d = dateInput.value, t = timeInput.value;
  if (!d) return 'Pilih tanggal pesanan dulu ya';
  if (d < todayStr()) return 'Tanggal sudah lewat, pilih tanggal lain';
  if (!t) return 'Pilih jam pesanan dulu ya';
  if (t < OPEN_TIME || t > CLOSE_TIME) return 'Jam harus antara 09.00 – 21.00 WIB';
  if (d === todayStr() && t <= nowTime()) return 'Jam sudah lewat untuk hari ini, pilih jam lain';
  return '';
}
function updateScheduleHint() {
  const err = (dateInput.value || timeInput.value) ? scheduleError() : '';
  scheduleHint.textContent = err ? '⚠️ ' + err : HINT_DEFAULT;
  scheduleHint.classList.toggle('error', !!err);
}
dateInput.addEventListener('change', () => { dateInput.classList.remove('invalid'); updateScheduleHint(); });
timeInput.addEventListener('change', () => { timeInput.classList.remove('invalid'); updateScheduleHint(); });

const deliveryFee = () => pickup.value === 'Diantar' ? DELIVERY_FEE : 0;
function renderSummary() {
  const sub = cartSubtotal(), fee = deliveryFee();
  $('#checkoutSummary').innerHTML =
    cart.map(i => { const p = findProduct(i.id); return `<div class="row"><span>${p.name} ×${i.qty}</span><span>${rupiah(p.price * i.qty)}</span></div>`; }).join('') +
    `<div class="row"><span>Ongkir</span><span>${fee ? rupiah(fee) : 'Gratis'}</span></div>` +
    `<div class="row total"><span>Total</span><span>${rupiah(sub + fee)}</span></div>`;
}
pickup.addEventListener('change', () => {
  $('#addressField').style.display = pickup.value === 'Diantar' ? 'block' : 'none';
  renderSummary();
});
form.addEventListener('input', e => e.target.classList.remove('invalid'));

function validate() {
  const f = form.elements; let ok = true;
  const check = (el, cond) => { el.classList.toggle('invalid', !cond); if (!cond) ok = false; };
  check(f.nama, f.nama.value.trim().length >= 2);
  check(f.wa, /^(\+?62|0)8\d{7,12}$/.test(f.wa.value.replace(/[\s-]/g, '')));
  check(f.alamat, pickup.value !== 'Diantar' || f.alamat.value.trim().length >= 5);
  const sErr = scheduleError();
  const dateBad = !dateInput.value || dateInput.value < todayStr();
  check(dateInput, !dateBad);
  check(timeInput, !sErr || dateBad);
  if (sErr) ok = false;
  updateScheduleHint();
  if (sErr && !dateInput.value && !timeInput.value) { scheduleHint.textContent = '⚠️ ' + sErr; scheduleHint.classList.add('error'); }
  return ok;
}
function formatDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function buildMessage(d) {
  const sub = cartSubtotal(), fee = deliveryFee();
  const lines = cart.map((i, n) => { const p = findProduct(i.id); return `${n + 1}. ${p.name} x${i.qty} = ${rupiah(p.price * i.qty)}`; });
  return [
    'Halo Gooey Cookies! 🍪 Saya mau pesan:', '',
    ...lines, '',
    `Subtotal: ${rupiah(sub)}`,
    `Ongkir: ${fee ? rupiah(fee) : 'Gratis'}`,
    `*Total: ${rupiah(sub + fee)}*`, '',
    `Nama: ${d.nama}`,
    `No. WhatsApp: ${d.wa}`,
    `Pengambilan: ${d.pengambilan}`,
    ...(d.pengambilan === 'Diantar' ? [`Alamat: ${d.alamat}`] : []),
    `Tanggal: ${formatDate(d.tanggal)}`,
    `Jam: ${d.jam.replace(':', '.')} WIB`,
    `Pembayaran: ${d.bayar}`,
    `Catatan: ${d.catatan || '-'}`,
  ].join('\n');
}
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) { toast('Keranjang masih kosong'); return; }
  if (!validate()) {
    toast('⚠️ Lengkapi data dengan benar');
    const firstBad = form.querySelector('.invalid'); if (firstBad) firstBad.focus();
    return;
  }
  const d = Object.fromEntries(new FormData(form).entries());
  const total = cartSubtotal() + deliveryFee();
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage(d))}`, '_blank');
  const orderId = 'GC' + Date.now().toString().slice(-6);
  $('#successText').innerHTML = `Pesanan <b>#${orderId}</b> (${rupiah(total)}) untuk <b>${formatDate(d.tanggal)}, ${d.jam.replace(':', '.')} WIB</b> sudah dibuka di WhatsApp. Tinggal tekan kirim ya, ${d.nama}!`;
  cart = []; saveCart(); renderCart(); form.reset();
  $('#addressField').style.display = 'block';
  updateScheduleHint();
  closeModal('checkoutModal'); openModal('successModal');
  setTimeout(() => burst(innerWidth / 2, innerHeight * .55, { count: 30, emojis: ['🎉', '🍪', '✨', '💛'], spread: 220 }), 250);
});

/* ---------- Status buka/tutup ---------- */
function updateOpenStatus() {
  const jkt = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  const t = `${pad(jkt.getHours())}:${pad(jkt.getMinutes())}`;
  const open = t >= OPEN_TIME && t < CLOSE_TIME;
  $$('[data-open-status]').forEach(el => {
    el.textContent = open ? 'Sedang buka' : 'Sedang tutup';
    el.classList.toggle('open', open); el.classList.toggle('closed', !open);
  });
}
updateOpenStatus(); setInterval(updateOpenStatus, 60000);

/* ---------- HERO interaktif ---------- */
$$('[data-split]').forEach((el, line) => {
  el.innerHTML = [...el.textContent].map((c, i) =>
    c === ' ' ? '<span class="ch sp"> </span>' : `<span class="ch" style="animation-delay:${.15 + line * .35 + i * .03}s">${c}</span>`).join('');
});
const hero = $('#hero'), heroBg = $('#heroBg'), heroCrumbs = $$('#heroCrumbs i');
if (finePointer && !reduceMotion) {
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
    heroBg.style.transform = `translate(${dx * -24}px, ${dy * -18}px) scale(1.04)`;
    heroCrumbs.forEach((c, i) => { const k = 20 + (i % 4) * 18; c.style.translate = `${dx * k}px ${dy * k}px`; });
  });
  hero.addEventListener('pointerleave', () => { heroBg.style.transform = ''; heroCrumbs.forEach(c => { c.style.translate = ''; }); });
}
hero.addEventListener('click', e => {
  if (e.target.closest('a, button')) return;
  burst(e.clientX, e.clientY, { count: 16, emojis: ['🍪', '✨', '🍫'], spread: 130 });
});

/* ---------- Maskot Goo: klik untuk interaksi ---------- */
$$('.goo-card').forEach(card => {
  const play = () => {
    const bubble = card.querySelector('.bubble');
    bubble.textContent = GOO_LINES[Math.floor(Math.random() * GOO_LINES.length)];
    card.classList.remove('spin'); void card.offsetWidth; card.classList.add('spin', 'talk');
    const [x, y] = centerOf(card.querySelector('img'));
    burst(x, y, { count: 10, emojis: ['💛', '✨', '🍪'], crumbs: false, spread: 100 });
    clearTimeout(card._t); card._t = setTimeout(() => card.classList.remove('talk', 'spin'), 1800);
  };
  card.addEventListener('click', play);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
});

/* ---------- Timeline Cara Pesan (otomatis + bisa diklik) ---------- */
let stepIdx = 0, stepTimer = null, stepPause = null;
function setStep(i) {
  stepIdx = i;
  const goo = $('#tlGoo');
  goo.style.left = `${12.5 + i * 25}%`;
  goo.classList.remove('hop'); void goo.offsetWidth; goo.classList.add('hop');
  $('#tlFill').style.width = `${(i / 3) * 100}%`;
  $$('.tl-step').forEach((s, n) => s.classList.toggle('active', n === i));
  const cap = $('#tlCaption');
  cap.textContent = STEP_CAPTIONS[i];
  cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
}
function startSteps() { stopSteps(); setStep(0); stepTimer = setInterval(() => setStep((stepIdx + 1) % 4), 2400); }
function stopSteps() { clearInterval(stepTimer); clearTimeout(stepPause); }
$$('.tl-step').forEach(btn => btn.addEventListener('click', () => {
  stopSteps();
  setStep(+btn.dataset.step);
  const [x, y] = centerOf(btn.querySelector('.tl-dot'));
  burst(x, y, { count: 10, emojis: ['✨', '🍪'], spread: 70 });
  stepPause = setTimeout(() => { stepTimer = setInterval(() => setStep((stepIdx + 1) % 4), 2400); }, 6000);
}));

/* ---------- Header Menu: Goo melompat antar cookies (otomatis + bisa diklik) ---------- */
const ctTrack = $('#cookieTrack');
const CT_N = PRODUCTS.length;
ctTrack.style.setProperty('--n', CT_N);
ctTrack.insertAdjacentHTML('beforeend', PRODUCTS.map((p, i) => `
  <button class="ct-step" data-ct="${i}" aria-label="${p.name}">
    <span class="ct-dot"><img src="${p.img}" alt="" /></span>
    <span class="ct-label">${p.name}</span>
  </button>`).join(''));
let ctIdx = 0, ctTimer = null, ctPause = null;
function setCookie(i) {
  ctIdx = i;
  const pct = 100 / CT_N;
  const goo = $('#ctGoo');
  goo.style.left = `${pct / 2 + i * pct}%`;
  goo.classList.remove('hop'); void goo.offsetWidth; goo.classList.add('hop');
  $('#ctFill').style.width = `${(i / (CT_N - 1)) * 100}%`;
  $$('.ct-step').forEach((s, n) => s.classList.toggle('active', n === i));
  const p = PRODUCTS[i], cap = $('#ctCaption');
  cap.textContent = `🍪 ${p.name} · ${p.flavor} · ${rupiah(p.price)}`;
  cap.dataset.detail = p.id;
  cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
}
function startCookies() { stopCookies(); setCookie(0); ctTimer = setInterval(() => setCookie((ctIdx + 1) % CT_N), 2600); }
function stopCookies() { clearInterval(ctTimer); clearTimeout(ctPause); }
$$('.ct-step').forEach(btn => btn.addEventListener('click', () => {
  stopCookies();
  setCookie(+btn.dataset.ct);
  const [x, y] = centerOf(btn.querySelector('.ct-dot'));
  burst(x, y, { count: 10, emojis: ['✨', '🍪', '🤎'], spread: 70 });
  ctPause = setTimeout(() => { ctTimer = setInterval(() => setCookie((ctIdx + 1) % CT_N), 2600); }, 6000);
}));
setCookie(0);

/* ---------- Carousel testimoni ---------- */
const track = $('#carTrack');
track.innerHTML = TESTIMONIALS.map((t, i) => `
  <div class="testi"><div class="testi-inner">
    <div class="stars">★★★★★</div><p>"${t.text}"</p>
    <div class="testi-user"><span class="avatar">${t.name[0]}</span><div><strong>${t.name}</strong><small>${t.role}</small></div>
      <button class="like" data-like="${i}" aria-label="Suka testimoni ini" aria-pressed="false">♥</button></div>
  </div></div>`).join('');
track.addEventListener('click', e => {
  const b = e.target.closest('.like'); if (!b) return;
  const on = b.classList.toggle('liked');
  b.setAttribute('aria-pressed', String(on));
  if (on) { const [x, y] = centerOf(b); burst(x, y, { count: 12, emojis: ['🧡', '💛', '♥'], crumbs: false, spread: 80 }); }
});
let carIndex = 0, carTimer;
const perView = () => innerWidth <= 560 ? 1 : innerWidth <= 1024 ? 2 : 3;
const maxIndex = () => TESTIMONIALS.length - perView();
function renderDots() {
  $('#carDots').innerHTML = Array.from({ length: maxIndex() + 1 }, (_, i) => `<button data-i="${i}" class="${i === carIndex ? 'active' : ''}" aria-label="Slide ${i + 1}"></button>`).join('');
}
function goTo(i) {
  const m = maxIndex();
  carIndex = i > m ? 0 : i < 0 ? m : i;
  track.style.transform = `translateX(-${carIndex * (100 / perView())}%)`;
  renderDots();
}
function autoplay() { clearInterval(carTimer); carTimer = setInterval(() => goTo(carIndex + 1), 4500); }
$('#carNext').addEventListener('click', () => { goTo(carIndex + 1); autoplay(); });
$('#carPrev').addEventListener('click', () => { goTo(carIndex - 1); autoplay(); });
$('#carDots').addEventListener('click', e => { if (e.target.dataset.i) { goTo(+e.target.dataset.i); autoplay(); } });
$('#carousel').addEventListener('mouseenter', () => clearInterval(carTimer));
$('#carousel').addEventListener('mouseleave', autoplay);
let touchX = null;
track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { goTo(carIndex + (dx < 0 ? 1 : -1)); autoplay(); }
  touchX = null;
});
addEventListener('resize', () => goTo(Math.min(carIndex, maxIndex())));
goTo(0); autoplay();

/* ---------- FAQ: accordion ---------- */
$$('.acc-item').forEach(item => {
  item.querySelector('.acc-head').addEventListener('click', () => {
    const open = item.classList.contains('open');

    $$('.acc-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.acc-body').style.maxHeight = null;
    });

    if (!open) {
      item.classList.add('open');
      const body = item.querySelector('.acc-body');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ---------- Navbar mobile ---------- */
const hamburger = $('#hamburger'), navLinks = $('#navLinks'), navDim = $('#navDim');
function closeNav() { hamburger.classList.remove('open'); navLinks.classList.remove('open'); navDim.classList.remove('show'); hamburger.setAttribute('aria-expanded', 'false'); }
hamburger.addEventListener('click', () => {
  const open = !navLinks.classList.contains('open');
  hamburger.classList.toggle('open', open); navLinks.classList.toggle('open', open); navDim.classList.toggle('show', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
navDim.addEventListener('click', closeNav);
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ---------- Angka berhitung ---------- */
function countUp(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), suffix = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1400;
  const step = now => {
    const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
    const v = target * eased;
    el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : Math.round(v).toLocaleString('id-ID')) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else if (el.dataset.final) el.textContent = el.dataset.final;
  };
  requestAnimationFrame(step);
}

/* ---------- Reveal saat scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('visible');
    en.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(en.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
function observeReveals(page) {
  page.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    el.querySelectorAll('[data-count]').forEach(c => { delete c.dataset.done; c.textContent = '0'; });
    io.observe(el);
  });
}

/* ---------- Router multi-halaman (hash) ---------- */
const pages = $$('.page');
const visited = [];
function currentRoute() {
  const key = location.hash.replace(/^#\/?/, '').split('?')[0];
  return key in ROUTES ? key : null;
}
function render() {
  const key = currentRoute();
  if (key === null) { location.replace('#/'); return; }
  const route = ROUTES[key];
  const navKey = route.nav ?? key;
  pages.forEach(p => p.classList.toggle('active', p.dataset.page === route.page));
  document.title = route.title;
  navLinks.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.route === navKey));
  if (visited[visited.length - 1] !== key) visited.push(key);
  closeNav(); closeCart();
  $$('.overlay.show').forEach(o => closeModal(o.id));
  const page = $(`.page[data-page="${route.page}"]`);
  observeReveals(page);
  requestAnimationFrame(renderDrips);
  if (route.page === 'testimoni') goTo(0);
  if (route.page === 'cara-pesan') startSteps(); else stopSteps();
  if (route.page === 'menu') startCookies(); else stopCookies();
  if (route.anchor) setTimeout(() => document.getElementById(route.anchor).scrollIntoView({ behavior: 'smooth' }), 80);
  else window.scrollTo(0, 0);
}
addEventListener('hashchange', render);

// Tombol panah kembali
$$('[data-back]').forEach(b => b.addEventListener('click', () => {
  visited.pop();
  const prev = visited.pop();
  location.hash = '#/' + (prev !== undefined && prev !== currentRoute() ? prev : '');
}));
// Klik "Lihat peta" saat sudah di #/lokasi
document.addEventListener('click', e => {
  const a = e.target.closest('a[href="#/lokasi"]');
  if (a && location.hash === '#/lokasi') { e.preventDefault(); document.getElementById('lokasi').scrollIntoView({ behavior: 'smooth' }); }
});

/* ---------- Scroll: navbar, progress, kembali ke atas ---------- */
$('#backTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
addEventListener('scroll', () => {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  $('#navbar').classList.toggle('scrolled', y > 10);
  $('#backTop').classList.toggle('show', y > 500);
  $('#scrollProgress').style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
}, { passive: true });

renderCart();
render();
addEventListener('load', renderDrips);
