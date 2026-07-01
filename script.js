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

// ── AUTH SYSTEM ──
async function _hash(pw) {
  const data = new TextEncoder().encode(pw + 'color2026$salt');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function _uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function getAccounts() { return JSON.parse(localStorage.getItem('color-accounts') || '[]'); }
function _saveAccounts(a) { localStorage.setItem('color-accounts', JSON.stringify(a)); }
function getSession() { return JSON.parse(localStorage.getItem('color-session') || 'null'); }
function _saveSession(s) { localStorage.setItem('color-session', JSON.stringify(s)); }
function _clearSession() { localStorage.removeItem('color-session'); }

async function registerUser(username, email, pw) {
  if (!username.trim() || !email.trim() || !pw) return {ok:false, msg:'모든 항목을 입력해 주세요.'};
  if (pw.length < 6) return {ok:false, msg:'비밀번호는 6자 이상이어야 합니다.'};
  const accounts = getAccounts();
  if (accounts.find(a => a.email.toLowerCase() === email.toLowerCase()))
    return {ok:false, msg:'이미 사용 중인 이메일입니다.'};
  const hash = await _hash(pw);
  const user = {id:_uid(), username:username.trim(), email:email.trim().toLowerCase(), hash, createdAt:Date.now()};
  accounts.push(user);
  _saveAccounts(accounts);
  const session = {userId:user.id, username:user.username, email:user.email};
  _saveSession(session);
  setUser({name:user.username, email:user.email, createdAt:user.createdAt});
  return {ok:true, session};
}

async function loginUser(email, pw) {
  if (!email.trim() || !pw) return {ok:false, msg:'이메일과 비밀번호를 입력해 주세요.'};
  const accounts = getAccounts();
  const user = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) return {ok:false, msg:'등록되지 않은 이메일입니다.'};
  const hash = await _hash(pw);
  if (hash !== user.hash) return {ok:false, msg:'비밀번호가 일치하지 않습니다.'};
  const session = {userId:user.id, username:user.username, email:user.email};
  _saveSession(session);
  setUser({name:user.username, email:user.email, createdAt:user.createdAt});
  return {ok:true, session};
}

function logoutUser() {
  _clearSession();
  clearUser();
  updateUserUI();
}

// ── USER STATE (backward compat) ──
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
function isFaved(type, id) { return getFavs()[type + 's'].includes(id); }

// — SEARCH HISTORY (logged-in users only) —
function getHistory() {
  const session = getSession();
  if (!session) return [];
  const key = `color-history-${session.userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function addHistory(q) {
  if (!q.trim()) return;
  const session = getSession();
  if (!session) return;
  const key = `color-history-${session.userId}`;
  let h = getHistory().filter(x => x !== q);
  h.unshift(q);
  if (h.length > 20) h = h.slice(0, 20);
  localStorage.setItem(key, JSON.stringify(h));
}
function removeHistory(q) {
  const session = getSession();
  if (!session) return;
  const key = `color-history-${session.userId}`;
  localStorage.setItem(key, JSON.stringify(getHistory().filter(x => x !== q)));
}

// ── COMMENTS ──
function getComments() { return JSON.parse(localStorage.getItem('color-comments') || '[]'); }
function _saveComments(c) { localStorage.setItem('color-comments', JSON.stringify(c)); }
function getItemComments(pageType, itemId) {
  return getComments().filter(c => c.pageType === pageType && c.itemId === itemId)
    .sort((a,b) => a.createdAt - b.createdAt);
}
function addComment(pageType, itemId, text) {
  const session = getSession();
  if (!session) return null;
  const c = {
    id: _uid(), userId: session.userId, username: session.username,
    pageType, itemId, text: text.trim(), createdAt: Date.now(), likes: []
  };
  const all = getComments();
  all.push(c);
  _saveComments(all);
  return c;
}
function deleteComment(id) {
  const session = getSession();
  if (!session) return;
  const all = getComments().filter(c => !(c.id === id && c.userId === session.userId));
  _saveComments(all);
}
function editComment(id, text) {
  const session = getSession();
  if (!session || !text.trim()) return null;
  const all = getComments();
  const c = all.find(c => c.id === id && c.userId === session.userId);
  if (!c) return null;
  c.text = text.trim();
  c.editedAt = Date.now();
  _saveComments(all);
  return c;
}
function likeComment(id) {
  const session = getSession();
  if (!session) return;
  const all = getComments();
  const c = all.find(c => c.id === id);
  if (!c) return;
  const idx = c.likes.indexOf(session.userId);
  if (idx === -1) c.likes.push(session.userId); else c.likes.splice(idx, 1);
  _saveComments(all);
  return c;
}
function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return '방금 전';
  if (s < 3600) return Math.floor(s/60) + '분 전';
  if (s < 86400) return Math.floor(s/3600) + '시간 전';
  return Math.floor(s/86400) + '일 전';
}

function renderCommentSection(wrap, pageType, itemId) {
  const session = getSession();
  const comments = getItemComments(pageType, itemId);
  const count = comments.length;

  wrap.innerHTML = `
    <div class="comment-toggle-row">
      <button class="comment-toggle-btn" data-open="false">
        💬 댓글 <span class="cmt-count">${count}</span>
      </button>
    </div>
    <div class="comment-body" style="display:none;">
      <div class="comment-list"></div>
      ${session
        ? `<div class="comment-form-wrap">
             <div class="comment-avatar small">${session.username.charAt(0).toUpperCase()}</div>
             <div class="comment-input-row">
               <textarea class="comment-textarea" placeholder="댓글을 입력하세요…" rows="1"></textarea>
               <button class="comment-submit-btn">등록</button>
             </div>
           </div>`
        : `<div class="comment-login-prompt">
             <a href="login.html?redirect=${encodeURIComponent(location.href)}">로그인</a>하면 댓글을 작성할 수 있어요.
           </div>`}
    </div>`;

  const toggleBtn = wrap.querySelector('.comment-toggle-btn');
  const body = wrap.querySelector('.comment-body');
  const listEl = wrap.querySelector('.comment-list');

  function renderList() {
    const cs = getItemComments(pageType, itemId);
    wrap.querySelector('.cmt-count').textContent = cs.length;
    if (!cs.length) {
      listEl.innerHTML = '<div class="comment-empty">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</div>';
      return;
    }
    listEl.innerHTML = cs.map(c => {
      const mine = session && c.userId === session.userId;
      const liked = session && c.likes.includes(session.userId);
      return `<div class="comment-item" data-id="${c.id}">
        <div class="comment-avatar">${c.username.charAt(0).toUpperCase()}</div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-username">${c.username}</span>
            <span class="comment-time">${timeAgo(c.createdAt)}${c.editedAt ? ' (수정됨)' : ''}</span>
          </div>
          <div class="comment-text">${c.text.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>
          <div class="comment-actions">
            <button class="cmt-like-btn ${liked?'liked':''}" data-id="${c.id}">
              ${liked?'❤️':'🤍'} ${c.likes.length||''}
            </button>
           ${mine ? `<button class="cmt-edit-btn" data-id="${c.id}">수정</button>` : ''}
          ${mine ? `<button class="cmt-del-btn" data-id="${c.id}">삭제</button>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');

    listEl.querySelectorAll('.cmt-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('댓글을 삭제하시겠어요?')) return;
        deleteComment(btn.dataset.id);
        renderList();
      });
    });
    listEl.querySelectorAll('.cmt-like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!session) { location.href = 'login.html?redirect=' + encodeURIComponent(location.href); return; }
        likeComment(btn.dataset.id);
        renderList();
      });
    });
    listEl.querySelectorAll('.cmt-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const c = cs.find(c => c.id === id);
        if (!c) return;
        const textEl = listEl.querySelector(`.comment-item[data-id="${id}"] .comment-text`);
        textEl.innerHTML = `
          <textarea class="comment-textarea cmt-edit-textarea">${c.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
          <div class="cmt-edit-actions">
            <button class="cmt-edit-save" data-id="${id}">저장</button>
            <button class="cmt-edit-cancel">취소</button>
          </div>`;
        const ta = textEl.querySelector('.cmt-edit-textarea');
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
        textEl.querySelector('.cmt-edit-save').addEventListener('click', () => {
          if (!ta.value.trim()) return;
          editComment(id, ta.value);
          renderList();
        });
        textEl.querySelector('.cmt-edit-cancel').addEventListener('click', () => renderList());
      });
    });
  }

  toggleBtn.addEventListener('click', () => {
    const open = toggleBtn.dataset.open === 'true';
    toggleBtn.dataset.open = !open;
    body.style.display = open ? 'none' : 'block';
    if (!open) renderList();
  });

  if (session) {
    const ta = wrap.querySelector('.comment-textarea');
    const sub = wrap.querySelector('.comment-submit-btn');
    ta.addEventListener('input', () => {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    });
    sub.addEventListener('click', () => {
      if (!ta.value.trim()) return;
      addComment(pageType, itemId, ta.value);
      ta.value = '';
      ta.style.height = 'auto';
      renderList();
    });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) sub.click();
    });
  }
}

// ── CUSTOM PALETTES ──
function getCustomPalettes() { return JSON.parse(localStorage.getItem('color-custom-palettes') || '[]'); }
function _saveCustomPalettes(p) { localStorage.setItem('color-custom-palettes', JSON.stringify(p)); }
function addCustomPalette(name, colors, desc) {
  const session = getSession();
  if (!session) return null;
  const p = {
    id: _uid(), userId: session.userId, username: session.username,
    name: name.trim(), colors, desc: (desc||'').trim(), createdAt: Date.now(), likes: []
  };
  const all = getCustomPalettes();
  all.unshift(p);
  _saveCustomPalettes(all);
  return p;
}
function deleteCustomPalette(id) {
  const session = getSession();
  if (!session) return;
  _saveCustomPalettes(getCustomPalettes().filter(p => !(p.id === id && p.userId === session.userId)));
}
function likeCustomPalette(id) {
  const session = getSession();
  if (!session) return null;
  const all = getCustomPalettes();
  const p = all.find(p => p.id === id);
  if (!p) return null;
  const idx = p.likes.indexOf(session.userId);
  if (idx === -1) p.likes.push(session.userId); else p.likes.splice(idx, 1);
  _saveCustomPalettes(all);
  return p;
}

// — SEARCH LOGIC —
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

  const profileModal = document.createElement('div');
  profileModal.id = 'loginModal';
  profileModal.className = 'modal-backdrop';
  profileModal.innerHTML = `<div class="modal" id="loginModalInner"><button class="modal-close" id="modalClose">✕</button><div id="modalContent"></div></div>`;
  document.body.appendChild(profileModal);

  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  profileModal.addEventListener('click', e => { if (e.target === profileModal) closeModal(); });
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  document.getElementById('modalClose').addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); closeModal(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  const input = document.getElementById('searchInput');
  input.addEventListener('input', () => renderSearchResults(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      addHistory(input.value.trim());
      renderSearchResults(input.value);
    }
  });

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
function closeSearch() { document.getElementById('searchOverlay').classList.remove('open'); }

function openLogin() {
  const session = getSession();
  if (!session) {
    location.href = 'login.html?redirect=' + encodeURIComponent(location.href);
    return;
  }
  renderModal();
  document.getElementById('loginModal').classList.add('open');
}
function closeModal() { document.getElementById('loginModal').classList.remove('open'); }

function renderSearchResults(q) {
  const el = document.getElementById('searchResults');
  if (!q.trim()) {
    const history = getHistory();
   if (!history.length) {
    const hint = getSession()
    ? '팔레트 이름, 분위기(예: "청량"), 색상 이름으로 검색해 보세요.'
    : '팔레트 이름, 분위기(예: "청량"), 색상 이름으로 검색해 보세요.<br><a href="login.html?redirect=' + encodeURIComponent(location.href) + '">로그인</a>하면 검색 기록이 저장돼요.';
  el.innerHTML = `<div class="search-empty">${hint}</div>`;
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
      btn.addEventListener('click', () => { removeHistory(btn.dataset.del); renderSearchResults(''); });
    });
    return;
  }
  const results = searchItems(q);
  if (!results.length) { el.innerHTML = `<div class="search-empty">"${q}"에 대한 결과가 없습니다.</div>`; return; }
  const palettes = results.filter(r => r.type === 'palette');
  const gradients = results.filter(r => r.type === 'gradient');
  let html = '';
  if (palettes.length) {
    html += `<div class="search-section-title">팔레트</div>`;
    html += palettes.map(item => `
      <a href="${item.url}" class="search-result-item" data-q="${q}">
        <div class="search-result-swatch" style="background:${item.colors[2]||item.colors[0]};"></div>
        <div class="search-result-info"><div class="search-result-name">${item.name}</div><div class="search-result-meta">${item.mood}</div></div>
        <span class="search-result-badge" style="background:rgba(167,139,250,0.12);color:#a78bfa;border:1px solid rgba(167,139,250,0.25);">팔레트</span>
      </a>`).join('');
  }
  if (gradients.length) {
    html += `<div class="search-section-title">그라데이션</div>`;
    html += gradients.map(item => `
      <a href="${item.url}" class="search-result-item" data-q="${q}">
        <div class="search-result-swatch grad" style="background:${item.css};"></div>
        <div class="search-result-info"><div class="search-result-name">${item.name}</div><div class="search-result-meta">${item.mood}</div></div>
        <span class="search-result-badge" style="background:rgba(96,165,250,0.12);color:#60a5fa;border:1px solid rgba(96,165,250,0.25);">그라데이션</span>
      </a>`).join('');
  }
  el.innerHTML = html;
  el.querySelectorAll('.search-result-item').forEach(a => {
    a.addEventListener('click', () => { addHistory(a.dataset.q || q); closeSearch(); });
  });
}

function renderModal() {
  const session = getSession();
  const mc = document.getElementById('modalContent');
  if (!session) return;
  const favs = getFavs();
  const myPals = getCustomPalettes().filter(p => p.userId === session.userId);
  const myCmts = getComments().filter(c => c.userId === session.userId);
  mc.innerHTML = `
    <div class="modal-user-info">
      <div class="modal-user-avatar" style="font-size:1.5rem;width:56px;height:56px;background:linear-gradient(135deg,#a78bfa,#60a5fa);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;margin:0 auto 12px;">${session.username.charAt(0).toUpperCase()}</div>
      <div class="modal-user-name">${session.username}</div>
      <div class="modal-user-stats" style="font-size:0.78rem;color:var(--muted);margin-bottom:18px;">${session.email}</div>
      <div class="modal-stats-grid">
        <div class="modal-stat-card"><div class="modal-stat-num">${favs.palettes.length+favs.gradients.length}</div><div class="modal-stat-label">저장된 항목</div></div>
        <div class="modal-stat-card"><div class="modal-stat-num">${myPals.length}</div><div class="modal-stat-label">내 팔레트</div></div>
        <div class="modal-stat-card"><div class="modal-stat-num">${myCmts.length}</div><div class="modal-stat-label">작성 댓글</div></div>
      </div>
      <a href="favorites.html" class="modal-favorites-link" onclick="closeModal()">❤️ 내 저장함 보기</a>
      <a href="my-palette.html" class="modal-favorites-link" style="margin-top:8px;background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.2);color:#60a5fa;" onclick="closeModal()">🎨 내 팔레트 스튜디오</a>
      <button class="modal-btn-outline" id="logoutBtn" style="margin-top:14px;">로그아웃</button>
    </div>`;
  document.getElementById('logoutBtn').addEventListener('click', () => { logoutUser(); closeModal(); });
}

function updateUserUI() {
  const session = getSession();
  const loginBtn = document.getElementById('loginBtn');
  const navFavs = document.getElementById('navFavorites');
  const navMyPal = document.getElementById('navMyPalette');

  if (loginBtn) {
    if (session) {
      loginBtn.textContent = session.username.charAt(0).toUpperCase();
      loginBtn.title = `${session.username} — 프로필`;
      loginBtn.classList.add('active-user');
      loginBtn.style.cssText = 'background:linear-gradient(135deg,#a78bfa,#60a5fa);color:#fff;font-weight:900;border-radius:50%;width:34px;height:34px;padding:0;font-size:0.9rem;';
    } else {
      loginBtn.textContent = '👤';
      loginBtn.title = '로그인';
      loginBtn.classList.remove('active-user');
      loginBtn.style.cssText = '';
    }
  }
  if (navFavs) navFavs.style.display = session ? '' : 'none';
  if (navMyPal) navMyPal.style.display = session ? '' : 'none';

  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    const type = btn.dataset.favType;
    const id = btn.dataset.favId;
    const faved = isFaved(type, id);
    btn.classList.toggle('saved', faved);
    btn.textContent = faved ? '❤️' : '🤍';
    btn.title = faved ? '저장됨 ✓' : (session ? '저장하기' : '로그인 후 저장 가능');
  });
}

function handleFavClick(btn) {
  const session = getSession();
  if (!session) { openLogin(); return; }
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
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-fav-id]');
    if (btn) handleFavClick(btn);
  });
  updateUserUI();
});
