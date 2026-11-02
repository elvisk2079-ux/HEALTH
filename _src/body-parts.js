(function(){
const P=[['head',150,28,28,30],['eye',135,70,28,72],['ear',194,76,272,72],['nose',150,86,272,108],['mouth',150,102,28,112],['neck',150,124,272,142],
['shoulder',102,146,28,152],['chest',150,178,272,182],['stomach',150,250,272,248],['elbow',80,225,28,225],['hand',68,306,28,306],['leg',175,382,272,382],['knee',125,420,28,420],['foot',187,500,272,500]];
const skin='#f4cfae';
function boy(o={}){const back=o.back;return `
<g stroke="${skin}" stroke-linecap="round" fill="none">
<path d="M127 330L125 420L124 488" stroke-width="22"/><path d="M173 330L175 420L176 488" stroke-width="22"/>
<path d="M102 150L80 225L69 292" stroke-width="19"/><path d="M198 150L220 225L231 292" stroke-width="19"/>
<path d="M150 104V138" stroke-width="26"/></g>
<g stroke="${skin}" stroke-width="5" stroke-linecap="round"><path d="M61 312v12M67 314v13M73 314v12M78 309l4 8M239 312v12M233 314v13M227 314v12M222 309l-4 8"/></g>
<circle cx="68" cy="306" r="13" fill="${skin}"/><circle cx="232" cy="306" r="13" fill="${skin}"/>
<ellipse cx="112" cy="500" rx="22" ry="11" fill="${skin}"/><ellipse cx="188" cy="500" rx="22" ry="11" fill="${skin}"/>
<g fill="#e9b893"><circle cx="93" cy="499" r="4"/><circle cx="207" cy="499" r="4"/></g>
<path d="M150 130Q122 131 100 140L84 182L102 188L105 300H195L198 188L216 182L200 140Q178 131 150 130Z" fill="#fff" stroke="#a9c3df" stroke-width="3"/>
<path d="M104 296H196L199 346H157L150 320L143 346H101Z" fill="#7f9dc2"/>
<circle cx="106" cy="76" r="10" fill="${skin}"/><circle cx="194" cy="76" r="10" fill="${skin}"/>
<circle cx="150" cy="72" r="44" fill="${back?'#a8774f':skin}"/>
${back?'':`<path d="M105 74Q100 22 150 24Q202 22 195 74Q190 44 168 40Q160 52 140 46Q118 44 105 74Z" fill="#a8774f"/>
<circle cx="135" cy="70" r="4" fill="#3b3b3b"/><circle cx="165" cy="70" r="4" fill="#3b3b3b"/>
<circle cx="126" cy="88" r="6" fill="#f3a9a0" opacity=".5"/><circle cx="174" cy="88" r="6" fill="#f3a9a0" opacity=".5"/>
<path d="M151 76Q146 86 153 88" stroke="#c99472" stroke-width="2.5" fill="none" stroke-linecap="round"/>
${o.mouth?`<path d="M136 96Q150 92 164 96Q162 114 150 114Q138 114 136 96Z" fill="#9c3d47"/><path d="M138 97Q150 94 162 97V102H138Z" fill="#fff"/>${o.mouth==='tongue'?'<ellipse cx="150" cy="111" rx="9" ry="6" fill="#f08a96"/>':''}`:'<path d="M138 99Q150 109 162 99" stroke="#c46a6a" stroke-width="3" fill="none" stroke-linecap="round"/>'}`}`;}
const svg=`<svg viewBox="0 0 300 530" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A boy with numbered body parts">${boy()}
${P.map(([w,x,y,mx,my],i)=>`<line x1="${x}" y1="${y}" x2="${mx}" y2="${my}" class="ld"/><circle cx="${x}" cy="${y}" r="3" class="dot"/><circle cx="${mx}" cy="${my}" r="12" class="mk"/><text x="${mx}" y="${my+4.5}" class="mt">${i+1}</text>`).join('')}
</svg>`;
// card picture: zoom on a point and highlight it
function pic(x,y,size,r,o={}){const h=size/2;const vx=Math.max(0,Math.min(300-size,x-h)),vy=Math.max(0,Math.min(530-size,y-h));
 const mark=o.rx?`<ellipse cx="${x}" cy="${y}" rx="${o.rx}" ry="${o.ry}" class="hl"/>`:`<circle cx="${x}" cy="${y}" r="${r}" class="hl"/>`;
 return `<svg viewBox="${vx} ${vy} ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${boy(o)}${mark}</svg>`;}
const IMG={head:pic(150,62,150,0,{rx:52,ry:48}),face:pic(150,80,150,0,{rx:36,ry:34}),eye:pic(135,70,110,8),ear:pic(194,76,110,12),nose:pic(151,82,110,9),
 mouth:pic(150,101,110,0,{rx:16,ry:9}),tooth:pic(150,99,80,0,{rx:12,ry:5,mouth:'teeth'}),tongue:pic(150,110,80,0,{rx:11,ry:7,mouth:'tongue'}),
 throat:pic(150,122,130,11),neck:pic(150,122,130,0,{rx:18,ry:14}),skin:pic(74,262,150,0,{rx:12,ry:20}),
 shoulder:pic(104,146,160,15),chest:pic(150,178,180,24),back:pic(150,200,200,0,{back:true,rx:40,ry:45}),stomach:pic(150,250,180,24),
 arm:pic(86,220,200,0,{rx:15,ry:72}),elbow:pic(80,225,150,13),wrist:pic(70,292,120,10),hand:pic(68,310,120,0,{rx:18,ry:20}),finger:pic(67,324,90,7),
 leg:pic(175,410,220,0,{rx:16,ry:80}),knee:pic(125,420,160,15),ankle:pic(124,486,150,13),foot:pic(188,500,140,0,{rx:28,ry:16}),toe:pic(93,499,120,9)};
const C=[['head','/hed/','голова','🙂'],['face','/feɪs/','лицо',''],['eye — eyes','/aɪ/','глаз — глаза','👁️'],['ear — ears','/ɪə/','ухо — уши','👂'],['nose','/nəʊz/','нос','👃'],['mouth','/maʊθ/','рот','👄'],['tooth — teeth','/tuːθ/ — /tiːθ/','зуб — зубы','🦷'],['tongue','/tʌŋ/','язык','👅'],['throat','/θrəʊt/','горло',''],['neck','/nek/','шея',''],['skin','/skɪn/','кожа',''],
['shoulder','/ˈʃəʊldə/','плечо',''],['chest','/tʃest/','грудь, грудная клетка',''],['back','/bæk/','спина',''],['stomach / tummy','/ˈstʌmək/ /ˈtʌmi/','живот',''],['arm','/ɑːm/','рука (от плеча до кисти)','💪'],['elbow','/ˈelbəʊ/','локоть',''],['wrist','/rɪst/','запястье','⌚'],['hand','/hænd/','кисть руки','✋'],['finger','/ˈfɪŋɡə/','палец руки','☝️'],['leg','/leɡ/','нога','🦵'],['knee','/niː/','колено',''],['ankle','/ˈæŋkl/','лодыжка',''],['foot — feet','/fʊt/ — /fiːt/','ступня — ступни','🦶'],['toe','/təʊ/','палец ноги','']];

window.LESSON={kicker:'Health · Vocabulary 1',title:'Parts of the Body',sub:'Look, learn and play — 7 games',sections:[
{type:'flash',title:'Flashcards',instr:'Click a card to turn it over. Say the word, then check the translation. Try <b>RU ↔ EN</b> to start from Russian.',cards:C.map(([en,tr,ru])=>({en,tr,ru,img:IMG[en.split(' ')[0]]}))},
{type:'label',title:'Label the boy',instr:'Choose the right word for each number.',svg,items:P.map(p=>p[0])},
{type:'match',title:'Find the pairs',instr:'Click an English word, then its Russian translation. Press <b>Again</b> for new words.',take:8,
 pairs:[['head','голова'],['face','лицо'],['eyes','глаза'],['ears','уши'],['nose','нос'],['mouth','рот'],['teeth','зубы'],['tongue','язык'],['throat','горло'],['neck','шея'],['skin','кожа'],['shoulder','плечо'],['chest','грудь'],['back','спина'],['stomach','живот'],['arm','рука (до кисти)'],['elbow','локоть'],['wrist','запястье'],['hand','кисть руки'],['finger','палец руки'],['leg','нога'],['knee','колено'],['ankle','лодыжка'],['feet','ступни'],['toe','палец ноги']]},
{type:'mcq',title:'Which body part?',instr:'Read and choose.',items:[
 {pic:'👀',q:'You see with them.',opts:['eyes','ears','teeth']},
 {pic:'🎧',q:'You hear with them.',opts:['ears','eyes','hands']},
 {pic:'🪥',q:'You brush them twice a day.',opts:['teeth','toes','fingers']},
 {pic:'🌸',q:'You smell flowers with it.',opts:['nose','mouth','neck']},
 {pic:'🦵',q:'It is in the middle of your leg.',opts:['knee','elbow','ankle']},
 {pic:'💪',q:'It is in the middle of your arm.',opts:['elbow','knee','wrist']},
 {pic:'⌚',q:'You wear a watch on it.',opts:['wrist','ankle','neck']},
 {pic:'👟',q:'You put your shoes on them.',opts:['feet','hands','legs']},
 {pic:'💍',q:'You wear a ring on it.',opts:['finger','toe','ear']},
 {pic:'🍋',q:'It helps you to taste food.',opts:['tongue','tooth','throat']},
 {pic:'🧣',q:'You wear a scarf on it.',opts:['neck','chest','back']},
 {pic:'🤒',q:'It hurts when you have a cold and can’t swallow.',opts:['throat','stomach','chest']}]},
{type:'mcq',title:'Tricky words',instr:'<b>arm ≠ hand, leg ≠ foot, tooth → teeth, foot → feet.</b> Choose the right word.',keepOpts:true,items:[
 {q:'He wears a glove on his left ___ .',opts:['arm','hand'],a:1},
 {q:'She broke her ___ . It’s in a cast from the shoulder to the wrist.',opts:['arm','hand'],a:0},
 {q:'I have five toes on each ___ .',opts:['leg','foot'],a:1},
 {q:'The football player hurt his ___ above the knee.',opts:['leg','foot'],a:0},
 {q:'Only one ___ hurts — the one at the back.',opts:['tooth','teeth'],a:0},
 {q:'A baby has no ___ .',opts:['tooth','teeth'],a:1},
 {q:'My shoes are too small. My ___ hurt.',opts:['foot','feet'],a:1},
 {q:'Can you stand on one ___ ?',opts:['foot','feet'],a:0},
 {q:'We have ten ___ on our hands.',opts:['fingers','toes'],a:0},
 {q:'We have ten ___ on our feet.',opts:['fingers','toes'],a:1}]},
{type:'gaps',title:'Morning exercises',instr:'Read the text and choose the right words.',bank:['head','shoulders','hands','knees','toes','foot','fingers','back','face','teeth'],
 text:'Every morning I do some exercises. First, I turn my {head} left and right. Then I move my {shoulders} up and down. I put my {hands} on my {knees}, bend down and touch my {toes}. Then I stand on one {foot} and count to ten on my {fingers}. After that, I lie on my {back} on the floor and relax. Finally, I wash my {face} and brush my {teeth}. Now I’m ready for the day!'},
{type:'spell',title:'Spelling challenge',instr:'Write the English word. Press <b>Again</b> for 10 new words.',take:10,items:[['глаз','eye'],['уши','ears'],['зубы','teeth'],['язык','tongue'],['горло','throat'],['шея','neck'],['плечо','shoulder'],['спина','back'],['живот','stomach|tummy'],['локоть','elbow'],['запястье','wrist'],['колено','knee'],['лодыжка','ankle'],['ступни','feet'],['палец ноги','toe'],['палец руки','finger'],['лицо','face'],['кожа','skin'],['грудь','chest'],['нос','nose'],['рот','mouth'],['голова','head'],['кисть руки','hand'],['нога','leg']]}
]};
})();
