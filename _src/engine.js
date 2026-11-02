(function(){
const L=window.LESSON;
const $=(t,a={},...k)=>{const e=document.createElement(t);for(const[x,v]of Object.entries(a)){if(x==='class')e.className=v;else if(x==='html')e.innerHTML=v;else if(x.startsWith('on'))e.addEventListener(x.slice(2),v);else e.setAttribute(x,v);}k.flat().forEach(c=>c!=null&&e.append(c));return e;};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};
const norm=s=>s.toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').trim();
let VOICE=null;
function pickVoice(){try{const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));
 VOICE=vs.find(v=>/en[-_]GB/i.test(v.lang)&&/google|natural|online|serena|daniel|kate/i.test(v.name))||vs.find(v=>/en[-_]GB/i.test(v.lang))||vs.find(v=>/en[-_]US/i.test(v.lang))||vs[0]||null;}catch(e){VOICE=null;}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}
function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[—\/…]/g,', ').replace(/___/g,'blank'));if(VOICE)u.voice=VOICE;u.lang=VOICE?VOICE.lang:'en-GB';u.rate=.9;speechSynthesis.speak(u);}catch(e){}}
const HAS_TTS='speechSynthesis' in window;
const sp=(t,cls='spk')=>HAS_TTS?$('button',{class:cls,title:'Listen','aria-label':'Listen',onclick(e){e.stopPropagation();speak(typeof t==='function'?t():t);}},'🔊'):null;
const COLORS=['green','blue','purple','rose'];
const score=(ok,t)=>`${ok} / ${t} — ${ok===t?'🎉 Excellent!':ok>=t*.7?'👍 Good job!':'💪 Try again!'}`;
function result(body,text,render){body.querySelector(':scope > .result')?.remove();body.append($('div',{class:'result'},$('span',{},text),$('button',{class:'btn',onclick:render},'↻ Again')));}
function grade(els){let ok=0;els.forEach(el=>{const n=el.nextElementSibling;if(n&&n.classList.contains('fix'))n.remove();const ans=el.dataset.a.split('|');const g=ans.some(a=>norm(a)===norm(el.value));el.classList.toggle('ok',g);el.classList.toggle('bad',!g);if(g)ok++;else el.after($('span',{class:'fix'},ans[0]));});return[ok,els.length];}
function checker(body,fn,render){return $('div',{class:'bar'},$('button',{class:'btn main',onclick(){const[ok,t]=fn();result(body,score(ok,t),render);}},'✓ Check'));}
const sel=(words,a)=>{const s=$('select',{},$('option',{value:''},'…'),...words.map(w=>$('option',{value:w},w)));s.dataset.a=a;return s;};

const R={
flash(s,body){
  let back=false,cards=s.cards.slice();const grid=$('div',{class:'cards'});
  const draw=()=>{grid.innerHTML='';cards.forEach(c=>{const f=$('div',{class:'fc'+(back?' flip':''),onclick(){f.classList.toggle('flip');}},
    $('div',{class:'face front'},sp(c.say||(c.en+(c.ex?'. '+c.ex:'')),'spk corner'),c.img?$('div',{class:'img',html:c.img}):c.emo?$('div',{class:'emo'},c.emo):null,$('b',{},c.en),c.tr?$('i',{},c.tr):null,c.ex?$('div',{class:'ex-s'},c.ex):null),
    $('div',{class:'face back'},$('b',{},c.ru)));grid.append(f);});};
  body.append($('div',{class:'bar'},
    $('button',{class:'btn',onclick(){cards=shuffle(cards);draw();}},'🔀 Shuffle'),
    $('button',{class:'btn',onclick(){back=!back;draw();}},'🔁 RU ↔ EN'),
    $('button',{class:'btn',onclick(){cards=s.cards.slice();back=false;draw();}},'↺ Reset')),grid);draw();
},
mcq(s,body,render){
  let ok=0,done=0;const items=s.keepItems?s.items:shuffle(s.items);const list=$('div',{class:'mcq '+(s.style||'')});
  items.forEach((it,k)=>{
    const ans=it.opts[it.a||0];const opts=s.keepOpts?it.opts:shuffle(it.opts);
    const row=$('div',{class:'q'},$('div',{class:'qt'},it.pic?$('span',{class:'pic'},it.pic):null,$('span',{html:`<em>${k+1}.</em> ${it.q}`}),s.style==='chat'?sp(it.q):null));
    const ob=$('div',{class:'opts'});
    opts.forEach(o=>{const b=$('button',{class:'opt',onclick(){if(row.dataset.d)return;row.dataset.d=1;done++;
      if(o===ans){b.classList.add('ok');ok++;}else{b.classList.add('bad');[...ob.children].find(x=>x.textContent===ans).classList.add('ok');}
      if(done===items.length)result(body,score(ok,items.length),render);}},o);ob.append(b);});
    row.append(ob);list.append(row);});
  body.append(list);
},
match(s,body,render){
  const pairs=shuffle(s.pairs).slice(0,s.take||s.pairs.length);let cur=null,left=pairs.length,miss=0;
  const A=$('div',{class:'col'}),B=$('div',{class:'col'});
  const mk=(txt,id,side)=>{const b=$('button',{class:'tile',onclick(){
    if(b.disabled)return;if(side==='A'&&s.speakA!==false)speak(txt);
    if(!cur||cur.side===side){if(cur)cur.b.classList.remove('sel');cur={b,id,side};b.classList.add('sel');return;}
    const p=cur.b;cur=null;
    if(p.dataset.id===String(id)){[p,b].forEach(x=>{x.classList.remove('sel');x.classList.add('ok');x.disabled=true;});
      if(--left===0)result(body,miss===0?'🎉 Perfect! No mistakes.':`✅ All matched! Mistakes: ${miss}`,render);}
    else{miss++;[p,b].forEach(x=>{x.classList.add('bad');setTimeout(()=>x.classList.remove('bad','sel'),450);});}
  }},txt);b.dataset.id=id;return b;};
  shuffle(pairs.map((p,i)=>[p[0],i])).forEach(([t,i])=>A.append(mk(t,i,'A')));
  shuffle(pairs.map((p,i)=>[p[1],i])).forEach(([t,i])=>B.append(mk(t,i,'B')));
  body.append($('div',{class:'match'},A,B));
},
gaps(s,body,render){
  const words=[...s.bank].sort();body.append($('div',{class:'bank'},...shuffle(s.bank).map(w=>$('span',{},w))));
  const p=$('div',{class:'text'}),sels=[];
  s.text.split(/(\{[^}]+\})/).forEach(part=>{const m=part.match(/^\{(.+)\}$/);
    if(m){const x=sel(words,m[1]);sels.push(x);p.append(x);}else p.append(document.createRange().createContextualFragment(part));});
  body.append(p,checker(body,()=>grade(sels),render));
},
label(s,body,render){
  const words=s.items.slice().sort(),sels=[];const list=$('ol',{class:'labs'});
  s.items.forEach(a=>{const x=sel(words,a);sels.push(x);list.append($('li',{},x));});
  body.append($('div',{class:'label'},$('div',{class:'fig',html:s.svg}),list),checker(body,()=>grade(sels),render));
},
order(s,body,render){
  const rows=[],box=$('div',{class:'order'});
  shuffle(s.items).slice(0,s.take||99).forEach((sent,k)=>{
    const end=(sent.match(/[.?!]$/)||[''])[0],core=sent.replace(/[.?!]$/,''),words=core.split(' ');
    let toks=shuffle(words);for(let n=0;n<5&&toks.join(' ')===core;n++)toks=shuffle(words);
    const ans=$('div',{class:'ans'}),pool=$('div',{class:'pool'});
    toks.forEach(w=>{const c=$('button',{class:'chip',onclick(){(c.parentNode===pool?ans:pool).append(c);}},w);pool.append(c);});
    const fix=$('div',{class:'ofix'});
    rows.push({ans,core,fix,sent});box.append($('div',{class:'orow'},$('em',{},(k+1)+'.'),$('div',{class:'answ'},ans,$('span',{class:'end'},end)),pool,fix));
  });
  body.append(box,checker(body,()=>{let ok=0;rows.forEach(r=>{const got=[...r.ans.children].map(c=>c.textContent).join(' ');const g=norm(got)===norm(r.core);
    r.ans.classList.toggle('ok',g);r.ans.classList.toggle('bad',!g);r.fix.textContent=g?'':'→ '+r.sent;if(g&&!r.said){r.said=1;}if(g)ok++;});return[ok,rows.length];},render));
},
spell(s,body,render){
  const ins=[],g=$('div',{class:'spell'});
  shuffle(s.items).slice(0,s.take||10).forEach(([ru,en])=>{const i=$('input',{type:'text',autocomplete:'off',autocapitalize:'off',spellcheck:'false'});i.dataset.a=en;ins.push(i);g.append($('label',{},$('span',{},ru),i));});
  body.append(g,checker(body,()=>grade(ins),render));
}};

function section(s,i){
  const box=$('section',{class:'ex c-'+(s.color||COLORS[i%4]),id:'ex'+(i+1)});
  const body=$('div',{class:'ex-body'});
  box.append(...[$('div',{class:'ex-head'},$('span',{class:'num'},String(i+1)),$('h2',{},s.title)),s.instr?$('p',{class:'instr',html:s.instr}):null,s.pre?$('div',{class:'read'},HAS_TTS?$('div',{class:'bar'},$('button',{class:'btn',onclick(){speak(box.querySelector('.read').innerText.replace('🔊 Listen',''));}},'🔊 Listen'),$('button',{class:'btn',onclick(){speechSynthesis.cancel();}},'⏹ Stop')):null,$('div',{html:s.pre})):null,body].filter(Boolean));
  const render=()=>{body.innerHTML='';R[s.type](s,body,render);};render();return box;
}

const IC={
capsule:'<svg width="70" viewBox="0 0 70 28"><rect x="2" y="2" width="66" height="24" rx="12" fill="#fffaf2" stroke="#d98c8c" stroke-width="2"/><path d="M35 2h21a12 12 0 0 1 0 24H35z" fill="#f2a7a2"/></svg>',
capsule2:'<svg width="60" viewBox="0 0 70 28"><rect x="2" y="2" width="66" height="24" rx="12" fill="#fffaf2" stroke="#e0b65a" stroke-width="2"/><path d="M35 2h21a12 12 0 0 1 0 24H35z" fill="#f4d27a"/></svg>',
tablet:'<svg width="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="#fff" stroke="#c9b8a6" stroke-width="2"/><path d="M8 22h28" stroke="#c9b8a6" stroke-width="2"/></svg>',
thermo:'<svg width="34" viewBox="0 0 34 120"><rect x="9" y="4" width="16" height="92" rx="8" fill="#fff" stroke="#9db7d0" stroke-width="2"/><rect x="14" y="40" width="6" height="60" rx="3" fill="#e46a6a"/><circle cx="17" cy="102" r="12" fill="#e46a6a"/><path d="M25 20h4M25 32h4M25 44h4M25 56h4M25 68h4" stroke="#9db7d0" stroke-width="2"/></svg>',
plaster:'<svg width="96" viewBox="0 0 96 34"><rect x="2" y="2" width="92" height="30" rx="15" fill="#f3d2b0" stroke="#d8ad85" stroke-width="2"/><rect x="34" y="6" width="28" height="22" rx="4" fill="#fbe8d4"/><g fill="#d8ad85"><circle cx="16" cy="12" r="1.6"/><circle cx="22" cy="20" r="1.6"/><circle cx="74" cy="12" r="1.6"/><circle cx="80" cy="20" r="1.6"/></g></svg>',
heart:'<svg width="40" viewBox="0 0 40 36"><path d="M20 34S2 23 2 11A9 9 0 0 1 20 7a9 9 0 0 1 18 4c0 12-18 23-18 23z" fill="#f08a8a"/><path d="M8 16h7l3-5 4 10 3-5h7" stroke="#fff" stroke-width="2.4" fill="none" stroke-linejoin="round"/></svg>',
cross:'<svg width="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#e3f0dc"/><path d="M20 10v20M10 20h20" stroke="#6aa056" stroke-width="7" stroke-linecap="round"/></svg>',
drop:'<svg width="26" viewBox="0 0 26 36"><path d="M13 2C13 2 2 16 2 23a11 11 0 0 0 22 0C24 16 13 2 13 2z" fill="#a9cdee"/></svg>',
bottle:'<svg width="44" viewBox="0 0 44 64"><rect x="10" y="2" width="24" height="10" rx="3" fill="#fff" stroke="#c9b8a6" stroke-width="2"/><rect x="4" y="12" width="36" height="50" rx="8" fill="#d99a5b"/><rect x="9" y="26" width="26" height="22" rx="3" fill="#fff8ee"/><path d="M22 30v14M15 37h14" stroke="#e46a6a" stroke-width="4"/></svg>',
leaf:'<svg width="54" viewBox="0 0 54 54"><path d="M6 48C10 20 28 6 50 4c-2 24-18 42-44 44z" fill="#bfd8b0"/><path d="M8 46C20 32 32 20 46 8" stroke="#8fb87d" stroke-width="2" fill="none"/></svg>'
};
const SPOTS=[['capsule',3,8,-30],['thermo',92,6,25],['heart',8,30,-10],['plaster',88,26,-20],['tablet',4,52,0],['leaf',93,46,10],['bottle',6,72,8],['capsule2',89,66,40],['drop',3,90,0],['cross',94,86,0],['tablet',12,96,0],['leaf',2,18,-60],['heart',95,96,15],['capsule',90,38,70],['drop',97,58,0],['plaster',4,40,60]];
const decor=$('div',{class:'decor','aria-hidden':'true'});
SPOTS.forEach(([n,x,y,r])=>{const w=$('div',{html:IC[n]}).firstChild;w.style.cssText=`left:${x}%;top:${y}%;transform:translate(-50%,-50%) rotate(${r}deg)`;decor.append(w);});

document.title=L.title;
const nav=$('nav',{},...L.sections.map((s,i)=>$('a',{href:'#ex'+(i+1)},`${i+1}. ${s.title}`)));
document.body.append(decor,$('main',{},
  $('header',{},$('span',{class:'kicker'},L.kicker),$('h1',{},L.title),$('p',{class:'sub'},L.sub)),
  nav,...L.sections.map(section),
  $('footer',{},'© Чемоданчик учителя английского')));
})();
