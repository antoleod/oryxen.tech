import{r as x,j as e,L as E}from"./index-6LxDPmv8.js";import{u as U}from"./useGameSession-Dp3-cyXu.js";import{u as W,G as Y}from"./GameFeedback-DkWMvfU2.js";/* empty css             */import"./recordPlayedExercise-By3v2zU5.js";const L=8,G=[{label:"N1 — Petits nombres",rows:3,bottomMax:9,hiddenCount:1},{label:"N2 — Jusqu'à 20",rows:3,bottomMax:20,hiddenCount:2},{label:"N3 — Jusqu'à 50",rows:3,bottomMax:50,hiddenCount:3},{label:"N4 — Jusqu'à 100",rows:3,bottomMax:100,hiddenCount:4},{label:"N5 — 4 rangées",rows:4,bottomMax:20,hiddenCount:5}];function w(s,a){return Math.floor(Math.random()*(a-s+1))+s}function T(s){const a=[...s];for(let t=a.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[a[t],a[r]]=[a[r],a[t]]}return a}function K(s,a){const t=w(1,s),r=w(1,s),u=w(1,s),i=t+r,b=r+u,o=i+b,f=[t,r,u,i,b,o],g=T([3,4,5,0,1,2]).slice(0,Math.min(a,5));return{cells:f,hidden:g,rows:3}}function Q(s,a){const t=w(1,s),r=w(1,s),u=w(1,s),i=w(1,s),b=t+r,o=r+u,f=u+i,p=b+o,g=o+f,m=p+g,k=[t,r,u,i,b,o,f,p,g,m],j=T([9,7,8,4,5,6,0,1,2,3]).slice(0,Math.min(a,8));return{cells:k,hidden:j,rows:4}}function Z(s){return s.rows===4?Q(s.bottomMax,s.hiddenCount):K(s.bottomMax,s.hiddenCount)}function V(s){const a=T([-3,-2,-1,1,2,3,4,-4,5,-5]),t=new Set;t.add(s);for(const u of a){if(t.size>=4)break;const i=s+u;i>0&&i!==s&&t.add(i)}let r=1;for(;t.size<4;)t.add(s+r*(t.size%2===0?1:-1)),r++;return T([...t])}function ee(s){return s<60?`${s}s`:`${Math.floor(s/60)}m${s%60}s`}function se({pyramid:s,hiddenIdx:a,filledValues:t,chosenFeedback:r}){const{cells:u,hidden:i,rows:b}=s,o=[];b===3?(o.push([0,1,2]),o.push([3,4]),o.push([5])):(o.push([0,1,2,3]),o.push([4,5,6]),o.push([7,8]),o.push([9]));const f=i[a]??-1;return e.jsx("div",{className:"pyr-pyramid",children:[...o].reverse().map((p,g)=>e.jsx("div",{className:"pyr-row",children:p.map(m=>{const k=i.includes(m),v=m in t,j=m===f,N=j?r:v?t[m].correct?"ok":"bad":null;let y="pyr-cell";k&&!v&&!j&&(y+=" pyr-cell--hidden"),j&&(y+=" pyr-cell--active"),N==="ok"&&(y+=" pyr-cell--correct"),N==="bad"&&(y+=" pyr-cell--wrong");const q=v?t[m].value:j||k?"?":u[m];return e.jsx("div",{className:y,children:q},m)})},g))})}function ce(){const{progress:s,saveSession:a,resetTimer:t,logError:r}=U("pyramide-nombres"),{feedbackRef:u,triggerCorrect:i,triggerWrong:b}=W(),[o,f]=x.useState("setup"),[p,g]=x.useState(1),[m,k]=x.useState([]),[v,j]=x.useState(0),[N,y]=x.useState(0),[q,F]=x.useState({}),[P,A]=x.useState(0),[M,R]=x.useState(0),[$,D]=x.useState(null),[S,J]=x.useState(null),z=G[p-1],h=m[v]??null,X=x.useMemo(()=>{if(!h)return[];const n=h.hidden[N];return n===void 0?[]:V(h.cells[n])},[h,N]);function H(){const n=G[p-1],l=Array.from({length:L},()=>Z(n)),c=l.reduce((d,C)=>d+C.hidden.length,0);k(l),j(0),y(0),F({}),A(0),R(c),D(null),J(null),t(),f("play")}function B(n){if($!==null||!h)return;const l=h.hidden[N];if(l===void 0)return;const c=n===h.cells[l];D(c?"ok":"bad"),c?(A(d=>d+1),i()):(b(),r({label:`Pyramide — case ${l}`,correct:String(h.cells[l]),given:String(n)})),F(d=>({...d,[l]:{value:n,correct:c}})),setTimeout(()=>{const d=N+1;if(d<h.hidden.length){y(d),D(null);return}const C=v+1;if(C>=L){const _=c?P+1:P,I=_>=Math.ceil(M*.86)?3:_>=Math.ceil(M*.6)?2:1,O=a({score:_,level:p,stars:I});J(O),f("results");return}j(C),y(0),F({}),D(null)},800)}if(o==="setup")return e.jsxs("div",{className:"an-page",children:[e.jsx(E,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsx("h1",{className:"an-title",children:"🔺 Pyramide Additive"}),e.jsx("p",{className:"an-subtitle",children:"Remplis la pyramide en additionnant les briques !"}),e.jsx("div",{className:"jeux-level-grid",children:G.map((n,l)=>{const c=l+1,d=c>s.unlockedLevel,C=c===p;return e.jsx("button",{className:`jeux-level-btn${C?" is-selected":""}${d?" is-locked":""}`,onPointerDown:_=>{_.preventDefault(),d||g(c)},disabled:d,children:d?"🔒":`N${c}`},c)})}),e.jsxs("div",{className:"an-info-row",children:[e.jsxs("span",{children:["🔺 ",L," pyramides"]}),e.jsxs("span",{children:["❓ ",z.hiddenCount," case",z.hiddenCount>1?"s":""," cachée",z.hiddenCount>1?"s":""]})]}),e.jsxs("div",{className:"jeux-setup-stats",children:[e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:s.bestScore}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Meilleur score"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:ee(s.totalTimeSecs)}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Temps total"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:s.sessionsPlayed}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Parties"})]})]}),e.jsx("button",{className:"an-cta",onPointerDown:n=>{n.preventDefault(),H()},children:"▶ Jouer"})]});if(o==="results"){const n=P>=Math.ceil(M*.86)?3:P>=Math.ceil(M*.6)?2:1,l=n===3?"🎉 Parfait !":n===2?"👍 Bien joué !":"📚 Encore un effort !";return e.jsxs("div",{className:"an-page",children:[e.jsx("h2",{className:"an-result-title",children:l}),e.jsx("div",{className:"jeux-stars",children:"★".repeat(n)+"☆".repeat(3-n)}),e.jsxs("div",{className:"jeux-result-stat",children:[e.jsx("span",{children:"Cases correctes"}),e.jsxs("span",{children:[P," / ",M]})]}),(S==null?void 0:S.isNewBest)&&e.jsx("div",{className:"jeux-new-best",children:"🏆 Nouveau record !"}),(S==null?void 0:S.newUnlocked)&&e.jsxs("div",{className:"jeux-unlocked",children:["🔓 Niveau ",p+1," débloqué !"]}),e.jsxs("div",{className:"an-result-btns",children:[e.jsx("button",{className:"an-cta",onPointerDown:c=>{c.preventDefault(),H()},children:"Rejouer"}),e.jsx("button",{className:"an-cta an-cta--soft",onPointerDown:()=>f("setup"),children:"Niveaux"}),e.jsx(E,{to:"/jeux",className:"an-cta an-cta--soft",children:"← Jeux"})]})]})}return h?e.jsxs("div",{className:"an-page",children:[e.jsx(Y,{ref:u}),e.jsx(E,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsxs("div",{className:"an-hud",children:[e.jsxs("span",{className:"an-score",children:["⭐ ",P]}),e.jsxs("span",{className:"an-round",children:["Pyramide ",v+1," / ",L]})]}),e.jsxs("p",{className:"pyr-instruction",children:["Chaque brique = somme des deux briques en dessous. Trouve les ",e.jsx("strong",{children:"?"})," !"]}),e.jsx(se,{pyramid:h,hiddenIdx:N,filledValues:q,chosenFeedback:$}),e.jsx("div",{className:"pyr-choices",children:X.map((n,l)=>e.jsx("button",{className:"pyr-choice",onPointerDown:c=>{c.preventDefault(),B(n)},disabled:$!==null,children:n},l))}),e.jsx("style",{children:`
        .pyr-instruction {
          font-size: .9rem;
          text-align: center;
          opacity: .75;
          margin: 4px 0 12px;
        }
        .pyr-pyramid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin: 8px 0 20px;
        }
        .pyr-row {
          display: flex;
          gap: 6px;
          justify-content: center;
        }
        .pyr-cell {
          width: 58px;
          height: 58px;
          border-radius: 10px;
          background: #6366f1;
          color: #fff;
          font-size: 1.15rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0,0,0,.18);
          transition: background .2s, transform .15s;
        }
        .pyr-cell--hidden {
          background: #d1d5db;
          color: #6b7280;
        }
        .pyr-cell--active {
          background: #f59e0b;
          color: #fff;
          transform: scale(1.12);
          box-shadow: 0 4px 14px rgba(245,158,11,.5);
          animation: pyr-pulse .6s ease infinite alternate;
        }
        @keyframes pyr-pulse {
          from { box-shadow: 0 4px 14px rgba(245,158,11,.5); }
          to   { box-shadow: 0 4px 20px rgba(245,158,11,.9); }
        }
        .pyr-cell--correct {
          background: #22c55e !important;
          transform: scale(1.08);
        }
        .pyr-cell--wrong {
          background: #ef4444 !important;
          animation: pyr-shake .3s ease;
        }
        @keyframes pyr-shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }
        .pyr-choices {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 320px;
        }
        .pyr-choice {
          min-height: 64px;
          border: none;
          border-radius: 14px;
          background: var(--color-surface, #fff);
          box-shadow: 0 3px 10px rgba(0,0,0,.12);
          font-size: 1.4rem;
          font-weight: 900;
          cursor: pointer;
          transition: transform .1s, background .15s;
          touch-action: manipulation;
        }
        .pyr-choice:active:not(:disabled) {
          transform: scale(.93);
          background: #ede9fe;
        }
        .pyr-choice:disabled { opacity: .5; }
      `})]}):null}export{ce as default};
