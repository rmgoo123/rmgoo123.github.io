/* =============================================
   YEONBRIDGE Navigator — navigator.js
   ============================================= */

/* ─────────────────────────────────────────────
   DATA 객체 — 국가 조합별 절차·비용·서류 데이터
   key: "파트너A국적_파트너B국적_정착국가" 조합
   없는 조합은 'default'로 fallback
   ───────────────────────────────────────────── */
const DATA = {

  /* 한국인 + 인도네시아인 → 한국 정착 */
  "korea_indonesia_korea": {
    title: "한국 × 인도네시아 → 한국 정착",
    totalWeeks: "9~14주", cost: "93~198만원",
    steps: [
      { n:1, text:"인도네시아 혼인허가 신청 (KUA)",  time:"3~4주", price:"~15만원" },
      { n:2, text:"서류 번역 · 공증 · 아포스티유",    time:"2주",   price:"30~60만원" },
      { n:3, text:"한국 혼인신고 접수",                time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",          time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",                  time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"혼인허가",  val:55,  label:"3~4주" },
      { name:"번역·공증", val:36,  label:"2주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",             req:true  },
      { name:"혼인관계증명서 (한국)",        req:true  },
      { name:"KUA 혼인허가서 (인도네시아)",  req:true  },
      { name:"소득증빙 서류",                req:true  },
      { name:"아포스티유 확인서",            req:true  },
      { name:"가족관계증명서 (한국)",        req:true  },
      { name:"주거 입증 서류",               req:false },
      { name:"국제결혼 안내프로그램 이수증", req:false },
    ],
  },

  /* 한국인 + 베트남인 → 한국 정착 */
  "korea_vietnam_korea": {
    title: "한국 × 베트남 → 한국 정착",
    totalWeeks: "10~15주", cost: "83~183만원",
    steps: [
      { n:1, text:"베트남 결혼 등록 (혼인사실증명서)", time:"2~3주", price:"~10만원" },
      { n:2, text:"서류 번역 · 공증 · 영사확인",       time:"2주",   price:"20~50만원" },
      { n:3, text:"한국 혼인신고 접수",                 time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",           time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",                   time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"혼인등록",  val:45,  label:"2~3주" },
      { name:"번역·공증", val:36,  label:"2주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",      req:true  },
      { name:"혼인관계증명서 (한국)", req:true  },
      { name:"결혼등록증 (베트남)",   req:true  },
      { name:"소득증빙 서류",         req:true  },
      { name:"영사확인 서류",         req:true  },
      { name:"가족관계증명서 (한국)", req:true  },
      { name:"한국어 능력 증명서",    req:false },
      { name:"주거 입증 서류",        req:false },
    ],
  },

  /* 한국인 + 필리핀인 → 한국 정착 */
  "korea_philippines_korea": {
    title: "한국 × 필리핀 → 한국 정착",
    totalWeeks: "10~16주", cost: "113~248만원",
    steps: [
      { n:1, text:"결혼허가서 신청 (Marriage License)", time:"10일",  price:"~5만원" },
      { n:2, text:"필리핀 현지 결혼식 (공식)",           time:"당일",  price:"30~80만원" },
      { n:3, text:"서류 공증 · PSA 인증",                time:"2~3주", price:"20~40만원" },
      { n:4, text:"한국 혼인신고 접수",                  time:"당일",  price:"무료" },
      { n:5, text:"F-6 결혼비자 신청 · 심사",            time:"4~8주", price:"60~120만원" },
      { n:6, text:"외국인등록증 발급",                    time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"결혼허가",  val:25,  label:"10일" },
      { name:"서류인증",  val:45,  label:"2~3주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",             req:true  },
      { name:"Marriage Certificate (PSA)", req:true  },
      { name:"혼인관계증명서 (한국)",       req:true  },
      { name:"소득증빙 서류",               req:true  },
      { name:"CENOMAR (미혼증명)",          req:true  },
      { name:"가족관계증명서 (한국)",       req:true  },
      { name:"한국어 능력 증명서",          req:false },
      { name:"주거 입증 서류",              req:false },
    ],
  },

  /* 한국인 + 일본인 → 한국 정착 */
  "korea_japan_korea": {
    title: "한국 × 일본 → 한국 정착",
    totalWeeks: "6~10주", cost: "63~104만원",
    steps: [
      { n:1, text:"일본 시구청 혼인신고",      time:"당일",  price:"무료" },
      { n:2, text:"혼인신고 수리증명서 취득",  time:"1주",   price:"~1만원" },
      { n:3, text:"한국 혼인신고 접수",        time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사", time:"3~6주", price:"60~100만원" },
      { n:5, text:"외국인등록증 발급",         time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"혼인신고",    val:10,  label:"당일" },
      { name:"증명서 취득", val:18,  label:"1주" },
      { name:"F-6 비자",    val:100, label:"3~6주" },
      { name:"외국인등록",  val:28,  label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",        req:true  },
      { name:"혼인신고 수리증명서",     req:true  },
      { name:"혼인관계증명서 (한국)",   req:true  },
      { name:"소득증빙 서류",           req:true  },
      { name:"외국인등록원표 기재사항", req:true  },
      { name:"가족관계증명서 (한국)",   req:true  },
      { name:"주거 입증 서류",          req:false },
      { name:"재직증명서",              req:false },
    ],
  },

  /* 한국인 + 중국인 → 한국 정착 */
  "korea_china_korea": {
    title: "한국 × 중국 → 한국 정착",
    totalWeeks: "8~14주", cost: "83~173만원",
    steps: [
      { n:1, text:"중국 민정국 혼인등록",      time:"당일",  price:"무료" },
      { n:2, text:"공증·번역·영사확인",        time:"2~4주", price:"20~50만원" },
      { n:3, text:"한국 혼인신고 접수",        time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사", time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",         time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"혼인등록",  val:10,  label:"당일" },
      { name:"번역·공증", val:55,  label:"2~4주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",      req:true  },
      { name:"결혼증 (중국)",         req:true  },
      { name:"혼인관계증명서 (한국)", req:true  },
      { name:"소득증빙 서류",         req:true  },
      { name:"영사확인서",            req:true  },
      { name:"가족관계증명서 (한국)", req:true  },
      { name:"주거 입증 서류",        req:false },
      { name:"한국어 능력 증명서",    req:false },
    ],
  },

  /* 둘 다 외국인 (기본 안내) */
  "default_both_foreign": {
    title: "외국인 커플 → 한국 정착",
    totalWeeks: "12~20주", cost: "150~350만원 (추정)",
    steps: [
      { n:1, text:"양국 혼인 등록 및 서류 준비",     time:"3~5주", price:"~50만원" },
      { n:2, text:"공증 · 아포스티유 또는 영사확인", time:"2~3주", price:"30~60만원" },
      { n:3, text:"제3국 혼인신고 (해당 시)",        time:"1~2주", price:"~20만원" },
      { n:4, text:"한국 장기체류비자 신청",          time:"4~8주", price:"60~150만원" },
      { n:5, text:"외국인등록증 발급 (양측)",        time:"2주",   price:"6만원" },
    ],
    bars: [
      { name:"혼인등록",   val:60,  label:"3~5주" },
      { name:"번역·공증",  val:50,  label:"2~3주" },
      { name:"비자 신청",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28,  label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",             req:true  },
      { name:"각국 혼인증명서",              req:true  },
      { name:"아포스티유·영사확인 서류",     req:true  },
      { name:"소득증빙 서류",                req:true  },
      { name:"체류 목적 증빙",               req:true  },
      { name:"보증인 서류 (해당 시)",        req:false },
      { name:"한국어 능력 증명서",           req:false },
      { name:"주거 입증 서류",               req:false },
    ],
  },

  /* 기본 fallback */
  "default": {
    title: "국제커플 결혼 절차",
    totalWeeks: "10~18주", cost: "100~250만원 (추정)",
    steps: [
      { n:1, text:"현지 혼인 등록 및 서류 준비",     time:"2~4주", price:"~30만원" },
      { n:2, text:"공증 · 아포스티유 또는 영사확인", time:"2~3주", price:"20~50만원" },
      { n:3, text:"혼인신고 접수",                    time:"당일",  price:"무료" },
      { n:4, text:"결혼비자 신청 · 심사",             time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",                time:"2주",   price:"3만원" },
    ],
    bars: [
      { name:"혼인등록",  val:55,  label:"2~4주" },
      { name:"번역·공증", val:45,  label:"2~3주" },
      { name:"비자",       val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",         req:true  },
      { name:"현지 혼인증명서",          req:true  },
      { name:"혼인관계증명서",           req:true  },
      { name:"소득증빙 서류",            req:true  },
      { name:"공증 · 아포스티유 서류",   req:true  },
      { name:"가족관계증명서",           req:true  },
      { name:"국제결혼 안내프로그램",    req:false },
      { name:"주거 입증 서류",           req:false },
    ],
  },
};


/* ─────────────────────────────────────────────
   getDataKey()
   선택된 값들로 DATA 키를 조합해서 반환
   없는 조합은 fallback 키 반환
   ───────────────────────────────────────────── */
function getDataKey() {
  const a      = document.getElementById('f-partner-a').value;
  const b      = document.getElementById('f-partner-b').value;
  const settle = document.getElementById('f-settle').value;
  const visa   = document.getElementById('f-visa').value;

  /* 둘 다 외국인 케이스 */
  if (visa === 'both' || (a !== 'korea' && b !== 'korea')) {
    return 'default_both_foreign';
  }

  /* 정착 국가 결정 */
  const settleCountry = settle === 'korea' ? 'korea' : 'foreign';

  /* 한국인이 A인지 B인지 파악해서 상대국 추출 */
  const foreign = a === 'korea' ? b : a;
  const key = `korea_${foreign}_${settleCountry}`;

  return DATA[key] ? key : 'default';
}


/* ─────────────────────────────────────────────
   runAnalysis()
   버튼 클릭 시 실행: 로딩 → 결과 렌더링
   ───────────────────────────────────────────── */
function runAnalysis() {
  const btn = document.getElementById('analyze-btn');
  btn.classList.add('loading');

  setTimeout(() => {
    btn.classList.remove('loading');
    showResults();

    /* 스텝 2 완료 → 스텝 3 활성 */
    document.getElementById('sc2').className = 'ps-circle done';
    document.getElementById('sc2').textContent = '✓';
    document.getElementById('sl2').className = 'ps-label';
    document.getElementById('pl1').classList.add('done');
    document.getElementById('pl2').classList.add('done');
    document.getElementById('sc3').className = 'ps-circle active';
    document.getElementById('sl3').className = 'ps-label active';
  }, 1400);
}


/* ─────────────────────────────────────────────
   showResults()
   DATA를 DOM에 렌더링
   ───────────────────────────────────────────── */
function showResults() {
  const key = getDataKey();
  const d   = DATA[key] || DATA['default'];

   document.getElementById('result-panel').classList.add('has-result');

  /* 빈 상태 숨기고 결과 표시 */
  document.getElementById('empty-state').style.display  = 'none';
  document.getElementById('result-content').classList.remove('hidden');

  /* 제목 */
  document.getElementById('result-title').textContent = d.title;

  /* 태그 */
  document.getElementById('result-tags').innerHTML = `
  <div class="pill">
    <div class="pill-icon"></div>
    <div class="pill-text">예상 ${d.totalWeeks}</div>
  </div>
  <div class="pill">
    <div class="pill-icon"></div>
    <div class="pill-text">총 ${d.steps.length}단계</div>
  </div>
  `;

  /* 절차 목록 */
  document.getElementById('proc-list').innerHTML = d.steps.map(s => `
    <div class="proc-row">
      <div class="proc-num">${s.n}</div>
      <div class="proc-text">${s.text}</div>
      <div class="proc-time">${s.time}</div>
      <div class="proc-price">${s.price}</div>
    </div>
  `).join('');

  /* 총 비용 */
  document.getElementById('cost-big').textContent = d.cost;

  /* 기간 막대 (width:0에서 시작 → setTimeout으로 애니메이션) */
  document.getElementById('bar-list').innerHTML = d.bars.map(b => `
    <div class="bar-row">
      <div class="bar-name">${b.name}</div>
      <div class="bar-wrap"><div class="bar-fill" style="width:0%" data-w="${b.val}%"></div></div>
      <div class="bar-val">${b.label}</div>
    </div>
  `).join('');

  /* 서류 목록 */
  document.getElementById('docs-list').innerHTML = d.docs.map(doc => `
    <div class="doc-row">
      <div class="doc-dot"></div>
      <div class="doc-name">${doc.name}</div>
      <span class="doc-badge ${doc.req ? 'req' : 'opt'}">${doc.req ? '필수' : '선택'}</span>
    </div>
  `).join('');

  /* 하단 바 */
  document.getElementById('total-period').textContent = d.totalWeeks;
  document.getElementById('bottom-tags').innerHTML = `
    <div class="bottom-tag">직접비용 ${d.cost}</div>
    <div class="bottom-tag">컨설팅 별도 문의</div>
  `;

  /* 막대 애니메이션 */
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 200);

  /* 모바일: 결과 패널로 부드럽게 스크롤 */
  if (window.innerWidth <= 768) {
    document.getElementById('result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
