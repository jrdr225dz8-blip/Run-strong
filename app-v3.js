
const STORAGE="runStrong-final-v2";
let state=JSON.parse(localStorage.getItem(STORAGE)||'{}');
state.sessions ||= {}; state.logs ||= []; state.checkins ||= {}; state.custom ||= {};
state.schedule ||= {monday:"runner_push",wednesday:"runner_posterior",saturday:"runner_full"};
let tab="today", guided=null, timer=null, libTab="muscle";
const BUILD="clean-images-v4";
const RAW="https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
function IMG(id,n=0){return `${RAW}${id}/${n}.jpg`}
const Q=[
 "You've got work to do. Let's get stronger.",
 "Show up today. Your future miles will thank you.",
 "Strong today. Durable tomorrow.",
 "Train smart. Run strong.",
 "Build the body that carries you farther.",
 "Consistency beats intensity you can't recover from.",
 "The goal is strength you can use for miles.",
];

function E(id,name,sets,min,max,rest,meta,cues){
 return {id,name,sets,min,max,rest,meta,cues,img0:IMG(id,0),img1:IMG(id,1)};
}
const EX={
 squat:E("Barbell_Squat","Barbell Squat",4,6,10,120,"Quads • glutes",["Brace before descending.","Knees track over toes.","Drive through the whole foot."]),
 goblet:E("Goblet_Squat","Goblet Squat",3,10,15,90,"Quads • glutes",["Hold weight close to chest.","Sit between the hips.","Keep the whole foot down."]),
 lunge:E("Dumbbell_Lunges","Dumbbell Reverse/Walking Lunge",3,8,12,90,"Quads • glutes",["Use a controlled step.","Front knee tracks cleanly.","Drive through the front foot."]),
 bulgarian:E("Split_Squat_with_Dumbbells","Bulgarian Split Squat",3,8,12,90,"Quads • glutes",["Stay tall.","Use a comfortable stance.","Control the lowering phase."]),
 rdl:E("Romanian_Deadlift","Romanian Deadlift",4,6,10,120,"Hamstrings • glutes",["Push hips back.","Keep the load close.","Stop before your back rounds."]),
 stiff:E("Stiff-Legged_Barbell_Deadlift","Stiff-Leg Barbell Deadlift",3,8,12,105,"Hamstrings • glutes",["Soft knees.","Hinge at the hips.","Feel hamstrings load."]),
 hip:E("Barbell_Hip_Thrust","Barbell Hip Thrust",4,8,12,90,"Glutes",["Ribs down.","Drive through heels.","Pause at lockout."]),
 calf:E("Standing_Calf_Raises","Standing Calf Raise",4,10,18,75,"Calves • Achilles",["Use full range.","Pause high.","Lower slowly."]),
 seatedcalf:E("Seated_Calf_Raise","Bent-Knee Calf Raise",3,15,20,60,"Soleus",["Keep knee bent.","Drive through forefoot.","Use slow eccentrics."]),
 tib:E("Dorsiflexion","Tibialis Raise",3,15,25,60,"Tibialis anterior",["Keep heels down.","Lift toes toward shins.","Control the return."]),
 bench:E("Dumbbell_Bench_Press","Dumbbell Bench Press",4,6,10,105,"Chest • triceps",["Set shoulder blades.","Lower under control.","Press without bouncing."]),
 incline:E("Incline_Dumbbell_Press","Incline Dumbbell Press",3,8,12,90,"Upper chest • triceps",["Use a low incline.","Keep shoulders packed.","Control the bottom."]),
 pushup:E("Pushups","Push-Ups",3,10,20,60,"Chest • triceps",["Body stays in one line.","Lower chest between hands.","Stop before form breaks."]),
 fly:E("Dumbbell_Flyes","Dumbbell Fly",3,10,15,75,"Chest",["Soft elbows.","Open under control.","Squeeze without clanking weights."]),
 row:E("Bent_Over_Barbell_Row","Bent-Over Barbell Row",4,6,10,105,"Back • biceps",["Hinge and brace.","Pull toward lower ribs.","Control the lowering."]),
 onerow:E("One-Arm_Dumbbell_Row","One-Arm Dumbbell Row",4,8,12,90,"Lats • upper back",["Brace on bench.","Pull elbow toward hip.","Do not rotate torso."]),
 pullup:E("Pullups","Pull-Ups",4,5,10,105,"Lats • biceps",["Start controlled.","Pull chest toward bar.","Avoid kicking."]),
 invrow:E("Inverted_Row","Inverted Row",3,8,15,75,"Upper back • biceps",["Keep body rigid.","Pull chest to bar.","Lower slowly."]),
 shrug:E("Dumbbell_Shrug","Dumbbell Shrug",3,10,15,75,"Traps",["Arms stay long.","Elevate shoulders straight up.","Pause briefly."]),
 rear:E("Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench","Rear Delt Raise",3,12,18,60,"Rear delts • upper back",["Use light weight.","Lead with elbows.","No swinging."]),
 ohp:E("Dumbbell_Shoulder_Press","Dumbbell Shoulder Press",4,6,10,90,"Shoulders • triceps",["Ribs down.","Press vertically.","Finish without leaning back."]),
 lateral:E("Side_Lateral_Raise","Dumbbell Lateral Raise",3,12,20,60,"Side delts",["Soft elbows.","Raise to shoulder height.","Do not swing."]),
 front:E("Front_Dumbbell_Raise","Front Dumbbell Raise",3,10,15,60,"Front delts",["Stay tall.","Lift with control.","Avoid leaning."]),
 curl:E("Barbell_Curl","Barbell Curl",4,8,12,75,"Biceps",["Elbows stay near sides.","Curl without hip drive.","Lower fully."]),
 hammer:E("Alternate_Hammer_Curl","Hammer Curl",3,10,15,60,"Biceps • forearms",["Neutral grip.","Upper arm stays quiet.","Control down."]),
 inclinecurl:E("Alternate_Incline_Dumbbell_Curl","Incline Dumbbell Curl",3,8,12,60,"Biceps",["Let arms hang.","Do not move shoulders.","Squeeze at top."]),
 closebench:E("Close-Grip_Barbell_Bench_Press","Close-Grip Bench Press",4,6,10,90,"Triceps • chest",["Hands inside normal bench grip.","Keep elbows controlled.","Press smoothly."]),
 tricepext:E("Standing_Dumbbell_Triceps_Extension","Dumbbell Triceps Extension",3,10,15,60,"Triceps",["Keep elbows pointed forward.","Lower behind head.","Extend without arching."]),
 benchdip:E("Bench_Dips","Bench Dips",3,8,15,60,"Triceps",["Keep shoulders comfortable.","Lower under control.","Use legs to scale difficulty."]),
 plank:E("Plank","Plank",3,40,60,45,"Abs • trunk","Brace abs and glutes.","Keep ribs down.","Stop before hips sag."]),
 bike:E("Air_Bike","Bicycle Crunch",3,12,20,45,"Abs • obliques",["Low back controlled.","Rotate through torso.","Move slowly."]),
 crunch:E("Crunches","Crunch",3,15,25,45,"Abs",["Curl ribs toward pelvis.","Do not pull neck.","Exhale at top."]),
 legraise:E("Flat_Bench_Lying_Leg_Raise","Lying Leg Raise",3,10,15,60,"Lower abs",["Keep low back controlled.","Lower slowly.","Bend knees if needed."]),
 sideplank:E("Side_Bridge","Side Plank",3,30,45,45,"Obliques • lateral core",["Elbow under shoulder.","Hips high.","Body stays long."]),
 deadbug:E("Dead_Bug","Dead Bug",3,8,12,45,"Deep core",["Press low back gently down.","Move opposite arm and leg.","Only extend as far as you control."]),
 armcircles:E("Arm_Circles","Arm Circles",2,20,30,20,"Warm-up • shoulders",["Small circles first.","Stay relaxed.","Reverse direction."]),
 jumping:E("Star_Jump","Jumping Jacks",2,30,45,30,"Warm-up • full body",["Land softly.","Keep rhythm easy.","Use as warm-up, not max effort."]),
 hamstretch:E("90_90_Hamstring","90/90 Hamstring Mobility",2,10,15,30,"Warm-up • hamstrings",["Move gently.","Do not force range.","Breathe normally."]),
 quadstretch:E("All_Fours_Quad_Stretch","Quad / Hip Flexor Stretch",2,30,45,20,"Recovery • quads",["Keep hips extended.","Use comfortable tension.","No bouncing."]),
};

const WORKOUTS={
 runner_push:{name:"Quads + Push",cat:"program",duration:"50–65 min",desc:"Runner-friendly quad work paired with chest and shoulder strength.",xs:[EX.armcircles,EX.squat,EX.incline,EX.bulgarian,EX.lateral,EX.calf,EX.pushup,EX.plank]},
 runner_posterior:{name:"Posterior + Back",cat:"program",duration:"50–65 min",desc:"Hamstrings, glutes, back, soleus and trunk strength for running durability.",xs:[EX.hamstretch,EX.rdl,EX.pullup,EX.hip,EX.onerow,EX.seatedcalf,EX.rear,EX.deadbug]},
 runner_full:{name:"Athletic Full Body",cat:"program",duration:"50–65 min",desc:"Balanced athletic strength without burying your legs before Runna sessions.",xs:[EX.jumping,EX.lunge,EX.ohp,EX.calf,EX.onerow,EX.goblet,EX.pushup,EX.tib,EX.lateral,EX.plank]},
 chest:{name:"Chest",cat:"muscle",duration:"55–65 min",desc:"A complete chest session using your bench, dumbbells and bodyweight.",xs:[EX.armcircles,EX.bench,EX.incline,EX.fly,EX.pushup,EX.closebench]},
 back:{name:"Back",cat:"muscle",duration:"55–65 min",desc:"An hour of lats, rows, upper-back and trap work using your rack and weights.",xs:[EX.armcircles,EX.row,EX.pullup,EX.onerow,EX.invrow,EX.rear,EX.shrug]},
 shoulders:{name:"Shoulders",cat:"muscle",duration:"50–60 min",desc:"Pressing plus side, front and rear-delt volume.",xs:[EX.armcircles,EX.ohp,EX.lateral,EX.front,EX.rear,EX.pushup]},
 arms:{name:"Arms",cat:"muscle",duration:"50–60 min",desc:"Dedicated biceps and triceps session with enough volume to feel it.",xs:[EX.armcircles,EX.curl,EX.closebench,EX.hammer,EX.tricepext,EX.inclinecurl,EX.benchdip]},
 biceps:{name:"Biceps",cat:"muscle",duration:"45–55 min",desc:"Biceps and forearm-focused session.",xs:[EX.armcircles,EX.curl,EX.hammer,EX.inclinecurl,EX.onerow,EX.pullup]},
 triceps:{name:"Triceps",cat:"muscle",duration:"45–55 min",desc:"Heavy pressing and direct triceps work.",xs:[EX.armcircles,EX.closebench,EX.tricepext,EX.benchdip,EX.pushup,EX.ohp]},
 legs:{name:"Legs",cat:"muscle",duration:"55–70 min",desc:"Complete lower-body session: quads, hamstrings, glutes and calves.",xs:[EX.hamstretch,EX.squat,EX.rdl,EX.lunge,EX.hip,EX.calf,EX.seatedcalf,EX.tib]},
 quads:{name:"Quads",cat:"muscle",duration:"45–60 min",desc:"Quad-focused work with single-leg control and knee-strength emphasis.",xs:[EX.jumping,EX.squat,EX.goblet,EX.bulgarian,EX.lunge,EX.calf]},
 posterior:{name:"Hamstrings + Glutes",cat:"muscle",duration:"50–60 min",desc:"Posterior-chain strength for power and running durability.",xs:[EX.hamstretch,EX.rdl,EX.stiff,EX.hip,EX.lunge,EX.seatedcalf]},
 calves:{name:"Calves + Achilles",cat:"muscle",duration:"30–40 min",desc:"Lower-leg capacity work for calves, soleus, Achilles and shins.",xs:[EX.calf,EX.seatedcalf,EX.tib,EX.lunge]},
 abs:{name:"Abs + Core",cat:"muscle",duration:"35–45 min",desc:"Flexion, anti-extension, lateral core and hip-control work.",xs:[EX.plank,EX.bike,EX.crunch,EX.legraise,EX.sideplank,EX.deadbug]},
 upper:{name:"Upper Body",cat:"program",duration:"55–65 min",desc:"Chest, back, shoulders and arms in one balanced session.",xs:[EX.armcircles,EX.bench,EX.row,EX.ohp,EX.pullup,EX.lateral,EX.hammer,EX.tricepext]},
 lower:{name:"Lower Body",cat:"program",duration:"55–65 min",desc:"Balanced lower-body strength emphasizing runner durability.",xs:[EX.hamstretch,EX.squat,EX.rdl,EX.bulgarian,EX.hip,EX.calf,EX.tib]},
};

const app=document.getElementById("app"), modal=document.getElementById("modal"), mc=document.getElementById("modalContent");
function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function today(){return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date()).toLowerCase()}
function greet(){let h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"}
function quote(){let n=Math.floor(Date.now()/86400000);return Q[n%Q.length]}
function W(id){return WORKOUTS[id]||state.custom[id]||null}
function scheduled(day){return W(state.schedule[day])}
function currentCheck(){return state.checkins[new Date().toISOString().slice(0,10)]||null}
function saveCheck(c){state.checkins[new Date().toISOString().slice(0,10)]=c;save()}
function completeThisWeek(){
 const now=new Date(), start=new Date(now); let wd=(now.getDay()+6)%7; start.setDate(now.getDate()-wd);start.setHours(0,0,0,0);
 return state.logs.filter(x=>new Date(x.date)>=start).length;
}
function plannedCount(){return Object.values(state.schedule).filter(Boolean).length}
function readiness(){
 const c=currentCheck(); if(!c)return {k:"—",c:"—",a:"—",cls:"warn"};
 return {k:c.knee<=3?"✓":c.knee<=5?"!":"×",c:c.calf<=3?"✓":c.calf<=5?"!":"×",a:c.calf<=3?"✓":c.calf<=5?"!":"×",cls:Math.max(c.knee,c.calf)<=3?"good":Math.max(c.knee,c.calf)<=5?"warn":"bad"};
}
function render(){
 document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 if(tab==="today")renderToday();if(tab==="workouts")renderLibrary();if(tab==="progress")renderProgress();if(tab==="recovery")renderRecovery();
}
function renderToday(){
 let d=today(),wid=state.schedule[d],w=W(wid),done=completeThisWeek(),planned=plannedCount(),r=readiness();
 let next=nextWorkout(d);
 app.innerHTML=`<div class="hello">${greet()},</div><div class="erick">Erick.</div><div class="quote">${quote()}</div>
 ${w?`<section class="today-card"><div class="kicker">TODAY • ${d.slice(0,3).toUpperCase()}</div><div class="workout-title">${w.name}</div><div class="meta"><span>${w.xs.length} exercises</span><span>${w.duration}</span></div><div class="statusrow"><span class="status">${currentCheck()?"Readiness saved":"Body check recommended"}</span><button class="small-btn" id="bodyBtn">Body check</button></div><div class="actions"><button class="primary" id="startToday">▶ Start workout</button><button class="secondary" id="previewToday">◉ Preview workout</button></div></section>`:
 `<section class="today-card"><div class="kicker">TODAY • ${d.slice(0,3).toUpperCase()}</div><div class="workout-title">Rest / Runna day</div><div class="quote" style="margin:5px 0 0">No strength session scheduled.</div></section>`}
 <div class="section-head"><h3>WEEK AT A GLANCE</h3><button class="text-btn" id="editWeek">Edit week</button></div>
 <div class="week-strip">${["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(x=>`<button class="day-chip ${x===d?"active":""}" data-day="${x}"><strong>${x.slice(0,3)}</strong><small>${scheduled(x)?.name||"Rest"}</small></button>`).join("")}</div>
 <div class="home-lower">
  <section class="weekly-card"><div class="kicker">THIS WEEK</div><div class="row-between" style="margin-top:8px"><b>${planned} Strength Sessions</b><span class="muted">${done}/${planned} Complete</span></div><div class="progressline"><span style="width:${planned?Math.min(100,done/planned*100):0}%"></span></div></section>
  <section class="next-card"><div class="kicker">NEXT UP</div>${next?`<div class="next-name">${next.w.name}</div><div class="muted">${next.label.toUpperCase()} • ${next.w.duration}</div><button class="text-btn" id="nextView" style="padding:9px 0">View workout →</button>`:`<div class="muted" style="margin-top:8px">Nothing else scheduled this week.</div>`}</section>
  <section class="readiness-card"><div class="row-between"><div class="kicker">RUN READINESS</div><button class="text-btn" id="readinessBtn">Update</button></div><div class="readiness-pills"><div class="ready-pill ${r.cls}">Knees ${r.k}</div><div class="ready-pill ${r.cls}">Calves ${r.c}</div><div class="ready-pill ${r.cls}">Achilles ${r.a}</div></div></section>
 </div>`;
 if(w){startToday.onclick=()=>startGuided(wid,w);previewToday.onclick=()=>preview(wid,w);bodyBtn.onclick=()=>bodyDialog.showModal()}
 editWeek.onclick=()=>editWeek();
 readinessBtn.onclick=()=>bodyDialog.showModal();
 document.querySelectorAll(".day-chip").forEach(b=>b.onclick=()=>dayMenu(b.dataset.day));
 if(next)nextView.onclick=()=>preview(next.id,next.w);
}
function nextWorkout(from){
 const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];let i=days.indexOf(from);
 for(let k=1;k<=7;k++){let d=days[(i+k)%7],id=state.schedule[d];if(id)return {label:d,id,w:W(id)}}return null;
}
function renderLibrary(){
 const items=Object.entries(WORKOUTS).filter(([id,w])=>libTab==="all"||w.cat===libTab);
 app.innerHTML=`<div class="section-head"><h3>WORKOUTS</h3><button class="text-btn" id="customBtn">+ Custom</button></div>
 <div class="tabs"><button class="tabbtn ${libTab==="muscle"?"active":""}" data-lt="muscle">By Muscle</button><button class="tabbtn ${libTab==="program"?"active":""}" data-lt="program">Programs</button><button class="tabbtn ${libTab==="all"?"active":""}" data-lt="all">All</button></div>
 <div class="library-grid">${items.map(([id,w])=>`<button class="library-card" data-w="${id}"><div><strong>${w.name}</strong><small>${w.duration} • ${w.xs.length} exercises</small></div><span class="arrow">›</span></button>`).join("")}</div>`;
 document.querySelectorAll(".tabbtn").forEach(b=>b.onclick=()=>{libTab=b.dataset.lt;renderLibrary()});
 document.querySelectorAll(".library-card").forEach(b=>b.onclick=()=>workoutDetail(b.dataset.w));
 customBtn.onclick=()=>customBuilder();
}
function workoutDetail(id){
 let w=W(id);
 app.innerHTML=`<button class="secondary" id="backLib">← Workouts</button><div style="height:12px"></div>
 <section class="workout-hero"><img src="${w.xs[1]?.img0||w.xs[0].img0}" onerror="this.src='${EX.pushup.img0}'"><div class="inner"><div class="kicker">WORKOUT</div><div class="workout-title">${w.name}</div><div class="meta"><span>${w.duration}</span><span>${w.xs.length} exercises</span></div><p class="desc">${w.desc}</p></div></section>
 ${w.xs.map((x,i)=>exercisePreviewCard(x,i+1)).join("")}
 <div class="actions"><button class="primary" id="startDetail">▶ Start workout</button><button class="secondary" id="scheduleDetail">+ Add to calendar</button></div>`;
 backLib.onclick=()=>renderLibrary();startDetail.onclick=()=>startGuided(id,w);scheduleDetail.onclick=()=>schedulePicker(id);
}
function exercisePreviewCard(x,n){return `<section class="exercise-card"><div class="exercise-top"><b>${n}</b><div><b>${x.name}</b><small>${x.sets} sets • ${x.min}–${x.max} reps • rest ${x.rest}s</small></div><span class="arrow">›</span></div><div class="thumbs"><img src="${x.img0}" onerror="this.src='${EX.pushup.img0}'"><img src="${x.img1}" onerror="this.src='${EX.pushup.img1}'"></div><div class="labels"><span>START</span><span>FINISH</span></div></section>`}
function preview(id,w){workoutDetail(id)}
function dayMenu(day){
 let id=state.schedule[day],w=W(id);mc.innerHTML=`<button class="x" onclick="modal.close()">×</button><h2>${day[0].toUpperCase()+day.slice(1)}</h2><div class="modal-list">
 ${w?`<button class="option" id="p">Preview ${w.name}</button><button class="option" id="s">Start ${w.name}</button><button class="option" id="m">Move / swap day</button><button class="option" id="r">Replace workout</button><button class="option danger" id="d">Remove workout</button>`:`<button class="option" id="a">+ Add workout</button>`}</div>`;modal.showModal();
 if(w){p.onclick=()=>{modal.close();workoutDetail(id)};s.onclick=()=>{modal.close();startGuided(id,w)};m.onclick=()=>movePicker(day);r.onclick=()=>libraryPicker(day);d.onclick=()=>{delete state.schedule[day];save();modal.close();render()}} else a.onclick=()=>libraryPicker(day);
}
function editWeek(){
 app.innerHTML=`<div class="section-head"><h3>EDIT WEEK</h3><button class="text-btn" id="addAny">+ Add workout</button></div>${["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(d=>`<div class="plan-row" data-day="${d}"><b>${d.slice(0,3).toUpperCase()}</b><div><strong>${scheduled(d)?.name||"Rest"}</strong><small>${scheduled(d)?.duration||"Tap to add"}</small></div><button class="drag">☰</button></div>`).join("")}`;
 document.querySelectorAll(".plan-row").forEach(r=>r.onclick=()=>dayMenu(r.dataset.day));addAny.onclick=()=>libraryPicker();
}
function libraryPicker(day=null){
 mc.innerHTML=`<button class="x" onclick="modal.close()">×</button><h2>${day?"Choose workout":"Add workout"}</h2><div class="modal-list">${Object.entries(WORKOUTS).map(([id,w])=>`<button class="option pickw" data-id="${id}"><b>${w.name}</b><br><small>${w.duration}</small></button>`).join("")}</div>`;modal.showModal();
 document.querySelectorAll(".pickw").forEach(b=>b.onclick=()=>{if(day){state.schedule[day]=b.dataset.id;save();modal.close();render()}else schedulePicker(b.dataset.id)});
}
function schedulePicker(id){
 mc.innerHTML=`<button class="x" onclick="modal.close()">×</button><h2>Add ${W(id).name}</h2><div class="modal-list">${["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].map(d=>`<button class="option pickday" data-day="${d}">${d[0].toUpperCase()+d.slice(1)} ${scheduled(d)?"— replace "+scheduled(d).name:"— empty"}</button>`).join("")}</div>`;modal.showModal();
 document.querySelectorAll(".pickday").forEach(b=>b.onclick=()=>{state.schedule[b.dataset.day]=id;save();modal.close();render()});
}
function movePicker(from){
 mc.innerHTML=`<button class="x" onclick="modal.close()">×</button><h2>Move ${scheduled(from).name}</h2><div class="modal-list">${["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].filter(d=>d!==from).map(d=>`<button class="option moveday" data-day="${d}">${d[0].toUpperCase()+d.slice(1)} ${scheduled(d)?"— swap with "+scheduled(d).name:"— empty"}</button>`).join("")}</div>`;modal.showModal();
 document.querySelectorAll(".moveday").forEach(b=>b.onclick=()=>{let to=b.dataset.day,a=state.schedule[from],other=state.schedule[to];state.schedule[to]=a;if(other)state.schedule[from]=other;else delete state.schedule[from];save();modal.close();render()});
}
function customBuilder(){
 mc.innerHTML=`<button class="x" onclick="modal.close()">×</button><h2>Create custom workout</h2><p class="muted">Choose an existing workout as your starting point, then you can save it under your own name.</p><input id="cname" placeholder="Workout name" style="width:100%;padding:12px;background:#050505;color:white;border:1px solid #292929;border-radius:10px;margin-bottom:10px"><div class="modal-list">${Object.entries(WORKOUTS).map(([id,w])=>`<button class="option clone" data-id="${id}">Use ${w.name} as template</button>`).join("")}</div>`;modal.showModal();
 document.querySelectorAll(".clone").forEach(b=>b.onclick=()=>{let n=cname.value.trim();if(!n)return;let base=JSON.parse(JSON.stringify(W(b.dataset.id)));let id="custom_"+Date.now();base.name=n;base.cat="custom";state.custom[id]=base;save();modal.close();libTab="all";renderLibrary()});
}
function startGuided(id,w){guided={id,w,i:0,set:1,steps:w.xs};renderGuided()}
function renderGuided(){
 let x=guided.steps[guided.i];if(!x){finish();return}
 app.innerHTML=`<div class="guided-top"><button class="secondary" id="exitG">×</button><div class="pbar"><span style="width:${(guided.i/guided.steps.length)*100}%"></span></div><span class="muted">${guided.i+1}/${guided.steps.length}</span></div>
 <section class="exercise-detail"><div class="kicker">${guided.w.name.toUpperCase()} • SET ${guided.set} OF ${x.sets}</div><h1>${x.name}</h1><div class="big-target">${x.min}–${x.max} reps</div><div class="muted">${x.meta}</div>
 <button class="secondary video" id="videoG">▶ Watch video example</button>
 <div class="guide-photo"><img src="${x.img0}" onerror="this.src='${EX.pushup.img0}'"><img src="${x.img1}" onerror="this.src='${EX.pushup.img1}'"></div><div class="guide-labels"><span>START</span><span>FINISH</span></div>
 <div class="cues">${x.cues.map(c=>`<div class="cue">✓ ${c}</div>`).join("")}</div>
 <div class="log-grid"><label>Weight (lb)<input id="wt" inputmode="decimal" placeholder="lb"></label><label>Reps<input id="rp" inputmode="numeric" placeholder="reps"></label></div>
 <div class="next">${guided.set<x.sets?`After this set: rest ${x.rest}s, then ${x.name} set ${guided.set+1}.`:`After this set: rest ${x.rest}s, then ${guided.steps[guided.i+1]?.name||"finish"}.`}</div>
 <button class="primary" style="width:100%;margin-top:12px" id="doneG">✓ Complete set</button></section>`;
 exitG.onclick=()=>{guided=null;render()};videoG.onclick=()=>window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(x.name+" exercise tutorial")}`,"_blank");doneG.onclick=()=>{logSet(x);startRest(x.rest)};
}
function logSet(x){
 let key=new Date().toISOString().slice(0,10)+"-"+guided.id;state.sessions[key]||={};state.sessions[key][x.id]||=[];state.sessions[key][x.id].push({weight:wt.value,reps:rp.value});save();
}
function startRest(sec){
 let r=sec;app.innerHTML=`<section class="rest-screen"><div class="kicker">REST</div><div class="rest-time" id="rr">${r}</div><h2>${guided.set<guided.steps[guided.i].sets?`Next: ${guided.steps[guided.i].name}`:`Next: ${guided.steps[guided.i+1]?.name||"Workout complete"}`}</h2><button class="secondary" id="skip">End rest early</button></section>`;
 clearInterval(timer);timer=setInterval(()=>{r--;if(rr)rr.textContent=r;if(r<=0){clearInterval(timer);advance()}},1000);skip.onclick=()=>{clearInterval(timer);advance()};
}
function advance(){let x=guided.steps[guided.i];if(guided.set<x.sets)guided.set++;else{guided.i++;guided.set=1}renderGuided()}
function finish(){state.logs.unshift({date:new Date().toISOString(),name:guided.w.name});save();guided=null;app.innerHTML=`<section class="rest-screen"><div class="rest-time" style="color:#fff">✓</div><h1>Workout complete</h1><div class="quote">Built for runners. Made to get stronger.</div><button class="primary" id="home">Done</button></section>`;home.onclick=()=>{tab="today";render()}}
function renderProgress(){
 let setCount=Object.values(state.sessions).reduce((n,s)=>n+Object.values(s).reduce((m,a)=>m+a.length,0),0);
 app.innerHTML=`<div class="section-head"><h3>PROGRESS</h3></div><div class="stat-grid"><div class="stat"><span class="muted">Workouts</span><b>${state.logs.length}</b></div><div class="stat"><span class="muted">Sets logged</span><b>${setCount}</b></div></div><div class="section-head"><h3>RECENT</h3></div>${state.logs.slice(0,10).map(x=>`<div class="recovery-card"><b>${x.name}</b><br><small>${new Date(x.date).toLocaleDateString()}</small></div>`).join("")||'<div class="muted">No workouts logged yet.</div>'}`;
}
function renderRecovery(){
 app.innerHTML=`<div class="section-head"><h3>RECOVERY</h3></div>${[EX.quadstretch,EX.hamstretch,EX.seatedcalf,EX.tib].map(x=>`<div class="exercise-card"><div class="exercise-top"><div></div><div><b>${x.name}</b><small>${x.meta}</small></div></div><div class="thumbs"><img src="${x.img0}" onerror="this.src='${EX.pushup.img0}'"><img src="${x.img1}" onerror="this.src='${EX.pushup.img1}'"></div></div>`).join("")}<div class="recovery-card"><b>Easy walk</b><br><small>10–20 min, conversational effort</small></div><div class="recovery-card"><b>Sleep + fueling</b><br><small>Still your biggest recovery levers.</small></div>`;
}
["knee","calf","sore"].forEach(id=>{let e=document.getElementById(id),o=document.getElementById(id==="knee"?"kneeOut":id==="calf"?"calfOut":"soreOut");e.oninput=()=>o.textContent=e.value});
document.getElementById("saveBody").onclick=()=>{saveCheck({knee:+knee.value,calf:+calf.value,sore:+sore.value,energy:+energy.value});setTimeout(render,0)};
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
document.getElementById("menuBtn").onclick=()=>{tab="workouts";render()};
save();render();
