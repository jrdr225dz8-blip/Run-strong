
const STORAGE="runStrong-v2";
let state=JSON.parse(localStorage.getItem(STORAGE)||'{"logs":[],"sessions":{},"checkins":{}}');
let currentTab="today";
let activeWorkout=null;
let timerInt=null;
let deferredPrompt=null;

function E(id,name,sets,min,max,meta,type,unit="reps",videoQ=null){
  return {id,name,sets,min,max,meta,type,unit,videoQ:videoQ||name+" exercise form"};
}

const DAYS={
 monday:{
  short:"Mon",title:"Strength Day 1 — Quads + Push + Abs",
  blocks:[
   {name:"A",kind:"solo",rest:120,items:[E("heel_squat","Heel-Elevated Squat",3,8,10,"Quads • knee strength","quad")]},
   {name:"B",kind:"superset",rest:90,items:[
     E("incline_bench","Incline Bench Press",3,6,10,"Upper chest • triceps","push"),
     E("standing_calf","Standing Calf Raise",3,10,15,"Calf • Achilles capacity","calf")
   ]},
   {name:"C",kind:"superset",rest:90,items:[
     E("bulgarian","Bulgarian Split Squat",3,8,10,"Quads • glutes • single-leg","quad"),
     E("lateral_raise","Dumbbell Lateral Raise",3,12,15,"Shoulders","push")
   ]},
   {name:"D",kind:"superset",rest:75,items:[
     E("stepdown","Step-Down",2,10,12,"Knee control • quads","quad"),
     E("db_bench","Dumbbell Bench Press",2,8,12,"Chest • triceps","push")
   ]}
  ],
  abs:{name:"ABS",kind:"circuit",rounds:3,rest:60,items:[
    E("weighted_crunch","Weighted Crunch",3,10,15,"Abs","abs"),
    E("hanging_raise","Hanging Knee / Leg Raise",3,8,15,"Lower abs • hip control","abs"),
    E("reverse_crunch","Reverse Crunch",3,12,15,"Abs • pelvic control","abs"),
    E("plank","Plank",3,45,60,"Core endurance","abs","sec")
  ]},
  recovery:[
   ["Easy walk","5–10 min","Downshift after lifting"],
   ["Couch stretch","2 × 45 sec/side","Quads + hip flexors"],
   ["Straight-knee calf stretch","2 × 45 sec/side","Gastrocnemius"],
   ["Knee-to-wall ankle rocks","2 × 10/side","Ankle dorsiflexion"],
   ["Gentle quad foam roll","60–90 sec/side","Optional soreness relief"]
  ]
 },
 wednesday:{
  short:"Wed",title:"Strength Day 2 — Posterior Chain + Back + Core",
  blocks:[
   {name:"A",kind:"solo",rest:120,items:[E("rdl","Romanian Deadlift",3,6,10,"Hamstrings • glutes","hinge")]},
   {name:"B",kind:"superset",rest:90,items:[
     E("pullup","Pull-Ups / Assisted Pull-Ups",3,5,10,"Lats • upper back","pull"),
     E("bent_calf","Bent-Knee Calf Raise",3,12,20,"Soleus • running durability","calf")
   ]},
   {name:"C",kind:"superset",rest:90,items:[
     E("hip_thrust","Hip Thrust",3,8,12,"Glutes","hinge"),
     E("onearm_row","One-Arm Dumbbell Row",3,8,12,"Back • biceps","pull")
   ]},
   {name:"D",kind:"superset",rest:75,items:[
     E("single_rdl","Single-Leg Romanian Deadlift",2,8,10,"Balance • hamstrings • glutes","hinge"),
     E("face_pull","Band Face Pull / Pull-Apart",2,12,20,"Rear delts • upper back","pull")
   ]}
  ],
  abs:{name:"ABS",kind:"circuit",rounds:3,rest:60,items:[
    E("body_walkout","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),
    E("pallof","Pallof Press",3,10,12,"Anti-rotation core","abs"),
    E("deadbug","Dead Bug",3,10,12,"Trunk control","abs"),
    E("side_plank","Side Plank",3,30,45,"Lateral core","abs","sec")
  ]},
  recovery:[
   ["Easy walk","5–10 min","Circulation and cooldown"],
   ["Hamstring stretch","2 × 45 sec/side","Posterior chain"],
   ["Figure-four glute stretch","2 × 45 sec/side","Glutes + hips"],
   ["Bent-knee soleus stretch","2 × 45 sec/side","Soleus"],
   ["Gentle calf foam roll","60–90 sec/side","Optional soreness relief"]
  ]
 },
 saturday:{
  short:"Sat",title:"Strength Day 3 — Athletic Full Body + Abs",
  blocks:[
   {name:"A",kind:"solo",rest:105,items:[E("reverse_lunge","Reverse Lunge",3,8,10,"Quads • glutes • balance","quad")]},
   {name:"B",kind:"superset",rest:90,items:[
     E("ohp","Overhead Press",3,6,10,"Shoulders • triceps","push"),
     E("single_calf","Single-Leg Calf Raise",3,10,15,"Calf • Achilles","calf")
   ]},
   {name:"C",kind:"superset",rest:90,items:[
     E("stepup","Single-Leg Step-Up",3,8,10,"Quads • glutes • single-leg strength","quad"),
     E("row_or_pull","Pull-Up or Dumbbell Row",3,8,12,"Back","pull")
   ]},
   {name:"D",kind:"superset",rest:75,items:[
     E("pushup","Push-Ups / Dips",3,8,15,"Chest • triceps","push"),
     E("tib_raise","Tibialis Raise",3,15,25,"Shin • ankle strength","calf")
   ]},
   {name:"E",kind:"solo",rest:60,items:[E("lateral_raise2","Dumbbell Lateral Raise",2,12,20,"Shoulders","push")]}
  ],
  abs:{name:"ABS",kind:"circuit",rounds:3,rest:60,items:[
    E("weighted_crunch2","Weighted Crunch",3,10,15,"Abs","abs"),
    E("hanging_raise2","Hanging Leg Raise",3,8,12,"Lower abs","abs"),
    E("body_walkout2","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),
    E("reverse_crunch2","Reverse Crunch",3,15,20,"Abs","abs")
  ]},
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

const app=document.getElementById("app");
function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function todayKey(){return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date()).toLowerCase()}
function nextLiftKey(){const d=new Date().getDay();if(d<=1)return"monday";if(d<=3)return"wednesday";if(d<=6)return"saturday";return"monday"}
function sessionKey(dayKey){return new Date().toISOString().slice(0,10)+"-"+dayKey}
function getSession(dayKey){const k=sessionKey(dayKey);if(!state.sessions[k])state.sessions[k]={};return state.sessions[k]}
function getStatus(c){if(!c)return{label:"Body check recommended",cls:""};const m=Math.max(c.knee,c.calf);if(m>=7||c.energy<=1)return{label:"Recovery mode",cls:"status-red"};if(m>=5||c.soreness>=7||c.energy<=2)return{label:"Reduced lower-body volume",cls:"status-yellow"};return{label:"Full session",cls:"status-green"}}
function render(){
 document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.tab===currentTab));
 if(currentTab==="today")renderToday();
 if(currentTab==="plan")renderPlan();
 if(currentTab==="progress")renderProgress();
 if(currentTab==="recovery")renderRecovery();
}
function renderToday(){
 const raw=todayKey(), dayKey=DAYS[raw]?raw:nextLiftKey(), w=DAYS[dayKey], c=state.checkins[sessionKey(dayKey)], status=getStatus(c);
 app.innerHTML=`
 <section class="hero">
  <div class="hero-top"><div><span class="badge ${status.cls}">${status.label}</span><div class="title-big">${DAYS[raw]?"Today's lift":"Next lift"}</div><div class="muted">${w.title}</div></div><button id="checkBtn" class="ghost">Body check</button></div>
  <div class="schedule-row">${weekPills()}</div>
 </section>
 <section class="runna-card">
  <div class="runna-kicker">TODAY'S SESSION</div>
  <h2>${w.title}</h2>
  <p class="muted">Follow the blocks in order. <strong>Superset</strong> = exercise 1 → exercise 2 → rest. <strong>Solo</strong> = one set → rest → repeat.</p>
  ${w.blocks.map(blockCard).join("")}
  ${circuitCard(w.abs)}
  <button class="primary big-start" id="startGuided">Start guided workout</button>
 </section>
 <div class="section-head"><h3>Recovery after</h3><small>10–12 min</small></div>
 <section class="subsection">${renderRecoveryItems(w.recovery)}</section>`;
 document.getElementById("checkBtn").onclick=()=>document.getElementById("checkinDialog").showModal();
 document.getElementById("startGuided").onclick=()=>startGuided(dayKey,w);
 wireVideoButtons();
}
function blockCard(b){
 return `<div class="training-block">
  <div class="block-head"><span class="block-letter">${b.name}</span><div><strong>${b.kind==="solo"?"SOLO":"SUPERSET"}</strong><small>${b.kind==="solo"?`Rest ${fmtSec(b.rest)} between sets`:`No rest between exercises • rest ${fmtSec(b.rest)} after the pair`}</small></div></div>
  ${b.items.map((x,i)=>exerciseRow(x,`${b.name}${i+1}`)).join("")}
 </div>`;
}
function circuitCard(c){
 return `<div class="training-block circuit"><div class="block-head"><span class="block-letter">${c.name}</span><div><strong>AB CIRCUIT — ${c.rounds} ROUNDS</strong><small>Move exercise to exercise • rest ${fmtSec(c.rest)} after each round</small></div></div>${c.items.map((x,i)=>exerciseRow(x,`${i+1}`)).join("")}</div>`;
}
function exerciseRow(x,label){
 return `<div class="exercise-row"><div class="exercise-index">${label}</div><div class="exercise-copy"><strong>${x.name}</strong><small>${x.sets} × ${x.min}–${x.max} ${x.unit} • ${x.meta}</small></div><button class="video-btn" data-q="${encodeURIComponent(x.videoQ)}">▶ Video</button></div>`;
}
function wireVideoButtons(){
 document.querySelectorAll(".video-btn").forEach(b=>b.onclick=()=>{
   const q=decodeURIComponent(b.dataset.q);
   window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q+" tutorial")}`,"_blank");
 });
}
function weekPills(){return [["Mon","Lift","lift"],["Tue","Hard","hard"],["Wed","Lift","lift"],["Thu","Easy",""],["Fri","Hard","hard"],["Sat","Lift","lift"],["Sun","Long","long"]].map(([a,b,c])=>`<div class="day-pill ${c}"><strong>${a}</strong><small>${b}</small></div>`).join("")}
function fmtSec(s){const m=Math.floor(s/60),r=s%60;return r?`${m}:${String(r).padStart(2,"0")}`:`${m}:00`}
function startGuided(dayKey,w){activeWorkout={dayKey,w,steps:buildSteps(w),i:0,done:0};renderGuided()}
function buildSteps(w){
 let steps=[];
 w.blocks.forEach(b=>{
  const rounds=Math.max(...b.items.map(x=>x.sets));
  for(let r=1;r<=rounds;r++){
   b.items.forEach((x,j)=>{if(r<=x.sets)steps.push({block:b.name,mode:b.kind,ex:x,round:r,rest:(b.kind==="solo"?b.rest:(j===b.items.length-1?b.rest:0))})});
  }
 });
 for(let r=1;r<=w.abs.rounds;r++){w.abs.items.forEach((x,j)=>steps.push({block:"ABS",mode:"circuit",ex:x,round:r,rest:(j===w.abs.items.length-1?w.abs.rest:0)}))}
 return steps;
}
function renderGuided(){
 const a=activeWorkout,step=a.steps[a.i];if(!step){finishGuided();return}
 app.innerHTML=`
 <section class="guided-top"><button class="ghost" id="exitGuide">Exit</button><div class="guided-progress"><span style="width:${Math.round((a.i/a.steps.length)*100)}%"></span></div><div class="muted">${a.i+1}/${a.steps.length}</div></section>
 <section class="focus-card">
  <div class="focus-label">BLOCK ${step.block} • ${step.mode.toUpperCase()} • ROUND ${step.round}</div>
  <h1>${step.ex.name}</h1><p class="target">${step.ex.min}–${step.ex.max} ${step.ex.unit}</p><p class="muted">${step.ex.meta}</p>
  <button class="video-hero" id="watchVideo">▶ Watch real video example</button>
  <div class="last-performance">${targetText(step.ex,findPrevious(step.ex.id))}</div>
  <div class="log-inputs"><label>Weight<input id="gWeight" inputmode="decimal" placeholder="lb"></label><label>${step.ex.unit==="sec"?"Seconds":"Reps"}<input id="gReps" inputmode="numeric" placeholder="${step.ex.unit==="sec"?"sec":"reps"}"></label></div>
  <div class="next-instruction">${nextInstruction(a.i)}</div>
  <button class="primary guided-done" id="doneSet">Complete set</button>
 </section>`;
 document.getElementById("exitGuide").onclick=()=>{activeWorkout=null;render()};
 document.getElementById("watchVideo").onclick=()=>window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(step.ex.videoQ+" tutorial")}`,"_blank");
 document.getElementById("doneSet").onclick=()=>{logGuidedSet(step);if(step.rest>0)startRest(step.rest);else{a.i++;renderGuided()}};
}
function nextInstruction(i){
 const a=activeWorkout,cur=a.steps[i],n=a.steps[i+1];if(!n)return"Last set — finish strong.";
 if(cur.rest===0)return`Next: ${n.ex.name} immediately — no rest.`;
 if(n.block===cur.block)return`After this set: rest ${fmtSec(cur.rest)}, then ${n.ex.name}.`;
 return`After this set: rest ${fmtSec(cur.rest)}, then start Block ${n.block}: ${n.ex.name}.`;
}
function logGuidedSet(step){
 const s=getSession(activeWorkout.dayKey);if(!s[step.ex.id])s[step.ex.id]=[];
 s[step.ex.id].push({weight:document.getElementById("gWeight").value,reps:document.getElementById("gReps").value,done:true,ts:Date.now()});
 activeWorkout.done++;save();
}
function startRest(sec){
 let remain=sec;
 app.innerHTML=`<section class="rest-screen"><div class="rest-kicker">REST</div><div class="rest-time" id="restTime">${fmtSec(remain)}</div><div class="muted">Next up</div><h2>${activeWorkout.steps[activeWorkout.i+1]?.ex.name||"Workout complete"}</h2><button class="ghost" id="skipRest">Skip rest</button></section>`;
 clearInterval(timerInt);
 timerInt=setInterval(()=>{remain--;const el=document.getElementById("restTime");if(el)el.textContent=fmtSec(remain);if(remain<=0){clearInterval(timerInt);activeWorkout.i++;renderGuided()}},1000);
 document.getElementById("skipRest").onclick=()=>{clearInterval(timerInt);activeWorkout.i++;renderGuided()};
}
function finishGuided(){
 const a=activeWorkout;state.logs.unshift({date:new Date().toISOString(),dayKey:a.dayKey,title:a.w.title,completed:a.done});save();activeWorkout=null;
 app.innerHTML=`<section class="finish-card"><div class="finish-emoji">✓</div><h1>Workout complete</h1><p>${a.done} working sets logged.</p><button class="primary" id="backToday">Recovery next</button></section>`;
 document.getElementById("backToday").onclick=()=>{currentTab="recovery";render()};
}
function findPrevious(id){const keys=Object.keys(state.sessions).sort().reverse();for(const k of keys){if(state.sessions[k][id]?.length)return state.sessions[k][id]}return null}
function targetText(ex,prev){
 if(!prev)return"First logged session: start conservative and leave 1–3 good reps in reserve.";
 const sets=prev.filter(x=>x?.done),vals=sets.map(x=>+x.reps||0),wt=sets.map(x=>+x.weight||0).filter(Boolean).pop();
 if(vals.length&&vals.every(v=>v>=ex.max)&&wt)return`Last time you topped the range. Try a small load increase from ${wt} lb.`;
 if(vals.some(v=>v<ex.min))return"Last time reps fell below the target. Hold or slightly reduce the load.";
 return wt?`Last logged load: ${wt} lb. Try to beat your previous reps with clean form.`:"Beat your previous reps with clean form.";
}
function renderPlan(){
 const start=startOfWeek(new Date());let html="";
 for(let w=0;w<4;w++){const ws=new Date(start);ws.setDate(start.getDate()+w*7);const we=new Date(ws);we.setDate(ws.getDate()+6);
 html+=`<section class="week-card"><div class="week-head"><div><strong>${fmtDate(ws)} – ${fmtDate(we)}</strong><div class="muted">Week ${w+1}</div></div><span class="badge">Auto-progress</span></div>${cal(ws,0,"Strength Day 1","")}${cal(ws,1,"Runna hard day","hard")}${cal(ws,2,"Strength Day 2","")}${cal(ws,3,"Easy / Runna","rest")}${cal(ws,4,"Runna hard day","hard")}${cal(ws,5,"Strength Day 3","")}${cal(ws,6,"Long run / Runna","long")}</section>`}
 app.innerHTML=`<div class="section-head"><h3>Training calendar</h3><small>Runna-style layout</small></div>${html}`;
}
function startOfWeek(d){const x=new Date(d),day=x.getDay(),diff=(day===0?-6:1-day);x.setDate(x.getDate()+diff);x.setHours(0,0,0,0);return x}
function fmtDate(d){return d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}
function cal(ws,o,label,cls){const d=new Date(ws);d.setDate(ws.getDate()+o);return `<div class="calendar-day"><div class="calendar-date">${d.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}<br><strong>${d.getDate()}</strong></div><div class="event ${cls}">${label}</div></div>`}
function renderProgress(){
 const sessions=Object.values(state.sessions),finished=state.logs.length,setCount=sessions.reduce((n,s)=>n+Object.values(s).reduce((m,a)=>Array.isArray(a)?m+a.filter(x=>x?.done).length:m,0),0);
 app.innerHTML=`<div class="section-head"><h3>Progress</h3><small>Saved on this iPhone</small></div><div class="metric-grid"><div class="metric"><small class="muted">Workouts</small><strong>${finished}</strong></div><div class="metric"><small class="muted">Sets logged</small><strong>${setCount}</strong></div></div><div class="section-head"><h3>Recent</h3></div>${state.logs.slice(0,10).map(x=>`<div class="log-card"><strong>${x.title}</strong><div class="muted">${new Date(x.date).toLocaleDateString()} • ${x.completed} sets</div></div>`).join("")||'<p class="muted">No workouts yet.</p>'}`;
}
function renderRecovery(){const key=DAYS[todayKey()]?todayKey():nextLiftKey();app.innerHTML=`<div class="section-head"><h3>Recovery</h3><small>Runner-focused</small></div><section class="subsection">${renderRecoveryItems(DAYS[key].recovery)}</section>`}
function renderRecoveryItems(items){return `<div class="recovery-list">${items.map(x=>`<div class="recovery-item"><div><strong>${x[0]}</strong><br><small>${x[2]}</small></div><strong>${x[1]}</strong></div>`).join("")}</div>`}

["kneePain","calfPain","soreness"].forEach(id=>{
 const el=document.getElementById(id),out=document.getElementById(id==="kneePain"?"kneeOut":id==="calfPain"?"calfOut":"soreOut");
 el.oninput=()=>out.textContent=el.value;
});
document.getElementById("saveCheckin").addEventListener("click",()=>{
 const raw=todayKey(),dayKey=DAYS[raw]?raw:nextLiftKey();
 state.checkins[sessionKey(dayKey)]={knee:+document.getElementById("kneePain").value,calf:+document.getElementById("calfPain").value,soreness:+document.getElementById("soreness").value,energy:+document.getElementById("energy").value};
 save();setTimeout(render,0);
});
document.querySelector(".close-dialog").onclick=()=>document.getElementById("demoDialog").close();
document.querySelectorAll(".nav-btn").forEach(btn=>btn.onclick=()=>{currentTab=btn.dataset.tab;render()});
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
render();
