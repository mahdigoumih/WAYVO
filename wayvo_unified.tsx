import { useState, useRef, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// ─── DESIGN SYSTEM ────────────────────────────────────────────
const C = {
  navy:"#0D1B2A", mid:"#1B3A4B", green:"#00C896", gd:"#009E78",
  gold:"#F5A623", red:"#E53935", purple:"#7C3AED", blue:"#1D4ED8",
  teal:"#0D9488", pink:"#DB2777", coral:"#EA580C",
  grad:"linear-gradient(145deg,#0D1B2A,#1B3A4B 60%,#0D2E1F 100%)"
};

// ─── DATA ─────────────────────────────────────────────────────
const ITEMS = [
  {id:1,cat:"tours",title:"Sahara Desert Escape",loc:"Merzouga",city:"Merzouga",price:299,orig:399,rating:4.9,reviews:342,badge:"Best seller",tags:["Desert","Camel","Stars"],em:"🏜️",col:"#854F0B",duration:"3 days",group:"2–12",avail:4,hot:true,eco:true,inc:["Luxury bivouac","Camel trek","All meals","4x4 transfer","English guide"]},
  {id:2,cat:"tours",title:"Imperial Cities Grand Tour",loc:"Fès · Meknès · Rabat",city:"Fès",price:549,orig:699,rating:4.8,reviews:218,badge:"Top rated",tags:["UNESCO","History","Culture"],em:"🕌",col:"#185FA5",duration:"7 days",group:"2–8",avail:6,hot:false,eco:false,inc:["All hotels","Private transport","Licensed guide","All entry fees","Breakfast daily"]},
  {id:3,cat:"tours",title:"Blue City Chefchaouen",loc:"Chefchaouen",city:"Chefchaouen",price:179,orig:null,rating:4.9,reviews:415,badge:"Trending",tags:["Photography","Hiking","Blue streets"],em:"💙",col:"#185FA5",duration:"2 days",group:"1–6",avail:8,hot:true,eco:true,inc:["Boutique riad","Guided medina walk","Hiking day","Breakfast"]},
  {id:4,cat:"tours",title:"Atlas Mountains Trek",loc:"Toubkal · Imlil",city:"Marrakech",price:199,orig:249,rating:4.7,reviews:156,badge:"Adventure",tags:["Hiking","Berber","Summit"],em:"⛰️",col:"#3B6D11",duration:"4 days",group:"2–10",avail:3,hot:false,eco:true,inc:["Mountain guide","Berber guesthouse","Full board","Equipment","Transfer"]},
  {id:5,cat:"tours",title:"Essaouira Coastal Escape",loc:"Essaouira",city:"Essaouira",price:229,orig:null,rating:4.8,reviews:203,badge:"Relaxing",tags:["Beach","Kite surf","Medina"],em:"⛵",col:"#0D9488",duration:"3 days",group:"2–8",avail:10,hot:false,eco:true,inc:["Boutique hotel","Guided tour","Seafood dinner","Beach equipment"]},
  {id:6,cat:"food",title:"Marrakech Street Food Tour",loc:"Jemaa el-Fna · Medina",city:"Marrakech",price:65,orig:null,rating:4.9,reviews:521,badge:"Fan favourite",tags:["Street food","Local","Evening"],em:"🍜",col:"#854F0B",duration:"3 hrs",group:"2–8",avail:12,hot:true,eco:false,inc:["10 tastings","Local guide","Water","Tea ceremony"]},
  {id:7,cat:"food",title:"Moroccan Cooking Masterclass",loc:"Private Riad · Marrakech",city:"Marrakech",price:89,orig:110,rating:4.9,reviews:387,badge:"Popular",tags:["Cooking","Hands-on","Lunch included"],em:"👨‍🍳",col:"#854F0B",duration:"4 hrs",group:"2–6",avail:5,hot:false,eco:false,inc:["Market visit","Full class","Lunch","Recipes booklet"]},
  {id:8,cat:"transport",title:"Private Airport Transfer",loc:"Casablanca · Mohammed V",city:"Casablanca",price:45,orig:null,rating:4.9,reviews:187,badge:"Reliable",tags:["Airport","Private","AC"],em:"🚌",col:"#534AB7",duration:"Fixed",group:"1–7",avail:99,hot:false,eco:false,inc:["Meet & greet","Flight tracking","Bottled water","Free waiting"]},
  {id:9,cat:"transport",title:"Private Driver — Full Day",loc:"Marrakech & surrounds",city:"Marrakech",price:75,orig:null,rating:4.8,reviews:294,badge:"Flexible",tags:["Private","Day trip","English driver"],em:"🚗",col:"#534AB7",duration:"8 hrs",group:"1–6",avail:8,hot:false,eco:false,inc:["English-speaking driver","A/C vehicle","Fuel","All tolls"]},
  {id:10,cat:"hotels",title:"La Mamounia",loc:"Avenue Bab Jdid · Marrakech",city:"Marrakech",price:520,orig:null,rating:9.6,reviews:1240,badge:"Iconic",tags:["Luxury","Pool","Gardens"],em:"🏰",col:"#1D4ED8",duration:"per night",group:null,avail:2,hot:true,eco:false,inc:["5 restaurants","3 pools","Spa","Tennis","Concierge"]},
  {id:11,cat:"hotels",title:"Riad Fès — Medina Palace",loc:"Batha · Fès Medina",city:"Fès",price:280,orig:null,rating:9.4,reviews:856,badge:"Boutique gem",tags:["Riad","Hammam","Historic"],em:"🌿",col:"#0D9488",duration:"per night",group:null,avail:5,hot:false,eco:true,inc:["Rooftop pool","Hammam","Cooking class","Room service"]},
  {id:12,cat:"hotels",title:"Sofitel Agadir Thalassa",loc:"Agadir Beach",city:"Agadir",price:195,orig:240,rating:9.2,reviews:632,badge:"Beach resort",tags:["Beach","Spa","Pool"],em:"🌊",col:"#185FA5",duration:"per night",group:null,avail:9,hot:false,eco:false,inc:["Private beach","4 pools","Thalassotherapy spa","6 restaurants","Kids club"]},
  {id:13,cat:"hotels",title:"Riad Dar Anika",loc:"Mouassine · Marrakech Medina",city:"Marrakech",price:120,orig:null,rating:9.1,reviews:478,badge:"Charming",tags:["Intimate","Rooftop","Medina"],em:"🌺",col:"#DB2777",duration:"per night",group:null,avail:3,hot:false,eco:true,inc:["Rooftop terrace","Hammam","Breakfast","Airport pickup"]},
  {id:14,cat:"wellness",title:"Royal Hammam & Argan Ritual",loc:"Mouassine Hammam · Marrakech",city:"Marrakech",price:49,orig:null,rating:4.8,reviews:892,badge:"Must do",tags:["Hammam","Argan","Relaxing"],em:"🧖",col:"#7C3AED",duration:"2 hrs",group:"1–4",avail:15,hot:true,eco:false,inc:["Hammam ritual","Black soap scrub","Argan massage","Mint tea"]},
  {id:15,cat:"tours",title:"Medina Walking Tour — Insider",loc:"Marrakech Medina",city:"Marrakech",price:35,orig:null,rating:4.9,reviews:1203,badge:"Classic",tags:["Walking","Souks","History"],em:"👣",col:"#854F0B",duration:"3 hrs",group:"2–8",avail:20,hot:false,eco:false,inc:["Licensed local guide","Souk navigation","Hidden spots","Tea tasting"]},
  {id:16,cat:"tours",title:"Ourika Valley Day Trip",loc:"Atlas Mountains · Ourika",city:"Marrakech",price:55,orig:null,rating:4.7,reviews:289,badge:"Day trip",tags:["Waterfalls","Berber","Nature"],em:"💧",col:"#0D9488",duration:"1 day",group:"2–8",avail:7,hot:false,eco:true,inc:["Private transport","Local guide","Lunch","Waterfall hike"]},
];

const AGENTS = [
  {id:1,name:"Fatima Zahra",spec:"Luxury & Honeymoon",exp:"14 yrs",lang:["EN","FR","AR"],status:"online",rating:4.98,handled:1240,img:"FZ",col:"#7C3AED",bio:"Specialist in ultra-luxury Morocco experiences, private riads, and bespoke honeymoon itineraries.",response:"< 30 sec"},
  {id:2,name:"Karim Alaoui",spec:"Adventure & Trekking",exp:"11 yrs",lang:["EN","FR","ES"],status:"online",rating:4.97,handled:980,img:"KA",col:"#0D9488",bio:"Morocco mountain guide turned digital specialist. Expert in Toubkal, Sahara, and off-road adventures.",response:"< 45 sec"},
  {id:3,name:"Sara Mansouri",spec:"Families & Groups",exp:"9 yrs",lang:["EN","FR","AR"],status:"online",rating:4.96,handled:870,img:"SM",col:"#D97706",bio:"Mother of three, specialist in family-friendly Morocco. Expert in child-safe activities and group logistics.",response:"< 1 min"},
  {id:4,name:"Youssef Benali",spec:"Culture & Heritage",exp:"16 yrs",lang:["EN","FR","AR","DE"],status:"busy",rating:4.99,handled:1560,img:"YB",col:"#1D4ED8",bio:"PhD in Moroccan history. Unmatched depth in imperial cities, Islamic architecture, and artisan culture.",response:"< 2 hrs"},
];

const INTERESTS = [
  {id:"adventure",icon:"⛺",label:"Adventure"},{id:"luxury",icon:"💎",label:"Luxury"},
  {id:"culture",icon:"🕌",label:"Culture"},{id:"food",icon:"🍜",label:"Food"},
  {id:"family",icon:"👨‍👩‍👧",label:"Family"},{id:"romance",icon:"💝",label:"Romance"},
  {id:"budget",icon:"💰",label:"Budget"},{id:"wellness",icon:"🧖",label:"Wellness"},
  {id:"nature",icon:"🌿",label:"Nature"},{id:"photo",icon:"📸",label:"Photography"},
];

const BUDGETS = ["Under $500","$500–$1,000","$1,000–$2,500","$2,500+","Flexible"];
const CITIES = ["Marrakech","Casablanca","Fès","Rabat","Tanger","Agadir","Chefchaouen","Essaouira","Meknès","Ouarzazate","Merzouga","Dakhla"];
const CATS = [
  {id:"all",label:"All",icon:"✨"},{id:"hotels",label:"Hotels",icon:"🏨"},
  {id:"tours",label:"Tours",icon:"🗺️"},{id:"food",label:"Food",icon:"🍜"},
  {id:"transport",label:"Transport",icon:"🚌"},{id:"wellness",label:"Wellness",icon:"🧖"},
];
const TRENDING = ["Sahara 3 days","Riad Marrakech","Airport transfer","Food tour","Hammam","Atlas trek","Cooking class","Chefchaouen blue"];
const PT_MONTHLY = [{m:"Nov",rev:3200},{m:"Dec",rev:5800},{m:"Jan",rev:4100},{m:"Feb",rev:6700},{m:"Mar",rev:8200},{m:"Apr",rev:9400}];
const PT_BKS = [
  {id:"WV-8821",guest:"Sophie Laurent",flag:"🇫🇷",svc:"Sahara Desert 3D",cin:"Apr 22",cout:"Apr 25",guests:2,amt:598,status:"confirmed"},
  {id:"WV-8819",guest:"Carlos Ruiz",flag:"🇪🇸",svc:"Atlas Trek 4D",cin:"Apr 28",cout:"May 2",guests:3,amt:597,status:"pending"},
  {id:"WV-8818",guest:"Yuki Tanaka",flag:"🇯🇵",svc:"Fès Medina Tour",cin:"Apr 19",cout:"Apr 19",guests:2,amt:178,status:"completed"},
];
const PT_TYPES = [
  {id:"hotel",icon:"🏨",label:"Hotel / Riad",col:C.blue},{id:"tour",icon:"🗺️",label:"Tour Operator",col:C.green},
  {id:"guide",icon:"🧭",label:"Local Guide",col:C.gold},{id:"transport",icon:"🚌",label:"Transport",col:C.teal},
  {id:"airbnb",icon:"🏠",label:"Vacation Rental",col:C.purple},{id:"activity",icon:"🏄",label:"Activity & Sport",col:C.pink},
];
const PKGS = [
  {days:3,title:"Marrakech Essentials",price:299,cities:"Marrakech",saving:60,tags:["Medina","Hammam","Food tour"],em:"🕌"},
  {days:7,title:"Imperial Cities Classic",price:799,cities:"Casablanca → Fès → Meknès → Rabat",saving:140,tags:["UNESCO","History","Palaces"],em:"👑"},
  {days:10,title:"Morocco Highlights",price:1199,cities:"Marrakech → Sahara → Fès → Chefchaouen",saving:220,tags:["Desert","Blue city","Mountains"],em:"🌟"},
  {days:14,title:"Grand Morocco Explorer",price:1799,cities:"Full circuit — 8 cities",saving:380,tags:["Complete experience","All regions"],em:"🗺️"},
];

// ─── MICRO COMPONENTS ─────────────────────────────────────────
const Logo = ({s=30}) => (
  <svg width={s} height={s} viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill={C.green}/><path d="M8 15L14 26L20 17L26 26L32 15" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="32" cy="15" r="3" fill="#fff"/></svg>
);
const Wm = ({light=false,s=20}) => <span style={{fontSize:s,fontWeight:900,letterSpacing:-.5,color:light?"#fff":"var(--color-text-primary)"}}>Way<span style={{color:C.green}}>vo</span></span>;
const Pill = ({text,color=C.green,bg,small=false}) => <span style={{fontSize:small?9:10,fontWeight:700,padding:small?"2px 6px":"3px 9px",borderRadius:100,background:bg||color+"18",color,letterSpacing:.3,display:"inline-block"}}>{text}</span>;
const Tag = ({t}) => <span style={{fontSize:10,padding:"3px 7px",borderRadius:7,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)"}}>{t}</span>;
const SBadge = ({s}) => {const m={confirmed:{bg:"#DCFCE7",c:"#166534",l:"Confirmed"},pending:{bg:"#FEF3C7",c:"#92400E",l:"Pending"},completed:{bg:"#E0E7FF",c:"#3730A3",l:"Completed"},active:{bg:"#DCFCE7",c:"#166534",l:"Active"}};const d=m[s]||m.completed;return <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100,background:d.bg,color:d.c}}>{d.l}</span>;};
const fmd = t => t.split(/\*\*(.*?)\*\*/g).map((p,i)=>i%2?<strong key={i}>{p}</strong>:p);
const Typing = ({col=C.green}) => <div style={{display:"flex",gap:4,padding:"9px 13px",background:"var(--color-background-primary)",borderRadius:"15px 15px 15px 4px",border:"0.5px solid var(--color-border-tertiary)"}}>{[0,.2,.4].map((d,i)=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:col,display:"inline-block",animation:`tp .9s ${d}s infinite`}}/>)}<style>{`@keyframes tp{0%,100%{opacity:.2;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style></div>;
const Toast = ({msg}) => msg?<div style={{position:"fixed",bottom:76,left:"50%",transform:"translateX(-50%)",background:C.navy,color:"#fff",padding:"9px 17px",borderRadius:12,fontSize:12,fontWeight:600,zIndex:9999,whiteSpace:"nowrap",pointerEvents:"none"}}>{msg}</div>:null;
const HeartBtn = ({filled,onToggle,overlay=false,size=13}) => (
  <button onClick={e=>{e.stopPropagation();onToggle();}} style={{background:overlay?"rgba(0,0,0,.35)":filled?"#FEE2E2":"var(--color-background-secondary)",border:overlay?"none":filled?"1px solid #FECACA":"0.5px solid var(--color-border-tertiary)",borderRadius:"50%",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?"#E53935":"none"} stroke={filled?"#E53935":overlay?"rgba(255,255,255,.9)":"var(--color-text-tertiary)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  </button>
);

// Premium card — no images, rich color blocks with trust signals
const Card = ({item,wished,onWish,onOpen,compact=false}) => {
  const isH = item.cat==="hotels";
  const urgency = item.avail<=3;
  if(compact) return (
    <div onClick={()=>onOpen(item)} style={{display:"flex",background:"var(--color-background-primary)",border:`0.5px solid ${urgency?"#FCD34D":"var(--color-border-tertiary)"}`,borderRadius:13,overflow:"hidden",cursor:"pointer",marginBottom:8}}>
      <div style={{width:82,background:`linear-gradient(135deg,${item.col}40,${item.col}80,${C.navy})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,gap:3,padding:4}}>
        {item.em}
        {item.eco&&<span style={{fontSize:8,background:"#DCFCE7",color:"#166534",padding:"1px 4px",borderRadius:4,fontWeight:700}}>ECO</span>}
      </div>
      <div style={{flex:1,padding:"9px 11px 9px 12px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
          <p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-primary)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:5}}>{item.title}</p>
          <HeartBtn filled={wished} onToggle={onWish}/>
        </div>
        <p style={{margin:"0 0 4px",fontSize:10,color:"var(--color-text-secondary)"}}>📍 {item.loc}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><p style={{margin:0,fontSize:13,fontWeight:800,color:C.navy}}>${item.price}<span style={{fontSize:9,fontWeight:400,color:"var(--color-text-tertiary)"}}>{isH?"/night":"/person"}</span></p>{item.orig&&<p style={{margin:0,fontSize:9,color:"var(--color-text-tertiary)",textDecoration:"line-through"}}>${item.orig}</p>}</div>
          <div style={{textAlign:"right"}}><p style={{margin:0,fontSize:10,color:C.gold}}>⭐ {item.rating}</p>{urgency&&<p style={{margin:0,fontSize:9,color:C.red,fontWeight:700}}>Only {item.avail} left!</p>}</div>
        </div>
      </div>
    </div>
  );
  return (
    <div onClick={()=>onOpen(item)} style={{background:"var(--color-background-primary)",border:`0.5px solid ${urgency?"#FCD34D":"var(--color-border-tertiary)"}`,borderRadius:16,overflow:"hidden",cursor:"pointer",marginBottom:12}}>
      <div style={{height:120,background:`linear-gradient(135deg,${item.col}30,${item.col}65,${C.navy})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative"}}>
        {item.em}
        <div style={{position:"absolute",top:9,left:10,display:"flex",gap:4,flexWrap:"wrap"}}>
          <Pill text={item.badge} color={C.gold}/>
          {item.hot&&<Pill text="🔥 Hot" color={C.red}/>}
          {item.eco&&<Pill text="🌿 Eco" color={C.teal}/>}
          {item.orig&&<Pill text={`Save $${item.orig-item.price}`} color="#fff" bg="#E53935"/>}
        </div>
        <div style={{position:"absolute",top:7,right:8}}><HeartBtn filled={wished} onToggle={onWish} overlay/></div>
        {urgency&&<div style={{position:"absolute",bottom:8,right:8}}><Pill text={`⚡ ${item.avail} spots left`} color={C.red} bg="rgba(229,57,53,.85)"/></div>}
      </div>
      <div style={{padding:"11px 13px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
          <p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)",flex:1,paddingRight:5}}>{item.title}</p>
          <div style={{textAlign:"right",flexShrink:0}}><p style={{margin:0,fontSize:15,fontWeight:800,color:C.navy}}>${item.price}</p>{item.orig&&<p style={{margin:0,fontSize:9,color:"var(--color-text-tertiary)",textDecoration:"line-through"}}>${item.orig}</p>}</div>
        </div>
        <p style={{margin:"0 0 6px",fontSize:10,color:"var(--color-text-secondary)"}}>📍 {item.loc} {item.duration&&`· ⏱ ${item.duration}`}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{item.tags.slice(0,2).map(t=><Tag key={t} t={t}/>)}</div>
          <p style={{margin:0,fontSize:10,color:C.gold,flexShrink:0}}>⭐ {item.rating} <span style={{color:"var(--color-text-tertiary)"}}>({item.reviews})</span></p>
        </div>
      </div>
    </div>
  );
};

// Search bar
const SearchBar = ({q,setQ,inPage=false,onFocus}) => (
  <div style={{display:"flex",alignItems:"center",gap:8,background:inPage?"var(--color-background-secondary)":"rgba(255,255,255,0.13)",border:inPage?"1px solid var(--color-border-secondary)":"1px solid rgba(255,255,255,0.2)",borderRadius:13,padding:"0 13px",height:44}}>
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={inPage?"var(--color-text-tertiary)":"rgba(255,255,255,0.6)"} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input value={q} onChange={e=>setQ(e.target.value)} onFocus={onFocus} placeholder="Search hotels, tours, food, transport…" style={{flex:1,background:"none",border:"none",outline:"none",fontSize:13,color:inPage?"var(--color-text-primary)":"#fff",fontFamily:"var(--font-sans)"}}/>
    {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",cursor:"pointer",color:inPage?"var(--color-text-tertiary)":"rgba(255,255,255,.6)",fontSize:17,lineHeight:1,padding:0}}>×</button>}
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("splash");
  const [sa, setSa] = useState(0);
  const [obStep, setObStep] = useState(1);
  const [user, setUser] = useState({name:"",nat:"",interests:[],city:"Marrakech",budget:"",trips:0,points:0});
  const [tab, setTab] = useState("home");
  const [sub, setSub] = useState(null);
  const [selItem, setSelItem] = useState(null);
  const [q, setQ] = useState("");
  const [fCat, setFCat] = useState("all");
  const [fCity, setFCity] = useState("All cities");
  const [fPrice, setFPrice] = useState(600);
  const [fSort, setFSort] = useState("Recommended");
  const [showFilt, setShowFilt] = useState(false);
  const [wished, setWished] = useState(new Set());
  const [msgs, setMsgs] = useState([]);
  const [ci, setCi] = useState("");
  const [busy, setBusy] = useState(false);
  const [cMode, setCMode] = useState("ai");
  const [cAgent, setCAgent] = useState(null);
  const [toast, setToast] = useState(null);
  const [appMode, setAppMode] = useState("tourist");
  const [pType, setPType] = useState(null);
  const [pName, setPName] = useState("");
  const [pTab, setPTab] = useState("dashboard");
  const [bkF, setBkF] = useState("all");
  const [bookItem, setBookItem] = useState(null);
  const [bookStep, setBookStep] = useState("detail");
  const [guests, setGuests] = useState({adults:2,children:0});
  const [itiItems, setItiItems] = useState([]);
  const [itiCity, setItiCity] = useState("Marrakech");
  const [itiDays, setItiDays] = useState(5);
  const [itiBuilt, setItiBuilt] = useState(false);
  const [genBusy, setGenBusy] = useState(false);
  const [itiText, setItiText] = useState("");
  const endRef = useRef(null);

  useEffect(()=>{
    setTimeout(()=>setSa(1),400);
    setTimeout(()=>setSa(2),1200);
    setTimeout(()=>setPhase("onboard"),2800);
  },[]);
  useEffect(()=>{
    (async()=>{try{const r=await window.storage.get("wv3_wl");if(r?.value)setWished(new Set(JSON.parse(r.value)));const u=await window.storage.get("wv3_user");if(u?.value)setUser(p=>({...p,...JSON.parse(u.value)}));}catch{}})();
  },[]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,busy]);

  const showToast = m => { setToast(m); setTimeout(()=>setToast(null),2200); };
  const toggleWish = async id => {
    const n=new Set(wished); n.has(id)?n.delete(id):n.add(id);
    setWished(n); showToast(n.has(id)?"❤️ Saved to wishlist":"Removed from wishlist");
    const pts = n.has(id)?user.points+5:Math.max(0,user.points-5);
    setUser(u=>({...u,points:pts}));
    try{await window.storage.set("wv3_wl",JSON.stringify([...n]));}catch{}
  };
  const addPoints = async (pts) => {
    const newPts = user.points+pts;
    setUser(u=>({...u,points:newPts}));
    showToast(`+${pts} Wayvo Points earned! 🌟`);
    try{await window.storage.set("wv3_user",JSON.stringify({...user,points:newPts}));}catch{}
  };
  const openItem = item => { setSelItem(item); setSub("detail"); };
  const goBack = () => { setSub(null); setSelItem(null); setBookItem(null); };
  const startBook = item => { setBookItem(item); setBookStep("detail"); setSub("booking"); };
  const startChat = (mode,agent=null) => {
    setCMode(mode); setCAgent(agent); setCi(""); setBusy(false);
    const greeting = mode==="agent"
      ?`Hello! I'm **${agent.name}** 😊\n\nI specialise in **${agent.spec}** and I've helped over ${agent.handled.toLocaleString()} travellers explore Morocco in ${agent.exp}.\n\n${user.name?"Great to meet you, "+user.name+"! ":""}You're in **${user.city||"Morocco"}**. What kind of experience are you dreaming of?`
      :`Marhba${user.name?" "+user.name:""}! 👋 I'm **Wayvo AI** — your Morocco travel intelligence.\n\nYou're in **${user.city||"Morocco"}**${user.interests.length?`, and I know you love ${user.interests.slice(0,2).join(" and ")}`:""}. Ask me anything — I'll reply in your language. 🇲🇦`;
    setMsgs([{role:"assistant",content:greeting}]);
    setSub("chat");
  };
  const sendMsg = async text => {
    const m=(text||ci).trim(); if(!m||busy) return;
    const um={role:"user",content:m};
    const nxt=[...msgs,um]; setMsgs(nxt); setCi(""); setBusy(true);
    const sys = cMode==="agent"&&cAgent
      ?`You are ${cAgent.name}, Wayvo senior travel specialist (${cAgent.spec}, ${cAgent.exp} experience). ${cAgent.bio} Tourist: ${user.name||"traveller"} from ${user.nat||"unknown"}, interests: ${user.interests.join(",")||"general"}, city: ${user.city}, budget: ${user.budget||"flexible"}. Auto-detect and respond in their language (EN/FR/AR/ES/IT/DE). Be warm, professional, expert. Suggest specific Wayvo experiences. End messages with: "${cAgent.name} · Wayvo Specialist"`
      :`You are Wayvo AI — Morocco's most intelligent travel companion. Tourist: ${user.name||"traveller"} from ${user.nat||"unknown"}, interests: ${user.interests.join(",")||"travel"}, city: ${user.city||"Morocco"}, budget: ${user.budget||"flexible"}. Auto-detect and respond in their language (EN/FR/AR/ES/IT/DE). Be warm, concise (max 3 paragraphs), practical. Give specific, hyperlocal Morocco recommendations. Emergency: Police 190, Ambulance 150, Tourist Police 177. Fair taxi prices: Marrakech medina → Gueliz = 20–30 MAD.`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:nxt.map(x=>({role:x.role,content:x.content}))})});
      const d=await r.json();
      setMsgs([...nxt,{role:"assistant",content:d.content?.[0]?.text||"Sorry, try again."}]);
    }catch{setMsgs([...nxt,{role:"assistant",content:"⚡ Connection issue. Please try again."}]);}
    setBusy(false);
  };

  const buildItinerary = async () => {
    setGenBusy(true); setItiBuilt(false); setItiText("");
    const prompt=`Create a ${itiDays}-day Morocco itinerary for ${user.name||"a traveller"} in/around ${itiCity}. Interests: ${user.interests.join(", ")||"general sightseeing"}. Budget: ${user.budget||"flexible"}. Format: Day 1: [Morning activity] → [Afternoon activity] → [Evening recommendation]. Keep each day to 2 lines max. Be specific with real Morocco place names. Response in the user's language (auto-detect from this message — default English).`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:prompt}]})});
      const d=await r.json();
      const txt=d.content?.[0]?.text||"Could not generate itinerary.";
      setItiText(txt);
      const matching=ITEMS.filter(it=>it.city===itiCity||it.loc.includes(itiCity)).slice(0,4);
      setItiItems(matching);
      setItiBuilt(true);
      addPoints(10);
    }catch{setItiText("Connection issue. Please try again.");}
    setGenBusy(false);
  };

  const wItems = ITEMS.filter(i=>wished.has(i.id));
  const filtered = ITEMS.filter(it=>{
    const sq=q.toLowerCase();
    return(!sq||[it.title,it.loc,it.city,...it.tags].some(x=>x.toLowerCase().includes(sq)))
      &&(fCat==="all"||it.cat===fCat)&&(fCity==="All cities"||it.city===fCity)&&it.price<=fPrice;
  }).sort((a,b)=>fSort==="Price: low to high"?a.price-b.price:fSort==="Price: high to low"?b.price-a.price:fSort==="Highest rated"?b.rating-a.rating:fSort==="Most popular"?b.reviews-a.reviews:0);

  // ─── SPLASH ─────────────────────────────────────────────────
  if(phase==="splash") return (
    <div style={{minHeight:"100vh",background:C.grad,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"var(--font-sans)"}}>
      <div style={{transform:`scale(${sa>=1?1:.5})`,opacity:sa>=1?1:0,transition:"all .6s cubic-bezier(.34,1.56,.64,1)"}}><Logo s={80}/></div>
      <div style={{textAlign:"center",opacity:sa>=1?1:0,transition:"opacity .5s .2s"}}>
        <p style={{margin:0,fontSize:40,fontWeight:900,letterSpacing:-2,color:"#fff"}}>Way<span style={{color:C.green}}>vo</span></p>
        <p style={{margin:"5px 0 0",fontSize:11,color:"rgba(255,255,255,.4)",letterSpacing:3,textTransform:"uppercase"}}>Know the way · everywhere</p>
      </div>
      <div style={{opacity:sa>=2?1:0,transition:"opacity .4s",display:"flex",gap:6,marginTop:4}}>
        {[0,.2,.4].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.green,animation:`tp .9s ${d}s infinite`}}/>)}
      </div>
      <div style={{position:"absolute",bottom:28,display:"flex",gap:16,opacity:.3}}>
        {["🏜️","🕌","⛵","⛰️","💙"].map(e=><span key={e} style={{fontSize:18}}>{e}</span>)}
      </div>
    </div>
  );

  // ─── ONBOARDING ──────────────────────────────────────────────
  if(phase==="onboard"){
    const tog=id=>setUser(u=>({...u,interests:u.interests.includes(id)?u.interests.filter(x=>x!==id):[...u.interests,id]}));
    return (
      <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)"}}>
        <div style={{padding:"14px 18px 0",display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          {obStep>1&&<button onClick={()=>setObStep(s=>s-1)} style={{background:"none",border:"none",fontSize:17,cursor:"pointer",color:"var(--color-text-secondary)",padding:0}}>←</button>}
          <div style={{flex:1,height:4,background:"var(--color-background-secondary)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${obStep/4*100}%`,background:C.green,borderRadius:4,transition:"width .4s"}}/></div>
          <span style={{fontSize:11,color:"var(--color-text-tertiary)",fontWeight:600}}>{obStep}/4</span>
        </div>
        <div style={{padding:"18px 18px 40px"}}>
          {obStep===1&&<>
            <Logo s={40}/>
            <p style={{fontSize:24,fontWeight:900,letterSpacing:-1,margin:"12px 0 4px",color:"var(--color-text-primary)"}}>Welcome to Wayvo 🇲🇦</p>
            <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 20px",lineHeight:1.6}}>Morocco's premium AI travel companion. Personalised for you from the first second.</p>
            <label style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6}}>Your first name</label>
            <input value={user.name} onChange={e=>setUser(u=>({...u,name:e.target.value}))} placeholder="e.g. Sophie" style={{width:"100%",padding:"13px 14px",borderRadius:11,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-primary)",fontSize:14,color:"var(--color-text-primary)",outline:"none",fontFamily:"var(--font-sans)",marginBottom:12}}/>
            <label style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6}}>Nationality</label>
            <select value={user.nat} onChange={e=>setUser(u=>({...u,nat:e.target.value}))} style={{width:"100%",padding:"13px 14px",borderRadius:11,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-primary)",fontSize:13,color:user.nat?"var(--color-text-primary)":"var(--color-text-tertiary)",outline:"none",fontFamily:"var(--font-sans)",marginBottom:20}}>
              <option value="">Select your country</option>
              {["French","British","American","Spanish","German","Italian","Dutch","Belgian","Canadian","Swiss","Moroccan","Other"].map(n=><option key={n}>{n}</option>)}
            </select>
            <button onClick={()=>{if(user.name.trim())setObStep(2);}} style={{width:"100%",padding:"13px",background:user.name.trim()?C.green:"var(--color-background-secondary)",border:"none",borderRadius:12,color:user.name.trim()?"#fff":"var(--color-text-tertiary)",fontSize:14,fontWeight:700,cursor:user.name.trim()?"pointer":"not-allowed"}}>Continue →</button>
            <button onClick={()=>setPhase("app")} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"var(--color-text-tertiary)",fontSize:11,cursor:"pointer",marginTop:5}}>Skip for now</button>
          </>}
          {obStep===2&&<>
            <p style={{fontSize:23,fontWeight:900,letterSpacing:-1,margin:"0 0 4px",color:"var(--color-text-primary)"}}>Your travel style{user.name?`, ${user.name}`:""}? ✈️</p>
            <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 16px"}}>Pick everything that applies — we use this to personalise everything</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
              {INTERESTS.map(it=>{const s=user.interests.includes(it.id);return(
                <button key={it.id} onClick={()=>tog(it.id)} style={{padding:"13px 8px",borderRadius:12,border:s?`2px solid ${C.green}`:"1px solid var(--color-border-tertiary)",background:s?C.green+"14":"var(--color-background-primary)",display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
                  <span style={{fontSize:20}}>{it.icon}</span>
                  <span style={{fontSize:11,fontWeight:s?700:400,color:s?C.gd:"var(--color-text-primary)"}}>{it.label}</span>
                </button>
              );})}
            </div>
            <button onClick={()=>{if(user.interests.length)setObStep(3);}} style={{width:"100%",padding:"13px",background:user.interests.length?C.green:"var(--color-background-secondary)",border:"none",borderRadius:12,color:user.interests.length?"#fff":"var(--color-text-tertiary)",fontSize:14,fontWeight:700,cursor:user.interests.length?"pointer":"not-allowed"}}>Continue ({user.interests.length} selected) →</button>
          </>}
          {obStep===3&&<>
            <p style={{fontSize:23,fontWeight:900,letterSpacing:-1,margin:"0 0 4px",color:"var(--color-text-primary)"}}>Your trip budget? 💰</p>
            <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 18px"}}>Per person, not including flights</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:22}}>
              {BUDGETS.map(b=>(
                <button key={b} onClick={()=>setUser(u=>({...u,budget:b}))} style={{padding:"13px 16px",borderRadius:12,border:user.budget===b?`2px solid ${C.green}`:"1px solid var(--color-border-tertiary)",background:user.budget===b?C.green+"14":"var(--color-background-primary)",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                  <span style={{fontSize:13,fontWeight:user.budget===b?700:400,color:"var(--color-text-primary)"}}>{b}</span>
                  {user.budget===b&&<span style={{color:C.green,fontSize:14}}>✓</span>}
                </button>
              ))}
            </div>
            <button onClick={()=>{if(user.budget)setObStep(4);}} style={{width:"100%",padding:"13px",background:user.budget?C.green:"var(--color-background-secondary)",border:"none",borderRadius:12,color:user.budget?"#fff":"var(--color-text-tertiary)",fontSize:14,fontWeight:700,cursor:user.budget?"pointer":"not-allowed"}}>Continue →</button>
          </>}
          {obStep===4&&<>
            <p style={{fontSize:23,fontWeight:900,letterSpacing:-1,margin:"0 0 4px",color:"var(--color-text-primary)"}}>First stop in Morocco? 📍</p>
            <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 16px"}}>Where does your adventure begin?</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:16}}>
              {CITIES.map(c=>(
                <button key={c} onClick={()=>setUser(u=>({...u,city:c}))} style={{padding:"12px 9px",borderRadius:10,border:user.city===c?`2px solid ${C.green}`:"1px solid var(--color-border-tertiary)",background:user.city===c?C.green+"14":"var(--color-background-primary)",cursor:"pointer",textAlign:"center"}}>
                  <p style={{margin:0,fontSize:12,fontWeight:user.city===c?700:400,color:"var(--color-text-primary)"}}>{c}</p>
                </button>
              ))}
            </div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:11,padding:"12px",marginBottom:18}}>
              <p style={{margin:"0 0 6px",fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1}}>Your profile</p>
              <p style={{margin:0,fontSize:12,color:"var(--color-text-primary)",lineHeight:2}}>
                👤 <strong>{user.name}</strong>{user.nat?` · ${user.nat}`:""}<br/>
                🎯 {user.interests.slice(0,5).map(id=>INTERESTS.find(x=>x.id===id)?.icon).join(" ")}<br/>
                💰 Budget: <strong>{user.budget}</strong><br/>
                📍 <strong>{user.city}</strong>
              </p>
            </div>
            <button onClick={async()=>{setPhase("app");setUser(u=>({...u,points:50}));showToast("Welcome! You earned 50 Wayvo Points 🌟");try{await window.storage.set("wv3_user",JSON.stringify({...user,points:50}));}catch{};}} style={{width:"100%",padding:"15px",background:C.green,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer"}}>Let's explore Morocco! 🚀</button>
          </>}
        </div>
      </div>
    );
  }

  // ─── PARTNER MODE ─────────────────────────────────────────
  if(appMode==="partner"&&!pName) return (
    <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{textAlign:"center",marginBottom:22}}><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:9}}><Logo s={38}/><Wm s={24}/></div><p style={{margin:"0 0 3px",fontSize:18,fontWeight:800,color:"var(--color-text-primary)"}}>Partner Portal</p><p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>Reach thousands of tourists · 85% commission yours</p></div>
        <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:16,padding:"20px"}}>
          <p style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Your business type</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
            {PT_TYPES.map(pt=>(
              <button key={pt.id} onClick={()=>setPType(pt)} style={{padding:"11px 8px",borderRadius:10,border:pType?.id===pt.id?`2px solid ${pt.col}`:"1px solid var(--color-border-tertiary)",background:pType?.id===pt.id?pt.col+"12":"var(--color-background-secondary)",cursor:"pointer",textAlign:"left"}}>
                <span style={{fontSize:18,display:"block",marginBottom:3}}>{pt.icon}</span>
                <p style={{margin:0,fontSize:11,fontWeight:600,color:"var(--color-text-primary)"}}>{pt.label}</p>
              </button>
            ))}
          </div>
          {pType&&<>
            <input value={pName} onChange={e=>setPName(e.target.value)} placeholder="Your business name" style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontSize:13,color:"var(--color-text-primary)",outline:"none",fontFamily:"var(--font-sans)",marginBottom:10}}/>
            <button onClick={()=>{if(pName.trim())setPTab("dashboard");}} style={{width:"100%",padding:"12px",background:pName.trim()?C.green:"var(--color-background-secondary)",border:"none",borderRadius:10,color:pName.trim()?"#fff":"var(--color-text-tertiary)",fontSize:13,fontWeight:700,cursor:pName.trim()?"pointer":"not-allowed"}}>Enter Dashboard →</button>
          </>}
        </div>
        <button onClick={()=>setAppMode("tourist")} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"var(--color-text-tertiary)",fontSize:11,cursor:"pointer",marginTop:8}}>← Back to tourist app</button>
      </div>
      <Toast msg={toast}/>
    </div>
  );

  if(appMode==="partner"&&pName){
    const pt=pType||PT_TYPES[0];
    const PTABS=[{id:"dashboard",icon:"📊",l:"Dash"},{id:"bookings",icon:"📅",l:"Book"},{id:"listings",icon:"🏷️",l:"List"},{id:"revenue",icon:"💰",l:"Rev"},{id:"reviews",icon:"⭐",l:"Rev"},{id:"settings",icon:"⚙️",l:"Set"}];
    const pc=()=>{
      if(pTab==="dashboard") return(
        <div style={{padding:"16px"}}>
          <p style={{margin:"0 0 2px",fontSize:17,fontWeight:800,color:"var(--color-text-primary)"}}>Welcome, {pName}! 👋</p>
          <p style={{margin:"0 0 15px",fontSize:11,color:"var(--color-text-secondary)"}}>April 2026 · Your performance</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:15}}>
            {[["💰","$9,400","Revenue","+14%",C.green],["📅","31","Bookings","+22%",C.blue],["⭐","4.88","Rating","+2%",C.gold],["📈","68%","Conversion","+8%",C.teal]].map(([ic,v,l,tr,co])=>(
              <div key={l} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:17}}>{ic}</span><span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:100,background:co+"15",color:co}}>{tr}</span></div>
                <p style={{margin:"0 0 1px",fontSize:19,fontWeight:800,color:co,letterSpacing:-1}}>{v}</p>
                <p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"13px",marginBottom:13}}>
            <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>Revenue trend</p>
            <ResponsiveContainer width="100%" height={110}>
              <AreaChart data={PT_MONTHLY} margin={{top:2,right:2,bottom:0,left:-24}}>
                <defs><linearGradient id="rg4" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={.2}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false}/>
                <XAxis dataKey="m" tick={{fontSize:9,fill:"var(--color-text-tertiary)"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:9,fill:"var(--color-text-tertiary)"}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
                <Tooltip formatter={v=>[`$${v.toLocaleString()}`]} contentStyle={{borderRadius:8,fontSize:11,border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)"}}/>
                <Area type="monotone" dataKey="rev" stroke={C.green} strokeWidth={2.5} fill="url(#rg4)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {PT_BKS.map(b=>(
            <div key={b.id} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <span style={{fontSize:17}}>{b.flag}</span>
              <div style={{flex:1,minWidth:0}}><p style={{margin:0,fontSize:12,fontWeight:600,color:"var(--color-text-primary)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.guest}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{b.svc}</p></div>
              <div style={{textAlign:"right",flexShrink:0}}><p style={{margin:"0 0 2px",fontSize:12,fontWeight:700}}>${b.amt}</p><SBadge s={b.status}/></div>
            </div>
          ))}
        </div>
      );
      if(pTab==="bookings") return(
        <div style={{padding:"16px"}}>
          <p style={{margin:"0 0 12px",fontSize:17,fontWeight:800,color:"var(--color-text-primary)"}}>Bookings</p>
          <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
            {["all","confirmed","pending","completed"].map(f=>(
              <button key={f} onClick={()=>setBkF(f)} style={{padding:"5px 11px",borderRadius:18,fontSize:10,fontWeight:bkF===f?700:400,border:bkF===f?`1.5px solid ${C.navy}`:"0.5px solid var(--color-border-secondary)",background:bkF===f?C.navy:"var(--color-background-primary)",color:bkF===f?"#fff":"var(--color-text-secondary)",cursor:"pointer",textTransform:"capitalize"}}>{f}</button>
            ))}
          </div>
          {PT_BKS.filter(b=>bkF==="all"||b.status===bkF).map(b=>(
            <div key={b.id} style={{background:"var(--color-background-primary)",border:`0.5px solid ${b.status==="pending"?"#FCD34D":"var(--color-border-tertiary)"}`,borderRadius:12,padding:"12px",marginBottom:8,borderLeft:`3px solid ${b.status==="pending"?C.gold:b.status==="confirmed"?C.green:"var(--color-border-tertiary)"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}><div style={{display:"flex",gap:8}}><span style={{fontSize:18}}>{b.flag}</span><div><p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>{b.guest}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{b.svc} · {b.cin}</p></div></div><SBadge s={b.status}/></div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <p style={{margin:0,fontSize:14,fontWeight:800,color:C.navy}}>${b.amt}</p>
                {b.status==="pending"&&<div style={{display:"flex",gap:6}}><button onClick={()=>showToast("Declined")} style={{padding:"6px 12px",borderRadius:7,border:"1px solid #FECACA",background:"#FEE2E2",color:"#B91C1C",fontSize:11,fontWeight:600,cursor:"pointer"}}>Decline</button><button onClick={()=>showToast(`✅ Accepted!`)} style={{padding:"6px 14px",borderRadius:7,background:C.green,border:"none",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Accept ✓</button></div>}
              </div>
            </div>
          ))}
        </div>
      );
      if(pTab==="revenue") return(
        <div style={{padding:"16px"}}>
          <p style={{margin:"0 0 12px",fontSize:17,fontWeight:800,color:"var(--color-text-primary)"}}>Revenue & Payouts</p>
          <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"14px",marginBottom:12}}>
            <p style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>Commission split</p>
            <div style={{display:"flex",height:9,borderRadius:100,overflow:"hidden",marginBottom:6}}><div style={{flex:85,background:C.green}}/><div style={{flex:15,background:"var(--color-background-secondary)"}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:10}}><span style={{color:C.gd,fontWeight:700}}>Your earnings: 85%</span><span style={{color:"var(--color-text-tertiary)"}}>Wayvo: 15%</span></div>
            <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)",background:"var(--color-background-secondary)",borderRadius:7,padding:"7px 9px"}}>Tourist pays $299 → You receive <strong style={{color:C.navy}}>$254.15</strong> → Wayvo earns $44.85</p>
          </div>
          {[["Apr 15 2026","$3,240","paid"],["Mar 15 2026","$4,180","paid"],["May 1 2026","$5,180","upcoming"]].map(([d,a,s])=>(
            <div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <div><p style={{margin:0,fontSize:12,fontWeight:600,color:"var(--color-text-primary)"}}>{a}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{d}</p></div>
              <SBadge s={s}/>
            </div>
          ))}
        </div>
      );
      if(pTab==="settings") return(
        <div style={{padding:"16px"}}>
          <p style={{margin:"0 0 12px",fontSize:17,fontWeight:800,color:"var(--color-text-primary)"}}>Settings</p>
          <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"13px",marginBottom:10}}>
            <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:11,paddingBottom:11,borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <div style={{width:44,height:44,borderRadius:11,background:pt.col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{pt.icon}</div>
              <div><p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>{pName}</p><p style={{margin:"2px 0 0",fontSize:10,color:"var(--color-text-secondary)"}}>{pt.label} · Verified ✅ · 85% commission</p></div>
            </div>
            {[["Partner type",pt.label],["Commission","15% standard"],["Payout","Monthly on 1st via CMI"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
                <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{k}</span>
                <span style={{fontSize:11,fontWeight:500,color:"var(--color-text-primary)"}}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>{setAppMode("tourist");setPName("");setPType(null);}} style={{width:"100%",padding:"11px",borderRadius:10,border:"1px solid #FECACA",background:"#FEF2F2",color:"#B91C1C",fontSize:12,fontWeight:600,cursor:"pointer"}}>Sign out of Partner Portal</button>
        </div>
      );
      return <div style={{padding:"16px",textAlign:"center",color:"var(--color-text-tertiary)",paddingTop:40}}>Coming soon</div>;
    };
    return(
      <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)",display:"flex",flexDirection:"column"}}>
        <div style={{background:C.grad,padding:"10px 13px",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <Logo s={24}/><div style={{flex:1}}><p style={{margin:0,fontSize:13,fontWeight:800,color:"#fff"}}>Way<span style={{color:C.green}}>vo</span> <span style={{fontWeight:400,fontSize:10,color:"rgba(255,255,255,.4)"}}>Partner</span></p></div>
          <div style={{background:"rgba(255,255,255,.1)",borderRadius:7,padding:"3px 9px",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:11}}>{pt.icon}</span><span style={{fontSize:10,color:"rgba(255,255,255,.7)",fontWeight:500}}>{pName}</span></div>
        </div>
        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          <div style={{width:48,background:"var(--color-background-primary)",borderRight:"0.5px solid var(--color-border-tertiary)",display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 0",gap:2,flexShrink:0}}>
            {PTABS.map(t=>(
              <button key={t.id} onClick={()=>setPTab(t.id)} style={{width:38,height:38,borderRadius:8,border:"none",background:pTab===t.id?C.navy:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1}}>
                <span style={{fontSize:13}}>{t.icon}</span><span style={{fontSize:7,color:pTab===t.id?"#fff":"var(--color-text-tertiary)",fontWeight:pTab===t.id?700:400}}>{t.l}</span>
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:"auto"}}>{pc()}</div>
        </div>
        <Toast msg={toast}/>
      </div>
    );
  }

  // ─── TOURIST APP SUB-SCREENS ──────────────────────────────

  // DETAIL + BOOKING
  const renderBooking = () => {
    if(!bookItem) return null;
    const it=bookItem; const isH=it.cat==="hotels";
    const nights=1; const tot=it.price*(isH?nights:1)*(guests.adults+(guests.children*.5));
    if(bookStep==="detail") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:90}}>
        <div style={{height:150,background:`linear-gradient(135deg,${it.col}35,${it.col}72,${C.navy})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:60,position:"relative",flexShrink:0}}>
          {it.em}
          <button onClick={goBack} style={{position:"absolute",top:11,left:11,width:32,height:32,borderRadius:"50%",background:"rgba(0,0,0,.4)",border:"none",color:"#fff",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{position:"absolute",top:9,right:9}}><HeartBtn filled={wished.has(it.id)} onToggle={()=>toggleWish(it.id)} overlay/></div>
          {it.avail<=3&&<div style={{position:"absolute",bottom:9,right:9}}><Pill text={`⚡ Only ${it.avail} left`} color="#fff" bg="rgba(229,57,53,.85)"/></div>}
        </div>
        <div style={{padding:"16px 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
            <div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:5}}><Pill text={it.badge} color={C.gold}/>{it.eco&&<Pill text="🌿 Eco" color={C.teal}/>}{it.hot&&<Pill text="🔥 Hot" color={C.red}/>}</div><p style={{margin:0,fontSize:20,fontWeight:900,letterSpacing:-.5,color:"var(--color-text-primary)"}}>{it.title}</p></div>
            <div style={{textAlign:"right",flexShrink:0}}><p style={{margin:0,fontSize:22,fontWeight:900,color:C.navy}}>${it.price}</p>{it.orig&&<p style={{margin:0,fontSize:10,color:"var(--color-text-tertiary)",textDecoration:"line-through"}}>${it.orig}</p>}<p style={{margin:0,fontSize:9,color:"var(--color-text-tertiary)"}}>{isH?"/ night":"/ person"}</p></div>
          </div>
          <p style={{margin:"0 0 12px",fontSize:11,color:"var(--color-text-secondary)"}}>📍 {it.loc} {it.duration&&`· ⏱ ${it.duration}`} {it.group&&`· 👥 ${it.group} people`}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:14}}>
            {[["⭐",it.rating,"Rating"],["💬",it.reviews,"Reviews"],["⏱️",it.duration||"Flexible","Duration"]].map(([ic,v,l])=>(
              <div key={l} style={{background:"var(--color-background-secondary)",borderRadius:9,padding:"9px",textAlign:"center"}}>
                <p style={{margin:0,fontSize:15}}>{ic}</p><p style={{margin:"2px 0 1px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>{v}</p><p style={{margin:0,fontSize:9,color:"var(--color-text-secondary)"}}>{l}</p>
              </div>
            ))}
          </div>
          {it.inc&&<><p style={{margin:"0 0 8px",fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8}}>What's included</p>{it.inc.map(i=><div key={i} style={{display:"flex",gap:7,padding:"5px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}><span style={{color:C.green,fontWeight:700,fontSize:12}}>✓</span><span style={{fontSize:11,color:"var(--color-text-primary)"}}>{i}</span></div>)}</>}
          <div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:9,padding:"9px 12px",margin:"14px 0",display:"flex",gap:6,alignItems:"center"}}>
            <span>🛡️</span><p style={{margin:0,fontSize:11,color:"#166534"}}><strong>Wayvo Guarantee</strong> · Free cancellation 48h before · Instant confirmation · Secure payment</p>
          </div>
          <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"11px 13px",marginBottom:14}}>
            <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8}}>Also popular with this experience</p>
            <div style={{display:"flex",gap:7,overflowX:"auto",scrollbarWidth:"none"}}>
              {ITEMS.filter(x=>x.city===it.city&&x.id!==it.id).slice(0,3).map(x=>(
                <div key={x.id} onClick={e=>{e.stopPropagation();startBook(x);}} style={{flexShrink:0,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,padding:"8px",cursor:"pointer",width:110}}>
                  <p style={{margin:0,fontSize:18,textAlign:"center"}}>{x.em}</p>
                  <p style={{margin:"4px 0 2px",fontSize:10,fontWeight:600,color:"var(--color-text-primary)",lineHeight:1.3}}>{x.title}</p>
                  <p style={{margin:0,fontSize:10,fontWeight:700,color:C.green}}>${x.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"sticky",bottom:0,background:"var(--color-background-primary)",paddingTop:10,paddingBottom:4,borderTop:"0.5px solid var(--color-border-tertiary)"}}>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setBookStep("guests")} style={{flex:2,padding:"13px",borderRadius:11,background:C.green,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Book now — ${it.price} →</button>
              <button onClick={()=>startChat("ai")} style={{flex:1,padding:"13px",borderRadius:11,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)",fontSize:12,cursor:"pointer"}}>Ask AI</button>
            </div>
            <p style={{textAlign:"center",fontSize:9,color:"var(--color-text-tertiary)",margin:"6px 0 0"}}>Free cancellation · No hidden fees · Secure checkout</p>
          </div>
        </div>
      </div>
    );
    if(bookStep==="guests") return(
      <div style={{flex:1,overflowY:"auto",padding:"18px 14px 90px"}}>
        <p style={{fontSize:18,fontWeight:800,letterSpacing:-.5,margin:"0 0 4px",color:"var(--color-text-primary)"}}>How many guests?</p>
        <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 18px"}}>Prices adjust automatically</p>
        {[["Adults","18+ years","adults",true],["Children","2–17 years (50% off)","children",false]].map(([l,s,k,req])=>(
          <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:13,marginBottom:10}}>
            <div><p style={{margin:0,fontSize:13,fontWeight:600,color:"var(--color-text-primary)"}}>{l}</p><p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>{s}</p></div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <button onClick={()=>setGuests(g=>({...g,[k]:Math.max(req?1:0,g[k]-1)}))} style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--color-border-secondary)",background:"none",fontSize:20,cursor:"pointer",color:"var(--color-text-primary)",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:17,fontWeight:700,color:"var(--color-text-primary)",minWidth:20,textAlign:"center"}}>{guests[k]}</span>
              <button onClick={()=>setGuests(g=>({...g,[k]:Math.min(12,g[k]+1)}))} style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--color-border-secondary)",background:"none",fontSize:20,cursor:"pointer",color:"var(--color-text-primary)",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>
        ))}
        {guests.adults>=2&&<div style={{background:"#EAF3DE",border:"1px solid #97C459",borderRadius:10,padding:"10px 13px",marginBottom:14,display:"flex",gap:7,alignItems:"center"}}>
          <span>🎉</span><p style={{margin:0,fontSize:11,color:"#27500A"}}><strong>Group deal unlocked!</strong> 2+ adults get priority guide access and a free city map pack.</p>
        </div>}
        <div style={{background:"var(--color-background-secondary)",borderRadius:11,padding:"13px",marginBottom:18}}>
          {[["Experience",it.title],["Adults",guests.adults+" × $"+it.price+" = $"+(it.price*guests.adults)],guests.children>0&&["Children",guests.children+" × $"+Math.round(it.price*.5)+" = $"+(Math.round(it.price*.5)*guests.children)]].filter(Boolean).map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{k}</span><span style={{fontSize:11,fontWeight:600,color:"var(--color-text-primary)"}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0"}}><span style={{fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>Total</span><span style={{fontSize:16,fontWeight:800,color:C.navy}}>${Math.round(tot)}</span></div>
        </div>
        <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"10px 13px",marginBottom:14}}>
          <p style={{margin:"0 0 4px",fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8}}>💡 Popular add-ons</p>
          {[["🚗 Private transfer to meeting point","$25"],["📸 Private photographer (2hrs)","$79"],["🛡️ Travel insurance","$8/day"]].map(([a,p])=>(
            <div key={a} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{a}</span>
              <button onClick={()=>showToast("Add-on included!")} style={{fontSize:10,fontWeight:700,color:C.green,background:"none",border:`1px solid ${C.green}`,borderRadius:6,padding:"3px 8px",cursor:"pointer"}}>+ {p}</button>
            </div>
          ))}
        </div>
        <button onClick={()=>setBookStep("confirm")} style={{width:"100%",padding:"14px",background:C.green,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Continue to payment → ${Math.round(tot)}</button>
      </div>
    );
    if(bookStep==="confirm") return(
      <div style={{flex:1,overflowY:"auto",padding:"18px 14px 90px"}}>
        <p style={{fontSize:18,fontWeight:800,letterSpacing:-.5,margin:"0 0 4px",color:"var(--color-text-primary)"}}>Secure checkout</p>
        <div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:9,padding:"9px 12px",marginBottom:14,display:"flex",gap:6,alignItems:"center"}}><span>🔒</span><p style={{margin:0,fontSize:11,color:"#166534"}}>256-bit SSL · Powered by Stripe · PCI DSS compliant</p></div>
        <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"14px",marginBottom:14}}>
          <div style={{display:"flex",justify:"space-between",alignItems:"center",marginBottom:10,paddingBottom:10,borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
            <div><p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>{it.title}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{guests.adults} adult{guests.adults!==1?"s":""}  {guests.children>0?`· ${guests.children} child`:""}</p></div>
            <p style={{margin:0,fontSize:16,fontWeight:800,color:C.navy}}>${Math.round(tot)}</p>
          </div>
          {[["Card number","1234 5678 9012 3456"],["Cardholder name",user.name||"Full name"],["Expiry","MM/YY"],["CVV","•••"]].map(([l,ph])=>(
            <div key={l} style={{marginBottom:10}}>
              <label style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8,display:"block",marginBottom:5}}>{l}</label>
              <input placeholder={ph} style={{width:"100%",padding:"11px 13px",borderRadius:9,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontSize:13,color:"var(--color-text-primary)",outline:"none",fontFamily:"var(--font-sans)"}}/>
            </div>
          ))}
        </div>
        <button onClick={()=>{setBookStep("confirmed");addPoints(Math.round(tot*.1));}} style={{width:"100%",padding:"14px",background:C.navy,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Pay ${Math.round(tot)} securely →</button>
        <p style={{textAlign:"center",fontSize:10,color:"var(--color-text-tertiary)",margin:"7px 0 0"}}>Free cancellation up to 48h before · No hidden fees</p>
      </div>
    );
    if(bookStep==="confirmed") return(
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"30px 18px",textAlign:"center"}}>
        <div style={{width:76,height:76,borderRadius:"50%",background:C.green+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:16}}>✅</div>
        <p style={{fontSize:24,fontWeight:900,color:C.navy,letterSpacing:-.5,margin:"0 0 6px"}}>Booking confirmed!</p>
        <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 6px"}}>A confirmation has been sent to your email</p>
        <div style={{background:C.green+"18",borderRadius:9,padding:"6px 14px",marginBottom:22}}><p style={{margin:0,fontSize:12,fontWeight:700,color:C.gd}}>🌟 You earned {Math.round(tot*.1)} Wayvo Points!</p></div>
        <div style={{background:"var(--color-background-secondary)",borderRadius:14,padding:"16px",width:"100%",marginBottom:18}}>
          {[["Experience",it.title],["Date","Check confirmation email"],["Guests",guests.adults+" adults"],["Total paid","$"+Math.round(tot)],["Reference","#WV-"+Math.floor(Math.random()*900000+100000)]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}><span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{k}</span><span style={{fontSize:11,fontWeight:600,color:"var(--color-text-primary)"}}>{v}</span></div>
          ))}
        </div>
        <button onClick={()=>startChat("ai")} style={{width:"100%",padding:"12px",background:C.green,border:"none",borderRadius:11,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:8}}>Get tips from Wayvo AI</button>
        <button onClick={goBack} style={{width:"100%",padding:"12px",background:"none",border:"0.5px solid var(--color-border-secondary)",borderRadius:11,color:"var(--color-text-secondary)",fontSize:12,cursor:"pointer"}}>Back to home</button>
      </div>
    );
    return null;
  };

  const renderSub = () => {
    if(sub==="booking") return(
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{background:C.grad,padding:"10px 13px",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <button onClick={()=>{if(bookStep==="detail"||bookStep==="confirmed")goBack();else if(bookStep==="guests")setBookStep("detail");else if(bookStep==="confirm")setBookStep("guests");}} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:18,cursor:"pointer",padding:0,lineHeight:1}}>←</button>
          <div style={{flex:1}}><p style={{margin:0,fontSize:13,fontWeight:700,color:"#fff"}}>{bookItem?.title}</p><p style={{margin:0,fontSize:10,color:C.green}}>{bookStep==="detail"?"Overview":bookStep==="guests"?"Guests":bookStep==="confirm"?"Payment":"Confirmed"}</p></div>
          {bookStep!=="confirmed"&&<div style={{display:"flex",gap:3}}>{["detail","guests","confirm"].map((s,i)=><div key={s} style={{width:20,height:3,borderRadius:3,background:s===bookStep?C.green:"rgba(255,255,255,.2)"}}/>)}</div>}
        </div>
        {renderBooking()}
      </div>
    );

    if(sub==="chat") return(
      <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
        <div style={{background:C.grad,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.7)",fontSize:18,cursor:"pointer",padding:0,lineHeight:1}}>←</button>
          {cMode==="agent"&&cAgent?<div style={{width:32,height:32,borderRadius:"50%",background:cAgent.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",flexShrink:0}}>{cAgent.img}</div>:<Logo s={30}/>}
          <div style={{flex:1}}><p style={{margin:0,fontSize:13,fontWeight:700,color:"#fff"}}>{cMode==="agent"&&cAgent?cAgent.name:"Wayvo AI"}</p><p style={{margin:0,fontSize:10,color:C.green}}>{cMode==="agent"&&cAgent?cAgent.spec+" · "+cAgent.lang.join("·"):"AI · "+user.city+" · Auto language"}</p></div>
          {cMode==="ai"?<button onClick={()=>setSub("agents")} style={{fontSize:10,padding:"4px 9px",borderRadius:17,background:C.green+"28",border:`1px solid ${C.green}45`,color:C.green,cursor:"pointer"}}>👤 Human</button>
            :<button onClick={()=>startChat("ai")} style={{fontSize:10,padding:"4px 9px",borderRadius:17,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.6)",cursor:"pointer"}}>🤖 AI</button>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px",display:"flex",flexDirection:"column",gap:8}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-end",gap:7,justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              {m.role==="assistant"&&(cMode==="agent"&&cAgent?<div style={{width:24,height:24,borderRadius:"50%",background:cAgent.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff",flexShrink:0}}>{cAgent.img}</div>:<Logo s={24}/>)}
              <div style={{maxWidth:"78%",padding:"9px 12px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?C.navy:"var(--color-background-primary)",border:m.role==="assistant"?"0.5px solid var(--color-border-tertiary)":"none",color:m.role==="user"?"#fff":"var(--color-text-primary)",fontSize:12,lineHeight:1.65,whiteSpace:"pre-wrap"}}>
                {m.role==="assistant"?fmd(m.content):m.content}
              </div>
            </div>
          ))}
          {busy&&<div style={{display:"flex",alignItems:"flex-end",gap:7}}>{cMode==="agent"&&cAgent?<div style={{width:24,height:24,borderRadius:"50%",background:cAgent.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>{cAgent.img}</div>:<Logo s={24}/>}<Typing col={cMode==="agent"&&cAgent?cAgent.col:C.green}/></div>}
          <div ref={endRef}/>
        </div>
        <div style={{background:"var(--color-background-primary)",borderTop:"0.5px solid var(--color-border-tertiary)",padding:"8px 12px",display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
          <input value={ci} onChange={e=>setCi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMsg()} placeholder="Ask anything about Morocco…" style={{flex:1,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:21,padding:"8px 13px",fontSize:12,color:"var(--color-text-primary)",outline:"none",fontFamily:"var(--font-sans)"}}/>
          <button onClick={()=>sendMsg()} disabled={!ci.trim()||busy} style={{width:36,height:36,borderRadius:"50%",background:ci.trim()&&!busy?C.green:"var(--color-background-secondary)",border:"none",color:ci.trim()&&!busy?"#fff":"var(--color-text-tertiary)",fontSize:14,cursor:ci.trim()&&!busy?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s"}}>↑</button>
        </div>
      </div>
    );

    if(sub==="agents") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"11px 13px 16px"}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",fontSize:16,cursor:"pointer",padding:0,marginBottom:8,display:"block"}}>←</button>
          <p style={{margin:0,fontSize:17,fontWeight:800,color:"#fff",letterSpacing:-.5}}>Talk to a Specialist</p>
          <p style={{margin:"3px 0 0",fontSize:10,color:"rgba(255,255,255,.4)"}}>Real humans · Certified experts · Instant response</p>
        </div>
        <div style={{padding:"12px"}}>
          <div style={{background:"var(--color-background-info)",borderRadius:9,padding:"9px 12px",marginBottom:12,display:"flex",gap:7,alignItems:"center"}}>
            <span>🟢</span><p style={{margin:0,fontSize:11,color:"var(--color-text-info)"}}>3 specialists online · Avg first response: 45 seconds</p>
          </div>
          {AGENTS.map(a=>(
            <div key={a.id} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:14,padding:"14px",marginBottom:10}}>
              <div style={{display:"flex",gap:10,marginBottom:10}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:a.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff"}}>{a.img}</div>
                  <div style={{position:"absolute",bottom:0,right:0,width:11,height:11,borderRadius:"50%",background:a.status==="online"?"#22C55E":"#F59E0B",border:"2px solid var(--color-background-primary)"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}><p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>{a.name}</p><Pill text={a.status==="online"?"● Online":"● Busy"} color={a.status==="online"?"#16A34A":"#D97706"} small/></div>
                  <p style={{margin:"0 0 2px",fontSize:11,fontWeight:600,color:a.col}}>{a.spec}</p>
                  <p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{a.lang.join(" · ")} · {a.exp} · ⭐{a.rating} · {a.handled.toLocaleString()} trips</p>
                </div>
              </div>
              <p style={{margin:"0 0 10px",fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.5,fontStyle:"italic"}}>"{a.bio}"</p>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>startChat("agent",a)} disabled={a.status!=="online"} style={{flex:2,padding:"10px",borderRadius:9,background:a.status==="online"?a.col:"var(--color-background-secondary)",border:"none",color:a.status==="online"?"#fff":"var(--color-text-tertiary)",fontSize:12,fontWeight:600,cursor:a.status==="online"?"pointer":"not-allowed"}}>
                  💬 {a.status==="online"?`Chat · ${a.response}`:"Currently busy"}
                </button>
                {a.status==="online"&&<button onClick={()=>showToast("WhatsApp opening...")} style={{flex:1,padding:"10px",borderRadius:9,background:"#25D366",border:"none",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>WhatsApp</button>}
              </div>
            </div>
          ))}
          <div style={{background:"var(--color-background-secondary)",borderRadius:12,padding:"13px",marginTop:4}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>🎥 Video consultation</p>
            <p style={{margin:"0 0 9px",fontSize:11,color:"var(--color-text-secondary)"}}>Book a 30-minute video call with a senior specialist for complex multi-city trips.</p>
            <button onClick={()=>showToast("Video call booking opening...")} style={{padding:"9px 16px",background:C.blue,border:"none",borderRadius:9,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Book video call — $29 →</button>
          </div>
        </div>
      </div>
    );

    if(sub==="wishlist") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"11px 13px 16px"}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",fontSize:16,cursor:"pointer",padding:0,marginBottom:8,display:"block"}}>←</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><p style={{margin:0,fontSize:17,fontWeight:800,color:"#fff",letterSpacing:-.5}}>My Wishlist</p><p style={{margin:"3px 0 0",fontSize:10,color:"rgba(255,255,255,.4)"}}>{wItems.length} saved · {user.points} Wayvo Points</p></div>
            {wItems.length>0&&<Pill text={`❤️ ${wItems.length}`} color="#FCA5A5" bg="rgba(229,57,53,.2)"/>}
          </div>
        </div>
        <div style={{padding:"12px"}}>
          {wItems.length===0?(<div style={{textAlign:"center",padding:"44px 20px"}}><p style={{fontSize:40,margin:"0 0 9px"}}>🤍</p><p style={{fontSize:15,fontWeight:800,color:"var(--color-text-primary)",margin:"0 0 6px"}}>Wishlist is empty</p><p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 16px"}}>Tap ❤️ on any experience to save it.</p><button onClick={()=>{setSub(null);setTab("search");}} style={{padding:"10px 20px",background:C.green,border:"none",borderRadius:10,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Explore →</button></div>)
          :(<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:11}}>
              <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,padding:"10px",textAlign:"center"}}><p style={{margin:0,fontSize:17}}>💰</p><p style={{margin:"3px 0 1px",fontSize:15,fontWeight:800,color:"var(--color-text-primary)"}}>${Math.round(wItems.reduce((s,i)=>s+i.price,0)/wItems.length)}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>avg price</p></div>
              <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,padding:"10px",textAlign:"center"}}><p style={{margin:0,fontSize:17}}>💰</p><p style={{margin:"3px 0 1px",fontSize:15,fontWeight:800,color:"var(--color-text-primary)"}}>${wItems.reduce((s,i)=>s+i.price,0)}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>total value</p></div>
            </div>
            {wItems.map(it=><Card key={it.id} item={it} wished compact onWish={()=>toggleWish(it.id)} onOpen={it2=>{startBook(it2);}}/>)}
            <button onClick={()=>{setSub(null);setTab("search");}} style={{width:"100%",padding:"10px",background:"var(--color-background-primary)",border:`1px solid ${C.green}`,borderRadius:10,color:C.green,fontSize:12,fontWeight:700,cursor:"pointer",marginTop:4}}>+ Explore more</button>
          </>)}
        </div>
      </div>
    );

    if(sub==="emergency") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:"#7F1D1D",padding:"11px 13px 16px"}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",fontSize:16,cursor:"pointer",padding:0,marginBottom:8,display:"block"}}>←</button>
          <p style={{margin:0,fontSize:17,fontWeight:800,color:"#fff"}}>🆘 Emergency Help</p>
          <p style={{margin:"3px 0 0",fontSize:10,color:"rgba(255,255,255,.5)"}}>Morocco emergency contacts · Guided steps · Works offline</p>
        </div>
        <div style={{padding:"12px"}}>
          <div style={{background:"#FEE2E2",border:"1px solid #FECACA",borderRadius:12,padding:"13px",marginBottom:11}}>
            <p style={{margin:"0 0 9px",fontSize:12,fontWeight:700,color:"#7F1D1D"}}>🚨 Emergency numbers — save now</p>
            {[["🚔 Police","190","Emergency"],["🚑 Ambulance","150","Medical"],["👮 Tourist Police","177","For tourists only"],["🔥 Fire Brigade","15","Fire & rescue"],["🏥 SOS Médecins","0520 48 48 48","24/7 doctor home visits"]].map(([n,num,d])=>(
              <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"6px 0",borderBottom:"0.5px solid #FECACA"}}>
                <div><p style={{margin:0,fontSize:12,color:"#B91C1C",fontWeight:600}}>{n}</p><p style={{margin:0,fontSize:9,color:"#DC2626"}}>{d}</p></div>
                <span style={{fontSize:14,fontWeight:800,color:"#7F1D1D"}}>{num}</span>
              </div>
            ))}
          </div>
          {[["🚨","I was robbed",["Stay calm — do not chase the thief","Go to nearest Commissariat de Police (police station)","File a procès-verbal (police report) — keep the reference number","Contact your country's embassy immediately","Cancel your bank cards — call your bank's international emergency number"]],["🤒","I'm sick or injured",["For life-threatening: call Ambulance 150 immediately","For non-urgent: call SOS Médecins 0520 48 48 48 (24/7 home visits)","Ask your hotel reception for the nearest private clinique or pharmacie de garde","Keep your passport or a passport photo with you at all times"]],["🛂","I lost my passport",["File a police report first — you need the reference number","Contact your embassy — they will issue an emergency travel document","Most embassies in Rabat, with consulates in Casablanca and Marrakech","Keep a photo of your passport in cloud storage as backup"]],["📵","No internet or data in Morocco",["Find any café — request free WiFi. Say: 'WiFi s'il vous plaît?'","Show this screen to any local — Moroccans are extremely helpful to tourists","Ask for 'Le commissariat de police' — they will guide you safely","Emergency numbers 190 and 150 work without any data or credit"]],["🌡️","Extreme heat emergency",["Get out of direct sun immediately — seek shade or air-conditioned space","Drink water slowly — ask for 'eau fraîche s'il vous plaît'","Wet a cloth and apply to neck and wrists — cools body temperature fast","If someone collapses, call 150 and keep them in shade and cool"]],].map(([ic,title,steps])=>(
            <div key={title} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:11,padding:"12px",marginBottom:8}}>
              <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>{ic} {title}</p>
              {steps.map((s,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"5px 0",borderTop:"0.5px solid var(--color-border-tertiary)"}}>
                  <div style={{width:17,height:17,borderRadius:"50%",background:C.red+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:8,fontWeight:700,color:C.red}}>{i+1}</span></div>
                  <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.5}}>{s}</p>
                </div>
              ))}
            </div>
          ))}
          <button onClick={()=>startChat("ai")} style={{width:"100%",padding:"11px",background:C.red,border:"none",borderRadius:10,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>💬 Get AI guidance now →</button>
        </div>
      </div>
    );

    if(sub==="packages") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"11px 13px 16px"}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",fontSize:16,cursor:"pointer",padding:0,marginBottom:8,display:"block"}}>←</button>
          <p style={{margin:0,fontSize:17,fontWeight:800,color:"#fff",letterSpacing:-.5}}>Multi-Day Packages</p>
          <p style={{margin:"3px 0 0",fontSize:10,color:"rgba(255,255,255,.4)"}}>All-inclusive · Expert guides · Best value</p>
        </div>
        <div style={{padding:"12px"}}>
          {PKGS.map(p=>(
            <div key={p.days} style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:14,overflow:"hidden",marginBottom:11}}>
              <div style={{background:C.grad,padding:"14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div><div style={{display:"flex",gap:5,marginBottom:5}}><Pill text={p.days+" days"} color={C.green}/><Pill text={`Save $${p.saving}`} color="#fff" bg="#E53935"/></div><p style={{margin:"0 0 2px",fontSize:15,fontWeight:800,color:"#fff"}}>{p.em} {p.title}</p><p style={{margin:"0 0 8px",fontSize:10,color:"rgba(255,255,255,.5)"}}>📍 {p.cities}</p><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{p.tags.map(t=><span key={t} style={{fontSize:9,padding:"2px 7px",borderRadius:100,background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.8)"}}>{t}</span>)}</div></div>
                  <div style={{textAlign:"right"}}><p style={{margin:0,fontSize:22,fontWeight:900,color:C.green}}>${p.price}</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,.4)"}}>/ person</p></div>
                </div>
              </div>
              <div style={{padding:"11px 13px",display:"flex",gap:7}}>
                <button onClick={()=>startChat("agent",AGENTS[0])} style={{flex:2,padding:"10px",background:C.green,border:"none",borderRadius:9,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Book with specialist →</button>
                <button onClick={()=>startChat("ai")} style={{flex:1,padding:"10px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:9,color:"var(--color-text-secondary)",fontSize:11,cursor:"pointer"}}>Ask AI</button>
              </div>
            </div>
          ))}
          <div style={{background:"var(--color-background-secondary)",borderRadius:12,padding:"13px"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>✏️ Need something custom?</p>
            <p style={{margin:"0 0 9px",fontSize:11,color:"var(--color-text-secondary)"}}>Our specialists build fully bespoke trips for any duration, group, or budget.</p>
            <button onClick={()=>setSub("agents")} style={{padding:"9px 16px",background:C.navy,border:"none",borderRadius:9,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Talk to a specialist →</button>
          </div>
        </div>
      </div>
    );

    return null;
  };

  if(sub&&sub!=="itinerary") return(
    <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)",display:"flex",flexDirection:"column"}}>
      {renderSub()}
      <Toast msg={toast}/>
    </div>
  );

  // ─── MAIN TABS ────────────────────────────────────────────
  const TABS = [
    {id:"home",icon:"🏠",label:"Home"},
    {id:"search",icon:"🔍",label:"Search"},
    {id:"plan",icon:"🗺️",label:"Plan"},
    {id:"support",icon:"💬",label:"Support"},
    {id:"profile",icon:"👤",label:"Profile"},
  ];

  const renderTab = () => {

    // ── HOME ──────────────────────────────────────────────
    if(tab==="home") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        {/* Hero */}
        <div style={{background:C.grad,padding:"18px 14px 22px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-40,right:-40,width:150,height:150,borderRadius:"50%",background:"rgba(0,200,150,.05)"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><Logo s={28}/><Wm light s={19}/></div>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              {user.points>0&&<div style={{background:"rgba(245,163,35,.2)",border:"1px solid rgba(245,163,35,.3)",borderRadius:18,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:11}}>🌟</span><span style={{fontSize:11,color:C.gold,fontWeight:700}}>{user.points}pts</span></div>}
              <button onClick={()=>setSub("wishlist")} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:9,padding:"6px 10px",cursor:"pointer"}}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill={wItems.length>0?"#E53935":"none"} stroke={wItems.length>0?"#E53935":"rgba(255,255,255,.7)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span style={{fontSize:11,color:"#fff",fontWeight:600}}>{wItems.length>0?wItems.length:"Save"}</span>
              </button>
            </div>
          </div>
          <p style={{fontSize:20,fontWeight:900,color:"#fff",letterSpacing:-.5,lineHeight:1.2,margin:"0 0 2px"}}>Hey{user.name?" "+user.name:""}! 👋</p>
          <p style={{fontSize:11,color:"rgba(255,255,255,.45)",margin:"0 0 13px"}}>🇲🇦 {user.city} · What are you looking for today?</p>
          <SearchBar q={q} setQ={setQ} onFocus={()=>setTab("search")}/>
          {/* Trust strip */}
          <div style={{display:"flex",gap:10,marginTop:13,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
            {["✅ Verified partners","⭐ 4.9 avg rating","🛡️ Wayvo Guarantee","📞 24/7 support"].map(t=><span key={t} style={{flexShrink:0,fontSize:9,fontWeight:600,color:"rgba(255,255,255,.5)",background:"rgba(255,255,255,.07)",padding:"4px 9px",borderRadius:100,border:"1px solid rgba(255,255,255,.1)"}}>{t}</span>)}
          </div>
        </div>

        <div style={{padding:"14px"}}>
          {/* Seasonal intelligence banner */}
          <div style={{background:"linear-gradient(135deg,#854F0B18,#F5A62318)",border:"1px solid #F5A62330",borderRadius:12,padding:"11px 13px",marginBottom:14,display:"flex",gap:9,alignItems:"center"}}>
            <span style={{fontSize:22}}>🌸</span>
            <div>
              <p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>Spring in Morocco — perfect timing!</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>April is ideal for Atlas treks and Sahara trips. Desert dawns at 15°C. Book soon — high season prices in 2 weeks.</p>
            </div>
          </div>

          {/* Category pills */}
          <div style={{display:"flex",gap:7,overflowX:"auto",scrollbarWidth:"none",marginBottom:16,paddingBottom:2}}>
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>{setFCat(c.id);setTab("search");}} style={{flexShrink:0,display:"flex",alignItems:"center",gap:5,padding:"7px 13px",borderRadius:11,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",fontSize:11,fontWeight:500,color:"var(--color-text-primary)",cursor:"pointer"}}>
                <span style={{fontSize:14}}>{c.icon}</span>{c.label}
              </button>
            ))}
          </div>

          {/* Wishlist banner */}
          {wItems.length>0&&<button onClick={()=>setSub("wishlist")} style={{width:"100%",display:"flex",alignItems:"center",gap:9,background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:11,padding:"10px 13px",cursor:"pointer",marginBottom:14,textAlign:"left"}}>
            <span style={{fontSize:20}}>❤️</span>
            <div style={{flex:1}}><p style={{margin:0,fontSize:12,fontWeight:700,color:"#B91C1C"}}>{wItems.length} saved to your wishlist</p><p style={{margin:0,fontSize:10,color:"#E53935"}}>Total value: ${wItems.reduce((s,i)=>s+i.price,0)}</p></div>
            <span style={{color:"#E53935",fontSize:14}}>›</span>
          </button>}

          {/* AI chat CTA */}
          <button onClick={()=>startChat("ai")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"var(--color-background-primary)",border:`1.5px solid ${C.green}`,borderRadius:12,padding:"12px 13px",cursor:"pointer",marginBottom:16,textAlign:"left"}}>
            <div style={{width:36,height:36,borderRadius:9,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Logo s={24}/></div>
            <div style={{flex:1}}><p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>Ask Wayvo AI anything</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>Instant · Your language · 24/7 · Fair price guide</p></div>
            <span style={{color:C.green,fontSize:16}}>›</span>
          </button>

          {/* Hot deals */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8}}>🔥 Hot deals — limited spots</p>
            <button onClick={()=>setTab("search")} style={{fontSize:11,color:C.green,fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>See all</button>
          </div>
          {ITEMS.filter(i=>i.hot||i.orig).slice(0,3).map(it=><Card key={it.id} item={it} wished={wished.has(it.id)} onWish={()=>toggleWish(it.id)} onOpen={startBook}/>)}

          {/* Featured section */}
          <p style={{fontSize:12,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8,margin:"8px 0 10px"}}>✨ Featured experiences</p>
          {ITEMS.filter(i=>!i.hot&&!i.orig).slice(0,4).map(it=><Card key={it.id} item={it} wished={wished.has(it.id)} onWish={()=>toggleWish(it.id)} onOpen={startBook}/>)}

          {/* Specialist CTA */}
          <div style={{background:C.grad,borderRadius:14,padding:"16px 14px",marginTop:4,display:"flex",gap:12,alignItems:"center"}}>
            <span style={{fontSize:30}}>🤝</span>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 3px",fontSize:13,fontWeight:700,color:"#fff"}}>Need expert help?</p>
              <p style={{margin:"0 0 9px",fontSize:11,color:"rgba(255,255,255,.5)"}}>Real Moroccan travel specialists on demand</p>
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>setSub("agents")} style={{padding:"8px 13px",background:C.green,border:"none",borderRadius:8,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Chat now →</button>
                <button onClick={()=>showToast("WhatsApp opening...")} style={{padding:"8px 13px",background:"#25D366",border:"none",borderRadius:8,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // ── SEARCH ────────────────────────────────────────────
    if(tab==="search") return(
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{background:"var(--color-background-primary)",borderBottom:"0.5px solid var(--color-border-tertiary)",padding:"10px 13px",flexShrink:0}}>
          <div style={{marginBottom:9}}><SearchBar q={q} setQ={setQ} inPage/></div>
          <div style={{display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2,marginBottom:6}}>
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>setFCat(c.id)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:4,padding:"5px 11px",borderRadius:18,fontSize:11,fontWeight:fCat===c.id?700:400,border:fCat===c.id?`1.5px solid ${C.navy}`:"0.5px solid var(--color-border-secondary)",background:fCat===c.id?C.navy:"var(--color-background-primary)",color:fCat===c.id?"#fff":"var(--color-text-secondary)",cursor:"pointer"}}>
                <span style={{fontSize:13}}>{c.icon}</span>{c.label}
              </button>
            ))}
            <button onClick={()=>setShowFilt(!showFilt)} style={{flexShrink:0,padding:"5px 11px",borderRadius:18,fontSize:11,fontWeight:600,border:showFilt?`1.5px solid ${C.green}`:"0.5px solid var(--color-border-secondary)",background:showFilt?C.green+"15":"var(--color-background-primary)",color:showFilt?C.gd:"var(--color-text-secondary)",cursor:"pointer"}}>⚙️ Filters</button>
          </div>
          {showFilt&&(
            <div style={{borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:10}}>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <select value={fCity} onChange={e=>setFCity(e.target.value)} style={{flex:1,padding:"7px 9px",borderRadius:7,border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontSize:11,color:"var(--color-text-primary)",outline:"none"}}>
                  {["All cities",...CITIES].map(c=><option key={c}>{c}</option>)}
                </select>
                <select value={fSort} onChange={e=>setFSort(e.target.value)} style={{flex:1,padding:"7px 9px",borderRadius:7,border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontSize:11,color:"var(--color-text-primary)",outline:"none"}}>
                  {["Recommended","Highest rated","Most popular","Price: low to high","Price: high to low"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:"var(--color-text-secondary)"}}>Max price / person</span><span style={{fontSize:10,fontWeight:700,color:C.navy}}>${fPrice}</span></div>
              <input type="range" min={30} max={600} step={10} value={fPrice} onChange={e=>setFPrice(+e.target.value)} style={{width:"100%"}}/>
            </div>
          )}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 13px 80px"}}>
          {!q&&(<div style={{marginBottom:14}}>
            <p style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔥 Trending in Morocco</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{TRENDING.map(t=><button key={t} onClick={()=>setQ(t)} style={{padding:"6px 11px",borderRadius:18,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-secondary)",fontSize:11,color:"var(--color-text-primary)",cursor:"pointer"}}>🔍 {t}</button>)}</div>
          </div>)}
          {q&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>{filtered.length} results for "<span style={{color:C.green}}>{q}</span>"</p>
            <button onClick={()=>{setQ("");setFCat("all");setFCity("All cities");setFPrice(600);}} style={{fontSize:10,color:C.red,fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>Clear</button>
          </div>}
          {!q&&<p style={{margin:"0 0 10px",fontSize:12,color:"var(--color-text-secondary)"}}>{filtered.length} experiences available</p>}
          {filtered.length===0?<div style={{textAlign:"center",padding:"36px 20px"}}><p style={{fontSize:36,margin:"0 0 9px"}}>🔍</p><p style={{fontSize:14,fontWeight:700,color:"var(--color-text-primary)",margin:"0 0 5px"}}>No results</p><p style={{fontSize:11,color:"var(--color-text-secondary)",margin:"0 0 14px"}}>Try adjusting your filters</p><button onClick={()=>{setQ("");setFCat("all");setFCity("All cities");setFPrice(600);}} style={{padding:"9px 18px",borderRadius:9,background:C.green,border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Reset all</button></div>
          :filtered.map(it=><Card key={it.id} item={it} wished={wished.has(it.id)} onWish={()=>toggleWish(it.id)} onOpen={startBook} compact/>)}
        </div>
      </div>
    );

    // ── PLAN (Itinerary Builder) ─────────────────────────────
    if(tab==="plan") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"16px 14px 22px"}}>
          <p style={{margin:"0 0 3px",fontSize:18,fontWeight:800,color:"#fff",letterSpacing:-.5}}>🗺️ Itinerary Builder</p>
          <p style={{margin:"0 0 14px",fontSize:10,color:"rgba(255,255,255,.4)"}}>AI-powered · Personalised for you · Instantly bookable</p>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 5px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>City</p>
              <select value={itiCity} onChange={e=>setItiCity(e.target.value)} style={{width:"100%",padding:"9px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",fontSize:12,color:"#fff",outline:"none",fontFamily:"var(--font-sans)"}}>
                {CITIES.map(c=><option key={c} style={{color:C.navy}}>{c}</option>)}
              </select>
            </div>
            <div style={{flex:1}}>
              <p style={{margin:"0 0 5px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1}}>Duration</p>
              <select value={itiDays} onChange={e=>setItiDays(+e.target.value)} style={{width:"100%",padding:"9px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.1)",fontSize:12,color:"#fff",outline:"none",fontFamily:"var(--font-sans)"}}>
                {[2,3,4,5,7,10,14].map(d=><option key={d} value={d} style={{color:C.navy}}>{d} days</option>)}
              </select>
            </div>
          </div>
          {user.interests.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
            {user.interests.slice(0,5).map(id=>{const it=INTERESTS.find(x=>x.id===id);return it?<span key={id} style={{fontSize:10,padding:"3px 8px",borderRadius:100,background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.7)"}}>{it.icon} {it.label}</span>:null;})}
          </div>}
          <button onClick={buildItinerary} disabled={genBusy} style={{width:"100%",padding:"13px",background:genBusy?"rgba(255,255,255,.2)":C.green,border:"none",borderRadius:11,color:"#fff",fontSize:13,fontWeight:700,cursor:genBusy?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            {genBusy?<><span style={{fontSize:14,animation:"tp .9s infinite"}}>⚡</span>Building your itinerary...</>:"✨ Build my itinerary"}
          </button>
        </div>
        <div style={{padding:"13px"}}>
          {!itiBuilt&&!genBusy&&<div style={{textAlign:"center",padding:"28px 20px",background:"var(--color-background-primary)",borderRadius:14,border:"0.5px solid var(--color-border-tertiary)"}}>
            <p style={{fontSize:32,margin:"0 0 9px"}}>✈️</p>
            <p style={{fontSize:14,fontWeight:700,color:"var(--color-text-primary)",margin:"0 0 6px"}}>Build your Morocco itinerary</p>
            <p style={{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>Select your city and duration above, then let Wayvo AI build a personalised day-by-day plan based on your travel style.</p>
            <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap",marginTop:10}}>
              {["🏜️ Sahara adventure","🕌 Imperial cities","🌊 Coastal escape","🧗 Mountain trek"].map(t=><span key={t} style={{fontSize:10,padding:"4px 9px",borderRadius:100,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)"}}>{t}</span>)}
            </div>
          </div>}
          {genBusy&&<div style={{textAlign:"center",padding:"28px",background:"var(--color-background-primary)",borderRadius:14,border:"0.5px solid var(--color-border-tertiary)"}}>
            <p style={{fontSize:30,margin:"0 0 10px"}}>🤖</p>
            <p style={{fontSize:13,fontWeight:700,color:"var(--color-text-primary)",margin:"0 0 6px"}}>Wayvo AI is planning your trip…</p>
            <p style={{fontSize:11,color:"var(--color-text-secondary)"}}>Building a {itiDays}-day itinerary for {itiCity}…</p>
          </div>}
          {itiBuilt&&itiText&&<>
            <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:14,padding:"16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
                <div><p style={{margin:0,fontSize:14,fontWeight:800,color:"var(--color-text-primary)"}}>Your {itiDays}-day {itiCity} itinerary</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>✨ AI-personalised · Based on your interests</p></div>
                <Pill text="+10 pts earned!" color={C.gold}/>
              </div>
              <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"12px"}}>
                {itiText.split("\n").filter(l=>l.trim()).map((line,i)=>(
                  <p key={i} style={{margin:"0 0 7px",fontSize:12,color:line.toLowerCase().startsWith("day")?"var(--color-text-primary)":"var(--color-text-secondary)",fontWeight:line.toLowerCase().startsWith("day")?700:400,lineHeight:1.6,borderTop:line.toLowerCase().startsWith("day")&&i>0?"0.5px solid var(--color-border-tertiary)":"none",paddingTop:line.toLowerCase().startsWith("day")&&i>0?"7px":"0"}}>{line}</p>
                ))}
              </div>
              <div style={{display:"flex",gap:7,marginTop:11}}>
                <button onClick={()=>setSub("agents")} style={{flex:1,padding:"10px",background:C.green,border:"none",borderRadius:9,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Book with specialist →</button>
                <button onClick={()=>startChat("ai")} style={{flex:1,padding:"10px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:9,color:"var(--color-text-secondary)",fontSize:11,cursor:"pointer"}}>Customise with AI</button>
              </div>
            </div>
            {itiItems.length>0&&<>
              <p style={{fontSize:11,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:.8,marginBottom:9}}>📅 Bookable experiences in {itiCity}</p>
              {itiItems.map(it=><Card key={it.id} item={it} wished={wished.has(it.id)} onWish={()=>toggleWish(it.id)} onOpen={startBook} compact/>)}
            </>}
            <button onClick={()=>setSub("packages")} style={{width:"100%",padding:"11px",background:"var(--color-background-primary)",border:`1px solid ${C.green}`,borderRadius:10,color:C.green,fontSize:12,fontWeight:700,cursor:"pointer",marginTop:4}}>View all-inclusive packages →</button>
          </>}
        </div>
      </div>
    );

    // ── SUPPORT ───────────────────────────────────────────
    if(tab==="support") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"16px 14px 20px"}}><p style={{margin:0,fontSize:18,fontWeight:800,color:"#fff",letterSpacing:-.5}}>Support</p><p style={{margin:"3px 0 0",fontSize:10,color:"rgba(255,255,255,.4)"}}>AI · Human specialists · WhatsApp · Emergency</p></div>
        <div style={{padding:"13px"}}>
          {/* AI */}
          <button onClick={()=>startChat("ai")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"var(--color-background-primary)",border:`2px solid ${C.green}`,borderRadius:13,padding:"14px",marginBottom:10,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:12,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Logo s={28}/></div>
            <div style={{flex:1,textAlign:"left"}}>
              <p style={{margin:"0 0 1px",fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>Wayvo AI</p>
              <p style={{margin:"0 0 4px",fontSize:11,color:"var(--color-text-secondary)"}}>Instant · Your language · 24/7 · Fair price guide</p>
              <Pill text="● Always online" color={C.green} small/>
            </div>
            <span style={{color:C.green,fontSize:20}}>›</span>
          </button>
          {/* Human */}
          <button onClick={()=>setSub("agents")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:13,padding:"13px",marginBottom:10,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:12,background:"#7C3AED",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👤</div>
            <div style={{flex:1,textAlign:"left"}}>
              <p style={{margin:"0 0 1px",fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>Human Specialists</p>
              <p style={{margin:"0 0 4px",fontSize:11,color:"var(--color-text-secondary)"}}>Real experts · Chat · WhatsApp · Video call</p>
              <Pill text="● 3 online now" color="#22C55E" small/>
            </div>
            <span style={{color:"var(--color-text-tertiary)",fontSize:20}}>›</span>
          </button>
          {/* WhatsApp */}
          <button onClick={()=>showToast("Opening WhatsApp...")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:13,padding:"13px",marginBottom:10,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:12,background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>💬</div>
            <div style={{flex:1,textAlign:"left"}}>
              <p style={{margin:"0 0 1px",fontSize:13,fontWeight:700,color:"#166534"}}>WhatsApp Support</p>
              <p style={{margin:"0 0 4px",fontSize:11,color:"#16A34A"}}>Direct line to our specialists via WhatsApp</p>
              <Pill text="Typical reply: 5 minutes" color="#16A34A" bg="#DCFCE7" small/>
            </div>
            <span style={{color:"#16A34A",fontSize:20}}>›</span>
          </button>
          {/* Emergency */}
          <button onClick={()=>setSub("emergency")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:13,padding:"13px",marginBottom:16,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:12,background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🆘</div>
            <div style={{flex:1,textAlign:"left"}}>
              <p style={{margin:"0 0 1px",fontSize:13,fontWeight:700,color:"#B91C1C"}}>Emergency Help</p>
              <p style={{margin:"0 0 4px",fontSize:11,color:"#E53935"}}>Guided steps · Embassy contacts · Works offline</p>
              <Pill text="Police 190 · Ambulance 150" color="#B91C1C" bg="#FEE2E2" small/>
            </div>
            <span style={{color:C.red,fontSize:20}}>›</span>
          </button>
          {/* Price guide */}
          <div style={{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"13px",marginBottom:12}}>
            <p style={{margin:"0 0 10px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>💰 Fair price guide — Marrakech</p>
            {[["Petit taxi — medina to Gueliz","20–30 MAD"],["Grand taxi — Marrakech to Ourika","50–70 MAD"],["Airport taxi to medina","80–100 MAD"],["Lunch in a local restaurant","40–80 MAD/person"],["Street food snack","10–25 MAD"],["Hammam entry (local)","10–20 MAD"],["Hammam (tourist, with massage)","150–350 MAD"],["Water (0.5L bottle)","3–5 MAD"]].map(([item,price])=>(
              <div key={item} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
                <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{item}</span>
                <span style={{fontSize:11,fontWeight:700,color:C.green}}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize:10,fontWeight:700,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Common questions</p>
          {["Is Morocco safe for solo travellers?","What currency should I bring?","Do I need a visa for Morocco?","Best time to visit Morocco?","How to get around Morocco cheaply?"].map(q2=>(
            <button key={q2} onClick={()=>startChat("ai")} style={{width:"100%",textAlign:"left",padding:"10px 13px",background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:9,marginBottom:5,fontSize:12,color:"var(--color-text-primary)",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {q2}<span style={{color:C.green,flexShrink:0,marginLeft:7}}>›</span>
            </button>
          ))}
        </div>
      </div>
    );

    // ── PROFILE ───────────────────────────────────────────
    if(tab==="profile") return(
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        <div style={{background:C.grad,padding:"22px 14px 26px",textAlign:"center"}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:C.green,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,color:"#fff"}}>{user.name?user.name[0].toUpperCase():"W"}</div>
          <p style={{margin:0,fontSize:17,fontWeight:800,color:"#fff"}}>{user.name||"Wayvo Traveller"}</p>
          <p style={{margin:"3px 0 7px",fontSize:11,color:"rgba(255,255,255,.4)"}}>{user.nat||"Set your nationality"} · {user.city}</p>
          {user.points>0&&<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(245,163,35,.2)",border:"1px solid rgba(245,163,35,.3)",borderRadius:100,padding:"5px 13px",marginBottom:7}}>
            <span style={{fontSize:13}}>🌟</span><span style={{fontSize:12,color:C.gold,fontWeight:700}}>{user.points} Wayvo Points</span>
          </div>}
          <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}>{user.interests.map(id=>{const it=INTERESTS.find(x=>x.id===id);return it?<span key={id} style={{fontSize:10,padding:"3px 9px",borderRadius:100,background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)"}}>{it.icon} {it.label}</span>:null;})}</div>
        </div>
        <div style={{padding:"13px"}}>
          {/* Morocco Passport */}
          <div style={{background:"linear-gradient(135deg,#854F0B18,#F5A62322)",border:"1px solid #F5A62330",borderRadius:12,padding:"13px",marginBottom:12}}>
            <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"var(--color-text-primary)"}}>🛂 Morocco Passport</p>
            <p style={{margin:"0 0 9px",fontSize:11,color:"var(--color-text-secondary)"}}>Collect a digital stamp for every city you visit through Wayvo. Share on Instagram.</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{CITIES.slice(0,6).map((c,i)=><span key={c} style={{fontSize:10,padding:"4px 9px",borderRadius:8,background:i===0?C.gold+"20":"var(--color-background-secondary)",color:i===0?C.gold:"var(--color-text-tertiary)",border:i===0?`1px solid ${C.gold}30`:"0.5px solid var(--color-border-tertiary)",fontWeight:i===0?700:400}}>{i===0?"✅ ":""}{c}</span>)}</div>
          </div>
          {/* Wishlist shortcut */}
          <button onClick={()=>setSub("wishlist")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:12,padding:"12px 13px",cursor:"pointer",marginBottom:10,textAlign:"left"}}>
            <span style={{fontSize:22}}>❤️</span>
            <div style={{flex:1}}><p style={{margin:0,fontSize:12,fontWeight:700,color:"#B91C1C"}}>My Wishlist{wItems.length>0?` (${wItems.length})`:""}</p><p style={{margin:0,fontSize:10,color:"#E53935"}}>{wItems.length>0?`${wItems.length} saved · $${wItems.reduce((s,i)=>s+i.price,0)} total value`:"Tap ❤️ on any card to save"}</p></div>
            <span style={{color:C.red,fontSize:14}}>›</span>
          </button>
          <button onClick={()=>setPhase("onboard")} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:"var(--color-background-primary)",border:`1px solid ${C.green}`,borderRadius:12,padding:"12px 13px",cursor:"pointer",marginBottom:10,textAlign:"left"}}>
            <span style={{fontSize:20}}>✏️</span><span style={{fontSize:12,fontWeight:600,color:C.gd,flex:1}}>Update my travel preferences</span><span style={{color:C.green,fontSize:14}}>›</span>
          </button>
          {[{icon:"🌍",t:"My Trips",d:"0 upcoming · 0 completed"},{icon:"⭐",t:"My Reviews",d:"Rate your experiences"},{icon:"💳",t:"Payment Methods",d:"Add card for instant booking"},{icon:"🛡️",t:"Travel Insurance",d:"Covered from $3/day"},{icon:"🔔",t:"Notifications",d:"Deals, price drops, trip reminders"}].map(item=>(
            <div key={item.t} style={{display:"flex",alignItems:"center",gap:12,padding:"12px",background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:11,marginBottom:7,cursor:"pointer"}} onClick={()=>showToast("Coming soon!")}>
              <span style={{fontSize:20,width:32,textAlign:"center"}}>{item.icon}</span>
              <div style={{flex:1}}><p style={{margin:0,fontSize:12,fontWeight:500,color:"var(--color-text-primary)"}}>{item.t}</p><p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{item.d}</p></div>
              <span style={{color:"var(--color-text-tertiary)",fontSize:14}}>›</span>
            </div>
          ))}
          {/* Partner portal */}
          <button onClick={()=>{setAppMode("partner");setPName("");setPType(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:11,background:C.grad,border:"none",borderRadius:12,padding:"13px",cursor:"pointer",marginTop:4,textAlign:"left"}}>
            <div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏢</div>
            <div style={{flex:1}}><p style={{margin:0,fontSize:12,fontWeight:700,color:"#fff"}}>Partner Portal</p><p style={{margin:0,fontSize:10,color:"rgba(255,255,255,.5)"}}>Hotels · Guides · Tours · Transport</p></div>
            <span style={{color:C.green,fontSize:14}}>›</span>
          </button>
          {/* Global expansion */}
          <div style={{background:C.grad,borderRadius:12,padding:"13px",marginTop:10,textAlign:"center"}}>
            <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"#fff"}}>🌍 Wayvo is going global</p>
            <p style={{margin:"0 0 8px",fontSize:10,color:"rgba(255,255,255,.4)"}}>Morocco first · North Africa next · The world by 2030</p>
            <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}>
              {["🇲🇦 Active","🌍 Africa 2027","🌎 World 2028+"].map(t=><span key={t} style={{fontSize:10,padding:"3px 9px",borderRadius:100,background:C.green+"28",color:C.green,fontWeight:600}}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    );
    return null;
  };

  return (
    <div style={{minHeight:"100vh",background:"var(--color-background-tertiary)",fontFamily:"var(--font-sans)",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0,overflow:"hidden"}}>
        {renderTab()}
      </div>
      <div style={{background:"var(--color-background-primary)",borderTop:"0.5px solid var(--color-border-tertiary)",display:"flex",padding:"5px 0 9px",flexShrink:0,position:"sticky",bottom:0,zIndex:20}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setSub(null);setSelItem(null);}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",padding:"5px 0"}}>
            <span style={{fontSize:18}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:tab===t.id?700:400,color:tab===t.id?C.green:"var(--color-text-tertiary)"}}>{t.label}</span>
            {tab===t.id&&<div style={{width:14,height:2.5,borderRadius:2,background:C.green}}/>}
          </button>
        ))}
      </div>
      <Toast msg={toast}/>
    </div>
  );
}
