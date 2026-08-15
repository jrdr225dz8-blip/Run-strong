
const DAYS = {
  monday: {
    short:"Mon", title:"Strength Day 1 — Quads + Push + Abs", theme:"blue",
    exercises:[
      ex("heel_squat","Heel-Elevated Squat",3,8,10,"Quads • knee strength","quad"),
      ex("bulgarian","Bulgarian Split Squat",3,8,10,"Quads • glutes • single-leg control","quad"),
      ex("stepdown","Step-Down",2,10,12,"Knee control • quads","quad"),
      ex("incline_bench","Incline Bench Press",3,6,10,"Upper chest • triceps","push"),
      ex("db_bench","Dumbbell Bench Press",3,8,12,"Chest • triceps","push"),
      ex("lateral_raise","Dumbbell Lateral Raise",3,12,15,"Shoulders","push"),
      ex("standing_calf","Standing Calf Raise",3,10,15,"Calf • Achilles capacity","calf")
    ],
    abs:[
      ex("weighted_crunch","Weighted Crunch",3,10,15,"Abs","abs"),
      ex("hanging_raise","Hanging Knee / Leg Raise",3,8,15,"Lower abs • hip control","abs"),
      ex("reverse_crunch","Reverse Crunch",3,12,15,"Abs • pelvic control","abs"),
      ex("plank","Plank",2,45,60,"Core endurance","abs","sec")
    ],
    recovery:[
      ["Easy walk","5–10 min","Downshift after lifting"],
      ["Couch stretch","2 × 45 sec/side","Quads + hip flexors"],
      ["Straight-knee calf stretch","2 × 45 sec/side","Gastrocnemius"],
      ["Knee-to-wall ankle rocks","2 × 10/side","Ankle dorsiflexion"],
      ["Gentle quad foam roll","60–90 sec/side","Optional soreness relief"]
    ]
  },
  wednesday: {
    short:"Wed", title:"Strength Day 2 — Posterior Chain + Back + Core", theme:"blue",
    exercises:[
      ex("rdl","Romanian Deadlift",3,6,10,"Hamstrings • glutes","hinge"),
      ex("single_rdl","Single-Leg Romanian Deadlift",2,8,10,"Balance • hamstrings • glutes","hinge"),
      ex("hip_thrust","Hip Thrust",3,8,12,"Glutes","hinge"),
      ex("pullup","Pull-Ups / Assisted Pull-Ups",3,5,10,"Lats • upper back","pull"),
      ex("onearm_row","One-Arm Dumbbell Row",3,8,12,"Back • biceps","pull"),
      ex("face_pull","Band Face Pull / Pull-Apart",3,12,20,"Rear delts • upper back","pull"),
      ex("bent_calf","Bent-Knee Calf Raise",3,12,20,"Soleus • running durability","calf")
    ],
    abs:[
      ex("body_walkout","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),
      ex("pallof","Pallof Press",3,10,12,"Anti-rotation core","abs"),
      ex("deadbug","Dead Bug",3,10,12,"Trunk control","abs"),
      ex("side_plank","Side Plank",2,30,45,"Lateral core","abs","sec")
    ],
    recovery:[
      ["Easy walk","5–10 min","Circulation and cooldown"],
      ["Hamstring stretch","2 × 45 sec/side","Posterior chain"],
      ["Figure-four glute stretch","2 × 45 sec/side","Glutes + hips"],
      ["Bent-knee soleus stretch","2 × 45 sec/side","Soleus"],
      ["Gentle calf foam roll","60–90 sec/side","Optional soreness relief"]
    ]
  },
  saturday: {
    short:"Sat", title:"Strength Day 3 — Athletic Full Body + Abs", theme:"blue",
    exercises:[
      ex("reverse_lunge","Reverse Lunge",3,8,10,"Quads • glutes • balance","quad"),
      ex("stepup","Single-Leg Step-Up",3,8,10,"Quads • glutes • single-leg strength","quad"),
      ex("single_calf","Single-Leg Calf Raise",3,10,15,"Calf • Achilles","calf"),
      ex("ohp","Overhead Press",3,6,10,"Shoulders • triceps","push"),
      ex("pushup","Push-Ups / Dips",3,8,15,"Chest • triceps","push"),
      ex("lateral_raise2","Dumbbell Lateral Raise",3,12,20,"Shoulders","push"),
      ex("row_or_pull","Pull-Up or Dumbbell Row",3,8,12,"Back","pull"),
      ex("tib_raise","Tibialis Raise",3,15,25,"Shin • ankle strength","calf")
    ],
    abs:[
      ex("weighted_crunch2","Weighted Crunch",3,10,15,"Abs","abs"),
      ex("hanging_raise2","Hanging Leg Raise",3,8,12,"Lower abs","abs"),
      ex("body_walkout2","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),
      ex("reverse_crunch2","Reverse Crunch",2,15,20,"Abs","abs")
    ],
    recovery:[
      ["Easy walk","5–10 min","Cool down"],
      ["Knee-to-wall ankle rocks","2 × 10/side","Ankle mobility"],
      ["Couch stretch","2 × 45 sec/side","Quads + hip flexors"],
      ["Hamstring stretch","2 × 45 sec/side","Hamstrings"],
      ["Figure-four stretch","2 × 45 sec/side","Glutes"],
      ["Calf + soleus stretch","45 sec each/side","Lower-leg recovery"]
    ]
  }
};

function ex(id,name,sets,min,max,meta,type,unit="reps"){ return {id,name,sets,min,max,meta,type,unit}; }

const DEMOS = {
  heel_squat:["Keep heels elevated and torso tall.","Sit down between your hips.","Let knees travel forward comfortably; stop if you get sharp pain."],
  bulgarian:["Use a stance that lets the front knee bend comfortably.","Stay mostly upright to bias quads.","Drive through the whole front foot."],
  stepdown:["Stand on a low step.","Lower the opposite heel slowly for ~3 seconds.","Keep knee tracking over the middle toes."],
  incline_bench:["Set bench to a low incline.","Lower under control to upper chest.","Press without shrugging shoulders."],
  db_bench:["Shoulder blades gently back and down.","Lower dumbbells under control.","Press up without bouncing."],
  lateral_raise:["Soft elbows.","Raise to about shoulder height.","Use control; don't swing."],
  standing_calf:["Knee straight.","Rise high onto the ball of the foot.","Lower slowly through full range."],
  rdl:["Soft knees, hips travel back.","Keep weights close to legs.","Stop when hamstrings are loaded without rounding."],
  single_rdl:["Reach the free leg back.","Keep hips mostly square.","Use support for balance if needed."],
  hip_thrust:["Ribs down.","Drive through heels.","Pause and squeeze glutes at the top."],
  pullup:["Start from a controlled hang.","Pull chest toward bar.","Avoid kicking or shrugging."],
  onearm_row:["Brace on bench.","Pull elbow toward hip.","Don't twist torso."],
  face_pull:["Pull band toward face/chest.","Keep ribs down.","Squeeze shoulder blades."],
  bent_calf:["Keep knee bent the whole set.","Raise heel as high as possible.","Lower slowly."],
  reverse_lunge:["Step backward, not forward.","Keep front foot planted.","Drive up through front leg."],
  stepup:["Use a step low enough to stay controlled.","Push through the working leg.","Lower slowly."],
  single_calf:["Use support for balance.","Full rise and slow lower.","Keep ankle from rolling outward."],
  ohp:["Squeeze glutes and ribs down.","Press overhead without leaning back.","Finish with biceps near ears."],
  pushup:["Body stays in one line.","Lower chest between hands.","Stop 1–2 reps before form breaks."],
  row_or_pull:["Use whichever version you can progress consistently.","Control both directions.","Don't chase momentum."],
  tib_raise:["Heels stay planted.","Lift toes toward shins.","Pause briefly at the top."],
  weighted_crunch:["Curl ribs toward pelvis.","Move through abs, not neck.","Add load only when you own the reps."],
  weighted_crunch2:["Curl ribs toward pelvis.","Move through abs, not neck.","Add load only when you own the reps."],
  hanging_raise:["Avoid swinging.","Posteriorly tilt pelvis at the top.","Use bent knees if straight legs are too hard."],
  hanging_raise2:["Avoid swinging.","Posteriorly tilt pelvis at the top.","Use bent knees if needed."],
  reverse_crunch:["Flatten low back.","Curl pelvis toward ribs.","Lower slowly."],
  reverse_crunch2:["Flatten low back.","Curl pelvis toward ribs.","Lower slowly."],
  plank:["Squeeze glutes.","Ribs down.","Stop before hips sag."],
  body_walkout:["Start standing or from a high plank.","Walk hands forward only as far as you can brace.","Walk back without letting low back sag."],
  body_walkout2:["Brace hard before moving.","Walk hands forward slowly.","Keep hips controlled."],
  pallof:["Stand side-on to the band.","Press hands away without rotating.","Use a light band and stay square."],
  deadbug:["Low back gently pressed down.","Move opposite arm and leg.","Only go as far as you can keep control."],
  side_plank:["Elbow under shoulder.","Hips high.","Keep body in one line."]
};

const app = document.getElementById("app");
const STORAGE = "runStrong-v1";
let data = JSON.parse(localStorage.getItem(STORAGE) || '{"logs":[],"sessions":{},"checkins":{}}');
let currentTab = "today";
let deferredPrompt = null;

function save(){ localStorage.setItem(STORAGE, JSON.stringify(data)); }

function todayKey(){
  return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date()).toLowerCase();
}

function nextLiftKey(){
  const day = new Date().getDay();
  const order = [{d:1,k:"monday"},{d:3,k:"wednesday"},{d:6,k:"saturday"}];
  let match = order.find(x=>x.d>=day);
  return match ? match.k : "monday";
}

function sessionKey(dayKey){
  const d=new Date(); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,"0"); const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}-${dayKey}`;
}

function getSession(dayKey){
  const key=sessionKey(dayKey);
  if(!data.sessions[key]) data.sessions[key]={};
  return data.sessions[key];
}

function render(){
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.tab===currentTab));
  if(currentTab==="today") renderToday();
  if(currentTab==="plan") renderPlan();
  if(currentTab==="progress") renderProgress();
  if(currentTab==="recovery") renderRecovery();
}

function renderToday(){
  const raw=todayKey();
  const dayKey=DAYS[raw]?raw:nextLiftKey();
  const workout=DAYS[dayKey];
  const latestCheck = data.checkins[sessionKey(dayKey)];
  const status = getStatus(latestCheck);
  app.innerHTML = `
    <section class="hero">
      <div class="hero-top">
        <div>
          <span class="badge ${status.cls}">${status.label}</span>
          <div class="title-big">${DAYS[raw]? "Today's lift" : "Next lift"}</div>
          <div class="muted">${workout.title}</div>
        </div>
        <button id="checkBtn" class="ghost">Body check</button>
      </div>
      <div class="schedule-row">
        ${weekPills()}
      </div>
      <p class="note" style="margin-bottom:0">Hard Runna days are protected on Tuesday and Friday. Your strength defaults are Monday, Wednesday and Saturday.</p>
    </section>
    <div class="section-head"><h3>Main work</h3><small>1–3 reps in reserve</small></div>
    <div id="mainExercises"></div>
    <div class="section-head"><h3>Ab finisher</h3><small>Earn the shower</small></div>
    <div id="absExercises"></div>
    <div class="section-head"><h3>Recovery</h3><small>10–12 min</small></div>
    <section class="subsection">${renderRecoveryItems(workout.recovery)}</section>
    <div class="complete-bar"><button id="completeWorkout" class="primary">Finish workout</button></div>
  `;
  document.getElementById("checkBtn").onclick=()=>document.getElementById("checkinDialog").showModal();
  renderExercises(workout.exercises, dayKey, "mainExercises", latestCheck);
  renderExercises(workout.abs, dayKey, "absExercises", latestCheck);
  document.getElementById("completeWorkout").onclick=()=>completeWorkout(dayKey, workout);
}

function weekPills(){
  const arr=[
    ["Mon","Lift","lift"],["Tue","Hard","hard"],["Wed","Lift","lift"],["Thu","Easy",""],["Fri","Hard","hard"],["Sat","Lift","lift"],["Sun","Long","long"]
  ];
  return arr.map(([a,b,c])=>`<div class="day-pill ${c}"><strong>${a}</strong><small>${b}</small></div>`).join("");
}

function renderExercises(list, dayKey, containerId, checkin){
  const c=document.getElementById(containerId);
  c.innerHTML="";
  const session=getSession(dayKey);
  list.forEach(ex=>{
    const node=document.getElementById("exerciseTemplate").content.cloneNode(true);
    node.querySelector(".exercise-visual").innerHTML=svgFor(ex.type,ex.name);
    node.querySelector(".exercise-name").textContent=ex.name;
    node.querySelector(".exercise-meta").textContent=`${ex.sets} sets • ${ex.min}–${ex.max} ${ex.unit} • ${ex.meta}`;
    node.querySelector(".info-btn").onclick=()=>showDemo(ex);
    const grid=node.querySelector(".set-grid");
    grid.innerHTML=`<div class="hdr">Set</div><div class="hdr">Weight</div><div class="hdr">${ex.unit==="sec"?"Seconds":"Reps"}</div><div></div>`;
    const saved=session[ex.id] || [];
    const scale = fatigueScale(checkin, ex.type);
    const effectiveSets = Math.max(1, Math.round(ex.sets*scale));
    for(let i=0;i<effectiveSets;i++){
      const s=saved[i] || {};
      grid.insertAdjacentHTML("beforeend",`
        <div>${i+1}</div>
        <input inputmode="decimal" class="weight" data-i="${i}" placeholder="lb" value="${s.weight??""}">
        <input inputmode="numeric" class="reps" data-i="${i}" placeholder="${ex.unit==="sec"?"sec":"reps"}" value="${s.reps??""}">
        <button class="checkset ${s.done?"done":""}" data-i="${i}">${s.done?"✓":"○"}</button>
      `);
    }
    node.querySelectorAll("input").forEach(inp=>inp.addEventListener("change",e=>updateSet(dayKey,ex,e)));
    node.querySelectorAll(".checkset").forEach(btn=>btn.onclick=e=>{
      const i=+e.currentTarget.dataset.i;
      if(!session[ex.id]) session[ex.id]=[];
      session[ex.id][i]=session[ex.id][i]||{};
      session[ex.id][i].done=!session[ex.id][i].done;
      save(); renderToday();
    });
    const rpe=node.querySelector(".rpe-select");
    rpe.value=(session[ex.id]?.rpe)||"";
    rpe.onchange=()=>{ session[ex.id]=session[ex.id]||[]; session[ex.id].rpe=rpe.value; save(); };
    node.querySelector(".next-target").textContent=progressionText(ex);
    c.appendChild(node);
  });
}

function updateSet(dayKey,ex,e){
  const session=getSession(dayKey);
  if(!session[ex.id]) session[ex.id]=[];
  const i=+e.target.dataset.i;
  session[ex.id][i]=session[ex.id][i]||{};
  if(e.target.classList.contains("weight")) session[ex.id][i].weight=e.target.value;
  if(e.target.classList.contains("reps")) session[ex.id][i].reps=e.target.value;
  save();
}

function progressionText(ex){
  const prev=findPrevious(ex.id);
  if(!prev) return "Start conservative";
  const sets=prev.filter(x=>x && x.done);
  if(!sets.length) return "Repeat last load";
  const vals=sets.map(x=>+x.reps||0);
  const weight=+sets[0].weight||0;
  if(vals.every(v=>v>=ex.max) && weight>0) return `Next: add ${weight<40?5:5} lb`;
  if(vals.some(v=>v<ex.min)) return "Hold or reduce";
  return "Beat last reps";
}

function findPrevious(exId){
  const keys=Object.keys(data.sessions).sort().reverse();
  for(const k of keys){
    const s=data.sessions[k];
    if(s[exId]) return s[exId];
  }
  return null;
}

function fatigueScale(checkin,type){
  if(!checkin) return 1;
  const lower=["quad","hinge","calf"].includes(type);
  if(!lower) return 1;
  const maxPain=Math.max(checkin.knee,checkin.calf);
  if(maxPain>=7 || checkin.energy<=1) return .35;
  if(maxPain>=5 || checkin.soreness>=7 || checkin.energy<=2) return .65;
  return 1;
}

function getStatus(c){
  if(!c) return {label:"No check-in yet",cls:""};
  const m=Math.max(c.knee,c.calf);
  if(m>=7 || c.energy<=1) return {label:"Recovery mode",cls:"status-red"};
  if(m>=5 || c.soreness>=7 || c.energy<=2) return {label:"Reduced lower-body volume",cls:"status-yellow"};
  return {label:"Full session",cls:"status-green"};
}

function completeWorkout(dayKey,workout){
  const s=getSession(dayKey);
  const completed = [...workout.exercises,...workout.abs].reduce((n,ex)=>{
    const arr=s[ex.id]||[]; return n+arr.filter(x=>x?.done).length;
  },0);
  data.logs.unshift({date:new Date().toISOString(),dayKey,title:workout.title,completed});
  save();
  alert("Workout saved. Next week, the app will use these reps and loads to set your progression target.");
  currentTab="progress"; render();
}

function renderPlan(){
  const start = startOfWeek(new Date());
  let html="";
  for(let w=0;w<4;w++){
    const ws=new Date(start); ws.setDate(start.getDate()+w*7);
    const we=new Date(ws); we.setDate(ws.getDate()+6);
    html += `<section class="week-card">
      <div class="week-head"><div><strong>${fmtDate(ws)} – ${fmtDate(we)}</strong><div class="muted">Week ${w+1}</div></div><span class="badge">Auto-progress</span></div>
      ${calendarRow(ws,0,"Rest / mobility","rest")}
      ${calendarRow(ws,1,"Strength Day 1 — Quads + Push + Abs","")}
      ${calendarRow(ws,2,"Runna hard day","hard")}
      ${calendarRow(ws,3,"Strength Day 2 — Posterior Chain + Back + Core","")}
      ${calendarRow(ws,4,"Easy / Runna","rest")}
      ${calendarRow(ws,5,"Runna hard day","hard")}
      ${calendarRow(ws,6,"Strength Day 3 — Athletic Full Body + Abs","")}
      <div class="calendar-day"><div class="calendar-date">SUN</div><div class="event long">Long run / Runna</div></div>
    </section>`;
  }
  app.innerHTML=`<div class="section-head"><h3>Training plan</h3><small>4-week view</small></div>${html}
    <p class="note">Progression is automatic: hit the top of the rep range across all working sets with solid form and the app prompts a small load increase next time. Miss the minimum reps and it holds or reduces.</p>`;
}

function startOfWeek(d){
  const x=new Date(d); const day=x.getDay(); const diff=(day===0?-6:1-day); x.setDate(x.getDate()+diff); x.setHours(0,0,0,0); return x;
}
function fmtDate(d){return d.toLocaleDateString("en-US",{month:"short",day:"numeric"});}
function calendarRow(ws,offset,label,cls){
  const d=new Date(ws); d.setDate(ws.getDate()+offset);
  return `<div class="calendar-day"><div class="calendar-date">${d.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}<br><strong>${d.getDate()}</strong></div><div class="event ${cls}">${label}</div></div>`;
}

function renderProgress(){
  const sessions=Object.values(data.sessions);
  const finished=data.logs.length;
  const setCount=sessions.reduce((n,s)=>n+Object.values(s).reduce((m,a)=>Array.isArray(a)?m+a.filter(x=>x?.done).length:m,0),0);
  const recent=data.logs.slice(0,8);
  app.innerHTML=`
    <div class="section-head"><h3>Progress</h3><small>Stored on this device</small></div>
    <div class="metric-grid">
      <div class="metric"><small class="muted">Workouts logged</small><strong>${finished}</strong></div>
      <div class="metric"><small class="muted">Sets completed</small><strong>${setCount}</strong></div>
    </div>
    <div class="section-head"><h3>Recent</h3><small>${recent.length?"":"No workouts yet"}</small></div>
    ${recent.map(x=>`<div class="log-card"><strong>${x.title}</strong><div class="muted">${new Date(x.date).toLocaleDateString()} • ${x.completed} sets checked</div></div>`).join("")}
    <section class="subsection">
      <h4>January goal</h4>
      <p class="muted">Build muscle, keep running strong, and gradually reveal your abs. Use the same meal-prep structure, keep protein high, and avoid crash dieting.</p>
    </section>`;
}

function renderRecovery(){
  app.innerHTML=`
  <div class="section-head"><h3>Daily recovery</h3><small>Runner-focused</small></div>
  <section class="subsection">
    <h4>After lifting</h4>${renderRecoveryItems(DAYS[nextLiftKey()].recovery)}
  </section>
  <section class="subsection">
    <h4>On sore days</h4>
    <div class="recovery-list">
      ${ri("Easy walk","10–20 min","Keep it conversational")}
      ${ri("Calf isometrics","3 × 30–45 sec","Only if comfortable")}
      ${ri("Knee-to-wall ankle rocks","2 × 10/side","Gentle mobility")}
      ${ri("Light mobility","5–10 min","No forcing painful ranges")}
      ${ri("Sleep + fueling","Priority","The biggest recovery tools")}
    </div>
  </section>
  <p class="note">Stretching and foam rolling may help mobility or soreness, but they do not guarantee injury prevention or literally “flush inflammation.” Persistent swelling, sharp pain, limping, or pain that worsens from session to session deserves evaluation.</p>`;
}

function renderRecoveryItems(items){
  return `<div class="recovery-list">${items.map(x=>ri(x[0],x[1],x[2])).join("")}</div>`;
}
function ri(a,b,c){return `<div class="recovery-item"><div><strong>${a}</strong><br><small>${c}</small></div><strong>${b}</strong></div>`;}

function showDemo(ex){
  const dlg=document.getElementById("demoDialog");
  document.getElementById("demoContent").innerHTML=`
    <h2>${ex.name}</h2>
    <p class="muted">${ex.meta}</p>
    ${svgFor(ex.type,ex.name,true)}
    <div class="cues">${(DEMOS[ex.id]||["Move slowly and stay controlled.","Stop if you get sharp pain.","Progress only when form is consistent."]).map(c=>`<div class="cue">${c}</div>`).join("")}</div>
    <p class="note">The visual is a simple technique diagram, not an anatomical simulation.</p>`;
  dlg.showModal();
}
document.querySelector(".close-dialog").onclick=()=>document.getElementById("demoDialog").close();

function svgFor(type,name,large=false){
  const accent = {quad:"#59a7ff",hinge:"#8f5cff",push:"#ff9a2f",pull:"#6bdd53",calf:"#f6c445",abs:"#ff6262"}[type]||"#59a7ff";
  const label=name.replace(/&/g,"&amp;");
  return `<svg class="${large?"demo-svg":""}" viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
    <rect width="320" height="170" rx="18" fill="#0f151d"/>
    <circle cx="160" cy="48" r="16" fill="#f5f7fb"/>
    <path d="M160 64 L160 105" stroke="#f5f7fb" stroke-width="9" stroke-linecap="round"/>
    <path d="M160 78 L125 96" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
    <path d="M160 78 L195 96" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
    <path d="M160 104 L138 142" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    <path d="M160 104 L184 142" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    <line x1="78" y1="146" x2="242" y2="146" stroke="#344253" stroke-width="4" stroke-linecap="round"/>
    <text x="160" y="164" fill="#8ea0b7" text-anchor="middle" font-size="11" font-family="sans-serif">${label}</text>
  </svg>`;
}

// checkin wiring
["kneePain","calfPain","soreness"].forEach(id=>{
  const el=document.getElementById(id);
  const out=document.getElementById(id==="kneePain"?"kneeOut":id==="calfPain"?"calfOut":"soreOut");
  el.oninput=()=>out.textContent=el.value;
});
document.getElementById("saveCheckin").addEventListener("click",()=>{
  const raw=todayKey(); const dayKey=DAYS[raw]?raw:nextLiftKey();
  data.checkins[sessionKey(dayKey)]={
    knee:+document.getElementById("kneePain").value,
    calf:+document.getElementById("calfPain").value,
    soreness:+document.getElementById("soreness").value,
    energy:+document.getElementById("energy").value
  };
  save();
  setTimeout(render,0);
});

document.querySelectorAll(".nav-btn").forEach(btn=>btn.onclick=()=>{currentTab=btn.dataset.tab;render();});

// install prompt
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault(); deferredPrompt=e;
  document.getElementById("installBtn").classList.remove("hidden");
});
document.getElementById("installBtn").onclick=async()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null;
  document.getElementById("installBtn").classList.add("hidden");
};

if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js")); }
render();
