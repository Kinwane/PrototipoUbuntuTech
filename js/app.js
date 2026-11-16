/* ===== CAMADA DE DADOS (trocar por back-end: definir API.base) ===== */
const API={base:"",async get(p,fb){if(!this.base)return fb;try{const r=await fetch(this.base+p);if(!r.ok)throw 0;return await r.json()}catch(e){return fb}},
async post(p,b){if(!this.base){await new Promise(r=>setTimeout(r,500));return{ok:true,local:true}}try{const r=await fetch(this.base+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});return await r.json()}catch(e){return{ok:false}}}};
const FALLBACK={
stats:[{n:12,s:"M+",t:"utilizadores estimados de internet"},{n:5,s:"",t:"tecnologias em foco"},{n:7,s:"",t:"tipos de burla"},{n:100,s:"%",t:"prevenção começa em ti"}],
tech:[{i:"🤖",t:"Inteligência Artificial",d:"Sistemas que aprendem com dados para prever, gerar e decidir."},{i:"📡",t:"5G e fibra",d:"Ligações mais rápidas para escolas, empresas e serviços públicos."},{i:"🔗",t:"Blockchain",d:"Registos digitais partilhados e difíceis de alterar."},{i:"🌐",t:"Internet das Coisas",d:"Sensores e objectos ligados: agricultura, energia, cidades."}],
ia:[{i:"💬",t:"Assistentes de IA",d:"Respondem a perguntas e ajudam a estudar. Verifica sempre as respostas."},{i:"🏦",t:"IA na banca",d:"Detecta transacções suspeitas e melhora o atendimento."},{i:"🌾",t:"IA na agricultura",d:"Análise de imagens e clima para melhorar colheitas."},{i:"🎭",t:"Deepfakes",d:"Vídeos e vozes falsas criados por IA. Desconfia de pedidos de dinheiro por voz ou vídeo."},{i:"🗣️",t:"Línguas nacionais",d:"Oportunidade: IA em Umbundu, Kimbundu e Kikongo ainda é pouco desenvolvida."}],
bars:[["Phishing (links falsos)",82],["Burlas por mobile money",71],["Falsos prémios e sorteios",64],["Malware em apps",48],["Troca de SIM",35]],
donut:[["Mobile money",34,"#2563eb"],["WhatsApp/redes",28,"#3b82f6"],["Falsos prémios",20,"#60a5fa"],["Emprego falso",18,"#a78bfa"]],
burlas:[["Falso prémio ou sorteio","Dizem que ganhaste um prémio e pedem um “taxa” para o libertar. <b>Nenhum prémio real exige pagamento adiantado.</b>"],["Mobile money / Multicaixa Express","Fingem ser do banco ou da operadora e pedem PIN ou código SMS. Nunca partilhes estes dados."],["WhatsApp clonado","Um “amigo” pede dinheiro urgente. Liga-lhe para confirmar e activa a verificação em dois passos."],["Ofertas de emprego e bolsas","Cobram inscrição por vagas falsas. Confirma sempre no site oficial da entidade."],["Deepfake e clonagem de voz","IA imita familiares ou chefes. Combina uma palavra-código com a família."],["Troca de SIM","Criminosos tomam o teu número para aceder a contas. Se perderes rede sem motivo, contacta a operadora."]],
chk:["Activei a verificação em dois passos","Uso palavras-passe diferentes em cada conta","Nunca partilho PIN nem códigos SMS","Actualizo o telemóvel e as apps","Só instalo apps de lojas oficiais","Confirmo links antes de clicar","Faço cópias de segurança"],
tipos:["Falso prémio","Mobile money","WhatsApp clonado","Emprego falso","Phishing","Outro"],
gal:[["Rede neuronal","Como a IA liga informação","n"],["Escudo digital","Protecção de dados","s"],["Luanda conectada","Cidade e redes","c"]]};
const $=s=>document.querySelector(s),el=(h)=>{const d=document.createElement("div");d.innerHTML=h;return d.firstElementChild};
const IMG={n:'<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#12183a"/><g stroke="#60a5fa" stroke-width="1.4" opacity=".7"><path d="M40 50 130 40 130 100 40 100zM130 40 220 60 130 100 220 130 130 160 40 100"/><path d="M220 60 260 100 220 130"/></g><g fill="#2563eb"><circle cx="40" cy="50" r="8"/><circle cx="130" cy="40" r="8"/><circle cx="130" cy="100" r="8"/><circle cx="40" cy="100" r="8"/><circle cx="220" cy="60" r="8"/><circle cx="220" cy="130" r="8"/><circle cx="130" cy="160" r="8"/></g><circle cx="260" cy="100" r="8" fill="#3b82f6"/></svg>',
s:'<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#1a1020"/><path d="M150 25 215 50v50c0 38-28 62-65 75-37-13-65-37-65-75V50z" fill="#3b82f6" opacity=".85"/><path d="M150 45 197 63v37c0 28-20 46-47 56-27-10-47-28-47-56V63z" fill="#0a0e1a"/><path d="M127 100l17 17 31-34" fill="none" stroke="#2563eb" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
c:'<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#0d1b2e"/><circle cx="235" cy="45" r="22" fill="#2563eb"/><path d="M0 200V150h30v-40h24v40h18V90h30v60h20v-30h26v30h22v-50h28v50h24v-20h30v20h48v50z" fill="#60a5fa" opacity=".75"/><path d="M0 200v-25h300v25z" fill="#3b82f6"/><g stroke="#2563eb" fill="none"><path d="M60 80a30 30 0 0 1 40 0M50 68a46 46 0 0 1 60 0"/></g></svg>'};

/* ===== RENDER ===== */
async function init(){
const D={};for(const k of Object.keys(FALLBACK))D[k]=await API.get("/api/"+k,FALLBACK[k]);
$("#stats").innerHTML=D.stats.map((s,i)=>`<div class="card rv" style="--i:${i}"><b data-n="${s.n}" data-s="${s.s}">0</b>${s.t}</div>`).join("");
$("#tech").innerHTML=D.tech.map((c,i)=>`<div class="card rv" style="--i:${i}"><div class="ic">${c.i}</div><h3>${c.t}</h3><p class="lead">${c.d}</p></div>`).join("");
$("#trk").innerHTML=D.ia.map(c=>`<div class="card"><div class="ic">${c.i}</div><h3>${c.t}</h3><p class="lead">${c.d}</p></div>`).join("");
$("#bars").innerHTML="<b>Ameaças mais frequentes (índice 0–100)</b>"+D.bars.map(b=>`<div class="bar"><span>${b[0]}<em>${b[1]}</em></span><i><b style="--w:${b[1]}%"></b></i></div>`).join("");
let off=0;const C=2*Math.PI*70;
$("#dn").innerHTML=D.donut.map(d=>{const l=C*d[1]/100,o=off;off+=l;return `<circle class="dc" cx="100" cy="100" r="70" stroke="${d[2]}" stroke-dasharray="0 ${C}" data-l="${l}" data-c="${C}" stroke-dashoffset="${-o}"/>`}).join("");
$("#lg2").innerHTML=D.donut.map(d=>`<span><i style="background:${d[2]}"></i>${d[0]} ${d[1]}%</span>`).join("");
$("#burl").innerHTML=D.burlas.map(b=>`<details><summary>${b[0]}</summary><p>${b[1]}</p></details>`).join("");
$("#chk").innerHTML=D.chk.map(c=>`<label><input type="checkbox">${c}</label>`).join("");
$("#gal").innerHTML=D.gal.map((g,i)=>`<figure class="rv" style="--i:${i}">${IMG[g[2]]}<figcaption><b>${g[0]}</b> · ${g[1]}</figcaption></figure>`).join("");
$("#ft").innerHTML=D.tipos.map(t=>`<option>${t}</option>`).join("");
bind();}

function bind(){
/* reveal + counters + charts */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add("in");io.unobserve(t);
t.querySelectorAll("[data-n]").forEach(c=>{const n=+c.dataset.n;let v=0;const st=setInterval(()=>{v+=Math.ceil(n/40);if(v>=n){v=n;clearInterval(st)}c.textContent=v+c.dataset.s},30)});
t.querySelectorAll(".dc").forEach((c,i)=>setTimeout(()=>c.setAttribute("stroke-dasharray",c.dataset.l+" "+c.dataset.c),i*200))}),{threshold:.15});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
/* progress, parallax, active menu */
const secs=[...document.querySelectorAll("main section")],links=[...document.querySelectorAll("nav a")];
addEventListener("scroll",()=>{const h=document.documentElement,y=scrollY;$("#prog").style.width=y/(h.scrollHeight-innerHeight)*100+"%";
$("#cv").style.transform=`translateY(${y*.25}px)`;
let cur=secs[0].id;secs.forEach(s=>{if(s.offsetTop-120<=y)cur=s.id});links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+cur))},{passive:true});
/* menu */
$("#bg").onclick=()=>$("#nav").classList.toggle("open");links.forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
$("#th").onclick=()=>{const r=document.documentElement,l=getComputedStyle(r).getPropertyValue("--bg").trim()==="#f4f8ff";r.dataset.theme=l?"dark":"light"};
/* carousel */
let ci=0;const trk=$("#trk"),n=trk.children.length;
const go=i=>{ci=Math.max(0,Math.min(i,n-1));trk.style.transform=`translateX(-${trk.children[ci].offsetLeft}px)`};
$("#nx").onclick=()=>go(ci+1>=n?0:ci+1);$("#pv").onclick=()=>go(ci-1<0?n-1:ci-1);
let sx=0;const cr=$("#car");cr.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});cr.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)go(ci+(d<0?1:-1))});
/* hero slides */
const sl=[...document.querySelectorAll(".sl")],dots=$("#dots");let si=0,tm;
sl.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Slide "+(i+1));b.onclick=()=>{show(i);play()};dots.append(b)});
function show(i){si=i;sl.forEach((s,j)=>s.classList.toggle("on",j===i));[...dots.children].forEach((d,j)=>d.classList.toggle("on",j===i))}
function play(){clearInterval(tm);tm=setInterval(()=>show((si+1)%sl.length),6000)}show(0);play();
/* password */
$("#pw").oninput=e=>{const p=e.target.value;let s=0;if(p.length>=8)s++;if(p.length>=12)s++;if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++;if(/\d/.test(p))s++;if(/[^\w]/.test(p))s++;
if(!p)s=0;const m=$("#mt");m.style.width=s*20+"%";m.style.background=["#dc2626","#dc2626","#f59e0b","#f59e0b","#2563eb","#16a34a"][s];
$("#pl").textContent=p?["Muito fraca","Fraca","Razoável","Boa","Forte","Excelente"][s]:""};
/* checklist */
document.querySelectorAll("#chk input").forEach(c=>c.onchange=()=>{const a=document.querySelectorAll("#chk input");$("#cm").style.width=[...a].filter(x=>x.checked).length/a.length*100+"%"});
/* form → API */
$("#fm").onsubmit=async e=>{e.preventDefault();const b=Object.fromEntries(new FormData(e.target));const r=await API.post("/api/reports",b);
toast(r.ok?"Alerta enviado. Obrigado!":"Erro ao enviar. Tenta novamente.");if(r.ok)e.target.reset()};
}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("s");setTimeout(()=>t.classList.remove("s"),3000)}

/* hero canvas network */
(function(){const c=$("#cv"),x=c.getContext("2d");let w,h,P=[];
function rs(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;P=Array.from({length:Math.min(70,w/14)},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}))}
function dr(){x.clearRect(0,0,w,h);P.forEach((p,i)=>{p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;x.fillStyle="#2563eb";x.beginPath();x.arc(p.x,p.y,2,0,7);x.fill();
for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){x.strokeStyle=`rgba(37,99,235,${.35*(1-d/120)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}});requestAnimationFrame(dr)}
addEventListener("resize",rs);rs();if(!matchMedia("(prefers-reduced-motion:reduce)").matches)dr()})();
init();
