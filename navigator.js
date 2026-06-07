/* =============================================
   YEONBRIDGE Navigator — navigator.js
   ============================================= */

/* ─────────────────────────────────────────────
   DATA 객체 — 국가 조합별 절차·비용·서류 데이터
   key: "파트너A국적_파트너B국적_정착국가" 조합
   없는 조합은 'default'로 fallback
   ───────────────────────────────────────────── */

const SUPABASE_URL = 'https://yeqyzaoyyqfdfiayjwnr.supabase.co'  // 본인 URL
const SUPABASE_KEY = 'sb_publishable_5UGLVoMR2eQ9E3cXyLWPZg_vYxOEnqZ'     // publishable 키

// Supabase에서 데이터 불러오는 함수
async function fetchData(countryA, countryB, settle) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/documents?country_a=eq.${countryA}&country_b=eq.${countryB}&settle=eq.${settle}&order=step_number`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  return await response.json();
}

// 서류 목록 불러오는 함수
async function fetchDocs(countryA, countryB) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/required_docs?country_a=eq.${countryA}&country_b=eq.${countryB}`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  return await response.json();
}


/* ─────────────────────────────────────────────


/* ─────────────────────────────────────────────
   runAnalysis()
   버튼 클릭 시 실행: 로딩 → 결과 렌더링
   ───────────────────────────────────────────── */
async function runAnalysis() {
  const btn = document.getElementById('analyze-btn');
  btn.classList.add('loading');

  await showResults();

  btn.classList.remove('loading');

const sc2 = document.getElementById('sc2');
const sc3 = document.getElementById('sc3');
const sl2 = document.getElementById('sl2');
const sl3 = document.getElementById('sl3');
const sd2 = document.getElementById('sd2');
const sd3 = document.getElementById('sd3');
const pl1 = document.getElementById('pl1');
const pl2 = document.getElementById('pl2');

if (sc2) { sc2.className = 'ps-circle done'; sc2.textContent = '✓'; }
if (sl2) { sl2.className = 'ps-label'; }
if (sd2) { sd2.className = 'ps-desc'; }
if (pl1) { pl1.classList.add('done'); }
if (pl2) { pl2.classList.add('done'); }
if (sc3) { sc3.className = 'ps-circle active'; }
if (sl3) { sl3.className = 'ps-label active'; }
if (sd3) { sd3.className = 'ps-desc active'; }
}


/* ─────────────────────────────────────────────
   showResults()
   DATA를 DOM에 렌더링
   ───────────────────────────────────────────── */





async function showResults() {
  const countryA = document.getElementById('f-partner-a').value;
  const countryB = document.getElementById('f-partner-b').value;
  const settle   = document.getElementById('f-settle').value;

  // Supabase에서 데이터 불러오기
  const steps = await fetchData(countryA, countryB, settle);
  const docs  = await fetchDocs(countryA, countryB);

  // 빈 상태 숨기기
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('result-content').classList.remove('hidden');

  // 결과 제목
  document.getElementById('result-title').textContent =
    `${countryA} × ${countryB} 결과`;

  // 태그
  document.getElementById('result-tags').innerHTML = `
    <div class="pill"><div class="pill-icon"></div>
      <div class="pill-text">${steps.length}단계</div></div>
  `;

  // 절차 목록
  document.getElementById('proc-list').innerHTML = steps.map(s => `
    <div class="proc-row">
      <div class="proc-num">${s.step_number}</div>
      <div class="proc-text">${s.step_text}</div>
      <div class="proc-time">${s.duration}</div>
      <div class="proc-price">${s.cost}</div>
    </div>
  `).join('');

  // 서류 목록
  document.getElementById('docs-list').innerHTML = docs.map(doc => `
    <div class="doc-row">
      <div class="doc-dot"></div>
      <div class="doc-name">${doc.doc_name}</div>
      <span class="doc-badge ${doc.is_required ? 'req' : 'opt'}">
        ${doc.is_required ? '필수' : '선택'}
      </span>
    </div>
  `).join('');

   // 비용 계산
const costs = steps.map(s => s.cost).filter(c => c !== '무료');
const costSummary = costs.join(' + ');
const costEl = document.getElementById('cost-big');
if (costEl) costEl.textContent = costSummary || '—';

// 기간 막대 그래프
document.getElementById('bar-list').innerHTML = steps.map(s => `
  <div class="bar-row">
    <div class="bar-name">${s.step_text.substring(0, 4)}</div>
    <div class="bar-wrap">
      <div class="bar-fill" style="width:60%"></div>
    </div>
    <div class="bar-val">${s.duration}</div>
  </div>
`).join('');

  // 하단 바
  document.getElementById('total-period').textContent = '—';
  document.getElementById('bottom-tags').innerHTML = `
    <div class="bottom-tag">컨설팅 별도 문의</div>
  `;

  // 모바일 스크롤
  if (window.innerWidth <= 768) {
    document.getElementById('result-panel')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 패널 클래스 추가
  document.getElementById('result-panel').classList.add('has-result');
}
