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

// ── LANGUAGE TOGGLE ──
const LANG_KEY = 'color-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'ko';

function t(ko, en) { return currentLang === 'en' ? en : ko; }

function applyLanguage(lang) {
  currentLang = lang;
  html.setAttribute('lang', lang === 'en' ? 'en' : 'ko');

  document.querySelectorAll('[data-en]').forEach(el => {
    if (el._koText === undefined) el._koText = el.textContent;
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el._koText;
  });

  ['placeholder', 'title', 'aria-label', 'content', 'alt'].forEach(attr => {
    document.querySelectorAll(`[data-en-${attr}]`).forEach(el => {
      if (el._koAttrs === undefined) el._koAttrs = {};
      if (el._koAttrs[attr] === undefined) el._koAttrs[attr] = el.getAttribute(attr) || '';
      el.setAttribute(attr, lang === 'en' ? el.getAttribute(`data-en-${attr}`) : el._koAttrs[attr]);
    });
  });

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = lang === 'en' ? '한' : 'EN';
  localStorage.setItem(LANG_KEY, lang);
  document.dispatchEvent(new Event('colorlangchange'));
}

if (themeBtn) {
  const langBtn = document.createElement('button');
  langBtn.className = 'icon-btn lang-toggle';
  langBtn.id = 'langToggle';
  langBtn.type = 'button';
  langBtn.title = 'Switch language';
  langBtn.setAttribute('aria-label', 'Switch language');
  langBtn.textContent = currentLang === 'en' ? '한' : 'EN';
  langBtn.addEventListener('click', () => applyLanguage(currentLang === 'en' ? 'ko' : 'en'));
  themeBtn.insertAdjacentElement('afterend', langBtn);
}

applyLanguage(currentLang);
window.addEventListener('load', () => applyLanguage(currentLang));

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
  {type:'palette',id:'p06',name:'머스타드 & 인디고',mood:'고풍·대비',harmony:'complementary',colors:['#FCEFD0','#E8A33D','#92640C','#4338CA','#1E1B4B'],url:'palettes.html'},
  {type:'palette',id:'p07',name:'봄 벚꽃',mood:'로맨틱·봄',harmony:'analogous',colors:['#FFCCD5','#FFB3C6','#FF85A1','#FF4D6D','#C9184A'],url:'palettes.html'},
  {type:'palette',id:'p08',name:'오션 브리즈',mood:'청량·투명',harmony:'analogous',colors:['#CAF0F8','#90E0EF','#48CAE4','#00B4D8','#0077B6'],url:'palettes.html'},
  {type:'palette',id:'p09',name:'선셋 글로우',mood:'에너지·비비드',harmony:'analogous',colors:['#FFBE0B','#FB5607','#FF006E','#8338EC','#3A86FF'],url:'palettes.html'},
  {type:'palette',id:'p10',name:'딥 포레스트',mood:'자연·안정',harmony:'analogous',colors:['#D8F3DC','#95D5B2','#52B788','#2D6A4F','#1B4332'],url:'palettes.html'},
  {type:'palette',id:'p11',name:'라벤더 드림',mood:'몽환·우아',harmony:'analogous',colors:['#F3E8FF','#E0AAFF','#C77DFF','#9D4EDD','#7B2FBE'],url:'palettes.html'},
  {type:'palette',id:'p12',name:'비비드 트리오',mood:'팝·생동감',harmony:'triadic',colors:['#FF595E','#FFCA3A','#6A4C93'],url:'palettes.html'},
  {type:'palette',id:'p13',name:'파스텔 트리오',mood:'부드러움·동화',harmony:'triadic',colors:['#FFB3C1','#B5EAD7','#C7CEEA'],url:'palettes.html'},
  {type:'palette',id:'p14',name:'팝 아트',mood:'강렬·대담',harmony:'triadic',colors:['#FF0054','#FFBD00','#00B4D8'],url:'palettes.html'},
  {type:'palette',id:'p15',name:'프라이머리',mood:'균형·활력',harmony:'triadic',colors:['#8AC926','#FF595E','#1982C4','#FFCA3A'],url:'palettes.html'},
  {type:'palette',id:'p16',name:'올리브 & 버건디 & 인디고',mood:'빈티지·이색적',harmony:'triadic',colors:['#6B7B3A','#8B1E3F','#4338CA'],url:'palettes.html'},
  {type:'palette',id:'p17',name:'딥 퍼플',mood:'신비·깊이',harmony:'monochromatic',colors:['#10002B','#3C096C','#7B2FBE','#C77DFF','#E0AAFF'],url:'palettes.html'},
  {type:'palette',id:'p18',name:'미드나잇 블루',mood:'차분·집중',harmony:'monochromatic',colors:['#03045E','#0077B6','#00B4D8','#90E0EF','#CAF0F8'],url:'palettes.html'},
  {type:'palette',id:'p19',name:'에메랄드 숲',mood:'자연·편안',harmony:'monochromatic',colors:['#1B4332','#2D6A4F','#52B788','#95D5B2','#D8F3DC'],url:'palettes.html'},
  {type:'palette',id:'p20',name:'불꽃 & 로즈우드',mood:'열정·따뜻함',harmony:'monochromatic',colors:['#370617','#6A040F','#D00000','#F48C06','#FFD166'],url:'palettes.html'},
  {type:'palette',id:'p21',name:'트로피컬 선셋',mood:'이국적·활기',harmony:'split',colors:['#0D3B66','#48CAE4','#F4D35E','#EE964B','#F95738'],url:'palettes.html'},
  {type:'palette',id:'p22',name:'매직아워',mood:'도시·몽환',harmony:'split',colors:['#4361EE','#4CC9F0','#F72585','#FFBE0B'],url:'palettes.html'},
  {type:'palette',id:'p23',name:'어스 & 테라코타',mood:'편안·자연',harmony:'analogous',colors:['#FFF3E2','#E8C39E','#C68B59','#A15C38','#5C3D2E'],url:'palettes.html'},
  {type:'palette',id:'p24',name:'터쿼이즈 라군',mood:'청량·시원함',harmony:'analogous',colors:['#CCFBF1','#5EEAD4','#2DD4BF','#0D9488','#115E59'],url:'palettes.html'},
  {type:'palette',id:'p25',name:'라임 그로브',mood:'싱그러움·활력',harmony:'analogous',colors:['#F7FEE7','#D9F99D','#A3E635','#65A30D','#365314'],url:'palettes.html'},
  {type:'palette',id:'p26',name:'선샤인 옐로우',mood:'밝음·경쾌',harmony:'monochromatic',colors:['#FFFBEA','#FFE066','#FFC300','#E3A008','#8C6A00'],url:'palettes.html'},
  {type:'palette',id:'p27',name:'그레이스케일',mood:'미니멀·모던',harmony:'monochromatic',colors:['#FAFAFA','#D4D4D8','#9CA3AF','#52525B','#18181B'],url:'palettes.html'},
  {type:'palette',id:'p28',name:'버건디 와인',mood:'고급·클래식',harmony:'monochromatic',colors:['#FDE8EC','#F4A6B7','#D6336C','#8B1E3F','#4A0E1F'],url:'palettes.html'},
  {type:'palette',id:'p29',name:'인디고 나이트',mood:'몽환·심연',harmony:'monochromatic',colors:['#E0E7FF','#A5B4FC','#6366F1','#4338CA','#1E1B4B'],url:'palettes.html'},
  {type:'palette',id:'p30',name:'레인보우 팝',mood:'다채로움·유쾌',harmony:'tetradic',colors:['#FF3355','#FFB627','#3DDC97','#3A86FF'],url:'palettes.html'},
  {type:'palette',id:'p31',name:'네온 시티',mood:'미래·강렬',harmony:'tetradic',colors:['#FF00E5','#00F0FF','#FFEA00','#7B2FFF'],url:'palettes.html'},
  {type:'palette',id:'p32',name:'선셋 오키드',mood:'몽환·따뜻',harmony:'split',colors:['#2B0B3F','#FF6F91','#FFB86B','#5AC8C8'],url:'palettes.html'},
  {type:'palette',id:'p33',name:'웜 언더톤 피부색',mood:'골든·피치',harmony:'skin',colors:['#FFE0BD','#F1C27D','#E0AC69','#C68642','#8D5524'],url:'palettes.html'},
  {type:'palette',id:'p34',name:'뉴트럴 언더톤 피부색',mood:'균형·자연스러움',harmony:'skin',colors:['#FFDBAC','#EDB98A','#D08B5B','#A9694F','#6B4226'],url:'palettes.html'},
  {type:'palette',id:'p35',name:'쿨 언더톤 피부색',mood:'로지·핑크',harmony:'skin',colors:['#F5D5C5','#E0AA8C','#B47B5D','#8B5A42','#4A2F23'],url:'palettes.html'},
  {type:'palette',id:'p36',name:'코발트 & 선셋 오렌지',mood:'차분·강렬',harmony:'complementary',colors:['#1D3557','#457B9D','#A8DADC','#F4A261','#E63946'],url:'palettes.html'},
  {type:'palette',id:'p37',name:'포레스트 & 버건디',mood:'고급·클래식',harmony:'complementary',colors:['#1B4332','#40916C','#95D5B2','#9D0208','#6A040F'],url:'palettes.html'},
  {type:'palette',id:'p38',name:'시트러스 그로브',mood:'상큼·활기',harmony:'analogous',colors:['#D9ED92','#B5E48C','#99D98C','#52B69A','#168AAD'],url:'palettes.html'},
  {type:'palette',id:'p39',name:'가을 단풍',mood:'따뜻·차분',harmony:'analogous',colors:['#FFBA08','#FAA307','#F48C06','#E85D04','#DC2F02'],url:'palettes.html'},
  {type:'palette',id:'p40',name:'미드나잇 오로라',mood:'신비·차가움',harmony:'analogous',colors:['#10002B','#240046','#3C096C','#5A189A','#7B2CBF'],url:'palettes.html'},
  {type:'palette',id:'p41',name:'레트로 아케이드',mood:'복고·팝',harmony:'triadic',colors:['#EF476F','#FFD166','#06D6A0'],url:'palettes.html'},
  {type:'palette',id:'p42',name:'베이비 트리오',mood:'사랑스러움·파스텔',harmony:'triadic',colors:['#A0C4FF','#FFADAD','#FFD6A5'],url:'palettes.html'},
  {type:'palette',id:'p43',name:'코랄 모노톤',mood:'따뜻·부드러움',harmony:'monochromatic',colors:['#FFF0EB','#FFCCBC','#FF8A65','#E64A19','#8C2F0C'],url:'palettes.html'},
  {type:'palette',id:'p44',name:'세이지 그린',mood:'차분·자연',harmony:'monochromatic',colors:['#F1F5F0','#D3E0D3','#A9C1A6','#6E8B6E','#3E5641'],url:'palettes.html'},
  {type:'palette',id:'p45',name:'슬레이트 그레이',mood:'모던·시크',harmony:'monochromatic',colors:['#F8F9FA','#CED4DA','#868E96','#495057','#212529'],url:'palettes.html'},
  {type:'palette',id:'p46',name:'노르딕 앰버',mood:'차분·대비',harmony:'split',colors:['#1B263B','#415A77','#778DA9','#E0A458','#BF7B39'],url:'palettes.html'},
  {type:'palette',id:'p47',name:'딸기 민트',mood:'발랄·상큼',harmony:'split',colors:['#FF477E','#FF7096','#7BDFF2','#B2F7EF'],url:'palettes.html'},
  {type:'palette',id:'p48',name:'카니발',mood:'축제·다채로움',harmony:'tetradic',colors:['#F94144','#F3722C','#90BE6D','#277DA1'],url:'palettes.html'},
  {type:'palette',id:'p49',name:'올리브 언더톤 피부색',mood:'그린·차분함',harmony:'skin',colors:['#F3D9C4','#E0BB94','#C9986A','#A16D47','#6B4423'],url:'palettes.html'},
  {type:'palette',id:'p50',name:'포슬린 라이트 스킨톤',mood:'맑음·투명함',harmony:'skin',colors:['#FFF1E6','#FDE0CE','#F8C9A3','#E8A87C','#C97C5D'],url:'palettes.html'},
  {type:'palette',id:'p51',name:'크림슨 & 에메랄드',mood:'강렬·클래식',harmony:'complementary',colors:['#8B0000','#B22222','#DC143C','#2E8B57','#006400'],url:'palettes.html'},
  {type:'palette',id:'p52',name:'탠저린 & 사파이어',mood:'활기·시원함',harmony:'complementary',colors:['#FFA500','#FF8C00','#FFD580','#0F52BA','#082567'],url:'palettes.html'},
  {type:'palette',id:'p53',name:'라일락 & 올리브',mood:'부드러움·자연',harmony:'complementary',colors:['#C8A2C8','#E6C9E6','#9BB84C','#6B8E23','#556B2F'],url:'palettes.html'},
  {type:'palette',id:'p54',name:'살몬 & 틸',mood:'따뜻·청량',harmony:'complementary',colors:['#FA8072','#FFA07A','#008080','#00A19D','#004D4D'],url:'palettes.html'},
  {type:'palette',id:'p55',name:'체리 & 스프루스',mood:'열정·안정',harmony:'complementary',colors:['#D2042D','#8B0000','#2F4F4F','#0B6E4F','#013220'],url:'palettes.html'},
  {type:'palette',id:'p56',name:'앰버 & 코발트 나이트',mood:'대비·모던',harmony:'complementary',colors:['#FFBF00','#FF8F00','#003153','#1E3A5F','#0A1A2F'],url:'palettes.html'},
  {type:'palette',id:'p57',name:'코랄 리프 & 딥틸',mood:'이국적·바다',harmony:'complementary',colors:['#FF7F50','#FF6F61','#40E0D0','#008080','#013A63'],url:'palettes.html'},
  {type:'palette',id:'p58',name:'플럼 & 골든로드',mood:'고급·화사',harmony:'complementary',colors:['#673147','#8E4585','#DAA520','#FFD700','#4A1E2B'],url:'palettes.html'},
  {type:'palette',id:'p59',name:'선라이즈 피치',mood:'상쾌·희망',harmony:'analogous',colors:['#FFF3B0','#FFDDAB','#FFB199','#FF8C69','#FF6F59'],url:'palettes.html'},
  {type:'palette',id:'p60',name:'로얄 인디고 드림',mood:'신비·고요',harmony:'analogous',colors:['#03071E','#03045E','#023E8A','#0077B6','#0096C7'],url:'palettes.html'},
  {type:'palette',id:'p61',name:'포레스트 모스',mood:'자연·차분',harmony:'analogous',colors:['#2D4739','#3E5C43','#5C8A5C','#8FBC8F','#C4E4B4'],url:'palettes.html'},
  {type:'palette',id:'p62',name:'딥 버건디 로즈',mood:'우아·로맨틱',harmony:'analogous',colors:['#4A0E1F','#800E27','#B01E3C','#D63A5A','#F17C9A'],url:'palettes.html'},
  {type:'palette',id:'p63',name:'골드러시',mood:'풍요·따뜻',harmony:'analogous',colors:['#7C4A03','#A9661F','#D68B3D','#F0AC5C','#FFCB77'],url:'palettes.html'},
  {type:'palette',id:'p64',name:'스카이 라군',mood:'맑음·평온',harmony:'analogous',colors:['#CDEDF6','#9AD4E8','#68B9DA','#3A9BC1','#1F6E8C'],url:'palettes.html'},
  {type:'palette',id:'p65',name:'크랜베리 선셋',mood:'강렬·달콤',harmony:'analogous',colors:['#4E0F1F','#7A1230','#B31942','#E63950','#FF7A6E'],url:'palettes.html'},
  {type:'palette',id:'p66',name:'라벤더 필드',mood:'평화·몽환',harmony:'analogous',colors:['#E6E0F8','#CBB8E8','#B79CD6','#9370DB','#6A4C93'],url:'palettes.html'},
  {type:'palette',id:'p67',name:'올리브 그로브',mood:'소박·평온',harmony:'analogous',colors:['#3D3B1F','#6B6023','#9C8F3B','#C2B857','#E4DD8F'],url:'palettes.html'},
  {type:'palette',id:'p68',name:'코스모스 핑크',mood:'사랑스러움·경쾌',harmony:'analogous',colors:['#FFD6E8','#FFB3D9','#FF8FC0','#FF5FA2','#E63E8C'],url:'palettes.html'},
  {type:'palette',id:'p69',name:'미드나잇 틸',mood:'심연·차분',harmony:'analogous',colors:['#031F1C','#053B34','#0A5C4E','#0F826B','#23A88A'],url:'palettes.html'},
  {type:'palette',id:'p70',name:'서커스 트리오',mood:'유쾌·에너지',harmony:'triadic',colors:['#FF4136','#FFDC00','#0074D9'],url:'palettes.html'},
  {type:'palette',id:'p71',name:'젤라또 트리오',mood:'달콤·경쾌',harmony:'triadic',colors:['#FFD3E0','#D3F8E2','#D3E0FF'],url:'palettes.html'},
  {type:'palette',id:'p72',name:'열대과일 트리오',mood:'상큼·비비드',harmony:'triadic',colors:['#FF6F61','#FFD166','#06D6A0'],url:'palettes.html'},
  {type:'palette',id:'p73',name:'미니멀 삼원색',mood:'균형·모던',harmony:'triadic',colors:['#E63946','#457B9D','#F4A261'],url:'palettes.html'},
  {type:'palette',id:'p74',name:'문라이트 트리오',mood:'신비·차분',harmony:'triadic',colors:['#2B2D42','#8D99AE','#EF233C'],url:'palettes.html'},
  {type:'palette',id:'p75',name:'어스톤 트리오',mood:'자연·따뜻',harmony:'triadic',colors:['#BC6C25','#606C38','#283618'],url:'palettes.html'},
  {type:'palette',id:'p76',name:'캔디 팝 트리오',mood:'발랄·팝',harmony:'triadic',colors:['#FF3CAC','#784BA0','#2B86C5'],url:'palettes.html'},
  {type:'palette',id:'p77',name:'미드나잇 네이비',mood:'깊이·차분',harmony:'monochromatic',colors:['#020818','#0B1D3A','#1B3A6B','#3C6BA5','#89AEDD'],url:'palettes.html'},
  {type:'palette',id:'p78',name:'로즈쿼츠',mood:'부드러움·여성스러움',harmony:'monochromatic',colors:['#4A1526','#7A2942','#B4486B','#E08BA6','#F7D6E0'],url:'palettes.html'},
  {type:'palette',id:'p79',name:'올리브 그레이딩',mood:'차분·자연',harmony:'monochromatic',colors:['#2A2E1F','#4B5230','#6E7A45','#9DAB6E','#D0D9A8'],url:'palettes.html'},
  {type:'palette',id:'p80',name:'앰버 글로우',mood:'따뜻·풍부',harmony:'monochromatic',colors:['#3D2402','#6B3E0A','#A85F1B','#E1913E','#FFCC80'],url:'palettes.html'},
  {type:'palette',id:'p81',name:'아이시 블루',mood:'청량·시원함',harmony:'monochromatic',colors:['#F0FAFF','#CDEEFB','#9AD9F0','#5EB8DE','#2A87B8'],url:'palettes.html'},
  {type:'palette',id:'p82',name:'초콜릿 브라운',mood:'안정·클래식',harmony:'monochromatic',colors:['#2B1A12','#4A2C1D','#6F4527','#9C6B3E','#C99A6B'],url:'palettes.html'},
  {type:'palette',id:'p83',name:'라즈베리 셰이드',mood:'열정·강렬',harmony:'monochromatic',colors:['#3B0A1E','#6B1435','#A31F52','#D93670','#F27CA0'],url:'palettes.html'},
  {type:'palette',id:'p84',name:'미스티 라벤더',mood:'몽환·부드러움',harmony:'monochromatic',colors:['#2E1A47','#4E2E73','#7B57A6','#A98BD0','#D8C7EE'],url:'palettes.html'},
  {type:'palette',id:'p85',name:'스틸 그레이',mood:'모던·시크',harmony:'monochromatic',colors:['#1C1F26','#33383F','#585F68','#8B939C','#C7CDD3'],url:'palettes.html'},
  {type:'palette',id:'p86',name:'파인 그린',mood:'안정·자연',harmony:'monochromatic',colors:['#0B2E1F','#144B34','#1F6E4E','#4E9E76','#A4D4B8'],url:'palettes.html'},
  {type:'palette',id:'p87',name:'선셋 코랄 톤',mood:'따뜻·부드러움',harmony:'monochromatic',colors:['#4A150E','#8A2A1B','#C9502F','#EF8862','#FCC1A1'],url:'palettes.html'},
  {type:'palette',id:'p88',name:'트윌라잇 코랄',mood:'몽환·따뜻',harmony:'split',colors:['#1B1F3B','#3B4B8C','#E07A5F','#F2CC8F'],url:'palettes.html'},
  {type:'palette',id:'p89',name:'자몽 라임',mood:'상큼·발랄',harmony:'split',colors:['#FF5C6C','#FF9770','#B5E655','#70C1B3'],url:'palettes.html'},
  {type:'palette',id:'p90',name:'인디고 앰버 글로우',mood:'대비·따뜻',harmony:'split',colors:['#1D2951','#3D5A99','#F2A65A','#FFD08A'],url:'palettes.html'},
  {type:'palette',id:'p91',name:'퍼플 민트 선셋',mood:'몽환·상쾌',harmony:'split',colors:['#5B2A86','#8E5FBF','#F7B267','#5FD4C4'],url:'palettes.html'},
  {type:'palette',id:'p92',name:'로즈 세이지',mood:'부드러움·자연',harmony:'split',colors:['#B85C7C','#E8A0BF','#87A96B','#C8D5B9'],url:'palettes.html'},
  {type:'palette',id:'p93',name:'아케이드 스퀘어',mood:'레트로·에너지',harmony:'tetradic',colors:['#FF6B6B','#FFD93D','#6BCB77','#4D96FF'],url:'palettes.html'},
  {type:'palette',id:'p94',name:'서커디안 팔레트',mood:'하루·리듬',harmony:'tetradic',colors:['#F94144','#F9C74F','#90BE6D','#577590'],url:'palettes.html'},
  {type:'palette',id:'p95',name:'팝 스펙트럼',mood:'다채·활기',harmony:'tetradic',colors:['#EF476F','#FFD166','#06D6A0','#118AB2'],url:'palettes.html'},
  {type:'palette',id:'p96',name:'딥 리치 스킨톤',mood:'딥·풍부',harmony:'skin',colors:['#3D2314','#5C3A21','#7D4F2C','#9C6B3E','#BC8A5F'],url:'palettes.html'},
  {type:'palette',id:'p97',name:'골든 미디엄 스킨톤',mood:'골든·자연',harmony:'skin',colors:['#F5D5A8','#E8B978','#D49A5A','#B87A42','#8F5C2E'],url:'palettes.html'},
  {type:'palette',id:'p98',name:'핑크 라이트 언더톤',mood:'로지·연함',harmony:'skin',colors:['#FCE4E1','#F7C9C4','#EFA9A3','#E08883','#C96560'],url:'palettes.html'},
  {type:'palette',id:'p99',name:'브론즈 탠 스킨',mood:'브론즈·따뜻',harmony:'skin',colors:['#8A5A32','#A9713F','#C68A4E','#DBA968','#EAC48A'],url:'palettes.html'},
  {type:'palette',id:'p100',name:'소프트 아이보리 스킨',mood:'아이보리·투명',harmony:'skin',colors:['#FFF6EC','#FCE8D4','#F5D3AE','#E9B98A','#D69C6C'],url:'palettes.html'},
  {type:'palette',id:'p101',name:'루비 & 라군',mood:'생동·경쾌',harmony:'complementary',colors:['#572823','#A12B44','#5DEAC0','#5AF2E6','#53D2E4'],url:'palettes.html'},
  {type:'palette',id:'p102',name:'클로버 & 피오니',mood:'산뜻·시원함',harmony:'complementary',colors:['#235737','#2BA134','#E95DEA','#F25AD1','#E453A8'],url:'palettes.html'},
  {type:'palette',id:'p103',name:'아메시스트 & 레몬',mood:'몽환·감성',harmony:'complementary',colors:['#462357','#562BA1','#C1EA5D','#A5F25A','#7EE453'],url:'palettes.html'},
  {type:'palette',id:'p104',name:'사프란 & 인디고',mood:'생동·열정',harmony:'complementary',colors:['#575523','#A1792B','#5D95EA','#5A75F2','#5653E4'],url:'palettes.html'},
  {type:'palette',id:'p105',name:'아주르 & 러스트',mood:'차분·청량',harmony:'complementary',colors:['#234A57','#2BA19B','#EA5D71','#F2645A','#E47A53'],url:'palettes.html'},
  {type:'palette',id:'p106',name:'피오니 & 클로버',mood:'열정·생동',harmony:'complementary',colors:['#57233B','#A12B84','#5DEA75','#5AF295','#53E4A9'],url:'palettes.html'},
  {type:'palette',id:'p107',name:'제이드 & 오키드',mood:'고요·산뜻',harmony:'complementary',colors:['#2C5723','#62A12B','#985DEA','#BB5AF2','#CD53E4'],url:'palettes.html'},
  {type:'palette',id:'p108',name:'사파이어 & 허니',mood:'몽환·감성',harmony:'complementary',colors:['#2A2357','#2B3FA1','#EABA5D','#F2E05A','#D8E453'],url:'palettes.html'},
  {type:'palette',id:'p109',name:'탠저린 & 데님',mood:'발랄·강렬',harmony:'complementary',colors:['#573923','#A1392B','#5DEAE5','#5AD6F2','#53ADE4'],url:'palettes.html'},
  {type:'palette',id:'p110',name:'파인 & 베리',mood:'차분·청량',harmony:'complementary',colors:['#235748','#2BA15B','#EA5DBA','#F25A9D','#E45376'],url:'palettes.html'},
  {type:'palette',id:'p111',name:'모브 & 펀',mood:'몽환·감성',harmony:'complementary',colors:['#572357','#7E2BA1','#A0EA5D','#81F25A','#5BE453'],url:'palettes.html'},
  {type:'palette',id:'p112',name:'시트러스 & 바이올렛',mood:'열정·생동',harmony:'complementary',colors:['#485723','#A1A02B','#5D71EA','#655AF2','#7B53E4'],url:'palettes.html'},
  {type:'palette',id:'p113',name:'데님 & 코퍼',mood:'노스탤직·몽환',harmony:'complementary',colors:['#233957','#2B7FA1','#EA6F5D','#F28F5A','#E4A353'],url:'palettes.html'},
  {type:'palette',id:'p114',name:'스칼렛 & 틸',mood:'강렬·열정',harmony:'complementary',colors:['#57232A','#A12B5D','#5DEAA2','#5AF2C5','#53E4D7'],url:'palettes.html'},
  {type:'palette',id:'p115',name:'제이드 & 마젠타',mood:'고요·청량',harmony:'complementary',colors:['#23572C','#3AA12B','#C05DEA','#E55AF2','#E453D3'],url:'palettes.html'},
  {type:'palette',id:'p116',name:'바이올렛 & 시트러스',mood:'몽환·신비',harmony:'complementary',colors:['#3B2357','#3E2BA1','#DDEA5D','#C3F25A','#9AE453'],url:'palettes.html'},
  {type:'palette',id:'p117',name:'머스타드 & 스파크',mood:'강렬·열정',harmony:'analogous',colors:['#F8EADD','#EECD8B','#E9CB35','#B2B30F','#4E5B15'],url:'palettes.html'},
  {type:'palette',id:'p118',name:'터쿼이즈 & 미스트',mood:'산뜻·청량',harmony:'analogous',colors:['#E2F3F2','#9ADEE0','#4EC0D0','#24839E','#22414F'],url:'palettes.html'},
  {type:'palette',id:'p119',name:'퓨셔 & 베이',mood:'신비·몽환',harmony:'analogous',colors:['#F3E2F2','#E09ACF','#D04E9A','#9E2456','#4F222C'],url:'palettes.html'},
  {type:'palette',id:'p120',name:'시트러스 & 클라우드',mood:'편안·안정',harmony:'analogous',colors:['#EBEFE6','#B9D3A7','#7DB964','#448B37','#2D432D'],url:'palettes.html'},
  {type:'palette',id:'p121',name:'네이비 & 블룸',mood:'노스탤직·감성',harmony:'analogous',colors:['#DDE4F8','#8B98EE','#3535E9','#250FB3','#28155B'],url:'palettes.html'},
  {type:'palette',id:'p122',name:'코랄 & 타이드',mood:'경쾌·생동',harmony:'analogous',colors:['#F8DEDD','#EE9B8B','#E96A35','#B3550F','#5B3C15'],url:'palettes.html'},
  {type:'palette',id:'p123',name:'클로버 & 호라이즌',mood:'편안·소박',harmony:'analogous',colors:['#E6EFE8','#A7D3B9','#64B996','#378B76','#2D4342'],url:'palettes.html'},
  {type:'palette',id:'p124',name:'모브 & 블룸',mood:'편안·자연',harmony:'analogous',colors:['#ECE6EF','#C7A7D3','#AF64B9','#8B378A','#432D40'],url:'palettes.html'},
  {type:'palette',id:'p125',name:'머스타드 & 블룸',mood:'안정·자연',harmony:'analogous',colors:['#EFEFE6','#CFD3A7','#ABB964','#758B37','#3B432D'],url:'palettes.html'},
  {type:'palette',id:'p126',name:'코발트 & 더스크',mood:'신비·몽환',harmony:'analogous',colors:['#E2F0F3','#9AC9E0','#4E94D0','#24569E','#222E4F'],url:'palettes.html'},
  {type:'palette',id:'p127',name:'가넷 & 블룸',mood:'자연·안정',harmony:'analogous',colors:['#EFE6EB','#D3A7B9','#B96479','#8B373E','#432F2D'],url:'palettes.html'},
  {type:'palette',id:'p128',name:'에메랄드 & 베이',mood:'안정·편안',harmony:'analogous',colors:['#E7EFE6','#A9D3A7','#64B968','#378B43','#2D4332'],url:'palettes.html'},
  {type:'palette',id:'p129',name:'그레이프 & 가든',mood:'신비·노스탤직',harmony:'analogous',colors:['#E2E2F3','#A59AE0','#794ED0','#62249E','#40224F'],url:'palettes.html'},
  {type:'palette',id:'p130',name:'테라코타 & 리프',mood:'생동·경쾌',harmony:'analogous',colors:['#F3EAE2','#E0BF9A','#D09F4E','#9E7C24','#4F4622'],url:'palettes.html'},
  {type:'palette',id:'p131',name:'틸 & 그로브',mood:'소박·편안',harmony:'analogous',colors:['#E6EFED','#A7D3CB','#64B9B2','#378A8B','#2D4143'],url:'palettes.html'},
  {type:'palette',id:'p132',name:'모브 & 호라이즌',mood:'몽환·노스탤직',harmony:'analogous',colors:['#F8DDF7','#EE8BE3','#E935C3','#B30F81','#5B153F'],url:'palettes.html'},
  {type:'palette',id:'p133',name:'라임 & 블룸',mood:'시원함·차분',harmony:'analogous',colors:['#F2F8DD','#CAEE8B','#8EE935','#4BB30F','#255B15'],url:'palettes.html'},
  {type:'palette',id:'p134',name:'사파이어 & 드리프트',mood:'감성·몽환',harmony:'analogous',colors:['#DDECF8','#8BB1EE','#355AE9','#0F14B3','#1F155B'],url:'palettes.html'},
  {type:'palette',id:'p135',name:'가넷 & 캐년',mood:'안정·편안',harmony:'analogous',colors:['#EFE6E7','#D3A7A7','#B96B64','#8B4637','#43332D'],url:'palettes.html'},
  {type:'palette',id:'p136',name:'모스 & 드리프트',mood:'시원함·차분',harmony:'analogous',colors:['#E2F3E2','#9AE0A8','#4ED07F','#249E67','#224F42'],url:'palettes.html'},
  {type:'palette',id:'p137',name:'아이리스 & 밸리',mood:'편안·자연',harmony:'analogous',colors:['#E9E6EF','#BDA7D3','#9D64B9','#7D378B','#432D43'],url:'palettes.html'},
  {type:'palette',id:'p138',name:'애프리콧 & 블룸',mood:'발랄·열정',harmony:'analogous',colors:['#F8F0DD','#EEDD8B','#E9E235','#A4B30F','#4B5B15'],url:'palettes.html'},
  {type:'palette',id:'p139',name:'라임 & 데님',mood:'강렬함·비비드',harmony:'triadic',colors:['#7DE830','#4C8CE6','#B1255F','#DFE8D9'],url:'palettes.html'},
  {type:'palette',id:'p140',name:'트와일라잇 & 스칼렛',mood:'활기·역동',harmony:'triadic',colors:['#3047E8','#E64C60','#37B125','#D9DBE8'],url:'palettes.html'},
  {type:'palette',id:'p141',name:'루비 & 바질',mood:'비비드·역동',harmony:'triadic',colors:['#E84F30','#4CE666','#3D25B1','#E8DBD9'],url:'palettes.html'},
  {type:'palette',id:'p142',name:'클로버 & 바이올렛',mood:'강렬함·역동',harmony:'triadic',colors:['#30E885','#934CE6','#B16525','#D9E8E0'],url:'palettes.html'},
  {type:'palette',id:'p143',name:'오키드 & 허니',mood:'비비드·역동',harmony:'triadic',colors:['#BA30E8','#E6BF4C','#25B18E','#E4D9E8'],url:'palettes.html'},
  {type:'palette',id:'p144',name:'허니 & 글레이셔',mood:'비비드·활기',harmony:'triadic',colors:['#E0E830','#4CDFE6','#B125AB','#E7E8D9'],url:'palettes.html'},
  {type:'palette',id:'p145',name:'아주르 & 피오니',mood:'비비드·강렬함',harmony:'triadic',colors:['#30ABE8','#E64CB2','#82B125','#D9E3E8'],url:'palettes.html'},
  {type:'palette',id:'p146',name:'블러시 & 라임',mood:'비비드·역동',harmony:'triadic',colors:['#E83075','#86E64C','#255AB1','#E8D9DE'],url:'palettes.html'},
  {type:'palette',id:'p147',name:'제이드 & 인디고',mood:'강렬함·역동',harmony:'triadic',colors:['#40E830','#4C59E6','#B12531','#DAE8D9'],url:'palettes.html'},
  {type:'palette',id:'p148',name:'트와일라잇 & 크림슨',mood:'역동·활기',harmony:'triadic',colors:['#5730E8','#E66D4C','#25B143','#DCD9E8'],url:'palettes.html'},
  {type:'palette',id:'p149',name:'탠저린 & 파인',mood:'역동·비비드',harmony:'triadic',colors:['#E88C30','#4CE699','#6B25B1','#E8E0D9'],url:'palettes.html'},
  {type:'palette',id:'p150',name:'글레이셔 & 마젠타',mood:'역동·비비드',harmony:'triadic',colors:['#30E8C2','#C64CE6','#B19425','#D9E8E5'],url:'palettes.html'},
  {type:'palette',id:'p151',name:'모브 & 허니',mood:'강렬함·역동',harmony:'triadic',colors:['#E830D8','#D9E64C','#25A5B1','#E8D9E7'],url:'palettes.html'},
  {type:'palette',id:'p152',name:'샤르트뢰즈 & 오션',mood:'활기·역동',harmony:'triadic',colors:['#A3E830','#4CACE6','#B1257C','#E2E8D9'],url:'palettes.html'},
  {type:'palette',id:'p153',name:'파인 & 호라이즌',mood:'청량·차분',harmony:'monochromatic',colors:['#E8FCEE','#9BF3BA','#40E778','#149F44','#08401B'],url:'palettes.html'},
  {type:'palette',id:'p154',name:'바이올렛 & 밸리',mood:'감성·신비',harmony:'monochromatic',colors:['#F3ECF8','#CDACE2','#9D60C7','#652E84','#271335'],url:'palettes.html'},
  {type:'palette',id:'p155',name:'애프리콧 & 스톰',mood:'생동·강렬',harmony:'monochromatic',colors:['#F8F7EC','#E2DDAC','#C7BF60','#847E2E','#353313'],url:'palettes.html'},
  {type:'palette',id:'p156',name:'차콜 & 헤이즈',mood:'세련·모던',harmony:'monochromatic',colors:['#F2F2F2','#C7C7C7','#949494','#595959','#242424'],url:'palettes.html'},
  {type:'palette',id:'p157',name:'블러시 & 웨이브',mood:'강렬·생동',harmony:'monochromatic',colors:['#FCE8F2','#F39BC7','#E74098','#9F1459','#400825'],url:'palettes.html'},
  {type:'palette',id:'p158',name:'펀 & 메도우',mood:'시원함·산뜻',harmony:'monochromatic',colors:['#EDFCE8','#ABF39B','#63E740','#309F14','#134008'],url:'palettes.html'},
  {type:'palette',id:'p159',name:'사파이어 & 하버',mood:'노스탤직·신비',harmony:'monochromatic',colors:['#EAE8FC','#A19BF3','#5140E7','#24149F','#0C0840'],url:'palettes.html'},
  {type:'palette',id:'p160',name:'테라코타 & 더스크',mood:'미니멀·세련',harmony:'monochromatic',colors:['#F5F2F0','#D1C5BD','#A78E81','#695549','#2A221D'],url:'palettes.html'},
  {type:'palette',id:'p161',name:'클로버 & 리프',mood:'고요·시원함',harmony:'monochromatic',colors:['#ECF8F4','#ACE2CF','#60C7A2','#2E846A','#13352A'],url:'palettes.html'},
  {type:'palette',id:'p162',name:'마젠타 & 리프',mood:'미니멀·세련',harmony:'monochromatic',colors:['#F4F0F5','#D1BDD1','#A481A7','#684969','#2A1D2A'],url:'palettes.html'},
  {type:'palette',id:'p163',name:'시트러스 & 밸리',mood:'발랄·경쾌',harmony:'monochromatic',colors:['#F5F8EC','#D4E2AC','#ADC760','#71842E','#2D3513'],url:'palettes.html'},
  {type:'palette',id:'p164',name:'오션 & 스파크',mood:'감성·노스탤직',harmony:'monochromatic',colors:['#E8F2FC','#9BC4F3','#408AE7','#14569F','#082240'],url:'palettes.html'},
  {type:'palette',id:'p165',name:'루비 & 스파크',mood:'모던·깔끔',harmony:'monochromatic',colors:['#F5F0F1','#D1BDC0','#A78188','#69494F','#2A1D20'],url:'palettes.html'},
  {type:'palette',id:'p166',name:'에메랄드 & 프레리',mood:'모던·깔끔',harmony:'monochromatic',colors:['#F0F5F1','#BDD1BF','#81A786','#49694D','#1D2A1F'],url:'palettes.html'},
  {type:'palette',id:'p167',name:'아이리스 & 메도우',mood:'몽환·감성',harmony:'monochromatic',colors:['#F1ECF8','#C3ACE2','#8C60C7','#502E84','#211335'],url:'palettes.html'},
  {type:'palette',id:'p168',name:'러스트 & 오처드',mood:'경쾌·생동',harmony:'monochromatic',colors:['#F8F5EC','#E2D2AC','#C7AA60','#846A2E','#352C13'],url:'palettes.html'},
  {type:'palette',id:'p169',name:'글레이셔 & 엠버',mood:'청량·시원함',harmony:'monochromatic',colors:['#E8FCFC','#9BF3F1','#40E7E6','#149F9E','#083E40'],url:'palettes.html'},
  {type:'palette',id:'p170',name:'블러시 & 플레임',mood:'노스탤직·감성',harmony:'monochromatic',colors:['#F8ECF5','#E2ACD1','#C760AA','#842E69','#35132B'],url:'palettes.html'},
  {type:'palette',id:'p171',name:'샤르트뢰즈 & 더스크',mood:'시원함·차분',harmony:'monochromatic',colors:['#F0FCE8','#BEF39B','#81E740','#509F14','#204008'],url:'palettes.html'},
  {type:'palette',id:'p172',name:'인디고 & 밸리',mood:'세련·모던',harmony:'monochromatic',colors:['#F0F0F5','#BDC0D1','#8185A7','#494E69','#1D1F2A'],url:'palettes.html'},
  {type:'palette',id:'p173',name:'루비 & 프레리',mood:'발랄·생동',harmony:'monochromatic',colors:['#FCEBE8','#F3A79B','#E75940','#9F2E14','#401308'],url:'palettes.html'},
  {type:'palette',id:'p174',name:'모스 & 밸리',mood:'세련·미니멀',harmony:'monochromatic',colors:['#F0F5F2','#BDD1C6','#81A793','#496958','#1D2A23'],url:'palettes.html'},
  {type:'palette',id:'p175',name:'터쿼이즈 & 스칼렛',mood:'노스탤직·감성',harmony:'split',colors:['#1D99A5','#E44487','#D89231','#AEC3E0'],url:'palettes.html'},
  {type:'palette',id:'p176',name:'피오니 & 모스',mood:'신비·노스탤직',harmony:'split',colors:['#A51D72','#58E444','#31D8C3','#E0AEB4'],url:'palettes.html'},
  {type:'palette',id:'p177',name:'레몬 & 아이리스',mood:'감성·몽환',harmony:'split',colors:['#4AA51D','#5E44E4','#D831BC','#AEE0B6'],url:'palettes.html'},
  {type:'palette',id:'p178',name:'사파이어 & 사프란',mood:'몽환·신비',harmony:'split',colors:['#1D23A5','#E48D44','#8BD831','#C5AEE0'],url:'palettes.html'},
  {type:'palette',id:'p179',name:'코랄 & 스카이',mood:'노스탤직·몽환',harmony:'split',colors:['#A53F1D','#44E4BC','#315BD8','#E0D4AE'],url:'palettes.html'},
  {type:'palette',id:'p180',name:'모스 & 블러시',mood:'몽환·신비',harmony:'split',colors:['#1DA567','#E444DD','#D83831','#AEDEE0'],url:'palettes.html'},
  {type:'palette',id:'p181',name:'오키드 & 제이드',mood:'신비·감성',harmony:'split',colors:['#8E1DA5','#AFE444','#31D869','#E0AECF'],url:'palettes.html'},
  {type:'palette',id:'p182',name:'머스타드 & 네이비',mood:'몽환·신비',harmony:'split',colors:['#94A51D','#4480E4','#9A31D8','#C1E0AE'],url:'palettes.html'},
  {type:'palette',id:'p183',name:'스카이 & 코퍼',mood:'노스탤직·감성',harmony:'split',colors:['#1D6CA5','#E44451','#D8CA31','#AEB2E0'],url:'palettes.html'},
  {type:'palette',id:'p184',name:'베리 & 클로버',mood:'노스탤직·신비',harmony:'split',colors:['#A51D44','#44E465','#31B5D8','#E0B8AE'],url:'palettes.html'},
  {type:'palette',id:'p185',name:'네이비 & 메리골드',mood:'역동·활기',harmony:'tetradic',colors:['#193CE6','#E458B5','#C9AC1D','#76E59B'],url:'palettes.html'},
  {type:'palette',id:'p186',name:'가넷 & 아쿠아',mood:'비비드·활기',harmony:'tetradic',colors:['#E63319','#8DE458','#1DB3C9','#BB76E5'],url:'palettes.html'},
  {type:'palette',id:'p187',name:'민트 & 베리',mood:'비비드·역동',harmony:'tetradic',colors:['#19E66F','#5864E4','#C91D81','#E5DC76'],url:'palettes.html'},
  {type:'palette',id:'p188',name:'바이올렛 & 샤르트뢰즈',mood:'비비드·역동',harmony:'tetradic',colors:['#AA19E6','#E47558','#4FC91D','#76CEE5'],url:'palettes.html'},
  {type:'palette',id:'p189',name:'메리골드 & 사파이어',mood:'강렬함·역동',harmony:'tetradic',colors:['#E5E619','#58E49E','#1D1DC9','#E576AD'],url:'palettes.html'},
  {type:'palette',id:'p190',name:'코발트 & 코랄',mood:'활기·비비드',harmony:'tetradic',colors:['#19AAE6','#C758E4','#C94F1D','#8DE576'],url:'palettes.html'},
  {type:'palette',id:'p191',name:'크림슨 & 글로우',mood:'부드러움·경쾌',harmony:'skin',colors:['#F5F0EF','#E4CDC8','#D0998B','#B95C46','#723E31'],url:'palettes.html'},
  {type:'palette',id:'p192',name:'앰버 & 베이',mood:'부드러움·산뜻함',harmony:'skin',colors:['#F5F0EF','#E4D0C8','#D09F8B','#B96646','#724031'],url:'palettes.html'},
  {type:'palette',id:'p193',name:'코퍼 & 베이',mood:'부드러움·온화',harmony:'skin',colors:['#F5F2EF','#E4D4C8','#D0AB8B','#B98046','#725031'],url:'palettes.html'},
  {type:'palette',id:'p194',name:'탠저린 & 메도우',mood:'산뜻함·온화',harmony:'skin',colors:['#F5F3EF','#E4DAC8','#D0B18B','#B98E46','#725531'],url:'palettes.html'},
  {type:'palette',id:'p195',name:'코랄 & 글로우',mood:'산뜻함·온화',harmony:'skin',colors:['#F5F2EF','#E4D5C8','#D0AA8B','#B97346','#724E31'],url:'palettes.html'},
  {type:'palette',id:'p196',name:'체리 & 코스트',mood:'부드러움·산뜻함',harmony:'skin',colors:['#F5F1EF','#E4CFC8','#D0998B','#B95A46','#723C31'],url:'palettes.html'},
  {type:'palette',id:'p197',name:'테라코타 & 메도우',mood:'부드러움·경쾌',harmony:'skin',colors:['#F5F2EF','#E4D6C8','#D0AE8B','#B97E46','#725031'],url:'palettes.html'},
  {type:'palette',id:'p198',name:'가넷 & 타이드',mood:'산뜻함·온화',harmony:'skin',colors:['#F5F0EF','#E4CEC8','#D09C8B','#B96546','#724231'],url:'palettes.html'},
  {type:'palette',id:'p199',name:'테라코타 & 밸리',mood:'온화·부드러움',harmony:'skin',colors:['#F5F2EF','#E4D6C8','#D0AA8B','#B97446','#725131'],url:'palettes.html'},
  {type:'palette',id:'p200',name:'탠저린 & 헤이즈',mood:'온화·부드러움',harmony:'skin',colors:['#F5F3EF','#E4DCC8','#D0BB8B','#B99846','#725E31'],url:'palettes.html'},
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

// ── COLOR BASKET (add colors to a running list without leaving the page) ──
const BASKET_KEY = 'colorBasket';
const BASKET_MAX = 30;

function getBasket() {
  try { return JSON.parse(localStorage.getItem(BASKET_KEY)) || []; }
  catch { return []; }
}
function setBasket(arr) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(arr));
  renderBasketFab();
}
function addToBasket(hex) {
  hex = hex.toUpperCase();
  const basket = getBasket();
  if (basket.includes(hex)) { showBasketToast(`${hex} 이미 담겨 있어요`); return; }
  if (basket.length >= BASKET_MAX) { showBasketToast(`최대 ${BASKET_MAX}개까지 담을 수 있어요`); return; }
  basket.push(hex);
  setBasket(basket);
  showBasketToast(`${hex} 담았어요 ✓`);
  renderBasketPanel();
}
function removeFromBasket(hex) {
  setBasket(getBasket().filter(h => h !== hex));
  renderBasketPanel();
}
function clearBasket() {
  setBasket([]);
  renderBasketPanel();
}

function renderBasketFab() {
  const countEl = document.getElementById('basketFabCount');
  if (!countEl) return;
  const n = getBasket().length;
  countEl.textContent = n;
  countEl.classList.toggle('hidden', n === 0);
  countEl.classList.remove('pulse');
  void countEl.offsetWidth;
  countEl.classList.add('pulse');
}

function renderBasketPanel() {
  const body = document.getElementById('basketBody');
  if (!body) return;
  const basket = getBasket();
  if (!basket.length) {
    body.innerHTML = `<div class="basket-empty">🧺<p>아직 담은 색이 없어요.<br>스와치 위에 마우스를 올리고<br>+ 버튼을 눌러보세요.</p></div>`;
    return;
  }
  body.innerHTML = `
    <div class="basket-list">
      ${basket.map(hex => `
        <div class="basket-item">
          <div class="sw" style="background:${hex}"></div>
          <span class="hex">${hex}</span>
          <button class="rm" data-hex="${hex}" title="삭제">✕</button>
        </div>`).join('')}
    </div>
    <div class="basket-actions">
      <button class="btn-secondary" id="basketCopyAllBtn" style="width:100%;">전체 복사 (${basket.length}개)</button>
      <a href="my-palette.html" class="btn-primary" style="width:100%;text-align:center;">스튜디오에서 팔레트 만들기 →</a>
      <button class="basket-clear-btn" id="basketClearBtn">비우기</button>
    </div>`;

  body.querySelectorAll('.rm').forEach(btn => btn.addEventListener('click', () => removeFromBasket(btn.dataset.hex)));
  const copyBtn = document.getElementById('basketCopyAllBtn');
  if (copyBtn) copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(basket.join(', ')).catch(()=>{});
    showBasketToast('색상 코드 전체 복사됨 ✓');
  });
  const clearBtn = document.getElementById('basketClearBtn');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (confirm('담은 색을 모두 비울까요?')) clearBasket();
  });
}

function showBasketToast(msg) {
  const t = document.getElementById('basketToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 1800);
}

function initColorBasket() {
  const fab = document.createElement('button');
  fab.className = 'basket-fab';
  fab.id = 'basketFab';
  fab.setAttribute('aria-label', '담은 색상함 열기');
  fab.title = '담은 색상함';
  fab.innerHTML = `🧺<span class="basket-fab-count hidden" id="basketFabCount">0</span>`;
  document.body.appendChild(fab);

  const backdrop = document.createElement('div');
  backdrop.className = 'basket-backdrop';
  backdrop.id = 'basketBackdrop';
  backdrop.innerHTML = `
    <div class="basket-panel">
      <div class="basket-header">
        <h3>담은 색상함</h3>
        <button class="basket-close" id="basketCloseBtn">✕</button>
      </div>
      <div class="basket-body" id="basketBody"></div>
    </div>`;
  document.body.appendChild(backdrop);

  const toast = document.createElement('div');
  toast.className = 'copy-toast-small';
  toast.id = 'basketToast';
  document.body.appendChild(toast);

  fab.addEventListener('click', () => { renderBasketPanel(); backdrop.classList.add('open'); });
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
  document.getElementById('basketCloseBtn').addEventListener('click', () => backdrop.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') backdrop.classList.remove('open'); });

  renderBasketFab();
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  injectUI();
  initColorBasket();
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-fav-id]');
    if (btn) handleFavClick(btn);
  });
  updateUserUI();
});
