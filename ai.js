/* =============================================
   YEONBRIDGE AI Navigator — main.js
   index.html에서 <script src="main.js">로 불러옴
   ============================================= */


/* =============================================
   DATA 객체 — 국가별 절차·비용·서류 데이터
   ─────────────────────────────────────────────
   구조:
     DATA[국가키] = {
       name:       표시 이름 (결과 제목에 사용)
       flag:       국기 이모지
       steps:      절차 배열 [ { n, text, time, price } ]
       cost:       총 예상 비용 문자열
       totalWeeks: 총 소요 기간 문자열
       bars:       기간 막대 그래프 [ { name, val(0~100 비율), label } ]
       docs:       서류 목록 [ { name, req(true=필수/false=선택) } ]
     }
   ─────────────────────────────────────────────
   새 국가 추가 방법:
     1. 아래 동일 구조로 객체 추가
     2. index.html select에 <option value="키">국가명</option> 추가
   ============================================= */
const DATA = {

  /* ─── 인도네시아 ─── */
  indonesia: {
    name: "인도네시아", flag: "🇮🇩",
    steps: [
      { n:1, text:"인도네시아 혼인허가 신청 (KUA)", time:"3~4주", price:"~15만원" },
      { n:2, text:"서류 번역 · 공증 · 아포스티유",   time:"2주",   price:"30~60만원" },
      { n:3, text:"한국 혼인신고 접수",               time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",         time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",                 time:"2주",   price:"3만원" },
    ],
    cost: "93~198만원", totalWeeks: "9~14주",
    /* bars.val: 100이 가장 긴 단계 기준 상대 비율 */
    bars: [
      { name:"혼인허가",  val:55,  label:"3~4주" },
      { name:"번역·공증", val:36,  label:"2주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs: [
      { name:"여권 사본 (양측)",               req:true  },
      { name:"혼인관계증명서 (한국)",          req:true  },
      { name:"KUA 혼인허가서 (인도네시아)",    req:true  },
      { name:"소득증빙 서류",                  req:true  },
      { name:"아포스티유 확인서",              req:true  },
      { name:"가족관계증명서 (한국)",          req:true  },
      { name:"주거 입증 서류 (임대차계약서)",  req:false },
      { name:"국제결혼 안내프로그램 이수증",   req:false },
    ],
  },

  /* ─── 베트남 ─── */
  vietnam: {
    name: "베트남", flag: "🇻🇳",
    steps: [
      { n:1, text:"베트남 결혼 등록 (혼인사실증명서)", time:"2~3주", price:"~10만원" },
      { n:2, text:"서류 번역 · 공증 · 영사확인",       time:"2주",   price:"20~50만원" },
      { n:3, text:"한국 혼인신고 접수",                 time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",           time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",                   time:"2주",   price:"3만원" },
    ],
    cost:"83~183만원", totalWeeks:"10~15주",
    bars:[
      { name:"혼인등록",  val:45,  label:"2~3주" },
      { name:"번역·공증", val:36,  label:"2주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs:[
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

  /* ─── 필리핀 ─── */
  philippines: {
    name: "필리핀", flag: "🇵🇭",
    steps: [
      { n:1, text:"결혼허가서 신청 (Marriage License)", time:"10일",  price:"~5만원" },
      { n:2, text:"필리핀 현지 결혼식 (공식)",           time:"당일",  price:"30~80만원" },
      { n:3, text:"서류 공증 · PSA 인증",                time:"2~3주", price:"20~40만원" },
      { n:4, text:"한국 혼인신고 접수",                  time:"당일",  price:"무료" },
      { n:5, text:"F-6 결혼비자 신청 · 심사",            time:"4~8주", price:"60~120만원" },
      { n:6, text:"외국인등록증 발급",                    time:"2주",   price:"3만원" },
    ],
    cost:"113~248만원", totalWeeks:"10~16주",
    bars:[
      { name:"결혼허가",  val:25,  label:"10일" },
      { name:"서류인증",  val:45,  label:"2~3주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs:[
      { name:"여권 사본 (양측)",            req:true  },
      { name:"Marriage Certificate (PSA)", req:true  },
      { name:"혼인관계증명서 (한국)",       req:true  },
      { name:"소득증빙 서류",               req:true  },
      { name:"CENOMAR (미혼증명)",          req:true  },
      { name:"가족관계증명서 (한국)",       req:true  },
      { name:"한국어 능력 증명서",          req:false },
      { name:"주거 입증 서류",              req:false },
    ],
  },

  /* ─── 태국 ─── */
  thailand: {
    name: "태국", flag: "🇹🇭",
    steps: [
      { n:1, text:"태국 구청(Amphoe) 혼인등록", time:"당일",  price:"~3만원" },
      { n:2, text:"외무부 인증 및 번역 공증",   time:"1~2주", price:"15~35만원" },
      { n:3, text:"한국 혼인신고 접수",          time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",   time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",           time:"2주",   price:"3만원" },
    ],
    cost:"78~161만원", totalWeeks:"8~13주",
    bars:[
      { name:"혼인등록",  val:10,  label:"당일" },
      { name:"번역·공증", val:28,  label:"1~2주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs:[
      { name:"여권 사본 (양측)",      req:true  },
      { name:"혼인등록증 (태국)",     req:true  },
      { name:"혼인관계증명서 (한국)", req:true  },
      { name:"소득증빙 서류",         req:true  },
      { name:"외무부 인증서류",       req:true  },
      { name:"가족관계증명서 (한국)", req:true  },
      { name:"주거 입증 서류",        req:false },
      { name:"한국어 능력 증명서",    req:false },
    ],
  },

  /* ─── 중국 ─── */
  china: {
    name: "중국", flag: "🇨🇳",
    steps: [
      { n:1, text:"중국 민정국 혼인등록",      time:"당일",  price:"무료" },
      { n:2, text:"공증·번역·영사확인",        time:"2~4주", price:"20~50만원" },
      { n:3, text:"한국 혼인신고 접수",        time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사", time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",         time:"2주",   price:"3만원" },
    ],
    cost:"83~173만원", totalWeeks:"8~14주",
    bars:[
      { name:"혼인등록",  val:10,  label:"당일" },
      { name:"번역·공증", val:55,  label:"2~4주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs:[
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

  /* ─── 일본 ─── */
  japan: {
    name: "일본", flag: "🇯🇵",
    steps: [
      { n:1, text:"일본 시구청 혼인신고",      time:"당일",  price:"무료" },
      { n:2, text:"혼인신고 수리증명서 취득",  time:"1주",   price:"~1만원" },
      { n:3, text:"한국 혼인신고 접수",        time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사", time:"3~6주", price:"60~100만원" },
      { n:5, text:"외국인등록증 발급",         time:"2주",   price:"3만원" },
    ],
    cost:"63~104만원", totalWeeks:"6~10주",
    bars:[
      { name:"혼인신고",    val:10,  label:"당일" },
      { name:"증명서 취득", val:18,  label:"1주" },
      { name:"F-6 비자",    val:100, label:"3~6주" },
      { name:"외국인등록",  val:28,  label:"2주" },
    ],
    docs:[
      { name:"여권 사본 (양측)",        req:true  },
      { name:"혼인신고 수리증명서",     req:true  },
      { name:"혼인관계증명서 (한국)",   req:true  },
      { name:"소득증빙 서류",           req:true  },
      { name:"가족관계증명서 (한국)",   req:true  },
      { name:"외국인등록원표 기재사항", req:true  },
      { name:"주거 입증 서류",          req:false },
      { name:"재직증명서",              req:false },
    ],
  },

  /* ─── 미국 ─── */
  usa: {
    name: "미국", flag: "🇺🇸",
    steps: [
      { n:1, text:"미국 현지 Marriage License 취득", time:"3~5일", price:"~10만원" },
      { n:2, text:"공증·아포스티유 처리",            time:"1~2주", price:"15~30만원" },
      { n:3, text:"한국 혼인신고 접수",              time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",       time:"3~6주", price:"60~100만원" },
      { n:5, text:"외국인등록증 발급",               time:"2주",   price:"3만원" },
    ],
    cost:"88~143만원", totalWeeks:"6~11주",
    bars:[
      { name:"Marriage L.", val:12,  label:"3~5일" },
      { name:"공증·아포",   val:28,  label:"1~2주" },
      { name:"F-6 비자",    val:100, label:"3~6주" },
      { name:"외국인등록",  val:28,  label:"2주" },
    ],
    docs:[
      { name:"여권 사본 (양측)",              req:true  },
      { name:"Marriage Certificate (미국)", req:true  },
      { name:"혼인관계증명서 (한국)",         req:true  },
      { name:"소득증빙 서류",                 req:true  },
      { name:"아포스티유 확인서",             req:true  },
      { name:"가족관계증명서 (한국)",         req:true  },
      { name:"주거 입증 서류",               req:false },
      { name:"재직·재학 증명서",             req:false },
    ],
  },

  /* ─── 기타 국가 ─── */
  other: {
    name: "기타 국가", flag: "🌍",
    steps: [
      { n:1, text:"현지 혼인 등록 및 서류 준비",     time:"2~4주", price:"~30만원" },
      { n:2, text:"공증 · 아포스티유 또는 영사확인", time:"2~3주", price:"20~50만원" },
      { n:3, text:"한국 혼인신고 접수",              time:"당일",  price:"무료" },
      { n:4, text:"F-6 결혼비자 신청 · 심사",       time:"4~8주", price:"60~120만원" },
      { n:5, text:"외국인등록증 발급",               time:"2주",   price:"3만원" },
    ],
    cost:"83~203만원", totalWeeks:"10~17주",
    bars:[
      { name:"혼인등록",  val:55,  label:"2~4주" },
      { name:"번역·공증", val:55,  label:"2~3주" },
      { name:"F-6 비자",  val:100, label:"4~8주" },
      { name:"외국인등록", val:28, label:"2주" },
    ],
    docs:[
      { name:"여권 사본 (양측)",             req:true  },
      { name:"현지 혼인증명서",              req:true  },
      { name:"혼인관계증명서 (한국)",        req:true  },
      { name:"소득증빙 서류",                req:true  },
      { name:"공증 · 아포스티유 서류",       req:true  },
      { name:"가족관계증명서 (한국)",        req:true  },
      { name:"국제결혼 안내프로그램 이수증", req:false },
      { name:"주거 입증 서류",               req:false },
    ],
  },
};
/* ─── DATA 객체 끝 ─── */


/* =============================================
   runAnalysis()
   ─────────────────────────────────────────────
   역할: "AI로 절차 분석하기" 버튼 클릭 시 실행
   흐름:
     1. 버튼에 .loading 추가 → 텍스트 숨김 + 스피너 표시
     2. 1.4초 대기 (실제 API 연동 시 여기서 fetch() 호출)
     3. 로딩 해제 → showResults() 호출
     4. 스텝 네비게이션 업데이트 (2단계 완료 → 3단계 활성)
   ============================================= */
function runAnalysis() {
  const btn = document.getElementById('analyze-btn');

  /* 버튼 로딩 상태 전환 */
  btn.classList.add('loading');

  /* 1.4초 후 결과 렌더링
     실제 AI API 연동 시: setTimeout → fetch().then(showResults) 로 교체 */
  setTimeout(() => {
    btn.classList.remove('loading');
    showResults();

    /* 스텝 네비: 2단계 완료(done) 처리 */
    document.getElementById('s2').className  = 'snav-circle done';
    document.getElementById('s2').textContent = '✓';
    document.getElementById('sl2').className = 'snav-label';
    document.getElementById('sd2').className = 'snav-desc';

    /* 스텝 네비: 3단계 활성(active) 처리 */
    document.getElementById('s3').className  = 'snav-circle active';
    document.getElementById('sl3').className = 'snav-label active';
    document.getElementById('sd3').className = 'snav-desc active';
  }, 1400);
}


/* =============================================
   showResults()
   ─────────────────────────────────────────────
   역할: DATA에서 선택된 국가 데이터를 가져와 DOM에 렌더링
   흐름:
     1. f-country select 값으로 DATA 조회
     2. 빈 상태(empty-state) 숨기기
     3. 결과 헤더(제목 + 태그) 업데이트
     4. 절차 목록 / 비용 / 기간 막대 / 서류 목록 HTML 생성
     5. 하단 바 업데이트
     6. .show 클래스 추가 → CSS transition으로 페이드인
     7. 막대 애니메이션: setTimeout으로 한 틱 뒤 width 설정
   ============================================= */
function showResults() {
  /* 선택된 국가 키로 DATA 조회 (없으면 'other' fallback) */
  const country = document.getElementById('f-country').value;
  const d = DATA[country] || DATA['other'];

  /* ── 1. 빈 상태 숨기기 ── */
  document.getElementById('empty-state').style.display = 'none';

  /* ── 2. 결과 헤더 제목 ── */
  const residence = document.getElementById('f-residence').value;
  document.getElementById('result-title').textContent = `한국 × ${d.name} 결과`;

  /* ── 3. 결과 태그: 기간(강조) / 단계수 / 정착지 ── */
  document.getElementById('result-tags').innerHTML = `
    <span class="rtag hi">예상 ${d.totalWeeks}</span>
    <span class="rtag">총 ${d.steps.length}단계</span>
    <span class="rtag">${residence === 'korea' ? '한국 정착' : '한국 입국 목표'}</span>
  `;

  /* ── 4-1. 절차 목록: steps 배열 → HTML 변환 ── */
  document.getElementById('proc-list').innerHTML = d.steps.map(s => `
    <div class="proc-row">
      <div class="proc-num">${s.n}</div>
      <div class="proc-text">${s.text}</div>
      <div class="proc-time">${s.time}</div>
      <div class="proc-price">${s.price}</div>
    </div>
  `).join('');

  /* ── 4-2. 총 예상 비용 ── */
  document.getElementById('cost-big').textContent = d.cost;

  /* ── 4-3. 기간 막대 그래프
     width:0% 로 시작, setTimeout에서 목표값으로 바꿔 transition 발동 ── */
  document.getElementById('bar-list').innerHTML = d.bars.map(b => `
    <div class="bar-row">
      <div class="bar-name">${b.name}</div>
      <div class="bar-wrap">
        <div class="bar-fill" style="width:0%" data-w="${b.val}%"></div>
      </div>
      <div class="bar-val">${b.label}</div>
    </div>
  `).join('');

  /* ── 4-4. 서류 목록: req 여부에 따라 클래스 분기 ── */
  document.getElementById('docs-list').innerHTML = d.docs.map(doc => `
    <div class="doc-row">
      <div class="doc-dot"></div>
      <div class="doc-name">${doc.name}</div>
      <span class="doc-badge ${doc.req ? 'req' : 'opt'}">${doc.req ? '필수' : '선택'}</span>
    </div>
  `).join('');

  /* ── 5. 하단 바: 총 기간 + 비용 태그 ── */
  document.getElementById('total-period').textContent = d.totalWeeks;
  document.getElementById('bottom-tags').innerHTML = `
    <div class="bottom-tag">직접비용 ${d.cost}</div>
    <div class="bottom-tag">컨설팅 별도 문의</div>
  `;

  /* ── 6. 결과 헤더·카드 페이드인: .show 추가 → CSS transition 발동 ── */
  document.getElementById('result-header').classList.add('show');
  document.getElementById('cards-grid').classList.add('show');

  /* ── 7. 막대 애니메이션
     DOM이 width:0%로 렌더된 직후 바로 바꾸면 transition이 안 걸림
     → setTimeout 200ms 뒤에 실행해서 브라우저가 초기 상태를 인식하게 함 ── */
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(el => {
      el.style.width = el.dataset.w; /* data-w 값으로 너비 설정 → 0%에서 목표치로 애니메이션 */
    });
  }, 200);
}
