"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[696],{696:(e,t,s)=>{s.d(t,{SessionProvider:()=>el,getSession:()=>er,CI:()=>ei,wV:()=>eo});var n,o,r,a,i,l=s(5155),c=s(2115),d=s.t(c,2);class u extends Error{constructor(e,t){e instanceof Error?super(void 0,{cause:{err:e,...e.cause,...t}}):"string"==typeof e?(t instanceof Error&&(t={err:t,...t.cause}),super(e,t)):super(void 0,e),this.name=this.constructor.name,this.type=this.constructor.type??"AuthError",this.kind=this.constructor.kind??"error",Error.captureStackTrace?.(this,this.constructor);let s=`https://errors.authjs.dev#${this.type.toLowerCase()}`;this.message+=`${this.message?". ":""}Read more at ${s}`}}class v extends u{}v.kind="signIn";class p extends u{}p.type="AdapterError";class h extends u{}h.type="AccessDenied";class y extends u{}y.type="CallbackRouteError";class f extends u{}f.type="ErrorPageLoop";class g extends u{}g.type="EventError";class w extends u{}w.type="InvalidCallbackUrl";class E extends v{constructor(){super(...arguments),this.code="credentials"}}E.type="CredentialsSignin";class x extends u{}x.type="InvalidEndpoints";class S extends u{}S.type="InvalidCheck";class _ extends u{}_.type="JWTSessionError";class b extends u{}b.type="MissingAdapter";class m extends u{}m.type="MissingAdapterMethods";class L extends u{}L.type="MissingAuthorize";class U extends u{}U.type="MissingSecret";class k extends v{}k.type="OAuthAccountNotLinked";class A extends v{}A.type="OAuthCallbackError";class R extends u{}R.type="OAuthProfileParseError";class C extends u{}C.type="SessionTokenError";class T extends v{}T.type="OAuthSignInError";class N extends v{}N.type="EmailSignInError";class P extends u{}P.type="SignOutError";class I extends u{}I.type="UnknownAction";class M extends u{}M.type="UnsupportedStrategy";class O extends u{}O.type="InvalidProvider";class H extends u{}H.type="UntrustedHost";class X extends u{}X.type="Verification";class j extends v{}j.type="MissingCSRF";class V extends u{}V.type="DuplicateConditionalUI";class W extends u{}W.type="MissingWebAuthnAutocomplete";class $ extends u{}$.type="WebAuthnVerificationError";class D extends v{}D.type="AccountNotLinked";class F extends u{}F.type="ExperimentalFeatureNotEnabled";class B extends u{}class J extends u{}async function q(e,t,s){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o="".concat(z(t),"/").concat(e);try{var r;let e={headers:{"Content-Type":"application/json",...(null==n?void 0:null===(r=n.headers)||void 0===r?void 0:r.cookie)?{cookie:n.headers.cookie}:{}}};(null==n?void 0:n.body)&&(e.body=JSON.stringify(n.body),e.method="POST");let t=await fetch(o,e),s=await t.json();if(!t.ok)throw s;return s}catch(e){return s.error(new B(e.message,e)),null}}function z(e){return"undefined"==typeof window?"".concat(e.baseUrlServer).concat(e.basePathServer):e.basePath}function G(){return Math.floor(Date.now()/1e3)}function K(e){let t=new URL("http://localhost:3000/api/auth");e&&!e.startsWith("http")&&(e="https://".concat(e));let s=new URL(e||t),n=("/"===s.pathname?t.pathname:s.pathname).replace(/\/$/,""),o="".concat(s.origin).concat(n);return{origin:s.origin,host:s.host,path:n,base:o,toString:()=>o}}var Q=s(2818);let Y={baseUrl:K(null!==(o=Q.env.NEXTAUTH_URL)&&void 0!==o?o:Q.env.VERCEL_URL).origin,basePath:K(Q.env.NEXTAUTH_URL).path,baseUrlServer:K(null!==(a=null!==(r=Q.env.NEXTAUTH_URL_INTERNAL)&&void 0!==r?r:Q.env.NEXTAUTH_URL)&&void 0!==a?a:Q.env.VERCEL_URL).origin,basePathServer:K(null!==(i=Q.env.NEXTAUTH_URL_INTERNAL)&&void 0!==i?i:Q.env.NEXTAUTH_URL).path,_lastSync:0,_session:void 0,_getSession:()=>{}},Z=null;function ee(){return new BroadcastChannel("next-auth")}function et(){return"undefined"==typeof BroadcastChannel?{postMessage:()=>{},addEventListener:()=>{},removeEventListener:()=>{}}:(null===Z&&(Z=ee()),Z)}let es={debug:console.debug,error:console.error,warn:console.warn},en=null===(n=c.createContext)||void 0===n?void 0:n.call(d,void 0);function eo(e){if(!en)throw Error("React Context is unavailable in Server Components");let t=c.useContext(en),{required:s,onUnauthenticated:n}=null!=e?e:{},o=s&&"unauthenticated"===t.status;return(c.useEffect(()=>{if(o){let e="".concat(Y.basePath,"/signin?").concat(new URLSearchParams({error:"SessionRequired",callbackUrl:window.location.href}));n?n():window.location.href=e}},[o,n]),o)?{data:t.data,update:t.update,status:"loading"}:t}async function er(e){var t;let s=await q("session",Y,es,e);return(null===(t=null==e?void 0:e.broadcast)||void 0===t||t)&&ee().postMessage({event:"session",data:{trigger:"getSession"}}),s}async function ea(){var e;let t=await q("csrf",Y,es);return null!==(e=null==t?void 0:t.csrfToken)&&void 0!==e?e:""}async function ei(e){var t,s,n,o;let r=null!==(s=null!==(t=null==e?void 0:e.redirectTo)&&void 0!==t?t:null==e?void 0:e.callbackUrl)&&void 0!==s?s:window.location.href,a=z(Y),i=await ea(),l=await fetch("".concat(a,"/signout"),{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},body:new URLSearchParams({csrfToken:i,callbackUrl:r})}),c=await l.json();if(et().postMessage({event:"session",data:{trigger:"signout"}}),null===(n=null==e?void 0:e.redirect)||void 0===n||n){let e=null!==(o=c.url)&&void 0!==o?o:r;window.location.href=e,e.includes("#")&&window.location.reload();return}return await Y._getSession({event:"storage"}),c}function el(e){if(!en)throw Error("React Context is unavailable in Server Components");let{children:t,basePath:s,refetchInterval:n,refetchWhenOffline:o}=e;s&&(Y.basePath=s);let r=void 0!==e.session;Y._lastSync=r?G():0;let[a,i]=c.useState(()=>(r&&(Y._session=e.session),e.session)),[d,u]=c.useState(!r);c.useEffect(()=>(Y._getSession=async function(){let{event:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{let t="storage"===e;if(t||void 0===Y._session){Y._lastSync=G(),Y._session=await er({broadcast:!t}),i(Y._session);return}if(!e||null===Y._session||G()<Y._lastSync)return;Y._lastSync=G(),Y._session=await er(),i(Y._session)}catch(e){es.error(new J(e.message,e))}finally{u(!1)}},Y._getSession(),()=>{Y._lastSync=0,Y._session=void 0,Y._getSession=()=>{}}),[]),c.useEffect(()=>{let e=()=>Y._getSession({event:"storage"});return et().addEventListener("message",e),()=>et().removeEventListener("message",e)},[]),c.useEffect(()=>{let{refetchOnWindowFocus:t=!0}=e,s=()=>{t&&"visible"===document.visibilityState&&Y._getSession({event:"visibilitychange"})};return document.addEventListener("visibilitychange",s,!1),()=>document.removeEventListener("visibilitychange",s,!1)},[e.refetchOnWindowFocus]);let v=function(){let[e,t]=c.useState("undefined"!=typeof navigator&&navigator.onLine),s=()=>t(!0),n=()=>t(!1);return c.useEffect(()=>(window.addEventListener("online",s),window.addEventListener("offline",n),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",n)}),[]),e}(),p=!1!==o||v;c.useEffect(()=>{if(n&&p){let e=setInterval(()=>{Y._session&&Y._getSession({event:"poll"})},1e3*n);return()=>clearInterval(e)}},[n,p]);let h=c.useMemo(()=>({data:a,status:d?"loading":a?"authenticated":"unauthenticated",async update(e){if(d)return;u(!0);let t=await q("session",Y,es,void 0===e?void 0:{body:{csrfToken:await ea(),data:e}});return u(!1),t&&(i(t),et().postMessage({event:"session",data:{trigger:"getSession"}})),t}}),[a,d]);return(0,l.jsx)(en.Provider,{value:h,children:t})}}}]);