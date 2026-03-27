import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, ShieldCheck, Briefcase, 
  Map, ChevronRight, Bot, Sparkles, PieChart, 
  ArrowRight, Phone, Mail, MapPin, Activity, Check,
  Target, Zap, Users, Calculator, BookOpen, Star, 
  ArrowUpRight, BarChart3, Quote, ChevronDown,
  Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

// --- AIO & SEO Metadata Simulation ---
const schemaData = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Ask Geo",
  "description": "Expert financial planning, wealth management, and portfolio management in Pune, India.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jai Ganesh Vision, B Wing, BR-2, Office No. 319",
    "addressLocality": "Akurdi, Pune",
    "postalCode": "411035",
    "addressCountry": "IN"
  },
  "telephone": "+919960624271"
};

// --- Custom Animation Wrapper Component ---
// This handles the buttery-smooth scroll reveals throughout the site.
const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const translateMap = {
    up: 'translate-y-12',
    down: '-translate-y-12',
    left: 'translate-x-12',
    right: '-translate-x-12',
    none: 'translate-y-0 translate-x-0 scale-95'
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${translateMap[direction]}`
      } ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Animated Number Component ---
const AnimatedNumber = ({ end, suffix = "", prefix = "", decimals = 0, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const domRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOut
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={domRef}>
      {prefix}{(count).toFixed(decimals)}{suffix}
    </span>
  );
};

// --- Animated Progress Bar Component ---
const AnimatedProgress = ({ width, delay = 0 }) => {
  const domRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.disconnect();
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden" ref={domRef}>
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-[1500ms] ease-out relative"
        style={{ width: isVisible ? width : '0%' }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40 rounded-full blur-[2px] animate-pulse"></div>
      </div>
    </div>
  );
};

// --- ABOUT PAGE COMPONENT ---
const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Section 1: Hero */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-zinc-950 mb-8 leading-[1.05]">
            Driven by data. <br />
            <span className="font-medium text-emerald-600">Defined by trust.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-2xl leading-relaxed mb-10">
            Ask Geo was founded on a singular vision: to bring institutional-grade financial strategies to individual investors with absolute transparency.
          </p>
        </FadeIn>
      </section>

      {/* Section 2: Genesis */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="aspect-square bg-zinc-50 rounded-[3rem] p-12 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-50 group-hover:scale-105 transition-transform duration-700"></div>
              <Quote className="w-16 h-16 text-emerald-600/20 relative z-10 mb-6" strokeWidth={1}/>
              <h3 className="text-3xl font-light relative z-10 text-zinc-900 leading-tight">"Wealth creation shouldn't be a black box. Our goal is absolute clarity."</h3>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl font-light tracking-tighter mb-6">Our Genesis</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-6">
              For years, the financial advisory industry has thrived on complexity, jargon, and hidden fees. Ask Geo was created to dismantle that complexity. 
            </p>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-8">
              We realized that true financial freedom comes when clients deeply understand their portfolios. By combining advanced AI analytics with human empathy, we've built a platform where your goals are the only metrics that matter. We don't just manage money; we educate, empower, and elevate our investors.
            </p>
            <div className="flex gap-8 border-t border-zinc-100 pt-8">
               <div>
                 <p className="text-2xl font-medium text-zinc-900 mb-1">2015</p>
                 <p className="text-xs text-zinc-400 tracking-widest uppercase">Established</p>
               </div>
               <div>
                 <p className="text-2xl font-medium text-zinc-900 mb-1">Pune</p>
                 <p className="text-xs text-zinc-400 tracking-widest uppercase">Headquarters</p>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Core Principles */}
      <section className="bg-zinc-950 text-white py-32 px-6 lg:px-12 my-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">The Ask Geo Pillars</h2>
            <p className="text-lg text-zinc-400 font-light max-w-2xl">The non-negotiable principles that guide every portfolio decision we make.</p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Radical Transparency", desc: "No hidden loads, no opaque commissions. You see exactly what we see." },
              { title: "Data-Backed", desc: "Emotions destroy wealth. We rely on quantitative models and AI insights." },
              { title: "Fiduciary Duty", desc: "Your interests always precede ours. We grow only when your portfolio grows." },
              { title: "Holistic Planning", desc: "We look beyond mere returns, focusing on taxation, risk, and succession." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up" className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors">
                <div className="text-emerald-500 font-mono text-sm mb-6">0{idx + 1}</div>
                <h4 className="text-xl font-medium mb-4">{item.title}</h4>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Leadership */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
         <div className="flex flex-col md:flex-row gap-16">
            <FadeIn className="md:w-1/3">
              <h2 className="text-4xl font-light tracking-tighter mb-6">Leadership</h2>
              <div className="aspect-[3/4] bg-zinc-100 rounded-[2.5rem] relative overflow-hidden group">
                 <img src="https://static.wixstatic.com/media/548938_b7e4824e0e084ad59adf9a725e61dbdb~mv2.jpeg" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="text-2xl font-medium text-white">Geo Thomas</h3>
                    <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mt-1">Founder & Chief Advisor</p>
                 </div>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="md:w-2/3 flex flex-col justify-center">
              <Quote className="w-12 h-12 text-zinc-200 mb-6" strokeWidth={1} />
              <p className="text-2xl font-light leading-relaxed text-zinc-800 mb-8">
                "I started Ask Geo because I saw a massive gap between what institutions were doing to grow wealth and what retail investors were being sold. I wanted to level the playing field."
              </p>
              <p className="text-lg font-light text-zinc-500 leading-relaxed mb-6">
                Geo brings over 15 years of deep market experience, holding AMFI certifications and a profound understanding of macroeconomic cycles. His approach combines rigorous mathematical modeling with a deep understanding of human behavioral finance.
              </p>
              <p className="text-lg font-light text-zinc-500 leading-relaxed">
                Under his leadership, Ask Geo has grown to manage over 133K Crore in AUM, maintaining an impressive historic XIRR benchmark by staying disciplined, avoiding market noise, and focusing strictly on compounding.
              </p>
            </FadeIn>
         </div>
      </section>

      {/* Section 5: The Difference */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn className="mb-16">
          <h2 className="text-4xl font-light tracking-tighter mb-4">The Ask Geo Difference</h2>
          <p className="text-lg text-zinc-500 font-light">Why investors switch to us and never leave.</p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="border border-zinc-200 rounded-[2.5rem] overflow-hidden">
            <div className="grid grid-cols-2 border-b border-zinc-200 bg-zinc-50">
              <div className="p-8 font-medium text-zinc-500 tracking-widest uppercase text-xs">Traditional Advisors</div>
              <div className="p-8 font-medium text-emerald-600 tracking-widest uppercase text-xs border-l border-zinc-200 bg-emerald-50/30">Ask Geo Architecture</div>
            </div>
            {[
              ["Product-focused selling", "Client-goal focused architecture"],
              ["Reactive to market news", "Proactive AI-driven rebalancing"],
              ["Opaque fee structures", "100% transparent alignment"],
              ["Generic, one-size-fits-all models", "Hyper-personalized quantitative mapping"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b last:border-0 border-zinc-100">
                <div className="p-8 text-zinc-500 font-light">{row[0]}</div>
                <div className="p-8 text-zinc-900 font-medium border-l border-zinc-100 flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" strokeWidth={2}/> {row[1]}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Section 6: Footprint */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[80px]"></div>
           <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center md:text-left">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Our footprint today.</h2>
                <p className="text-emerald-100 font-light">Numbers that speak for the trust we've built.</p>
              </FadeIn>
              <FadeIn delay={150} className="flex flex-col justify-center">
                <p className="text-6xl font-light mb-2"><AnimatedNumber end={26} suffix="L+" /></p>
                <p className="text-sm font-medium tracking-widest uppercase text-emerald-200">Families Secured</p>
              </FadeIn>
              <FadeIn delay={300} className="flex flex-col justify-center">
                <p className="text-6xl font-light mb-2"><AnimatedNumber end={133} suffix="K" /> <span className="text-3xl">Cr</span></p>
                <p className="text-sm font-medium tracking-widest uppercase text-emerald-200">Assets Managed</p>
              </FadeIn>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE COMPONENT ---
const ServicesPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Section 1: Hero */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-zinc-950 mb-8 leading-[1.05]">
            Comprehensive <br />
            <span className="font-medium text-emerald-600">Financial Architecture.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-2xl leading-relaxed mb-10">
            We don't just pick funds. We build robust, tax-efficient, and inflation-beating systems tailored to your exact life stage.
          </p>
        </FadeIn>
      </section>

      {/* Section 2: Wealth Management */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-8">
              <Briefcase className="w-8 h-8 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-light tracking-tighter mb-6">Wealth Management</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-6">
              Our core offering. We look at your entire financial landscape—assets, liabilities, cash flow, and goals—to engineer a comprehensive strategy that preserves capital while seeking aggressive growth where appropriate.
            </p>
            <ul className="space-y-4 mb-8">
              {['Goal-based SIP structuring', 'Lumpsum deployment strategies', 'Asset allocation modeling', 'Retirement corpus planning'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light"><Check className="w-5 h-5 text-emerald-500" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => alert("Detailed page coming soon!")} className="text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              VIEW DETAILED STRATEGY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
          <FadeIn delay={200} className="order-1 md:order-2">
            <div className="aspect-[4/3] bg-zinc-50 rounded-[3rem] border border-zinc-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent"></div>
               <PieChart className="absolute -bottom-10 -right-10 w-64 h-64 text-zinc-200" strokeWidth={0.5} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Portfolio Management */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="aspect-[4/3] bg-zinc-950 rounded-[3rem] border border-zinc-800 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 to-transparent"></div>
               <TrendingUp className="absolute -top-10 -left-10 w-64 h-64 text-zinc-800" strokeWidth={0.5} />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-8">
              <Activity className="w-8 h-8 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-light tracking-tighter mb-6">Portfolio Management</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-6">
              For High Net Worth Individuals (HNIs) requiring active oversight. We utilize our AI Insight Engine alongside macro-economic research to actively rebalance and optimize your exposure to Equity, Debt, and Alternative assets.
            </p>
            <ul className="space-y-4 mb-8">
              {['Active ETF & Direct Equity advisory', 'Dynamic debt fund rotation', 'Quarterly rebalancing', 'Tax-loss harvesting'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light"><Check className="w-5 h-5 text-emerald-500" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => alert("Detailed page coming soon!")} className="text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              EXPLORE PMS CAPABILITIES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Section 4: Risk & Insurance */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 md:order-1">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck className="w-8 h-8 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-light tracking-tighter mb-6">Risk & Insurance</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-6">
              Wealth creation is futile without wealth protection. We audit your existing liabilities and recommend pure-risk coverage to ensure your family's financial fortress is impenetrable against life's uncertainties.
            </p>
            <ul className="space-y-4 mb-8">
              {['Term life coverage analysis', 'Comprehensive health/mediclaim structuring', 'Key-man insurance for business owners', 'Asset & liability protection'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light"><Check className="w-5 h-5 text-emerald-500" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => alert("Detailed page coming soon!")} className="text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              SECURE YOUR PORTFOLIO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
          <FadeIn delay={200} className="order-1 md:order-2">
            <div className="aspect-[4/3] bg-emerald-50 rounded-[3rem] border border-emerald-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-50"></div>
               <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-emerald-200" strokeWidth={0.5} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 5: The Process */}
      <section className="bg-zinc-50 py-32 px-6 lg:px-12 my-20 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Our Onboarding Protocol</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed">A systematic, friction-free process designed to transition you into a fully optimized portfolio within weeks.</p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-zinc-200 z-0"></div>
             {[
               { step: "01", title: "Discovery", desc: "A deep dive into your current assets, liabilities, and aspirations." },
               { step: "02", title: "Audit", desc: "Our AI Engine analyzes your existing portfolio for inefficiencies and hidden risks." },
               { step: "03", title: "Architecture", desc: "We present a mathematical, newly structured portfolio blueprint." },
               { step: "04", title: "Execution", desc: "Seamless deployment and the start of 24/7 active monitoring." }
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 100} direction="up" className="relative z-10 bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/20">
                 <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-medium mb-6">{item.step}</div>
                 <h4 className="text-xl font-medium mb-3">{item.title}</h4>
                 <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA Bottom */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20 text-center">
        <FadeIn>
          <h2 className="text-4xl font-light tracking-tighter mb-6">Ready to optimize?</h2>
          <p className="text-lg text-zinc-500 font-light mb-10 max-w-2xl mx-auto">Don't leave your financial future to chance. Let our experts build a data-driven strategy for you today.</p>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="px-10 py-5 bg-zinc-950 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors duration-300 shadow-xl shadow-zinc-200 inline-flex items-center gap-2 group">
            Schedule a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
};

// --- CALCULATORS PAGE COMPONENT ---
const CalculatorsPage = ({ setCurrentPage }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // SIP Math
  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth);
  const wealthGained = maturityValue - totalInvested;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-zinc-950 mb-8 leading-[1.05]">
            Project your <br />
            <span className="font-medium text-emerald-600">financial trajectory.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed mb-10">
            Precision tools to help you visualize compounding, plan for retirement, and map out your path to financial freedom.
          </p>
        </FadeIn>
      </section>

      {/* Main Interactive SIP Calculator */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-10">
        <div className="bg-zinc-50 border border-zinc-100 rounded-[3rem] p-8 md:p-16">
          <FadeIn className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-emerald-600 text-xs font-medium tracking-widest mb-6">
              <Calculator className="w-3 h-3" strokeWidth={1.5} /> SYSTEMATIC INVESTMENT PLAN
            </div>
            <h2 className="text-4xl font-light tracking-tighter mb-4">SIP Calculator Pro</h2>
            <p className="text-zinc-500 font-light max-w-2xl">Adjust the parameters below to see how disciplined monthly investments compound exponentially over time.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Sliders Area */}
            <div className="lg:col-span-7 space-y-12">
              <FadeIn delay={100}>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Monthly Investment</label>
                  <div className="text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200">{formatCurrency(monthlyInvestment)}</div>
                </div>
                <input 
                  type="range" min="1000" max="200000" step="1000" 
                  value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between mt-2 text-xs font-light text-zinc-400"><span>₹1K</span><span>₹2L+</span></div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
                  <div className="text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200">{years} Years</div>
                </div>
                <input 
                  type="range" min="1" max="40" step="1" 
                  value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between mt-2 text-xs font-light text-zinc-400"><span>1 Yr</span><span>40 Yrs</span></div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
                  <div className="text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">{expectedReturn}%</div>
                </div>
                <input 
                  type="range" min="5" max="25" step="0.5" 
                  value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between mt-2 text-xs font-light text-zinc-400"><span>5%</span><span>25%</span></div>
              </FadeIn>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-5">
              <FadeIn delay={400} className="bg-zinc-950 text-white p-10 rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="space-y-8 relative z-10 mb-12">
                  <div>
                    <p className="text-sm font-light text-zinc-400 mb-1">Total Invested Amount</p>
                    <p className="text-2xl font-medium">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-light text-zinc-400 mb-1">Estimated Wealth Gained</p>
                    <p className="text-2xl font-medium text-emerald-400">+{formatCurrency(wealthGained)}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-800 relative z-10">
                  <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase mb-2">Total Future Value</p>
                  <p className="text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-8">
                    {formatCurrency(maturityValue)}
                  </p>
                  <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group">
                    Execute This Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Selector Cards (Teasers) */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20 border-t border-zinc-100 mt-10">
        <FadeIn className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-light tracking-tighter mb-4">More analytical tools</h2>
          <p className="text-zinc-500 font-light">Explore specific scenarios for different life stages and capital deployments.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={100} className="p-8 border border-zinc-200 rounded-[2rem] hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-50/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-zinc-600 group-hover:text-emerald-600 transition-colors" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium mb-2">Lumpsum Calculator</h3>
            <p className="text-zinc-500 font-light text-sm">Calculate the future value of a one-time capital injection across different time horizons.</p>
          </FadeIn>
          <FadeIn delay={200} className="p-8 border border-zinc-200 rounded-[2rem] hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-50/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
              <Map className="w-6 h-6 text-zinc-600 group-hover:text-emerald-600 transition-colors" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium mb-2">Retirement Planner</h3>
            <p className="text-zinc-500 font-light text-sm">Determine exactly how much you need to save today to maintain your lifestyle post-retirement.</p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

// --- INSIGHTS PAGE COMPONENT ---
const InsightsPage = ({ setCurrentPage }) => {
  const articles = [
    { tag: "MACRO", date: "Oct 24, 2023", title: "The Fed's Pivot: What it means for Emerging Markets and Indian Debt", read: "6 min read" },
    { tag: "EQUITY", date: "Oct 12, 2023", title: "Navigating Volatility: Why Tech ETFs remain a stronghold in Q4.", read: "5 min read" },
    { tag: "TAX PLANNING", date: "Sep 28, 2023", title: "Maximizing Section 80C: A mathematical comparison of ELSS vs PPF.", read: "8 min read" },
    { tag: "WEALTH", date: "Sep 15, 2023", title: "The Psychology of Holding: Why idle portfolios often beat active trading.", read: "4 min read" },
    { tag: "ALTERNATIVES", date: "Aug 30, 2023", title: "Demystifying InvITs and REITs for the modern passive income investor.", read: "7 min read" },
    { tag: "RETIREMENT", date: "Aug 12, 2023", title: "The 4% Rule: Is it still viable for modern Indian retirement planning?", read: "6 min read" },
  ];

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-zinc-950 mb-8 leading-[1.05]">
            Market <br />
            <span className="font-medium text-emerald-600">Intelligence.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed mb-10">
            Institutional-grade research, macroeconomic breakdowns, and tactical strategies to keep you ahead of the curve.
          </p>
        </FadeIn>
      </section>

      {/* Featured Insight */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-10">
        <FadeIn delay={100}>
          <div className="bg-zinc-950 text-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center group cursor-pointer relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent group-hover:scale-105 transition-transform duration-700"></div>
            <div className="md:w-1/2 relative z-10">
              <div className="aspect-[4/3] bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800">
                <BookOpen className="w-16 h-16 text-zinc-700 group-hover:text-emerald-500 transition-colors duration-500" strokeWidth={1} />
              </div>
            </div>
            <div className="md:w-1/2 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold tracking-widest text-zinc-950 bg-emerald-400 px-3 py-1.5 rounded-md">SPECIAL REPORT</span>
                <span className="text-sm text-zinc-400 font-light">November 2023</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                The 2024 Blueprint: Positioning portfolios for the next election cycle.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8 text-lg">
                An exhaustive 40-page analysis of historical market behaviors preceding Indian general elections, identifying tactical overweight opportunities in infrastructure, manufacturing, and consumption sectors.
              </p>
              <span className="inline-flex items-center gap-2 font-medium text-white group-hover:text-emerald-400 transition-colors">
                Read Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Article Grid */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20 border-t border-zinc-100 mt-10">
        <FadeIn className="mb-12">
          <h2 className="text-3xl font-light tracking-tighter">Latest Publications</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 100} direction="up" className="group cursor-pointer flex flex-col h-full">
              <div className="aspect-[16/10] bg-zinc-50 rounded-3xl mb-6 overflow-hidden relative border border-zinc-100">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 transition-transform duration-700 group-hover:scale-105"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-zinc-300 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1} />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">{post.tag}</span>
                <span className="text-xs text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-xl font-normal tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-8 relative mb-4 leading-snug">
                {post.title}
                <ArrowUpRight className="absolute right-0 top-1 w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" strokeWidth={1.5} />
              </h3>
              <p className="text-xs font-light tracking-widest text-zinc-400 uppercase mt-auto">{post.read}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20">
        <FadeIn delay={200}>
          <div className="bg-emerald-600 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-emerald-600/20">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[80px]"></div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-4xl font-light tracking-tighter text-white mb-4">Never miss an insight.</h2>
              <p className="text-emerald-100 font-light leading-relaxed">Join 40,000+ investors who receive our weekly macro breakdown and portfolio strategy adjustments directly in their inbox.</p>
            </div>
            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="px-6 py-4 rounded-xl text-zinc-900 focus:outline-none w-full sm:w-72 font-light" />
                <button type="submit" className="px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors whitespace-nowrap">
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

// --- Main Application ---
const AskGeoApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); 
  const [currentPage, setCurrentPage] = useState('home'); // Routing State

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-200 selection:text-zinc-900 overflow-x-hidden">
      
      {/* Custom Keyframes for continuous smooth floating */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite 1s; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .animate-pulse-ring { animation: pulse-ring 2.5s infinite cubic-bezier(0.66, 0, 0, 1); }
      `}</style>

      {/* --- Minimal Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-100 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
              <TrendingUp className="text-white w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-light tracking-tight">Ask <span className="text-zinc-500 transition-colors duration-300 group-hover:text-emerald-600">Geo</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['HOME', 'ABOUT', 'SERVICES', 'TOOLS', 'INSIGHTS'].map((item) => (
              <button 
                key={item} 
                onClick={() => { setCurrentPage(item.toLowerCase()); window.scrollTo(0,0); }} 
                className={`text-xs font-medium tracking-widest transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-zinc-900 after:transition-all after:duration-300 ${currentPage === item.toLowerCase() ? 'text-zinc-900 after:w-full' : 'text-zinc-500 hover:text-zinc-900 after:w-0 hover:after:w-full'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="group relative">
              <button className="text-xs font-medium tracking-widest text-zinc-900 border border-zinc-200 px-5 py-2.5 rounded-full hover:border-zinc-900 transition-all flex items-center gap-2">
                LOGIN <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl shadow-zinc-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:scale-100 scale-95 overflow-hidden">
                <a href="#" className="block px-5 py-4 text-sm font-light hover:bg-zinc-50 transition-colors border-b border-zinc-50">E-Wealth A/C</a>
                <a href="#" className="block px-5 py-4 text-sm font-light hover:bg-zinc-50 transition-colors">Client Desk</a>
              </div>
            </div>
          </div>

          <button className="md:hidden text-zinc-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 py-6 px-6 flex flex-col gap-6 shadow-xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['HOME', 'ABOUT', 'SERVICES', 'TOOLS', 'INSIGHTS'].map((item) => (
            <button 
              key={item} 
              onClick={() => { setCurrentPage(item.toLowerCase()); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
              className={`text-sm font-medium tracking-widest text-left ${currentPage === item.toLowerCase() ? 'text-zinc-900' : 'text-zinc-500'}`}
            >
              {item}
            </button>
          ))}
          <div className="h-px bg-zinc-100 w-full"></div>
          <a href="#" className="text-sm font-medium tracking-widest text-zinc-500">E-WEALTH LOGIN</a>
          <a href="#" className="text-sm font-medium tracking-widest text-zinc-500">CLIENT DESK LOGIN</a>
        </div>
      </nav>

      {/* --- PAGE ROUTER MAIN --- */}
      <main>
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'tools' && <CalculatorsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'insights' && <InsightsPage setCurrentPage={setCurrentPage} />}
        
        {currentPage === 'home' && (
          <>
      {/* --- Minimal Hero Section --- */}
      <section id="home" className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-3/5 z-10 relative">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium tracking-widest mb-8">
              <Activity className="w-3 h-3 text-emerald-500" strokeWidth={1.5} /> AI-OPTIMIZED PLANNING
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[1.05] text-zinc-950 mb-8">
              For expert advice, <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Ask Geo.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-md font-light leading-relaxed">
              We build, manage, and preserve your wealth with highly customized, data-driven financial strategies.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="https://wa.me/919960624271" target="_blank" rel="noreferrer" className="group relative px-8 py-4 bg-zinc-950 text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 animate-pulse-ring">
                <span className="relative z-10 flex items-center gap-2">
                  Ask Geo Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </a>
              <button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="px-8 py-4 text-zinc-600 font-medium hover:text-zinc-900 transition-colors">
                Explore Services
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Hero Abstract Graphic with Floating Cards */}
        <div className="md:w-2/5 relative w-full h-[450px] md:h-[550px] mt-12 md:mt-0 perspective-1000">
          <FadeIn delay={400} direction="left" className="w-full h-full relative">
            
            {/* Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50/80 rounded-full blur-[80px] -z-10 animate-blob"></div>
            
            {/* Main Center Card Positioning Wrapper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[320px] z-10">
              
              {/* Main Center Card Content & Animation */}
              <div className="w-full bg-white border border-zinc-100 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 p-8 flex flex-col justify-between overflow-hidden group animate-float-slow relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp className="w-32 h-32" strokeWidth={1} />
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <PieChart className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-normal tracking-tight mb-2">Portfolio Metrics</h3>
                  <p className="text-zinc-500 text-sm font-light">Historical data & active management</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-zinc-50 p-4 rounded-2xl">
                    <p className="text-xs font-medium text-zinc-400 tracking-widest mb-1">AUM</p>
                    <p className="text-2xl font-light">133K<span className="text-zinc-400 text-lg ml-1">Cr</span></p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl">
                    <p className="text-xs font-medium text-emerald-600/60 tracking-widest mb-1">XIRR</p>
                    <p className="text-2xl font-light text-emerald-700">+12%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: AI Engine */}
            <div className="absolute left-2 sm:-left-6 top-12 bg-zinc-950 border border-zinc-800 text-white p-4 rounded-2xl shadow-2xl animate-float z-20 flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-emerald-400 tracking-widest uppercase mb-0.5">AI Engine</p>
                <p className="text-sm font-light">Optimizing...</p>
              </div>
            </div>

            {/* Floating Card 2: Trust/Clients */}
            <div className="absolute right-0 sm:-right-8 top-1/3 bg-white border border-zinc-100 p-4 rounded-2xl shadow-xl animate-float-delayed z-20 flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase mb-0.5">Trust</p>
                <p className="text-sm font-light text-zinc-900">26L+ Clients</p>
              </div>
            </div>

            {/* Floating Card 3: Live Sync */}
            <div className="absolute left-6 sm:-left-2 bottom-16 bg-white border border-zinc-100 p-4 rounded-2xl shadow-xl animate-float z-30 flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-zinc-400 tracking-widest uppercase mb-0.5">Live Sync</p>
                <p className="text-sm font-light text-zinc-900">Market Data</p>
              </div>
            </div>

          </FadeIn>
        </div>
      </section>

      {/* --- Clean Divider Stats --- */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          <FadeIn delay={100} direction="none" className="py-4 md:pr-8">
            <h4 className="text-5xl font-light tracking-tighter text-zinc-900 mb-2">
              <AnimatedNumber end={26} suffix="L+" />
            </h4>
            <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Active Investors</p>
          </FadeIn>
          <FadeIn delay={200} direction="none" className="py-4 md:px-8">
            <h4 className="text-5xl font-light tracking-tighter text-zinc-900 mb-2">
              <AnimatedNumber end={133} suffix="K" />
            </h4>
            <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Crore AUM</p>
          </FadeIn>
          <FadeIn delay={300} direction="none" className="py-4 md:pl-8">
            <h4 className="text-5xl font-light tracking-tighter text-emerald-600 mb-2">
              <AnimatedNumber end={12} suffix="%" />
            </h4>
            <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Historic XIRR</p>
          </FadeIn>
        </div>
      </section>

      {/* --- NEW SECTION 1: Core Values / Approach --- */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeIn className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Our Core Philosophy</h2>
          <p className="text-lg text-zinc-500 font-light leading-relaxed">
            We operate on principles that prioritize your long-term security, utilizing data-driven precision to eliminate guesswork from your financial future.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: "Absolute Precision", desc: "Every portfolio is mathematically optimized to align perfectly with your risk appetite and timelines." },
            { icon: ShieldCheck, title: "Unwavering Trust", desc: "100% transparency in fee structures and investment logic. We win only when your portfolio wins." },
            { icon: Zap, title: "Dynamic Agility", desc: "Market conditions change rapidly. Our strategies adapt in real-time to protect and grow your wealth." }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-500">
                <item.icon className="w-8 h-8 text-zinc-400 group-hover:text-emerald-600 transition-colors group-hover:rotate-12 duration-500" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-normal tracking-tight mb-3">{item.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- AI Tool Section (Minimal & Magical) --- */}
      <section id="ai-tools" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>
        
        <FadeIn className="mb-16 max-w-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40 mb-6 group hover:shadow-emerald-200/50 transition-all duration-500">
            <Bot className="w-8 h-8 text-emerald-600 group-hover:animate-bounce" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Geo AI Insight Engine</h2>
          <p className="text-lg text-zinc-500 font-light leading-relaxed">
            Experience the future of financial planning. Our proprietary AI tools analyze market trends, risk tolerance, and your unique goals to provide real-time strategies.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <AIAssistantWidget />
        </FadeIn>
      </section>

      {/* --- Philosophy Section --- */}
      <section id="about" className="py-32 bg-zinc-950 text-white px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <FadeIn>
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter mb-8 leading-[1.1]">
                Let's talk about <br/><span className="text-emerald-400">wealth.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8">
                Wealth is not just about accumulating assets, but managing them in a way that aligns with your values. It requires a personalized plan factoring in risk tolerance, goals, and life circumstances.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <blockquote className="border-l-2 border-emerald-500 pl-6 py-2 mb-8 text-xl font-normal text-zinc-300">
                "The ‘know-nothing’ investor should practice diversification, but it is crazy if you are an expert."
              </blockquote>
            </FadeIn>
            <FadeIn delay={300}>
              <a href="#contact" className="inline-flex items-center gap-2 text-white font-medium text-lg hover:text-emerald-400 transition-colors group">
                Let's Build Wealth <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
              </a>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-2 gap-4 relative">
            <FadeIn delay={100} direction="right" className="space-y-4 pt-12">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 hover:bg-zinc-800 transition-colors">
                <PieChart className="text-white w-8 h-8 mb-6" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-2">Mutual Funds</h4>
                <p className="text-zinc-400 text-sm font-light">Expertly curated schemes for optimal growth.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 hover:bg-zinc-800 transition-colors">
                <TrendingUp className="text-white w-8 h-8 mb-6" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-2">Equity & ETFs</h4>
                <p className="text-zinc-400 text-sm font-light">Direct market participation with strategy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={200} direction="right" className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 hover:bg-zinc-800 transition-colors">
                <ShieldCheck className="text-white w-8 h-8 mb-6" strokeWidth={1.5} />
                <h4 className="font-normal text-lg mb-2">Bonds & FD</h4>
                <p className="text-zinc-400 text-sm font-light">Secure, fixed-income instruments.</p>
              </div>
              <div className="bg-emerald-600 rounded-[2rem] p-8 text-white flex flex-col justify-center min-h-[200px] hover:scale-105 transition-transform duration-500">
                <h4 className="font-light text-5xl mb-2">12%</h4>
                <p className="text-emerald-100 font-medium tracking-widest text-xs uppercase">Historic XIRR</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeIn className="mb-20 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-light tracking-tighter mb-6">Our Expertise</h2>
            <p className="text-xl text-zinc-500 font-light leading-relaxed">
              As a financial advisor, I offer a range of services designed to help my clients achieve their ultimate financial freedom.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Wealth Management", icon: Briefcase, desc: "Building and preserving wealth through personalized, high-yield management strategies." },
            { title: "Portfolio Management", icon: TrendingUp, desc: "Recommending and adjusting the diversity of investments to ensure the best possible long-term outcome." },
            { title: "Insurance Management", icon: ShieldCheck, desc: "Managing risk by assessing needs, identifying coverage gaps and recommending policies." }
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group">
              <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                <div className="w-16 h-16 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all duration-500">
                  <service.icon className="w-6 h-6 transition-colors group-hover:-rotate-12 duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4">{service.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed mt-auto">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 2: Interactive Tools Teaser --- */}
      <section className="py-32 bg-zinc-950 text-white px-6 lg:px-12 relative overflow-hidden">
        {/* Abstract dark background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2">
            <FadeIn className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-medium tracking-widest mb-8">
                <Calculator className="w-3 h-3" strokeWidth={1.5} /> INTERACTIVE TOOLS
              </div>
              <h2 className="text-5xl font-light tracking-tighter mb-6 leading-[1.1]">
                Visualize your <br/><span className="font-medium text-emerald-400">financial trajectory.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
                Don't guess your future. Use our advanced SIP, Lumpsum, and Retirement calculators to mathematically map out your path to financial freedom.
              </p>
              <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 rounded-full font-medium hover:bg-emerald-400 hover:text-white transition-colors duration-300">
                Try Calculators <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </FadeIn>
          </div>
          <div className="md:w-1/2 w-full">
            <FadeIn delay={200} direction="left">
              <div className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
                  <div>
                    <h4 className="text-xl font-medium text-white mb-1">SIP Calculator Pro</h4>
                    <p className="text-xs font-light text-zinc-500 uppercase tracking-widest">Projected Growth</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400 font-light">Monthly Investment</span>
                      <span className="text-white font-medium">₹25,000</span>
                    </div>
                    <AnimatedProgress width="33%" delay={200} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400 font-light">Time Period</span>
                      <span className="text-white font-medium">15 Years</span>
                    </div>
                    <AnimatedProgress width="50%" delay={500} />
                  </div>
                  <div className="pt-6 mt-6 border-t border-zinc-800">
                    <p className="text-zinc-400 font-light text-sm mb-1">Estimated Future Value</p>
                    <p className="text-4xl font-light text-emerald-400">
                      ₹<AnimatedNumber end={1.26} decimals={2} duration={2500} /> Cr.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Minimal Framework / Roadmap --- */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-100 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-20 max-w-2xl">
            <h2 className="text-4xl font-light tracking-tighter mb-4">The Ask Geo Framework</h2>
            <p className="text-lg text-zinc-500 font-light">Three levels of service completely customized to your goals.</p>
          </FadeIn>

          <div className="space-y-12 max-w-4xl">
            {[
              { step: "01", title: "Life & Financial Objectives", desc: "Identifying your objectives is essential. We discuss your goals in detail to develop a personalized, actionable strategy." },
              { step: "02", title: "Where on the map are you?", desc: "Assessing current progress is crucial. By understanding your exact position, we strategize and make highly informed decisions." },
              { step: "03", title: "Choosing Your Path", desc: "Selecting the right path is crucial for financial success. We explore different strategies to navigate towards your goals with confidence." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="left">
                <div className="flex gap-6 group cursor-default">
                  <div className="text-4xl font-light text-zinc-300 group-hover:text-emerald-500 transition-colors duration-500 mt-1">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-2xl font-normal tracking-tight mb-3 group-hover:text-emerald-600 transition-colors duration-300">{item.title}</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {idx !== 2 && <div className="h-px w-full bg-zinc-200 mt-12 ml-16"></div>}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 3: The Expert / Team --- */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
          <FadeIn direction="right">
            <div className="w-full aspect-[4/5] bg-zinc-100 rounded-[3rem] overflow-hidden relative group">
              <img src="https://static.wixstatic.com/media/548938_b7e4824e0e084ad59adf9a725e61dbdb~mv2.jpeg" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-zinc-900/10 mix-blend-overlay"></div>
              <div className="absolute bottom-8 left-8 right-8 z-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                <p className="text-sm font-medium tracking-widest text-emerald-600 uppercase mb-1">Chief Advisor</p>
                <h3 className="text-2xl font-normal text-zinc-900">Geo Thomas</h3>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="md:w-1/2">
          <FadeIn delay={200}>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">Guided by <br/>experience.</h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-6">
              With years of navigating complex market cycles, Geo brings an institutional-grade approach to personal wealth management. 
            </p>
            <p className="text-lg text-zinc-500 font-light leading-relaxed mb-10">
              "My mission isn't just to pick funds; it's to architect a financial fortress around your family so you can focus on living, not worrying about the market."
            </p>
            <div className="flex gap-12 border-t border-zinc-100 pt-8">
              <div>
                <p className="text-3xl font-light text-zinc-900 mb-1">15+</p>
                <p className="text-xs font-medium text-zinc-400 tracking-widest uppercase">Years Exp.</p>
              </div>
              <div>
                <p className="text-3xl font-light text-zinc-900 mb-1">AMFI</p>
                <p className="text-xs font-medium text-zinc-400 tracking-widest uppercase">Certified</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- NEW SECTION 4: Testimonials --- */}
      <section className="py-32 bg-zinc-950 text-white px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-20 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">What our investors say</h2>
            <p className="text-lg text-zinc-400 font-light">Trust is built on consistent performance and transparent communication.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Ask Geo transformed my scattered investments into a cohesive, high-performing portfolio. Their AI insights gave me confidence I never had before.", name: "Rajesh Sharma", role: "Tech Entrepreneur" },
              { text: "The transparency is refreshing. I know exactly where every rupee is going and why. The historic XIRR isn't just a number, it's a reality.", name: "Priya Desai", role: "Medical Professional" },
              { text: "Retirement planning felt overwhelming until Geo mapped it out step-by-step. The clear trajectory and data-backed choices are phenomenal.", name: "Amit Verma", role: "Corporate Director" }
            ].map((review, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up">
                <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] h-full flex flex-col relative overflow-hidden group hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-zinc-800/50 group-hover:text-emerald-900/30 group-hover:rotate-12 transition-all duration-500" strokeWidth={1} />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <p className="text-lg text-zinc-300 font-light leading-relaxed mb-8 flex-grow">"{review.text}"</p>
                  <div>
                    <p className="font-medium text-white">{review.name}</p>
                    <p className="text-sm text-zinc-500 font-light">{review.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 5: Market Intelligence (Blog) --- */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Market Intelligence</h2>
            <p className="text-lg text-zinc-500 font-light">Latest insights, strategies, and macroeconomic updates.</p>
          </div>
          <button onClick={() => { setCurrentPage('insights'); window.scrollTo(0,0); }} className="text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2">
            VIEW ALL INSIGHTS <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { tag: "EQUITY", date: "Oct 12, 2023", title: "Navigating Volatility: Why Tech ETFs remain a stronghold." },
            { tag: "TAX PLANNING", date: "Sep 28, 2023", title: "Maximizing Section 80C: ELSS vs Traditional PPF." },
            { tag: "MACRO", date: "Sep 15, 2023", title: "How global interest rates are affecting Indian Debt Funds." }
          ].map((post, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group cursor-pointer">
              <div className="aspect-[16/9] bg-zinc-100 rounded-3xl mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-50 transition-transform duration-700 group-hover:scale-105"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-zinc-300" strokeWidth={1} />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{post.tag}</span>
                <span className="text-xs text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-xl font-normal tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-8 relative">
                {post.title}
                <ArrowUpRight className="absolute right-0 top-1 w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" strokeWidth={1.5} />
              </h3>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 6: FAQ --- */}
      <section className="py-32 bg-zinc-50 border-t border-zinc-100 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Common Questions</h2>
            <p className="text-lg text-zinc-500 font-light">Everything you need to know about working with Ask Geo.</p>
          </FadeIn>
          <div className="space-y-4 max-w-4xl">
            {[
              { q: "What is the minimum investment required to start?", a: "We believe in democratizing wealth. While we manage HNIs, our advisory services are available to anyone committed to long-term wealth building, starting with SIPs as low as ₹5,000/month." },
              { q: "How are your advisory fees structured?", a: "We maintain 100% transparency. Our fees are strictly based on a percentage of Assets Under Management (AUM) or via direct mutual fund commissions, ensuring our goals are perfectly aligned with your growth." },
              { q: "Can I track my portfolio's performance daily?", a: "Absolutely. You get exclusive access to the Ask Geo Client Desk and E-Wealth A/C, providing real-time tracking, AI insights, and detailed reports 24/7." },
              { q: "How frequently will my portfolio be reviewed?", a: "We conduct comprehensive quarterly reviews with you, while our internal systems and AI engines monitor your portfolio daily to capitalize on market opportunities." }
            ].map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="up">
                <div 
                  className={`border border-zinc-200 rounded-3xl bg-white overflow-hidden transition-all duration-300 cursor-pointer ${openFaq === idx ? 'shadow-xl shadow-zinc-200/50' : 'hover:border-zinc-300'}`}
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <div className="px-8 py-6 flex justify-between items-center">
                    <h4 className={`text-lg font-medium transition-colors ${openFaq === idx ? 'text-emerald-600' : 'text-zinc-900'}`}>{faq.q}</h4>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-emerald-600' : ''}`} strokeWidth={1.5} />
                  </div>
                  <div className={`px-8 transition-all duration-300 ease-in-out ${openFaq === idx ? 'pb-6 opacity-100 max-h-40' : 'max-h-0 opacity-0 pb-0'}`}>
                    <p className="text-zinc-500 font-light leading-relaxed border-t border-zinc-100 pt-4">{faq.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
          </>
        )}
      </main>

      {/* --- NEW: High-Impact Pre-Footer CTA --- */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-950 to-zinc-950 z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20">
              <TrendingUp className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8 leading-[1.1]">
              Ready to build your <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                financial fortress?
              </span>
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mb-12">
              Join over 26 Lakh investors who trust Ask Geo to navigate the complexities of wealth creation and preservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <a href="https://wa.me/919960624271" target="_blank" rel="noreferrer" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Your Journey <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#contact" className="px-10 py-5 bg-transparent border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white rounded-full font-medium transition-all duration-300 w-full sm:w-auto justify-center flex">
                Request a Callback
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Contact Section (Moved from Footer) --- */}
      <section id="contact" className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <FadeIn direction="right">
            <h2 className="text-5xl font-light tracking-tighter mb-10 leading-[1.1]">
              Let's talk about <br/><span className="font-medium text-emerald-600">your future.</span>
            </h2>
            <p className="text-lg text-zinc-500 font-light mb-12 max-w-md">
              Whether you have a specific question about our AI Engine or want a comprehensive portfolio review, our team of experts is ready to assist you.
            </p>
            <div className="space-y-8 text-zinc-600 font-light">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-zinc-900 shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1">Corporate Office</p>
                  <p>Jai Ganesh Vision, B Wing, BR-2, Office No. 319, Third floor, next to Inox Theatre, Akurdi, Pune - 411035, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-zinc-900 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1">Direct Line</p>
                  <p>+91 99606 24271</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-zinc-900 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1">Email Support</p>
                  <p>geo@askgeo.in / askgeo@gmail.com</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <form className="bg-zinc-50 p-10 md:p-12 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/20" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-light mb-8">Send a Message</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input type="text" placeholder="First Name" className="w-full bg-white border-b-2 border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl" />
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" className="w-full bg-white border-b-2 border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl" />
                  </div>
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full bg-white border-b-2 border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl" />
                </div>
                <div>
                  <textarea rows="4" placeholder="How can we help you?" className="w-full bg-white border-b-2 border-zinc-200 px-4 py-3 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-zinc-950 text-white font-medium py-4 rounded-xl hover:bg-emerald-600 transition-colors duration-300 hover:shadow-lg hover:shadow-emerald-600/20 flex justify-center items-center gap-2 group">
                  Submit Request <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* --- NEW: Mega Footer --- */}
      <footer className="bg-zinc-950 text-zinc-400 pt-24 pb-12 px-6 lg:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-zinc-800 pb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                  <TrendingUp className="text-white w-4 h-4" strokeWidth={2} />
                </div>
                <span className="text-2xl font-light tracking-tight text-white">Ask <span className="text-zinc-500">Geo</span></span>
              </div>
              <p className="text-sm font-light leading-relaxed mb-8 max-w-sm">
                A premier financial advisory firm dedicated to building, managing, and preserving wealth through highly customized, data-driven strategies and AI-optimized planning.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Twitter className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Facebook className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-white font-medium mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Geo</a></li>
                <li><a href="#ai-tools" className="hover:text-emerald-400 transition-colors">AI Insight Engine</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Market Intelligence</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-medium mb-6">Our Services</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Wealth Management</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Portfolio Analysis</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Insurance Planning</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Retirement Strategy</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Tax Optimization</a></li>
              </ul>
            </div>

            {/* Client Portal Column */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-medium mb-6">Client Access</h4>
              <div className="space-y-4">
                <a href="#" className="group flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <div>
                    <p className="text-white font-medium text-sm">Ask Geo E-Wealth A/C</p>
                    <p className="text-xs font-light mt-1 text-zinc-500">Manage your investments</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
                <a href="#" className="group flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <div>
                    <p className="text-white font-medium text-sm">Client Desk Login</p>
                    <p className="text-xs font-light mt-1 text-zinc-500">Access reports & docs</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Area */}
          <div className="mb-12 text-[11px] font-light leading-relaxed text-zinc-600 space-y-4 text-left">
            <p>
              <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. The Mutual Fund is not guaranteeing or assuring any dividend under any of the schemes and the same is subject to the availability and adequacy of distributable surplus.
            </p>
            <p>
              Ask Geo operates as a financial distributor/advisor. The AI tools and insight engines provided on this website are for informational and educational purposes only and should not be construed as absolute investment advice. Investors are advised to consult with their tax advisors or financial planners before making any investment decisions. Historic XIRR mentioned on the site is based on past data and does not guarantee future returns.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-zinc-900 text-xs font-medium tracking-widest uppercase">
            <p>© {new Date().getFullYear()} Ask Geo Financial Services.</p>
            <div className="flex flex-wrap justify-start gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">SEBI Registration</a>
              <a href="#" className="hover:text-white transition-colors">AMFI Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Clean, Minimal AI Assistant Component ---
const AIAssistantWidget = () => {
  const [queryState, setQueryState] = useState('idle'); // idle, analyzing, result
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    { id: 'retire', label: 'Early Retirement', icon: Map },
    { id: 'wealth', label: 'Wealth Multiplication', icon: TrendingUp },
    { id: 'tax', label: 'Tax Optimization', icon: ShieldCheck },
  ];

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setQueryState('analyzing');
    setTimeout(() => setQueryState('result'), 1800);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 md:p-12 shadow-2xl shadow-zinc-200/50 max-w-4xl mx-auto transition-all duration-500">
      
      <div className="flex items-center justify-between mb-10 border-b border-zinc-100 pb-8">
        <div>
          <h3 className="text-2xl font-light tracking-tight mb-2">Select an Objective</h3>
          <p className="text-zinc-500 font-light">Let AI draft a baseline strategy for you instantly.</p>
        </div>
        {queryState !== 'idle' && (
          <button onClick={() => setQueryState('idle')} className="text-xs font-medium tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors px-4 py-2 border border-zinc-200 rounded-full">
            RESET
          </button>
        )}
      </div>

      <div className="min-h-[220px] flex flex-col justify-center">
        {queryState === 'idle' && (
          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, idx) => (
              <button 
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className="group relative text-left p-8 rounded-3xl border border-zinc-200 hover:border-zinc-900 bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-3xl -z-10 group-hover:bg-emerald-50 transition-colors"></div>
                <goal.icon className="text-zinc-400 w-8 h-8 mb-6 group-hover:text-zinc-900 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                <h4 className="font-normal text-lg text-zinc-900">{goal.label}</h4>
              </button>
            ))}
          </div>
        )}

        {queryState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center space-y-6 opacity-100 transition-opacity duration-500">
            <div className="relative w-16 h-16 flex items-center justify-center">
               <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
               <div className="absolute inset-0 border-[3px] border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
               <Sparkles className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="text-zinc-500 font-medium tracking-widest text-sm uppercase animate-pulse">Running AI Models...</p>
          </div>
        )}

        {queryState === 'result' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xl font-normal mb-3">{selectedGoal.label} Strategy</h4>
                <p className="text-lg text-zinc-600 font-light leading-relaxed mb-8 max-w-2xl">
                  {selectedGoal.id === 'retire' && "To achieve early retirement, our AI model suggests shifting 60% to high-yield Equity Mutual Funds and 40% in stable Debt Funds. We recommend starting an aggressive SIP to match the 12% historic XIRR benchmark."}
                  {selectedGoal.id === 'wealth' && "For aggressive wealth multiplication, consider our Direct Equity & ETF portfolio management. Historical data indicates a diversified tech & infra portfolio outpaces inflation by 8%. Let Ask Geo map this out."}
                  {selectedGoal.id === 'tax' && "Tax optimization requires utilizing ELSS (Equity Linked Savings Scheme) under Section 80C, which not only saves tax but historically provides superior equity returns compared to traditional PPF."}
                </p>
                <a 
                  href="https://wa.me/919960624271" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-zinc-200"
                >
                  Consult on this plan <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskGeoApp;
