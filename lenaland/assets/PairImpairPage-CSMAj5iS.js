import{r as a,j as e,L as P}from"./index-6LxDPmv8.js";import{u as U}from"./useGameSession-Dp3-cyXu.js";import{u as V,G as W}from"./GameFeedback-DkWMvfU2.js";/* empty css             */import"./recordPlayedExercise-By3v2zU5.js";const y=60,$=[{label:"N1 — 0 à 20",id:1},{label:"N2 — 0 à 100",id:2},{label:"N3 — 0 à 999",id:3},{label:"N4 — Multiplications",id:4},{label:"N5 — Nombres négatifs",id:5}],K=[{three:20,two:12},{three:18,two:10},{three:15,two:8},{three:12,two:7},{three:15,two:9}];function d(n,t){return Math.floor(Math.random()*(t-n+1))+n}function M(n){switch(n){case 1:{const t=d(0,20);return{display:String(t),value:t}}case 2:{const t=d(0,100);return{display:String(t),value:t}}case 3:{const t=d(0,999);return{display:String(t),value:t}}case 4:{const t=d(2,12),u=d(2,12),j=t*u;return{display:`${t} × ${u} = ?`,value:j}}case 5:{const t=d(-50,50);return{display:String(t),value:t}}default:{const t=d(0,20);return{display:String(t),value:t}}}}function A(n){return Math.abs(n)%2===0}function G(n,t){const u=K[t-1];return n>=u.three?3:n>=u.two?2:1}function X(n){return n<60?`${n}s`:`${Math.floor(n/60)}m${n%60}s`}function ne(){const{progress:n,saveSession:t,resetTimer:u,logError:j}=U("pair-impair"),{feedbackRef:C,triggerCorrect:z,triggerWrong:F,triggerCombo:B}=V(),[i,b]=a.useState("setup"),[l,O]=a.useState(1),[p,I]=a.useState(null),[g,v]=a.useState(0),[T,N]=a.useState(0),[x,_]=a.useState(y),[E,w]=a.useState(null),[m,R]=a.useState(null),[k,S]=a.useState(!1),f=a.useRef(null),h=a.useRef(null);a.useEffect(()=>{if(i==="play")return f.current=setInterval(()=>{_(s=>s<=1?(clearInterval(f.current),0):s-1)},1e3),()=>clearInterval(f.current)},[i]),a.useEffect(()=>{i==="play"&&x===0&&(clearTimeout(h.current),b("ending"))},[i,x]),a.useEffect(()=>{i==="ending"&&v(s=>{const c=G(s,l),r=t({score:s,level:l,stars:c});return R(r),b("results"),s})},[i]),a.useEffect(()=>()=>{clearInterval(f.current),clearTimeout(h.current)},[]);function D(){clearInterval(f.current),clearTimeout(h.current),v(0),N(0),_(y),w(null),S(!1),R(null),I(M(l)),u(),b("play")}function L(s){if(k||i!=="play"||!p)return;S(!0);const c=A(p.value)===s;w(c?"ok":"bad"),c?(v(r=>r+1),N(r=>{const o=r+1;return z(),o>=3&&B(o),o})):(N(0),F(),j({label:`Parité de ${p.display}`,correct:A(p.value)?"PAIR":"IMPAIR",given:s?"PAIR":"IMPAIR"})),h.current=setTimeout(()=>{w(null),S(!1),I(M(l))},350)}if(i==="setup")return e.jsxs("div",{className:"an-page",children:[e.jsx(P,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsx("h1",{className:"an-title",children:"🎲 Pair ou Impair"}),e.jsx("p",{className:"an-subtitle",children:"Touche vite la bonne catégorie !"}),e.jsx("div",{className:"jeux-level-grid",children:$.map((s,c)=>{const r=c+1,o=r>n.unlockedLevel,J=r===l;return e.jsx("button",{className:`jeux-level-btn${J?" is-selected":""}${o?" is-locked":""}`,onPointerDown:Q=>{Q.preventDefault(),o||O(r)},disabled:o,children:o?"🔒":`N${r}`},r)})}),e.jsxs("div",{className:"an-info-row",children:[e.jsx("span",{children:"⏱️ 60 secondes"}),e.jsxs("span",{children:["🎯 ",$[l-1].label]})]}),e.jsxs("div",{className:"jeux-setup-stats",children:[e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:n.bestScore}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Meilleur score"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:X(n.totalTimeSecs)}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Temps total"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:n.sessionsPlayed}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Parties"})]})]}),e.jsx("button",{className:"an-cta",onPointerDown:s=>{s.preventDefault(),D()},children:"▶ Jouer"})]});if(i==="results"){const s=G(g,l),c=s===3?"🎉 Excellent !":s===2?"👍 Bien joué !":"📚 Encore un effort !";return e.jsxs("div",{className:"an-page",children:[e.jsx("h2",{className:"an-result-title",children:c}),e.jsx("div",{className:"jeux-stars",children:"★".repeat(s)+"☆".repeat(3-s)}),e.jsxs("div",{className:"jeux-result-stat",children:[e.jsx("span",{children:"Bonnes réponses"}),e.jsx("span",{children:g})]}),(m==null?void 0:m.isNewBest)&&e.jsx("div",{className:"jeux-new-best",children:"🏆 Nouveau record !"}),(m==null?void 0:m.newUnlocked)&&e.jsxs("div",{className:"jeux-unlocked",children:["🔓 Niveau ",l+1," débloqué !"]}),e.jsxs("div",{className:"an-result-btns",children:[e.jsx("button",{className:"an-cta",onPointerDown:r=>{r.preventDefault(),D()},children:"Rejouer"}),e.jsx("button",{className:"an-cta an-cta--soft",onPointerDown:()=>b("setup"),children:"Niveaux"}),e.jsx(P,{to:"/jeux",className:"an-cta an-cta--soft",children:"← Jeux"})]})]})}if(!p||i==="ending")return null;const q=x/y*100,H=x<=10;return e.jsxs("div",{className:"an-page pi-page",children:[e.jsx(W,{ref:C}),e.jsx(P,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsxs("div",{className:"an-hud",children:[e.jsxs("span",{className:"an-score",children:["⭐ ",g]}),T>=3&&e.jsxs("span",{className:"pi-combo",children:["🔥 Combo ×",T]}),e.jsxs("span",{className:"pi-timer-label",children:["⏱️ ",x,"s"]})]}),e.jsx("div",{className:"pi-timer-track",children:e.jsx("div",{className:`pi-timer-fill${H?" pi-timer-fill--urgent":""}`,style:{width:`${q}%`}})}),e.jsx("div",{className:`pi-number${E==="ok"?" pi-number--correct":E==="bad"?" pi-number--wrong":""}`,children:p.display}),e.jsxs("div",{className:"pi-answer-row",children:[e.jsxs("button",{className:"pi-btn pi-btn--pair",onPointerDown:s=>{s.preventDefault(),L(!0)},disabled:k,children:["🟦",e.jsx("br",{}),"PAIR"]}),e.jsxs("button",{className:"pi-btn pi-btn--impair",onPointerDown:s=>{s.preventDefault(),L(!1)},disabled:k,children:["🔴",e.jsx("br",{}),"IMPAIR"]})]}),e.jsx("style",{children:`
        .pi-page { gap: 12px; }
        .pi-combo {
          font-size: .95rem;
          font-weight: 900;
          color: #f97316;
          animation: pi-combo-pop .3s ease;
        }
        @keyframes pi-combo-pop { from { transform: scale(1.4); } to { transform: scale(1); } }
        .pi-timer-label { font-size: .9rem; font-weight: 700; }
        .pi-timer-track {
          width: 100%;
          max-width: 400px;
          height: 10px;
          background: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        .pi-timer-fill {
          height: 100%;
          background: #22c55e;
          border-radius: 8px;
          transition: width .9s linear, background .3s;
        }
        .pi-timer-fill--urgent { background: #ef4444; }
        .pi-number {
          font-size: 4rem;
          font-weight: 900;
          text-align: center;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          padding: 12px 32px;
          background: var(--color-surface, #fff);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          transition: background .15s;
          width: 100%;
          max-width: 380px;
        }
        .pi-number--correct { background: #bbf7d0; }
        .pi-number--wrong   { background: #fecaca; }
        .pi-answer-row {
          display: flex;
          gap: 16px;
          width: 100%;
          max-width: 380px;
          margin-top: 8px;
        }
        .pi-btn {
          flex: 1;
          min-height: 100px;
          border: none;
          border-radius: 20px;
          font-size: 1.4rem;
          font-weight: 900;
          cursor: pointer;
          line-height: 1.3;
          transition: transform .1s, opacity .1s;
          touch-action: manipulation;
        }
        .pi-btn:active:not(:disabled) { transform: scale(.93); }
        .pi-btn:disabled { opacity: .5; }
        .pi-btn--pair   { background: #3b82f6; color: #fff; }
        .pi-btn--impair { background: #ef4444; color: #fff; }
      `})]})}export{ne as default};
