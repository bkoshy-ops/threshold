import { useState } from "react";
import { useNavigate } from "react-router-dom";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Epilogue:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root {
  --bg: #FAF8F4;
  --surface: #FFFFFF;
  --surface2: #F4F1EC;
  --surface3: #EDE9E2;
  --sidebar-bg: #1C2320;
  --sidebar-border: rgba(255,255,255,0.07);
  --border: #E2DDD6;
  --border2: #CCC8C0;
  --sage: #7C9E8B;
  --sage-light: #EAF0EC;
  --sage-dark: #4A6B58;
  --sage-glow: rgba(124,158,139,0.15);
  --clay: #C4714A;
  --clay-light: #F5EDE8;
  --clay-glow: rgba(196,113,74,0.12);
  --ink: #1C2320;
  --ink-soft: #4A5450;
  --ink-muted: #8A9490;
  --ink-dim: #B8BDB9;
  --white: #FFFFFF;
  --warning: #E8A830;
  --warning-light: #FFF8E6;
  --warning-dim: #7A5210;
  --error: #C94040;
  --error-light: #FFF0F0;
  --success: #4A8C6A;
  --success-light: #EAF5EF;
  --blue: #4A7FC4;
  --blue-light: #EBF2FF;
}
body{font-family:'Epilogue',sans-serif;background:var(--bg);color:var(--ink);}
.app{display:flex;height:100vh;overflow:hidden;}

/* SIDEBAR — matches landlord structure */
.sidebar{width:224px;min-width:224px;background:var(--sidebar-bg);display:flex;flex-direction:column;overflow-y:auto;}
.sidebar-logo{padding:22px 20px 18px;border-bottom:1px solid var(--sidebar-border);}
.logo-text{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--white);letter-spacing:-0.5px;}
.logo-sub{font-size:10px;color:var(--sage);letter-spacing:2px;text-transform:uppercase;margin-top:2px;font-weight:500;}
.sidebar-section{padding:18px 12px 6px;}
.section-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#4A5450;font-weight:600;padding:0 8px;margin-bottom:6px;}
.nav-btn{display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border-radius:7px;border:none;background:none;color:#6A7870;font-size:13px;font-family:'Epilogue',sans-serif;cursor:pointer;transition:all 0.15s;text-align:left;}
.nav-btn:hover{background:rgba(255,255,255,0.06);color:var(--white);}
.nav-btn.active{background:var(--sage-glow);color:var(--sage);border:1px solid rgba(124,158,139,0.3);}
.nav-icon{width:18px;text-align:center;font-size:14px;}
.nav-badge{margin-left:auto;background:var(--clay);color:white;font-size:10px;font-weight:600;padding:1px 6px;border-radius:10px;}

.sidebar-unit{margin:auto 12px 12px;background:rgba(124,158,139,0.12);border:1px solid rgba(124,158,139,0.25);border-radius:10px;padding:14px;}
.unit-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--sage);margin-bottom:8px;font-weight:600;}
.unit-address{font-size:13px;color:var(--white);font-weight:500;line-height:1.4;}
.unit-sub{font-size:11px;color:#6A7870;margin-top:3px;}

/* MAIN */
.main{flex:1;overflow-y:auto;display:flex;flex-direction:column;}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
.topbar-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:600;color:var(--ink);}
.topbar-sub{font-size:12px;color:var(--ink-muted);}
.avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--sage),var(--sage-dark));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:white;}
.content{padding:24px 28px;flex:1;}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 22px;}
.card-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--ink);margin-bottom:3px;}
.card-sub{font-size:12px;color:var(--ink-muted);margin-bottom:16px;}

/* GRIDS */
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
.grid-21{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:20px;}

/* STATS */
.stat{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px 20px;}
.stat-label{font-size:11px;color:var(--ink-muted);margin-bottom:8px;letter-spacing:0.3px;}
.stat-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:var(--ink);line-height:1;}
.stat-detail{font-size:11px;color:var(--ink-muted);margin-top:5px;}
.stat-sage{color:var(--sage-dark);}
.stat-green{color:var(--success);}
.stat-clay{color:var(--clay);}
.stat-warn{color:var(--warning);}

/* BADGES */
.badge{display:inline-flex;align-items:center;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:500;}
.badge-green{background:var(--success-light);color:var(--success);}
.badge-red{background:var(--error-light);color:var(--error);}
.badge-yellow{background:var(--warning-light);color:var(--warning);}
.badge-sage{background:var(--sage-light);color:var(--sage-dark);}
.badge-clay{background:var(--clay-light);color:var(--clay);}
.badge-blue{background:var(--blue-light);color:var(--blue);}

/* ALERT */
.alert{border-radius:10px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:flex-start;gap:12px;}
.alert-yellow{background:var(--warning-light);border:1px solid #F0D080;}
.alert-green{background:var(--success-light);border:1px solid #A0D4B8;}
.alert-sage{background:var(--sage-light);border:1px solid var(--border);}
.alert-clay{background:var(--clay-light);border:1px solid #DDA080;}
.alert-blue{background:var(--blue-light);border:1px solid #A0C0E8;}
.alert-icon{font-size:16px;margin-top:1px;}
.alert-title{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px;font-family:'Syne',sans-serif;}
.alert-text{font-size:12px;color:var(--ink-soft);line-height:1.5;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all 0.15s;font-family:'Epilogue',sans-serif;}
.btn-sage{background:var(--sage-dark);color:white;}
.btn-sage:hover{background:var(--sage);}
.btn-outline{background:transparent;color:var(--ink-soft);border:1px solid var(--border);}
.btn-outline:hover{border-color:var(--sage);color:var(--sage-dark);}
.btn-ghost{background:var(--surface2);color:var(--ink);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--sage);color:var(--sage-dark);}
.btn-clay{background:var(--clay);color:white;}

/* SECTION HEADER */
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.sec-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:600;color:var(--ink);}
.sec-sub{font-size:12px;color:var(--ink-muted);margin-top:2px;}

/* TABS */
.tabs{display:flex;gap:3px;background:var(--surface2);border-radius:8px;padding:3px;margin-bottom:20px;}
.tab{flex:1;padding:7px 10px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;text-align:center;transition:all 0.15s;border:none;background:transparent;color:var(--ink-muted);font-family:'Epilogue',sans-serif;}
.tab.active{background:var(--surface);color:var(--sage-dark);border:1px solid var(--border);box-shadow:0 1px 4px rgba(0,0,0,0.06);}

/* PROGRESS */
.progress-bar{height:6px;background:var(--surface3);border-radius:4px;overflow:hidden;}
.progress-fill{height:100%;border-radius:4px;background:var(--sage);}
.progress-fill-warn{background:var(--warning);}
.progress-fill-good{background:var(--success);}

/* RESOURCES */
.resource-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.resource-card{border:1px solid var(--border);border-radius:10px;padding:16px 18px;cursor:pointer;transition:all 0.2s;background:var(--surface);display:flex;gap:12px;align-items:flex-start;}
.resource-card:hover{border-color:var(--sage);box-shadow:0 2px 12px var(--sage-glow);}
.resource-icon{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.ri-sage{background:var(--sage-light);}
.ri-clay{background:var(--clay-light);}
.ri-yellow{background:var(--warning-light);}
.ri-blue{background:var(--blue-light);}
.resource-title{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px;font-family:'Syne',sans-serif;}
.resource-desc{font-size:12px;color:var(--ink-muted);line-height:1.5;}
.resource-tag{font-size:11px;color:var(--sage-dark);margin-top:5px;font-weight:500;}

/* MAINTENANCE */
.req-item{border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;align-items:flex-start;gap:12px;background:var(--surface);margin-bottom:10px;}
.req-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px;}
.dot-open{background:var(--clay);}
.dot-progress{background:var(--warning);}
.dot-done{background:var(--success);}

/* ACCORDION */
.accordion{border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:10px;}
.accordion-hdr{padding:13px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:13px;font-weight:500;color:var(--ink);background:var(--surface);font-family:'Syne',sans-serif;}
.accordion-hdr:hover{background:var(--sage-light);}
.accordion-body{padding:12px 16px 16px;font-size:13px;color:var(--ink-soft);line-height:1.7;background:var(--surface2);border-top:1px solid var(--border);}

/* FORM */
.form-group{margin-bottom:14px;}
.form-label{font-size:12px;font-weight:500;color:var(--ink-soft);margin-bottom:5px;display:block;}
.form-input,.form-select,.form-textarea{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:9px 12px;font-size:13px;font-family:'Epilogue',sans-serif;color:var(--ink);outline:none;transition:border 0.15s;}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--sage);background:var(--surface);}
.form-textarea{resize:vertical;min-height:80px;}
.form-hint{font-size:11px;color:var(--ink-muted);margin-top:5px;}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(28,35,32,0.55);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;width:100%;max-width:500px;max-height:88vh;overflow-y:auto;}
.modal-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:600;color:var(--ink);margin-bottom:3px;}
.modal-sub{font-size:12px;color:var(--ink-muted);margin-bottom:18px;}
.modal-footer{display:flex;gap:10px;justify-content:flex-end;margin-top:16px;}

/* DEPOSIT TABLE */
.deposit-row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--border);}
.deposit-row:last-child{border-bottom:none;}

/* INSURANCE CARD */
.ins-card{border:1px solid var(--border);border-radius:10px;padding:16px 18px;background:var(--surface);margin-bottom:10px;display:flex;gap:14px;align-items:center;}
.ins-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}

/* IS THIS NORMAL */
.normal-card{border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:10px;cursor:pointer;}
.normal-hdr{padding:13px 16px;display:flex;align-items:center;gap:12px;background:var(--surface);}
.normal-hdr:hover{background:var(--sage-light);}
.normal-verdict{padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600;margin-left:auto;flex-shrink:0;}
.verdict-yes{background:var(--success-light);color:var(--success);}
.verdict-no{background:var(--error-light);color:var(--error);}
.verdict-depends{background:var(--warning-light);color:var(--warning);}
.normal-body{padding:12px 16px 16px;font-size:13px;color:var(--ink-soft);line-height:1.7;background:var(--surface2);border-top:1px solid var(--border);}

/* RENT ROWS */
.rent-row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--border);}
.rent-row:last-child{border-bottom:none;}

/* RTI METER */
.rti-meter{height:12px;background:var(--surface3);border-radius:6px;overflow:hidden;position:relative;margin:10px 0;}
.rti-fill{height:100%;border-radius:6px;transition:width 0.6s;}
.rti-marker{position:absolute;top:-4px;height:20px;width:2px;background:var(--ink);}

@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.fade-in{animation:fadeIn 0.2s ease both;}
`;

const TENANT = { name:"Maya Chen", initials:"MC", unit:"Unit 3B", address:"412 Birchwood Ave, Portland, OR 97201", landlord:"James Harrington", rent:1450, income:5200, leaseStart:"Aug 1, 2024", leaseEnd:"Jul 31, 2025", leaseProgress:75, creditScore:714, deposit:1450 };

const MAINTENANCE_DATA = [
  { id:1, title:"Bathroom faucet leaking", status:"in-progress", submitted:"Mar 28, 2026", updated:"Apr 1, 2026", priority:"Medium", note:"Landlord acknowledged Apr 1. Plumber scheduled Apr 8.", anon:false },
  { id:2, title:"Heating unit making noise", status:"open", submitted:"Apr 4, 2026", updated:"Apr 4, 2026", priority:"High", note:"Submitted with photo documentation. Awaiting response.", anon:false },
  { id:3, title:"Broken window latch — bedroom", status:"resolved", submitted:"Feb 12, 2026", updated:"Feb 19, 2026", priority:"Low", note:"Resolved. New latch installed Feb 19.", anon:false },
];

const DOCS = [
  { icon:"📄", name:"Lease Agreement", detail:"Signed Aug 1, 2024 · 12-month term", tag:"Active" },
  { icon:"🏠", name:"Move-In Inspection Report", detail:"Completed Aug 1, 2024 · 24 photos", tag:"Signed" },
  { icon:"📋", name:"Rent Payment History", detail:"9 months on record", tag:"Export" },
  { icon:"📬", name:"Entry Notice — Apr 3, 2026", detail:"24hr notice given by landlord", tag:"Logged" },
  { icon:"⬆️", name:"Rent Increase Notice", detail:"Received Jan 15, 2026 · +$75/mo", tag:"Acknowledged" },
];

const PAYMENT_HISTORY = [
  { month:"April 2026", amount:1450, date:"Apr 1", status:"paid" },
  { month:"March 2026", amount:1450, date:"Mar 1", status:"paid" },
  { month:"February 2026", amount:1450, date:"Feb 1", status:"paid" },
  { month:"January 2026", amount:1375, date:"Jan 3", status:"paid" },
  { month:"December 2025", amount:1375, date:"Dec 1", status:"paid" },
];

const TENANT_RIGHTS = [
  { title:"Right to Habitable Housing", body:"Your landlord must maintain the property in a livable condition — functioning heat, water, electricity, and a weatherproof structure. In Oregon, landlords have 24 hours to address emergency repairs and 30 days for non-emergency issues after written notice." },
  { title:"Right to Privacy & Entry Notice", body:"Landlords must give at least 24 hours notice before entering your unit, except in genuine emergencies. In Oregon (ORS 90.322), this is a legal requirement. You can log every entry notice in your Documents tab." },
  { title:"Protection Against Retaliation", body:"A landlord cannot raise your rent, issue a no-cause eviction, or reduce services within 90 days of you exercising a legal right — such as filing a maintenance complaint or contacting a housing authority." },
  { title:"Security Deposit Rights", body:"Oregon landlords must return your deposit within 31 days of move-out with an itemized statement of deductions. You can use your move-in inspection report as documentation to dispute unfair charges." },
  { title:"Right to Organize", body:"You have the right to discuss rental conditions with other tenants, form a tenant union, and contact housing advocacy groups without fear of retaliation." },
];

const RESOURCES = [
  { icon:"⚖️", cls:"ri-sage", title:"Know Your Rights", desc:"Oregon-specific tenant rights, eviction protections, and habitability law.", tag:"Legal guide →", cat:"rights" },
  { icon:"🆘", cls:"ri-clay", title:"Emergency Rent Assistance", desc:"Find local programs for emergency rental assistance by ZIP code.", tag:"Find programs →", cat:"financial" },
  { icon:"💡", cls:"ri-yellow", title:"Utility Assistance", desc:"LIHEAP, Oregon Energy Fund, and local utility relief programs.", tag:"Apply now →", cat:"financial" },
  { icon:"🏛️", cls:"ri-sage", title:"Free Legal Aid", desc:"Oregon Law Center, Legal Aid Services — free for income-qualifying renters.", tag:"Find help →", cat:"legal" },
  { icon:"📊", cls:"ri-blue", title:"Credit Monitoring", desc:"Track your credit score and report rent payments to all three bureaus.", tag:"Connect →", cat:"financial" },
  { icon:"🏠", cls:"ri-clay", title:"Housing Advocacy", desc:"Oregon Renters' Rights Hotline and local tenant unions near you.", tag:"Get support →", cat:"advocacy" },
  { icon:"📝", cls:"ri-yellow", title:"Renter Resume", desc:"Build a portable rental history to share with future landlords.", tag:"Build yours →", cat:"tools" },
  { icon:"🚪", cls:"ri-blue", title:"Breaking Your Lease", desc:"Oregon-specific rules, costs, and templates for early lease termination.", tag:"Read guide →", cat:"legal" },
];

const IS_NORMAL_ITEMS = [
  { q:"Can my landlord enter without notice?", verdict:"no", verdictLabel:"Not Normal", body:"No. Oregon law (ORS 90.322) requires at least 24 hours written notice before entry except for genuine emergencies. If your landlord enters without notice, document it and send a written objection. Repeated violations may give you grounds to terminate your lease." },
  { q:"Is it normal to pay first, last, and deposit?", verdict:"depends", verdictLabel:"Depends", body:"Collecting first and last month's rent plus a deposit is legal in Oregon, but the deposit cannot exceed one month's rent for most residential leases. Some landlords also charge a pet deposit. Always get itemization in writing." },
  { q:"My heat stopped working. How long can they wait?", verdict:"no", verdictLabel:"24 Hours", body:"Heat failure is an emergency repair. Oregon landlords must fix emergency habitability issues within 24 hours of written notice. If they don't, you may have the right to repair-and-deduct or withhold rent after proper notice." },
  { q:"Can my landlord raise rent mid-lease?", verdict:"no", verdictLabel:"Not Normal", body:"No. Rent cannot be increased during a fixed-term lease unless your lease explicitly allows it. After your lease ends, Oregon requires 90 days written notice for any rent increase, and rent can only increase once every 12 months." },
  { q:"Is charging for 'normal wear and tear' legal?", verdict:"no", verdictLabel:"Not Legal", body:"Landlords cannot deduct normal wear and tear from your security deposit — only actual damage beyond normal use. Examples of normal wear: small nail holes, carpet wear, faded paint. Take dated move-in photos and keep your inspection report." },
  { q:"My landlord is ignoring my maintenance request.", verdict:"depends", verdictLabel:"Know Your Options", body:"Non-emergency repairs must be addressed within 30 days of written notice in Oregon. If ignored, you may have repair-and-deduct rights (up to one month's rent), the ability to terminate the lease, or can file a complaint with Oregon Housing. Always send requests in writing." },
  { q:"Can I be evicted for complaining about repairs?", verdict:"no", verdictLabel:"Retaliation — Illegal", body:"Retaliatory eviction is illegal in Oregon. A landlord cannot evict, raise rent, or reduce services within 90 days of you exercising a legal right. If you suspect retaliation, contact Oregon Law Center or the Renters' Rights Hotline immediately." },
  { q:"Does my landlord have to provide a smoke detector?", verdict:"yes", verdictLabel:"Required by Law", body:"Yes. Oregon law requires working smoke detectors in all rental units. Landlords must install them; tenants are responsible for maintaining batteries. If yours is missing or broken, submit a written maintenance request immediately." },
];

const DEPOSIT_DEDUCTIONS = [
  { item:"Cleaning fee (move-out condition)", amount:0, landlord:null, status:"tbd" },
  { item:"Carpet damage (Unit 3B bedroom)", amount:0, landlord:null, status:"tbd" },
  { item:"Broken window latch", amount:0, landlord:null, status:"resolved" },
  { item:"Painting — standard repainting", amount:0, landlord:null, status:"normal-wear" },
];

const INSURANCE_OPTIONS = [
  { name:"Lemonade Renters", price:"$5/mo", coverage:"$30K personal property · $100K liability", rating:"4.9", popular:true, icon:"🍋" },
  { name:"State Farm Renters", price:"$12/mo", coverage:"$50K personal property · $100K liability", rating:"4.7", popular:false, icon:"🏡" },
  { name:"Hippo Insurance", price:"$8/mo", coverage:"$40K personal property · $100K liability", rating:"4.6", popular:false, icon:"🦛" },
  { name:"Toggle by Farmers", price:"$7/mo", coverage:"$25K personal property · $75K liability", rating:"4.5", popular:false, icon:"🔄" },
];

export default function App() {
  const navigate = useNavigate();
  const [nav, setNav] = useState("dashboard");
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [normalOpen, setNormalOpen] = useState(null);
  const [resourceTab, setResourceTab] = useState("all");
  const [depositTab, setDepositTab] = useState("tracker");
  const [maintenanceList, setMaintenanceList] = useState(MAINTENANCE_DATA);
  const [showMaintModal, setShowMaintModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [maintForm, setMaintForm] = useState({ title:"", priority:"Medium", description:"", anonymous:false });
  const [rtiIncome, setRtiIncome] = useState(5200);
  const [normalFilter, setNormalFilter] = useState("all");
  const [insTab, setInsTab] = useState("marketplace");

  const rti = ((TENANT.rent / rtiIncome) * 100).toFixed(1);
  const rtiStatus = rti <= 30 ? "good" : rti <= 40 ? "caution" : "high";
  const rtiColor = rtiStatus === "good" ? "var(--success)" : rtiStatus === "caution" ? "var(--warning)" : "var(--error)";

  const submitRequest = () => {
    if (!maintForm.title || !maintForm.description) return;
    setMaintenanceList([{ id:Date.now(), title:maintForm.title, status:"open", submitted:"Apr 7, 2026", updated:"Apr 7, 2026", priority:maintForm.priority, note:"Submitted with timestamp. Awaiting landlord response.", anon:maintForm.anonymous }, ...maintenanceList]);
    setSubmitted(true);
    setTimeout(() => { setShowMaintModal(false); setSubmitted(false); setMaintForm({ title:"", priority:"Medium", description:"", anonymous:false }); }, 1400);
  };

  const navSections = [
    { label:"My Home", items:[
      { id:"dashboard", icon:"▦", label:"Dashboard" },
      { id:"rent", icon:"💳", label:"Rent & Payments" },
      { id:"deposit", icon:"🔒", label:"Security Deposit" },
      { id:"maintenance", icon:"🔧", label:"Maintenance" },
      { id:"documents", icon:"📁", label:"Documents" },
    ]},
    { label:"Tools & Resources", items:[
      { id:"rti", icon:"📊", label:"Income Tracker" },
      { id:"insurance", icon:"🛡️", label:"Renters Insurance" },
      { id:"resources", icon:"🌿", label:"My Resources" },
      { id:"rights", icon:"⚖️", label:"Know My Rights" },
      { id:"normal", icon:"💬", label:"Is This Normal?" },
    ]},
  ];

  const pageTitles = { dashboard:"Good morning, Maya", rent:"Rent & Payments", deposit:"Security Deposit", maintenance:"Maintenance", documents:"Documents", rti:"Rent-to-Income Tracker", insurance:"Renters Insurance", resources:"My Resources", rights:"Know Your Rights", normal:"Is This Normal?" };
  const filteredResources = resourceTab === "all" ? RESOURCES : RESOURCES.filter(r => r.cat === resourceTab);
  const filteredNormal = normalFilter === "all" ? IS_NORMAL_ITEMS : IS_NORMAL_ITEMS.filter(i => i.verdict === normalFilter);

  return (
    <>
      <style>{S}</style>
      <div className="app">

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-text">Threshold</div>
            <div className="logo-sub">Tenant Portal</div>
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
          <div className="sidebar-unit">
            <div className="unit-label">Your Unit</div>
            <div className="unit-address">{TENANT.unit} · 412 Birchwood Ave</div>
            <div className="unit-sub">Portland, OR · {TENANT.landlord}</div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">{pageTitles[nav]}</div>
              <div className="topbar-sub">Portland, OR · {TENANT.unit}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <button onClick={() => navigate('/')} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:7,padding:"6px 12px",fontSize:12,color:"var(--ink-muted)",cursor:"pointer",fontFamily:"'Epilogue',sans-serif"}}>← Back</button>
              <span style={{fontSize:12,color:"var(--ink-muted)"}}>April 7, 2026</span>
              <div className="avatar">{TENANT.initials}</div>
            </div>
          </div>

          <div className="content">

            {/* ── DASHBOARD ── */}
            {nav==="dashboard" && <div className="fade-in">
              <div className="alert alert-yellow"><span className="alert-icon">📅</span>
                <div><div className="alert-title">Rent due in 8 days</div><div className="alert-text">$1,450 due April 14 · ACH autopay active · Lease renews in 117 days</div></div>
              </div>
              <div className="grid-4">
                {[
                  {label:"Monthly Rent",val:"$1,450",detail:"Due the 1st",c:"sage"},
                  {label:"Credit Score",val:TENANT.creditScore,detail:"↑ 12 pts this year",c:"green"},
                  {label:"Open Requests",val:maintenanceList.filter(m=>m.status!=="resolved").length,detail:"1 in progress",c:"clay"},
                  {label:"Rent-to-Income",val:`${rti}%`,detail:rtiStatus==="good"?"Healthy ratio":"Watch this",c:rtiStatus==="good"?"green":"warn"},
                ].map((s,i)=>(
                  <div className="stat" key={i}>
                    <div className="stat-label">{s.label}</div>
                    <div className={`stat-val stat-${s.c}`}>{s.val}</div>
                    <div className="stat-detail">{s.detail}</div>
                  </div>
                ))}
              </div>
              <div className="grid-21">
                <div className="card">
                  <div className="card-title">Lease Status</div>
                  <div className="card-sub">{TENANT.leaseStart} → {TENANT.leaseEnd}</div>
                  <div className="progress-bar" style={{marginBottom:8}}>
                    <div className="progress-fill" style={{width:`${TENANT.leaseProgress}%`}} />
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink-muted)",marginBottom:14}}>
                    <span>9 months in</span><span>117 days remaining</span>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <span className="badge badge-green">Active</span>
                    <span className="badge badge-sage">12-month term</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Recent Activity</div>
                  <div className="card-sub">Your unit timeline</div>
                  {[
                    {dot:"dot-progress",text:"Plumber scheduled for faucet repair",time:"Apr 1"},
                    {dot:"dot-open",text:"Heating noise request submitted",time:"Apr 4"},
                    {dot:"dot-done",text:"April rent paid — $1,450",time:"Apr 1"},
                    {dot:"dot-done",text:"Entry notice logged from landlord",time:"Apr 3"},
                  ].map((a,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div className={`req-dot ${a.dot}`} style={{marginTop:0}} />
                      <div style={{flex:1,fontSize:12,color:"var(--ink)"}}>{a.text}</div>
                      <div style={{fontSize:11,color:"var(--ink-muted)"}}>{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="sec-hdr">
                  <div><div className="card-title">Quick Resources</div><div className="card-sub">Tools built around your needs as a renter</div></div>
                  <button className="btn btn-outline" onClick={()=>setNav("resources")}>View all →</button>
                </div>
                <div className="resource-grid">
                  {RESOURCES.slice(0,4).map((r,i)=>(
                    <div key={i} className="resource-card">
                      <div className={`resource-icon ${r.cls}`}>{r.icon}</div>
                      <div><div className="resource-title">{r.title}</div><div className="resource-desc">{r.desc}</div><div className="resource-tag">{r.tag}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>}

            {/* ── RENT ── */}
            {nav==="rent" && <div className="fade-in">
              <div className="alert alert-green"><span className="alert-icon">✅</span>
                <div><div className="alert-title">All caught up · 9 consecutive on-time payments</div><div className="alert-text">Reporting to TransUnion, Experian & Equifax monthly</div></div>
              </div>
              <div className="grid-3">
                {[
                  {label:"Next Payment",val:"$1,450",detail:"Due May 1, 2026"},
                  {label:"Total Paid (2026)",val:"$5,800",detail:"4 payments · all on time"},
                  {label:"Security Deposit",val:"$1,450",detail:"Held by landlord · Due back Aug 31"},
                ].map((s,i)=><div className="stat" key={i}><div className="stat-label">{s.label}</div><div className="stat-val">{s.val}</div><div className="stat-detail">{s.detail}</div></div>)}
              </div>
              <div className="card">
                <div className="sec-hdr"><div><div className="sec-title">Payment History</div><div className="sec-sub">All payments timestamped and recorded</div></div><button className="btn btn-outline">⬇ Export PDF</button></div>
                {PAYMENT_HISTORY.map((p,i)=>(
                  <div className="rent-row" key={i}>
                    <div><div style={{fontSize:14,fontWeight:500,color:"var(--ink)"}}>{p.month}</div><div style={{fontSize:12,color:"var(--ink-muted)"}}>Paid {p.date}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:14,fontWeight:600,color:"var(--ink)"}}>${p.amount.toLocaleString()}</span>
                      <span className="badge badge-green">On time</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>}

            {/* ── SECURITY DEPOSIT ── */}
            {nav==="deposit" && <div className="fade-in">
              <div className="tabs">
                {[["tracker","Deposit Tracker"],["deductions","Move-Out Deductions"],["rights","Your Rights"]].map(([v,l])=>(
                  <button key={v} className={`tab ${depositTab===v?"active":""}`} onClick={()=>setDepositTab(v)}>{l}</button>
                ))}
              </div>

              {depositTab==="tracker" && <>
                <div className="alert alert-sage"><span className="alert-icon">🔒</span>
                  <div><div className="alert-title">Your deposit is ${TENANT.deposit.toLocaleString()}</div><div className="alert-text">Held by James Harrington since Aug 1, 2024. Oregon law requires return within 31 days of move-out with itemized statement.</div></div>
                </div>
                <div className="grid-3">
                  {[
                    {label:"Deposit Held",val:`$${TENANT.deposit.toLocaleString()}`,detail:"Since Aug 1, 2024"},
                    {label:"Max Legal Deductions",val:"Actual damages",detail:"Not wear & tear"},
                    {label:"Return Deadline",val:"31 days",detail:"After move-out in Oregon"},
                  ].map((s,i)=><div className="stat" key={i}><div className="stat-label">{s.label}</div><div className="stat-val" style={{fontSize:20}}>{s.val}</div><div className="stat-detail">{s.detail}</div></div>)}
                </div>
                <div className="card">
                  <div className="card-title">Move-In Documentation</div>
                  <div className="card-sub">Your best protection at move-out — timestamped evidence of pre-existing conditions</div>
                  {[
                    {icon:"📸",name:"Move-In Inspection Report",detail:"Aug 1, 2024 · 24 photos · Signed by both parties",status:"badge-green",statusLabel:"Signed"},
                    {icon:"🎥",name:"Move-In Video Walkthrough",detail:"Aug 1, 2024 · Uploaded to documents",status:"badge-green",statusLabel:"On file"},
                    {icon:"📝",name:"Lease Addendum — Existing Damage",detail:"Wall scuff in hallway noted",status:"badge-green",statusLabel:"Documented"},
                  ].map((d,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<2?"1px solid var(--border)":"none"}}>
                      <span style={{fontSize:20}}>{d.icon}</span>
                      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"var(--ink)"}}>{d.name}</div><div style={{fontSize:11,color:"var(--ink-muted)",marginTop:2}}>{d.detail}</div></div>
                      <span className={`badge ${d.status}`}>{d.statusLabel}</span>
                    </div>
                  ))}
                </div>
              </>}

              {depositTab==="deductions" && <>
                <div className="alert alert-blue"><span className="alert-icon">💡</span>
                  <div><div className="alert-title">Preparing for move-out?</div><div className="alert-text">Track potential deductions here before your landlord does. Compare against your move-in inspection to dispute anything that was pre-existing.</div></div>
                </div>
                <div className="card">
                  <div className="sec-hdr"><div className="sec-title">Deposit Itemization Tracker</div><button className="btn btn-sage">+ Add Item</button></div>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead><tr>{["Item","Landlord Claim","Your Notes","Status"].map(h=><th key={h} style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:"var(--ink-muted)",padding:"8px 10px",textAlign:"left",borderBottom:"1px solid var(--border)",fontWeight:600}}>{h}</th>)}</tr></thead>
                    <tbody>
                      {DEPOSIT_DEDUCTIONS.map((d,i)=>(
                        <tr key={i}>
                          <td style={{padding:"12px 10px",fontSize:13,color:"var(--ink)"}}>{d.item}</td>
                          <td style={{padding:"12px 10px",fontSize:13,color:"var(--ink-muted)"}}>—</td>
                          <td style={{padding:"12px 10px"}}><input className="form-input" style={{padding:"5px 8px",fontSize:12}} placeholder="Add note..."/></td>
                          <td style={{padding:"12px 10px"}}>
                            <span className={`badge ${d.status==="resolved"?"badge-green":d.status==="normal-wear"?"badge-sage":"badge-yellow"}`}>
                              {d.status==="tbd"?"Pending":d.status==="resolved"?"Resolved":"Normal wear"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{marginTop:16,padding:"12px 14px",background:"var(--surface2)",borderRadius:8,fontSize:12,color:"var(--ink-muted)"}}>
                    💡 Oregon law: Landlords cannot deduct for normal wear and tear. Keep your move-in inspection report handy to dispute any claim.
                  </div>
                </div>
              </>}

              {depositTab==="rights" && <>
                <div className="card">
                  <div className="card-title">Oregon Deposit Rights</div>
                  <div className="card-sub">What the law says about your money</div>
                  {[
                    ["Return timeline","31 days after move-out with itemized statement"],
                    ["What can be deducted","Unpaid rent, actual damages beyond normal wear"],
                    ["What cannot be deducted","Normal wear and tear, pre-existing damage you documented"],
                    ["If landlord misses deadline","May owe you 2× the deposit amount"],
                    ["Dispute process","Send written demand, then small claims court if unresolved"],
                  ].map(([k,v])=>(
                    <div className="deposit-row" key={k}>
                      <span style={{fontSize:13,color:"var(--ink-muted)",width:180,flexShrink:0}}>{k}</span>
                      <span style={{fontSize:13,color:"var(--ink)"}}>{v}</span>
                    </div>
                  ))}
                  <div style={{marginTop:16,display:"flex",gap:8}}>
                    <button className="btn btn-sage">Oregon Deposit Law Guide</button>
                    <button className="btn btn-outline">Dispute Letter Template</button>
                  </div>
                </div>
              </>}
            </div>}

            {/* ── MAINTENANCE ── */}
            {nav==="maintenance" && <div className="fade-in">
              <div className="alert alert-sage"><span className="alert-icon">📸</span>
                <div><div className="alert-title">Every request is timestamped and stored</div><div className="alert-text">Your maintenance history is your legal record. You can also submit anonymously if you're concerned about retaliation.</div></div>
              </div>
              <div className="sec-hdr">
                <div><div className="sec-title">Maintenance Requests</div><div className="sec-sub">{maintenanceList.length} total · {maintenanceList.filter(m=>m.status!=="resolved").length} open</div></div>
                <button className="btn btn-sage" onClick={()=>setShowMaintModal(true)}>+ New Request</button>
              </div>
              {maintenanceList.map(r=>(
                <div key={r.id} className="req-item">
                  <div className={`req-dot ${r.status==="open"?"dot-open":r.status==="in-progress"?"dot-progress":"dot-done"}`} />
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:13,fontWeight:600,color:"var(--ink)"}}>{r.title}</span>
                      {r.anon && <span className="badge badge-clay">Anonymous</span>}
                    </div>
                    <div style={{fontSize:12,color:"var(--ink-muted)"}}>{r.note}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{marginBottom:5}}><span className={`badge ${r.status==="open"?"badge-red":r.status==="in-progress"?"badge-yellow":"badge-green"}`}>{r.status==="in-progress"?"In Progress":r.status==="open"?"Open":"Resolved"}</span></div>
                    <div style={{fontSize:11,color:"var(--ink-muted)"}}>{r.submitted}</div>
                  </div>
                </div>
              ))}
            </div>}

            {/* ── DOCUMENTS ── */}
            {nav==="documents" && <div className="fade-in">
              <div className="alert alert-sage"><span className="alert-icon">🔒</span>
                <div><div className="alert-title">Your documents, your record</div><div className="alert-text">Everything here is timestamped and stored securely. Your move-in inspection and entry notices are your best protection at move-out.</div></div>
              </div>
              <div className="sec-hdr"><div className="sec-title">All Documents</div><button className="btn btn-outline">+ Upload</button></div>
              <div className="card" style={{padding:"8px 0"}}>
                {DOCS.map((d,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 18px",borderBottom:i<DOCS.length-1?"1px solid var(--border)":"none",cursor:"pointer"}}>
                    <span style={{fontSize:20}}>{d.icon}</span>
                    <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"var(--ink)"}}>{d.name}</div><div style={{fontSize:11,color:"var(--ink-muted)",marginTop:2}}>{d.detail}</div></div>
                    <span className="badge badge-sage">{d.tag}</span>
                    <span style={{fontSize:12,color:"var(--blue)",cursor:"pointer"}}>View →</span>
                  </div>
                ))}
              </div>
            </div>}

            {/* ── RTI TRACKER ── */}
            {nav==="rti" && <div className="fade-in">
              <div className="alert alert-sage"><span className="alert-icon">📊</span>
                <div><div className="alert-title">Rent-to-Income Tracker</div><div className="alert-text">The standard affordability rule: rent should be no more than 30% of your gross monthly income. Track yours here and plan ahead.</div></div>
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="card-title">Your Ratio</div>
                  <div className="card-sub">Based on current rent and income</div>
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:48,fontFamily:"Syne",fontWeight:700,color:rtiColor,lineHeight:1}}>{rti}%</div>
                    <div style={{fontSize:13,color:"var(--ink-muted)",marginTop:6}}>
                      {rtiStatus==="good" && "✅ Healthy — under the 30% guideline"}
                      {rtiStatus==="caution" && "⚠️ Caution — above the 30% guideline"}
                      {rtiStatus==="high" && "🔴 High — consider financial assistance resources"}
                    </div>
                  </div>
                  <div className="rti-meter">
                    <div className="rti-fill" style={{width:`${Math.min(rti,100)}%`,background:rtiColor}} />
                    <div className="rti-marker" style={{left:"30%"}} />
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--ink-muted)",marginTop:4}}>
                    <span>0%</span><span style={{color:"var(--success)"}}>30% ideal</span><span>50%+</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Adjust Income</div>
                  <div className="card-sub">Update to see how your ratio changes</div>
                  <div className="form-group">
                    <label className="form-label">Monthly Gross Income</label>
                    <input className="form-input" type="number" value={rtiIncome} onChange={e=>setRtiIncome(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Monthly Rent</label>
                    <input className="form-input" type="number" value={TENANT.rent} disabled style={{opacity:0.6}} />
                    <div className="form-hint">Rent pulled from your lease</div>
                  </div>
                  <div style={{background:"var(--surface2)",borderRadius:8,padding:"12px 14px",marginTop:4}}>
                    {[["Current Rent",`$${TENANT.rent.toLocaleString()}/mo`],["Your Income",`$${rtiIncome.toLocaleString()}/mo`],["Ratio",`${rti}%`]].map(([l,v])=>(
                      <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                        <span style={{color:"var(--ink-muted)"}}>{l}</span><span style={{fontWeight:600,color:"var(--ink)"}}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">What does this mean?</div>
                <div className="card-sub">Understanding rent affordability</div>
                {[
                  {range:"Under 30%",label:"Comfortable",desc:"You have room for savings, emergencies, and other expenses. This is the widely recommended threshold.",c:"badge-green"},
                  {range:"30–40%",label:"Stretched",desc:"Manageable for many, but leaves less buffer for unexpected costs. Consider building an emergency fund.",c:"badge-yellow"},
                  {range:"Over 40%",label:"Cost-Burdened",desc:"You may qualify for rent assistance programs. See Resources for Oregon emergency rental assistance options.",c:"badge-red"},
                ].map((r,i)=>(
                  <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<2?"1px solid var(--border)":"none",alignItems:"flex-start"}}>
                    <span className={`badge ${r.c}`} style={{flexShrink:0,marginTop:2}}>{r.range}</span>
                    <div><div style={{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:2}}>{r.label}</div><div style={{fontSize:12,color:"var(--ink-muted)",lineHeight:1.5}}>{r.desc}</div></div>
                  </div>
                ))}
                {rtiStatus !== "good" && <div style={{marginTop:14}}><button className="btn btn-sage" onClick={()=>setNav("resources")}>Find Rent Assistance →</button></div>}
              </div>
            </div>}

            {/* ── RENTERS INSURANCE ── */}
            {nav==="insurance" && <div className="fade-in">
              <div className="tabs">
                {[["marketplace","Marketplace"],["coverage","My Coverage"],["learn","What's Covered"]].map(([v,l])=>(
                  <button key={v} className={`tab ${insTab===v?"active":""}`} onClick={()=>setInsTab(v)}>{l}</button>
                ))}
              </div>

              {insTab==="marketplace" && <>
                <div className="alert alert-clay"><span className="alert-icon">🛡️</span>
                  <div><div className="alert-title">You don't have renters insurance on file</div><div className="alert-text">Your landlord may require it. More importantly — your belongings aren't covered by their policy.</div></div>
                </div>
                {INSURANCE_OPTIONS.map((ins,i)=>(
                  <div key={i} className="ins-card">
                    <div className="ins-icon" style={{background:ins.popular?"var(--sage-light)":"var(--surface2)"}}>{ins.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                        <span style={{fontSize:14,fontWeight:600,color:"var(--ink)",fontFamily:"Syne"}}>{ins.name}</span>
                        {ins.popular && <span className="badge badge-sage">Most popular</span>}
                      </div>
                      <div style={{fontSize:12,color:"var(--ink-muted)"}}>{ins.coverage} · ⭐ {ins.rating}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontFamily:"Syne",fontSize:18,fontWeight:700,color:"var(--sage-dark)",marginBottom:6}}>{ins.price}</div>
                      <button className="btn btn-sage" style={{fontSize:12,padding:"6px 14px"}}>Get Quote</button>
                    </div>
                  </div>
                ))}
              </>}

              {insTab==="coverage" && <div className="card">
                <div className="card-title">Your Coverage Status</div>
                <div className="card-sub">Upload your policy to keep it on file</div>
                <div style={{textAlign:"center",padding:"32px 20px",color:"var(--ink-muted)"}}>
                  <div style={{fontSize:36,marginBottom:12}}>🛡️</div>
                  <div style={{fontSize:15,fontWeight:600,color:"var(--ink)",marginBottom:6,fontFamily:"Syne"}}>No policy on file</div>
                  <div style={{fontSize:13,lineHeight:1.6,marginBottom:18}}>Upload your renters insurance policy to store it securely and share proof with your landlord.</div>
                  <button className="btn btn-sage">Upload Policy</button>
                </div>
              </div>}

              {insTab==="learn" && <div className="card">
                <div className="card-title">What does renters insurance cover?</div>
                <div className="card-sub">Most policies include three main protections</div>
                {[
                  {icon:"📦",title:"Personal Property",desc:"Covers theft, fire, and water damage to your belongings — furniture, electronics, clothing, and more. Your landlord's policy does NOT cover your stuff."},
                  {icon:"⚖️",title:"Liability",desc:"If someone is injured in your apartment and sues you, liability coverage protects you up to your policy limit. Often $100K standard."},
                  {icon:"🏨",title:"Loss of Use",desc:"If your unit becomes uninhabitable due to a covered event, this pays for hotel and living costs while repairs are made."},
                  {icon:"🚗",title:"What's NOT covered",desc:"Floods, earthquakes, and car theft are typically excluded. Your landlord's policy only covers the building structure — not your belongings inside."},
                ].map((c,i)=>(
                  <div key={i} style={{display:"flex",gap:12,padding:"13px 0",borderBottom:i<3?"1px solid var(--border)":"none",alignItems:"flex-start"}}>
                    <div style={{width:36,height:36,background:"var(--surface2)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{c.icon}</div>
                    <div><div style={{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:3,fontFamily:"Syne"}}>{c.title}</div><div style={{fontSize:12,color:"var(--ink-muted)",lineHeight:1.5}}>{c.desc}</div></div>
                  </div>
                ))}
              </div>}
            </div>}

            {/* ── RESOURCES ── */}
            {nav==="resources" && <div className="fade-in">
              <div style={{marginBottom:20}}>
                <div className="sec-title">Resources built for renters</div>
                <div style={{fontSize:13,color:"var(--ink-muted)",marginTop:4}}>Oregon-specific programs, legal help, financial tools, and advocacy.</div>
              </div>
              <div className="tabs">
                {[["all","All"],["financial","Financial"],["legal","Legal"],["rights","Rights"],["advocacy","Advocacy"],["tools","Tools"]].map(([v,l])=>(
                  <button key={v} className={`tab ${resourceTab===v?"active":""}`} onClick={()=>setResourceTab(v)}>{l}</button>
                ))}
              </div>
              <div className="resource-grid">
                {filteredResources.map((r,i)=>(
                  <div key={i} className="resource-card">
                    <div className={`resource-icon ${r.cls}`}>{r.icon}</div>
                    <div><div className="resource-title">{r.title}</div><div className="resource-desc">{r.desc}</div><div className="resource-tag">{r.tag}</div></div>
                  </div>
                ))}
              </div>
            </div>}

            {/* ── RIGHTS ── */}
            {nav==="rights" && <div className="fade-in">
              <div className="alert alert-sage"><span className="alert-icon">⚖️</span>
                <div><div className="alert-title">Oregon Tenant Rights — Updated 2026</div><div className="alert-text">These rights apply to most residential tenants in Oregon. Always confirm with a local attorney or legal aid for your specific situation.</div></div>
              </div>
              {TENANT_RIGHTS.map((item,i)=>(
                <div key={i} className="accordion">
                  <div className="accordion-hdr" onClick={()=>setAccordionOpen(accordionOpen===i?null:i)}>
                    <span>{item.title}</span><span style={{color:"var(--ink-muted)",fontSize:11}}>{accordionOpen===i?"▲":"▼"}</span>
                  </div>
                  {accordionOpen===i && <div className="accordion-body">{item.body}</div>}
                </div>
              ))}
              <div style={{marginTop:16}} className="resource-grid">
                {[{icon:"📞",cls:"ri-sage",title:"Oregon Renters' Rights Hotline",desc:"Free legal advice for Oregon tenants.",tag:"1-503-224-4086 →"},
                  {icon:"🏛️",cls:"ri-clay",title:"Oregon Law Center",desc:"Free civil legal services for income-qualifying Oregonians.",tag:"oregonlawcenter.org →"}].map((r,i)=>(
                  <div key={i} className="resource-card">
                    <div className={`resource-icon ${r.cls}`}>{r.icon}</div>
                    <div><div className="resource-title">{r.title}</div><div className="resource-desc">{r.desc}</div><div className="resource-tag">{r.tag}</div></div>
                  </div>
                ))}
              </div>
            </div>}

            {/* ── IS THIS NORMAL ── */}
            {nav==="normal" && <div className="fade-in">
              <div className="alert alert-blue"><span className="alert-icon">💬</span>
                <div><div className="alert-title">Is This Normal?</div><div className="alert-text">Common renting questions answered plainly — with Oregon-specific context so you know your rights.</div></div>
              </div>
              <div className="tabs">
                {[["all","All Questions"],["no","Not Normal"],["yes","Required"],["depends","It Depends"]].map(([v,l])=>(
                  <button key={v} className={`tab ${normalFilter===v?"active":""}`} onClick={()=>setNormalFilter(v)}>{l}</button>
                ))}
              </div>
              {filteredNormal.map((item,i)=>(
                <div key={i} className="normal-card" onClick={()=>setNormalOpen(normalOpen===i?null:i)}>
                  <div className="normal-hdr">
                    <span style={{fontSize:13,fontWeight:600,color:"var(--ink)",fontFamily:"Syne"}}>{item.q}</span>
                    <span className={`normal-verdict ${item.verdict==="yes"?"verdict-yes":item.verdict==="no"?"verdict-no":"verdict-depends"}`}>{item.verdictLabel}</span>
                  </div>
                  {normalOpen===i && <div className="normal-body">{item.body}</div>}
                </div>
              ))}
              <div style={{marginTop:20}} className="resource-grid">
                {[{icon:"⚖️",cls:"ri-sage",title:"Still unsure? Get free legal advice",desc:"Oregon Renters' Rights Hotline — free for all Oregon tenants.",tag:"Call now →"},
                  {icon:"📝",cls:"ri-clay",title:"Submit your own question",desc:"Can't find your situation? Ask and we'll add it to the guide.",tag:"Ask a question →"}].map((r,i)=>(
                  <div key={i} className="resource-card">
                    <div className={`resource-icon ${r.cls}`}>{r.icon}</div>
                    <div><div className="resource-title">{r.title}</div><div className="resource-desc">{r.desc}</div><div className="resource-tag">{r.tag}</div></div>
                  </div>
                ))}
              </div>
            </div>}

          </div>
        </div>

        {/* MAINTENANCE MODAL */}
        {showMaintModal && (
          <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowMaintModal(false)}>
            <div className="modal">
              {submitted ? (
                <div style={{textAlign:"center",padding:"32px 20px"}}>
                  <div style={{fontSize:36,marginBottom:10}}>✅</div>
                  <div className="modal-title" style={{textAlign:"center",marginBottom:4}}>Request submitted</div>
                  <div style={{fontSize:13,color:"var(--ink-muted)"}}>{maintForm.anonymous?"Submitted anonymously — ":""}Timestamped Apr 7, 2026. Your landlord has been notified.</div>
                </div>
              ) : <>
                <div className="modal-title">New Maintenance Request</div>
                <div className="modal-sub">Timestamped and stored as part of your permanent record</div>
                <div className="form-group">
                  <label className="form-label">Issue title</label>
                  <input className="form-input" placeholder="e.g. Kitchen sink not draining" value={maintForm.title} onChange={e=>setMaintForm({...maintForm,title:e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-select" value={maintForm.priority} onChange={e=>setMaintForm({...maintForm,priority:e.target.value})}>
                    <option>Low</option><option>Medium</option><option>High</option><option>Emergency</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" placeholder="Describe the issue, when it started, and any verbal communication with your landlord..." value={maintForm.description} onChange={e=>setMaintForm({...maintForm,description:e.target.value})} />
                </div>
                <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:8,padding:"12px 14px",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <input type="checkbox" id="anon" checked={maintForm.anonymous} onChange={e=>setMaintForm({...maintForm,anonymous:e.target.checked})} style={{marginTop:2,accentColor:"var(--sage-dark)"}} />
                    <div>
                      <label htmlFor="anon" style={{fontSize:13,fontWeight:500,color:"var(--ink)",cursor:"pointer"}}>Submit anonymously</label>
                      <div style={{fontSize:11,color:"var(--ink-muted)",marginTop:2,lineHeight:1.5}}>Your identity is hidden from your landlord. The request is still timestamped and sent. Use this if you're concerned about retaliation.</div>
                    </div>
                  </div>
                </div>
                <div style={{fontSize:11,color:"var(--ink-muted)",background:"var(--sage-light)",borderRadius:7,padding:"9px 12px"}}>
                  💡 Oregon tip: Written notice starts your landlord's legal repair clock — 24hrs for emergencies, 30 days for non-emergency.
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={()=>setShowMaintModal(false)}>Cancel</button>
                  <button className="btn btn-sage" onClick={submitRequest}>Submit & Timestamp</button>
                </div>
              </>}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
