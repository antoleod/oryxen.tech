import{r as d,j as e,L as g}from"./index-6LxDPmv8.js";import{u as $}from"./useGameSession-Dp3-cyXu.js";import{u as I,G}from"./GameFeedback-DkWMvfU2.js";/* empty css             */import"./recordPlayedExercise-By3v2zU5.js";const R=[{text:"La Belgique est en Europe.",answer:!0,level:1},{text:"Le chat est un oiseau.",answer:!1,level:1},{text:"2 + 2 = 4",answer:!0,level:1},{text:"Paris est la capitale de l'Espagne.",answer:!1,level:1},{text:"Le soleil se lève à l'est.",answer:!0,level:1},{text:"Il y a 7 jours dans une semaine.",answer:!0,level:1},{text:"Les dauphins sont des poissons.",answer:!1,level:1},{text:"La Lune tourne autour de la Terre.",answer:!0,level:1},{text:"3 × 5 = 20",answer:!1,level:1},{text:"Un triangle a 4 côtés.",answer:!1,level:1},{text:"Les plantes fabriquent leur nourriture grâce au soleil.",answer:!0,level:2},{text:"L'eau bout à 80°C au niveau de la mer.",answer:!1,level:2},{text:"Les baleines sont des mammifères.",answer:!0,level:2},{text:"La Terre a deux satellites naturels.",answer:!1,level:2},{text:"Les abeilles produisent du miel.",answer:!0,level:2},{text:"Les champignons sont des plantes.",answer:!1,level:2},{text:"La lumière voyage plus vite que le son.",answer:!0,level:2},{text:"Le cœur d'un humain bat environ 1000 fois par minute.",answer:!1,level:2},{text:"L'oxygène représente 21% de l'air.",answer:!0,level:2},{text:"Les dinosaures ont vécu avec les premiers humains.",answer:!1,level:2},{text:"Charlemagne était un roi franc.",answer:!0,level:3},{text:"L'Amazone est le plus long fleuve du monde.",answer:!1,level:3},{text:"La Révolution française a eu lieu en 1789.",answer:!0,level:3},{text:"Le Mont Everest est en Europe.",answer:!1,level:3},{text:"L'Afrique est le plus grand continent.",answer:!1,level:3},{text:"Jules César était un général romain.",answer:!0,level:3},{text:"La première Guerre mondiale a commencé en 1914.",answer:!0,level:3},{text:"Le Sahara est un désert froid.",answer:!1,level:3},{text:"L'ADN contient l'information génétique.",answer:!0,level:4},{text:"La photosynthèse produit de l'oxygène.",answer:!0,level:4},{text:"Les atomes sont constitués de protons, neutrons et électrons.",answer:!0,level:4},{text:"La vitesse du son est plus rapide dans l'air que dans l'eau.",answer:!1,level:4},{text:"Le pH de l'eau pure est de 7.",answer:!0,level:4},{text:"Le zéro est un nombre pair.",answer:!0,level:5},{text:"Un carré est un cas particulier de rectangle.",answer:!0,level:5},{text:"Les virus sont des êtres vivants.",answer:!1,level:5},{text:"Pi vaut exactement 3,14.",answer:!1,level:5},{text:"L'Antarctique est le continent le plus froid.",answer:!0,level:5}],N=[{label:"N1 — Faits simples",level:1,questions:10},{label:"N2 — Sciences & nature",level:2,questions:10},{label:"N3 — Histoire & géo",level:3,questions:8},{label:"N4 — Sciences avancées",level:4,questions:5},{label:"N5 — Questions pièges",level:5,questions:5}];function U(a){const r=[...a];for(let u=r.length-1;u>0;u--){const m=Math.floor(Math.random()*(u+1));[r[u],r[m]]=[r[m],r[u]]}return r}function V(a){return a<60?`${a}s`:`${Math.floor(a/60)}m${a%60}s`}function H(){const{progress:a,saveSession:r,resetTimer:u,logError:m}=$("vrai-faux"),{feedbackRef:D,triggerCorrect:P,triggerWrong:_}=I(),[L,p]=d.useState("setup"),[f,E]=d.useState(1),[F,M]=d.useState([]),[h,q]=d.useState(0),[x,S]=d.useState(0),[i,j]=d.useState(null),[v,k]=d.useState(null),o=N[f-1],c=F[h]??null;function y(){const s=N[f-1],l=R.filter(n=>n.level===s.level),t=U(l).slice(0,s.questions);M(t),q(0),S(0),j(null),k(null),u(),p("play")}function A(s){if(i!==null||!c)return;const l=s===c.answer;j(l?"correct":"wrong"),l?(S(t=>t+1),P()):(_(),m({label:c.text,correct:c.answer?"VRAI":"FAUX",given:s?"VRAI":"FAUX"})),setTimeout(()=>{const t=h+1;if(t>=o.questions){const n=l?x+1:x,b=n>=Math.ceil(o.questions*.86)?3:n>=Math.ceil(o.questions*.6)?2:1,w=r({score:n,level:f,stars:b});k(w),p("results");return}q(t),j(null)},1100)}if(L==="setup")return e.jsxs("div",{className:"an-page",children:[e.jsx(g,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsx("h1",{className:"an-title",children:"✅ Vrai ou Faux ?"}),e.jsx("p",{className:"an-subtitle",children:"Lis la phrase — est-ce vrai ou faux ?"}),e.jsx("div",{className:"jeux-level-grid",children:N.map((s,l)=>{const t=l+1,n=t>a.unlockedLevel,b=t===f;return e.jsx("button",{className:`jeux-level-btn${b?" is-selected":""}${n?" is-locked":""}`,onPointerDown:w=>{w.preventDefault(),n||E(t)},disabled:n,children:n?"🔒":`N${t}`},t)})}),e.jsx("div",{className:"an-info-row",children:e.jsxs("span",{children:["📝 ",o.questions," questions"]})}),e.jsxs("div",{className:"jeux-setup-stats",children:[e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:a.bestScore}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Meilleur score"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:V(a.totalTimeSecs)}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Temps total"})]}),e.jsxs("div",{className:"jeux-setup-stat",children:[e.jsx("span",{className:"jeux-setup-stat__val",children:a.sessionsPlayed}),e.jsx("span",{className:"jeux-setup-stat__lbl",children:"Parties"})]})]}),e.jsx("button",{className:"an-cta",onPointerDown:s=>{s.preventDefault(),y()},children:"▶ Jouer"})]});if(L==="results"){const s=x>=Math.ceil(o.questions*.86)?3:x>=Math.ceil(o.questions*.6)?2:1,l=s===3?"🎉 Parfait !":s===2?"👍 Bien joué !":"📚 Encore un effort !";return e.jsxs("div",{className:"an-page",children:[e.jsx("h2",{className:"an-result-title",children:l}),e.jsx("div",{className:"jeux-stars",children:"★".repeat(s)+"☆".repeat(3-s)}),e.jsxs("div",{className:"jeux-result-stat",children:[e.jsx("span",{children:"Score"}),e.jsxs("span",{children:[x," / ",o.questions]})]}),(v==null?void 0:v.isNewBest)&&e.jsx("div",{className:"jeux-new-best",children:"🏆 Nouveau record !"}),(v==null?void 0:v.newUnlocked)&&e.jsxs("div",{className:"jeux-unlocked",children:["🔓 Niveau ",f+1," débloqué !"]}),e.jsxs("div",{className:"an-result-btns",children:[e.jsx("button",{className:"an-cta",onPointerDown:t=>{t.preventDefault(),y()},children:"Rejouer"}),e.jsx("button",{className:"an-cta an-cta--soft",onPointerDown:()=>p("setup"),children:"Niveaux"}),e.jsx(g,{to:"/jeux",className:"an-cta an-cta--soft",children:"← Jeux"})]})]})}if(!c)return null;const T=i==="correct"?" an-flash-ok":i==="wrong"?" an-flash-bad":"";return e.jsxs("div",{className:`an-page${T}`,children:[e.jsx(G,{ref:D}),e.jsx(g,{to:"/jeux",className:"exam-back-btn",children:"←"}),e.jsxs("div",{className:"an-hud",children:[e.jsxs("span",{className:"an-score",children:["⭐ ",x]}),e.jsxs("span",{className:"an-round",children:[h+1," / ",o.questions]})]}),e.jsxs("div",{className:"vf-card",children:[e.jsx("p",{className:"vf-statement",children:c.text}),i==="wrong"&&e.jsxs("p",{className:"vf-correct-reveal",children:["Bonne réponse : ",c.answer?"✅ VRAI":"❌ FAUX"]})]}),e.jsxs("div",{className:"vf-btns",children:[e.jsx("button",{className:`vf-btn vf-btn--true${i!==null?" vf-btn--disabled":""}`,onPointerDown:s=>{s.preventDefault(),A(!0)},disabled:i!==null,children:"✅ VRAI"}),e.jsx("button",{className:`vf-btn vf-btn--false${i!==null?" vf-btn--disabled":""}`,onPointerDown:s=>{s.preventDefault(),A(!1)},disabled:i!==null,children:"❌ FAUX"})]}),e.jsx("style",{children:`
        .vf-card {
          background: var(--color-surface, #fff);
          border-radius: 16px;
          padding: 28px 20px;
          margin: 16px 0 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          min-height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .vf-statement {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
          line-height: 1.4;
          margin: 0;
        }
        .vf-correct-reveal {
          font-size: 1rem;
          font-weight: 600;
          color: #22c55e;
          margin: 0;
          animation: vf-reveal-in .2s ease;
        }
        @keyframes vf-reveal-in { from { opacity:0; transform:translateY(6px);} to {opacity:1;transform:none;} }
        .vf-btns {
          display: flex;
          gap: 16px;
          width: 100%;
          max-width: 380px;
        }
        .vf-btn {
          flex: 1;
          min-height: 70px;
          border: none;
          border-radius: 16px;
          font-size: 1.3rem;
          font-weight: 900;
          cursor: pointer;
          transition: transform .1s, opacity .1s;
          touch-action: manipulation;
        }
        .vf-btn:active { transform: scale(.95); }
        .vf-btn--true  { background: #22c55e; color: #fff; }
        .vf-btn--false { background: #ef4444; color: #fff; }
        .vf-btn--disabled { opacity: .55; pointer-events: none; }
      `})]})}export{H as default};
