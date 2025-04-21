// Muay Thai Trainer v2
// 完全重構，無舊邏輯

// 全域 JS 錯誤提示
window.onerror = function(msg, url, line, col, error) {
  alert('JS Error: ' + msg + '\n於 ' + line + ':' + col);
  return false;
};

const LANGS = {
  zh: {
    flag: '🇹🇼',
    title: '泰拳訓練小程式',
    reaction: '🥊 反應訓練',
    combo: '🧠 組合拳訓練',
    full: '💥 綜合技術訓練',
    stop: '⛔ 停止',
    comboList: '組合管理',
    add: '新增',
    delete: '刪除',
    comboPlaceholder: '輸入組合 例如：1 2 3',
    modalClose: '關閉',
    fists: ['前手拳','後手拳','左擺拳','右擺拳','左鉤拳','右鉤拳'],
    legs: ['左低掃','右低掃','左中掃','右中掃','左高掃','右高掃'],
    elbows: ['左上肘','右上肘','左平砍肘','右平砍肘','左砸肘','右砸肘','左轉身肘','右轉身肘'],
    knees: ['左側膝','右側膝'],
    others: ['格檔','左正蹬','右正蹬','假動作'],
    voiceStatus: '語音狀態：',
    voiceInit: '初始化語音',
    interval: '組合間隔秒數',
    sec: '秒',
    lang: '語言',
    voice: '語音',
    comboExists: '組合已存在',
    comboInvalid: '請輸入有效組合',
  },
  en: {
    flag: '🇬🇧',
    title: 'Muay Thai Trainer',
    reaction: '🥊 Reaction Training',
    combo: '🧠 Combo Training',
    full: '💥 Mixed Technique',
    stop: '⛔ Stop',
    comboList: 'Combo Manager',
    add: 'Add',
    delete: 'Delete',
    comboPlaceholder: 'Input combo e.g. 1 2 3',
    modalClose: 'Close',
    fists: ['Jab','Cross','Left Hook','Right Hook','Left Uppercut','Right Uppercut'],
    legs: ['Left Low Kick','Right Low Kick','Left Middle Kick','Right Middle Kick','Left High Kick','Right High Kick'],
    elbows: ['Left Up Elbow','Right Up Elbow','Left Horizontal Elbow','Right Horizontal Elbow','Left Down Elbow','Right Down Elbow','Left Spinning Elbow','Right Spinning Elbow'],
    knees: ['Left Knee','Right Knee'],
    others: ['Block','Left Teep','Right Teep','Feint'],
    voiceStatus: 'Voice Status:',
    voiceInit: 'Init Voice',
    interval: 'Combo interval',
    sec: 'sec',
    lang: 'Language',
    voice: 'Voice',
    comboExists: 'Combo already exists',
    comboInvalid: 'Please enter a valid combo',
  },
  th: {
    flag: '🇹🇭',
    title: 'มวยไทย เทรนเนอร์',
    reaction: '🥊 ฝึกปฏิกิริยา',
    combo: '🧠 ฝึกคอมโบ',
    full: '💥 ทักษะผสม',
    stop: '⛔ หยุด',
    comboList: 'จัดการคอมโบ',
    add: 'เพิ่ม',
    delete: 'ลบ',
    comboPlaceholder: 'กรอกคอมโบ เช่น 1 2 3',
    modalClose: 'ปิด',
    fists: ['หมัดซ้าย','หมัดขวา','ฮุกซ้าย','ฮุกขวา','อัปเปอร์คัตซ้าย','อัปเปอร์คัตขวา'],
    legs: ['เตะต่ำซ้าย','เตะต่ำขวา','เตะกลางซ้าย','เตะกลางขวา','เตะสูงซ้าย','เตะสูงขวา'],
    elbows: ['ศอกขึ้นซ้าย','ศอกขึ้นขวา','ศอกฟันซ้าย','ศอกฟันขวา','ศอกทุบซ้าย','ศอกทุบขวา','ศอกกลับซ้าย','ศอกกลับขวา'],
    knees: ['เข่าซ้าย','เข่าขวา'],
    others: ['ป้องกัน','ถีบซ้าย','ถีบขวา','หลอกล่อ'],
    voiceStatus: 'สถานะเสียง:',
    voiceInit: 'เริ่มเสียง',
    interval: 'ช่วงคอมโบ',
    sec: 'วินาที',
    lang: 'ภาษา',
    voice: 'เสียง',
    comboExists: 'คอมโบนี้มีอยู่แล้ว',
    comboInvalid: 'กรุณากรอกคอมโบที่ถูกต้อง',
  },
  ja: {
    flag: '🇯🇵',
    title: 'ムエタイ トレーナー',
    reaction: '🥊 反応トレーニング',
    combo: '🧠 コンボ練習',
    full: '💥 総合技術',
    stop: '⛔ 停止',
    comboList: 'コンボ管理',
    add: '追加',
    delete: '削除',
    comboPlaceholder: '例: 1 2 3',
    modalClose: '閉じる',
    fists: ['左ジャブ','右ストレート','左フック','右フック','左アッパー','右アッパー'],
    legs: ['左ロー','右ロー','左ミドル','右ミドル','左ハイ','右ハイ'],
    elbows: ['左肘上','右肘上','左肘横','右肘横','左肘下','右肘下','左スピン肘','右スピン肘'],
    knees: ['左膝','右膝'],
    others: ['ブロック','左前蹴り','右前蹴り','フェイント'],
    voiceStatus: '音声:',
    voiceInit: '音声初期化',
    interval: '間隔',
    sec: '秒',
    lang: '言語',
    voice: '音声',
    comboExists: 'コンボは既に存在します',
    comboInvalid: '有効なコンボを入力してください',
  },
  es: {
    flag: '🇪🇸',
    title: 'Entrenador de Muay Thai',
    reaction: '🥊 Entrenamiento de reacción',
    combo: '🧠 Entrenamiento de combo',
    full: '💥 Técnica mixta',
    stop: '⛔ Detener',
    comboList: 'Gestor de combos',
    add: 'Añadir',
    delete: 'Eliminar',
    comboPlaceholder: 'Ejemplo: 1 2 3',
    modalClose: 'Cerrar',
    fists: ['Jab','Directo','Gancho izquierdo','Gancho derecho','Uppercut izquierdo','Uppercut derecho'],
    legs: ['Low kick izq','Low kick der','Middle kick izq','Middle kick der','High kick izq','High kick der'],
    elbows: ['Codo arriba izq','Codo arriba der','Codo horizontal izq','Codo horizontal der','Codo abajo izq','Codo abajo der','Codo giratorio izq','Codo giratorio der'],
    knees: ['Rodilla izq','Rodilla der'],
    others: ['Bloqueo','Teep izq','Teep der','Finta'],
    voiceStatus: 'Voz:',
    voiceInit: 'Iniciar voz',
    interval: 'Intervalo',
    sec: 'seg',
    lang: 'Idioma',
    voice: 'Voz',
    comboExists: 'El combo ya existe',
    comboInvalid: 'Introduce un combo válido',
  },
  ko: {
    flag: '🇰🇷',
    title: '무에타이 트레이너',
    reaction: '🥊 반응 훈련',
    combo: '🧠 콤보 훈련',
    full: '💥 종합 기술',
    stop: '⛔ 정지',
    comboList: '콤보 관리',
    add: '추가',
    delete: '삭제',
    comboPlaceholder: '예: 1 2 3',
    modalClose: '닫기',
    fists: ['왼손 잽','오른손 스트레이트','왼손 훅','오른손 훅','왼손 어퍼컷','오른손 어퍼컷'],
    legs: ['왼쪽 로우킥','오른쪽 로우킥','왼쪽 미들킥','오른쪽 미들킥','왼쪽 하이킥','오른쪽 하이킥'],
    elbows: ['왼쪽 위 팔꿈치','오른쪽 위 팔꿈치','왼쪽 옆 팔꿈치','오른쪽 옆 팔꿈치','왼쪽 아래 팔꿈치','오른쪽 아래 팔꿈치','왼쪽 회전 팔꿈치','오른쪽 회전 팔꿈치'],
    knees: ['왼쪽 무릎','오른쪽 무릎'],
    others: ['블록','왼발 앞차기','오른발 앞차기','페인트'],
    voiceStatus: '음성:',
    voiceInit: '음성 초기화',
    interval: '간격',
    sec: '초',
    lang: '언어',
    voice: '음성',
    comboExists: '콤보가 이미 존재합니다',
    comboInvalid: '유효한 콤보를 입력하세요',
  }
};

let state = {
  lang: 'zh',
  fistCombos: [ [1,2], [1,2,3], [2,3,2], [1,2,5,6], [3,4], [1,6,3,2], [2,5,6], [1,4,3] ],
  fullCombos: [
  ['左鉤拳','右高掃'],
  ['左上肘','右側膝'],
  ['格檔','右正蹬','假動作'],
  ['左正蹬','右高掃'],
  ['左上肘','右膝','左鉤拳'],
  ['假動作','右中掃','左膝'],
  ['右正蹬','左高掃','左肘'],
  ['格檔','左膝','右鉤拳'],
  ['左高掃','右高掃'],
  ['左正蹬','右正蹬','左膝'],
  ['右上肘','左中掃','假動作']
],
  voices: [],
  voice: null,
  interval: 5,
  training: null,
  stopFlag: false,
  comboTab: 'fist' // 'fist' or 'full'
};

// ========== UI 初始化 ==========
function renderUI() {
  const t = LANGS[state.lang];
  document.getElementById('app-title').innerText = t.title;
  document.getElementById('reaction-btn').innerText = t.reaction;
  document.getElementById('combo-btn').innerText = t.combo;
  document.getElementById('fullcombo-btn').innerText = t.full;
  document.getElementById('stop-btn').innerText = t.stop;
  document.getElementById('combo-list-title').innerText = t.comboList;
  document.getElementById('combo-input').placeholder = t.comboPlaceholder;
  document.getElementById('combo-add-btn').innerText = t.add;
  document.getElementById('close-combo-modal').innerText = t.modalClose;
  // 語言選單
  const langSel = document.getElementById('lang-select');
  langSel.innerHTML = '';
  Object.keys(LANGS).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.innerText = LANGS[k].flag;
    if (k===state.lang) opt.selected = true;
    langSel.appendChild(opt);
  });
}

function renderComboList() {
  const t = LANGS[state.lang];
  const ul = document.getElementById('combo-list');
  ul.innerHTML = '';
  const combos = state.comboTab === 'fist' ? state.fistCombos : state.fullCombos;
  combos.forEach((combo, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${Array.isArray(combo) ? combo.join(' ') : combo}</span><button data-idx="${idx}">${t.delete}</button>`;
    li.querySelector('button').onclick = () => {
      combos.splice(idx,1);
      saveCombos();
      renderComboList();
    };
    ul.appendChild(li);
  });
  // tab 標示
  document.getElementById('tab-fist').classList.toggle('active', state.comboTab==='fist');
  document.getElementById('tab-full').classList.toggle('active', state.comboTab==='full');
}



function openComboModal() {
  document.getElementById('combo-modal').classList.remove('hidden');
  renderComboList();
}
function closeComboModal() {
  document.getElementById('combo-modal').classList.add('hidden');
}
function addCombo() {
  const t = LANGS[state.lang];
  const input = document.getElementById('combo-input').value.trim();
  if (state.comboTab === 'fist') {
    const arr = input.split(/\s+/).map(Number).filter(n=>n>=1&&n<=6);
    if (arr.length>0) {
      if (state.fistCombos.some(c=>c.length===arr.length && c.every((v,i)=>v===arr[i]))) {
        alert(t.comboExists);
        return;
      }
      state.fistCombos.push(arr);
      saveCombos();
      renderComboList();
      document.getElementById('combo-input').value = '';
    } else {
      alert(t.comboInvalid);
    }
  } else {
    // 綜合組合允許任意字串
    if (!input) {
      alert(t.comboInvalid);
      return;
    }
    if (state.fullCombos.some(c=>Array.isArray(c) ? c.join(' ')===input : c===input)) {
      alert(t.comboExists);
      return;
    }
    state.fullCombos.push(input);
    saveCombos();
    renderComboList();
    document.getElementById('combo-input').value = '';
  }
}
function saveCombos() {
  localStorage.setItem('fistCombos', JSON.stringify(state.fistCombos));
  localStorage.setItem('fullCombos', JSON.stringify(state.fullCombos));
}
function loadCombos() {
  try {
    const f = localStorage.getItem('fistCombos');
    if (f) state.fistCombos = JSON.parse(f);
  } catch(e) {
    state.fistCombos = [];
    console.error('fistCombos 載入錯誤', e);
  }
  try {
    const full = localStorage.getItem('fullCombos');
    if (full) state.fullCombos = JSON.parse(full);
  } catch(e) {
    state.fullCombos = [];
    console.error('fullCombos 載入錯誤', e);
  }
}

// ========== 語音 =============
function loadVoices() {
  state.voices = window.speechSynthesis.getVoices();
  const sel = document.getElementById('voice-select');
  sel.innerHTML = '';
  state.voices.forEach((v,i)=>{
    const langKey = state.lang;
    if (v.lang && (
      (langKey==='zh' && v.lang.indexOf('zh')===0) ||
      (langKey==='en' && v.lang.indexOf('en')===0) ||
      (langKey==='th' && v.lang.indexOf('th')===0) ||
      (langKey==='ja' && v.lang.indexOf('ja')===0) ||
      (langKey==='es' && v.lang.indexOf('es')===0) ||
      (langKey==='ko' && v.lang.indexOf('ko')===0)
    )) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.text = v.name;
      sel.appendChild(opt);
    }
  });
  if (sel.options.length>0) {
    sel.selectedIndex = 0;
    state.voice = state.voices[sel.value];
  } else {
    state.voice = null;
  }
}
document.getElementById('voice-select').onchange = function() {
  state.voice = state.voices[this.value];
};
window.speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
  if (!state.voice) {
    document.getElementById('display').innerHTML = `<span style='color:#e63c2e;font-size:1em;'>語音不可用</span>`;
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = state.voice;
  utter.lang = state.voice.lang;
  window.speechSynthesis.speak(utter);
  document.getElementById('display').innerText = text;
}

// ========== 訓練邏輯 =========
function stopTraining() {
  state.stopFlag = true;
  if (state.training) clearTimeout(state.training);
  window.speechSynthesis.cancel();
  document.getElementById('display').innerHTML = '';
}

function startReactionTraining() {
  stopTraining();
  state.stopFlag = false;
  function next() {
    if (state.stopFlag) return;
    const num = Math.floor(Math.random()*6)+1;
    speak(num.toString());
    state.training = setTimeout(next, 800 + Math.random()*2200);
  }
  next();
}

function startComboTraining() {
  stopTraining();
  state.stopFlag = false;
  let idx = 0;
  function next() {
    if (state.stopFlag) return;
    if (!state.fistCombos || state.fistCombos.length === 0) return;
    const combo = state.fistCombos[idx % state.fistCombos.length];
    speak(Array.isArray(combo) ? combo.join(' ') : combo);
    idx++;
    state.training = setTimeout(next, state.interval*1000);
  }
  next();
}

function startFullComboTraining() {
  stopTraining();
  state.stopFlag = false;
  let idx = 0;
  function next() {
    if (state.stopFlag) return;
    if (!state.fullCombos || state.fullCombos.length === 0) return;
    const combo = state.fullCombos[idx % state.fullCombos.length];
    speak(Array.isArray(combo) ? combo.join(' ') : combo);
    idx++;
    state.training = setTimeout(next, state.interval*1000);
  }
  next();
}

// ========== 綁定事件 =========
document.addEventListener('DOMContentLoaded',()=>{
  // 初始化順序
  try {
    renderUI();
    loadCombos();
    loadVoices();
    renderComboList();
  } catch(e) {
    alert('初始化錯誤: '+e.message);
    console.error(e);
  }
  // 語言切換
  const langSel = document.getElementById('lang-select');
  if (langSel) langSel.onchange = function() {
    state.lang = this.value;
    renderUI();
    renderComboList();
    loadVoices();
    console.log('切換語言', state.lang);
  };
  // 按鈕事件
  const btns = [
    ['open-combo-list', openComboModal],
    ['close-combo-modal', closeComboModal],
    ['combo-add-btn', addCombo],
    ['reaction-btn', startReactionTraining],
    ['combo-btn', startComboTraining],
    ['fullcombo-btn', startFullComboTraining],
    ['stop-btn', stopTraining],
    ['tab-fist', ()=>{ state.comboTab='fist'; renderComboList(); console.log('切換tab fist'); }],
    ['tab-full', ()=>{ state.comboTab='full'; renderComboList(); console.log('切換tab full'); }]
  ];
  btns.forEach(([id, fn])=>{
    const el = document.getElementById(id);
    if (el) {
      el.onclick = function(){
        console.log('點擊', id);
        fn();
      };
    } else {
      console.warn('找不到元素', id);
    }
  });
  // 輸入 Enter 新增
  const comboInput = document.getElementById('combo-input');
  if (comboInput) comboInput.addEventListener('keydown',e=>{
    if(e.key==='Enter') {
      console.log('輸入 Enter 新增');
      addCombo();
    }
  });
});

