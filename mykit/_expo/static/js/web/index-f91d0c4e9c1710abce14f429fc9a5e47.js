__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},1413,[1418]);
__d(function(g,r,i,a,m,_e2,d){"use strict";Object.defineProperty(_e2,'__esModule',{value:!0}),Object.defineProperty(_e2,"CustomProvider",{enumerable:!0,get:function(){return be}}),Object.defineProperty(_e2,"ReCaptchaEnterpriseProvider",{enumerable:!0,get:function(){return ke}}),Object.defineProperty(_e2,"ReCaptchaV3Provider",{enumerable:!0,get:function(){return fe}}),Object.defineProperty(_e2,"getLimitedUseToken",{enumerable:!0,get:function(){return Ae}}),Object.defineProperty(_e2,"getToken",{enumerable:!0,get:function(){return Ee}}),Object.defineProperty(_e2,"initializeAppCheck",{enumerable:!0,get:function(){return ve}}),Object.defineProperty(_e2,"onTokenChanged",{enumerable:!0,get:function(){return _e}}),Object.defineProperty(_e2,"setTokenAutoRefreshEnabled",{enumerable:!0,get:function(){return Te}});var e=r(d[0]),t=r(d[1]),n=r(d[2]),o=r(d[3]);
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const s=new Map,c={activated:!1,tokenObservers:[]},p={initialized:!1,enabled:!1};function h(e){return s.get(e)||Object.assign({},c)}function l(e,t){return s.set(e,t),s.get(e)}function u(){return p}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const f='https://content-firebaseappcheck.googleapis.com/v1',k='exchangeDebugToken',b={RETRIAL_MIN_WAIT:3e4,RETRIAL_MAX_WAIT:96e4};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class w{constructor(e,t,n,o,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=n,this.lowerBound=o,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=o,o>s)throw new Error('Proactive refresh lower bound greater than upper bound!')}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject('cancelled'),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new n.Deferred,this.pending.promise.catch(e=>{}),await(t=this.getNextRun(e),new Promise(e=>{setTimeout(e,t)})),this.pending.resolve(),await this.pending.promise,this.pending=new n.Deferred,this.pending.promise.catch(e=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(e){this.retryPolicy(e)?this.process(!1).catch(()=>{}):this.stop()}var t;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const e=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),e}}}const v={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',"storage-open":'Error thrown when opening storage. Original error: {$originalErrorMessage}.',"storage-get":'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',"storage-set":'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',"recaptcha-error":'ReCAPTCHA error.',"initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},y=new n.ErrorFactory('appCheck','AppCheck',v);
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function T(e=!1){return e?self.grecaptcha?.enterprise:self.grecaptcha}function E(e){if(!h(e).activated)throw y.create("use-before-activation",{appName:e.name})}function A(e){const t=Math.round(e/1e3),n=Math.floor(t/86400),o=Math.floor((t-3600*n*24)/3600),s=Math.floor((t-3600*n*24-3600*o)/60),c=t-3600*n*24-3600*o-60*s;let p='';return n&&(p+=_(n)+'d:'),o&&(p+=_(o)+'h:'),p+=_(s)+'m:'+_(c)+'s',p}function _(e){return 0===e?'00':e>=10?e.toString():'0'+e}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function P({url:e,body:t},n){const o={'Content-Type':'application/json'},s=n.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&(o['X-Firebase-Client']=e)}const c={method:'POST',body:JSON.stringify(t),headers:o};let p,h;try{p=await fetch(e,c)}catch(e){throw y.create("fetch-network-error",{originalErrorMessage:e?.message})}if(200!==p.status)throw y.create("fetch-status-error",{httpStatus:p.status});try{h=await p.json()}catch(e){throw y.create("fetch-parse-error",{originalErrorMessage:e?.message})}const l=h.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw y.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${h.ttl}`});const u=1e3*Number(l[1]),f=Date.now();return{token:h.token,expireTimeMillis:f+u,issuedAtTimeMillis:f}}function C(e,t){const{projectId:n,appId:o,apiKey:s}=e.options;return{url:`${f}/projects/${n}/apps/${o}:exchangeRecaptchaV3Token?key=${s}`,body:{recaptcha_v3_token:t}}}function I(e,t){const{projectId:n,appId:o,apiKey:s}=e.options;return{url:`${f}/projects/${n}/apps/${o}:exchangeRecaptchaEnterpriseToken?key=${s}`,body:{recaptcha_enterprise_token:t}}}function R(e,t){const{projectId:n,appId:o,apiKey:s}=e.options;return{url:`${f}/projects/${n}/apps/${o}:${k}?key=${s}`,body:{debug_token:t}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const D='firebase-app-check-database',S=1,O='firebase-app-check-store',$='debug-token';let x=null;function M(){return x||(x=new Promise((e,t)=>{try{const n=indexedDB.open(D,S);n.onsuccess=t=>{e(t.target.result)},n.onerror=e=>{t(y.create("storage-open",{originalErrorMessage:e.target.error?.message}))},n.onupgradeneeded=e=>{const t=e.target.result;if(0===e.oldVersion)t.createObjectStore(O,{keyPath:'compositeKey'})}}catch(e){t(y.create("storage-open",{originalErrorMessage:e?.message}))}}),x)}function j(e){return B(F(e))}function N(e,t){return z(F(e),t)}async function z(e,t){const n=(await M()).transaction(O,'readwrite'),o=n.objectStore(O).put({compositeKey:e,value:t});return new Promise((e,t)=>{o.onsuccess=t=>{e()},n.onerror=e=>{t(y.create("storage-set",{originalErrorMessage:e.target.error?.message}))}})}async function B(e){const t=(await M()).transaction(O,'readonly'),n=t.objectStore(O).get(e);return new Promise((e,o)=>{n.onsuccess=t=>{const n=t.target.result;e(n?n.value:void 0)},t.onerror=e=>{o(y.create("storage-get",{originalErrorMessage:e.target.error?.message}))}})}function F(e){return`${e.options.appId}-${e.name}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const K=new o.Logger('@firebase/app-check');
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function L(e){if((0,n.isIndexedDBAvailable)()){let t;try{t=await j(e)}catch(e){K.warn(`Failed to read token from IndexedDB. Error: ${e}`)}return t}}function H(e,t){return(0,n.isIndexedDBAvailable)()?N(e,t).catch(e=>{K.warn(`Failed to write token to IndexedDB. Error: ${e}`)}):Promise.resolve()}async function W(e){let t;try{t=await B($)}catch(e){}if(t)return t;{const t=crypto.randomUUID();let o=`To use this token for app debugging, register it with your project.\n\nFirebase App Check debug token: ${t}\n\n`;const s=e?.options.appId,c=e?.options.projectId;return o+=c&&s?`You can do so in the Firebase Console:\nhttps://console.firebase.google.com/project/${c}/appcheck/apps?selectedAppId=${s}\n\nOr using the Firebase CLI:\nfirebase appcheck:debugtokens:create ${t} --project ${c} --app ${s}\n\n`:"You will need to add it to your app's App Check settings in the Firebase Console for it to work.\n\n",o+="Note: To keep your project secure, please revoke and delete this token using the\nFirebase Console or the CLI (`firebase appcheck:debugtokens:delete`) when you finish debugging.\n\nWarning: This debug token is a secret and should not be shared or uploaded to source code.\n\nDebug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider\nFirebase CLI install instructions: https://firebase.google.com/docs/cli\n",console.log(o),(n=t,z($,n)).catch(e=>K.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`)),t}var n}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function q(){return u().enabled}async function U(){const e=u();if(e.enabled&&e.token)return e.token.promise;throw Error("\n            Can't get debug token in production mode.\n        ")}function X(e){const t=(0,n.getGlobal)(),o=u();if(o.initialized=!0,'string'!=typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN&&!0!==t.FIREBASE_APPCHECK_DEBUG_TOKEN)return;o.enabled=!0;const s=new n.Deferred;o.token=s,'string'==typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN?s.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(W(e))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const G={error:'UNKNOWN_ERROR'};async function V(e,t=!1,n=!1){const o=e.app;E(o);const s=h(o);let c,p=s.token;if(p&&!re(p)&&(s.token=void 0,p=void 0),!p){const e=await s.cachedTokenPromise;e&&(re(e)?p=e:await H(o,void 0))}if(!t&&p&&re(p))return{token:p.token};let l,u=!1;if(q())try{const t=await U();s.exchangeTokenPromise||(s.exchangeTokenPromise=P(R(o,t),e.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),u=!0);const n=await s.exchangeTokenPromise;return await H(o,n),s.token=n,{token:n.token}}catch(e){return"appCheck/throttled"===e.code||"appCheck/initial-throttle"===e.code?K.warn(e.message):n&&K.error(e),ne(e)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),u=!0),p=await h(o).exchangeTokenPromise}catch(e){"appCheck/throttled"===e.code||"appCheck/initial-throttle"===e.code?K.warn(e.message):n&&K.error(e),c=e}return p?c?l=re(p)?{token:p.token,internalError:c}:ne(c):(l={token:p.token},s.token=p,await H(o,p)):l=ne(c),u&&te(o,l),l}async function Y(e){const t=e.app;E(t);const{provider:n}=h(t);if(q()){const n=R(t,await U());n.body.limited_use=!0;const{token:o}=await P(n,e.heartbeatServiceProvider);return{token:o}}{const{token:e}=await n.getToken(!0);return{token:e}}}function J(e,t,n,o){const{app:s}=e,c=h(s),p={next:n,error:o,type:t};if(c.tokenObservers=[...c.tokenObservers,p],c.token&&re(c.token)){const t=c.token;Promise.resolve().then(()=>{n({token:t.token}),Z(e)}).catch(()=>{})}c.cachedTokenPromise.then(()=>Z(e))}function Q(e,t){const n=h(e),o=n.tokenObservers.filter(e=>e.next!==t);0===o.length&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=o}function Z(e){const{app:t}=e,n=h(t);let o=n.tokenRefresher;o||(o=ee(e),n.tokenRefresher=o),!o.isRunning()&&n.isTokenAutoRefreshEnabled&&o.start()}function ee(e){const{app:t}=e;return new w(async()=>{let n;if(n=h(t).token?await V(e,!0):await V(e),n.error)throw n.error;if(n.internalError)throw n.internalError},()=>!0,()=>{const e=h(t);if(e.token){let t=e.token.issuedAtTimeMillis+.5*(e.token.expireTimeMillis-e.token.issuedAtTimeMillis)+3e5;const n=e.token.expireTimeMillis-3e5;return t=Math.min(t,n),Math.max(0,t-Date.now())}return 0},b.RETRIAL_MIN_WAIT,b.RETRIAL_MAX_WAIT)}function te(e,t){const n=h(e).tokenObservers;for(const e of n)try{"EXTERNAL"===e.type&&null!=t.error?e.error(t.error):e.next(t)}catch(e){}}function re(e){return e.expireTimeMillis-Date.now()>0}function ne(e){return{token:(t=G,n.base64.encodeString(JSON.stringify(t),!1)),error:e};var t}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class oe{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){const{tokenObservers:e}=h(this.app);for(const t of e)Q(this.app,t.next);return Promise.resolve()}}function ie(e,t){return new oe(e,t)}function ae(e){return{getToken:t=>V(e,t),getLimitedUseToken:()=>Y(e),addTokenListener:t=>J(e,"INTERNAL",t),removeTokenListener:t=>Q(e.app,t)}}function se(e,t){const o=new n.Deferred;h(e).reCAPTCHAState={initialized:o};const s=he(e),c=T(!1);return c?pe(e,t,c,s,o):de(()=>{const n=T(!1);if(!n)throw new Error('no recaptcha');pe(e,t,n,s,o)}),o.promise}function ce(e,t){const o=new n.Deferred;h(e).reCAPTCHAState={initialized:o};const s=he(e),c=T(!0);return c?pe(e,t,c,s,o):ge(()=>{const n=T(!0);if(!n)throw new Error('no recaptcha');pe(e,t,n,s,o)}),o.promise}function pe(e,t,n,o,s){n.ready(()=>{ue(e,t,n,o),s.resolve(n)})}function he(e){const t=`fire_app_check_${e.name}`,n=document.createElement('div');return n.id=t,n.style.display='none',document.body.appendChild(n),t}async function le(e){E(e);const t=h(e).reCAPTCHAState,n=await t.initialized.promise;return new Promise((t,o)=>{const s=h(e).reCAPTCHAState;n.ready(()=>{t(n.execute(s.widgetId,{action:'fire_app_check'}))})})}function ue(e,t,n,o){const s=n.render(o,{sitekey:t,size:'invisible',callback:()=>{h(e).reCAPTCHAState.succeeded=!0},'error-callback':()=>{h(e).reCAPTCHAState.succeeded=!1}}),c=h(e);c.reCAPTCHAState=Object.assign({},c.reCAPTCHAState,{widgetId:s})}function de(e){const t=document.createElement('script');t.src="https://www.google.com/recaptcha/api.js",t.onload=e,document.head.appendChild(t)}function ge(e){const t=document.createElement('script');t.src="https://www.google.com/recaptcha/enterprise.js?render=explicit",t.onload=e,document.head.appendChild(t)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class fe{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){me(this._throttleData);const t=await le(this._app).catch(e=>{throw y.create("recaptcha-error")});if(!h(this._app).reCAPTCHAState?.succeeded)throw y.create("recaptcha-error");let n;try{const o=C(this._app,t);e&&(o.body.limited_use=!0),n=await P(o,this._heartbeatServiceProvider)}catch(e){throw e.code?.includes("fetch-status-error")?(this._throttleData=we(Number(e.customData?.httpStatus),this._throttleData),y.create("initial-throttle",{time:A(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,n}initialize(t){this._app=t,this._heartbeatServiceProvider=(0,e._getProvider)(t,'heartbeat'),se(t,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof fe&&this._siteKey===e._siteKey}}class ke{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){me(this._throttleData);const t=await le(this._app).catch(e=>{throw y.create("recaptcha-error")});if(!h(this._app).reCAPTCHAState?.succeeded)throw y.create("recaptcha-error");let n;try{const o=I(this._app,t);e&&(o.body.limited_use=!0),n=await P(o,this._heartbeatServiceProvider)}catch(e){throw e.code?.includes("fetch-status-error")?(this._throttleData=we(Number(e.customData?.httpStatus),this._throttleData),y.create("initial-throttle",{time:A(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):e}return this._throttleData=null,n}initialize(t){this._app=t,this._heartbeatServiceProvider=(0,e._getProvider)(t,'heartbeat'),ce(t,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ke&&this._siteKey===e._siteKey}}class be{constructor(e){this._customProviderOptions=e}async getToken(){const e=await this._customProviderOptions.getToken(),t=(0,n.issuedAtTime)(e.token),o=null!==t&&t<Date.now()&&t>0?1e3*t:Date.now();return Object.assign({},e,{issuedAtTimeMillis:o})}initialize(e){this._app=e}isEqual(e){return e instanceof be&&this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString()}}function we(e,t){if(404===e||403===e)return{backoffCount:1,allowRequestsAfter:Date.now()+864e5,httpStatus:e};{const o=t?t.backoffCount:0,s=(0,n.calculateBackoffMillis)(o,1e3,2);return{backoffCount:o+1,allowRequestsAfter:Date.now()+s,httpStatus:e}}}function me(e){if(e&&Date.now()-e.allowRequestsAfter<=0)throw y.create("throttled",{time:A(e.allowRequestsAfter-Date.now()),httpStatus:e.httpStatus})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ve(t=(0,e.getApp)(),o){t=(0,n.getModularInstance)(t);const s=(0,e._getProvider)(t,'app-check');if(u().initialized||X(t),q()&&U().then(e=>{console.log(`Firebase App Check debug token: ${e}`)}),s.isInitialized()){const e=s.getImmediate(),n=s.getOptions();if(n&&!!n.isTokenAutoRefreshEnabled==!!o.isTokenAutoRefreshEnabled&&n.provider?.isEqual(o.provider))return e;throw y.create("already-initialized",{appName:t.name})}const c=s.initialize({options:o});return ye(t,o.provider,o.isTokenAutoRefreshEnabled),h(t).isTokenAutoRefreshEnabled&&J(c,"INTERNAL",()=>{}),c}function ye(e,t,n=!1){const o=l(e,Object.assign({},c));o.activated=!0,o.provider=t,o.cachedTokenPromise=L(e).then(t=>(t&&re(t)&&(o.token=t,te(e,{token:t.token})),t)),o.isTokenAutoRefreshEnabled=n&&e.automaticDataCollectionEnabled,!e.automaticDataCollectionEnabled&&n&&K.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),o.provider.initialize(e)}function Te(e,t){const n=h(e.app);n.tokenRefresher&&(!0===t?n.tokenRefresher.start():n.tokenRefresher.stop()),n.isTokenAutoRefreshEnabled=t}async function Ee(e,t){const n=await V(e,t);if(n.error)throw n.error;if(n.internalError)throw n.internalError;return{token:n.token}}function Ae(e){return Y(e)}function _e(e,t,n,o){let s=()=>{},c=()=>{};return s=null!=t.next?t.next.bind(t):t,null!=t.error?c=t.error.bind(t):n&&(c=n),J(e,"EXTERNAL",s,c),()=>Q(e.app,s)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Pe='app-check-internal';(0,e._registerComponent)(new t.Component("app-check",e=>ie(e.getProvider('app').getImmediate(),e.getProvider('heartbeat')),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider(Pe).initialize()})),(0,e._registerComponent)(new t.Component(Pe,e=>ae(e.getProvider('app-check').getImmediate()),"PUBLIC").setInstantiationMode("EXPLICIT")),(0,e.registerVersion)("@firebase/app-check","0.13.1")},1418,[711,712,713,715]);