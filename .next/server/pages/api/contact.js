"use strict";(()=>{var t={};t.id=91,t.ids=[91],t.modules={145:t=>{t.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6326:t=>{t.exports=import("resend")},6249:(t,e)=>{Object.defineProperty(e,"l",{enumerable:!0,get:function(){return function t(e,r){return r in e?e[r]:"then"in e&&"function"==typeof e.then?e.then(e=>t(e,r)):"function"==typeof e&&"default"===r?e:void 0}}})},7090:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.r(e),r.d(e,{config:()=>l,default:()=>d,routeModule:()=>c});var n=r(1802),a=r(7153),i=r(6249),s=r(9855),p=t([s]);s=(p.then?(await p)():p)[0];let d=(0,i.l)(s,"default"),l=(0,i.l)(s,"config"),c=new n.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:s});o()}catch(t){o(t)}})},9855:(t,e,r)=>{r.a(t,async(t,o)=>{try{r.r(e),r.d(e,{default:()=>i});var n=r(6326),a=t([n]);let s=new(n=(a.then?(await a)():a)[0]).Resend("re_ZunohsSm_Pp3rUCebkzntTofbegnEHkws");async function i(t,e){if("POST"!==t.method)return e.setHeader("Allow",["POST"]),e.status(405).json({error:`Method ${t.method} Not Allowed`});try{let{firstName:r,lastName:o,phone:n,email:a,service:i,comment:p}=t.body,d=`
  <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #57534e; border-bottom: 2px solid #d6d3d1; padding-bottom: 10px;">
      פנייה חדשה מהאתר - חנה רבקה
    </h2>
    
    <div style="background-color: #f5f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #44403c; margin-top: 0;">פרטי הלקוח:</h3>
      <p><strong>שם:</strong> ${r} ${o}</p>
      <p><strong>טלפון:</strong> ${n}</p>
      ${a?`<p><strong>אימייל:</strong> ${a}</p>`:""}
      <p><strong>שירות מבוקש:</strong> ${{"curl-opening":"פתיחת תלתלים","organic-smoothing":"החלקה אורגנית","hair-repair":"טיפול שיקום שיער",coloring:"צביעת שיער מקצועית",consultation:"יעוץ",other:"אחר"}[i]||i}</p>
      ${p?`<p><strong>הערות:</strong><br>${p}</p>`:""}
    </div>
    
    <div style="background-color: #e7e5e4; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h4 style="color: #44403c; margin-top: 0;">פרטי הסלון:</h4>
      <p><strong>כתובת:</strong> רחוב ביל"ו בני ברק</p>
      <p><strong>טלפון:</strong> 054-8499287</p>
      <p><strong>WhatsApp:</strong> 054-8499287</p>
      <p><strong>אימייל:</strong> crmakias123@gmail.com</p>
    </div>
    
    <p style="color: #78716c; font-size: 14px;">
      הודעה זו נשלחה מטופס יצירת הקשר באתר חנה רבקה - רחוב ביל"ו בני ברק
    </p>
  </div>
`,l=await s.emails.send({from:"Chana Rivka Salon <noreply@chanarivkabeauty.co.il>",to:["chana.hair@chanarivkabeauty.co.il"],subject:`פנייה חדשה מ${r} ${o}`,html:d});return e.status(200).json({success:!0,data:l})}catch(t){return console.error("Error sending email:",t),e.status(500).json({error:"Failed to send email"})}}o()}catch(t){o(t)}})},7153:(t,e)=>{var r;Object.defineProperty(e,"x",{enumerable:!0,get:function(){return r}}),function(t){t.PAGES="PAGES",t.PAGES_API="PAGES_API",t.APP_PAGE="APP_PAGE",t.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(t,e,r)=>{t.exports=r(145)}};var e=require("../../webpack-api-runtime.js");e.C(t);var r=e(e.s=7090);module.exports=r})();