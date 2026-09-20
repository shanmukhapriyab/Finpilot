import { useRef, useState, type ChangeEvent } from 'react'
import { ArrowUpRight, Bell, Bot, CalendarDays, ChevronDown, CircleHelp, CreditCard, FileUp, Grid2X2, Menu, MoreHorizontal, PiggyBank, Search, Settings, Sparkles, Target, TrendingUp, UploadCloud, WalletCards, X } from 'lucide-react'
import './App.css'

const navItems = [
  { label: 'Overview', icon: Grid2X2 }, { label: 'Transactions', icon: CreditCard },
  { label: 'Subscriptions', icon: WalletCards }, { label: 'Goals', icon: Target },
  { label: 'Goal Simulator', icon: TrendingUp }, { label: 'Paycheck Planner', icon: CalendarDays },
  { label: 'AI Assistant', icon: Bot },
]

const transactions = [
  { merchant: 'Whole Foods Market', detail: 'Today, 10:42 AM', category: 'Food & Dining', amount: '-₹2,840', tone: 'orange', badge: 'WF' },
  { merchant: 'Netflix', detail: 'Yesterday, 8:15 PM', category: 'Subscriptions', amount: '-₹649', tone: 'red', badge: 'N' },
  { merchant: 'Acme Technologies', detail: 'Sep 18, 9:00 AM', category: 'Income', amount: '+₹85,000', tone: 'blue', badge: 'A' },
  { merchant: 'Uber', detail: 'Sep 17, 6:23 PM', category: 'Transportation', amount: '-₹482', tone: 'black', badge: 'U' },
]

function LandingPage({ onEnter }: { onEnter: () => void }) {
  return <div className="landing-page">
    <header className="landing-nav"><div className="brand landing-brand"><span className="brand-mark">F</span><span>FinPilot</span></div><div className="landing-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#security">Security</a></div><button className="landing-login" onClick={onEnter}>Log in <ArrowUpRight size={15} /></button></header>
    <main>
      <section className="landing-hero"><div className="hero-copy"><p className="hero-kicker"><span /> PERSONAL FINANCE, MADE CLEAR</p><h1>Understand your money.<br /><em>Plan your next move.</em></h1><p className="hero-subcopy">FinPilot turns your financial data into clear insights, smarter spending plans, and actionable goals. All in one calm, focused place.</p><div className="hero-actions"><button className="hero-primary" onClick={onEnter}>Get started <ArrowUpRight size={17} /></button><a className="hero-secondary" href="#features">Explore FinPilot <span>↓</span></a></div><div className="hero-proof"><div className="proof-avatars"><span>AR</span><span>MK</span><span>JP</span></div><span>Built for everyday decisions<br /><strong>Private by design</strong></span></div></div><div className="hero-visual"><div className="visual-glow" /><div className="mini-dashboard"><div className="mini-top"><span className="mini-logo">F</span><span>Overview</span><span className="mini-dots">•••</span></div><div className="mini-balance"><span>Total balance</span><strong>₹1,24,850</strong><small>↗ 12.8% this month</small></div><div className="mini-bars">{[38, 58, 45, 68, 52, 79, 63, 92, 70, 84].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="mini-bottom"><div><span>Monthly savings</span><strong>₹32,600</strong></div><div className="mini-ring"><span>38%</span></div></div></div><div className="float-note note-one"><Sparkles size={15} /><span><strong>FinPilot insight</strong><br />You’re on track this month.</span></div><div className="float-note note-two"><Target size={16} /><span><strong>Emergency fund</strong><br />56% complete</span></div></div></section>
      <section className="feature-strip" id="features"><div><p className="eyebrow">ONE CLEAR VIEW</p><h2>Everything you need to feel<br />in control of your money.</h2></div><div className="feature-list"><span><Sparkles size={17} /> Smart insights</span><span><Target size={17} /> Goal simulator</span><span><CalendarDays size={17} /> Paycheck planner</span><span><Bot size={17} /> AI assistant</span></div></section>
      <section className="how-section" id="how-it-works"><p className="eyebrow">HOW IT WORKS</p><h2>From financial noise<br /><em>to a next move.</em></h2><div className="steps"><article><span>01</span><h3>Bring it together.</h3><p>Upload statements, bills, or expense records. FinPilot keeps the details organized.</p></article><article><span>02</span><h3>See the pattern.</h3><p>Understand spending, recurring commitments, and the moments that shape your cash flow.</p></article><article><span>03</span><h3>Make a plan.</h3><p>Simulate tradeoffs, prepare for payday, and turn a goal into a practical monthly habit.</p></article></div></section>
      <section className="landing-security" id="security"><div><p className="eyebrow">PRIVATE BY DESIGN</p><h2>Your money stays yours.</h2><p>FinPilot is a financial awareness tool, not an investment advisor. Your data is handled with care, clarity, and purpose.</p></div><button className="security-chip"><span /> Secure workspace <ArrowUpRight size={15} /></button></section>
    </main><footer className="landing-footer"><span>© 2026 FinPilot</span><span>Clearer money. Better next moves.</span></footer>
  </div>
}

function SectionView({ section, onUpload }: { section: string; onUpload: () => void }) {
  const sectionData: Record<string, { eyebrow: string; title: string; description: string; action: string }> = {
    Transactions: { eyebrow: 'TRANSACTION MANAGEMENT', title: 'Your financial activity, organized.', description: 'Search, categorize, and annotate every transaction from one clear view.', action: 'Upload transactions' },
    Subscriptions: { eyebrow: 'SUBSCRIPTION INTELLIGENCE', title: 'Know what renews next.', description: 'Track recurring payments, renewal dates, and the services you may want to review.', action: 'Import subscriptions' },
    Goals: { eyebrow: 'GOAL MANAGEMENT', title: 'Make progress feel visible.', description: 'Create savings goals, set a target date, and keep your monthly contribution on track.', action: 'Add a goal' },
    'Goal Simulator': { eyebrow: 'SIGNATURE FEATURE', title: 'What happens if you change your spending?', description: 'Adjust a category and see how quickly your goal could move. Your plan updates instantly.', action: 'Open simulator' },
    'Paycheck Planner': { eyebrow: 'PAYCHECK PLANNER', title: 'Spend with more confidence.', description: 'See what is committed before payday and calculate a safe daily spending amount.', action: 'Plan my paycheck' },
    'AI Assistant': { eyebrow: 'FINPILOT AI', title: 'Ask better money questions.', description: 'Get clear answers about your uploaded financial activity, recurring payments, and goals.', action: 'Upload data' },
  }
  const data = sectionData[section]
  if (!data) return null
  return <section className="section-view"><p className="eyebrow">{data.eyebrow}</p><h1>{data.title}</h1><p className="section-description">{data.description}</p><div className="section-actions"><button className="upload-btn" onClick={onUpload}><UploadCloud size={17} /> {data.action}</button><div className="section-status"><span className="privacy-dot" />Connected to your private workspace</div></div><div className="section-preview"><div className="preview-line wide" /><div className="preview-line" /><div className="preview-grid"><span /><span /><span /></div></div></section>
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')
  const [range, setRange] = useState('30 days')
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadState, setUploadState] = useState<'idle' | 'processing' | 'done'>('idle')
  const [uploadedFile, setUploadedFile] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [foodCut, setFoodCut] = useState(30)
  const simulatedSavings = 32600 + foodCut * 42
  const monthsToGoal = Math.max(3.8, 6.7 - foodCut / 25)

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadedFile(file.name)
    setUploadState('processing')
    window.setTimeout(() => setUploadState('done'), 1200)
  }

  const openUpload = () => {
    setShowUpload(true)
    setUploadState('idle')
  }

  if (!showDashboard) return <LandingPage onEnter={() => setShowDashboard(true)} />

  return (
    <div className="app-shell">
      <aside className={`sidebar ${showMobileNav ? 'is-open' : ''}`}>
        <div className="brand"><span className="brand-mark">F</span><span>FinPilot</span></div>
        <div className="workspace-label">PERSONAL WORKSPACE</div>
        <nav>{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setShowMobileNav(false) }}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'AI Assistant' && <span className="new-pill">NEW</span>}</button>)}</nav>
        <div className="sidebar-bottom"><button className="nav-item"><Settings size={17} strokeWidth={1.8} /><span>Settings</span></button><div className="privacy-note"><span className="privacy-dot" />Your data is private<br /><strong>and secure</strong></div><div className="profile-mini"><div className="avatar">AR</div><div><strong>Alex Rivera</strong><span>Free plan</span></div><MoreHorizontal size={17} /></div></div>
      </aside>
      {showMobileNav && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setShowMobileNav(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu" onClick={() => setShowMobileNav(true)}>{showMobileNav ? <X size={20} /> : <Menu size={20} />}</button><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-btn" aria-label="Search"><Search size={18} /></button><button className="icon-btn has-notification" aria-label="Notifications"><Bell size={18} /></button><button className="help-btn"><CircleHelp size={16} /> Help</button><div className="top-avatar">AR</div></div></header>
        {activeNav !== 'Overview' ? <SectionView section={activeNav} onUpload={openUpload} /> : <div className="page-content">
          <section className="welcome-row"><div><p className="eyebrow">SATURDAY, SEPTEMBER 20, 2026</p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="muted">Here’s your financial pulse at a glance.</p></div><button className="upload-btn" onClick={openUpload}><UploadCloud size={17} /> Upload data</button></section>
          <section className="summary-grid"><article className="summary-card dark-card"><div className="card-label">TOTAL BALANCE <span className="card-icon"><WalletCards size={15} /></span></div><strong className="summary-number">₹1,24,850</strong><div className="trend positive"><ArrowUpRight size={14} /> 12.8% <span>vs last month</span></div><div className="sparkline light-line" /></article><article className="summary-card"><div className="card-label">MONTHLY INCOME <span className="card-icon blue"><TrendingUp size={15} /></span></div><strong className="summary-number">₹85,000</strong><div className="trend positive"><ArrowUpRight size={14} /> 8.4% <span>vs last month</span></div><div className="sparkline blue-line" /></article><article className="summary-card"><div className="card-label">MONTHLY SPENDING <span className="card-icon orange"><CreditCard size={15} /></span></div><strong className="summary-number">₹52,400</strong><div className="trend negative"><ArrowUpRight size={14} /> 4.2% <span>vs last month</span></div><div className="sparkline orange-line" /></article><article className="summary-card"><div className="card-label">SAVINGS RATE <span className="card-icon green"><PiggyBank size={15} /></span></div><strong className="summary-number">38.4%</strong><div className="trend positive"><ArrowUpRight size={14} /> 2.1% <span>vs last month</span></div><div className="progress-track"><div style={{ width: '64%' }} /></div><span className="progress-caption">On track for your 40% goal</span></article></section>
          <section className="main-grid"><article className="panel spending-panel"><div className="panel-heading"><div><p className="eyebrow">SPENDING ANALYSIS</p><h2>Where your money goes</h2></div><button className="select-btn">This month <ChevronDown size={15} /></button></div><div className="donut-wrap"><div className="donut"><div className="donut-hole"><strong>₹52,400</strong><span>Total spent</span></div></div><div className="legend">{[['Food & Dining', '₹14,620', 'orange'], ['Bills & Utilities', '₹12,400', 'blue'], ['Shopping', '₹8,830', 'pink'], ['Transport', '₹6,250', 'yellow'], ['Other', '₹10,300', 'gray']].map(([label, value, tone]) => <div className="legend-row" key={label}><span className={`legend-dot ${tone}`} /><span>{label}</span><strong>{value}</strong></div>)}</div></div><div className="insight-inline"><Sparkles size={16} /><span><strong>Food & Dining</strong> is up 24% this month. Mostly weekend orders.</span><ArrowUpRight size={15} /></div></article><article className="panel cashflow-panel"><div className="panel-heading"><div><p className="eyebrow">CASH FLOW</p><h2>Income vs expenses</h2></div><div className="range-tabs">{['7 days', '30 days', '6 months', '1 year'].map(item => <button key={item} className={range === item ? 'active' : ''} onClick={() => setRange(item)}>{item}</button>)}</div></div><div className="chart-meta"><div><span className="chart-dot income" />Income <strong>₹85,000</strong></div><div><span className="chart-dot expense" />Expenses <strong>₹52,400</strong></div></div><div className="bar-chart"><div className="grid-lines"><i /><i /><i /><i /></div>{[58, 72, 48, 78, 62, 92, 70, 84, 58, 76, 68, 88].map((height, index) => <div className="bar-group" key={index}><div className="bar income-bar" style={{ height: `${height}%` }} /><div className="bar expense-bar" style={{ height: `${Math.max(24, height - 24)}%` }} /></div>)}</div><div className="chart-labels"><span>Oct 01</span><span>Oct 08</span><span>Oct 15</span><span>Oct 22</span><span>Oct 29</span></div></article></section>
          <section className="lower-grid"><article className="panel transactions-panel"><div className="panel-heading"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Latest transactions</h2></div><button className="text-btn">View all <ArrowUpRight size={15} /></button></div><div className="transaction-list">{transactions.map(item => <div className="transaction" key={item.merchant}><div className={`merchant-icon ${item.tone}`}>{item.badge}</div><div className="transaction-info"><strong>{item.merchant}</strong><span>{item.detail} · {item.category}</span></div><strong className={item.amount.startsWith('+') ? 'amount income-amount' : 'amount'}>{item.amount}</strong></div>)}</div></article><article className="panel goal-panel"><div className="panel-heading"><div><p className="eyebrow">GOAL SIMULATOR</p><h2>Emergency fund</h2></div><button className="more-btn" aria-label="More options"><MoreHorizontal size={18} /></button></div><div className="goal-copy"><strong>₹28,000 <span>/ ₹50,000</span></strong><span className="goal-percent">56%</span></div><div className="goal-track"><div style={{ width: '56%' }} /></div><div className="goal-caption"><span>Target: Mar 2027</span><span>₹5,000 / month</span></div><div className="simulator-box"><div className="sim-head"><span><Sparkles size={14} /> Simulate your plan</span><span className="saved-chip">AI ready</span></div><label>Reduce Food & Dining <strong>₹{foodCut * 100}</strong></label><input type="range" min="0" max="50" value={foodCut} onChange={event => setFoodCut(Number(event.target.value))} /><div className="simulation-result"><div><span>New monthly savings</span><strong>₹{simulatedSavings.toLocaleString('en-IN')}</strong></div><div><span>Goal reached in</span><strong>{monthsToGoal.toFixed(1)} months</strong></div></div></div></article></section>
          <section className="bottom-grid"><article className="assistant-banner"><div className="assistant-icon"><Bot size={22} /></div><div><p className="eyebrow">FINPILOT INSIGHT</p><h2>You’re building a healthy buffer.</h2><p>Your spending is on track this month. You have <strong>₹9,430</strong> safe to spend before your next paycheck.</p></div><button className="dark-outline-btn" onClick={() => setActiveNav('AI Assistant')}>Ask FinPilot <ArrowUpRight size={15} /></button></article><article className="upload-panel"><div className="upload-icon"><FileUp size={20} /></div><div><h3>Bring in your latest data</h3><p>{uploadedFile || 'Upload a CSV, PDF or bank statement.'}</p></div><button className="small-upload" aria-label="Upload file" onClick={openUpload}><UploadCloud size={17} /></button></article></section>
          <footer><span>FinPilot is a financial awareness tool, not investment advice.</span><span>Last synced 2 min ago <span className="sync-dot" /></span></footer>
        </div>}
      </main>
      {showUpload && <div className="upload-overlay" role="dialog" aria-modal="true" aria-label="Upload financial data"><div className="upload-dialog"><button className="dialog-close" onClick={() => setShowUpload(false)} aria-label="Close upload dialog"><X size={18} /></button><div className="dialog-icon"><FileUp size={22} /></div><p className="eyebrow">IMPORT FINANCIAL DATA</p><h2>Bring your money into focus.</h2><p className="dialog-copy">Upload a CSV, Excel, PDF, or TXT file. FinPilot will categorize transactions and find recurring payments.</p><button className="drop-zone" onClick={() => fileInputRef.current?.click()}><UploadCloud size={23} /><strong>{uploadState === 'processing' ? 'Analyzing your file...' : uploadState === 'done' ? 'File analyzed successfully' : 'Choose a file to upload'}</strong><span>{uploadedFile || 'or drag and drop it here'}</span></button><input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls,.pdf,.txt" onChange={handleFile} hidden />{uploadState === 'processing' && <div className="upload-progress"><span /> Reading transactions · Categorizing expenses · Detecting recurring payments</div>}{uploadState === 'done' && <div className="upload-success">✓ {uploadedFile} is ready. Your dashboard has been updated.</div>}<button className="dialog-secondary" onClick={() => setShowUpload(false)}>Done</button></div></div>}
    </div>
  )
}

export default App
