const x=[{label:"sin",fn:"sin"},{label:"cos",fn:"cos"},{label:"tan",fn:"tan"},{label:"log",fn:"log"},{label:"ln",fn:"ln"},{label:"√",fn:"sqrt"},{label:"x²",fn:"sq"},{label:"xʸ",fn:"pow"},{label:"π",fn:"pi"},{label:"e",fn:"e"},{label:"n!",fn:"fact"},{label:"1/x",fn:"inv"},{label:"(",fn:"lp"},{label:")",fn:"rp"},{label:"EXP",fn:"exp"}],y=[{label:"C",cls:"calc-btn--clear",action:"clear"},{label:"⌫",cls:"calc-btn--op",action:"back"},{label:"%",cls:"calc-btn--op",action:"percent"},{label:"÷",cls:"calc-btn--op",action:"op",val:"/"},{label:"7",cls:"",action:"digit",val:"7"},{label:"8",cls:"",action:"digit",val:"8"},{label:"9",cls:"",action:"digit",val:"9"},{label:"×",cls:"calc-btn--op",action:"op",val:"*"},{label:"4",cls:"",action:"digit",val:"4"},{label:"5",cls:"",action:"digit",val:"5"},{label:"6",cls:"",action:"digit",val:"6"},{label:"−",cls:"calc-btn--op",action:"op",val:"-"},{label:"1",cls:"",action:"digit",val:"1"},{label:"2",cls:"",action:"digit",val:"2"},{label:"3",cls:"",action:"digit",val:"3"},{label:"+",cls:"calc-btn--op",action:"op",val:"+"},{label:"±",cls:"",action:"negate"},{label:"0",cls:"",action:"digit",val:"0"},{label:".",cls:"",action:"dot"},{label:"=",cls:"calc-btn--eq",action:"equals"}];function E(c){c.innerHTML=`
    <div class="std-calc" style="max-width:400px" id="sci-calc">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;">
        <span style="font-size:.8rem;font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.07em">Scientific</span>
        <div class="mode-badge" id="sci-mode">
          <button class="mode-badge__btn active" data-mode="deg" aria-label="Degrees mode">DEG</button>
          <button class="mode-badge__btn" data-mode="rad" aria-label="Radians mode">RAD</button>
        </div>
      </div>
      <div class="std-calc__display">
        <div class="std-calc__expr" id="sci-expr"></div>
        <div class="std-calc__value" id="sci-display">0</div>
      </div>
      <div class="sci-calc__fn-grid" id="sci-fn-grid">
        ${x.map(a=>`
          <button class="calc-btn calc-btn--fn"
            data-fn="${a.fn}"
            aria-label="${a.label}"
          >${a.label}</button>
        `).join("")}
      </div>
      <div class="std-calc__grid" id="sci-grid">
        ${y.map(a=>`
          <button
            class="calc-btn ${a.cls}"
            data-action="${a.action}"
            ${a.val!==void 0?`data-val="${a.val}"`:""}
            aria-label="${a.label}"
          >${a.label}</button>
        `).join("")}
      </div>
    </div>
  `}function S({expr:c,isDeg:a}){try{const s=c.replace(/[^0-9+\-*/().e\s]/g,"");if(!s)return{result:"Error"};const b=Function('"use strict"; return ('+s+")")();return isFinite(b)?{result:+b.toPrecision(12)}:{result:b>0?"∞":"-∞"}}catch{return{result:"Error"}}}function h(c){if(c=Math.floor(Math.abs(c)),c>170)return 1/0;let a=1;for(let s=2;s<=c;s++)a*=s;return a}function _(c){const a=c.querySelector("#sci-display"),s=c.querySelector("#sci-expr"),b=c.querySelector("#sci-fn-grid"),p=c.querySelector("#sci-grid"),f=c.querySelector("#sci-mode");if(!a)return;let e="",g=!0,r=!1;function o(i){a.textContent=i!==void 0?String(i):e||"0",s.textContent=e;const t=(i!==void 0?String(i):e).length;a.style.fontSize=t>14?"1.1rem":t>10?"1.4rem":""}function m(i){const t=parseFloat(a.textContent),n=g?Math.PI/180:1;let l;switch(i){case"sin":l=Math.sin(t*n);break;case"cos":l=Math.cos(t*n);break;case"tan":l=Math.tan(t*n);break;case"log":l=Math.log10(t);break;case"ln":l=Math.log(t);break;case"sqrt":l=Math.sqrt(t);break;case"sq":l=t*t;break;case"fact":l=h(t);break;case"inv":l=1/t;break;case"pi":l=Math.PI,e="π";break;case"e":l=Math.E,e="e";break;case"pow":e+="^",o();return;case"lp":e+="(",o();return;case"rp":e+=")",o();return;case"exp":e+="e+",o();return;default:return}l=+Number(l).toPrecision(12),e=String(l),r=!0,o(l)}b&&b.addEventListener("click",i=>{const t=i.target.closest("[data-fn]");t&&(r&&(e=a.textContent,r=!1),m(t.dataset.fn))}),f&&f.addEventListener("click",i=>{const t=i.target.closest("[data-mode]");t&&(g=t.dataset.mode==="deg",f.querySelectorAll(".mode-badge__btn").forEach(n=>n.classList.remove("active")),t.classList.add("active"))}),p&&p.addEventListener("click",i=>{const t=i.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,l=t.dataset.val;if(r&&n==="digit"&&(e="",r=!1),n==="digit")e+=l;else if(n==="dot")e.match(/\d+\.$/)||(e+=".");else if(n==="op")e+=` ${l==="*"?"×":l==="/"?"÷":l==="-"?"−":l} `,r=!1;else if(n==="equals"){const d=e.replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/\^/g,"**");try{const u=Function('"use strict"; return ('+d+")")(),v=isFinite(u)?+u.toPrecision(12):u>0?1/0:-1/0;s.textContent=e+" =",e=String(v),r=!0,o(v);return}catch{e="Error",r=!0}}else if(n==="back")e=e.trimEnd().replace(/\S+$/,"").trimEnd(),e||(e="");else if(n==="clear")e="",r=!1,s.textContent="";else if(n==="negate"){const d=parseFloat(a.textContent);isFinite(d)&&(e=String(-d))}else if(n==="percent"){const d=parseFloat(a.textContent);isFinite(d)&&(e=String(d/100))}o()}),o()}export{_ as bindEvents,S as calculate,E as render};
