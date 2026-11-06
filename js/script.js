const cars = [
 {id:1,year:2004,name:"Presidente",engine:"4.5L V10",category:"sedan",categoryName:"SEDÃ DE LUXO",miles:"26.000 milhas",color:"Turquesa metálico",price:null,phone:"265-555-2423",tag:"EXCLUSIVO",description:"Um sedã imponente, com presença marcante e acabamento pensado para quem gosta de chegar com estilo.",image:"https://gtwfilesie.grandtheftwiki.com/Presidente-GTAIV-front.jpg"},
 {id:2,year:2001,name:"Turismo",engine:"4.0L Quad Cam V8",category:"esportivo",categoryName:"SUPERCAR",miles:"26.000 milhas",color:"Rosso Red",price:130995,phone:null,tag:"DESTAQUE",description:"Esportivo de duas portas, câmbio manual de cinco marchas, bancos ajustáveis, rodas de liga leve, som, vidros elétricos e interior em couro creme.",image:"https://gtwfilesie.grandtheftwiki.com/Turismo-GTAIV-front.jpg"},
 {id:3,year:2003,name:"Feltzer",engine:"3.8L Supercharged V8",category:"esportivo",categoryName:"ESPORTIVO",miles:"Consultar",color:"Condição impecável",price:null,phone:"662-555-0147",tag:"RARIDADE",description:"Um esportivo elegante com ar-condicionado, alarme, airbag do motorista e retrovisores elétricos. Visitas e consultas das 08h às 21h.",image:"https://gtwfilesie.grandtheftwiki.com/Feltzer-GTAIV-GracieAncelotti-front.jpg"},
 {id:4,year:2001,name:"Banshee",engine:"300ci V8 Twin Turbo GT",category:"esportivo",categoryName:"ESPORTIVO GT",miles:"Consultar",color:"Consultar",price:null,phone:"265-555-2423",tag:"PERFORMANCE",description:"Um clássico de alta performance com rodas de liga leve, ar-condicionado, bancos ajustáveis, vidros elétricos e histórico de manutenção.",image:"https://gtwfilesie.grandtheftwiki.com/Banshee-GTAIV-front.jpg"},
 {id:5,year:2003,name:"Intruder",engine:"4.3L V8 Limited",category:"sedan",categoryName:"SEDÃ PREMIUM",miles:"Consultar",color:"Preto metálico",price:42999,phone:null,tag:"OPORTUNIDADE",description:"Acabamento preto metálico, faróis auxiliares, pacote elétrico, CD player e travamento central. Uma opção sofisticada para o dia a dia.",image:"https://gtwfilesie.grandtheftwiki.com/Intruder-GTAIV-front.jpg"},
 {id:6,year:2001,name:"Schafter",engine:"6.5L V12 SC",category:"luxo",categoryName:"LUXO",miles:"37.000 milhas",color:"Prata metálico",price:null,phone:"265-555-2423",tag:"CONFORTO",description:"Luxo em cada detalhe: transmissão automática, ar-condicionado, ABS, controle de cruzeiro, rodas de liga leve e bancos em couro.",image:"https://gtwfilesie.grandtheftwiki.com/Schafter-GTAIV-front.jpg"},
 {id:7,year:2006,name:"PMP 600",engine:"600ci V8 Semi",category:"luxo",categoryName:"LUXO EXECUTIVO",miles:"8.000 milhas",color:"Prata metálico",price:62995,phone:null,tag:"BAIXA KM",description:"Sedã executivo automático a diesel, com bancos de couro, ABS, ar-condicionado, rodas de liga leve, navegação, bancos aquecidos e sensores de estacionamento.",image:"https://gtwfilesie.grandtheftwiki.com/PMP600-GTAIV-front.jpg"}
];
const grid=document.getElementById('carGrid'), search=document.getElementById('searchInput'), sort=document.getElementById('sortSelect');
let filter='todos', favorites=JSON.parse(localStorage.getItem('ae-favorites')||'[]');
const money=n=>n==null?'CONSULTE':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
function render(){
 let list=cars.filter(c=>(filter==='todos'||c.category===filter)&&`${c.name} ${c.engine} ${c.categoryName}`.toLowerCase().includes(search.value.toLowerCase()));
 if(sort.value==='low')list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
 if(sort.value==='high')list.sort((a,b)=>(b.price??-1)-(a.price??-1));
 if(sort.value==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
 document.getElementById('resultCount').textContent=String(list.length).padStart(2,'0');
 document.getElementById('noResults').hidden=list.length!==0;
 grid.innerHTML=list.map(c=>`<article class="car-card">
  <div class="car-image"><img src="${c.image}" alt="Ilustração do ${c.name}"><span class="car-tag">${c.tag}</span>
  <button class="favorite ${favorites.includes(c.id)?'saved':''}" data-fav="${c.id}" aria-label="Favoritar ${c.name}">${favorites.includes(c.id)?'♥':'♡'}</button></div>
  <div class="car-info"><span class="car-year">${c.year} • ${c.categoryName}</span><h3>${c.name}</h3>
  <div class="specs"><span>${c.engine}</span><span>${c.miles}</span></div>
  <div class="price-row"><div><span class="price-label">${c.price?'PREÇO ANUNCIADO':'CONSULTAR VALOR'}</span><strong class="price">${money(c.price)}</strong></div><button class="details-btn" data-detail="${c.id}">VER DETALHES ↗</button></div></div></article>`).join('');
}
grid.addEventListener('click',e=>{
 const fav=e.target.closest('[data-fav]'); if(fav){const id=Number(fav.dataset.fav);favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem('ae-favorites',JSON.stringify(favorites));render();toast(favorites.includes(id)?'Veículo salvo nos favoritos.':'Veículo removido dos favoritos.');}
 const detail=e.target.closest('[data-detail]');if(detail)openDetails(Number(detail.dataset.detail));
});
function openDetails(id){
 const c=cars.find(x=>x.id===id);const d=document.getElementById('carDialog');
 document.getElementById('dialogContent').innerHTML=`<div class="dialog-body"><img src="${c.image}" alt="Ilustração do ${c.name}"><div class="dialog-text"><span class="eyebrow dark">${c.year} • ${c.categoryName}</span><h3>${c.name}</h3><div class="dialog-price">${money(c.price)}</div><p>${c.description}</p><p><b>Motor:</b> ${c.engine}<br><b>Cor:</b> ${c.color}<br><b>Quilometragem:</b> ${c.miles}</p><p class="dialog-phone">${c.phone?'LIGUE: '+c.phone:'ANÚNCIO COM PREÇO FIXO'}</p><button class="details-btn" id="interestBtn">TENHO INTERESSE ↗</button></div></div>`;
 d.showModal();document.getElementById('interestBtn').addEventListener('click',()=>{d.close();toast('Entre em contato pelo telefone indicado no anúncio.');});
}
document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('carDialog').close());
document.getElementById('carDialog').addEventListener('click',e=>{if(e.target.id==='carDialog')e.currentTarget.close()});
search.addEventListener('input',render);sort.addEventListener('change',render);
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter-btn.active').classList.remove('active');b.classList.add('active');filter=b.dataset.filter;render()}));
const toggle=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
let toastTimer;function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
render();
