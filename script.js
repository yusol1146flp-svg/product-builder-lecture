// ── FADE-IN OBSERVER ──
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── THEME TOGGLE ──
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('color-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'light' || (!saved && !prefersDark)) {
  html.classList.add('light');
  if (themeBtn) themeBtn.textContent = '☀️';
}
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isLight = html.classList.toggle('light');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('color-theme', isLight ? 'light' : 'dark');
  });
}

// ── ACTIVE NAV LINK ──
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

// ── SEARCH DATA ──
const SEARCH_DATA = [
  // Palettes
  {type:'palette',id:'p01',name:'오션 & 선셋',mood:'자연·역동',harmony:'complementary',colors:['#264653','#2A9D8F','#E9C46A','#F4A261','#E76F51'],url:'palettes.html'},
  {type:'palette',id:'p02',name:'퍼플 & 골드',mood:'고급·신비',harmony:'complementary',colors:['#10002B','#7B2FBE','#C77DFF','#FFD60A','#FFAA00'],url:'palettes.html'},
  {type:'palette',id:'p03',name:'민트 & 코랄',mood:'청량·발랄',harmony:'complementary',colors:['#B7E4C7','#52B788','#2D6A4F','#FF4D6D','#C9184A'],url:'palettes.html'},
  {type:'palette',id:'p04',name:'네이비 & 앰버',mood:'강렬·모던',harmony:'complementary',colors:['#03045E','#0077B6','#48CAE4','#FFB703','#FB8500'],url:'palettes.html'},
  {type:'palette',id:'p05',name:'로즈 & 포레스트',mood:'생동·활기',harmony:'complementary',colors:['#FFCCD5','#FF85A1','#C9184A','#2DC653','#1A7431'],url:'palettes.html'},
  {type:'palette',id:'p06',name:'봄 벚꽃',mood:'로맨틱·봄',harmony:'analogous',colors:['#FFCCD5','#FFB3C6','#FF85A1','#FF4D6D','#C9184A'],url:'palettes.html'},
  {type:'palette',id:'p07',name:'오션 브리즈',mood:'청량·투명',harmony:'analogous',colors:['#CAF0F8','#90E0EF','#48CAE4','#00B4D8','#0077B6'],url:'palettes.html'},
  {type:'palette',id:'p08',name:'선셋 글로우',mood:'에너지·비비드',harmony:'analogous',colors:['#FFBE0B','#FB5607','#FF006E','#8338EC','#3A86FF'],url:'palettes.html'},
  {type:'palette',id:'p09',name:'딥 포레스트',mood:'자연·안정',harmony:'analogous',colors:['#D8F3DC','#95D5B2','#52B788','#2D6A4F','#1B4332'],url:'palettes.html'},
  {type:'palette',id:'p10',name:'라벤더 드림',mood:'몽환·우아',harmony:'analogous',colors:['#F3E8FF','#E0AAFF','#C77DFF','#9D4EDD','#7B2FBE'],url:'palettes.html'},
  {type:'palette',id:'p11',name:'비비드 트리오',mood:'팝·생동감',harmony:'triadic',colors:['#FF595E','#FFCA3A','#6A4C93'],url:'palettes.html'},
  {type:'palette',id:'p12',name:'파스텔 트리오',mood:'부드러움·동화',harmony:'triadic',colors:['#FFB3C1','#B5EAD7','#C7CEEA'],url:'palettes.html'},
  {type:'palette',id:'p13',name:'팝 아트',mood:'강렬·대담',harmony:'triadic',colors:['#FF0054','#FFBD00','#00B4D8'],url:'palettes.html'},
  {type:'palette',id:'p14',name:'프라이머리',mood:'균형·활력',harmony:'triadic',colors:['#8AC926','#FF595E','#1982C4','#FFCA3A'],url:'palettes.html'},
  {type:'palette',id:'p15',name:'딥 퍼플',mood:'신비·깊이',harmony:'monochromatic',colors:['#10002B','#3C096C','#7B2FBE','#C77DFF','#E0AAFF'],url:'palettes.html'},
  {type:'palette',id:'p16',name:'미드나잇 블루',mood:'차분·집중',harmony:'monochromatic',colors:['#03045E','#0077B6','#00B4D8','#90E0EF','#CAF0F8'],url:'palettes.html'},
  {type:'palette',id:'p17',name:'에메랄드 숲',mood:'자연·편안',harmony:'monochromatic',colors:['#1B4332','#2D6A4F','#52B788','#95D5B2','#D8F3DC'],url:'palettes.html'},
  {type:'palette',id:'p18',name:'불꽃 & 로즈우드',mood:'열정·따뜻함',harmony:'monochromatic',colors:['#370617','#6A040F','#D00000','#F48C06','#FFD166'],url:'palettes.html'},
  {type:'palette',id:'p19',name:'트로피컬 선셋',mood:'이국적·활기',harmony:'split',colors:['#0D3B66','#48CAE4','#F4D35E','#EE964B','#F95738'],url:'palettes.html'},
  {type:'palette',id:'p20',name:'매직아워',mood:'도시·몽환',harmony:'split',colors:['#4361EE','#4CC9F0','#F72585','#FFBE0B'],url:'palettes.html'},
  // Gradients
  {type:'gradient',id:'g01',name:'선셋 드라이브',mood:'따뜻함·향수',css:'linear-gradient(135deg, #FF6B6B, #FE8C00)',url:'gradients.html'},
  {type:'gradient',id:'g02',name:'오로라 보레알리스',mood:'신비·생동감',css:'linear-gradient(135deg, #00C9FF, #92FE9D)',url:'gradients.html'},
  {type:'gradient',id:'g03',name:'봄 벚꽃',mood:'로맨틱·봄',css:'linear-gradient(135deg, #FFB7C5, #FF69B4, #C9184A)',url:'gradients.html'},
  {type:'gradient',id:'g04',name:'라벤더 안개',mood:'몽환·우아',css:'linear-gradient(135deg, #E0C3FC, #8EC5FC)',url:'gradients.html'},
  {type:'gradient',id:'g05',name:'딥 오션',mood:'깊이·신뢰',css:'linear-gradient(135deg, #1CB5E0, #000851)',url:'gradients.html'},
  {type:'gradient',id:'g06',name:'골든아워',mood:'따스함·풍요',css:'linear-gradient(135deg, #F7971E, #FFD200)',url:'gradients.html'},
  {type:'gradient',id:'g07',name:'네온 글로우',mood:'화려·파티',css:'linear-gradient(135deg, #12C2E9, #C471ED, #F64F59)',url:'gradients.html'},
  {type:'gradient',id:'g08',name:'민트 프레시',mood:'청량·건강',css:'linear-gradient(135deg, #0BAB64, #3BB78F)',url:'gradients.html'},
  {type:'gradient',id:'g09',name:'코스믹 퓨전',mood:'미래적·독창',css:'linear-gradient(135deg, #FF00CC, #333399)',url:'gradients.html'},
  {type:'gradient',id:'g10',name:'피치 플로트',mood:'달콤·부드러움',css:'linear-gradient(135deg, #FFECD2, #FCB69F)',url:'gradients.html'},
  {type:'gradient',id:'g11',name:'자정 특급',mood:'미니멀·세련',css:'linear-gradient(135deg, #0F0C29, #302B63, #24243E)',url:'gradients.html'},
  {type:'gradient',id:'g12',name:'라임 에너지',mood:'활력·자연',css:'linear-gradient(135deg, #56AB2F, #A8E063)',url:'gradients.html'},
  {type:'gradient',id:'g13',name:'로즈 골드',mood:'고급·여성스러움',css:'linear-gradient(135deg, #B76E79, #E8A4AD, #FFE0E5)',url:'gradients.html'},
  {type:'gradient',id:'g14',name:'폴라 스카이',mood:'맑음·자유',css:'linear-gradient(135deg, #89F7FE, #66A6FF)',url:'gradients.html'},
  {type:'gradient',id:'g15',name:'포레스트 딥',mood:'안정·차분',css:'linear-gradient(135deg, #134E5E, #71B280)',url:'gradients.html'},
  {type:'gradient',id:'g16',name:'망고 탱고',mood:'활기·에너지',css:'linear-gradient(135deg, #F09819, #EDDE5D)',url:'gradients.html'},
  {type:'gradient',id:'g17',name:'트리플 파스텔',mood:'트렌디·밝음',css:'linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)',url:'gradients.html'},
  {type:'gradient',id:'g18',name:'스모키 차콜',mood:'모던·중후함',css:'linear-gradient(135deg, #232526, #414345)',url:'gradients.html'},
];

// ── USER STATE ──
function getUser() { return JSON.parse(localStorage.getItem('color-user') || 'null'); }
function setUser(u) { localStorage.setItem('color-user', JSON.stringify(u)); }
function clearUser() { localStorage.removeItem('color-user'); }

// ── FAVORITES ──
function getFavs() { return JSON.parse(localStorage.getItem('color-favorites') || '{"palettes":[],"gradients":[]}'); }
function saveFavs(f) { localStorage.setItem('color-favorites', JSON.stringify(f)); }
function toggleFav(type, id) {
  const f = getFavs();
  const arr = f[type + 's'];
  const idx = arr.indexOf(id);
  if (idx === -1) arr.push(id); else arr.splice(idx, 1);
  saveFavs(f);
  return idx === -1;
}
function isFaved(type, id) {
  const f = getFavs();
  return f[type + 's'].includes(id);
}

// ── SEARCH HISTORY ──
function getHistory() { return JSON.parse(localStorage.getItem('color-search-history') || '[]'); }
function addHistory(q) {
  if (!q.trim()) return;
  let h = getHistory().filter(x => x !== q);
  h.unshift(q);
  if (h.length > 8) h = h.slice(0, 8);
  localStorage.setItem('color-search-history', JSON.stringify(h));
}
function removeHistory(q) {
  localStorage.setItem('color-search-history', JSON.stringify(getHistory().filter(x => x !== q)));
}

// ── SEARCH LOGIC ──
function searchItems(q) {
  if (!q.trim()) return [];
  const term = q.toLowerCase();
  return SEARCH_DATA.filter(item =>
    item.name.toLowerCase().includes(term) ||
    item.mood.toLowerCase().includes(term) ||
    (item.harmony && item.harmony.toLowerCase().includes(term))
  ).slice(0, 12);
}

// ── INJECT SHARED UI ──
function injectUI() {
  const overlay = document.createElement('div');
  overlay.id = 'searchOverlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-box">
      <div class="search-input-wrap">
        <span>🔍</span>
        <input type="text" class="search-input" id="searchInput" placeholder="팔레트·그라데이션 이름, 분위기로 검색…" autocomplete="off">
        <button class="search-close" id="searchClose">✕</button>
      </div>
      <div class="search-results" id="searchResults"></div>
    </div>`;
  document.body.appendChild(overlay);

  const loginModal = document.createElement('div');
  loginModal.id = 'loginModal';
  loginModal.className = 'modal-backdrop';
  loginModal.innerHTML = `<div class="modal" id="loginModalInner"><button class="modal-close" id="modalClose">✕</button><div id="modalContent"></div></div>`;
  document.body.appendChild(loginModal);

  // Overlay outside click closes
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  loginModal.addEventListener('click', e => { if (e.target === loginModal) closeModal(); });
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  document.getElementById('modalClose').addEventListener('click', closeModal);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); closeModal(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  // Search input
  const input = document.getElementById('searchInput');
  input.addEventListener('input', () => renderSearchResults(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      addHistory(input.value.trim());
      renderSearchResults(input.value);
    }
  });

  // Login/Search buttons
  const searchBtn = document.getElementById('searchBtn');
  const loginBtn = document.getElementById('loginBtn');
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (loginBtn) loginBtn.addEventListener('click', openLogin);

  updateUserUI();
}

function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 50);
  renderSearchResults('');
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
}
function openLogin() {
  renderModal();
  document.getElementById('loginModal').classList.add('open');
}
function closeModal() {
  document.getElementById('loginModal').classList.remove('open');
}

function renderSearchResults(q) {
  const el = document.getElementById('searchResults');
  if (!q.trim()) {
    const history = getHistory();
    if (!history.length) {
      el.innerHTML = '<div class="search-empty">팔레트 이름, 분위기(예: "청량"), 색상 이름으로 검색해 보세요.</div>';
      return;
    }
    el.innerHTML = `<div class="search-section-title">최근 검색</div>` +
      history.map(h => `
        <div class="search-history-item" data-q="${h}">
          <span>🕐</span><span>${h}</span>
          <button class="search-history-del" data-del="${h}">✕</button>
        </div>`).join('');
    el.querySelectorAll('.search-history-item').forEach(row => {
      row.addEventListener('click', e => {
        if (e.target.closest('.search-history-del')) return;
        document.getElementById('searchInput').value = row.dataset.q;
        renderSearchResults(row.dataset.q);
      });
    });
    el.querySelectorAll('.search-history-del').forEach(btn => {
      btn.addEventListener('click', () => {
        removeHistory(btn.dataset.del);
        renderSearchResults('');
      });
    });
    return;
  }
  const results = searchItems(q);
  if (!results.length) {
    el.innerHTML = `<div class="search-empty">"${q}"에 대한 결과가 없습니다.</div>`;
    return;
  }
  const palettes = results.filter(r => r.type === 'palette');
  const gradients = results.filter(r => r.type === 'gradient');
  let html = '';
  if (palettes.length) {
    html += `<div class="search-section-title">팔레트</div>`;
    html += palettes.map(item => `
      <a href="${item.url}" class="search-result-item" data-q="${q}">
        <div class="search-result-swatch" style="background:${item.colors[2] || item.colors[0]};"></div>
        <div class="search-result-info">
          <div class="search-result-name">${item.name}</div>
          <div class="search-result-meta">${item.mood}</div>
        </div>
        <span class="search-result-badge" style="background:rgba(167,139,250,0.12);color:#a78bfa;border:1px solid rgba(167,139,250,0.25);">팔레트</span>
      </a>`).join('');
  }
  if (gradients.length) {
    html += `<div class="search-section-title">그라데이션</div>`;
    html += gradients.map(item => `
      <a href="${item.url}" class="search-result-item" data-q="${q}">
        <div class="search-result-swatch grad" style="background:${item.css};"></div>
        <div class="search-result-info">
          <div class="search-result-name">${item.name}</div>
          <div class="search-result-meta">${item.mood}</div>
        </div>
        <span class="search-result-badge" style="background:rgba(96,165,250,0.12);color:#60a5fa;border:1px solid rgba(96,165,250,0.25);">그라데이션</span>
      </a>`).join('');
  }
  el.innerHTML = html;
  el.querySelectorAll('.search-result-item').forEach(a => {
    a.addEventListener('click', () => {
      addHistory(a.dataset.q || q);
      closeSearch();
    });
  });
}

function renderModal() {
  const user = getUser();
  const mc = document.getElementById('modalContent');
  if (user) {
    const favs = getFavs();
    const palCount = favs.palettes.length;
    const gradCount = favs.gradients.length;
    mc.innerHTML = `
      <div class="modal-user-info">
        <div class="modal-user-avatar">🎨</div>
        <div class="modal-user-name">${user.name}</div>
        <div class="modal-user-stats">Color 사용자</div>
        <div class="modal-stats-grid">
          <div class="modal-stat-card">
            <div class="modal-stat-num">${palCount}</div>
            <div class="modal-stat-label">저장된 팔레트</div>
          </div>
          <div class="modal-stat-card">
            <div class="modal-stat-num">${gradCount}</div>
            <div class="modal-stat-label">저장된 그라데이션</div>
          </div>
        </div>
        <a href="favorites.html" class="modal-favorites-link" onclick="closeModal()">❤️ 내 저장함 & 추천 보기</a>
        <button class="modal-btn-outline" id="logoutBtn">로그아웃</button>
      </div>`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      clearUser();
      updateUserUI();
      closeModal();
    });
  } else {
    mc.innerHTML = `
      <h2>Color에 오신 걸<br>환영해요 🎨</h2>
      <p>닉네임을 입력하면 팔레트와 그라데이션을 저장하고 맞춤 추천을 받을 수 있어요. 계정 정보는 이 기기에만 저장됩니다.</p>
      <div class="modal-form-group">
        <label>닉네임</label>
        <input type="text" class="modal-input" id="nameInput" placeholder="색을 좋아하는 이름" maxlength="20">
      </div>
      <div class="modal-form-group">
        <label>이메일 (선택)</label>
        <input type="email" class="modal-input" id="emailInput" placeholder="hello@example.com">
      </div>
      <button class="modal-btn" id="startBtn">시작하기</button>`;
    document.getElementById('nameInput').focus();
    document.getElementById('startBtn').addEventListener('click', () => {
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      if (!name) { document.getElementById('nameInput').focus(); return; }
      setUser({ name, email, createdAt: Date.now() });
      updateUserUI();
      renderModal();
    });
    document.getElementById('nameInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('startBtn').click();
    });
  }
}

function updateUserUI() {
  const user = getUser();
  const loginBtn = document.getElementById('loginBtn');
  const navFavs = document.getElementById('navFavorites');
  if (loginBtn) {
    loginBtn.textContent = user ? '👤' : '👤';
    loginBtn.title = user ? `${user.name} — 내 저장함` : '로그인';
    loginBtn.classList.toggle('active-user', !!user);
  }
  if (navFavs) navFavs.style.display = user ? '' : 'none';
  // Update all fav buttons on page
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    const type = btn.dataset.favType;
    const id = btn.dataset.favId;
    btn.classList.toggle('saved', isFaved(type, id));
    btn.title = isFaved(type, id) ? '저장됨 ✓' : (user ? '저장하기' : '로그인 후 저장 가능');
  });
}

function handleFavClick(btn) {
  const user = getUser();
  if (!user) { openLogin(); return; }
  const type = btn.dataset.favType;
  const id = btn.dataset.favId;
  const added = toggleFav(type, id);
  btn.classList.toggle('saved', added);
  btn.textContent = added ? '❤️' : '🤍';
  btn.title = added ? '저장됨 ✓' : '저장하기';
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  injectUI();
  // Fav button click delegation
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-fav-id]');
    if (btn) handleFavClick(btn);
  });
  // Init fav button states
  updateUserUI();
});
