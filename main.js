// Muay Thai Trainer v2
// 完全重構，無舊邏輯

const LANGS = {
  zh: {
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
  }
};

let state = {
  lang: 'zh',
  comboList: [ [1,2], [1,2,3], [2,3,2], [1,2,5,6], [3,4], [1,6,3,2], [2,5,6], [1,4,3] ],
  voices: [],
  voice: null,
  interval: 5,
  training: null,
  stopFlag: false,
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
}

function renderComboList() {
  const t = LANGS[state.lang];
  const ul = document.getElementById('combo-list');
  ul.innerHTML = '';
  state.comboList.forEach((combo, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${combo.join(' ')}</span><button data-idx="${idx}">${t.delete}</button>`;
    li.querySelector('button').onclick = () => {
      state.comboList.splice(idx,1);
      saveCombos();
      renderComboList();
    };
    ul.appendChild(li);
  });
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
  const arr = input.split(/\s+/).map(Number).filter(n=>n>=1&&n<=6);
  if (arr.length>0) {
    if (state.comboList.some(c=>c.length===arr.length && c.every((v,i)=>v===arr[i]))) {
      alert(t.comboExists);
      return;
    }
    state.comboList.push(arr);
    saveCombos();
    renderComboList();
    document.getElementById('combo-input').value = '';
  } else {
    alert(t.comboInvalid);
  }
}
function saveCombos() {
  localStorage.setItem('comboList', JSON.stringify(state.comboList));
}
function loadCombos() {
  const data = localStorage.getItem('comboList');
  if (data) state.comboList = JSON.parse(data);
}

// ========== 語音 =============
function loadVoices() {
  state.voices = window.speechSynthesis.getVoices();
  const sel = document.getElementById('voice-select');
  sel.innerHTML = '';
  state.voices.forEach((v,i)=>{
    if ((state.lang==='zh' && v.lang.indexOf('zh')===0) || (state.lang==='en' && v.lang.indexOf('en')===0)) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.text = v.name + ' (' + v.lang + ')';
      sel.appendChild(opt);
    }
  });
  if (sel.options.length>0) {
    sel.selectedIndex = 0;
    state.voice = state.voices[sel.value];
  }
}
document.getElementById('voice-select').onchange = function() {
  state.voice = state.voices[this.value];
};
window.speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
  if (!state.voice) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = state.voice;
  utter.lang = state.voice.lang;
  window.speechSynthesis.speak(utter);
  document.getElementById('display').innerHTML = `<span style='font-size:2.2em;'>${text}</span>`;
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
    if (state.comboList.length===0) return;
    const combo = state.comboList[idx % state.comboList.length];
    speak(combo.join(' '));
    idx++;
    state.training = setTimeout(next, state.interval*1000);
  }
  next();
}

function startFullComboTraining() {
  stopTraining();
  state.stopFlag = false;
  const t = LANGS[state.lang];
  const pool = [
    ...t.fists, ...t.legs, ...t.elbows, ...t.knees, ...t.others
  ];
  function randomMoves() {
    const n = Math.floor(Math.random()*4)+2;
    let arr = [];
    let p = [...pool];
    for (let i=0;i<n;i++) {
      const idx = Math.floor(Math.random()*p.length);
      arr.push(p[idx]);
      p.splice(idx,1);
    }
    return arr;
  }
  function next() {
    if (state.stopFlag) return;
    const moves = randomMoves();
    speak(moves.join('、'));
    state.training = setTimeout(next, state.interval*1000);
  }
  next();
}

// ========== 綁定事件 =========
document.addEventListener('DOMContentLoaded',()=>{
  renderUI();
  loadCombos();
  renderComboList();
  loadVoices();
  document.getElementById('lang-select').onchange = function() {
    state.lang = this.value;
    renderUI();
    renderComboList();
    loadVoices();
  };
  document.getElementById('open-combo-list').onclick = openComboModal;
  document.getElementById('close-combo-modal').onclick = closeComboModal;
  document.getElementById('combo-add-btn').onclick = addCombo;
  document.getElementById('reaction-btn').onclick = startReactionTraining;
  document.getElementById('combo-btn').onclick = startComboTraining;
  document.getElementById('fullcombo-btn').onclick = startFullComboTraining;
  document.getElementById('stop-btn').onclick = stopTraining;
  document.getElementById('combo-input').addEventListener('keydown',e=>{
    if(e.key==='Enter') addCombo();
  });
});
