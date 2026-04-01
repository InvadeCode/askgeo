import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, ShieldCheck, Briefcase, 
  Map, ChevronRight, Bot, Sparkles, PieChart, 
  ArrowRight, Phone, Mail, MapPin, Activity, Check,
  Target, Zap, Users, Calculator, BookOpen, Star, 
  ArrowUpRight, BarChart3, Quote, ChevronDown, ChevronsDown,
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
const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
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
      const easeProgress = 1 - Math.pow(1 - progress, 4);
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

// --- CALCULATOR WIDGETS ---
const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const SipCalculatorWidget = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth);
  const wealthGained = maturityValue - totalInvested;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-10 lg:space-y-16">
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Monthly Investment</label>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-zinc-200 w-full sm:w-auto text-right sm:text-left">{formatCurrency(monthlyInvestment)}</div>
          </div>
          <input type="range" min="1000" max="200000" step="1000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-zinc-200 w-full sm:w-auto text-right sm:text-left">{years} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-emerald-100 w-full sm:w-auto text-right sm:text-left">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/20 to-transparent rounded-full blur-[40px] sm:blur-[60px] pointer-events-none"></div>
          <div className="space-y-8 sm:space-y-12 relative z-10 mb-12 lg:mb-16">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Total Invested</p>
              <p className="text-2xl sm:text-3xl xl:text-4xl font-light">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Wealth Gained</p>
              <p className="text-2xl sm:text-3xl xl:text-4xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
            </div>
          </div>
          <div className="pt-8 sm:pt-12 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3 sm:mb-4">Future Value</p>
            <p className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-white tracking-tight leading-none mb-8 sm:mb-10">{formatCurrency(maturityValue)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const StepUpCalculatorWidget = () => {
  const [initialSip, setInitialSip] = useState(20000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  let currentSip = initialSip;
  let totalInvested = 0;
  let futureValue = 0;
  const monthlyRate = expectedReturn / 12 / 100;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      futureValue = (futureValue + currentSip) * (1 + monthlyRate);
      totalInvested += currentSip;
    }
    currentSip = currentSip * (1 + stepUpPercent / 100);
  }
  const wealthGained = futureValue - totalInvested;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-8 lg:space-y-12">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-4">
          <p className="text-sm text-emerald-800 font-medium">Step-Up SIP dramatically compresses your wealth creation timeline by aligning your investments with your annual salary hikes.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Initial Monthly SIP</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(initialSip)}</div>
          </div>
          <input type="range" min="1000" max="200000" step="1000" value={initialSip} onChange={(e) => setInitialSip(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Annual Step-Up</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 w-full sm:w-auto">{stepUpPercent}%</div>
          </div>
          <input type="range" min="1" max="25" step="1" value={stepUpPercent} onChange={(e) => setStepUpPercent(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Period (Years)</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
             <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Return</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          <div className="space-y-8 relative z-10 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Total Invested</p>
              <p className="text-2xl sm:text-3xl font-light">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Wealth Gained</p>
              <p className="text-2xl sm:text-3xl font-light text-amber-400">+{formatCurrency(wealthGained)}</p>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3">Accelerated Future Value</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none">{formatCurrency(futureValue)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const EmiVsSipCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(15);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [marketReturn, setMarketReturn] = useState(12);

  // EMI Math
  const ratePerMonth = loanInterest / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = loanAmount * ratePerMonth * (Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
  const totalPaidToBank = emi * totalMonths;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  // SIP Future Value (Opportunity Cost)
  const sipRatePerMonth = marketReturn / 12 / 100;
  const projectedWealth = emi * ((Math.pow(1 + sipRatePerMonth, totalMonths) - 1) / sipRatePerMonth) * (1 + sipRatePerMonth);
  const wealthLost = projectedWealth - totalPaidToBank;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-8 lg:space-y-10">
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-4">
          <p className="text-sm text-red-800 font-medium">The Cost of Debt: See the exact wealth you forfeit when you choose to pay an EMI instead of investing it.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="100000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{tenureYears} Years</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
            <div className="text-xl sm:text-2xl font-light text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="5" max="20" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
             <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Potential Market Return</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 w-full sm:w-auto">{marketReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={marketReturn} onChange={(e) => setMarketReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="space-y-8 relative z-10 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Your Monthly EMI</p>
              <p className="text-3xl font-light text-red-400">{formatCurrency(emi)}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Total Paid to Bank</p>
              <p className="text-2xl font-light text-zinc-300">{formatCurrency(totalPaidToBank)} <span className="text-sm text-red-400">({formatCurrency(totalInterestPaid)} interest)</span></p>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3">If invested in SIP instead:</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-emerald-400 tracking-tight leading-none mb-4">{formatCurrency(projectedWealth)}</p>
            <p className="text-sm text-emerald-500/80 font-light bg-emerald-900/30 inline-block px-3 py-1 rounded-lg">Opportunity Cost: {formatCurrency(wealthLost)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const ExtraEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(13000000);
  const [originalRate, setOriginalRate] = useState(8.75);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [currentRate, setCurrentRate] = useState(7.50);
  const [extraEmisPerYear, setExtraEmisPerYear] = useState(4);
  const [extraEmiAmount, setExtraEmiAmount] = useState(104000);

  // 1. Original Scenario
  const rOrg = originalRate / 12 / 100;
  const nOrg = originalTenure * 12;
  const originalEMI = loanAmount * rOrg * Math.pow(1 + rOrg, nOrg) / (Math.pow(1 + rOrg, nOrg) - 1);
  const totalInterestOrg = (originalEMI * nOrg) - loanAmount;

  // 2. Rate Drop Scenario (Same EMI, reduced tenure)
  const rCur = currentRate / 12 / 100;
  let nRateDrop = 0;
  if (originalEMI > loanAmount * rCur) {
      nRateDrop = Math.log(originalEMI / (originalEMI - loanAmount * rCur)) / Math.log(1 + rCur);
  } else {
      nRateDrop = nOrg; 
  }
  const monthsRateDrop = Math.ceil(nRateDrop);
  const totalInterestRateDrop = (originalEMI * monthsRateDrop) - loanAmount;

  // 3. Prepayment Scenario (Rate Drop + Extra Annual Payments)
  let bal = loanAmount;
  let mPrepay = 0;
  let totPaidPrepay = 0;
  // Safety limit of 1200 months (100 years) to prevent infinite loops if values are extreme
  while(bal > 0 && mPrepay < 1200) { 
      mPrepay++;
      let int = bal * rCur;
      let pay = originalEMI;
      
      // Apply extra EMIs as an annual lump sum for simplicity and standard modeling
      if (mPrepay % 12 === 0) {
          pay += (extraEmisPerYear * extraEmiAmount);
      }
      
      if (pay > bal + int) {
          pay = bal + int;
      }
      bal = bal + int - pay;
      totPaidPrepay += pay;
  }
  const totalInterestPrepay = totPaidPrepay - loanAmount;

  // Savings Calculations
  const savedTimeRateDrop = nOrg - monthsRateDrop;
  const savedMoneyRateDrop = totalInterestOrg - totalInterestRateDrop;

  const savedTimePrepay = monthsRateDrop - mPrepay;
  const savedMoneyPrepay = totalInterestRateDrop - totalInterestPrepay;

  const totalSavedTime = nOrg - mPrepay;
  const totalSavedMoney = totalInterestOrg - totalInterestPrepay;

  // Formatting Helpers
  const formatYM = (totalMonths) => {
      if (totalMonths <= 0) return '0m';
      const y = Math.floor(totalMonths / 12);
      const m = Math.round(totalMonths % 12);
      if (y === 0) return `${m}m`;
      if (m === 0) return `${y}y 0m`;
      return `${y}y ${m}m`;
  };

  const formatShortAmt = (val) => {
      if (val >= 10000000) return `₹${(val/10000000).toFixed(2)} Cr`;
      if (val >= 100000) return `₹${(val/100000).toFixed(2)} L`;
      return formatCurrency(val);
  }

  const safeTime = (val) => val > 0 ? val : 0;
  const safeMoney = (val) => val > 0 ? val : 0;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-8 lg:space-y-10">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-4">
          <p className="text-sm text-blue-900 font-medium">Prepayment Accelerator: See exactly how much time and interest you save by maintaining your original EMI after a rate drop, combined with extra yearly payments.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FadeIn delay={100} className="space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Loan Amount</span> <span className="text-zinc-900 font-bold">{formatShortAmt(loanAmount)}</span></label>
              <input type="range" min="1000000" max="50000000" step="500000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={150} className="space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Tenure</span> <span className="text-zinc-900 font-bold">{originalTenure} Years</span></label>
              <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={200} className="space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Rate</span> <span className="text-zinc-900 font-bold">{originalRate}%</span></label>
              <input type="range" min="6" max="15" step="0.1" value={originalRate} onChange={(e) => setOriginalRate(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={250} className="space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Current Rate</span> <span className="text-emerald-600 font-bold">{currentRate}%</span></label>
              <input type="range" min="6" max="15" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </FadeIn>
        </div>

        <div className="pt-6 border-t border-zinc-100">
            <FadeIn delay={300} className="mb-8 space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMIs per year</span> <span className="text-zinc-900 font-bold">{extraEmisPerYear}</span></label>
              <input type="range" min="0" max="12" step="1" value={extraEmisPerYear} onChange={(e) => setExtraEmisPerYear(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
            <FadeIn delay={350} className="space-y-4">
              <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMI amount (₹)</span> <span className="text-zinc-900 font-bold">{formatCurrency(extraEmiAmount)}</span></label>
              <input type="range" min="10000" max="500000" step="10000" value={extraEmiAmount} onChange={(e) => setExtraEmiAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </FadeIn>
        </div>
      </div>
      
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 to-transparent rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10 mb-8">
            <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-6">
              <div>
                <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Loan amount</p>
                <p className="text-lg font-light">{formatShortAmt(loanAmount)}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Monthly EMI</p>
                <p className="text-lg font-light">{formatCurrency(originalEMI)}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Original Rate</p>
                <p className="text-lg font-light">{originalRate}%</p>
              </div>
               <div>
                <p className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Current Rate</p>
                <p className="text-lg font-light text-emerald-400">{currentRate}%</p>
              </div>
            </div>

            {/* Tenure comparison card */}
            <div className="bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-800">
               <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-4">Tenure comparison</p>
               <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                     <p className="text-[10px] text-zinc-500 mb-1">At {originalRate}% (org)</p>
                     <p className="text-sm sm:text-base lg:text-lg font-medium">{formatYM(nOrg)}</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-zinc-500 mb-1">At {currentRate}% (same EMI)</p>
                     <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-400">{formatYM(monthsRateDrop)}</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-zinc-500 mb-1">At {currentRate}% + prepay</p>
                     <p className="text-sm sm:text-base lg:text-lg font-medium text-emerald-400">{formatYM(mPrepay)}</p>
                  </div>
               </div>
            </div>

            {/* Savings breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center mt-6">
               <div>
                  <p className="text-[9px] sm:text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Saved by rate drop</p>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-400 mb-0.5">{formatYM(safeTime(savedTimeRateDrop))}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{formatShortAmt(safeMoney(savedMoneyRateDrop))}</p>
               </div>
               <div>
                  <p className="text-[9px] sm:text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Saved by prepay</p>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-emerald-400 mb-0.5">{formatYM(safeTime(savedTimePrepay))}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{formatShortAmt(safeMoney(savedMoneyPrepay))}</p>
               </div>
               <div className="border-l border-zinc-800 pl-2">
                  <p className="text-[9px] sm:text-[10px] font-medium tracking-widest text-zinc-400 uppercase mb-1">Total saved</p>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-white mb-0.5">{formatYM(safeTime(totalSavedTime))}</p>
                  <p className="text-[10px] sm:text-xs text-emerald-500 bg-emerald-900/30 rounded-full inline-block px-2 py-0.5">{formatShortAmt(safeMoney(totalSavedMoney))}</p>
               </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const SmartEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(20);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);

  // Math Setup
  const r = loanInterest / 12 / 100;
  const n = tenureYears * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPaidToBank = emi * n;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  // SIP Math to recover total interest
  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const requiredSip = totalInterestPaid / sipFactor;
  const sipPercentageOfEmi = ((requiredSip / emi) * 100).toFixed(1);

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-8 lg:space-y-10">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-4">
          <p className="text-sm text-emerald-900 font-medium">The Magical Math: Start a fractional parallel SIP alongside your EMI. By the end of your loan tenure, your SIP corpus will recover <strong className="font-bold">100% of the interest</strong> you paid to the bank.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{tenureYears} Years</div>
          </div>
          <input type="range" min="5" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Home Loan Interest</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
             <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto">{sipReturn}%</div>
          </div>
          <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={300} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10 mb-8">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
              <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Your EMI</p>
              <p className="text-xl font-light text-white">{formatCurrency(emi)}</p>
            </div>
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
              <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Total Interest Paid</p>
              <p className="text-xl font-light text-red-400">{formatCurrency(totalInterestPaid)}</p>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4">Required Monthly SIP to recover 100% of interest</p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-6">{formatCurrency(requiredSip)}</p>
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" /> That's just {sipPercentageOfEmi}% of your EMI amount!
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const EarlyClosureWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [targetTenure, setTargetTenure] = useState(10);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);

  useEffect(() => {
    if (targetTenure >= originalTenure) {
      setTargetTenure(originalTenure - 1 || 1);
    }
  }, [originalTenure, targetTenure]);

  // EMI Math
  const r = loanInterest / 12 / 100;
  const n = originalTenure * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

  // Outstanding Principal at Target Tenure
  const t = targetTenure * 12;
  const outstandingPrincipal = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, t)) / (Math.pow(1 + r, n) - 1);

  // SIP required to match outstanding principal at target tenure
  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, t) - 1) / i) * (1 + i);
  const requiredSip = outstandingPrincipal / sipFactor;

  // Savings Math
  const originalTotalOutflow = emi * n;
  const newTotalOutflow = (emi * t) + (requiredSip * t);
  const totalSavings = originalTotalOutflow - newTotalOutflow;
  const yearsSaved = originalTenure - targetTenure;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-8 lg:space-y-10">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-4">
          <p className="text-sm text-indigo-900 font-medium">The Debt Destroyer: Calculate the exact parallel SIP required to build a corpus large enough to foreclose your home loan years ahead of schedule.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(loanAmount)}</div>
          </div>
          <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Original Loan Tenure</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{originalTenure} Years</div>
          </div>
          <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Target Closure Time</label>
            <div className="text-xl sm:text-2xl font-light text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 w-full sm:w-auto">{targetTenure} Years</div>
          </div>
          <input type="range" min="1" max={originalTenure - 1} step="1" value={targetTenure} onChange={(e) => setTargetTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={250}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{loanInterest}%</div>
          </div>
          <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
             <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{sipReturn}%</div>
          </div>
          <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={350} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10 mb-8">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
              <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Your Regular EMI</p>
              <p className="text-xl font-light text-white">{formatCurrency(emi)}</p>
            </div>
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
              <div>
                 <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">Loan Balance at Year {targetTenure}</p>
                 <p className="text-[10px] text-zinc-500 mt-1">Corpus needed to foreclose</p>
              </div>
              <p className="text-xl font-light text-red-400">{formatCurrency(outstandingPrincipal)}</p>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Required Monthly SIP to close early</p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-6">{formatCurrency(requiredSip)}</p>
            
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 text-sm font-medium px-4 py-2.5 rounded-xl w-fit">
                <Activity className="w-4 h-4 shrink-0" /> You save {yearsSaved} years of EMIs!
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-2.5 rounded-xl w-fit">
                <Check className="w-4 h-4 shrink-0" /> Net Wealth Saved: {formatCurrency(totalSavings)}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const FireCalculatorWidget = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [yearsToRetire, setYearsToRetire] = useState(15);
  const [inflation, setInflation] = useState(6);

  // F.I.R.E Math (Rule of 30 adjusted for inflation)
  const currentAnnualExp = monthlyExpenses * 12;
  const futureAnnualExp = currentAnnualExp * Math.pow(1 + inflation / 100, yearsToRetire);
  const requiredCorpus = futureAnnualExp * 30; // Safe withdrawal equivalent

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-10 lg:space-y-16">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-4">
          <p className="text-sm text-blue-800 font-medium">Financial Independence, Retire Early. Calculate the exact corpus required to stop working and live purely off your portfolio yields.</p>
        </div>
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Current Monthly Expenses</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(monthlyExpenses)}</div>
          </div>
          <input type="range" min="20000" max="500000" step="5000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Years to Retirement</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{yearsToRetire} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={yearsToRetire} onChange={(e) => setYearsToRetire(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Inflation</label>
            <div className="text-xl sm:text-2xl font-light text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 w-full sm:w-auto">{inflation}%</div>
          </div>
          <input type="range" min="3" max="12" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          <div className="space-y-8 sm:space-y-12 relative z-10 mb-12 lg:mb-16">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Projected Future Monthly Expense</p>
              <p className="text-2xl sm:text-3xl font-light text-zinc-300">{formatCurrency(futureAnnualExp / 12)}</p>
              <p className="text-xs text-zinc-500 mt-1">Adjusted for {inflation}% inflation</p>
            </div>
          </div>
          <div className="pt-8 sm:pt-12 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-400 uppercase mb-3 sm:mb-4">Target F.I.R.E. Corpus</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredCorpus)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const LumpsumCalculatorWidget = () => {
  const [lumpsum, setLumpsum] = useState(1000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const maturityValue = lumpsum * Math.pow(1 + expectedReturn / 100, years);
  const wealthGained = maturityValue - lumpsum;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-10 lg:space-y-16">
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">One-time Investment</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(lumpsum)}</div>
          </div>
          <input type="range" min="10000" max="50000000" step="10000" value={lumpsum} onChange={(e) => setLumpsum(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
            <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
           <div className="space-y-8 sm:space-y-12 relative z-10 mb-12 lg:mb-16">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Total Invested</p>
              <p className="text-2xl sm:text-3xl font-light">{formatCurrency(lumpsum)}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Wealth Gained</p>
              <p className="text-2xl sm:text-3xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
            </div>
          </div>
          <div className="pt-8 sm:pt-12 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-500 uppercase mb-3 sm:mb-4">Future Value</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none">{formatCurrency(maturityValue)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const GoalCalculatorWidget = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Reverse SIP Math
  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const requiredSip = targetAmount / (((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth));

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 animate-in fade-in zoom-in-95 duration-500">
      <div className="lg:col-span-7 space-y-10 lg:space-y-16">
        <FadeIn delay={100}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Target Goal Amount</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{formatCurrency(targetAmount)}</div>
          </div>
          <input type="range" min="100000" max="100000000" step="100000" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Time to Goal</label>
            <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto">{years} Years</div>
          </div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
            <div className="text-xl sm:text-2xl font-light text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 w-full sm:w-auto">{expectedReturn}%</div>
          </div>
          <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 sm:h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </FadeIn>
      </div>
      <div className="lg:col-span-5">
        <FadeIn delay={400} className="bg-zinc-950 text-white p-8 sm:p-10 lg:p-12 xl:p-16 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
          <div className="space-y-8 sm:space-y-12 relative z-10 mb-12 lg:mb-16">
            <div>
              <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">To reach your goal of</p>
              <p className="text-2xl sm:text-3xl font-light text-zinc-300">{formatCurrency(targetAmount)}</p>
            </div>
          </div>
          <div className="pt-8 sm:pt-12 border-t border-zinc-800 relative z-10">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-indigo-400 uppercase mb-3 sm:mb-4">Required Monthly SIP</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-none">{formatCurrency(requiredSip)}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

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

        {queryState === 'result' && selectedGoal && (
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


// --- ABOUT PAGE COMPONENT ---
const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Section 1: Hero */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn>
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter text-zinc-950 mb-6 lg:mb-8 leading-[1.05]">
            Driven by data. <br />
            <span className="font-medium text-emerald-600">Defined by trust.</span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-8 sm:mb-10">
            Ask Geo was founded on a singular vision: to bring institutional-grade financial strategies to individual investors with absolute transparency.
          </p>
        </FadeIn>
      </section>

      {/* Section 2: Genesis */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-zinc-50 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-50 group-hover:scale-105 transition-transform duration-700"></div>
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-emerald-600/20 relative z-10 mb-6 lg:mb-8" strokeWidth={1}/>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light relative z-10 text-zinc-900 leading-tight">"Wealth creation shouldn't be a black box. Our goal is absolute clarity."</h3>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-6 lg:mb-8">Our Genesis</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed mb-6">
              For years, the financial advisory industry has thrived on complexity, jargon, and hidden fees. Ask Geo was created to dismantle that complexity. 
            </p>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed mb-8 lg:mb-10">
              We realized that true financial freedom comes when clients deeply understand their portfolios. By combining advanced AI analytics with human empathy, we've built a platform where your goals are the only metrics that matter. We don't just manage money; we educate, empower, and elevate our investors.
            </p>
            <div className="flex gap-8 sm:gap-12 border-t border-zinc-100 pt-8">
               <div>
                 <p className="text-2xl sm:text-3xl xl:text-4xl font-medium text-zinc-900 mb-1">2015</p>
                 <p className="text-[10px] sm:text-xs xl:text-sm text-zinc-400 tracking-widest uppercase">Established</p>
               </div>
               <div>
                 <p className="text-2xl sm:text-3xl xl:text-4xl font-medium text-zinc-900 mb-1">Pune</p>
                 <p className="text-[10px] sm:text-xs xl:text-sm text-zinc-400 tracking-widest uppercase">Headquarters</p>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Core Principles */}
      <section className="bg-zinc-950 text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 my-16 sm:my-24">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">The Ask Geo Pillars</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-400 font-light max-w-3xl">The non-negotiable principles that guide every portfolio decision we make.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {[
              { title: "Radical Transparency", desc: "No hidden loads, no opaque commissions. You see exactly what we see." },
              { title: "Data-Backed", desc: "Emotions destroy wealth. We rely on quantitative models and AI insights." },
              { title: "Fiduciary Duty", desc: "Your interests always precede ours. We grow only when your portfolio grows." },
              { title: "Holistic Planning", desc: "We look beyond mere returns, focusing on taxation, risk, and succession." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="up" className="bg-zinc-900 border border-zinc-800 p-8 sm:p-10 rounded-[2rem] hover:border-emerald-500/30 transition-colors">
                <div className="text-emerald-500 font-mono text-sm sm:text-base mb-6">0{idx + 1}</div>
                <h4 className="text-xl sm:text-2xl font-medium mb-4">{item.title}</h4>
                <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Leadership */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 sm:py-24">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <FadeIn className="lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-6 sm:mb-8">Leadership</h2>
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-zinc-100 rounded-[2.5rem] sm:rounded-[3rem] relative overflow-hidden group">
                 <img src="https://static.wixstatic.com/media/548938_b7e4824e0e084ad59adf9a725e61dbdb~mv2.jpeg" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
                 <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10">
                    <h3 className="text-2xl sm:text-3xl font-medium text-white">Geo Thomas</h3>
                    <p className="text-emerald-400 text-xs sm:text-sm font-medium tracking-widest uppercase mt-1 sm:mt-2">Founder & Chief Advisor</p>
                 </div>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="lg:w-2/3 flex flex-col justify-center">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-zinc-200 mb-6 sm:mb-8" strokeWidth={1} />
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed text-zinc-800 mb-6 sm:mb-10">
                "I started Ask Geo because I saw a massive gap between what institutions were doing to grow wealth and what retail investors were being sold. I wanted to level the playing field."
              </p>
              <p className="text-base sm:text-lg xl:text-xl font-light text-zinc-500 leading-relaxed mb-4 sm:mb-6">
                Geo brings over 15 years of deep market experience, holding AMFI certifications and a profound understanding of macroeconomic cycles. His approach combines rigorous mathematical modeling with a deep understanding of human behavioral finance.
              </p>
              <p className="text-base sm:text-lg xl:text-xl font-light text-zinc-500 leading-relaxed">
                Under his leadership, Ask Geo has grown to manage over 133K Crore in AUM, maintaining an impressive historic XIRR benchmark by staying disciplined, avoiding market noise, and focusing strictly on compounding.
              </p>
            </FadeIn>
         </div>
      </section>

      {/* Section 5: The Difference */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 sm:py-24">
        <FadeIn className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-4 sm:mb-6">The Ask Geo Difference</h2>
          <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light">Why investors switch to us and never leave.</p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="border border-zinc-200 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
            <div className="grid grid-cols-2 border-b border-zinc-200 bg-zinc-50">
              <div className="p-6 sm:p-8 lg:p-10 font-medium text-zinc-500 tracking-widest uppercase text-[10px] sm:text-xs xl:text-sm">Traditional Advisors</div>
              <div className="p-6 sm:p-8 lg:p-10 font-medium text-emerald-600 tracking-widest uppercase text-[10px] sm:text-xs xl:text-sm border-l border-zinc-200 bg-emerald-50/30">Ask Geo Architecture</div>
            </div>
            {[
              ["Product-focused selling", "Client-goal focused architecture"],
              ["Reactive to market news", "Proactive AI-driven rebalancing"],
              ["Opaque fee structures", "100% transparent alignment"],
              ["Generic, one-size-fits-all models", "Hyper-personalized quantitative mapping"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b last:border-0 border-zinc-100">
                <div className="p-6 sm:p-8 lg:p-10 text-zinc-500 font-light text-sm sm:text-base lg:text-lg">{row[0]}</div>
                <div className="p-6 sm:p-8 lg:p-10 text-zinc-900 font-medium text-sm sm:text-base lg:text-lg border-l border-zinc-100 flex items-center gap-3">
                  <Check className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500 shrink-0" strokeWidth={2}/> {row[1]}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Section 6: Footprint */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 sm:py-24">
        <div className="bg-emerald-600 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 lg:p-24 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-emerald-500 rounded-full blur-[60px] lg:blur-[100px]"></div>
           <div className="relative z-10 grid lg:grid-cols-3 gap-12 text-center lg:text-left items-center">
              <FadeIn>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">Our footprint today.</h2>
                <p className="text-emerald-100 font-light text-base sm:text-lg xl:text-xl">Numbers that speak for the trust we've built.</p>
              </FadeIn>
              <FadeIn delay={150} className="flex flex-col justify-center">
                <p className="text-6xl sm:text-7xl xl:text-8xl font-light mb-2 lg:mb-4"><AnimatedNumber end={26} suffix="L+" /></p>
                <p className="text-xs sm:text-sm lg:text-base font-medium tracking-widest uppercase text-emerald-200">Families Secured</p>
              </FadeIn>
              <FadeIn delay={300} className="flex flex-col justify-center">
                <p className="text-6xl sm:text-7xl xl:text-8xl font-light mb-2 lg:mb-4"><AnimatedNumber end={133} suffix="K" /> <span className="text-3xl sm:text-4xl">Cr</span></p>
                <p className="text-xs sm:text-sm lg:text-base font-medium tracking-widest uppercase text-emerald-200">Assets Managed</p>
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
      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn>
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter text-zinc-950 mb-6 lg:mb-8 leading-[1.05]">
            Comprehensive <br />
            <span className="font-medium text-emerald-600">Financial Architecture.</span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-10">
            We don't just pick funds. We build robust, tax-efficient, and inflation-beating systems tailored to your exact life stage.
          </p>
        </FadeIn>
      </section>

      {/* Service 1: Wealth Management */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-4 sm:mb-6">Wealth Management</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed mb-6 sm:mb-8">
              Our core offering. We look at your entire financial landscape—assets, liabilities, cash flow, and goals—to engineer a comprehensive strategy that preserves capital while seeking aggressive growth where appropriate.
            </p>
            <ul className="space-y-4 mb-8 sm:mb-10">
              {['Goal-based SIP structuring', 'Lumpsum deployment strategies', 'Asset allocation modeling', 'Retirement corpus planning'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light text-sm sm:text-base lg:text-lg"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="text-xs sm:text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              VIEW DETAILED STRATEGY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
          <FadeIn delay={200} className="order-1 lg:order-2">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] bg-zinc-50 rounded-[2.5rem] sm:rounded-[3rem] border border-zinc-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent"></div>
               <PieChart className="absolute -bottom-10 -right-10 w-64 h-64 lg:w-96 lg:h-96 text-zinc-200" strokeWidth={0.5} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Service 2: Portfolio Management */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] bg-zinc-950 rounded-[2.5rem] sm:rounded-[3rem] border border-zinc-800 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 to-transparent"></div>
               <TrendingUp className="absolute -top-10 -left-10 w-64 h-64 lg:w-96 lg:h-96 text-zinc-800" strokeWidth={0.5} />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
              <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-4 sm:mb-6">Portfolio Management</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed mb-6 sm:mb-8">
              For High Net Worth Individuals (HNIs) requiring active oversight. We utilize our AI Insight Engine alongside macro-economic research to actively rebalance and optimize your exposure to Equity, Debt, and Alternative assets.
            </p>
            <ul className="space-y-4 mb-8 sm:mb-10">
              {['Active ETF & Direct Equity advisory', 'Dynamic debt fund rotation', 'Quarterly rebalancing', 'Tax-loss harvesting'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light text-sm sm:text-base lg:text-lg"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="text-xs sm:text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              EXPLORE PMS CAPABILITIES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Service 3: Risk & Insurance */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-4 sm:mb-6">Risk & Insurance</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed mb-6 sm:mb-8">
              Wealth creation is futile without wealth protection. We audit your existing liabilities and recommend pure-risk coverage to ensure your family's financial fortress is impenetrable against life's uncertainties.
            </p>
            <ul className="space-y-4 mb-8 sm:mb-10">
              {['Term life coverage analysis', 'Comprehensive health/mediclaim structuring', 'Key-man insurance for business owners', 'Asset & liability protection'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-light text-sm sm:text-base lg:text-lg"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="text-xs sm:text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2 group">
              SECURE YOUR PORTFOLIO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
          </FadeIn>
          <FadeIn delay={200} className="order-1 lg:order-2">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] bg-emerald-50 rounded-[2.5rem] sm:rounded-[3rem] border border-emerald-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-50"></div>
               <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-80 lg:h-80 text-emerald-200" strokeWidth={0.5} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-zinc-50 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 my-16 sm:my-24 border-y border-zinc-100">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 sm:mb-20 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">Our Onboarding Protocol</h2>
            <p className="text-base sm:text-lg xl:text-xl text-zinc-500 font-light leading-relaxed">A systematic, friction-free process designed to transition you into a fully optimized portfolio within weeks.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative">
             <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-zinc-200 z-0"></div>
             {[
               { step: "01", title: "Discovery", desc: "A deep dive into your current assets, liabilities, and aspirations." },
               { step: "02", title: "Audit", desc: "Our AI Engine analyzes your existing portfolio for inefficiencies and hidden risks." },
               { step: "03", title: "Architecture", desc: "We present a mathematical, newly structured portfolio blueprint." },
               { step: "04", title: "Execution", desc: "Seamless deployment and the start of 24/7 active monitoring." }
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 100} direction="up" className="relative z-10 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/20">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-medium mb-6 sm:mb-8">{item.step}</div>
                 <h4 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{item.title}</h4>
                 <p className="text-zinc-500 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 sm:py-24 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
        <FadeIn className="lg:w-2/3">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-4 sm:mb-6">Ready to optimize?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-2xl mx-auto lg:mx-0">Don't leave your financial future to chance. Let our experts build a data-driven strategy for you today.</p>
        </FadeIn>
        <FadeIn delay={200} className="lg:w-1/3 flex justify-center lg:justify-end w-full">
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="px-8 sm:px-10 py-4 sm:py-5 bg-zinc-950 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors duration-300 shadow-xl shadow-zinc-200 inline-flex items-center justify-center gap-2 group w-full sm:w-auto text-sm sm:text-base">
            Schedule Consultation <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
};

// --- CALCULATORS PAGE COMPONENT ---
const CalculatorsPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('sip');

  const tabs = [
    { id: 'sip', name: 'SIP Pro', icon: TrendingUp },
    { id: 'stepup', name: 'Step-Up SIP', icon: Zap },
    { id: 'lumpsum', name: 'Lumpsum', icon: Briefcase },
    { id: 'emivssip', name: 'EMI vs SIP', icon: PieChart },
    { id: 'prepayment', name: 'EMI Prepayment', icon: ChevronsDown },
    { id: 'smartemi', name: 'Zero-Cost EMI', icon: Sparkles },
    { id: 'earlyclosure', name: 'Early Debt Freedom', icon: ShieldCheck },
    { id: 'fire', name: 'F.I.R.E Target', icon: Map },
    { id: 'goal', name: 'Goal Planner', icon: Target },
  ];

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter text-zinc-950 mb-6 lg:mb-8 leading-[1.05]">
            The Math of <br />
            <span className="font-medium text-emerald-600">Wealth Creation.</span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed mb-10">
            A suite of advanced, precision tools designed to help you visualize compounding, plan for retirement, and map out your definitive path to financial freedom.
          </p>
        </FadeIn>
      </section>

      {/* Main Interactive Calculator Hub */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-10">
        <div className="bg-zinc-50 border border-zinc-100 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-16 xl:p-20 overflow-hidden">
          
          {/* Tab Navigation */}
          <FadeIn className="mb-12 lg:mb-16">
            <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 snap-x border-b border-zinc-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`snap-start whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeTab === tab.id 
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg shadow-zinc-900/20' 
                      : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id && (tab.id === 'smartemi' || tab.id === 'earlyclosure') ? 'text-emerald-400' : ''}`} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                  {tab.name}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Active Calculator Widget Rendering */}
          <div className="min-h-[500px]">
            {activeTab === 'sip' && <SipCalculatorWidget />}
            {activeTab === 'stepup' && <StepUpCalculatorWidget />}
            {activeTab === 'lumpsum' && <LumpsumCalculatorWidget />}
            {activeTab === 'emivssip' && <EmiVsSipCalculatorWidget />}
            {activeTab === 'prepayment' && <ExtraEmiCalculatorWidget />}
            {activeTab === 'smartemi' && <SmartEmiCalculatorWidget />}
            {activeTab === 'earlyclosure' && <EarlyClosureWidget />}
            {activeTab === 'fire' && <FireCalculatorWidget />}
            {activeTab === 'goal' && <GoalCalculatorWidget />}
          </div>

        </div>
      </section>

      {/* Embedded Consult CTA */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-20 text-center">
        <FadeIn>
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter mb-4">Numbers look good?</h2>
          <p className="text-zinc-500 font-light max-w-xl mx-auto mb-8">Calculators show possibilities. Our experts turn them into realities. Let Ask Geo build the portfolio that executes your math.</p>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition-colors shadow-xl shadow-emerald-600/20 inline-flex items-center gap-2">
            Schedule a Strategy Session <ArrowRight className="w-4 h-4" />
          </button>
        </FadeIn>
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
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter text-zinc-950 mb-6 lg:mb-8 leading-[1.05]">
            Market <br />
            <span className="font-medium text-emerald-600">Intelligence.</span>
          </h1>
          <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed mb-10">
            Institutional-grade research, macroeconomic breakdowns, and tactical strategies to keep you ahead of the curve.
          </p>
        </FadeIn>
      </section>

      {/* Featured Insight */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-10">
        <FadeIn delay={100}>
          <div className="bg-zinc-950 text-white rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center group cursor-pointer relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent group-hover:scale-105 transition-transform duration-700"></div>
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="aspect-square sm:aspect-[16/9] lg:aspect-[4/3] bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800">
                <BookOpen className="w-16 h-16 lg:w-24 lg:h-24 text-zinc-700 group-hover:text-emerald-500 transition-colors duration-500" strokeWidth={1} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-950 bg-emerald-400 px-3 py-1.5 rounded-md">SPECIAL REPORT</span>
                <span className="text-xs sm:text-sm text-zinc-400 font-light">November 2023</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter mb-6 sm:mb-8 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                The 2024 Blueprint: Positioning portfolios for the next election cycle.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl">
                An exhaustive 40-page analysis of historical market behaviors preceding Indian general elections, identifying tactical overweight opportunities in infrastructure, manufacturing, and consumption sectors.
              </p>
              <span className="inline-flex items-center gap-2 font-medium text-white group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                Read Full Report <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Article Grid */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24 border-t border-zinc-100 mt-10">
        <FadeIn className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter">Latest Publications</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-20">
          {articles.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 100} direction="up" className="group cursor-pointer flex flex-col h-full">
              <div className="aspect-[16/10] bg-zinc-50 rounded-[2rem] mb-6 sm:mb-8 overflow-hidden relative border border-zinc-100">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 transition-transform duration-700 group-hover:scale-105"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-zinc-300 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1} />
              </div>
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">{post.tag}</span>
                <span className="text-xs sm:text-sm text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-8 relative mb-4 sm:mb-6 leading-snug">
                {post.title}
                <ArrowUpRight className="absolute right-0 top-1 w-5 h-5 sm:w-6 sm:h-6 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" strokeWidth={1.5} />
              </h3>
              <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mt-auto">{post.read}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn delay={200}>
          <div className="bg-emerald-600 rounded-[2.5rem] sm:rounded-[3rem] p-10 sm:p-16 lg:p-20 flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20 relative overflow-hidden shadow-2xl shadow-emerald-600/20">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-emerald-500 rounded-full blur-[80px] lg:blur-[120px]"></div>
            <div className="relative z-10 w-full xl:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tighter text-white mb-4 sm:mb-6">Never miss an insight.</h2>
              <p className="text-emerald-100 font-light leading-relaxed text-base sm:text-lg lg:text-xl">Join 40,000+ investors who receive our weekly macro breakdown and portfolio strategy adjustments directly in their inbox.</p>
            </div>
            <div className="relative z-10 w-full xl:w-auto flex-shrink-0">
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-zinc-900 focus:outline-none w-full sm:w-80 lg:w-96 font-light text-base sm:text-lg" />
                <button type="submit" className="px-8 py-4 sm:py-5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl sm:rounded-2xl font-medium transition-colors whitespace-nowrap text-base sm:text-lg">
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
  const [currentPage, setCurrentPage] = useState('home');

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
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
              <TrendingUp className="text-white w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-900">Ask <span className="text-zinc-500 transition-colors duration-300 group-hover:text-emerald-600">Geo</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
              const pageKey = item.toLowerCase();
              const isActive = currentPage === pageKey;
              
              return (
                <button 
                  key={item} 
                  onClick={() => { setCurrentPage(pageKey); window.scrollTo(0,0); }} 
                  className={`text-[10px] xl:text-xs font-medium tracking-widest transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-zinc-900 after:transition-all after:duration-300 ${isActive ? 'text-zinc-900 after:w-full' : 'text-zinc-500 hover:text-zinc-900 after:w-0 hover:after:w-full'}`}
                >
                  {item}
                </button>
              );
            })}
            
            {/* Replaced Login with Prominent Advanced Tools Button */}
            <button 
              onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} 
              className={`text-[10px] xl:text-xs font-bold tracking-widest px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all flex items-center gap-2 ${currentPage === 'tools' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-zinc-950 border-zinc-950 text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-lg'}`}
            >
              <Sparkles className="w-3 h-3" /> ADVANCED TOOLS
            </button>
          </div>

          <button className="lg:hidden text-zinc-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 py-6 px-6 flex flex-col gap-6 shadow-xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
            const pageKey = item.toLowerCase();
            const isActive = currentPage === pageKey;

            return (
              <button 
                key={item} 
                onClick={() => { setCurrentPage(pageKey); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
                className={`text-sm font-medium tracking-widest text-left flex items-center gap-2 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`}
              >
                {item}
              </button>
            );
          })}
          <div className="h-px bg-zinc-100 w-full"></div>
          
          {/* Mobile Advanced Tools Button */}
          <button 
            onClick={() => { setCurrentPage('tools'); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
            className="mt-2 bg-zinc-950 text-white text-sm font-medium tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 active:bg-emerald-600 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> ADVANCED TOOLS
          </button>
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
      <section id="home" className="relative pt-36 sm:pt-48 pb-20 sm:pb-32 lg:pt-56 lg:pb-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-3/5 z-10 relative">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-100 text-zinc-600 text-[10px] sm:text-xs font-medium tracking-widest mb-6 sm:mb-8">
              <Activity className="w-3 h-3 text-emerald-500" strokeWidth={1.5} /> AI-OPTIMIZED PLANNING
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter leading-[1.05] text-zinc-950 mb-6 lg:mb-8">
              For expert advice, <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Ask Geo.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-zinc-500 mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed">
              We build, manage, and preserve your wealth with highly customized, data-driven financial strategies.
            </p>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a href="https://wa.me/919960624271" target="_blank" rel="noreferrer" className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-zinc-950 text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 animate-pulse-ring w-full sm:w-auto text-center sm:text-left flex justify-center text-sm sm:text-base">
                <span className="relative z-10 flex items-center gap-2">
                  Ask Geo Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </a>
              <button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="px-8 sm:px-10 py-4 sm:py-5 text-zinc-600 font-medium hover:text-zinc-900 transition-colors w-full sm:w-auto text-sm sm:text-base">
                Explore Services
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Hero Abstract Graphic with Floating Cards */}
        <div className="lg:w-2/5 relative w-full h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0 perspective-1000">
          <FadeIn delay={400} direction="left" className="w-full h-full relative">
            
            {/* Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50/80 rounded-full blur-[60px] sm:blur-[100px] -z-10 animate-blob"></div>
            
            {/* Main Center Card Positioning Wrapper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] z-10">
              
              {/* Main Center Card Content & Animation */}
              <div className="w-full bg-white border border-zinc-100 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl shadow-zinc-200/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden group animate-float-slow relative">
                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40" strokeWidth={1} />
                </div>
                
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-emerald-100 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
                    <PieChart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight mb-2">Portfolio Metrics</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm lg:text-base font-light">Historical data & active management</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-10">
                  <div className="bg-zinc-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-zinc-400 tracking-widest mb-1">AUM</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-light">133K<span className="text-zinc-400 text-sm sm:text-lg ml-1">Cr</span></p>
                  </div>
                  <div className="bg-emerald-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-emerald-600/60 tracking-widest mb-1">XIRR</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-light text-emerald-700">+12%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: AI Engine */}
            <div className="absolute left-0 sm:left-4 lg:-left-12 top-4 sm:top-12 bg-zinc-950 border border-zinc-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl animate-float z-20 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-medium text-emerald-400 tracking-widest uppercase mb-0.5">AI Engine</p>
                <p className="text-xs sm:text-sm font-light">Optimizing...</p>
              </div>
            </div>

            {/* Floating Card 2: Trust/Clients */}
            <div className="absolute right-0 sm:right-4 lg:-right-8 top-1/3 bg-white border border-zinc-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-float-delayed z-20 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-medium text-zinc-400 tracking-widest uppercase mb-0.5">Trust</p>
                <p className="text-xs sm:text-sm font-light text-zinc-900">26L+ Clients</p>
              </div>
            </div>

            {/* Floating Card 3: Live Sync */}
            <div className="absolute left-4 sm:left-12 lg:-left-4 bottom-10 sm:bottom-16 bg-white border border-zinc-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-float z-30 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform cursor-default">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-medium text-zinc-400 tracking-widest uppercase mb-0.5">Live Sync</p>
                <p className="text-xs sm:text-sm font-light text-zinc-900">Market Data</p>
              </div>
            </div>

          </FadeIn>
        </div>
      </section>

      {/* --- Clean Divider Stats --- */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-16 lg:py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          <FadeIn delay={100} direction="none" className="py-4 sm:pr-8 lg:pr-12 text-center sm:text-left">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-900 mb-2 sm:mb-4">
              <AnimatedNumber end={26} suffix="L+" />
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Active Investors</p>
          </FadeIn>
          <FadeIn delay={200} direction="none" className="py-8 sm:py-4 sm:px-8 lg:px-12 text-center sm:text-left">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-900 mb-2 sm:mb-4">
              <AnimatedNumber end={133} suffix="K" />
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Crore AUM</p>
          </FadeIn>
          <FadeIn delay={300} direction="none" className="py-8 sm:py-4 sm:pl-8 lg:pl-12 text-center sm:text-left sm:col-span-2 lg:col-span-1 sm:border-t lg:border-t-0 sm:pt-8 lg:pt-4">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-emerald-600 mb-2 sm:mb-4">
              <AnimatedNumber end={12} suffix="%" />
            </h4>
            <p className="text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">Historic XIRR</p>
          </FadeIn>
        </div>
      </section>

      {/* --- NEW SECTION 1: Core Values / Approach --- */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto">
        <FadeIn className="mb-16 lg:mb-24 max-w-4xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-6 sm:mb-8">Our Core Philosophy</h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed">
            We operate on principles that prioritize your long-term security, utilizing data-driven precision to eliminate guesswork from your financial future.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 xl:gap-20">
          {[
            { icon: Target, title: "Absolute Precision", desc: "Every portfolio is mathematically optimized to align perfectly with your risk appetite and timelines." },
            { icon: ShieldCheck, title: "Unwavering Trust", desc: "100% transparency in fee structures and investment logic. We win only when your portfolio wins." },
            { icon: Zap, title: "Dynamic Agility", desc: "Market conditions change rapidly. Our strategies adapt in real-time to protect and grow your wealth." }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-500">
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 group-hover:text-emerald-600 transition-colors group-hover:rotate-12 duration-500" strokeWidth={1} />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight mb-3 sm:mb-4">{item.title}</h3>
              <p className="text-zinc-500 font-light text-base sm:text-lg leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- AI Tool Section (Minimal & Magical) --- */}
      <section id="ai-tools" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square bg-emerald-50/50 rounded-full blur-[80px] sm:blur-[120px] -z-10 animate-blob animation-delay-2000"></div>
        
        <FadeIn className="mb-16 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl sm:rounded-[2rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40 mb-6 sm:mb-8 group hover:shadow-emerald-200/50 transition-all duration-500">
            <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 group-hover:animate-bounce" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-6 sm:mb-8">Geo AI Insight Engine</h2>
          <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed">
            Experience the future of financial planning. Our proprietary AI tools analyze market trends, risk tolerance, and your unique goals to provide real-time strategies.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <AIAssistantWidget />
        </FadeIn>
      </section>

      {/* --- Philosophy Section --- */}
      <section id="about" className="py-24 sm:py-32 lg:py-40 bg-zinc-950 text-white px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-center">
          <div>
            <FadeIn>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter mb-8 sm:mb-10 leading-[1.1]">
                Let's talk about <br/><span className="text-emerald-400">wealth.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-zinc-400 text-lg sm:text-xl xl:text-2xl font-light leading-relaxed mb-8 sm:mb-10">
                Wealth is not just about accumulating assets, but managing them in a way that aligns with your values. It requires a personalized plan factoring in risk tolerance, goals, and life circumstances.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <blockquote className="border-l-2 sm:border-l-4 border-emerald-500 pl-6 sm:pl-8 py-2 mb-8 sm:mb-10 text-xl sm:text-2xl xl:text-3xl font-normal text-zinc-300 leading-snug">
                "The ‘know-nothing’ investor should practice diversification, but it is crazy if you are an expert."
              </blockquote>
            </FadeIn>
            <FadeIn delay={300}>
              <button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="inline-flex items-center gap-3 text-white font-medium text-lg sm:text-xl hover:text-emerald-400 transition-colors group">
                Let's Build Wealth <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
              </button>
            </FadeIn>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 relative">
            <FadeIn delay={100} direction="right" className="space-y-4 sm:space-y-6 lg:space-y-8 sm:pt-12 lg:pt-16">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 hover:bg-zinc-800 transition-colors">
                <PieChart className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-6 sm:mb-8" strokeWidth={1.5} />
                <h4 className="font-normal text-xl sm:text-2xl mb-2 sm:mb-3">Mutual Funds</h4>
                <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light">Expertly curated schemes for optimal growth.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 hover:bg-zinc-800 transition-colors">
                <TrendingUp className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-6 sm:mb-8" strokeWidth={1.5} />
                <h4 className="font-normal text-xl sm:text-2xl mb-2 sm:mb-3">Equity & ETFs</h4>
                <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light">Direct market participation with strategy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={200} direction="right" className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 hover:bg-zinc-800 transition-colors">
                <ShieldCheck className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-6 sm:mb-8" strokeWidth={1.5} />
                <h4 className="font-normal text-xl sm:text-2xl mb-2 sm:mb-3">Bonds & FD</h4>
                <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light">Secure, fixed-income instruments.</p>
              </div>
              <div className="bg-emerald-600 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 text-white flex flex-col justify-center min-h-[200px] sm:min-h-[250px] hover:scale-105 transition-transform duration-500">
                <h4 className="font-light text-5xl sm:text-6xl xl:text-7xl mb-2 sm:mb-4">12%</h4>
                <p className="text-emerald-100 font-medium tracking-widest text-xs sm:text-sm uppercase">Historic XIRR</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto">
        <FadeIn className="mb-16 sm:mb-20 lg:mb-24 lg:flex justify-between items-end">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-6 sm:mb-8">Our Expertise</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed">
              As a financial advisor, I offer a range of services designed to help my clients achieve their ultimate financial freedom.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { title: "Wealth Management", icon: Briefcase, desc: "Building and preserving wealth through personalized, high-yield management strategies." },
            { title: "Portfolio Management", icon: TrendingUp, desc: "Recommending and adjusting the diversity of investments to ensure the best possible long-term outcome." },
            { title: "Insurance Management", icon: ShieldCheck, desc: "Managing risk by assessing needs, identifying coverage gaps and recommending policies." }
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group">
              <div className="bg-zinc-50 border border-zinc-100 p-10 sm:p-12 lg:p-16 rounded-[2.5rem] sm:rounded-[3rem] hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-sm group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all duration-500">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 transition-colors group-hover:-rotate-12 duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-4 sm:mb-6">{service.title}</h3>
                <p className="text-zinc-500 font-light text-base sm:text-lg leading-relaxed mt-auto">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 2: Interactive Tools Teaser --- */}
      <section className="py-24 sm:py-32 lg:py-40 bg-zinc-950 text-white px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden">
        {/* Abstract dark background elements */}
        <div className="absolute top-0 right-0 w-full max-w-[800px] aspect-square bg-emerald-900/20 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none animate-blob animation-delay-4000"></div>
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <div className="w-full lg:w-1/2">
            <FadeIn className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs sm:text-sm font-medium tracking-widest mb-8 sm:mb-10">
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} /> INTERACTIVE TOOLS
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-6 sm:mb-8 leading-[1.1]">
                Visualize your <br/><span className="font-medium text-emerald-400">financial trajectory.</span>
              </h2>
              <p className="text-zinc-400 text-lg sm:text-xl xl:text-2xl font-light leading-relaxed mb-10 sm:mb-12">
                Don't guess your future. Use our advanced SIP, Lumpsum, and Retirement calculators to mathematically map out your path to financial freedom.
              </p>
              <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white text-zinc-950 rounded-full font-medium hover:bg-emerald-400 hover:text-white transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto justify-center">
                Try Calculators <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </button>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn delay={200} direction="left">
              <div className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-md p-8 sm:p-12 lg:p-16 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl">
                <div className="flex justify-between items-center mb-8 sm:mb-10 border-b border-zinc-800 pb-6 sm:pb-8">
                  <div>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white mb-2">SIP Calculator Pro</h4>
                    <p className="text-xs sm:text-sm font-light text-zinc-500 uppercase tracking-widest">Projected Growth</p>
                  </div>
                  <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex justify-between text-sm sm:text-base mb-3 sm:mb-4">
                      <span className="text-zinc-400 font-light">Monthly Investment</span>
                      <span className="text-white font-medium">₹25,000</span>
                    </div>
                    <AnimatedProgress width="33%" delay={200} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm sm:text-base mb-3 sm:mb-4">
                      <span className="text-zinc-400 font-light">Time Period</span>
                      <span className="text-white font-medium">15 Years</span>
                    </div>
                    <AnimatedProgress width="50%" delay={500} />
                  </div>
                  <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-zinc-800">
                    <p className="text-zinc-400 font-light text-sm sm:text-base mb-2 sm:mb-3">Estimated Future Value</p>
                    <p className="text-4xl sm:text-5xl xl:text-6xl font-light text-emerald-400">
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
      <section className="py-24 sm:py-32 lg:py-40 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 sm:mb-24 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">The Ask Geo Framework</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light">Three levels of service completely customized to your goals.</p>
          </FadeIn>

          <div className="space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl">
            {[
              { step: "01", title: "Life & Financial Objectives", desc: "Identifying your objectives is essential. We discuss your goals in detail to develop a personalized, actionable strategy." },
              { step: "02", title: "Where on the map are you?", desc: "Assessing current progress is crucial. By understanding your exact position, we strategize and make highly informed decisions." },
              { step: "03", title: "Choosing Your Path", desc: "Selecting the right path is crucial for financial success. We explore different strategies to navigate towards your goals with confidence." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="left">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 group cursor-default">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-light text-zinc-300 group-hover:text-emerald-500 transition-colors duration-500 sm:mt-1 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight mb-3 sm:mb-4 group-hover:text-emerald-600 transition-colors duration-300">{item.title}</h4>
                    <p className="text-zinc-500 font-light leading-relaxed text-base sm:text-lg lg:text-xl">{item.desc}</p>
                  </div>
                </div>
                {idx !== 2 && <div className="h-px w-full bg-zinc-200 mt-12 sm:mt-16 lg:mt-20 sm:ml-24 lg:ml-32"></div>}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 3: The Expert / Team --- */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2 relative">
          <FadeIn direction="right">
            <div className="w-full aspect-square sm:aspect-[4/5] bg-zinc-100 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden relative group">
              <img src="https://static.wixstatic.com/media/548938_b7e4824e0e084ad59adf9a725e61dbdb~mv2.jpeg" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-zinc-900/10 mix-blend-overlay"></div>
              <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12 z-10 bg-white/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-xl">
                <p className="text-xs sm:text-sm font-medium tracking-widest text-emerald-600 uppercase mb-1 sm:mb-2">Chief Advisor</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-zinc-900">Geo Thomas</h3>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="w-full lg:w-1/2">
          <FadeIn delay={200}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-6 sm:mb-8 lg:mb-10">Guided by <br className="hidden sm:block"/>experience.</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed mb-6 sm:mb-8">
              With years of navigating complex market cycles, Geo brings an institutional-grade approach to personal wealth management. 
            </p>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light leading-relaxed mb-10 sm:mb-12">
              "My mission isn't just to pick funds; it's to architect a financial fortress around your family so you can focus on living, not worrying about the market."
            </p>
            <div className="flex gap-12 sm:gap-16 lg:gap-24 border-t border-zinc-100 pt-8 sm:pt-10">
              <div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 mb-1 sm:mb-2">15+</p>
                <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-zinc-400 tracking-widest uppercase">Years Exp.</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 mb-1 sm:mb-2">AMFI</p>
                <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-zinc-400 tracking-widest uppercase">Certified</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- NEW SECTION 4: Testimonials --- */}
      <section className="py-24 sm:py-32 lg:py-40 bg-zinc-950 text-white px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 sm:mb-20 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-6 sm:mb-8">What our investors say</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-400 font-light">Trust is built on consistent performance and transparent communication.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {[
              { text: "Ask Geo transformed my scattered investments into a cohesive, high-performing portfolio. Their AI insights gave me confidence I never had before.", name: "Rajesh Sharma", role: "Tech Entrepreneur" },
              { text: "The transparency is refreshing. I know exactly where every rupee is going and why. The historic XIRR isn't just a number, it's a reality.", name: "Priya Desai", role: "Medical Professional" },
              { text: "Retirement planning felt overwhelming until Geo mapped it out step-by-step. The clear trajectory and data-backed choices are phenomenal.", name: "Amit Verma", role: "Corporate Director" }
            ].map((review, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up">
                <div className="bg-zinc-900 border border-zinc-800 p-8 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] h-full flex flex-col relative overflow-hidden group hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500">
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 text-zinc-800/50 group-hover:text-emerald-900/30 group-hover:rotate-12 transition-all duration-500" strokeWidth={1} />
                  <div className="flex gap-1 mb-6 sm:mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-zinc-300 font-light leading-relaxed mb-8 sm:mb-10 flex-grow">"{review.text}"</p>
                  <div>
                    <p className="font-medium text-white text-base sm:text-lg">{review.name}</p>
                    <p className="text-xs sm:text-sm text-zinc-500 font-light">{review.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 5: Market Intelligence (Blog) --- */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto">
        <FadeIn className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-20 gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">Market Intelligence</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light">Latest insights, strategies, and macroeconomic updates.</p>
          </div>
          <button onClick={() => { setCurrentPage('insights'); window.scrollTo(0,0); }} className="text-xs sm:text-sm font-medium tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2">
            VIEW ALL INSIGHTS <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
          </button>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { tag: "EQUITY", date: "Oct 12, 2023", title: "Navigating Volatility: Why Tech ETFs remain a stronghold." },
            { tag: "TAX PLANNING", date: "Sep 28, 2023", title: "Maximizing Section 80C: ELSS vs Traditional PPF." },
            { tag: "MACRO", date: "Sep 15, 2023", title: "How global interest rates are affecting Indian Debt Funds." }
          ].map((post, idx) => (
            <FadeIn key={idx} delay={idx * 150} direction="up" className="group cursor-pointer">
              <div className="aspect-[16/9] sm:aspect-square lg:aspect-[16/10] bg-zinc-100 rounded-[2rem] sm:rounded-3xl mb-6 sm:mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-50 transition-transform duration-700 group-hover:scale-105"></div>
                <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 text-zinc-300" strokeWidth={1} />
              </div>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md">{post.tag}</span>
                <span className="text-xs sm:text-sm text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-8 relative mb-4 sm:mb-6 leading-snug">
                {post.title}
                <ArrowUpRight className="absolute right-0 top-1 w-5 h-5 sm:w-6 sm:h-6 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" strokeWidth={1.5} />
              </h3>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 6: FAQ --- */}
      <section className="py-24 sm:py-32 lg:py-40 bg-zinc-50 border-t border-zinc-100 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 sm:mb-20 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter mb-4 sm:mb-6">Common Questions</h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light">Everything you need to know about working with Ask Geo.</p>
          </FadeIn>
          <div className="space-y-4 sm:space-y-6 max-w-4xl">
            {[
              { q: "What is the minimum investment required to start?", a: "We believe in democratizing wealth. While we manage HNIs, our advisory services are available to anyone committed to long-term wealth building, starting with SIPs as low as ₹5,000/month." },
              { q: "How are your advisory fees structured?", a: "We maintain 100% transparency. Our fees are strictly based on a percentage of Assets Under Management (AUM) or via direct mutual fund commissions, ensuring our goals are perfectly aligned with your growth." },
              { q: "Can I track my portfolio's performance daily?", a: "Absolutely. You get exclusive access to the Ask Geo Client Desk and E-Wealth A/C, providing real-time tracking, AI insights, and detailed reports 24/7." },
              { q: "How frequently will my portfolio be reviewed?", a: "We conduct comprehensive quarterly reviews with you, while our internal systems and AI engines monitor your portfolio daily to capitalize on market opportunities." }
            ].map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 100} direction="up">
                <div 
                  className={`border border-zinc-200 rounded-[1.5rem] sm:rounded-[2rem] bg-white overflow-hidden transition-all duration-300 cursor-pointer ${openFaq === idx ? 'shadow-xl shadow-zinc-200/50' : 'hover:border-zinc-300'}`}
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <div className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8 flex justify-between items-center gap-6">
                    <h4 className={`text-lg sm:text-xl lg:text-2xl font-medium transition-colors ${openFaq === idx ? 'text-emerald-600' : 'text-zinc-900'}`}>{faq.q}</h4>
                    <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-emerald-600' : ''}`} strokeWidth={1.5} />
                  </div>
                  <div className={`px-6 sm:px-8 lg:px-10 transition-all duration-300 ease-in-out ${openFaq === idx ? 'pb-6 sm:pb-8 opacity-100 max-h-60 sm:max-h-40' : 'max-h-0 opacity-0 pb-0'}`}>
                    <p className="text-zinc-500 font-light text-base sm:text-lg leading-relaxed border-t border-zinc-100 pt-4 sm:pt-6">{faq.a}</p>
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
      <section className="py-32 sm:py-40 lg:py-48 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-950 to-zinc-950 z-0"></div>
        
        <div className="w-full max-w-[1800px] mx-auto relative z-10">
          <FadeIn>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 sm:mb-10 border border-emerald-500/20">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-light tracking-tighter text-white mb-8 sm:mb-10 leading-[1.05]">
              Ready to build your <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                financial fortress?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl xl:text-3xl text-zinc-400 font-light max-w-3xl mb-12 sm:mb-16 leading-relaxed">
              Join over 26 Lakh investors who trust Ask Geo to navigate the complexities of wealth creation and preservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-center">
              <a href="https://wa.me/919960624271" target="_blank" rel="noreferrer" className="px-10 sm:px-12 py-5 sm:py-6 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center text-sm sm:text-base lg:text-lg">
                Start Your Journey <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              </a>
              <a href="#contact" className="px-10 sm:px-12 py-5 sm:py-6 bg-transparent border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white rounded-full font-medium transition-all duration-300 w-full sm:w-auto justify-center flex text-sm sm:text-base lg:text-lg">
                Request a Callback
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 bg-white">
        <div className="w-full max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn direction="right">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter mb-8 sm:mb-10 leading-[1.1]">
              Let's talk about <br/><span className="font-medium text-emerald-600">your future.</span>
            </h2>
            <p className="text-lg sm:text-xl xl:text-2xl text-zinc-500 font-light mb-12 sm:mb-16 max-w-xl leading-relaxed">
              Whether you have a specific question about our AI Engine or want a comprehensive portfolio review, our team of experts is ready to assist you.
            </p>
            <div className="space-y-8 sm:space-y-12 text-zinc-600 font-light">
              <div className="flex items-start gap-4 sm:gap-6">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-900 shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1 sm:mb-2 text-lg sm:text-xl">Corporate Office</p>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed">Jai Ganesh Vision, B Wing, BR-2, Office No. 319, Third floor, next to Inox Theatre, Akurdi, Pune - 411035, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-900 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1 sm:mb-2 text-lg sm:text-xl">Direct Line</p>
                  <p className="text-base sm:text-lg lg:text-xl">+91 99606 24271</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-900 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-zinc-900 mb-1 sm:mb-2 text-lg sm:text-xl">Email Support</p>
                  <p className="text-base sm:text-lg lg:text-xl">geo@askgeo.in / askgeo@gmail.com</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <form className="bg-zinc-50 p-8 sm:p-12 lg:p-16 rounded-[2rem] sm:rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/20" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl sm:text-3xl font-light mb-8 sm:mb-10">Send a Message</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <input type="text" placeholder="First Name" className="w-full bg-white border-b-2 border-zinc-200 px-4 sm:px-6 py-3 sm:py-4 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl text-base sm:text-lg" />
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" className="w-full bg-white border-b-2 border-zinc-200 px-4 sm:px-6 py-3 sm:py-4 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl text-base sm:text-lg" />
                  </div>
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full bg-white border-b-2 border-zinc-200 px-4 sm:px-6 py-3 sm:py-4 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl text-base sm:text-lg" />
                </div>
                <div>
                  <textarea rows="4" placeholder="How can we help you?" className="w-full bg-white border-b-2 border-zinc-200 px-4 sm:px-6 py-3 sm:py-4 text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 font-light rounded-t-xl resize-none text-base sm:text-lg"></textarea>
                </div>
                <button type="button" className="w-full bg-zinc-950 text-white font-medium py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:bg-emerald-600 transition-colors duration-300 hover:shadow-lg hover:shadow-emerald-600/20 flex justify-center items-center gap-2 group text-base sm:text-lg mt-4">
                  Submit Request <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* --- Mega Footer --- */}
      <footer className="bg-zinc-950 text-zinc-400 pt-24 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-zinc-900">
        <div className="w-full max-w-[1800px] mx-auto">
          {/* Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 mb-16 sm:mb-24 border-b border-zinc-800 pb-16 sm:pb-24">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 xl:col-span-5">
              <div className="mb-6 sm:mb-8">
                <img 
                  src="https://static.wixstatic.com/media/c12706_95ffde7d7fdf43fcb12e87a36b56eef6~mv2.png" 
                  alt="Ask Geo Logo" 
                  className="h-12 sm:h-16 w-auto object-contain filter brightness-0 invert" 
                />
              </div>
              <p className="text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10 max-w-md">
                A premier financial advisory firm dedicated to building, managing, and preserving wealth through highly customized, data-driven strategies and AI-optimized planning.
              </p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 lg:col-start-6 xl:col-start-7">
              <h4 className="text-white font-medium mb-6 sm:mb-8 text-lg sm:text-xl">Quick Links</h4>
              <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg font-light">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Home</button></li>
                <li><button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">About Geo</button></li>
                <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('ai-tools')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-emerald-400 transition-colors">AI Insight Engine</button></li>
                <li><button onClick={() => { setCurrentPage('insights'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Market Intelligence</button></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-medium mb-6 sm:mb-8 text-lg sm:text-xl">Our Services</h4>
              <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg font-light">
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Wealth Management</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Portfolio Analysis</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Insurance Planning</button></li>
                <li><button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Retirement Strategy</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors">Tax Optimization</button></li>
              </ul>
            </div>

            {/* Client Portal Column */}
            <div className="lg:col-span-3 sm:col-span-2 lg:col-span-3">
              <h4 className="text-white font-medium mb-6 sm:mb-8 text-lg sm:text-xl">Client Access</h4>
              <div className="space-y-4 sm:space-y-6">
                <a href="#" className="group flex items-center justify-between p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">Ask Geo E-Wealth A/C</p>
                    <p className="text-xs sm:text-sm font-light mt-1 text-zinc-500">Manage your investments</p>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
                <a href="#" className="group flex items-center justify-between p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">Client Desk Login</p>
                    <p className="text-xs sm:text-sm font-light mt-1 text-zinc-500">Access reports & docs</p>
                  </div>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Area */}
          <div className="mb-12 sm:mb-16 text-[10px] sm:text-xs lg:text-sm font-light leading-relaxed text-zinc-600 space-y-4 sm:space-y-6 text-left">
            <p>
              <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. The Mutual Fund is not guaranteeing or assuring any dividend under any of the schemes and the same is subject to the availability and adequacy of distributable surplus.
            </p>
            <p>
              Ask Geo operates as a financial distributor/advisor. The AI tools and insight engines provided on this website are for informational and educational purposes only and should not be construed as absolute investment advice. Investors are advised to consult with their tax advisors or financial planners before making any investment decisions. Historic XIRR mentioned on the site is based on past data and does not guarantee future returns.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-zinc-900 text-[10px] sm:text-xs lg:text-sm font-medium tracking-widest uppercase">
            <p>© {new Date().getFullYear()} Ask Geo Financial Services.</p>
            <div className="flex flex-wrap justify-start gap-6 sm:gap-8">
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

export default AskGeoApp;
