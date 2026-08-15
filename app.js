
const STORAGE="runStrong-final-v1";
let data=JSON.parse(localStorage.getItem(STORAGE)||'{}');
if(!data.sessions)data.sessions={};
if(!data.logs)data.logs=[];
if(!data.checkins)data.checkins={};
if(!data.schedule)data.schedule={monday:"monday",wednesday:"wednesday",saturday:"saturday"};
if(!data.customWorkouts)data.customWorkouts={};
let currentTab="today";
let guided=null;
let restTimer=null;
let movingDay=null;

const quotes=[
 "You've got work to do. Let's get stronger.",
 "Show up today. Your future miles will thank you.",
 "Strong legs. Calm mind. Keep moving.",
 "Build the body that carries you farther.",
 "Train smart today. Run strong tomorrow.",
 "Consistency beats hype. Get the work done.",
 "A little stronger every week.",
 "Do the work. Protect the run."
];

function E(id,name,sets,min,max,meta,type,unit="reps",photo=null){
 return {id,name,sets,min,max,meta,type,unit,photo};
}
const BASE={
 monday:{
  id:"monday",name:"Quads + Push",duration:"50–65 min",
  blocks:[
   {name:"A",kind:"solo",rest:120,items:[E("heel_squat","Heel-Elevated Squat",3,8,10,"Quads • knee strength","quad")]},
   {name:"B",kind:"superset",rest:90,items:[E("incline_bench","Incline Bench Press",3,6,10,"Upper chest • triceps","push","reps","photo-incline.jpg"),E("standing_calf","Standing Calf Raise",3,10,15,"Calf • Achilles capacity","calf")]},
   {name:"C",kind:"superset",rest:90,items:[E("bulgarian","Bulgarian Split Squat",3,8,10,"Quads • glutes","quad"),E("lateral_raise","Dumbbell Lateral Raise",3,12,15,"Shoulders","push","reps","photo-lateral.jpg")]},
   {name:"D",kind:"superset",rest:75,items:[E("stepdown","Step-Down",2,10,12,"Knee control • quads","quad"),E("db_bench","Dumbbell Bench Press",2,8,12,"Chest • triceps","push","reps","photo-bench.jpg")]}
  ],
  abs:{name:"ABS",rounds:3,rest:60,items:[E("weighted_crunch","Weighted Crunch",3,10,15,"Abs","abs"),E("hanging_raise","Hanging Knee / Leg Raise",3,8,15,"Lower abs","abs"),E("reverse_crunch","Reverse Crunch",3,12,15,"Abs","abs"),E("plank","Plank",3,45,60,"Core endurance","abs","sec")]},
  recovery:[["Easy walk","5–10 min"],["Couch stretch","2 × 45 sec/side"],["Straight-knee calf stretch","2 × 45 sec/side"],["Knee-to-wall ankle rocks","2 × 10/side"]]
 },
 wednesday:{
  id:"wednesday",name:"Posterior + Back",duration:"50–65 min",
  blocks:[
   {name:"A",kind:"solo",rest:120,items:[E("rdl","Romanian Deadlift",3,6,10,"Hamstrings • glutes","hinge")]},
   {name:"B",kind:"superset",rest:90,items:[E("pullup","Pull-Ups / Assisted Pull-Ups",3,5,10,"Lats • upper back","pull"),E("bent_calf","Bent-Knee Calf Raise",3,12,20,"Soleus","calf")]},
   {name:"C",kind:"superset",rest:90,items:[E("hip_thrust","Hip Thrust",3,8,12,"Glutes","hinge"),E("onearm_row","One-Arm Dumbbell Row",3,8,12,"Back • biceps","pull")]},
   {name:"D",kind:"superset",rest:75,items:[E("single_rdl","Single-Leg Romanian Deadlift",2,8,10,"Balance • hamstrings","hinge"),E("face_pull","Band Face Pull / Pull-Apart",2,12,20,"Rear delts • upper back","pull")]}
  ],
  abs:{name:"ABS",rounds:3,rest:60,items:[E("body_walkout","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),E("pallof","Pallof Press",3,10,12,"Anti-rotation core","abs"),E("deadbug","Dead Bug",3,10,12,"Trunk control","abs"),E("side_plank","Side Plank",3,30,45,"Lateral core","abs","sec")]},
  recovery:[["Easy walk","5–10 min"],["Hamstring stretch","2 × 45 sec/side"],["Figure-four stretch","2 × 45 sec/side"],["Bent-knee soleus stretch","2 × 45 sec/side"]]
 },
 saturday:{
  id:"saturday",name:"Athletic Full Body",duration:"50–65 min",
  blocks:[
   {name:"A",kind:"solo",rest:105,items:[E("reverse_lunge","Reverse Lunge",3,8,10,"Quads • glutes","quad")]},
   {name:"B",kind:"superset",rest:90,items:[E("ohp","Overhead Press",3,6,10,"Shoulders • triceps","push","reps","photo-ohp.jpg"),E("single_calf","Single-Leg Calf Raise",3,10,15,"Calf • Achilles","calf")]},
   {name:"C",kind:"superset",rest:90,items:[E("stepup","Single-Leg Step-Up",3,8,10,"Quads • glutes","quad"),E("row_or_pull","Pull-Up or Dumbbell Row",3,8,12,"Back","pull")]},
   {name:"D",kind:"superset",rest:75,items:[E("pushup","Push-Ups / Dips",3,8,15,"Chest • triceps","push","reps","photo-pushup.jpg"),E("tib_raise","Tibialis Raise",3,15,25,"Shin • ankle strength","calf")]},
   {name:"E",kind:"solo",rest:60,items:[E("lateral_raise2","Dumbbell Lateral Raise",2,12,20,"Shoulders","push","reps","photo-lateral.jpg")]}
  ],
  abs:{name:"ABS",rounds:3,rest:60,items:[E("weighted_crunch2","Weighted Crunch",3,10,15,"Abs","abs"),E("hanging_raise2","Hanging Leg Raise",3,8,12,"Lower abs","abs"),E("body_walkout2","Bodyweight Walkout",3,6,12,"Anti-extension core","abs"),E("reverse_crunch2","Reverse Crunch",3,15,20,"Abs","abs")]},
  recovery:[["Easy walk","5–10 min"],["Knee-to-wall ankle rocks","2 × 10/side"],["Couch stretch","2 × 45 sec/side"],["Hamstring stretch","2 × 45 sec/side"],["Calf + soleus stretch","45 sec each/side"]]
 }
};
const DAYS=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const DL={monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat",sunday:"Sun"};
const app=document.getElementById("app");
function save(){localStorage.setItem(STORAGE,JSON.stringify(data))}
function todayKey(){return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date()).toLowerCase()}
function greet(){let h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"}
function quote(){let d=new Date();let n=Math.floor(d.getTime()/86400000);return quotes[n%quotes.length]}
function workoutById(id){return BASE[id]||data.customWorkouts[id]||null}
function workoutForDay(day){return workoutById(data.schedule[day])}
function countExercises(w){return w.blocks.reduce((n,b)=>n+b.items.length,0)+(w.abs?.items.length||0)}
function checkKey(id){return new Date().toISOString().slice(0,10)+"-"+id}
function checkStatus(id){let c=data.checkins[checkKey(id)];if(!c)return{txt:"Body check recommended",cls:""};let p=Math.max(c.knee,c.calf);if(p>=7||c.energy<=1)return{txt:"Recovery mode",cls:"bad"};if(p>=5||c.sore>=7||c.energy<=2)return{txt:"Reduced lower-body volume",cls:"warn"};return{txt:"Full session",cls:"good"}}

function render(){
 document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.tab===currentTab));
 if(currentTab==="today")renderToday();
 if(currentTab==="plan")renderPlan();
 if(currentTab==="progress")renderProgress();
 if(currentTab==="recovery")renderRecovery();
}
function renderToday(){
 const day=todayKey(), w=workoutForDay(day), wid=data.schedule[day], st=wid?checkStatus(wid):null;
 app.innerHTML=`
  <div class="hello">${greet()},</div>
  <div class="erick">Erick.</div>
  <div class="quote">${quote()}</div>
  ${w?`
  <section class="today-card">
   <div class="kicker">TODAY • ${DL[day].toUpperCase()}</div>
   <div class="workout-title">${w.name}</div>
   <div class="meta"><span>${countExercises(w)} exercises</span><span>${w.duration}</span></div>
   <div class="status-row"><span class="status ${st.cls}">${st.txt}</span><button class="small-btn" id="bodyBtn">Body check</button></div>
   <div class="actions"><button class="primary" id="startBtn">▶ Start workout</button><button class="secondary" id="previewBtn">◉ Preview workout</button></div>
  </section>`:
  `<section class="today-card"><div class="kicker">TODAY • ${DL[day].toUpperCase()}</div><div class="workout-title">Rest / Runna day</div><div class="quote" style="margin:6px 0 0">No strength session scheduled today.</div></section>`}
  <div class="section-head"><h3>WEEK AT A GLANCE</h3><button class="text-btn" id="editWeek">Edit week</button></div>
  <div class="week-strip">${DAYS.map(d=>weekChip(d,day)).join("")}</div>
  <p class="note" style="margin-top:12px">Tap any day to move, replace, remove, or add a workout.</p>`;
 if(w){
   document.getElementById("startBtn").onclick=()=>startGuided(wid,w);
   document.getElementById("previewBtn").onclick=()=>renderPreview(wid,w);
   document.getElementById("bodyBtn").onclick=()=>document.getElementById("bodyDialog").showModal();
 }
 document.getElementById("editWeek").onclick=()=>{currentTab="plan";render()};
 document.querySelectorAll(".day-chip").forEach(b=>b.onclick=()=>openDayOptions(b.dataset.day));
}
function weekChip(day,today){
 const w=workoutForDay(day);
 return `<button class="day-chip ${day===today?"active":""} ${w?"has-workout":""}" data-day="${day}"><strong>${DL[day]}</strong><small>${w?w.name:"Rest"}</small></button>`;
}

function renderPlan(){
 app.innerHTML=`
 <div class="section-head"><h3>WEEK OVERVIEW & REARRANGE</h3><button class="text-btn" id="addWorkoutTop">+ Add workout</button></div>
 <div class="plan-grid">${DAYS.map(d=>planRow(d)).join("")}</div>
 <p class="note">Tap a day to move its workout to another day, replace it, remove it, or add a workout to an empty day.</p>`;
 document.querySelectorAll(".plan-row").forEach(r=>r.onclick=()=>openDayOptions(r.dataset.day));
 document.getElementById("addWorkoutTop").onclick=()=>openAddWorkout();
}
function planRow(day){
 const w=workoutForDay(day);
 return `<div class="plan-row" data-day="${day}"><div class="plan-date">${DL[day].toUpperCase()}</div><div class="plan-copy"><strong>${w?w.name:"Rest / no lift"}</strong><small>${w?w.duration:"Tap to add workout"}</small></div><button class="drag">☰</button></div>`;
}

function openDayOptions(day){
 movingDay=day;
 const w=workoutForDay(day);
 const mc=document.getElementById("moveContent");
 mc.innerHTML=`<button class="x" onclick="moveDialog.close()">×</button><h2>${DL[day]} ${w?"— "+w.name:""}</h2>
 <div class="option-grid">
  ${w?`<button class="option" id="previewDay">Preview this workout</button><button class="option" id="startDay">Start this workout</button><button class="option" id="moveDay">Move to another day</button><button class="option" id="replaceDay">Replace workout</button><button class="option danger" id="removeDay">Remove from ${DL[day]}</button>`:`<button class="option" id="addHere">+ Add workout to ${DL[day]}</button>`}
 </div>`;
 moveDialog.showModal();
 if(w){
  document.getElementById("previewDay").onclick=()=>{moveDialog.close();renderPreview(data.schedule[day],w)};
  document.getElementById("startDay").onclick=()=>{moveDialog.close();startGuided(data.schedule[day],w)};
  document.getElementById("moveDay").onclick=()=>showMoveTargets(day);
  document.getElementById("replaceDay").onclick=()=>{moveDialog.close();openAddWorkout(day,true)};
  document.getElementById("removeDay").onclick=()=>{delete data.schedule[day];save();moveDialog.close();render()};
 } else document.getElementById("addHere").onclick=()=>{moveDialog.close();openAddWorkout(day)};
}
function showMoveTargets(from){
 const mc=document.getElementById("moveContent");
 mc.innerHTML=`<button class="x" onclick="moveDialog.close()">×</button><h2>Move workout</h2><p class="muted">Choose the new day.</p><div class="option-grid">${DAYS.filter(d=>d!==from).map(d=>`<button class="option move-target" data-day="${d}">${DL[d]} ${workoutForDay(d)?"— swap with "+workoutForDay(d).name:"— empty"}</button>`).join("")}</div>`;
 document.querySelectorAll(".move-target").forEach(b=>b.onclick=()=>{
   const to=b.dataset.day, a=data.schedule[from], other=data.schedule[to];
   data.schedule[to]=a;
   if(other)data.schedule[from]=other; else delete data.schedule[from];
   save();moveDialog.close();render();
 });
}

function openAddWorkout(targetDay=null,replace=false){
 const presets=Object.values(BASE).map(w=>({id:w.id,name:w.name,duration:w.duration}));
 const customs=Object.entries(data.customWorkouts).map(([id,w])=>({id,name:w.name,duration:w.duration||"Custom"}));
 const ac=document.getElementById("addContent");
 ac.innerHTML=`<button class="x" onclick="addDialog.close()">×</button><h2>Add workout</h2><div class="option-grid">
 ${[...presets,...customs].map(w=>`<button class="option add-preset" data-id="${w.id}"><b>${w.name}</b><br><small class="muted">${w.duration}</small></button>`).join("")}
 </div><div class="section-head"><h3>Create custom</h3></div>
 <div class="add-form"><input id="customName" placeholder="Workout name"><input id="customDuration" placeholder="Duration e.g. 30–40 min"><button class="secondary" id="createCustom">Create custom workout</button></div>`;
 addDialog.showModal();
 document.querySelectorAll(".add-preset").forEach(b=>b.onclick=()=>chooseWorkoutForDay(b.dataset.id,targetDay,replace));
 document.getElementById("createCustom").onclick=()=>{
   const name=document.getElementById("customName").value.trim(),duration=document.getElementById("customDuration").value.trim()||"Custom";
   if(!name)return;
   const id="custom_"+Date.now();
   data.customWorkouts[id]={id,name,duration,blocks:[{name:"A",kind:"solo",rest:90,items:[E(id+"_exercise","Custom Exercise",3,8,12,"Edit later","custom")]}],abs:null,recovery:[["Easy walk","5–10 min"]]};
   save(); chooseWorkoutForDay(id,targetDay,replace);
 };
}
function chooseWorkoutForDay(id,targetDay,replace){
 if(targetDay){data.schedule[targetDay]=id;save();addDialog.close();render();return}
 addDialog.close();
 const ac=document.getElementById("addContent");
 ac.innerHTML=`<button class="x" onclick="addDialog.close()">×</button><h2>Choose day</h2><div class="option-grid">${DAYS.map(d=>`<button class="option add-target" data-day="${d}">${DL[d]} ${workoutForDay(d)?"— replace "+workoutForDay(d).name:"— empty"}</button>`).join("")}</div>`;
 addDialog.showModal();
 document.querySelectorAll(".add-target").forEach(b=>b.onclick=()=>{data.schedule[b.dataset.day]=id;save();addDialog.close();render()});
}

function renderPreview(id,w){
 currentTab="today";
 app.innerHTML=`<div class="guided-top"><button class="secondary" id="backPrev">← Back</button><div></div><span></span></div>
 <div class="kicker">WORKOUT PREVIEW</div><div class="workout-title">${w.name}</div><div class="meta"><span>${countExercises(w)} exercises</span><span>${w.duration}</span></div>
 <div style="height:10px"></div>
 ${w.blocks.map(b=>previewBlock(b)).join("")}
 ${w.abs?previewAbs(w.abs):""}
 <button class="primary" style="width:100%;margin-top:8px" id="startPrev">▶ Start workout</button>`;
 document.getElementById("backPrev").onclick=()=>render();
 document.getElementById("startPrev").onclick=()=>startGuided(id,w);
 wireVideos();
}
function previewBlock(b){
 return `<section class="preview-card"><div class="block-title"><span class="block-letter">${b.name}</span><div><b>${b.kind==="solo"?"SOLO":"SUPERSET"}</b><div class="block-note">${b.kind==="solo"?`Rest ${fmt(b.rest)} between sets`:`Exercise 1 → exercise 2 → rest ${fmt(b.rest)}`}</div></div></div>${b.items.map((x,i)=>exerciseLine(x,i+1)).join("")}</section>`;
}
function previewAbs(a){
 return `<section class="preview-card"><div class="block-title"><span class="block-letter">ABS</span><div><b>AB CIRCUIT</b><div class="block-note">${a.rounds} rounds • rest ${fmt(a.rest)} after each round</div></div></div>${a.items.map((x,i)=>exerciseLine(x,i+1)).join("")}</section>`;
}
function exerciseLine(x,n){
 return `<div class="exercise-line"><b>${n}</b><div><b>${x.name}</b><small>${x.sets} × ${x.min}–${x.max} ${x.unit} • ${x.meta}</small></div>${x.photo?`<img class="thumb" src="${x.photo}" alt="">`:`<button class="video-pill" data-q="${encodeURIComponent(x.name)}">▶ Video</button>`}</div>`;
}
function wireVideos(){document.querySelectorAll(".video-pill").forEach(b=>b.onclick=()=>window.open(`https://www.youtube.com/results?search_query=${b.dataset.q}+exercise+tutorial`,"_blank"))}

function startGuided(id,w){
 guided={id,w,steps:buildSteps(w),i:0,done:0};renderGuided();
}
function buildSteps(w){
 let s=[];
 w.blocks.forEach(b=>{
  const rounds=Math.max(...b.items.map(x=>x.sets));
  for(let r=1;r<=rounds;r++)b.items.forEach((x,j)=>{if(r<=x.sets)s.push({block:b.name,mode:b.kind,round:r,ex:x,rest:b.kind==="solo"?b.rest:(j===b.items.length-1?b.rest:0)})});
 });
 if(w.abs)for(let r=1;r<=w.abs.rounds;r++)w.abs.items.forEach((x,j)=>s.push({block:"ABS",mode:"circuit",round:r,ex:x,rest:j===w.abs.items.length-1?w.abs.rest:0}));
 return s;
}
function renderGuided(){
 const g=guided,st=g.steps[g.i];if(!st){finishGuided();return}
 app.innerHTML=`<div class="guided-top"><button class="secondary" id="exitG">×</button><div class="progressbar"><span style="width:${Math.round((g.i/g.steps.length)*100)}%"></span></div><div class="muted">${g.i+1}/${g.steps.length}</div></div>
 <section class="focus-card">
  <div class="kicker">BLOCK ${st.block} • ${st.mode.toUpperCase()} • ROUND ${st.round}</div>
  <h1>${st.ex.name}</h1><div class="big-target">${st.ex.min}–${st.ex.max} ${st.ex.unit}</div><div class="muted">${st.ex.meta}</div>
  <button class="secondary" style="width:100%;margin-top:14px" id="videoG">▶ Watch exercise video</button>
  ${photoGuide(st.ex)}
  <div class="howto">${cues(st.ex.type).map(x=>`<div>${x}</div>`).join("")}</div>
  <div class="log-grid"><label>Weight (lb)<input id="weightG" inputmode="decimal" placeholder="lb"></label><label>${st.ex.unit==="sec"?"Seconds":"Reps"}<input id="repsG" inputmode="numeric" placeholder="${st.ex.unit==="sec"?"sec":"reps"}"></label></div>
  <div class="next">${nextText()}</div>
  <button class="primary" style="width:100%;margin-top:12px" id="doneG">Complete set</button>
 </section>`;
 document.getElementById("exitG").onclick=()=>{guided=null;render()};
 document.getElementById("videoG").onclick=()=>window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(st.ex.name+" exercise tutorial")}`,"_blank");
 document.getElementById("doneG").onclick=()=>{logSet(st);if(st.rest>0)startRest(st.rest);else{g.i++;renderGuided()}};
}
function photoGuide(ex){
 if(ex.photo)return `<div class="photo-guide"><img src="${ex.photo}" alt="${ex.name} example"><div class="photo-labels"><span>START / SETUP</span><span>FINISH / WORK</span></div></div>`;
 return `<div class="photo-guide"><div style="padding:18px;text-align:center;color:#777">No built-in photo yet — use the video above for this exercise.</div></div>`;
}
function cues(type){
 const c={
  quad:["Keep the whole foot planted.","Let the knee track over the middle toes.","Control the lowering portion."],
  hinge:["Push hips back.","Keep the load close to your body.","Stop before your back rounds."],
  push:["Set shoulders down and back.","Lower under control.","Press without bouncing."],
  pull:["Keep ribs controlled.","Pull with elbows, not momentum.","Control the return."],
  calf:["Use full range.","Pause at the top.","Lower slowly."],
  abs:["Brace before moving.","Keep the low back controlled.","Stop before form breaks."]
 };return c[type]||["Move slowly and stay controlled.","Use clean reps.","Stop for sharp pain."];
}
function nextText(){
 const g=guided,cur=g.steps[g.i],n=g.steps[g.i+1];if(!n)return"Last set — finish strong.";
 if(cur.rest===0)return`Next: ${n.ex.name} immediately — no rest.`;
 return`After this set: rest ${fmt(cur.rest)}, then ${n.ex.name}.`;
}
function logSet(st){
 let k=new Date().toISOString().slice(0,10)+"-"+guided.id;if(!data.sessions[k])data.sessions[k]={};if(!data.sessions[k][st.ex.id])data.sessions[k][st.ex.id]=[];
 data.sessions[k][st.ex.id].push({weight:document.getElementById("weightG").value,reps:document.getElementById("repsG").value,done:true});guided.done++;save();
}
function startRest(sec){
 let r=sec;
 app.innerHTML=`<section class="rest-screen"><div class="kicker">REST</div><div class="rest-time" id="rt">${fmt(r)}</div><div class="quote">Next: ${guided.steps[guided.i+1]?.ex.name||"Workout complete"}</div><button class="secondary" id="skipR">End rest early</button></section>`;
 clearInterval(restTimer);restTimer=setInterval(()=>{r--;let e=document.getElementById("rt");if(e)e.textContent=fmt(r);if(r<=0){clearInterval(restTimer);guided.i++;renderGuided()}},1000);
 document.getElementById("skipR").onclick=()=>{clearInterval(restTimer);guided.i++;renderGuided()};
}
function finishGuided(){
 data.logs.unshift({date:new Date().toISOString(),title:guided.w.name,sets:guided.done});save();guided=null;
 app.innerHTML=`<section class="rest-screen"><div class="rest-time" style="color:#fff">✓</div><div class="workout-title">Workout complete</div><div class="quote">Built for runners. Made to get stronger.</div><button class="primary" id="toRec">Recovery next</button></section>`;
 document.getElementById("toRec").onclick=()=>{currentTab="recovery";render()};
}
function fmt(s){let m=Math.floor(s/60),r=s%60;return r?`${m}:${String(r).padStart(2,"0")}`:`${m}:00`}

function renderProgress(){
 let sets=Object.values(data.sessions).reduce((n,s)=>n+Object.values(s).reduce((m,a)=>m+a.filter(x=>x.done).length,0),0);
 app.innerHTML=`<div class="section-head"><h3>PROGRESS</h3></div><div class="stat-grid"><div class="stat"><span class="muted">Workouts</span><b>${data.logs.length}</b></div><div class="stat"><span class="muted">Sets logged</span><b>${sets}</b></div></div><div class="section-head"><h3>RECENT</h3></div>${data.logs.slice(0,10).map(x=>`<div class="recovery-card"><b>${x.title}</b><br><small>${new Date(x.date).toLocaleDateString()} • ${x.sets} sets</small></div>`).join("")||'<div class="muted">No workouts logged yet.</div>'}`;
}
function renderRecovery(){
 const day=todayKey(),w=workoutForDay(day);
 const list=w?.recovery||[["Easy walk","10–20 min"],["Gentle mobility","5–10 min"],["Sleep + fueling","Priority"]];
 app.innerHTML=`<div class="section-head"><h3>RECOVERY</h3></div>${list.map(x=>`<div class="recovery-card"><b>${x[0]}</b><br><small>${x[1]}</small></div>`).join("")}<p class="note">Mobility and foam rolling can help soreness or range of motion, but persistent swelling, sharp pain, limping, or worsening pain deserves evaluation.</p>`;
}

// body check
["knee","calf","sore"].forEach(id=>{let el=document.getElementById(id),out=document.getElementById(id==="knee"?"kneeOut":id==="calf"?"calfOut":"soreOut");el.oninput=()=>out.textContent=el.value});
document.getElementById("saveBody").onclick=()=>{
 const day=todayKey(),id=data.schedule[day];if(id){data.checkins[checkKey(id)]={knee:+knee.value,calf:+calf.value,sore:+sore.value,energy:+energy.value};save();setTimeout(render,0)}
};

document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{currentTab=b.dataset.tab;render()});
document.getElementById("menuBtn").onclick=()=>openAddWorkout();
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
save();render();
