(()=>{var e={};e.id=121,e.ids=[121],e.modules={399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},2615:e=>{"use strict";e.exports=require("http")},5240:e=>{"use strict";e.exports=require("https")},8216:e=>{"use strict";e.exports=require("net")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},1568:e=>{"use strict";e.exports=require("zlib")},2254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},7261:e=>{"use strict";e.exports=require("node:util")},3739:()=>{},5563:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>w,routeModule:()=>u,serverHooks:()=>h,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>p});var i={};r.r(i),r.d(i,{GET:()=>n});var s=r(2412),a=r(4293),o=r(4147),c=r(3419),l=r(7856);let n=(0,r(4960).I8)(async e=>{let t=e.nextUrl.searchParams,r=t.get("page")?Number(t.get("page")):1;if(!e.auth)return l.NextResponse.json({error:"Unauthorized - Not logged in"},{status:401});let{user:{email:i}}=e.auth,s=await (0,c.OT)(r,i);return l.NextResponse.json({favorites:s})}),u=new s.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/favorites/route",pathname:"/api/favorites",filename:"route",bundlePath:"app/api/favorites/route"},resolvedPagePath:"/Users/altonandrews/Desktop/atlas-cinema-guru/app/api/favorites/route.ts",nextConfigOutput:"",userland:i}),{workAsyncStorage:d,workUnitAsyncStorage:p,serverHooks:h}=u;function w(){return(0,o.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:p})}},5303:()=>{},4960:(e,t,r)=>{"use strict";r.d(t,{I8:()=>o});let{handlers:i,signIn:s,signOut:a,auth:o}=(0,r(9180).ZP)({theme:{brandColor:"#1ED2AF",logo:"/logo.png",buttonText:"#ffffff"},providers:[],callbacks:{authorized:async({auth:e})=>!!e}})},3419:(e,t,r)=>{"use strict";r.d(t,{r7:()=>l,Zm:()=>p,b_:()=>n,ij:()=>f,OT:()=>o,BQ:()=>w,zf:()=>a,Kv:()=>u,BT:()=>c,u9:()=>d,iA:()=>h});var i=r(2734);let s=(0,r(9872).z)();async function a(e,t,r,i,a,o){try{let c=(await s.selectFrom("favorites").select("title_id").where("user_id","=",o).execute()).map(e=>e.title_id),l=(await s.selectFrom("watchlater").select("title_id").where("user_id","=",o).execute()).map(e=>e.title_id);return(await s.selectFrom("titles").selectAll("titles").where("titles.released",">=",t).where("titles.released","<=",r).where("titles.title","ilike",`%${i}%`).where("titles.genre","in",a).orderBy("titles.title","asc").limit(6).offset((e-1)*6).execute()).map(e=>({...e,favorited:c.includes(e.id),watchLater:l.includes(e.id),image:`/images/${e.id}.webp`}))}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch topics.")}}async function o(e,t){try{let r=(await s.selectFrom("watchlater").select("title_id").where("user_id","=",t).execute()).map(e=>e.title_id);return(await s.selectFrom("titles").selectAll("titles").innerJoin("favorites","titles.id","favorites.title_id").where("favorites.user_id","=",t).orderBy("titles.released","asc").limit(6).offset((e-1)*6).execute()).map(e=>({...e,favorited:!0,watchLater:r.includes(e.id),image:`/images/${e.id}.webp`}))}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch favorites.")}}async function c(e,t){try{let r=await (0,i.i6)`INSERT INTO favorites (title_id, user_id) VALUES (${e}, ${t})`;return E(e,t,"FAVORITED"),r.rows}catch(e){throw console.error("Database Error:",e),Error("Failed to add favorite.")}}async function l(e,t){try{return(await (0,i.i6)`DELETE FROM favorites WHERE title_id = ${e} AND user_id = ${t}`).rows}catch(e){throw console.error("Database Error:",e),Error("Failed to delete favorite.")}}async function n(e,t){try{return(await (0,i.i6)`SELECT * FROM favorites WHERE title_id = ${e} AND user_id = ${t}`).rows.length>0}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch favorite.")}}async function u(e,t){try{let r=(await s.selectFrom("favorites").select("title_id").where("user_id","=",t).execute()).map(e=>e.title_id);return(await s.selectFrom("titles").selectAll("titles").innerJoin("watchlater","titles.id","watchlater.title_id").where("watchlater.user_id","=",t).orderBy("titles.released","asc").limit(6).offset((e-1)*6).execute()).map(e=>({...e,favorited:r.includes(e.id),watchLater:!0,image:`/images/${e.id}.webp`}))}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch watchLater.")}}async function d(e,t){try{let r=await (0,i.i6)`INSERT INTO watchLater (title_id, user_id) VALUES (${e}, ${t})`;return E(e,t,"WATCH_LATER"),r.rows}catch(e){throw console.error("Database Error:",e),Error("Failed to add watchLater.")}}async function p(e,t){try{return(await (0,i.i6)`DELETE FROM watchLater WHERE title_id = ${e} AND user_id = ${t}`).rows}catch(e){throw console.error("Database Error:",e),Error("Failed to add watchLater.")}}async function h(e,t){try{return(await (0,i.i6)`SELECT * FROM watchLater WHERE title_id = ${e} AND user_id = ${t}`).rows.length>0}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch watchLater.")}}async function w(){return(await (0,i.i6)`
        SELECT DISTINCT titles.genre
        FROM titles;
      `).rows.map(e=>e.genre)}async function f(e,t){try{return await s.selectFrom("activities").innerJoin("titles","activities.title_id","titles.id").select(["activities.id","activities.timestamp","activities.activity","titles.title"]).where("activities.user_id","=",t).orderBy("activities.timestamp","desc").limit(10).offset((e-1)*10).execute()}catch(e){throw console.error("Database Error:",e),Error("Failed to fetch favorites.")}}async function E(e,t,r){try{return(await (0,i.i6)`INSERT INTO activities (title_id, user_id, activity) VALUES (${e}, ${t}, ${r})`).rows}catch(e){throw console.error("Database Error:",e),Error("Failed to add activity.")}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[147,481,350,180],()=>r(5563));module.exports=i})();