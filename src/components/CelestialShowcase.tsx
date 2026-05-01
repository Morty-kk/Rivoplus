import React, { useRef, useEffect, useState } from 'react';
import type { Language } from '@/pages/index-content';
import { GlitchTitle } from '@/components/GlitchTitle';

import tvLogo      from '@/assets/tv_pic.png';
import musicLogo   from '@/assets/music_pic.png';
import crunchLogo  from '@/assets/crunchyroll_service.svg';
import adobeLogo   from '@/assets/adobe_pic.png';
import canvaLogo   from '@/assets/canva_pic.png';
import chatgptLogo from '@/assets/chatgpt_service.svg';
import geminiLogo  from '@/assets/gemini_service.svg';

// ── i18n ─────────────────────────────────────────────────────────────────────
const UI: Record<Language, { subtitle: string; title: string; hint: string; tag: string }> = {
  ar: { subtitle: 'كوننا الرقمي',         title: 'مدار الخدمات',          hint: 'مرر على كوكب · شاهد الحقائق تظهر أثناء الدوران', tag: 'الخدمات' },
  en: { subtitle: 'OUR DIGITAL UNIVERSE', title: 'THE SERVICES ORBIT',    hint: 'hover a planet · watch facts appear as they orbit',   tag: 'Services' },
  de: { subtitle: 'DIGITALES UNIVERSUM',  title: 'DIE DIENSTE-UMLAUFBAHN',hint: 'Planet hovern · Fakten erscheinen beim Umlauf',        tag: 'Dienste' },
};

// ── Services ──────────────────────────────────────────────────────────────────
// category: 0 = streaming, 1 = creative, 2 = ai
const SERVICES = [
  { key: 'netflix',  imgSrc: tvLogo,      cat: 0,
    label: { ar:'ريفو ستريم',    en:'Rivo Stream',   de:'Rivo Stream'  } as Record<Language,string>,
    fact:  { ar:'أكثر من 200 مليون مشترك في 190 دولة', en:'200M+ subscribers · 190 countries', de:'200M+ Abonnenten · 190 Länder' } as Record<Language,string>,
    radius: 36, orbitR: 0.44, period: 19000, startAngle: 0.0,  color:[43,125,233] as [number,number,number] },
  { key: 'yt',       imgSrc: musicLogo,   cat: 0,
    label: { ar:'يوتيوب ميوزك', en:'YouTube Music',  de:'YouTube Music' } as Record<Language,string>,
    fact:  { ar:'أكثر من 100 مليون مشترك مدفوع وأكثر من 80 مليون أغنية', en:'100M+ paid subscribers · 80M songs', de:'100M+ Abonnenten · 80M Songs' } as Record<Language,string>,
    radius: 28, orbitR: 0.37, period: 14000, startAngle: 1.6,  color:[41,172,240] as [number,number,number] },
  { key: 'crunch',   imgSrc: crunchLogo,  cat: 0,
    label: { ar:'كرانشيرول',    en:'Crunchyroll',    de:'Crunchyroll'   } as Record<Language,string>,
    fact:  { ar:'أكثر من 10 ملايين مشترك وأكثر من 1200 عمل أنيمي', en:'10M+ subscribers · 1,200+ anime titles', de:'10M+ Abonnenten · 1.200+ Anime-Titel' } as Record<Language,string>,
    radius: 21, orbitR: 0.30, period: 10000, startAngle: 3.2,  color:[56,189,248] as [number,number,number] },
  { key: 'adobe',    imgSrc: adobeLogo,   cat: 1,
    label: { ar:'أدوبي CC',      en:'Adobe CC',       de:'Adobe CC'      } as Record<Language,string>,
    fact:  { ar:'أكثر من 30 مليون مستخدم Creative Cloud', en:'30M+ Creative Cloud users · 20+ apps', de:'30M+ Creative Cloud Nutzer · 20+ Apps' } as Record<Language,string>,
    radius: 26, orbitR: 0.23, period: 8200,  startAngle: 0.9,  color:[129,140,248] as [number,number,number] },
  { key: 'canva',    imgSrc: canvaLogo,   cat: 1,
    label: { ar:'كانفا برو',     en:'Canva Pro',      de:'Canva Pro'     } as Record<Language,string>,
    fact:  { ar:'أكثر من 170 مليون مستخدم في 190 دولة', en:'170M+ users · 190 countries', de:'170M+ Nutzer · 190 Länder' } as Record<Language,string>,
    radius: 19, orbitR: 0.17, period: 6400,  startAngle: 2.4,  color:[96,165,250] as [number,number,number] },
  { key: 'chatgpt',  imgSrc: chatgptLogo, cat: 2,
    label: { ar:'شات جي بي تي', en:'ChatGPT Plus',   de:'ChatGPT Plus'  } as Record<Language,string>,
    fact:  { ar:'أكثر من 180 مليون مستخدم · أُطلق نوفمبر 2022', en:'180M+ users · launched Nov 2022', de:'180M+ Nutzer · Start Nov. 2022' } as Record<Language,string>,
    radius: 30, orbitR: 0.12, period: 5000,  startAngle: 1.1,  color:[34,211,238] as [number,number,number] },
  { key: 'gemini',   imgSrc: geminiLogo,  cat: 2,
    label: { ar:'جيميني AI',    en:'Gemini AI',      de:'Gemini KI'     } as Record<Language,string>,
    fact:  { ar:'نموذج الذكاء الاصطناعي متعدد الأوضاع من Google', en:"Google's multimodal AI · 1M+ devs", de:'Googles multimodales KI · 1M+ Entwickler' } as Record<Language,string>,
    radius: 18, orbitR: 0.07, period: 3600,  startAngle: 3.8,  color:[167,139,250] as [number,number,number] },
];

// groups of indices by category
const CAT_GROUPS = [[0,1,2],[3,4],[5,6]];

interface Sprite { x:number; y:number; angle:number; showing:boolean; showAt:number; opacity:number; }
interface Star   { x:number; y:number; r:number; twinkle:number; blue:boolean; }
interface Pulse  { born:number; }

function initStars(w:number,h:number):Star[] {
  return Array.from({length:240},(_,i)=>({
    x:(i*137.5)%w, y:(i*97.3+50)%h,
    r: 0.3+Math.random()*1.3,
    twinkle: Math.random()*Math.PI*2,
    blue: Math.random()<0.3,
  }));
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw(
  ctx: CanvasRenderingContext2D,
  w:number, h:number, now:number,
  stars:Star[], sprites:Sprite[], pulses:Pulse[],
  lang:Language, imgs:Record<string,HTMLImageElement>,
  lastPulseRef:React.MutableRefObject<number>
) {
  const t = now * 0.001;
  const cx = w*0.5, cy = h*0.5;
  const baseOrbit = Math.min(w*0.43, h*0.5);
  const isRTL = lang==='ar';
  const font  = 'Cairo, Helvetica, Arial, sans-serif';

  // ── Background ──
  ctx.fillStyle = '#0b0f1a'; ctx.fillRect(0,0,w,h);

  // subtle grid
  ctx.strokeStyle = 'rgba(41,100,200,0.04)'; ctx.lineWidth = 0.5;
  const gs = 64;
  for(let x=0;x<w;x+=gs){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<h;y+=gs){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}

  // ── Stars ──
  stars.forEach(s=>{
    const a=0.12+Math.sin(t*0.9+s.twinkle)*0.16;
    ctx.globalAlpha=a; ctx.fillStyle=s.blue?'#b8e0ff':'#fff';
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  // ── Nebula ──
  const neb=ctx.createRadialGradient(cx,cy,0,cx,cy,baseOrbit*1.5);
  neb.addColorStop(0,'rgba(41,172,240,0.06)');
  neb.addColorStop(0.5,'rgba(100,80,255,0.03)');
  neb.addColorStop(1,'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.arc(cx,cy,baseOrbit*1.5,0,Math.PI*2);
  ctx.fillStyle=neb; ctx.fill();

  // ── Sun pulse rings ──
  if (now - lastPulseRef.current > 3800) { pulses.push({born:now}); lastPulseRef.current=now; }
  for(let i=pulses.length-1;i>=0;i--){
    const age=(now-pulses[i].born)*0.001; if(age>4){pulses.splice(i,1);continue;}
    const pr=age*baseOrbit*0.5; const pa=(1-age/4)*0.4;
    ctx.beginPath(); ctx.arc(cx,cy,pr,0,Math.PI*2);
    ctx.strokeStyle=`rgba(41,172,240,${pa})`; ctx.lineWidth=1.2; ctx.stroke();
  }

  // ── Orbit rings (dashed) ──
  SERVICES.forEach(svc=>{
    const orR=svc.orbitR*baseOrbit;
    const[r,g,b]=svc.color;
    ctx.beginPath(); ctx.arc(cx,cy,orR,0,Math.PI*2);
    ctx.strokeStyle=`rgba(${r},${g},${b},0.09)`; ctx.lineWidth=0.8;
    ctx.setLineDash([4,10]); ctx.stroke(); ctx.setLineDash([]);
  });

  // ── Category connection lines (streaming / creative / AI) ──
  CAT_GROUPS.forEach(group=>{
    const[r,g,b]=SERVICES[group[0]].color;
    for(let i=0;i<group.length-1;i++){
      const a=sprites[group[i]], b2=sprites[group[i+1]];
      ctx.save();
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b2.x,b2.y);
      ctx.strokeStyle=`rgba(${r},${g},${b},0.07)`; ctx.lineWidth=0.7;
      ctx.setLineDash([5,12]); ctx.stroke(); ctx.setLineDash([]);
      // animated dot sliding along the connection
      const dotT=(t*0.15)%1;
      ctx.beginPath(); ctx.arc(a.x+(b2.x-a.x)*dotT, a.y+(b2.y-a.y)*dotT, 1.8,0,Math.PI*2);
      ctx.fillStyle=`rgba(${r},${g},${b},0.4)`; ctx.fill();
      ctx.restore();
    }
  });

  // ── Central sun ──
  const sunR=Math.min(w,h)*0.046;
  [sunR*5.5,sunR*3.2,sunR*1.9].forEach((gr,gi)=>{
    const sg=ctx.createRadialGradient(cx,cy,0,cx,cy,gr);
    sg.addColorStop(0,`rgba(41,172,240,${0.07-gi*0.015})`);
    sg.addColorStop(1,'rgba(41,172,240,0)');
    ctx.beginPath(); ctx.arc(cx,cy,gr,0,Math.PI*2); ctx.fillStyle=sg; ctx.fill();
  });
  const sb=ctx.createRadialGradient(cx-sunR*0.3,cy-sunR*0.35,0,cx,cy,sunR);
  sb.addColorStop(0,'#90e0f8'); sb.addColorStop(0.55,'#29acf0'); sb.addColorStop(1,'#1060a0');
  ctx.beginPath(); ctx.arc(cx,cy,sunR,0,Math.PI*2); ctx.fillStyle=sb; ctx.fill();
  // Rotating ring around sun
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(t*0.4);
  ctx.beginPath(); ctx.arc(0,0,sunR+3,0,Math.PI*2);
  ctx.strokeStyle='rgba(100,220,255,0.35)'; ctx.lineWidth=1.5;
  ctx.setLineDash([8,14]); ctx.stroke(); ctx.setLineDash([]);
  ctx.restore();
  ctx.fillStyle='#fff';
  ctx.font=`900 ${Math.floor(sunR*0.82)}px ${font}`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('R+',cx,cy);

  // ── Planets ──
  SERVICES.forEach((svc,i)=>{
    const orR=svc.orbitR*baseOrbit;
    const angle=svc.startAngle+(now/svc.period)*Math.PI*2;
    const px=cx+Math.cos(angle)*orR;
    const py=cy+Math.sin(angle)*orR;
    sprites[i].x=px; sprites[i].y=py; sprites[i].angle=angle;
    const[r,g,b]=svc.color;

    // Orbital arc highlight (bright segment near planet)
    ctx.beginPath(); ctx.arc(cx,cy,orR,angle-0.35,angle+0.06);
    ctx.strokeStyle=`rgba(${r},${g},${b},0.3)`; ctx.lineWidth=2.5; ctx.stroke();

    // Comet tail (fading circles along orbital path behind planet)
    for(let j=1;j<=22;j++){
      const ta=angle-(j/22)*0.55;
      const tx=cx+Math.cos(ta)*orR, ty=cy+Math.sin(ta)*orR;
      const prog=1-j/22;
      const tr=svc.radius*prog*0.75; if(tr<0.5)break;
      ctx.beginPath(); ctx.arc(tx,ty,tr,0,Math.PI*2);
      ctx.fillStyle=`rgba(${r},${g},${b},${prog*0.38})`; ctx.fill();
    }

    // Planet glow layers
    [svc.radius*4.5,svc.radius*2.4].forEach((gr,gi)=>{
      const gl=ctx.createRadialGradient(px,py,0,px,py,gr);
      gl.addColorStop(0,`rgba(${r},${g},${b},${0.32-gi*0.11})`);
      gl.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(px,py,gr,0,Math.PI*2); ctx.fillStyle=gl; ctx.fill();
    });

    // Planet sphere
    const body=ctx.createRadialGradient(px-svc.radius*0.32,py-svc.radius*0.35,0,px,py,svc.radius);
    body.addColorStop(0,`rgba(${Math.min(255,r+110)},${Math.min(255,g+110)},${Math.min(255,b+100)},1)`);
    body.addColorStop(0.55,`rgba(${r},${g},${b},1)`);
    body.addColorStop(1,`rgba(${Math.max(0,r-80)},${Math.max(0,g-80)},${Math.max(0,b-70)},1)`);
    ctx.beginPath(); ctx.arc(px,py,svc.radius,0,Math.PI*2); ctx.fillStyle=body; ctx.fill();

    // Logo image clipped to planet
    const img=imgs[svc.key];
    if(img&&img.complete&&img.naturalHeight>0){
      const ir=svc.radius-5; ctx.save();
      ctx.beginPath(); ctx.arc(px,py,ir,0,Math.PI*2); ctx.clip();
      const side=ir*2, asp=img.naturalWidth/img.naturalHeight;
      const dw=asp>1?side*asp:side, dh=asp>1?side:side/asp;
      ctx.drawImage(img,px-dw/2,py-dh/2,dw,dh); ctx.restore();
    }

    // Specular highlight
    ctx.beginPath(); ctx.arc(px-svc.radius*0.3,py-svc.radius*0.32,svc.radius*0.3,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.22)'; ctx.fill();

    // Planet border ring
    ctx.beginPath(); ctx.arc(px,py,svc.radius,0,Math.PI*2);
    ctx.strokeStyle=`rgba(${r},${g},${b},0.55)`; ctx.lineWidth=1.2; ctx.stroke();

    // Label
    ctx.save(); ctx.direction=isRTL?'rtl':'ltr';
    ctx.fillStyle=`rgba(${r},${g},${b},1)`;
    ctx.font=`700 ${Math.max(10,Math.floor(svc.radius*0.5))}px ${font}`;
    ctx.textAlign='center'; ctx.textBaseline='top';
    ctx.fillText(svc.label[lang],px,py+svc.radius+9);
    ctx.restore();

    // ── Fact trigger when crossing 3 o'clock ──
    const norm=((angle%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
    if(norm<0.10&&!sprites[i].showing){sprites[i].showing=true;sprites[i].showAt=now;}
    if(norm>0.26)sprites[i].showing=false;
    const age=sprites[i].showing?(now-sprites[i].showAt)*0.001:-1;
    sprites[i].opacity=(age>=0&&age<4)?(age<0.4?age/0.4:age>3.3?(4-age)/0.7:1):0;

    if(sprites[i].opacity>0){
      const fo=sprites[i].opacity;
      const factText=svc.fact[lang];
      ctx.save();
      ctx.direction=isRTL?'rtl':'ltr';
      ctx.font=`500 12px ${font}`;
      const tw=ctx.measureText(factText).width;
      const padX=12, pillH=30, pillW=tw+padX*2+18;
      const anchorX=px+svc.radius+18;
      const pillX=Math.min(anchorX, w-pillW-8);
      const pillY=py-pillH/2;

      // Connecting dashed line with animated dot
      ctx.globalAlpha=fo*0.5;
      ctx.strokeStyle=`rgba(${r},${g},${b},0.5)`; ctx.lineWidth=0.9;
      ctx.setLineDash([3,5]);
      ctx.beginPath(); ctx.moveTo(px+svc.radius+3,py); ctx.lineTo(pillX,py);
      ctx.stroke(); ctx.setLineDash([]);
      const dotP=(now*0.0005)%1;
      const lineLen=pillX-(px+svc.radius+3);
      ctx.globalAlpha=fo*dotP;
      ctx.beginPath(); ctx.arc(px+svc.radius+3+lineLen*dotP,py,2.2,0,Math.PI*2);
      ctx.fillStyle=`rgb(${r},${g},${b})`; ctx.fill();

      // Pill
      ctx.globalAlpha=fo;
      ctx.fillStyle=`rgba(${r},${g},${b},0.14)`;
      ctx.beginPath(); ctx.roundRect(pillX,pillY,pillW,pillH,7); ctx.fill();
      ctx.strokeStyle=`rgba(${r},${g},${b},0.45)`; ctx.lineWidth=1; ctx.stroke();

      // Dot accent inside pill
      ctx.beginPath(); ctx.arc(pillX+padX*0.8,py,3.5,0,Math.PI*2);
      ctx.fillStyle=`rgb(${r},${g},${b})`; ctx.fill();

      // Text
      ctx.fillStyle='#fff'; ctx.globalAlpha=fo;
      ctx.textAlign='left'; ctx.textBaseline='middle';
      ctx.fillText(factText,pillX+padX*1.6,py);
      ctx.restore();
    }
  });

  ctx.textAlign='left'; ctx.textBaseline='alphabetic';
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitialLang():Language {
  if(typeof window==='undefined')return'ar';
  const s=window.localStorage.getItem('language');
  return(s==='ar'||s==='en'||s==='de')?s:'ar';
}
function preloadImgs(srcs:Record<string,string>):Record<string,HTMLImageElement>{
  const out:Record<string,HTMLImageElement>={};
  Object.entries(srcs).forEach(([k,s])=>{const img=new Image();img.src=s;out[k]=img;});
  return out;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CelestialShowcase() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const starsRef    = useRef<Star[]>([]);
  const spritesRef  = useRef<Sprite[]>(SERVICES.map(()=>({x:0,y:0,angle:0,showing:false,showAt:0,opacity:0})));
  const pulsesRef   = useRef<Pulse[]>([]);
  const lastPulseRef= useRef<number>(0);
  const imgsRef     = useRef(preloadImgs(Object.fromEntries(SERVICES.map(s=>[s.key,s.imgSrc]))));
  const rafRef      = useRef(0);
  const langRef     = useRef<Language>(getInitialLang());

  const [language,setLanguage]=useState<Language>(getInitialLang);
  langRef.current=language;

  const [active,setActive]=useState<number|null>(null);

  useEffect(()=>{
    const h=(e:Event)=>{const l=(e as CustomEvent<Language>).detail;if(l==='ar'||l==='en'||l==='de')setLanguage(l);};
    window.addEventListener('rivo-language-change',h);
    return()=>window.removeEventListener('rivo-language-change',h);
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;starsRef.current=initStars(canvas.width,canvas.height);};
    resize();
    const ro=new ResizeObserver(resize); ro.observe(canvas);
    const ctx=canvas.getContext('2d')!;
    const loop=()=>{
      draw(ctx,canvas.width,canvas.height,Date.now(),starsRef.current,spritesRef.current,pulsesRef.current,langRef.current,imgsRef.current,lastPulseRef);
      rafRef.current=requestAnimationFrame(loop);
    };
    rafRef.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(rafRef.current);ro.disconnect();};
  },[]);

  const onMouseMove=(e:React.MouseEvent<HTMLCanvasElement>)=>{
    const rect=canvasRef.current!.getBoundingClientRect();
    const mx=e.clientX-rect.left,my=e.clientY-rect.top;
    let found:number|null=null;
    spritesRef.current.forEach((sp,i)=>{
      const dx=sp.x-mx,dy=sp.y-my;
      if(Math.sqrt(dx*dx+dy*dy)<SERVICES[i].radius+12)found=i;
    });
    setActive(found);
  };

  const ui=UI[language];
  const isRTL=language==='ar';

  return (
    <section className="w-full" style={{background:'#0b0f1a'}}>

      {/* ── Header ── */}
      <div className="relative text-center pt-20 pb-6 px-4 overflow-hidden" dir={isRTL?'rtl':'ltr'}>

        {/* Ambient header glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(41,172,240,0.09) 0%, transparent 70%)',
        }}/>

        {/* Top sci-fi frame line */}
        <div className="relative mx-auto mb-8" style={{maxWidth:480}}>
          <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(41,172,240,0.5),rgba(129,140,248,0.5),transparent)'}}/>
          {/* Corner brackets */}
          <div className="absolute left-0 top-0" style={{width:10,height:10,borderTop:'1px solid rgba(41,172,240,0.7)',borderLeft:'1px solid rgba(41,172,240,0.7)'}}/>
          <div className="absolute right-0 top-0" style={{width:10,height:10,borderTop:'1px solid rgba(41,172,240,0.7)',borderRight:'1px solid rgba(41,172,240,0.7)'}}/>
        </div>

        {/* System label */}
        <div className="inline-flex items-center gap-3 mb-5">
          {/* Blinking status dot */}
          <span style={{
            display:'inline-block', width:6, height:6, borderRadius:'50%',
            background:'#22d3ee',
            boxShadow:'0 0 8px #22d3ee',
            animation:'celestialBlink 1.4s ease-in-out infinite',
          }}/>
          <span style={{
            fontFamily:'Helvetica,Cairo,Arial,sans-serif',
            fontSize:'11px',
            fontWeight:700,
            letterSpacing: isRTL ? '0.06em' : '0.32em',
            color:'rgba(34,211,238,0.75)',
          }}>
            {ui.subtitle}
          </span>
          <span style={{
            display:'inline-block', width:6, height:6, borderRadius:'50%',
            background:'#22d3ee',
            boxShadow:'0 0 8px #22d3ee',
            animation:'celestialBlink 1.4s 0.7s ease-in-out infinite',
          }}/>
        </div>

        {/* ── GLITCH TITLE ── re-mounts on language change via key */}
        <div className="flex justify-center mb-5">
          <GlitchTitle
            key={ui.title}
            text={ui.title}
            sizeCls="text-4xl sm:text-5xl md:text-[3.8rem] lg:text-[4.5rem]"
            startDelay={200}
            fontFamily="Helvetica, Cairo, Arial, sans-serif"
          />
        </div>

        {/* Hint line with animated underline */}
        <p style={{
          fontFamily:'Helvetica,Cairo,Arial,sans-serif',
          fontSize:'13px',
          color:'rgba(255,255,255,0.3)',
          letterSpacing: isRTL ? '0.02em' : '0.06em',
          marginBottom: '20px',
        }}>
          {ui.hint}
        </p>

        {/* Category badges — staggered fade-in via CSS */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            {label:{ar:'البث',en:'Streaming',de:'Streaming'},color:'43,125,233',  delay:600},
            {label:{ar:'الإبداع',en:'Creative',de:'Kreativ'},color:'129,140,248', delay:800},
            {label:{ar:'الذكاء الاصطناعي',en:'AI Services',de:'KI-Dienste'},color:'34,211,238', delay:1000},
          ].map((cat,ci)=>(
            <span key={ci}
              style={{
                fontFamily:'Helvetica,Cairo,Arial,sans-serif',
                fontSize:'11px',
                fontWeight:700,
                letterSpacing: isRTL ? '0.03em' : '0.18em',
                padding:'5px 14px',
                borderRadius:'999px',
                background:`rgba(${cat.color},0.10)`,
                border:`1px solid rgba(${cat.color},0.35)`,
                color:`rgba(${cat.color},1)`,
                animation:`celestialBadgeIn 0.5s ${cat.delay}ms both`,
              }}>
              {cat.label[language]}
            </span>
          ))}
        </div>

        {/* Bottom sci-fi frame line */}
        <div className="relative mx-auto mt-8" style={{maxWidth:480}}>
          <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(129,140,248,0.4),rgba(41,172,240,0.4),transparent)'}}/>
          <div className="absolute left-0 bottom-0" style={{width:10,height:10,borderBottom:'1px solid rgba(129,140,248,0.7)',borderLeft:'1px solid rgba(129,140,248,0.7)'}}/>
          <div className="absolute right-0 bottom-0" style={{width:10,height:10,borderBottom:'1px solid rgba(129,140,248,0.7)',borderRight:'1px solid rgba(129,140,248,0.7)'}}/>
        </div>

        <style>{`
          @keyframes celestialBlink {
            0%,100%{opacity:1;} 50%{opacity:0.2;}
          }
          @keyframes celestialBadgeIn {
            from{opacity:0;transform:translateY(8px);}
            to{opacity:1;transform:translateY(0);}
          }
        `}</style>
      </div>

      {/* ── Canvas ── */}
      <div className="relative w-full" style={{height:'clamp(540px,76vh,860px)'}}>
        <canvas ref={canvasRef} className="w-full h-full"
          style={{cursor:active!==null?'pointer':'default'}}
          onMouseMove={onMouseMove} onMouseLeave={()=>setActive(null)} />

        {/* Hover tooltip */}
        {active!==null&&(
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
            dir={isRTL?'rtl':'ltr'}
            style={{
              background:`rgba(${SERVICES[active].color.join(',')},0.14)`,
              border:`1px solid rgba(${SERVICES[active].color.join(',')},0.4)`,
              backdropFilter:'blur(16px)',
              fontFamily:'Cairo,Helvetica,Arial,sans-serif',
              borderRadius:'999px', padding:'10px 22px',
              display:'flex', alignItems:'center', gap:'10px', whiteSpace:'nowrap',
              boxShadow:`0 0 24px rgba(${SERVICES[active].color.join(',')},0.2)`,
            }}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:`rgb(${SERVICES[active].color.join(',')})`,flexShrink:0,boxShadow:`0 0 8px rgb(${SERVICES[active].color.join(',')})`}} />
            <span style={{color:'#fff',fontWeight:700,fontSize:'14px'}}>{SERVICES[active].label[language]}</span>
            <span style={{color:'rgba(255,255,255,0.35)',fontSize:'14px'}}>·</span>
            <span style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{SERVICES[active].fact[language]}</span>
          </div>
        )}
      </div>

      {/* ── Legend pills ── */}
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-14" dir={isRTL?'rtl':'ltr'}>
        {SERVICES.map(svc=>(
          <div key={svc.key}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:scale-105"
            style={{
              border:`1px solid rgba(${svc.color.join(',')},0.25)`,
              background:`rgba(${svc.color.join(',')},0.07)`,
              fontFamily:'Cairo,Helvetica,Arial,sans-serif',
            }}>
            <div style={{width:'7px',height:'7px',borderRadius:'50%',background:`rgb(${svc.color.join(',')})`,boxShadow:`0 0 6px rgb(${svc.color.join(',')})`,flexShrink:0}} />
            <span style={{fontSize:'11px',color:`rgba(${svc.color.join(',')},0.95)`}}>{svc.label[language]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
