import { useState } from "react";
import { useNavigate } from "react-router-dom";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Epilogue:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#FAF8F4;--surface:#FFFFFF;--surface2:#F4F1EC;--surface3:#EDE9E2;
  --border:#E2DDD6;--border2:#CCC8C0;
  --amber:#C47D10;--amber-dim:#F5EDE8;--amber-glow:rgba(196,125,16,0.1);
  --green:#2A6B4A;--green-dim:#EAF5EF;--green-glow:rgba(42,107,74,0.1);
  --red:#A03030;--red-dim:#FFF0F0;--red-glow:rgba(160,48,48,0.08);
  --blue:#2A5FA0;--blue-dim:#EBF2FF;--blue-glow:rgba(42,95,160,0.08);
  --text:#1C2320;--text-muted:#5A6660;--text-dim:#8A9490;
  --white:#FFFFFF;
}
body{font-family:'Epilogue',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
.app{display:flex;height:100vh;overflow:hidden;}

/* SIDEBAR */
.sidebar{width:220px;min-width:220px;background:#1C2320;border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;padding:0;overflow-y:auto;}
.sidebar-logo{padding:24px 20px 20px;border-bottom:1px solid rgba(255,255,255,0.07);}
.logo-text{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:-0.5px;}
.logo-sub{font-size:10px;color:#7C9E8B;letter-spacing:2px;text-transform:uppercase;margin-top:2px;font-weight:500;}
.sidebar-section{padding:20px 12px 8px;}
.section-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#4A5450;font-weight:600;padding:0 8px;margin-bottom:6px;}
.nav-btn{display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border-radius:7px;border:none;background:none;color:#8A9490;font-size:13px;font-family:'Epilogue',sans-serif;cursor:pointer;transition:all 0.15s;text-align:left;}
.nav-btn:hover{background:rgba(255,255,255,0.06);color:#FFFFFF;}
.nav-btn.active{background:rgba(196,125,16,0.15);color:#C47D10;border:1px solid rgba(196,125,16,0.3);}
.nav-icon{width:18px;text-align:center;font-size:14px;}
.nav-badge{margin-left:auto;background:#A03030;color:white;font-size:10px;font-weight:600;padding:1px 6px;border-radius:10px;}

.sidebar-portfolio{margin:auto 12px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;}
.port-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#4A5450;margin-bottom:10px;}
.port-stat{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.port-stat:last-child{margin-bottom:0;}
.port-name{font-size:12px;color:#8A9490;}
.port-val{font-family:'Syne',sans-serif;font-size:13px;font-weight:600;color:#FFFFFF;}
.port-val.green{color:#7C9E8B;}

/* MAIN */
.main{flex:1;overflow-y:auto;display:flex;flex-direction:column;}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
.topbar-left{display:flex;align-items:center;gap:14px;}
.topbar-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:600;color:var(--text);}
.topbar-sub{font-size:12px;color:var(--text-muted);}
.topbar-right{display:flex;align-items:center;gap:12px;}
.avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#C47D10,#8A5800);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:white;}
.content{padding:24px 28px;flex:1;}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 22px;}
.card-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--text);margin-bottom:3px;}
.card-sub{font-size:12px;color:var(--text-muted);margin-bottom:16px;}

/* GRIDS */
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
.grid-21{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:20px;}

/* STAT CARDS */
.stat{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px 20px;}
.stat-label{font-size:11px;color:var(--text-muted);margin-bottom:8px;letter-spacing:0.3px;}
.stat-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:var(--text);line-height:1;}
.stat-detail{font-size:11px;color:var(--text-muted);margin-top:5px;}
.stat-up{color:var(--green);}
.stat-down{color:var(--red);}
.stat-amber{color:var(--amber);}

/* BADGES */
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:500;}
.badge-green{background:var(--green-dim);color:var(--green);}
.badge-red{background:var(--red-dim);color:var(--red);}
.badge-amber{background:var(--amber-dim);color:var(--amber);}
.badge-blue{background:var(--blue-dim);color:var(--blue);}
.badge-gray{background:var(--surface3);color:var(--text-muted);}

/* TABLES */
.table{width:100%;border-collapse:collapse;}
.table th{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-dim);padding:10px 14px;text-align:left;border-bottom:1px solid var(--border);font-weight:600;}
.table td{padding:13px 14px;font-size:13px;color:var(--text);border-bottom:1px solid var(--border);}
.table tr:last-child td{border-bottom:none;}
.table tr:hover td{background:var(--surface2);}
.table td.muted{color:var(--text-muted);}
.table td.green{color:var(--green);font-weight:500;}
.table td.red{color:var(--red);}
.table td.amber{color:var(--amber);}

/* ALERT */
.alert{border-radius:10px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:flex-start;gap:12px;font-size:13px;}
.alert-amber{background:var(--amber-glow);border:1px solid rgba(196,125,16,0.25);}
.alert-green{background:var(--green-glow);border:1px solid rgba(42,107,74,0.25);}
.alert-red{background:var(--red-glow);border:1px solid rgba(160,48,48,0.2);}
.alert-blue{background:var(--blue-glow);border:1px solid rgba(42,95,160,0.2);}
.alert-icon{font-size:16px;margin-top:1px;}
.alert-title{font-weight:600;color:var(--text);margin-bottom:2px;font-size:13px;font-family:'Syne',sans-serif;}
.alert-text{color:var(--text-muted);font-size:12px;line-height:1.5;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all 0.15s;font-family:'Epilogue',sans-serif;}
.btn-amber{background:var(--amber);color:white;font-weight:600;}
.btn-amber:hover{opacity:0.9;}
.btn-outline{background:transparent;color:var(--text-muted);border:1px solid var(--border);}
.btn-outline:hover{border-color:var(--border2);color:var(--text);}
.btn-ghost{background:var(--surface2);color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber);}
.btn-red{background:var(--red-dim);color:var(--red);border:1px solid rgba(160,48,48,0.2);}

/* SECTION HEADER */
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.sec-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:600;color:var(--text);}
.sec-sub{font-size:12px;color:var(--text-muted);margin-top:2px;}

/* PROGRESS */
.progress{height:5px;background:var(--surface3);border-radius:4px;overflow:hidden;}
.progress-fill{height:100%;border-radius:4px;background:var(--amber);}
.progress-fill.green{background:var(--green);}

/* PIPELINE */
.pipeline{display:flex;gap:12px;margin-bottom:20px;}
.pipeline-col{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;}
.pipeline-header{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--text-dim);margin-bottom:12px;font-weight:600;}
.pipeline-count{font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:var(--text);margin-bottom:4px;}
.pipeline-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:8px;cursor:pointer;transition:border-color 0.15s;}
.pipeline-card:hover{border-color:var(--amber);}
.pipeline-name{font-size:13px;font-weight:500;color:var(--text);}
.pipeline-detail{font-size:11px;color:var(--text-muted);margin-top:2px;}

/* UNIT CARD */
.unit-card{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:16px;transition:all 0.15s;cursor:pointer;}
.unit-card:hover{border-color:var(--amber);background:var(--surface3);}
.unit-address{font-size:14px;font-weight:500;color:var(--text);margin-bottom:3px;}
.unit-sub{font-size:12px;color:var(--text-muted);margin-bottom:12px;}
.unit-meta{display:flex;gap:8px;flex-wrap:wrap;}

/* VENDOR */
.vendor-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);}
.vendor-item:last-child{border-bottom:none;}
.vendor-icon{width:36px;height:36px;border-radius:8px;background:var(--surface3);display:flex;align-items:center;justify-content:center;font-size:16px;}
.vendor-name{font-size:13px;font-weight:500;color:var(--text);}
.vendor-trade{font-size:11px;color:var(--text-muted);}
.vendor-contact{margin-left:auto;font-size:12px;color:var(--blue);}

/* FORM */
.form-group{margin-bottom:14px;}
.form-label{font-size:12px;font-weight:500;color:var(--text-muted);margin-bottom:6px;display:block;}
.form-input,.form-select,.form-textarea{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:9px 12px;font-size:13px;font-family:'Epilogue',sans-serif;color:var(--text);outline:none;transition:border 0.15s;}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--amber);}
.form-textarea{resize:vertical;min-height:80px;}
.form-select option{background:var(--surface2);}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(28,35,32,0.5);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:26px;width:100%;max-width:500px;max-height:85vh;overflow-y:auto;}
.modal-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:600;color:var(--text);margin-bottom:4px;}
.modal-sub{font-size:12px;color:var(--text-muted);margin-bottom:20px;}
.modal-footer{display:flex;gap:10px;justify-content:flex-end;margin-top:18px;}

/* TABS */
.tabs{display:flex;gap:3px;background:var(--surface2);border-radius:8px;padding:3px;margin-bottom:20px;}
.tab{flex:1;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.15s;border:none;background:transparent;color:var(--text-muted);font-family:'Epilogue',sans-serif;}
.tab.active{background:var(--surface);color:var(--amber);border:1px solid rgba(196,125,16,0.3);box-shadow:0 1px 4px rgba(0,0,0,0.06);}

/* LEASE TIMELINE */
.lease-bar{position:relative;height:8px;background:var(--surface3);border-radius:4px;margin:8px 0;}
.lease-fill{position:absolute;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--green),var(--amber));}

/* MESSAGE */
.msg-thread{display:flex;flex-direction:column;gap:12px;max-height:320px;overflow-y:auto;padding:4px 0 12px;}
.msg{padding:10px 14px;border-radius:10px;max-width:85%;font-size:13px;line-height:1.5;}
.msg-landlord{background:rgba(196,125,16,0.08);border:1px solid rgba(196,125,16,0.2);color:var(--text);align-self:flex-end;}
.msg-tenant{background:var(--surface2);border:1px solid var(--border);color:var(--text);align-self:flex-start;}
.msg-meta{font-size:10px;color:var(--text-dim);margin-top:4px;}

/* CHECKLIST */
.checklist-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;}
.checklist-item:last-child{border-bottom:none;}
.check-box{width:18px;height:18px;border-radius:4px;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;transition:all 0.15s;}
.check-box.done{background:var(--green-dim);border-color:var(--green);color:var(--green);}
.check-label{font-size:13px;color:var(--text);}
.check-label.done{text-decoration:line-through;color:var(--text-muted);}

@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.fade-in{animation:fadeIn 0.2s ease both;}
`;

// ── DATA ──
const PROPERTIES = [
  { id:1, address:"412 Birchwood Ave", unit:"Unit 3B", tenant:"Maya Chen", rent:1450, status:"paid", leaseEnd:"Jul 31, 2025", leaseProgress:75, deposit:1450, daysVacant:null },
  { id:2, address:"412 Birchwood Ave", unit:"Unit 2A", tenant:"Carlos Rivera", rent:1300, status:"late", leaseEnd:"Sep 30, 2025", leaseProgress:40, deposit:1300, daysVacant:null },
  { id:3, address:"412 Birchwood Ave", unit:"Unit 1B", tenant:"Sarah Okonkwo", rent:1200, status:"paid", leaseEnd:"Dec 31, 2025", leaseProgress:20, deposit:1200, daysVacant:null },
  { id:4, address:"88 Elmwood Court", unit:"Unit A", tenant:null, rent:1600, status:"vacant", leaseEnd:null, leaseProgress:0, deposit:0, daysVacant:14 },
];

const MAINTENANCE = [
  { id:1, unit:"Unit 3B", tenant:"Maya Chen", issue:"Bathroom faucet leaking", priority:"Medium", status:"in-progress", submitted:"Mar 28", vendor:"Mike's Plumbing", cost:null },
  { id:2, unit:"Unit 3B", tenant:"Maya Chen", issue:"Heating unit noise", priority:"High", status:"open", submitted:"Apr 4", vendor:null, cost:null },
  { id:3, unit:"Unit 2A", tenant:"Carlos Rivera", issue:"Broken door hinge", priority:"Low", status:"open", submitted:"Apr 2", vendor:null, cost:null },
  { id:4, unit:"Unit 1B", tenant:"Sarah Okonkwo", issue:"Leaking window seal", priority:"Medium", status:"resolved", submitted:"Mar 10", vendor:"City Glass Co.", cost:320 },
];

const APPLICANTS = [
  { name:"Jordan Lee", income:"$5,200/mo", score:731, status:"screening", applied:"Apr 3", unit:"Unit A" },
  { name:"Priya Nair", income:"$6,100/mo", score:768, status:"approved", applied:"Mar 30", unit:"Unit A" },
  { name:"Tom Bashford", income:"$4,400/mo", score:690, status:"applied", applied:"Apr 5", unit:"Unit A" },
  { name:"Aisha Wallace", income:"$5,800/mo", score:null, status:"applied", applied:"Apr 6", unit:"Unit A" },
];

const EXPENSES = [
  { date:"Apr 1", property:"412 Birchwood", category:"Repair", desc:"Faucet parts", amount:85, receipt:true },
  { date:"Mar 19", property:"412 Birchwood", category:"Insurance", desc:"Q2 landlord insurance", amount:420, receipt:true },
  { date:"Mar 10", property:"88 Elmwood", category:"Repair", desc:"Window seal replacement", amount:320, receipt:true },
  { date:"Feb 28", property:"412 Birchwood", category:"Tax", desc:"Property tax installment", amount:1240, receipt:false },
  { date:"Feb 15", property:"88 Elmwood", category:"Maintenance", desc:"HVAC service", amount:195, receipt:true },
];

const VENDORS = [
  { icon:"🔧", name:"Mike's Plumbing", trade:"Plumber", phone:"503-441-2210", rating:"4.9" },
  { icon:"⚡", name:"Bright Electric", trade:"Electrician", phone:"503-882-9910", rating:"4.7" },
  { icon:"🪟", name:"City Glass Co.", trade:"Windows & Glass", phone:"503-220-1144", rating:"4.8" },
  { icon:"🏠", name:"Pacific Roofing", trade:"Roofing", phone:"503-554-0033", rating:"4.6" },
];

const MESSAGES = {
  "Maya Chen": [
    { from:"tenant", text:"Hi James, just checking on the faucet repair — any update?", time:"Apr 4, 9:12am" },
    { from:"landlord", text:"Hey Maya, plumber is scheduled for Apr 8 between 10am–12pm. They'll knock first.", time:"Apr 4, 11:30am" },
    { from:"tenant", text:"Perfect, I'll make sure to be home. Thanks!", time:"Apr 4, 11:45am" },
  ],
  "Carlos Rivera": [
    { from:"tenant", text:"The door hinge on unit 2A is completely broken, hard to close.", time:"Apr 2, 3:00pm" },
    { from:"landlord", text:"Thanks for flagging Carlos. I'll get someone out this week.", time:"Apr 3, 9:00am" },
  ],
  "Sarah Okonkwo": [
    { from:"landlord", text:"Hi Sarah, lease renewal is coming up in December. Would you like to discuss terms?", time:"Apr 1, 10:00am" },
    { from:"tenant", text:"Yes, I'd love to stay! Open to a conversation.", time:"Apr 1, 2:30pm" },
  ],
};

const MOVEOUT_CHECKLIST = [
  "Move-in inspection reviewed",
  "Final walkthrough scheduled",
  "Cleaning fee assessed",
  "Key return confirmed",
  "Forwarding address collected",
  "Deposit itemization prepared",
  "Deposit return deadline noted (31 days)",
];

const RIGHTS = [
  { title:"Right to Enter with Notice", body:"Oregon law (ORS 90.322) requires 24-hour advance notice before entering a tenant's unit for non-emergency reasons. Emergency entry is allowed without notice. Always log your entry notices in Documents." },
  { title:"Eviction Process (Oregon)", body:"Oregon requires specific just-cause reasons for eviction after 1 year of tenancy. You must serve written notice, wait the required period (termination type dependent), and file in court if the tenant doesn't comply. Self-help eviction is illegal." },
  { title:"Rent Increases", body:"Oregon limits rent increases to once per 12-month period with 90 days written notice. Rent control applies in many cities — Portland limits increases for buildings 15+ years old. Always verify local caps before issuing notice." },
  { title:"Security Deposit Rules", body:"Oregon requires returning deposits within 31 days of move-out with an itemized statement. You may deduct for unpaid rent and damages beyond normal wear. Wrongful withholding can result in 2× the deposit in damages." },
  { title:"Habitability Obligations", body:"You must maintain functioning heat, plumbing, weatherproofing, and structural safety. Emergency repairs must be addressed within 24 hours; non-emergency within 30 days of written notice. Failure can allow tenants to repair-and-deduct." },
];

export default function App() {
  const navigate = useNavigate();
  const [nav, setNav] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const [msgTenant, setMsgTenant] = useState("Maya Chen");
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [maintenanceList, setMaintenanceList] = useState(MAINTENANCE);
  const [newMaint, setNewMaint] = useState({ unit:"", issue:"", priority:"Medium" });
  const [checklist, setChecklist] = useState(MOVEOUT_CHECKLIST.map(l => ({ label:l, done:false })));
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [expTab, setExpTab] = useState("all");
  const [screenTab, setScreenTab] = useState("pipeline");
  const [portfolioTab, setPortfolioTab] = useState("units");

  const totalRent = PROPERTIES.filter(p=>p.tenant).reduce((s,p)=>s+p.rent,0);
  const collected = PROPERTIES.filter(p=>p.status==="paid").reduce((s,p)=>s+p.rent,0);
  const overdue = PROPERTIES.filter(p=>p.status==="late").reduce((s,p)=>s+p.rent,0);
  const totalExpenses = EXPENSES.reduce((s,e)=>s+e.amount,0);
  const openMaint = maintenanceList.filter(m=>m.status!=="resolved").length;

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    const updated = { ...messages };
    updated[msgTenant] = [...(updated[msgTenant]||[]), { from:"landlord", text:msgInput, time:"Now" }];
    setMessages(updated);
    setMsgInput("");
  };

  const navSections = [
    { label:"Overview", items:[
      { id:"dashboard", icon:"▦", label:"Dashboard" },
      { id:"portfolio", icon:"🏘", label:"Portfolio", },
    ]},
    { label:"Tenants", items:[
      { id:"rent", icon:"💳", label:"Rent Collection" },
      { id:"screening", icon:"🔍", label:"Tenant Screening", badge: APPLICANTS.filter(a=>a.status==="applied").length },
      { id:"messaging", icon:"💬", label:"Messages" },
      { id:"leases", icon:"📋", label:"Leases" },
    ]},
    { label:"Operations", items:[
      { id:"maintenance", icon:"🔧", label:"Maintenance", badge: maintenanceList.filter(m=>m.status==="open").length },
      { id:"expenses", icon:"📊", label:"Expenses & P&L" },
      { id:"documents", icon:"📁", label:"Documents" },
      { id:"vendors", icon:"👷", label:"Vendors" },
    ]},
    { label:"Legal & Resources", items:[
      { id:"rights", icon:"⚖️", label:"Landlord Rights" },
    ]},
  ];

  const pageTitle = {
    dashboard:"Dashboard", portfolio:"Portfolio", rent:"Rent Collection",
    screening:"Tenant Screening", messaging:"Messages", leases:"Leases",
    maintenance:"Maintenance", expenses:"Expenses & P&L", documents:"Documents",
    vendors:"Vendors", rights:"Landlord Rights & Resources",
  };

  return (
    <>
      <style>{S}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-text">Threshold</div>
            <div className="logo-sub">Landlord Portal</div>
          </div>

          {navSections.map(sec => (
            <div className="sidebar-section" key={sec.label}>
              <div className="section-label">{sec.label}</div>
              {sec.items.map(item => (
                <button key={item.id} className={`nav-btn ${nav===item.id?"active":""}`} onClick={()=>setNav(item.id)}>
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </button>
              ))}
            </div>
          ))}

          <div className="sidebar-portfolio">
            <div className="port-label">Portfolio</div>
            <div className="port-stat"><span className="port-name">Units</span><span className="port-val">4</span></div>
            <div className="port-stat"><span className="port-name">Occupancy</span><span className="port-val green">75%</span></div>
            <div className="port-stat"><span className="port-name">Monthly</span><span className="port-val">${totalRent.toLocaleString()}</span></div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div>
                <div className="topbar-title">{pageTitle[nav]}</div>
                <div className="topbar-sub">James Harrington · Portland, OR · 4 units</div>
              </div>
            </div>
            <div className="topbar-right">
              <button onClick={() => navigate('/')} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:7,padding:"6px 12px",fontSize:12,color:"var(--text-muted)",cursor:"pointer",fontFamily:"'Epilogue',sans-serif"}}>← Back</button>
              <button className="btn btn-amber" onClick={()=>setModal("addunit")}>+ Add Unit</button>
              <div className="avatar">JH</div>
            </div>
          </div>

          <div className="content">

            {/* ── DASHBOARD ── */}
            {nav==="dashboard" && <div className="fade-in">
              {overdue > 0 && <div className="alert alert-red"><span className="alert-icon">⚠️</span><div><div className="alert-title">Overdue rent — ${overdue.toLocaleString()}</div><div className="alert-text">Unit 2A · Carlos Rivera · 5 days overdue. Late fee applied automatically.</div></div></div>}
              <div className="alert alert-amber"><span className="alert-icon">📅</span><div><div className="alert-title">2 lease renewals due within 90 days</div><div className="alert-text">Unit 3B expires Jul 31 · Oregon requires 90-day notice for rent changes</div></div></div>

              <div className="grid-4">
                {[
                  { label:"Rent Collected", val:`$${collected.toLocaleString()}`, detail:`of $${totalRent.toLocaleString()} expected`, color:"green" },
                  { label:"Overdue", val:`$${overdue.toLocaleString()}`, detail:"1 unit · 5 days late", color:"red" },
                  { label:"Open Requests", val:openMaint, detail:"2 high priority", color:"amber" },
                  { label:"Vacancy Cost", val:"$752", detail:"14 days × $1,600/mo", color:"" },
                ].map((s,i)=>(
                  <div className="stat" key={i}>
                    <div className="stat-label">{s.label}</div>
                    <div className={`stat-val ${s.color ? `stat-${s.color}`:""}`}>{s.val}</div>
                    <div className="stat-detail">{s.detail}</div>
                  </div>
                ))}
              </div>

              <div className="grid-21">
                <div className="card">
                  <div className="card-title">Unit Status</div>
                  <div className="card-sub">All properties at a glance</div>
                  <table className="table">
                    <thead><tr><th>Unit</th><th>Tenant</th><th>Rent</th><th>Status</th><th>Lease Ends</th></tr></thead>
                    <tbody>
                      {PROPERTIES.map(p=>(
                        <tr key={p.id}>
                          <td>{p.unit}</td>
                          <td className="muted">{p.tenant || "—"}</td>
                          <td className="green">${p.rent.toLocaleString()}</td>
                          <td><span className={`badge ${p.status==="paid"?"badge-green":p.status==="late"?"badge-red":p.status==="vacant"?"badge-amber":"badge-gray"}`}>{p.status}</span></td>
                          <td className="muted">{p.leaseEnd || <span className="badge badge-red">Vacant 14d</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card">
                  <div className="card-title">Maintenance Queue</div>
                  <div className="card-sub">{openMaint} open items</div>
                  {maintenanceList.filter(m=>m.status!=="resolved").map(m=>(
                    <div key={m.id} style={{padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:13,color:"var(--text)",fontWeight:500}}>{m.issue}</span>
                        <span className={`badge ${m.priority==="High"?"badge-red":m.priority==="Medium"?"badge-amber":"badge-gray"}`}>{m.priority}</span>
                      </div>
                      <div style={{fontSize:11,color:"var(--text-muted)"}}>{m.unit} · {m.tenant} · {m.submitted}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid-3">
                <div className="card">
                  <div className="card-title">P&L This Month</div>
                  <div className="card-sub">April 2026</div>
                  {[["Rent Income","$3,950","green"],["Expenses",`-$${totalExpenses.toLocaleString()}`,"red"],["Net",`$${(3950-totalExpenses).toLocaleString()}`,"amber"]].map(([l,v,c])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
                      <span style={{fontSize:13,color:"var(--text-muted)"}}>{l}</span>
                      <span style={{fontSize:14,fontWeight:600,color:`var(--${c})`}}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">Applicant Pipeline</div>
                  <div className="card-sub">Unit A — 88 Elmwood Ct</div>
                  {[["Applied",2,"blue"],["Screening",1,"amber"],["Approved",1,"green"]].map(([l,n,c])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
                      <span style={{fontSize:13,color:"var(--text-muted)"}}>{l}</span>
                      <span className={`badge badge-${c}`}>{n}</span>
                    </div>
                  ))}
                  <button className="btn btn-ghost" style={{width:"100%",marginTop:12,justifyContent:"center"}} onClick={()=>setNav("screening")}>View pipeline →</button>
                </div>
                <div className="card">
                  <div className="card-title">Upcoming Deadlines</div>
                  <div className="card-sub">Next 60 days</div>
                  {[
                    { label:"Unit 3B lease renewal notice", date:"May 2", color:"red" },
                    { label:"Q2 insurance due", date:"May 15", color:"amber" },
                    { label:"Property tax installment", date:"May 31", color:"amber" },
                    { label:"Unit 2A deposit review", date:"Jun 10", color:"blue" },
                  ].map((d,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                      <span style={{fontSize:12,color:"var(--text)"}}>{d.label}</span>
                      <span style={{fontSize:11,color:`var(--${d.color})`,fontWeight:500}}>{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>}

            {/* ── PORTFOLIO ── */}
            {nav==="portfolio" && <div className="fade-in">
              <div className="tabs">
                {[["units","Units"],["roi","ROI & Cap Rate"],["insurance","Insurance"]].map(([v,l])=>(
                  <button key={v} className={`tab ${portfolioTab===v?"active":""}`} onClick={()=>setPortfolioTab(v)}>{l}</button>
                ))}
              </div>
              {portfolioTab==="units" && <>
                <div className="grid-2">
                  {PROPERTIES.map(p=>(
                    <div className="unit-card" key={p.id}>
                      <div className="unit-address">{p.address} — {p.unit}</div>
                      <div className="unit-sub">{p.tenant ? `Tenant: ${p.tenant}` : "⚠️ Vacant — 14 days"}</div>
                      <div style={{marginBottom:8}}>
                        <div className="lease-bar"><div className="lease-fill" style={{width:`${p.leaseProgress}%`}}/></div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--text-dim)",marginTop:3}}>
                          <span>{p.leaseEnd ? `Lease ends ${p.leaseEnd}`:""}</span>
                          <span>{p.leaseProgress ? `${p.leaseProgress}% through lease`:""}</span>
                        </div>
                      </div>
                      <div className="unit-meta">
                        <span className={`badge ${p.status==="paid"?"badge-green":p.status==="late"?"badge-red":p.status==="vacant"?"badge-amber":"badge-gray"}`}>{p.status}</span>
                        <span className="badge badge-gray">${p.rent}/mo</span>
                        {p.deposit>0 && <span className="badge badge-blue">Deposit ${p.deposit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </>}
              {portfolioTab==="roi" && <div className="card">
                <div className="card-title">Portfolio ROI & Cap Rate</div>
                <div className="card-sub">Annual estimates based on current rent roll</div>
                <table className="table">
                  <thead><tr><th>Unit</th><th>Monthly Rent</th><th>Annual Income</th><th>Est. Expenses</th><th>NOI</th><th>Cap Rate</th></tr></thead>
                  <tbody>
                    {PROPERTIES.filter(p=>p.tenant).map(p=>{
                      const annual = p.rent*12;
                      const exp = Math.round(annual*0.35);
                      const noi = annual - exp;
                      const capRate = ((noi/320000)*100).toFixed(1);
                      return <tr key={p.id}>
                        <td>{p.unit}</td>
                        <td className="green">${p.rent.toLocaleString()}</td>
                        <td>${annual.toLocaleString()}</td>
                        <td className="red">-${exp.toLocaleString()}</td>
                        <td className="amber">${noi.toLocaleString()}</td>
                        <td className="green">{capRate}%</td>
                      </tr>;
                    })}
                  </tbody>
                </table>
                <div style={{marginTop:16,padding:"12px 14px",background:"var(--surface2)",borderRadius:8,display:"flex",gap:24}}>
                  <div><div style={{fontSize:11,color:"var(--text-muted)"}}>Portfolio NOI</div><div style={{fontFamily:"Syne",fontSize:20,fontWeight:700,color:"var(--green)"}}>$26,040</div></div>
                  <div><div style={{fontSize:11,color:"var(--text-muted)"}}>Avg. Cap Rate</div><div style={{fontFamily:"Syne",fontSize:20,fontWeight:700,color:"var(--amber)"}}>5.4%</div></div>
                  <div><div style={{fontSize:11,color:"var(--text-muted)"}}>Market Rent Gap</div><div style={{fontFamily:"Syne",fontSize:20,fontWeight:700,color:"var(--blue)"}}>+$180/mo</div></div>
                </div>
              </div>}
              {portfolioTab==="insurance" && <div className="card">
                <div className="card-title">Insurance Tracking</div>
                <div className="card-sub">Landlord policies and tenant renters insurance</div>
                <table className="table">
                  <thead><tr><th>Unit</th><th>Tenant</th><th>Landlord Policy</th><th>Renters Insurance</th><th>Status</th></tr></thead>
                  <tbody>
                    {PROPERTIES.filter(p=>p.tenant).map(p=>(
                      <tr key={p.id}>
                        <td>{p.unit}</td>
                        <td className="muted">{p.tenant}</td>
                        <td className="muted">State Farm · Q2</td>
                        <td className="muted">{p.id===3?"Not on file":"Verified ✓"}</td>
                        <td><span className={`badge ${p.id===3?"badge-red":"badge-green"}`}>{p.id===3?"Action needed":"OK"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            </div>}

            {/* ── RENT COLLECTION ── */}
            {nav==="rent" && <div className="fade-in">
              <div className="alert alert-red"><span className="alert-icon">⚠️</span><div><div className="alert-title">Unit 2A — $1,300 overdue · 5 days</div><div className="alert-text">Late fee of $65 applied automatically. Send reminder to Carlos Rivera.</div></div><button className="btn btn-outline" style={{marginLeft:"auto",flexShrink:0}}>Send Reminder</button></div>
              <div className="grid-4" style={{marginBottom:20}}>
                {[
                  {label:"Collected",val:`$${collected.toLocaleString()}`,sub:"3 of 4 units",c:"green"},
                  {label:"Outstanding",val:`$${overdue.toLocaleString()}`,sub:"Unit 2A",c:"red"},
                  {label:"Late Fees",val:"$65",sub:"Auto-applied",c:"amber"},
                  {label:"Next Due",val:"May 1",sub:"All units",c:""},
                ].map((s,i)=><div className="stat" key={i}><div className="stat-label">{s.label}</div><div className={`stat-val ${s.c?`stat-${s.c}`:""}`}>{s.val}</div><div className="stat-detail">{s.sub}</div></div>)}
              </div>
              <div className="card">
                <div className="sec-hdr"><div><div className="sec-title">Rent Roll — April 2026</div><div className="sec-sub">All units this cycle</div></div><button className="btn btn-outline">⬇ Export</button></div>
                <table className="table">
                  <thead><tr><th>Unit</th><th>Tenant</th><th>Rent</th><th>Due</th><th>Paid</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {PROPERTIES.filter(p=>p.tenant).map(p=>(
                      <tr key={p.id}>
                        <td>{p.unit}</td><td className="muted">{p.tenant}</td>
                        <td className="green">${p.rent.toLocaleString()}</td>
                        <td className="muted">Apr 1</td>
                        <td className="muted">{p.status==="paid"?"Apr 1":"—"}</td>
                        <td><span className={`badge ${p.status==="paid"?"badge-green":"badge-red"}`}>{p.status==="paid"?"Paid":"Overdue"}</span></td>
                        <td>{p.status==="late"&&<button className="btn btn-red" style={{padding:"4px 10px",fontSize:11}}>Remind</button>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card" style={{marginTop:14}}>
                <div className="card-title">Payment History</div>
                <div className="card-sub">Last 3 months across all units</div>
                <table className="table">
                  <thead><tr><th>Month</th><th>Expected</th><th>Collected</th><th>Outstanding</th><th>On-Time Rate</th></tr></thead>
                  <tbody>
                    {[["April 2026","$5,550","$4,250","$1,300","75%"],["March 2026","$5,550","$5,550","$0","100%"],["Feb 2026","$5,550","$5,550","$0","100%"]].map(([m,e,c,o,r])=>(
                      <tr key={m}><td>{m}</td><td className="muted">{e}</td><td className="green">{c}</td><td className={o==="$0"?"muted":"red"}>{o}</td><td className={r==="100%"?"green":"amber"}>{r}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ── TENANT SCREENING ── */}
            {nav==="screening" && <div className="fade-in">
              <div className="tabs">
                {[["pipeline","Applicant Pipeline"],["checklist","Move-Out Checklist"]].map(([v,l])=>(
                  <button key={v} className={`tab ${screenTab===v?"active":""}`} onClick={()=>setScreenTab(v)}>{l}</button>
                ))}
              </div>
              {screenTab==="pipeline" && <>
                <div className="alert alert-blue"><span className="alert-icon">🏠</span><div><div className="alert-title">Unit A — 88 Elmwood Court · Vacant 14 days</div><div className="alert-text">Listed on Zillow, Realtor.com, Facebook Marketplace · 4 applicants in pipeline</div></div></div>
                <div className="pipeline">
                  {[["Applied",["Tom Bashford","Aisha Wallace"],"blue"],["Screening",["Jordan Lee"],"amber"],["Approved",["Priya Nair"],"green"]].map(([stage,names,color])=>(
                    <div className="pipeline-col" key={stage}>
                      <div className="pipeline-header">{stage}</div>
                      <div className="pipeline-count" style={{color:`var(--${color})`}}>{names.length}</div>
                      {APPLICANTS.filter(a=>a.status===stage.toLowerCase()).map(a=>(
                        <div className="pipeline-card" key={a.name} onClick={()=>setModal({type:"applicant",data:a})}>
                          <div className="pipeline-name">{a.name}</div>
                          <div className="pipeline-detail">{a.income} · {a.score ? `Score: ${a.score}`:"Screening..."} · Applied {a.applied}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">All Applicants</div>
                  <div className="card-sub">Tenant pays screening fee · Reports powered by TransUnion</div>
                  <table className="table">
                    <thead><tr><th>Name</th><th>Income</th><th>Credit Score</th><th>Applied</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      {APPLICANTS.map(a=>(
                        <tr key={a.name}>
                          <td>{a.name}</td><td className="muted">{a.income}</td>
                          <td className={a.score?(a.score>=720?"green":a.score>=650?"amber":"red"):"muted"}>{a.score||"Pending"}</td>
                          <td className="muted">{a.applied}</td>
                          <td><span className={`badge ${a.status==="approved"?"badge-green":a.status==="screening"?"badge-amber":"badge-blue"}`}>{a.status}</span></td>
                          <td><button className="btn btn-ghost" style={{padding:"4px 10px",fontSize:11}} onClick={()=>setModal({type:"applicant",data:a})}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>}
              {screenTab==="checklist" && <div className="card">
                <div className="card-title">Move-Out Checklist</div>
                <div className="card-sub">Track every step of the move-out process to protect your deposit decisions</div>
                {checklist.map((item,i)=>(
                  <div className="checklist-item" key={i} onClick={()=>setChecklist(c=>c.map((x,j)=>j===i?{...x,done:!x.done}:x))}>
                    <div className={`check-box ${item.done?"done":""}`}>{item.done?"✓":""}</div>
                    <div className={`check-label ${item.done?"done":""}`}>{item.label}</div>
                  </div>
                ))}
                <div style={{marginTop:14,display:"flex",gap:10}}>
                  <button className="btn btn-amber">Generate Move-Out Report</button>
                  <button className="btn btn-outline">Oregon Deposit Rules →</button>
                </div>
              </div>}
            </div>}

            {/* ── MESSAGING ── */}
            {nav==="messaging" && <div className="fade-in">
              <div className="grid-21">
                <div className="card">
                  <div className="sec-hdr">
                    <div><div className="sec-title">Messages</div><div className="sec-sub">All tenant threads · timestamped</div></div>
                    <button className="btn btn-amber" onClick={()=>setModal("broadcast")}>📣 Broadcast</button>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:16}}>
                    {Object.keys(messages).map(t=>(
                      <button key={t} className={`btn ${msgTenant===t?"btn-amber":"btn-ghost"}`} style={{fontSize:12}} onClick={()=>setMsgTenant(t)}>{t.split(" ")[0]}</button>
                    ))}
                  </div>
                  <div className="msg-thread">
                    {(messages[msgTenant]||[]).map((m,i)=>(
                      <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="landlord"?"flex-end":"flex-start"}}>
                        <div className={`msg ${m.from==="landlord"?"msg-landlord":"msg-tenant"}`}>{m.text}</div>
                        <div className="msg-meta">{m.from==="landlord"?"You":"Tenant"} · {m.time}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:8}}>
                    <input className="form-input" placeholder="Type a message..." value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} />
                    <button className="btn btn-amber" onClick={sendMessage}>Send</button>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div className="card">
                    <div className="card-title">Entry Notice Log</div>
                    <div className="card-sub">Required by Oregon law</div>
                    {[{unit:"Unit 3B",date:"Apr 3",reason:"Plumber access",notice:"24hr"},
                      {unit:"Unit 2A",date:"Mar 18",reason:"Inspection",notice:"24hr"}].map((e,i)=>(
                      <div key={i} style={{fontSize:12,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                        <div style={{color:"var(--text)",fontWeight:500}}>{e.unit} · {e.date}</div>
                        <div style={{color:"var(--text-muted)"}}>{e.reason} · {e.notice} notice given</div>
                      </div>
                    ))}
                    <button className="btn btn-ghost" style={{width:"100%",marginTop:10,justifyContent:"center",fontSize:12}} onClick={()=>setModal("entry")}>+ Log Entry Notice</button>
                  </div>
                  <div className="card">
                    <div className="card-title">Rent Increase Notices</div>
                    <div className="card-sub">Oregon requires 90 days written notice</div>
                    <div style={{fontSize:12,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{color:"var(--text)",fontWeight:500}}>Unit 1B · Issued Jan 15</div>
                      <div style={{color:"var(--text-muted)"}}>+$75/mo · Effective Apr 15</div>
                    </div>
                    <button className="btn btn-ghost" style={{width:"100%",marginTop:10,justifyContent:"center",fontSize:12}} onClick={()=>setModal("rentincrease")}>+ Issue Notice</button>
                  </div>
                </div>
              </div>
            </div>}

            {/* ── LEASES ── */}
            {nav==="leases" && <div className="fade-in">
              <div className="alert alert-amber"><span className="alert-icon">🔔</span><div><div className="alert-title">2 leases expiring within 90 days — action required</div><div className="alert-text">Oregon requires 90-day notice for rent changes at renewal. Reach out now.</div></div></div>
              <div className="card">
                <div className="sec-hdr"><div className="sec-title">Active Leases</div><button className="btn btn-amber">+ New Lease</button></div>
                <table className="table">
                  <thead><tr><th>Unit</th><th>Tenant</th><th>Term</th><th>Rent</th><th>Expires</th><th>Progress</th><th>Status</th></tr></thead>
                  <tbody>
                    {PROPERTIES.filter(p=>p.tenant).map(p=>(
                      <tr key={p.id}>
                        <td>{p.unit}</td><td className="muted">{p.tenant}</td>
                        <td className="muted">12-month</td>
                        <td className="green">${p.rent}/mo</td>
                        <td className={p.leaseProgress>=70?"amber":"muted"}>{p.leaseEnd}</td>
                        <td style={{width:100}}>
                          <div className="progress"><div className={`progress-fill ${p.leaseProgress<50?"green":""}`} style={{width:`${p.leaseProgress}%`}}/></div>
                          <div style={{fontSize:10,color:"var(--text-dim)",marginTop:3}}>{p.leaseProgress}%</div>
                        </td>
                        <td><span className={`badge ${p.leaseProgress>=70?"badge-amber":"badge-green"}`}>{p.leaseProgress>=70?"Renew soon":"Active"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ── MAINTENANCE ── */}
            {nav==="maintenance" && <div className="fade-in">
              <div className="sec-hdr">
                <div><div className="sec-title">Maintenance Requests</div><div className="sec-sub">{openMaint} open · All timestamped</div></div>
                <button className="btn btn-amber" onClick={()=>setModal("addmaint")}>+ New Request</button>
              </div>
              <table className="table" style={{background:"var(--surface)",borderRadius:12,overflow:"hidden"}}>
                <thead><tr><th>Issue</th><th>Unit</th><th>Tenant</th><th>Priority</th><th>Status</th><th>Vendor</th><th>Submitted</th><th>Cost</th></tr></thead>
                <tbody>
                  {maintenanceList.map(m=>(
                    <tr key={m.id}>
                      <td style={{fontWeight:500}}>{m.issue}</td>
                      <td className="muted">{m.unit}</td><td className="muted">{m.tenant}</td>
                      <td><span className={`badge ${m.priority==="High"?"badge-red":m.priority==="Medium"?"badge-amber":"badge-gray"}`}>{m.priority}</span></td>
                      <td><span className={`badge ${m.status==="resolved"?"badge-green":m.status==="in-progress"?"badge-amber":"badge-red"}`}>{m.status}</span></td>
                      <td className="muted">{m.vendor||"Unassigned"}</td>
                      <td className="muted">{m.submitted}</td>
                      <td className={m.cost?"green":"muted"}>{m.cost?`$${m.cost}`:"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}

            {/* ── EXPENSES ── */}
            {nav==="expenses" && <div className="fade-in">
              <div className="grid-4" style={{marginBottom:20}}>
                {[
                  {label:"Total Income",val:"$3,950",c:"green"},
                  {label:"Total Expenses",val:`$${totalExpenses.toLocaleString()}`,c:"red"},
                  {label:"Net Income",val:`$${(3950-totalExpenses).toLocaleString()}`,c:"amber"},
                  {label:"Expense Ratio",val:`${Math.round((totalExpenses/3950)*100)}%`,c:""},
                ].map((s,i)=><div className="stat" key={i}><div className="stat-label">{s.label}</div><div className={`stat-val ${s.c?`stat-${s.c}`:""}`}>{s.val}</div></div>)}
              </div>
              <div className="tabs">
                {[["all","All"],["Repair","Repairs"],["Insurance","Insurance"],["Tax","Tax"],["Maintenance","Maintenance"]].map(([v,l])=>(
                  <button key={v} className={`tab ${expTab===v?"active":""}`} onClick={()=>setExpTab(v)}>{l}</button>
                ))}
              </div>
              <div className="card">
                <div className="sec-hdr"><div className="sec-title">Expense Ledger</div><div style={{display:"flex",gap:8}}><button className="btn btn-outline">+ Add Expense</button><button className="btn btn-outline">⬇ Export CSV</button></div></div>
                <table className="table">
                  <thead><tr><th>Date</th><th>Property</th><th>Category</th><th>Description</th><th>Amount</th><th>Receipt</th></tr></thead>
                  <tbody>
                    {EXPENSES.filter(e=>expTab==="all"||e.category===expTab).map((e,i)=>(
                      <tr key={i}>
                        <td className="muted">{e.date}</td><td className="muted">{e.property}</td>
                        <td><span className="badge badge-gray">{e.category}</span></td>
                        <td>{e.desc}</td><td className="red">-${e.amount}</td>
                        <td>{e.receipt?<span className="badge badge-green">✓</span>:<span className="badge badge-red">Missing</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>}

            {/* ── DOCUMENTS ── */}
            {nav==="documents" && <div className="fade-in">
              <div className="sec-hdr"><div className="sec-title">Document Vault</div><button className="btn btn-amber">+ Upload</button></div>
              {[
                { section:"Leases & Agreements", docs:[
                  {icon:"📄",name:"Lease — Unit 3B (Maya Chen)",date:"Aug 1, 2024",tag:"Active"},
                  {icon:"📄",name:"Lease — Unit 2A (Carlos Rivera)",date:"Feb 1, 2025",tag:"Active"},
                  {icon:"📄",name:"Lease — Unit 1B (Sarah Okonkwo)",date:"Jan 1, 2025",tag:"Active"},
                ]},
                { section:"Inspections", docs:[
                  {icon:"📸",name:"Move-In Inspection — Unit 3B",date:"Aug 1, 2024",tag:"24 photos"},
                  {icon:"📸",name:"Move-In Inspection — Unit 2A",date:"Feb 1, 2025",tag:"18 photos"},
                ]},
                { section:"Notices & Legal", docs:[
                  {icon:"📬",name:"Entry Notice — Unit 3B, Apr 3",date:"Apr 3, 2026",tag:"Logged"},
                  {icon:"📈",name:"Rent Increase Notice — Unit 1B",date:"Jan 15, 2026",tag:"Delivered"},
                ]},
              ].map(sec=>(
                <div key={sec.section} style={{marginBottom:20}}>
                  <div style={{fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"var(--text-dim)",marginBottom:10,fontWeight:600}}>{sec.section}</div>
                  <div className="card" style={{padding:"8px 0"}}>
                    {sec.docs.map((d,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 18px",borderBottom:i<sec.docs.length-1?"1px solid var(--border)":"none",cursor:"pointer"}} className="doc-hover">
                        <span style={{fontSize:20}}>{d.icon}</span>
                        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"var(--text)"}}>{d.name}</div><div style={{fontSize:11,color:"var(--text-muted)",marginTop:2}}>{d.date}</div></div>
                        <span className="badge badge-gray">{d.tag}</span>
                        <span style={{fontSize:12,color:"var(--blue)",cursor:"pointer"}}>View →</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>}

            {/* ── VENDORS ── */}
            {nav==="vendors" && <div className="fade-in">
              <div className="sec-hdr"><div className="sec-title">Vendor Directory</div><button className="btn btn-amber">+ Add Vendor</button></div>
              <div className="grid-2">
                <div className="card">
                  <div className="card-title">My Vendors</div>
                  <div className="card-sub">Contractors tied to your work orders</div>
                  {VENDORS.map((v,i)=>(
                    <div className="vendor-item" key={i}>
                      <div className="vendor-icon">{v.icon}</div>
                      <div><div className="vendor-name">{v.name}</div><div className="vendor-trade">{v.trade} · ⭐ {v.rating}</div></div>
                      <div className="vendor-contact">{v.phone}</div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-title">Work Order History</div>
                  <div className="card-sub">Vendor assignments and costs</div>
                  <table className="table">
                    <thead><tr><th>Issue</th><th>Vendor</th><th>Cost</th></tr></thead>
                    <tbody>
                      {maintenanceList.filter(m=>m.vendor).map(m=>(
                        <tr key={m.id}><td style={{fontSize:12}}>{m.issue}</td><td className="muted">{m.vendor}</td><td className="green">{m.cost?`$${m.cost}`:"In progress"}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}

            {/* ── RIGHTS ── */}
            {nav==="rights" && <div className="fade-in">
              <div className="alert alert-blue"><span className="alert-icon">📘</span><div><div className="alert-title">Oregon Landlord Law — 2026</div><div className="alert-text">This is a reference guide. Always consult a licensed Oregon attorney for specific legal advice.</div></div></div>
              {RIGHTS.map((r,i)=>(
                <div key={i} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,marginBottom:10,overflow:"hidden"}}>
                  <div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",cursor:"pointer",fontSize:14,fontWeight:500,color:"var(--text)"}} onClick={()=>setAccordionOpen(accordionOpen===i?null:i)}>
                    {r.title}<span style={{color:"var(--text-dim)"}}>{accordionOpen===i?"▲":"▼"}</span>
                  </div>
                  {accordionOpen===i && <div style={{padding:"12px 18px 16px",fontSize:13,color:"var(--text-muted)",lineHeight:1.7,background:"var(--surface2)",borderTop:"1px solid var(--border)"}}>{r.body}</div>}
                </div>
              ))}
              <div className="grid-2" style={{marginTop:20}}>
                {[
                  {icon:"⚖️",title:"Oregon Landlord-Tenant Coalition",desc:"Industry resources and advocacy for property owners.",link:"ortenant.org"},
                  {icon:"🏛️",title:"Oregon State Bar Referral",desc:"Find a landlord-tenant attorney in your county.",link:"osbar.org"},
                  {icon:"📊",title:"Rent Control Lookup",desc:"Check if your property is subject to Oregon rent caps.",link:"oregonlaws.org"},
                  {icon:"📝",title:"State-Specific Lease Templates",desc:"Attorney-reviewed lease agreements for Oregon landlords.",link:"Explore →"},
                ].map((r,i)=>(
                  <div key={i} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 18px",display:"flex",gap:12,cursor:"pointer",transition:"border-color 0.15s"}} className="resource-hover">
                    <div style={{width:38,height:38,background:"var(--surface2)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{r.icon}</div>
                    <div><div style={{fontSize:13,fontWeight:500,color:"var(--text)",marginBottom:3}}>{r.title}</div><div style={{fontSize:12,color:"var(--text-muted)"}}>{r.desc}</div><div style={{fontSize:11,color:"var(--blue)",marginTop:5}}>{r.link}</div></div>
                  </div>
                ))}
              </div>
            </div>}
          </div>
        </div>

        {/* ── MODALS ── */}
        {modal && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
            <div className="modal">

              {modal==="addmaint" && <>
                <div className="modal-title">New Maintenance Request</div>
                <div className="modal-sub">Log a repair — timestamped and tracked</div>
                <div className="form-group"><label className="form-label">Unit</label>
                  <select className="form-select" value={newMaint.unit} onChange={e=>setNewMaint({...newMaint,unit:e.target.value})}>
                    <option value="">Select unit</option>
                    {PROPERTIES.filter(p=>p.tenant).map(p=><option key={p.id}>{p.unit}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Issue</label><input className="form-input" placeholder="Describe the issue" value={newMaint.issue} onChange={e=>setNewMaint({...newMaint,issue:e.target.value})}/></div>
                <div className="form-group"><label className="form-label">Priority</label>
                  <select className="form-select" value={newMaint.priority} onChange={e=>setNewMaint({...newMaint,priority:e.target.value})}>
                    <option>Low</option><option>Medium</option><option>High</option><option>Emergency</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="btn btn-amber" onClick={()=>{
                    if(newMaint.unit&&newMaint.issue){
                      const p=PROPERTIES.find(x=>x.unit===newMaint.unit);
                      setMaintenanceList([{id:Date.now(),unit:newMaint.unit,tenant:p?.tenant||"",issue:newMaint.issue,priority:newMaint.priority,status:"open",submitted:"Apr 6",vendor:null,cost:null},...maintenanceList]);
                      setModal(null);setNewMaint({unit:"",issue:"",priority:"Medium"});
                    }
                  }}>Submit</button>
                </div>
              </>}

              {modal==="broadcast" && <>
                <div className="modal-title">Broadcast Message</div>
                <div className="modal-sub">Send to all tenants simultaneously</div>
                <div className="form-group"><label className="form-label">Recipients</label>
                  <div style={{display:"flex",gap:6}}>{Object.keys(messages).map(t=><span key={t} className="badge badge-green">{t.split(" ")[0]}</span>)}</div>
                </div>
                <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" placeholder="e.g. Maintenance scheduled for the building on Apr 10..." /></div>
                <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-amber" onClick={()=>setModal(null)}>Send to All</button></div>
              </>}

              {modal==="entry" && <>
                <div className="modal-title">Log Entry Notice</div>
                <div className="modal-sub">Oregon requires 24hr notice · Logged for your records</div>
                <div className="form-group"><label className="form-label">Unit</label><select className="form-select">{PROPERTIES.filter(p=>p.tenant).map(p=><option key={p.id}>{p.unit}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Entry Date</label><input className="form-input" type="date" /></div>
                <div className="form-group"><label className="form-label">Reason</label><input className="form-input" placeholder="e.g. Scheduled plumber access"/></div>
                <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-amber" onClick={()=>setModal(null)}>Log Notice</button></div>
              </>}

              {modal==="rentincrease" && <>
                <div className="modal-title">Issue Rent Increase Notice</div>
                <div className="modal-sub">Oregon requires 90 days written notice · One increase per 12 months</div>
                <div className="form-group"><label className="form-label">Unit</label><select className="form-select">{PROPERTIES.filter(p=>p.tenant).map(p=><option key={p.id}>{p.unit}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Current Rent</label><input className="form-input" placeholder="$1,450"/></div>
                <div className="form-group"><label className="form-label">New Rent</label><input className="form-input" placeholder="$1,525"/></div>
                <div className="form-group"><label className="form-label">Effective Date</label><input className="form-input" type="date"/></div>
                <div className="alert alert-amber" style={{marginTop:4}}><span className="alert-icon">⚠️</span><div><div className="alert-text">Oregon rent control may apply. Confirm this unit is exempt before proceeding.</div></div></div>
                <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-amber" onClick={()=>setModal(null)}>Generate Notice</button></div>
              </>}

              {modal?.type==="applicant" && <>
                <div className="modal-title">{modal.data.name}</div>
                <div className="modal-sub">Applicant for {modal.data.unit} · Applied {modal.data.applied}</div>
                {[["Monthly Income",modal.data.income],["Credit Score",modal.data.score||"Screening in progress"],["Income-to-Rent Ratio",modal.data.score?"3.25×":"—"],["Status",modal.data.status]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{fontSize:12,color:"var(--text-muted)"}}>{l}</span>
                    <span style={{fontSize:13,fontWeight:500,color:"var(--text)"}}>{v}</span>
                  </div>
                ))}
                <div style={{display:"flex",gap:8,marginTop:16}}>
                  <button className="btn btn-amber" style={{flex:1,justifyContent:"center"}} onClick={()=>setModal(null)}>Approve</button>
                  <button className="btn btn-red" style={{flex:1,justifyContent:"center"}} onClick={()=>setModal(null)}>Decline</button>
                  <button className="btn btn-outline" onClick={()=>setModal(null)}>Run Screen</button>
                </div>
              </>}

              {modal==="addunit" && <>
                <div className="modal-title">Add New Unit</div>
                <div className="modal-sub">Add a property or unit to your portfolio</div>
                <div className="form-group"><label className="form-label">Street Address</label><input className="form-input" placeholder="123 Main Street"/></div>
                <div className="form-group"><label className="form-label">Unit</label><input className="form-input" placeholder="Unit 1A"/></div>
                <div className="form-group"><label className="form-label">City, State</label><input className="form-input" placeholder="Portland, OR"/></div>
                <div className="form-group"><label className="form-label">Monthly Rent</label><input className="form-input" placeholder="$1,500"/></div>
                <div className="modal-footer"><button className="btn btn-outline" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-amber" onClick={()=>setModal(null)}>Add Unit</button></div>
              </>}

            </div>
          </div>
        )}
      </div>
    </>
  );
}
