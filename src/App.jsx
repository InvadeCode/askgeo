import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, ShieldCheck, Briefcase, 
  Map, ChevronRight, Bot, Sparkles, PieChart, 
  ArrowRight, Phone, Mail, MapPin, Activity, Check,
  Target, Zap, Users, Calculator, BookOpen, Star, 
  ArrowUpRight, BarChart3, Quote, ChevronDown, ChevronsDown, RefreshCw,
  Facebook, Twitter, Instagram, Linkedin, Download, Lock
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
    zoom: 'scale-90',
    none: 'translate-y-0 translate-x-0 scale-100'
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] text-left ${
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
    <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden shadow-inner" ref={domRef}>
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-[1500ms] ease-out relative"
        style={{ width: isVisible ? width : '0%' }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/60 rounded-full blur-[2px] animate-pulse"></div>
      </div>
    </div>
  );
};

// --- Shared General Contact Lightbox / Modal ---
const GeneralContactModal = ({ isOpen, onClose, title }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', email: '' });
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-emerald-600 px-8 py-6 flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none"></div>
           <div>
             <h3 className="text-white text-lg font-medium tracking-tight">{title}</h3>
             <p className="text-emerald-100 text-[10px] font-medium tracking-widest uppercase mt-1">Provide your details</p>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-100/50">
                 <Check className="w-8 h-8" strokeWidth={2} />
               </div>
               <h4 className="text-xl font-medium text-zinc-900 mb-2">Request Received</h4>
               <p className="text-sm text-zinc-500">Our advisory team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-medium">+91</span>
                  <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-r-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="10-digit mobile number" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Submitting...</span> : <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CALCULATOR WIDGETS ---
const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const generateReport = (config, leadData) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow popups to download the report.");
    return;
  }
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const refId = `AG-${Math.floor(Math.random() * 10000)}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Ask Geo - ${config.reportTitle}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; text-align: left; }
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; color: #18181b; background: #ffffff; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .page-container { width: 210mm; min-height: 297mm; margin: 0 auto; position: relative; overflow: hidden; }
        .header { background: #047857; color: #ffffff; padding: 50px 50px 40px 50px; position: relative; overflow: hidden; }
        .logo-container { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
        .logo-img { height: 40px; filter: brightness(0) invert(1); }
        .report-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a7f3d0; margin-bottom: 10px; }
        .main-heading { font-size: 36px; font-weight: 300; letter-spacing: -1px; margin: 0 0 10px 0; line-height: 1.1; }
        .client-info { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; margin-top: 30px; }
        .info-block p { margin: 0 0 5px 0; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #d1fae5; }
        .info-block h4 { margin: 0; font-size: 14px; font-weight: 500; }
        .content { padding: 40px 50px; }
        .chart-container { background: #f8fafc; border-radius: 16px; padding: 30px; color: #0f172a; margin-bottom: 30px; border: 1px solid #e2e8f0; }
        .chart-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 15px; }
        .highlight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .metric-card { background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; }
        .metric-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 8px; }
        .metric-value { font-size: 28px; font-weight: 300; margin: 0; color: #0f172a; letter-spacing: -1px; }
        .metric-value.success { color: #059669; font-weight: 500; }
        .allocation-table { width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; }
        .allocation-table th { background: #f8fafc; text-align: left; padding: 12px 16px; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .allocation-table td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; text-align: left; }
        .footer { position: absolute; bottom: 0; width: 100%; padding: 30px 50px; border-top: 1px solid #e2e8f0; background: #ffffff; box-sizing: border-box; }
      </style>
    </head>
    <body>
      <div class="page-container">
        <div class="header">
          <div class="logo-container">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #022c22; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <div style="font-size: 24px; font-weight: 300; color: #ffffff; letter-spacing: -0.5px; font-family: 'Inter', sans-serif;">Ask <strong style="font-weight: 500; color: #6ee7b7;">Geo</strong></div>
          </div>
          <div class="report-title">${config.reportTitle}</div>
          <h1 class="main-heading">${config.mainHeading}</h1>
          <div class="client-info">
            <div class="info-block">
              <p>Prepared For</p>
              <h4>${leadData.name}</h4>
              <h4 style="color: #d1fae5; font-weight: 400; font-size: 12px; margin-top: 4px;">${leadData.email}</h4>
            </div>
            <div class="info-block" style="text-align: right;">
              <p>Date</p>
              <h4>${today}</h4>
              <h4 style="color: #d1fae5; font-weight: 400; font-size: 12px; margin-top: 4px;">Ref: ${refId}</h4>
            </div>
          </div>
        </div>
        <div class="content">
          <p style="font-size: 14px; color: #475569; line-height: 1.6; font-weight: 400; margin-bottom: 25px;">
            ${config.summaryText}
          </p>
          <div class="chart-container">
            <div class="chart-title">${config.primaryMetric.label}</div>
            <div style="font-size: 48px; font-weight: 300; letter-spacing: -2px; margin-bottom: 15px; color: #047857;">${config.primaryMetric.value}</div>
            <svg style="width: 100%; height: 100px; display: block; overflow: visible;" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,200 L1000,100" stroke="#cbd5e1" stroke-width="2" fill="none" />
              <path d="M0,200 Q600,180 1000,0" stroke="#059669" stroke-width="4" fill="none" />
              <path d="M0,200 Q600,180 1000,0 L1000,200 Z" fill="rgba(16, 185, 129, 0.1)" />
            </svg>
          </div>
          
          <div class="highlight-grid">
            ${config.secondaryMetrics.map(metric => `
              <div class="metric-card" ${metric.success ? 'style="background: #ecfdf5; border-color: #a7f3d0;"' : ''}>
                <div class="metric-label" ${metric.success ? 'style="color: #065f46;"' : ''}>${metric.label}</div>
                <div class="metric-value ${metric.success ? 'success' : ''}">${metric.value}</div>
              </div>
            `).join('')}
          </div>

          ${config.allocation ? `
            <div style="margin-top: 25px;">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: #0f172a;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Live Market Allocation Strategy
              </div>
              <p style="font-size: 11px; color: #64748b; margin-bottom: 12px;">${config.allocation.description}</p>
              <table class="allocation-table">
                <thead><tr><th>Fund Name / AMC</th><th>Category</th><th>Allocation (%)</th><th>Monthly (₹)</th></tr></thead>
                <tbody>
                  ${config.allocation.funds.map(fund => `
                    <tr>
                      <td><strong style="color: #0f172a;">${fund.name}</strong></td>
                      <td><span style="background: #f1f5f9; padding: 4px 6px; border-radius: 4px; font-size: 10px;">${fund.category}</span></td>
                      <td><strong>${fund.percent}%</strong></td>
                      <td style="color: #059669; font-weight: 600;">${formatCurrency(fund.amount)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

        </div>
        <div class="footer">
          <p style="font-size: 8px; color: #94a3b8; text-align: left; margin-bottom: 8px;">Disclaimer: This blueprint is generated by Ask Geo AI Tools for educational and planning purposes only. Calculations are subject to market risks and historical assumptions.</p>
          <div style="text-align: right; font-size: 11px; font-weight: 600; color: #0f172a;">Ask Geo Financial Services<br/><span style="color: #64748b; font-weight: 400; font-size: 10px;">www.askgeo.in | +91 99606 24271</span></div>
        </div>
      </div>
      <script>window.onload = function() { setTimeout(() => { window.print(); }, 500); };</script>
    </body>
    </html>
  `;
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const LeadCaptureModal = ({ isOpen, onClose, onDownloadComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ name: '', phone: '', email: '' });
      setOtp(['', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length < 4) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onDownloadComplete(formData);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) otpRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) otpRefs[index - 1].current.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-emerald-600 px-8 py-6 flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none"></div>
           <div>
             <h3 className="text-white text-lg font-medium tracking-tight">Download Report</h3>
             <p className="text-emerald-100 text-[10px] font-medium tracking-widest uppercase mt-1">Free PDF Blueprint</p>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>
        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5 animate-in slide-in-from-left-4 duration-300">
              <p className="text-xs text-zinc-500 font-light mb-4">Enter your details to generate your customized wealth projection blueprint.</p>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="e.g. Rajesh Sharma" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-medium">+91</span>
                  <input required type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-r-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="10-digit mobile number" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-zinc-900 bg-zinc-50 focus:bg-white" placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Verifying...</span> : <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-left mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                  <Lock className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-lg font-medium text-zinc-900 mb-1">Verify your number</h4>
                <p className="text-xs text-zinc-500 font-light">We've sent a 4-digit security code to <br/><strong className="font-medium">+91 {formData.phone}</strong></p>
              </div>
              <div className="flex justify-start gap-3">
                {otp.map((digit, index) => (
                  <input key={index} ref={otpRefs[index]} type="text" maxLength="1" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} className="w-12 h-12 text-center text-xl font-medium text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                ))}
              </div>
              <button type="submit" disabled={isProcessing || otp.join('').length < 4} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5">
                {isProcessing ? <span className="flex items-center gap-2"><Activity className="w-4 h-4 animate-spin" /> Generating PDF...</span> : <>Verify & Download <Download className="w-4 h-4" strokeWidth={2.5} /></>}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-left text-[10px] font-medium tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors uppercase mt-2">Change Number</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const SipCalculatorWidget = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth);
  const wealthGained = maturityValue - totalInvested;

  const getMarketAllocation = (amount, returnRate) => {
    let distribution = [];
    if (returnRate >= 14) { 
      distribution = [
        { name: 'Nippon India Small Cap Fund', category: 'Small Cap', percent: 40 },
        { name: 'Motilal Oswal Midcap Fund', category: 'Mid Cap', percent: 35 },
        { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', percent: 25 },
      ];
    } else if (returnRate >= 10) { 
      distribution = [
        { name: 'HDFC Index Fund Nifty 50 Plan', category: 'Large Cap', percent: 40 },
        { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', percent: 40 },
        { name: 'SBI Magnum Midcap Fund', category: 'Mid Cap', percent: 20 },
      ];
    } else { 
      distribution = [
        { name: 'ICICI Prudential Bluechip Fund', category: 'Large Cap', percent: 50 },
        { name: 'Kotak Balanced Advantage Fund', category: 'Hybrid', percent: 30 },
        { name: 'Aditya Birla Sun Life Liquid Fund', category: 'Debt', percent: 20 },
      ];
    }
    return distribution.map(fund => ({ ...fund, amount: Math.round(amount * (fund.percent / 100)) }));
  };

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Wealth Projection Blueprint",
      mainHeading: "Systematic Investment Plan",
      summaryText: `Based on a monthly investment of <strong>${formatCurrency(monthlyInvestment)}</strong> over <strong>${years} years</strong> at an expected return of <strong>${expectedReturn}% p.a.</strong>`,
      primaryMetric: { label: "Projected Future Value", value: formatCurrency(maturityValue) },
      secondaryMetrics: [
        { label: "Total Invested Amount", value: formatCurrency(totalInvested) },
        { label: "Total Wealth Gained", value: `+${formatCurrency(wealthGained)}`, success: true }
      ],
      allocation: {
        description: `AI-driven recommended deployment for your ₹${monthlyInvestment.toLocaleString('en-IN')} monthly SIP based on current market valuations.`,
        funds: getMarketAllocation(monthlyInvestment, expectedReturn)
      }
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Monthly Investment</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(monthlyInvestment)}</div>
            </div>
            <input type="range" min="1000" max="200000" step="1000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{years} Years</div>
            </div>
            <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-4">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{expectedReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>

          <FadeIn delay={400} direction="up">
             <div className="bg-white border border-emerald-100 rounded-2xl p-6 mt-6 shadow-xl shadow-emerald-100/50 hover:shadow-emerald-200/60 transition-shadow duration-500 group">
               <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <Bot className="w-5 h-5 group-hover:animate-bounce" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase">Live Market Allocation</h4>
               </div>
               <p className="text-sm text-zinc-600 mb-5 font-light">To achieve {expectedReturn}% p.a., Ask Geo AI recommends deploying your {formatCurrency(monthlyInvestment)} across these specific funds:</p>
               <div className="space-y-3">
                  {getMarketAllocation(monthlyInvestment, expectedReturn).map((fund, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-100 pb-3 last:border-0 last:pb-0 hover:bg-zinc-50 rounded-lg p-2 transition-colors">
                      <div>
                        <p className="font-medium text-zinc-900">{fund.name}</p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">{fund.category} • {fund.percent}%</p>
                      </div>
                      <p className="font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">{formatCurrency(fund.amount)}/mo</p>
                    </div>
                  ))}
               </div>
             </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative group">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="space-y-8 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
                <p className="text-2xl sm:text-3xl font-light">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
                <p className="text-2xl sm:text-3xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-zinc-800/80 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">Future Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(maturityValue)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const StepUpCalculatorWidget = () => {
  const [initialSip, setInitialSip] = useState(20000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

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

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Wealth Projection Blueprint",
      mainHeading: "Step-Up SIP Acceleration Plan",
      summaryText: `Based on an initial monthly investment of <strong>${formatCurrency(initialSip)}</strong> stepping up by <strong>${stepUpPercent}% annually</strong> over <strong>${years} years</strong> at an expected return of <strong>${expectedReturn}% p.a.</strong>`,
      primaryMetric: { label: "Accelerated Future Value", value: formatCurrency(futureValue) },
      secondaryMetrics: [
        { label: "Total Invested Amount", value: formatCurrency(totalInvested) },
        { label: "Total Wealth Gained", value: `+${formatCurrency(wealthGained)}`, success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-emerald-900 font-medium flex items-start gap-3">
               <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
               Step-Up SIP dramatically compresses your wealth creation timeline by aligning your investments with your annual salary hikes.
            </p>
          </div>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Initial Monthly SIP</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(initialSip)}</div>
            </div>
            <input type="range" min="1000" max="200000" step="1000" value={initialSip} onChange={(e) => setInitialSip(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Annual Step-Up</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{stepUpPercent}%</div>
            </div>
            <input type="range" min="1" max="25" step="1" value={stepUpPercent} onChange={(e) => setStepUpPercent(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Period (Years)</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{years} Years</div>
            </div>
            <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
               <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{expectedReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[40px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
                <p className="text-xl sm:text-2xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">Accelerated Future Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(futureValue)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const StpToSipCalculatorWidget = () => {
  const [lumpsum, setLumpsum] = useState(1000000);
  const [months, setMonths] = useState(24);
  const [sourceReturn, setSourceReturn] = useState(6);
  const [targetReturn, setTargetReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const sourceMonthlyRate = sourceReturn / 12 / 100;
  const targetMonthlyRate = targetReturn / 12 / 100;
  const sustainableMonthlyStp = sourceMonthlyRate === 0
    ? lumpsum / months
    : lumpsum * sourceMonthlyRate / (1 - Math.pow(1 + sourceMonthlyRate, -months));

  let sourceBalance = lumpsum;
  let targetCorpus = 0;
  let totalTransferred = 0;

  for (let m = 1; m <= months; m++) {
    sourceBalance = sourceBalance * (1 + sourceMonthlyRate);
    const transfer = Math.min(sustainableMonthlyStp, sourceBalance);
    sourceBalance -= transfer;
    targetCorpus = (targetCorpus + transfer) * (1 + targetMonthlyRate);
    totalTransferred += transfer;
  }

  const averageSipEquivalent = totalTransferred / months;
  const wealthCreated = targetCorpus - lumpsum;

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Systematic Transfer Plan",
      mainHeading: "STP to SIP Architecture",
      summaryText: `Strategy mapping a parked lumpsum of <strong>${formatCurrency(lumpsum)}</strong> in a source fund (yielding ${sourceReturn}% p.a.) transferring into a target fund (yielding ${targetReturn}% p.a.) over <strong>${months} months</strong>.`,
      primaryMetric: { label: "Projected Target Corpus", value: formatCurrency(targetCorpus) },
      secondaryMetrics: [
        { label: "Sustainable Monthly STP", value: formatCurrency(sustainableMonthlyStp) },
        { label: "Net Gain over Parked Capital", value: `+${formatCurrency(wealthCreated)}`, success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-emerald-900 font-medium flex items-start gap-3">
               <RefreshCw className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-spin [animation-duration:3s]" />
               STP to SIP Planner: Start with a lumpsum, transfer it systematically, and see the average SIP you can comfortably create over time.
            </p>
          </div>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Lumpsum Parked</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(lumpsum)}</div>
            </div>
            <input type="range" min="100000" max="10000000" step="50000" value={lumpsum} onChange={(e) => setLumpsum(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">STP Period</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{months} Months</div>
            </div>
            <input type="range" min="6" max="120" step="1" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Source Fund Return</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{sourceReturn}%</div>
            </div>
            <input type="range" min="3" max="10" step="0.5" value={sourceReturn} onChange={(e) => setSourceReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
               <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Target Fund Return</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{targetReturn}%</div>
            </div>
            <input type="range" min="6" max="18" step="0.5" value={targetReturn} onChange={(e) => setTargetReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Sustainable Monthly STP</p>
                <p className="text-2xl sm:text-3xl font-light text-emerald-300">{formatCurrency(sustainableMonthlyStp)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Average SIP Equivalent</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(averageSipEquivalent)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">Projected Target Corpus</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(targetCorpus)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const EmiMatchSipWidget = () => {
  const [assetCost, setAssetCost] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [tenureYears, setTenureYears] = useState(3);
  const [loanInterest, setLoanInterest] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const loanAmount = Math.max(assetCost - downPayment, 0);
  const n = tenureYears * 12;
  const loanRate = loanInterest / 12 / 100;
  const emi = loanAmount === 0
    ? 0
    : loanAmount * loanRate * Math.pow(1 + loanRate, n) / (Math.pow(1 + loanRate, n) - 1);
  const totalBankOutflow = (emi * n) + downPayment;

  const sipRate = sipReturn / 12 / 100;
  const sipFutureValue = emi === 0
    ? 0
    : emi * (((Math.pow(1 + sipRate, n) - 1) / sipRate) * (1 + sipRate));
  const decisionGap = sipFutureValue - assetCost;

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "EMI vs SIP Comparison",
      mainHeading: "Purchase Opportunity Cost",
      summaryText: `Analysis of a ₹${assetCost.toLocaleString('en-IN')} purchase financed over ${tenureYears} years vs. investing the equivalent EMI of ${formatCurrency(emi)} in the market.`,
      primaryMetric: { label: "If EMI amount were invested", value: formatCurrency(sipFutureValue) },
      secondaryMetrics: [
        { label: "Total Bank Outflow (Cost)", value: formatCurrency(totalBankOutflow) },
        { label: "Net difference vs asset cost", value: formatCurrency(decisionGap), success: decisionGap >= 0 }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-emerald-900 font-medium flex items-start gap-3">
               <Activity className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
               EMI Match SIP: For purchases like a bike, compare the EMI you would pay versus investing the same monthly amount instead.
            </p>
          </div>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Asset Cost</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(assetCost)}</div>
            </div>
            <input type="range" min="50000" max="5000000" step="10000" value={assetCost} onChange={(e) => setAssetCost(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Down Payment</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{formatCurrency(downPayment)}</div>
            </div>
            <input type="range" min="0" max={assetCost} step="10000" value={downPayment} onChange={(e) => setDownPayment(Math.min(Number(e.target.value), assetCost))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{tenureYears} Years</div>
            </div>
            <input type="range" min="1" max="7" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
                  <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Interest</label>
                  <div className="text-xl sm:text-2xl font-light text-zinc-800 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{loanInterest}%</div>
                </div>
                <input type="range" min="6" max="20" step="0.5" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-800" />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
                  <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">SIP Return</label>
                  <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{sipReturn}%</div>
                </div>
                <input type="range" min="6" max="18" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Monthly EMI</p>
                <p className="text-2xl sm:text-3xl font-light text-white">{formatCurrency(emi)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Bank Outflow</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(totalBankOutflow)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">If EMI amount were invested instead</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-emerald-400 tracking-tight leading-none mb-8">{formatCurrency(sipFutureValue)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const EmiVsSipCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(15);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [marketReturn, setMarketReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const ratePerMonth = loanInterest / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = loanAmount * ratePerMonth * (Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
  const totalPaidToBank = emi * totalMonths;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  const sipRatePerMonth = marketReturn / 12 / 100;
  const projectedWealth = emi * ((Math.pow(1 + sipRatePerMonth, totalMonths) - 1) / sipRatePerMonth) * (1 + sipRatePerMonth);
  const wealthLost = projectedWealth - totalPaidToBank;

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Debt vs Equity Analysis",
      mainHeading: "Opportunity Cost of Debt",
      summaryText: `Analysis showing the wealth forfeited by paying an EMI of ${formatCurrency(emi)} over ${tenureYears} years for a ₹${loanAmount.toLocaleString('en-IN')} loan, versus investing the same amount.`,
      primaryMetric: { label: "Projected Wealth (If Invested)", value: formatCurrency(projectedWealth) },
      secondaryMetrics: [
        { label: "Total Paid to Bank", value: formatCurrency(totalPaidToBank) },
        { label: "Total Opportunity Cost", value: formatCurrency(wealthLost), success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-zinc-100 border border-zinc-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-zinc-900 font-medium flex items-start gap-3">
              <PieChart className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5 animate-pulse" />
              The Cost of Debt: See the exact wealth you forfeit when you choose to pay an EMI instead of investing it.
            </p>
          </div>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(loanAmount)}</div>
            </div>
            <input type="range" min="100000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-800" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{tenureYears} Years</div>
            </div>
            <input type="range" min="1" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-800" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-800 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{loanInterest}%</div>
            </div>
            <input type="range" min="5" max="20" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-800" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
               <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Potential Market Return</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{marketReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={marketReturn} onChange={(e) => setMarketReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Your Monthly EMI</p>
                <p className="text-2xl sm:text-3xl font-light text-zinc-500">{formatCurrency(emi)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Paid to Bank</p>
                <p className="text-xl sm:text-2xl font-light text-zinc-300">{formatCurrency(totalPaidToBank)} <span className="text-[10px] sm:text-xs text-zinc-500 block sm:inline sm:ml-2">({formatCurrency(totalInterestPaid)} interest)</span></p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-3">If invested in SIP instead:</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-emerald-400 tracking-tight leading-none mb-8">{formatCurrency(projectedWealth)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const ExtraEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(13000000);
  const [originalRate, setOriginalRate] = useState(8.75);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [currentRate, setCurrentRate] = useState(7.50);
  const [extraEmisPerYear, setExtraEmisPerYear] = useState(4);
  const [extraEmiAmount, setExtraEmiAmount] = useState(104000);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const rOrg = originalRate / 12 / 100;
  const nOrg = originalTenure * 12;
  const originalEMI = loanAmount * rOrg * Math.pow(1 + rOrg, nOrg) / (Math.pow(1 + rOrg, nOrg) - 1);
  const totalInterestOrg = (originalEMI * nOrg) - loanAmount;

  const rCur = currentRate / 12 / 100;
  let nRateDrop = 0;
  if (originalEMI > loanAmount * rCur) {
      nRateDrop = Math.log(originalEMI / (originalEMI - loanAmount * rCur)) / Math.log(1 + rCur);
  } else {
      nRateDrop = nOrg; 
  }
  const monthsRateDrop = Math.ceil(nRateDrop);
  const totalInterestRateDrop = (originalEMI * monthsRateDrop) - loanAmount;

  let bal = loanAmount;
  let mPrepay = 0;
  let totPaidPrepay = 0;
  while(bal > 0 && mPrepay < 1200) { 
      mPrepay++;
      let int = bal * rCur;
      let pay = originalEMI;
      if (mPrepay % 12 === 0) pay += (extraEmisPerYear * extraEmiAmount);
      if (pay > bal + int) pay = bal + int;
      bal = bal + int - pay;
      totPaidPrepay += pay;
  }
  const totalInterestPrepay = totPaidPrepay - loanAmount;

  const savedTimeRateDrop = nOrg - monthsRateDrop;
  const savedMoneyRateDrop = totalInterestOrg - totalInterestRateDrop;
  const savedTimePrepay = monthsRateDrop - mPrepay;
  const savedMoneyPrepay = totalInterestRateDrop - totalInterestPrepay;
  const totalSavedTime = nOrg - mPrepay;
  const totalSavedMoney = totalInterestOrg - totalInterestPrepay;

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

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "EMI Prepayment Strategy",
      mainHeading: "Loan Acceleration Plan",
      summaryText: `By maintaining your original EMI after an interest rate drop to ${currentRate}% and adding ₹${extraEmiAmount.toLocaleString('en-IN')} as an extra yearly payment, you drastically reduce your loan lifespan.`,
      primaryMetric: { label: "Total Time Saved", value: formatYM(safeTime(totalSavedTime)) },
      secondaryMetrics: [
        { label: "Original Tenure", value: formatYM(nOrg) },
        { label: "Total Money Saved", value: formatCurrency(safeMoney(totalSavedMoney)), success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-emerald-900 font-medium flex items-start gap-3">
               <ChevronsDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
               Prepayment Accelerator: See exactly how much time and interest you save by maintaining your original EMI after a rate drop, combined with extra yearly payments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FadeIn delay={100} direction="left" className="space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Loan Amount</span> <span className="text-zinc-900 font-bold">{formatShortAmt(loanAmount)}</span></label>
                <input type="range" min="1000000" max="50000000" step="500000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
              <FadeIn delay={150} direction="left" className="space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Tenure</span> <span className="text-zinc-900 font-bold">{originalTenure} Years</span></label>
                <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
              <FadeIn delay={200} direction="left" className="space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Original Rate</span> <span className="text-zinc-900 font-bold">{originalRate}%</span></label>
                <input type="range" min="6" max="15" step="0.1" value={originalRate} onChange={(e) => setOriginalRate(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
              <FadeIn delay={250} direction="left" className="space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Current Rate</span> <span className="text-emerald-600 font-bold">{currentRate}%</span></label>
                <input type="range" min="6" max="15" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
          </div>

          <div className="pt-6 border-t border-zinc-100">
              <FadeIn delay={300} direction="left" className="mb-6 space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMIs per year</span> <span className="text-zinc-900 font-bold">{extraEmisPerYear}</span></label>
                <input type="range" min="0" max="12" step="1" value={extraEmisPerYear} onChange={(e) => setExtraEmisPerYear(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
              <FadeIn delay={350} direction="left" className="space-y-3">
                <label className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-500 uppercase flex justify-between"><span>Extra EMI amount (₹)</span> <span className="text-zinc-900 font-bold">{formatCurrency(extraEmiAmount)}</span></label>
                <input type="range" min="10000" max="500000" step="10000" value={extraEmiAmount} onChange={(e) => setExtraEmiAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </FadeIn>
          </div>
        </div>
        
        <div className="lg:col-span-5 group">
          <FadeIn delay={400} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="space-y-6 relative z-10 mb-8">
              <div className="grid grid-cols-2 gap-4 border-b border-emerald-800/50 pb-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <p className="text-[9px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Loan amount</p>
                  <p className="text-base font-medium">{formatShortAmt(loanAmount)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <p className="text-[9px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Monthly EMI</p>
                  <p className="text-base font-medium">{formatCurrency(originalEMI)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <p className="text-[9px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Original Rate</p>
                  <p className="text-base font-medium">{originalRate}%</p>
                </div>
                 <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                  <p className="text-[9px] font-medium tracking-widest text-emerald-300 uppercase mb-1">Current Rate</p>
                  <p className="text-base font-medium text-emerald-400">{currentRate}%</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
                 <p className="text-[10px] font-medium tracking-widest text-emerald-300 uppercase mb-4">Tenure comparison</p>
                 <div className="grid grid-cols-3 gap-3">
                    <div>
                       <p className="text-[9px] text-zinc-400 mb-1">At {originalRate}% (org)</p>
                       <p className="text-sm font-semibold">{formatYM(nOrg)}</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-zinc-400 mb-1">At {currentRate}% (same EMI)</p>
                       <p className="text-sm font-semibold text-emerald-400">{formatYM(monthsRateDrop)}</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-zinc-400 mb-1">At {currentRate}% + prepay</p>
                       <p className="text-sm font-semibold text-emerald-400">{formatYM(mPrepay)}</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[8px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Saved by rate drop</p>
                    <p className="text-sm font-bold text-emerald-400 mb-1">{formatYM(safeTime(savedTimeRateDrop))}</p>
                    <p className="text-[9px] text-zinc-400">{formatShortAmt(safeMoney(savedMoneyRateDrop))}</p>
                 </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[8px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Saved by prepay</p>
                    <p className="text-sm font-bold text-emerald-400 mb-1">{formatYM(safeTime(savedTimePrepay))}</p>
                    <p className="text-[9px] text-zinc-400">{formatShortAmt(safeMoney(savedMoneyPrepay))}</p>
                 </div>
                 <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <p className="text-[8px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Total saved</p>
                    <p className="text-sm font-bold text-white mb-1">{formatYM(safeTime(totalSavedTime))}</p>
                    <p className="text-[9px] text-emerald-400 font-medium">{formatShortAmt(safeMoney(totalSavedMoney))}</p>
                 </div>
              </div>
            </div>

            <button onClick={handleDownloadInitiate} className="w-full mt-6 py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1 relative z-10">
              <Download className="w-4 h-4 animate-bounce" />
              <span>Download Strategy Report</span>
            </button>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const SmartEmiCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(20);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);
  const [recoveryMode, setRecoveryMode] = useState('interest');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const r = loanInterest / 12 / 100;
  const n = tenureYears * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPaidToBank = emi * n;
  const totalInterestPaid = totalPaidToBank - loanAmount;

  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const targetCorpus = recoveryMode === 'interest' ? totalInterestPaid : recoveryMode === 'principal' ? loanAmount : totalPaidToBank;
  const requiredSip = targetCorpus / sipFactor;
  const sipPercentageOfEmi = emi > 0 ? ((requiredSip / emi) * 100).toFixed(1) : '0.0';
  const recoveryLabel = recoveryMode === 'interest' ? 'interest' : recoveryMode === 'principal' ? 'principal' : 'principal + interest';

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Zero-Cost EMI Plan",
      mainHeading: "Loan Cost Recovery Strategy",
      summaryText: `Strategy showing how a parallel SIP of ${formatCurrency(requiredSip)} alongside your EMI will fully recover your ${recoveryLabel} over ${tenureYears} years.`,
      primaryMetric: { label: `Required SIP (To Recover ${recoveryLabel})`, value: formatCurrency(requiredSip) },
      secondaryMetrics: [
        { label: "Your Monthly EMI", value: formatCurrency(emi) },
        { label: "Target Corpus to Recover", value: formatCurrency(targetCorpus), success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-green-900 font-medium flex items-start gap-3">
               <Sparkles className="w-5 h-5 text-green-600 shrink-0 mt-0.5 animate-pulse" />
               Loan Cost Recovery: Build a parallel SIP that can recover just your interest, your principal, or your entire principal plus interest outflow.
            </p>
          </div>
          <FadeIn delay={75} direction="left">
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'interest', label: 'Interest Only' },
                { id: 'principal', label: 'Principal Only' },
                { id: 'total', label: 'Principal + Interest' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setRecoveryMode(option.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 border ${
                    recoveryMode === option.id
                      ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(loanAmount)}</div>
            </div>
            <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Tenure</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{tenureYears} Years</div>
            </div>
            <input type="range" min="5" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Home Loan Interest</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{loanInterest}%</div>
            </div>
            <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
               <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
              <div className="text-xl sm:text-2xl font-light text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200 w-full sm:w-auto shadow-sm">{sipReturn}%</div>
            </div>
            <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 to-transparent rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="space-y-6 relative z-10 mb-8">
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Your EMI</p>
                <p className="text-xl font-medium text-white">{formatCurrency(emi)}</p>
              </div>
              <div className="bg-zinc-500/10 p-5 rounded-2xl backdrop-blur-sm border border-zinc-500/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase">Target Corpus</p>
                <p className="text-xl font-medium text-zinc-300">{formatCurrency(targetCorpus)}</p>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-green-400 uppercase mb-4">Required Monthly SIP to recover {recoveryLabel}</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredSip)}</p>
              <div className="inline-flex items-center gap-3 bg-green-900/30 border border-green-500/20 text-green-300 text-sm font-medium px-5 py-3 rounded-xl shadow-inner mb-8 w-full">
                <Sparkles className="w-5 h-5 text-green-400 animate-pulse shrink-0" /> That's just {sipPercentageOfEmi}% of your EMI amount!
              </div>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const EarlyClosureWidget = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [originalTenure, setOriginalTenure] = useState(20);
  const [targetTenure, setTargetTenure] = useState(10);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [sipReturn, setSipReturn] = useState(12);
  const [closureMode, setClosureMode] = useState('foreclose');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    if (targetTenure >= originalTenure) {
      setTargetTenure(originalTenure - 1 || 1);
    }
  }, [originalTenure, targetTenure]);

  const r = loanInterest / 12 / 100;
  const n = originalTenure * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

  const t = targetTenure * 12;
  const outstandingPrincipal = loanAmount * (Math.pow(1 + r, n) - Math.pow(1 + r, t)) / (Math.pow(1 + r, n) - 1);
  const outflowTillTarget = emi * t;
  const principalRepaidTillTarget = loanAmount - outstandingPrincipal;
  const interestPaidTillTarget = outflowTillTarget - principalRepaidTillTarget;
  const targetCorpus = closureMode === 'foreclose'
    ? outstandingPrincipal
    : closureMode === 'interest'
    ? interestPaidTillTarget
    : outstandingPrincipal + interestPaidTillTarget;

  const i = sipReturn / 12 / 100;
  const sipFactor = ((Math.pow(1 + i, t) - 1) / i) * (1 + i);
  const requiredSip = targetCorpus / sipFactor;

  const originalTotalOutflow = emi * n;
  const newTotalOutflow = (emi * t) + (requiredSip * t);
  const totalSavings = originalTotalOutflow - newTotalOutflow;
  const yearsSaved = originalTenure - targetTenure;
  const targetLabel = closureMode === 'foreclose' ? 'Loan Balance' : closureMode === 'interest' ? 'Interest Paid Till Closure' : 'Principal + Interest Neutralizer';

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Early Closure Strategy",
      mainHeading: "Debt Destroyer Blueprint",
      summaryText: `By running a parallel SIP of ${formatCurrency(requiredSip)}, you will build the required corpus of ${formatCurrency(targetCorpus)} to close your loan in ${targetTenure} years instead of ${originalTenure} years.`,
      primaryMetric: { label: "Required Monthly SIP", value: formatCurrency(requiredSip) },
      secondaryMetrics: [
        { label: "Years of EMIs Saved", value: yearsSaved.toString() },
        { label: "Total Wealth Saved", value: formatCurrency(totalSavings), success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-emerald-900 font-medium flex items-start gap-3">
               <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
               The Debt Destroyer: Calculate the exact parallel SIP required to build a corpus large enough to foreclose your home loan years ahead of schedule.
            </p>
          </div>
          <FadeIn delay={75} direction="left">
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'foreclose', label: 'Foreclose Balance' },
                { id: 'interest', label: 'Recover Interest' },
                { id: 'total', label: 'Balance + Interest' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setClosureMode(option.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 border ${
                    closureMode === option.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Amount</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(loanAmount)}</div>
            </div>
            <input type="range" min="500000" max="50000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={150} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Original Loan Tenure</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{originalTenure} Years</div>
            </div>
            <input type="range" min="5" max="30" step="1" value={originalTenure} onChange={(e) => setOriginalTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Target Closure Time</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{targetTenure} Years</div>
            </div>
            <input type="range" min="1" max={Math.max(originalTenure - 1, 1)} step="1" value={targetTenure} onChange={(e) => setTargetTenure(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={250} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loan Interest Rate</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{loanInterest}%</div>
            </div>
            <input type="range" min="6" max="15" step="0.1" value={loanInterest} onChange={(e) => setLoanInterest(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
               <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected SIP Return</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{sipReturn}%</div>
            </div>
            <input type="range" min="8" max="25" step="0.5" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={350} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="space-y-6 relative z-10 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase">Your Regular EMI</p>
                <p className="text-xl font-medium text-white">{formatCurrency(emi)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                   <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase">{targetLabel}</p>
                   <p className="text-[9px] text-zinc-400 mt-0.5">Corpus needed at year {targetTenure}</p>
                </div>
                <p className="text-xl font-medium text-zinc-300">{formatCurrency(targetCorpus)}</p>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Required Monthly SIP</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredSip)}</p>
              
              <div className="flex flex-col gap-3 mb-8">
                <div className="inline-flex items-center gap-3 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-3 rounded-xl w-full">
                  <Activity className="w-4 h-4 shrink-0" /> Save {yearsSaved} years of EMIs
                </div>
                <div className="inline-flex items-center gap-3 bg-green-900/50 border border-green-500/30 text-green-300 text-sm font-medium px-4 py-3 rounded-xl w-full">
                  <Check className="w-4 h-4 shrink-0" /> Wealth Saved: {formatCurrency(totalSavings)}
                </div>
              </div>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const FireCalculatorWidget = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [yearsToRetire, setYearsToRetire] = useState(15);
  const [inflation, setInflation] = useState(6);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const currentAnnualExp = monthlyExpenses * 12;
  const futureAnnualExp = currentAnnualExp * Math.pow(1 + inflation / 100, yearsToRetire);
  const requiredCorpus = futureAnnualExp * 30; 

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "F.I.R.E. Trajectory Report",
      mainHeading: "Early Retirement Blueprint",
      summaryText: `Based on your current monthly expenses of ${formatCurrency(monthlyExpenses)}, factoring in an inflation rate of ${inflation}%, here is your required target corpus to safely retire in ${yearsToRetire} years.`,
      primaryMetric: { label: "Target F.I.R.E. Corpus", value: formatCurrency(requiredCorpus) },
      secondaryMetrics: [
        { label: "Future Monthly Expense", value: formatCurrency(futureAnnualExp / 12) },
        { label: "Target Retirement Timeline", value: `${yearsToRetire} Years`, success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl mb-4 shadow-sm">
            <p className="text-sm text-green-900 font-medium flex items-start gap-3">
               <Map className="w-5 h-5 text-green-600 shrink-0 mt-0.5 animate-pulse" />
               Financial Independence, Retire Early. Calculate the exact corpus required to stop working and live purely off your portfolio yields.
            </p>
          </div>
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Current Monthly Expenses</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(monthlyExpenses)}</div>
            </div>
            <input type="range" min="20000" max="500000" step="5000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Years to Retirement</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{yearsToRetire} Years</div>
            </div>
            <input type="range" min="1" max="40" step="1" value={yearsToRetire} onChange={(e) => setYearsToRetire(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Inflation</label>
              <div className="text-xl sm:text-2xl font-light text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200 w-full sm:w-auto shadow-sm">{inflation}%</div>
            </div>
            <input type="range" min="3" max="12" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 to-transparent rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-2">Projected Future Monthly Expense</p>
                <p className="text-2xl sm:text-3xl font-light text-white">{formatCurrency(futureAnnualExp / 12)}</p>
                <p className="text-xs text-zinc-500 mt-1">Adjusted for {inflation}% inflation</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-green-400 uppercase mb-3">Target F.I.R.E. Corpus</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredCorpus)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const LumpsumCalculatorWidget = () => {
  const [lumpsum, setLumpsum] = useState(1000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const maturityValue = lumpsum * Math.pow(1 + expectedReturn / 100, years);
  const wealthGained = maturityValue - lumpsum;

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Lumpsum Projection Report",
      mainHeading: "One-Time Investment Growth",
      summaryText: `Based on a one-time capital deployment of ${formatCurrency(lumpsum)} held over ${years} years with an expected compounding rate of ${expectedReturn}%.`,
      primaryMetric: { label: "Projected Future Value", value: formatCurrency(maturityValue) },
      secondaryMetrics: [
        { label: "Total Invested Amount", value: formatCurrency(lumpsum) },
        { label: "Total Wealth Gained", value: `+${formatCurrency(wealthGained)}`, success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">One-time Investment</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(lumpsum)}</div>
            </div>
            <input type="range" min="10000" max="50000000" step="10000" value={lumpsum} onChange={(e) => setLumpsum(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Investment Period</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{years} Years</div>
            </div>
            <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{expectedReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
             <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Total Invested</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(lumpsum)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-1">Wealth Gained</p>
                <p className="text-xl sm:text-2xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-3">Future Value</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(maturityValue)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const GoalCalculatorWidget = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const ratePerMonth = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const requiredSip = targetAmount / (((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth) * (1 + ratePerMonth));

  const handleDownloadInitiate = () => setIsLeadModalOpen(true);
  const handleDownloadComplete = (leadData) => {
    setIsLeadModalOpen(false);
    generateReport({
      reportTitle: "Financial Goal Mapping",
      mainHeading: "Goal Achievement Plan",
      summaryText: `Mathematical breakdown of the regular investment required to achieve your target milestone of ${formatCurrency(targetAmount)} over ${years} years.`,
      primaryMetric: { label: "Required Monthly SIP", value: formatCurrency(requiredSip) },
      secondaryMetrics: [
        { label: "Target Goal Amount", value: formatCurrency(targetAmount) },
        { label: "Timeframe to Goal", value: `${years} Years`, success: true }
      ]
    }, leadData);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in zoom-in-95 duration-500 text-left">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <FadeIn delay={100} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Target Goal Amount</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{formatCurrency(targetAmount)}</div>
            </div>
            <input type="range" min="100000" max="100000000" step="100000" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Time to Goal</label>
              <div className="text-xl sm:text-2xl font-light text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 w-full sm:w-auto shadow-sm">{years} Years</div>
            </div>
            <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-3">
              <label className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Expected Return (p.a)</label>
              <div className="text-xl sm:text-2xl font-light text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 w-full sm:w-auto shadow-sm">{expectedReturn}%</div>
            </div>
            <input type="range" min="5" max="25" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
          </FadeIn>
        </div>
        <div className="lg:col-span-5 group">
          <FadeIn delay={400} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase mb-2">To reach your goal of</p>
                <p className="text-2xl sm:text-3xl font-light text-white">{formatCurrency(targetAmount)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-emerald-800/50 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Required Monthly SIP</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredSip)}</p>
              
              <button onClick={handleDownloadInitiate} className="w-full py-4 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download Strategy Report</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

const AIAssistantWidget = ({ openContactModal }) => {
  const [queryState, setQueryState] = useState('idle'); 
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
    <div className="bg-white rounded-3xl border border-zinc-100 p-8 md:p-12 shadow-2xl shadow-emerald-900/5 max-w-4xl transition-all duration-500 text-left hover:shadow-emerald-900/10">
      <div className="flex items-center justify-between mb-10 border-b border-zinc-100 pb-6">
        <div>
          <h3 className="text-2xl font-light tracking-tight mb-2">Select an Objective</h3>
          <p className="text-zinc-500 text-sm font-light">Let AI draft a baseline strategy for you instantly.</p>
        </div>
        {queryState !== 'idle' && (
          <button onClick={() => setQueryState('idle')} className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50">
            RESET
          </button>
        )}
      </div>

      <div className="min-h-[220px] flex flex-col justify-center">
        {queryState === 'idle' && (
          <div className="grid md:grid-cols-3 gap-5">
            {goals.map((goal, idx) => (
              <button 
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className="group relative text-left p-8 rounded-2xl border border-zinc-200 hover:border-emerald-500 bg-white hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-2xl -z-10 group-hover:bg-emerald-50 transition-colors"></div>
                <goal.icon className="text-zinc-400 w-8 h-8 mb-5 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <h4 className="font-medium text-base text-zinc-900 group-hover:text-emerald-900 transition-colors">{goal.label}</h4>
              </button>
            ))}
          </div>
        )}

        {queryState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center space-y-5 opacity-100 transition-opacity duration-500">
            <div className="relative w-16 h-16 flex items-center justify-center">
               <div className="absolute inset-0 border-2 border-zinc-100 rounded-full"></div>
               <div className="absolute inset-0 border-2 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
               <Sparkles className="w-6 h-6 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="text-emerald-600 font-bold tracking-widest text-[10px] uppercase animate-pulse">Running AI Models...</p>
          </div>
        )}

        {queryState === 'result' && selectedGoal && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="flex flex-col sm:flex-row items-start gap-6 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                <Check className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-3 text-zinc-900">{selectedGoal.label} Strategy</h4>
                <p className="text-base text-zinc-600 font-light leading-relaxed mb-6 max-w-2xl">
                  {selectedGoal.id === 'retire' && "To achieve early retirement, our AI model suggests shifting 60% to high-yield Equity Mutual Funds and 40% in stable Debt Funds. We recommend starting an aggressive SIP to match the 12% historic XIRR benchmark."}
                  {selectedGoal.id === 'wealth' && "For aggressive wealth multiplication, consider our Direct Equity & ETF portfolio management. Historical data indicates a diversified tech & infra portfolio outpaces inflation by 8%. Let Ask Geo map this out."}
                  {selectedGoal.id === 'tax' && "Tax optimization requires utilizing ELSS (Equity Linked Savings Scheme) under Section 80C, which not only saves tax but historically provides superior equity returns compared to traditional PPF."}
                </p>
                <button 
                  onClick={() => openContactModal('Consult on AI Strategy')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-zinc-200 hover:-translate-y-1 group w-full sm:w-auto"
                >
                  Consult on this plan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- ABOUT PAGE COMPONENT ---
const AboutPage = ({ setCurrentPage, openContactModal }) => {
  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700 text-left bg-zinc-50">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn direction="down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Driven by data. <br />
            <span className="font-medium text-emerald-600">Defined by trust.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-8">
            Ask Geo was founded on a singular vision: to bring institutional-grade financial strategies to individual investors with absolute transparency.
          </p>
        </FadeIn>
      </section>

      <section className="bg-emerald-50/40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-20 lg:py-24 border-y border-emerald-100/50">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-white rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-end relative overflow-hidden group border border-zinc-100 shadow-2xl shadow-emerald-200/50 transition-shadow duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent group-hover:scale-105 transition-transform duration-700"></div>
              <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600/20 relative z-10 mb-8" strokeWidth={1}/>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light relative z-10 text-zinc-900 leading-tight">"Wealth creation shouldn't be a black box. Our goal is absolute clarity."</h3>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="right">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Our Genesis</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed mb-5">
              For years, the financial advisory industry has thrived on complexity, jargon, and hidden fees. Ask Geo was created to dismantle that complexity. 
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed mb-8">
              We realized that true financial freedom comes when clients deeply understand their portfolios. By combining advanced AI analytics with human empathy, we've built a platform where your goals are the only metrics that matter. We don't just manage money; we educate, empower, and elevate our investors.
            </p>
            <div className="flex gap-10 sm:gap-16 border-t border-zinc-200 pt-8">
               <div className="group cursor-default">
                 <p className="text-3xl sm:text-4xl font-medium text-emerald-600 mb-2 group-hover:scale-110 origin-left transition-transform duration-300">2015</p>
                 <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase font-semibold">Established</p>
               </div>
               <div className="group cursor-default">
                 <p className="text-3xl sm:text-4xl font-medium text-emerald-600 mb-2 group-hover:scale-110 origin-left transition-transform duration-300">Pune</p>
                 <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase font-semibold">Headquarters</p>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-zinc-50/50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-4 text-zinc-900">The Ask Geo Pillars</h2>
            <p className="text-base sm:text-lg text-zinc-500 font-light max-w-2xl">The non-negotiable principles that guide every portfolio decision we make.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: "Radical Transparency", desc: "No hidden loads, no opaque commissions. You see exactly what we see." },
              { title: "Data-Backed", desc: "Emotions destroy wealth. We rely on quantitative models and AI insights." },
              { title: "Fiduciary Duty", desc: "Your interests always precede ours. We grow only when your portfolio grows." },
              { title: "Holistic Planning", desc: "We look beyond mere returns, focusing on taxation, risk, and succession." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up" className="bg-white border border-zinc-200 p-8 sm:p-10 rounded-[2rem] hover:border-emerald-200 hover:shadow-xl hover:shadow-zinc-200 transition-all duration-500 group hover:-translate-y-2">
                <div className="w-12 h-12 bg-zinc-100 text-emerald-600 rounded-xl flex items-center justify-center font-mono text-lg font-medium mb-6 group-hover:bg-emerald-100 transition-colors duration-500">
                  0{idx + 1}
                </div>
                <h4 className="text-xl sm:text-2xl font-medium mb-3 text-zinc-900">{item.title}</h4>
                <p className="text-zinc-500 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-50/30 px-6 sm:px-10 lg:px-16 xl:px-24 py-24 border-t border-green-100/50">
         <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <FadeIn direction="left" className="lg:w-1/3 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-8 text-zinc-900">Leadership</h2>
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-white rounded-[2rem] p-2 relative overflow-hidden group shadow-2xl shadow-green-100 border border-green-100">
                 <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                   <img src="https://static.wixstatic.com/media/548938_3bb01f88ba6541a195f21b0b543cd613~mv2.png" alt="Geo Thomas" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/10 to-transparent"></div>
                   <div className="absolute bottom-8 left-8 right-8 z-10">
                      <h3 className="text-2xl sm:text-3xl font-medium text-white mb-1">Geo Thomas</h3>
                      <p className="text-emerald-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Founder & Chief Advisor</p>
                   </div>
                 </div>
              </div>
            </FadeIn>
            <FadeIn delay={200} direction="right" className="lg:w-2/3 flex flex-col justify-center">
              <Quote className="w-12 h-12 text-green-300 mb-8" strokeWidth={1} />
              <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-zinc-900 mb-8">
                "I started Ask Geo because I saw a massive gap between what institutions were doing to grow wealth and what retail investors were being sold. I wanted to level the playing field."
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-light text-zinc-600 leading-relaxed mb-6">
                Geo brings over 15 years of deep market experience, holding AMFI certifications and a profound understanding of macroeconomic cycles. His approach combines rigorous mathematical modeling with a deep understanding of human behavioral finance.
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-light text-zinc-600 leading-relaxed">
                Under his leadership, Ask Geo has grown to manage over 133K Crore in AUM, maintaining an impressive historic XIRR benchmark by staying disciplined, avoiding market noise, and focusing strictly on compounding.
              </p>
            </FadeIn>
         </div>
      </section>
    </div>
  );
};

// --- SERVICES PAGE COMPONENT ---
const ServicesPage = ({ setCurrentPage, openContactModal }) => {
  return (
    <div className="pt-32 pb-0 animate-in fade-in duration-700 text-left bg-zinc-50">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn direction="down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Comprehensive <br />
            <span className="font-medium text-emerald-600">Financial Architecture.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light max-w-3xl leading-relaxed mb-8">
            We don't just pick funds. We build robust, tax-efficient, and inflation-beating systems tailored to your exact life stage.
          </p>
        </FadeIn>
      </section>

      <section className="bg-emerald-50/40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-20 lg:py-28 border-y border-emerald-100/50">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="w-16 h-16 bg-white border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Briefcase className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Wealth Management</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed mb-8">
              Our core offering. We look at your entire financial landscape—assets, liabilities, cash flow, and goals—to engineer a comprehensive strategy that preserves capital while seeking aggressive growth where appropriate.
            </p>
            <ul className="space-y-4 mb-10">
              {['Goal-based SIP structuring', 'Lumpsum deployment strategies', 'Asset allocation modeling', 'Retirement corpus planning'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-800 font-medium text-sm sm:text-base"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => openContactModal('Wealth Management')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-emerald-600/20 flex items-center gap-2 group hover:-translate-y-1 w-full sm:w-auto justify-center">
              Request Detailed Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </FadeIn>
          <FadeIn delay={200} direction="left" className="order-1 lg:order-2">
            <div className="aspect-[4/3] bg-white rounded-[2.5rem] border border-emerald-100 relative overflow-hidden shadow-2xl shadow-emerald-100/50 group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent group-hover:scale-105 transition-transform duration-1000"></div>
               <PieChart className="absolute -bottom-10 -right-10 w-72 h-72 text-emerald-50/80 group-hover:-rotate-12 transition-transform duration-1000" strokeWidth={0.5} />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-green-50/40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-20 lg:py-28">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <div className="aspect-[4/3] bg-white rounded-[2.5rem] border border-green-100 relative overflow-hidden shadow-2xl shadow-green-100/50 group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-100/50 to-transparent group-hover:scale-105 transition-transform duration-1000"></div>
               <TrendingUp className="absolute -top-10 -left-10 w-72 h-72 text-green-50/80 group-hover:rotate-12 transition-transform duration-1000" strokeWidth={0.5} />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-100/50 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </FadeIn>
          <FadeIn delay={200} direction="left">
            <div className="w-16 h-16 bg-white border border-green-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Activity className="w-8 h-8 text-green-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Portfolio Management</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed mb-8">
              For High Net Worth Individuals (HNIs) requiring active oversight. We utilize our AI Insight Engine alongside macro-economic research to actively rebalance and optimize your exposure to Equity, Debt, and Alternative assets.
            </p>
            <ul className="space-y-4 mb-10">
              {['Active ETF & Direct Equity advisory', 'Dynamic debt fund rotation', 'Quarterly rebalancing', 'Tax-loss harvesting'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-800 font-medium text-sm sm:text-base"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
              ))}
            </ul>
            <button onClick={() => openContactModal('Portfolio Management')} className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 flex items-center gap-2 group hover:-translate-y-1 w-full sm:w-auto justify-center">
              Explore PMS Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </FadeIn>
        </div>
      </section>

      <section className="bg-zinc-50/50 py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-zinc-200/50">
        <div className="w-full max-w-[1800px] mx-auto">
          <FadeIn direction="up" className="mb-16 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Our Onboarding Protocol</h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed">A systematic, friction-free process designed to transition you into a fully optimized portfolio within weeks.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-zinc-200 z-0"></div>
             {[
               { step: "01", title: "Discovery", desc: "A deep dive into your current assets, liabilities, and aspirations." },
               { step: "02", title: "Audit", desc: "Our AI Engine analyzes your existing portfolio for inefficiencies and hidden risks." },
               { step: "03", title: "Architecture", desc: "We present a mathematical, newly structured portfolio blueprint." },
               { step: "04", title: "Execution", desc: "Seamless deployment and the start of 24/7 active monitoring." }
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 200} direction="zoom" className="relative z-10 bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-xl shadow-zinc-200/30 hover:-translate-y-2 transition-transform duration-500">
                 <div className="w-14 h-14 bg-emerald-600 shadow-lg shadow-emerald-600/30 text-white rounded-2xl flex items-center justify-center text-lg font-bold mb-6">{item.step}</div>
                 <h4 className="text-xl font-medium mb-3 text-zinc-900">{item.title}</h4>
                 <p className="text-zinc-500 font-light text-base leading-relaxed">{item.desc}</p>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- CALCULATORS PAGE COMPONENT ---
const CalculatorsPage = ({ setCurrentPage, openContactModal }) => {
  const [activeTab, setActiveTab] = useState('sip');

  const tabs = [
    { id: 'sip', name: 'SIP Pro', icon: TrendingUp },
    { id: 'stepup', name: 'Step-Up SIP', icon: Zap },
    { id: 'stp', name: 'STP to SIP', icon: RefreshCw },
    { id: 'lumpsum', name: 'Lumpsum', icon: Briefcase },
    { id: 'emivssip', name: 'EMI vs SIP', icon: PieChart },
    { id: 'emimatch', name: 'EMI Match SIP', icon: Activity },
    { id: 'prepayment', name: 'EMI Prepayment', icon: ChevronsDown },
    { id: 'smartemi', name: 'Zero-Cost EMI', icon: Sparkles },
    { id: 'earlyclosure', name: 'Early Debt Freedom', icon: ShieldCheck },
    { id: 'fire', name: 'F.I.R.E Target', icon: Map },
    { id: 'goal', name: 'Goal Planner', icon: Target },
  ];

  return (
    <div className="pt-32 pb-0 animate-in fade-in duration-700 text-left bg-zinc-50">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-20">
        <FadeIn direction="down" className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            The Math of <br />
            <span className="font-medium text-emerald-600">Wealth Creation.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light leading-relaxed mb-8">
            A suite of advanced, precision tools designed to help you visualize compounding, plan for retirement, and map out your definitive path to financial freedom.
          </p>
        </FadeIn>
      </section>

      <section className="bg-white px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-12 lg:py-16 border-y border-zinc-200/50">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-white border border-zinc-200/60 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-zinc-200/50">
            <FadeIn delay={100} direction="up" className="mb-12">
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 snap-x border-b border-zinc-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`snap-start whitespace-nowrap flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      activeTab === tab.id 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' 
                        : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 hover:bg-white'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'animate-pulse' : ''}`} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                    {tab.name}
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="min-h-[550px]">
              {activeTab === 'sip' && <SipCalculatorWidget />}
              {activeTab === 'stepup' && <StepUpCalculatorWidget />}
              {activeTab === 'stp' && <StpToSipCalculatorWidget />}
              {activeTab === 'lumpsum' && <LumpsumCalculatorWidget />}
              {activeTab === 'emivssip' && <EmiVsSipCalculatorWidget />}
              {activeTab === 'emimatch' && <EmiMatchSipWidget />}
              {activeTab === 'prepayment' && <ExtraEmiCalculatorWidget />}
              {activeTab === 'smartemi' && <SmartEmiCalculatorWidget />}
              {activeTab === 'earlyclosure' && <EarlyClosureWidget />}
              {activeTab === 'fire' && <FireCalculatorWidget />}
              {activeTab === 'goal' && <GoalCalculatorWidget />}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-20 lg:py-28 flex flex-col items-start text-left">
        <FadeIn direction="up" className="flex flex-col items-start max-w-2xl">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
            <Calculator className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Numbers look good?</h2>
          <p className="text-zinc-600 font-light mb-10 text-base sm:text-lg leading-relaxed">Calculators show possibilities. Our experts turn them into realities. Let Ask Geo build the portfolio that executes your math.</p>
          <button onClick={() => openContactModal('Execute My Plan')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all duration-300 shadow-xl shadow-emerald-600/20 inline-flex items-center justify-start gap-3 group hover:-translate-y-1 w-full sm:w-auto text-base">
            Schedule a Strategy Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
};

// --- INSIGHTS PAGE COMPONENT ---
const InsightsPage = ({ setCurrentPage, openContactModal }) => {
  const articles = [
    { tag: "MACRO", date: "Oct 24, 2023", title: "The Fed's Pivot: What it means for Emerging Markets and Indian Debt", read: "6 min read" },
    { tag: "EQUITY", date: "Oct 12, 2023", title: "Navigating Volatility: Why Tech ETFs remain a stronghold in Q4.", read: "5 min read" },
    { tag: "TAX PLANNING", date: "Sep 28, 2023", title: "Maximizing Section 80C: A mathematical comparison of ELSS vs PPF.", read: "8 min read" },
    { tag: "WEALTH", date: "Sep 15, 2023", title: "The Psychology of Holding: Why idle portfolios often beat active trading.", read: "4 min read" },
    { tag: "ALTERNATIVES", date: "Aug 30, 2023", title: "Demystifying InvITs and REITs for the modern passive income investor.", read: "7 min read" },
    { tag: "RETIREMENT", date: "Aug 12, 2023", title: "The 4% Rule: Is it still viable for modern Indian retirement planning?", read: "6 min read" },
  ];

  return (
    <div className="pt-32 pb-0 animate-in fade-in duration-700 text-left bg-zinc-50">
      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 w-full max-w-[1800px] mx-auto py-16 lg:py-24">
        <FadeIn direction="down" className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 mb-6 leading-[1.05]">
            Market <br />
            <span className="font-medium text-emerald-600">Intelligence.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-light leading-relaxed mb-8">
            Institutional-grade research, macroeconomic breakdowns, and tactical strategies to keep you ahead of the curve.
          </p>
        </FadeIn>
      </section>

      <section className="bg-emerald-50/30 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-16 lg:py-20 border-y border-emerald-100/50">
        <div className="max-w-[1800px] mx-auto">
          <FadeIn delay={100} direction="zoom">
            <div className="bg-white border border-emerald-100 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center group cursor-pointer relative overflow-hidden shadow-2xl shadow-emerald-100/50 hover:shadow-emerald-200 transition-shadow duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent group-hover:scale-105 transition-transform duration-1000"></div>
              <div className="w-full lg:w-1/2 relative z-10">
                <div className="aspect-[16/9] lg:aspect-[4/3] bg-zinc-50 rounded-3xl flex items-center justify-center border border-zinc-100 shadow-inner overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 to-transparent"></div>
                  <BookOpen className="w-16 h-16 lg:w-20 lg:h-20 text-emerald-200 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-700 relative z-10" strokeWidth={1} />
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200">SPECIAL REPORT</span>
                  <span className="text-xs text-zinc-500 font-medium">November 2023</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 group-hover:text-emerald-600 transition-colors duration-300 leading-tight text-zinc-900">
                  The 2024 Blueprint: Positioning portfolios for the next election cycle.
                </h2>
                <p className="text-zinc-600 font-light leading-relaxed mb-8 text-base sm:text-lg">
                  An exhaustive 40-page analysis of historical market behaviors preceding Indian general elections, identifying tactical overweight opportunities in infrastructure, manufacturing, and consumption sectors.
                </p>
                <button onClick={() => openContactModal('Request Special Report')} className="inline-flex items-center justify-center gap-3 font-medium text-white bg-zinc-900 hover:bg-emerald-600 px-8 py-4 rounded-xl transition-all duration-300 text-sm w-full sm:w-auto shadow-lg group-hover:shadow-emerald-600/30">
                  Request Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto py-20 lg:py-28">
        <div className="max-w-[1800px] mx-auto">
          <FadeIn direction="up" className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-zinc-900">Latest Publications</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {articles.map((post, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up" className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/20 hover:-translate-y-2 hover:shadow-zinc-200/40 transition-all duration-500">
                <div className="aspect-[16/10] bg-zinc-50 rounded-2xl mb-6 overflow-hidden relative border border-zinc-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent transition-transform duration-1000 group-hover:scale-110"></div>
                  <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-zinc-200 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">{post.tag}</span>
                  <span className="text-[10px] text-zinc-400 font-medium">{post.date}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 pr-6 relative mb-4 leading-snug">
                  {post.title}
                  <ArrowUpRight className="absolute right-0 top-1 w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-emerald-600" strokeWidth={1.5} />
                </h3>
                <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mt-auto">{post.read}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main Application ---
const AskGeoApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalTitle, setContactModalTitle] = useState('');

  const openContactModal = (title) => {
    setContactModalTitle(title);
    setContactModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-200 selection:text-zinc-900 overflow-x-hidden text-left">
      
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float 9s ease-in-out infinite 1s; }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(40px, -60px) scale(1.1); } 66% { transform: translate(-30px, 30px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 12s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* --- Minimal Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200/50 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-500 shadow-md">
              <TrendingUp className="text-white w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </div>
            <span className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-900">Ask <span className="font-medium transition-colors duration-500 group-hover:text-emerald-600">Geo</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
              const pageKey = item.toLowerCase();
              const isActive = currentPage === pageKey;
              return (
                <button 
                  key={item} 
                  onClick={() => { setCurrentPage(pageKey); window.scrollTo(0,0); }} 
                  className={`text-[10px] xl:text-xs font-bold tracking-widest transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500 after:transition-all after:duration-300 ${isActive ? 'text-zinc-900 after:w-full' : 'text-zinc-500 hover:text-zinc-900 after:w-0 hover:after:w-full'}`}
                >
                  {item}
                </button>
              );
            })}
            
            <button 
              onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} 
              className={`text-[10px] xl:text-xs font-bold tracking-widest px-6 py-3 rounded-xl border-2 transition-all flex items-center gap-2 ${currentPage === 'tools' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-zinc-900 border-zinc-900 text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-lg hover:-translate-y-0.5'}`}
            >
              <Sparkles className="w-4 h-4" /> ADVANCED TOOLS
            </button>
          </div>

          <button className="lg:hidden text-zinc-900 p-2 bg-white rounded-lg shadow-sm border border-zinc-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 py-6 px-6 flex flex-col gap-6 shadow-2xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS'].map((item) => {
            const pageKey = item.toLowerCase();
            const isActive = currentPage === pageKey;
            return (
              <button 
                key={item} 
                onClick={() => { setCurrentPage(pageKey); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
                className={`text-sm font-bold tracking-widest text-left flex items-center gap-3 p-2 rounded-lg ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-600 hover:bg-zinc-50'}`}
              >
                {item}
              </button>
            );
          })}
          <div className="h-px bg-zinc-100 w-full"></div>
          <button 
            onClick={() => { setCurrentPage('tools'); setMobileMenuOpen(false); window.scrollTo(0,0); }} 
            className="mt-2 bg-zinc-900 text-white text-sm font-bold tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 active:bg-emerald-600 transition-colors shadow-lg"
          >
            <Sparkles className="w-5 h-5" /> ADVANCED TOOLS
          </button>
        </div>
      </nav>

      {/* --- PAGE ROUTER MAIN --- */}
      <main>
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'tools' && <CalculatorsPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'insights' && <InsightsPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        
        {currentPage === 'home' && (
          <>
      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 lg:pt-52 lg:pb-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden bg-zinc-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 z-10 relative">
            <FadeIn delay={0} direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200/60 shadow-sm text-zinc-700 text-[10px] sm:text-xs font-bold tracking-widest mb-8">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" strokeWidth={2} /> AI-OPTIMIZED PLANNING
              </div>
            </FadeIn>
            
            <FadeIn delay={150} direction="right">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.05] text-zinc-950 mb-8">
                For expert advice, <br />
                <span className="font-medium text-emerald-600">
                  Ask Geo.
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={300} direction="right">
              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 mb-10 max-w-xl font-light leading-relaxed">
                We build, manage, and preserve your wealth with highly customized, data-driven financial strategies.
              </p>
            </FadeIn>
            
            <FadeIn delay={450} direction="up">
              <button onClick={() => openContactModal('Ask Geo Now')} className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-zinc-900 text-white rounded-xl font-medium overflow-hidden transition-all hover:shadow-[0_10px_40px_rgb(16,185,129,0.3)] hover:-translate-y-1 w-full sm:w-auto text-center flex justify-center text-sm sm:text-base">
                <span className="relative z-10 flex items-center gap-3">
                  Ask Geo Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </button>
            </FadeIn>
          </div>

          {/* Hero Abstract Graphic */}
          <div className="lg:w-1/2 relative w-full h-[450px] sm:h-[550px] lg:h-[650px] mt-10 lg:mt-0 perspective-1000">
            <FadeIn delay={600} direction="zoom" className="w-full h-full relative flex items-center justify-center">
              
              <div className="w-[85%] max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] relative z-10">
                <div className="w-full bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-zinc-300/50 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 group-hover:rotate-12">
                     <TrendingUp className="w-48 h-48 sm:w-64 sm:h-64 text-zinc-900" strokeWidth={1} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <PieChart className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 text-zinc-900">Portfolio Metrics</h3>
                    <p className="text-zinc-500 text-sm sm:text-base font-light mb-10 lg:mb-12">Historical data & active management</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-5 relative z-10">
                    <div className="bg-zinc-50 p-5 sm:p-6 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all">
                      <p className="text-[10px] sm:text-xs font-bold text-zinc-400 tracking-widest uppercase mb-2">AUM</p>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900">13.44K<span className="text-zinc-400 text-sm sm:text-base ml-1 font-medium">Cr</span></p>
                    </div>
                    <div className="bg-emerald-50 p-5 sm:p-6 rounded-2xl border border-emerald-100/50 hover:bg-emerald-100/50 hover:shadow-md transition-all">
                      <p className="text-[10px] sm:text-xs font-bold text-emerald-600/70 tracking-widest uppercase mb-2">XIRR</p>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-emerald-700">+14.4%</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: AI Engine */}
                <div className="absolute -left-12 sm:-left-28 lg:-left-40 top-0 sm:top-8 lg:top-12 bg-zinc-900 border border-zinc-800 text-white p-4 sm:p-5 rounded-2xl shadow-2xl animate-float z-20 flex items-center gap-4 cursor-default w-max">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-900/50 flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 animate-pulse" strokeWidth={1.5} />
                  </div>
                  <div className="pr-4 sm:pr-6">
                    <p className="text-[9px] sm:text-[10px] font-bold text-emerald-500 tracking-widest uppercase mb-1">AI Engine</p>
                    <p className="text-sm sm:text-base font-light text-white">Optimizing...</p>
                  </div>
                </div>

                {/* Floating Card 2: Trust/Clients */}
                <div className="absolute -right-12 sm:-right-28 lg:-right-40 top-[35%] lg:top-[40%] bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xl animate-float-delayed z-20 flex items-center gap-4 cursor-default w-max">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-600" strokeWidth={1.5} />
                  </div>
                  <div className="pr-4 sm:pr-6">
                    <p className="text-[9px] sm:text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Trust</p>
                    <p className="text-sm sm:text-base font-medium text-zinc-900">2.6K+ Clients</p>
                  </div>
                </div>

                {/* Floating Card 3: Live Sync */}
                <div className="absolute -left-4 sm:-left-20 lg:-left-28 -bottom-4 sm:bottom-4 lg:-bottom-8 bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xl animate-float-slow z-30 flex items-center gap-4 cursor-default w-max">
                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" strokeWidth={1.5} />
                  </div>
                  <div className="pr-4 sm:pr-6">
                    <p className="text-[9px] sm:text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Live Sync</p>
                    <p className="text-sm sm:text-base font-medium text-zinc-900">Market Data</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Clean Divider Stats --- */}
      <section className="border-y border-zinc-200/50 bg-white py-16 lg:py-20">
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          <FadeIn delay={100} direction="up" className="py-4 sm:pr-8 text-left">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-900 mb-2">
              <AnimatedNumber end={26} suffix="L+" />
            </h4>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">Active Investors</p>
          </FadeIn>
          <FadeIn delay={250} direction="up" className="py-8 sm:py-4 sm:px-8 text-left">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-900 mb-2">
              <AnimatedNumber end={133} suffix="K" />
            </h4>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">Crore AUM</p>
          </FadeIn>
          <FadeIn delay={400} direction="up" className="py-8 sm:py-4 sm:pl-8 text-left sm:col-span-2 lg:col-span-1 sm:border-t lg:border-t-0 sm:pt-8 lg:pt-4">
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-emerald-600 mb-2">
              <AnimatedNumber end={12} suffix="%" />
            </h4>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-600 uppercase">Historic XIRR</p>
          </FadeIn>
        </div>
      </section>

      {/* --- Core Philosophy --- */}
      <section className="bg-emerald-50/30 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full">
        <div className="max-w-[1800px] mx-auto">
          <FadeIn className="mb-16 max-w-3xl text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter mb-6 text-zinc-900">Our Core Philosophy</h2>
            <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed">
              We operate on principles that prioritize your long-term security, utilizing data-driven precision to eliminate guesswork from your financial future.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {[
              { icon: Target, title: "Absolute Precision", desc: "Every portfolio is mathematically optimized to align perfectly with your risk appetite and timelines." },
              { icon: ShieldCheck, title: "Unwavering Trust", desc: "100% transparency in fee structures and investment logic. We win only when your portfolio wins." },
              { icon: Zap, title: "Dynamic Agility", desc: "Market conditions change rapidly. Our strategies adapt in real-time to protect and grow your wealth." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 200} direction="zoom" className="group text-left bg-white p-8 sm:p-10 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-100/30 hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-500 border border-emerald-100">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-600 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI Tool Section --- */}
      <section id="ai-tools" className="bg-zinc-50 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full relative border-y border-zinc-200">
        <div className="max-w-[1800px] mx-auto">
          
          <FadeIn direction="up" className="mb-16 max-w-3xl text-left">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-zinc-200 shadow-md mb-8 group hover:shadow-emerald-200/50 transition-all duration-500">
              <Bot className="w-7 h-7 text-emerald-600 group-hover:animate-bounce" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-zinc-900">Geo AI Insight Engine</h2>
            <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed">
              Experience the future of financial planning. Our proprietary AI tools analyze market trends, risk tolerance, and your unique goals to provide real-time strategies.
            </p>
          </FadeIn>

          <FadeIn delay={300} direction="zoom">
            <AIAssistantWidget openContactModal={openContactModal} />
          </FadeIn>
        </div>
      </section>

      {/* --- Philosophy Section --- */}
      <section id="about" className="py-24 sm:py-32 lg:py-40 bg-emerald-50/40 px-6 sm:px-10 lg:px-16 xl:px-24 text-left border-b border-emerald-100/50">
        <div className="w-full max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <FadeIn direction="left">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter mb-8 leading-[1.05] text-zinc-900">
                Let's talk about <br/><span className="font-medium text-emerald-600">wealth.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={150} direction="left">
              <p className="text-zinc-600 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-8">
                Wealth is not just about accumulating assets, but managing them in a way that aligns with your values. It requires a personalized plan factoring in risk tolerance, goals, and life circumstances.
              </p>
            </FadeIn>
            <FadeIn delay={300} direction="left">
              <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 mb-10 text-lg sm:text-xl font-normal text-zinc-800 leading-relaxed bg-white/50 rounded-r-xl">
                "The ‘know-nothing’ investor should practice diversification, but it is crazy if you are an expert."
              </blockquote>
            </FadeIn>
            <FadeIn delay={450} direction="left">
              <button onClick={() => openContactModal('Let\'s Build Wealth')} className="inline-flex justify-center w-full sm:w-auto items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-emerald-600/30 group hover:-translate-y-1">
                Let's Build Wealth <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>
            </FadeIn>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 relative">
            <FadeIn delay={200} direction="zoom" className="space-y-6 sm:pt-12">
              <div className="bg-white border border-green-100 rounded-[2rem] p-8 sm:p-10 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-500 hover:-translate-y-2 group">
                <PieChart className="text-emerald-500 w-8 h-8 mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Mutual Funds</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Expertly curated schemes for optimal growth.</p>
              </div>
              <div className="bg-white border border-green-100 rounded-[2rem] p-8 sm:p-10 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-500 hover:-translate-y-2 group">
                <TrendingUp className="text-emerald-500 w-8 h-8 mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Equity & ETFs</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Direct market participation with strategy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={400} direction="zoom" className="space-y-6">
              <div className="bg-white border border-green-100 rounded-[2rem] p-8 sm:p-10 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-500 hover:-translate-y-2 group">
                <ShieldCheck className="text-emerald-500 w-8 h-8 mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Bonds & FD</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Secure, fixed-income instruments.</p>
              </div>
              <div className="bg-emerald-600 rounded-[2rem] p-8 sm:p-10 text-white flex flex-col justify-center min-h-[200px] hover:scale-105 transition-transform duration-500 shadow-xl shadow-emerald-600/30">
                <h4 className="font-light text-5xl sm:text-6xl mb-2">12%</h4>
                <p className="text-emerald-100 font-bold tracking-widest text-[10px] sm:text-xs uppercase">Historic XIRR</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="bg-white py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full text-left">
        <div className="max-w-[1800px] mx-auto">
          <FadeIn direction="up" className="mb-16 max-w-3xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-6 text-zinc-900">Our Expertise</h2>
              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed">
                As a financial advisor, I offer a range of services designed to help my clients achieve their ultimate financial freedom.
              </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              { title: "Wealth Management", icon: Briefcase, desc: "Building and preserving wealth through personalized, high-yield management strategies." },
              { title: "Portfolio Management", icon: TrendingUp, desc: "Recommending and adjusting the diversity of investments to ensure the best possible long-term outcome." },
              { title: "Insurance Management", icon: ShieldCheck, desc: "Managing risk by assessing needs, identifying coverage gaps and recommending policies." }
            ].map((service, idx) => (
              <FadeIn key={idx} delay={idx * 200} direction="zoom" className="group">
                <div className="bg-white border border-zinc-200 p-10 sm:p-12 rounded-[2.5rem] hover:shadow-2xl hover:shadow-zinc-200/50 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-500">
                    <service.icon className="w-7 h-7 text-emerald-500 group-hover:text-white transition-colors group-hover:-rotate-12 duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-zinc-900">{service.title}</h3>
                  <p className="text-zinc-500 font-light text-base leading-relaxed mt-auto">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Interactive Tools Teaser --- */}
      <section className="py-24 sm:py-32 lg:py-40 bg-emerald-50/30 text-zinc-900 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left border-y border-emerald-100/50">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <div className="w-full lg:w-1/2">
            <FadeIn direction="left" className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-emerald-100 text-emerald-600 text-[10px] sm:text-xs font-bold tracking-widest mb-8 shadow-sm">
                <Calculator className="w-4 h-4 animate-pulse" strokeWidth={2} /> INTERACTIVE TOOLS
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-6 leading-[1.1]">
                Visualize your <br/><span className="font-medium text-emerald-600">financial trajectory.</span>
              </h2>
              <p className="text-zinc-600 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-10">
                Don't guess your future. Use our advanced SIP, Lumpsum, and Retirement calculators to mathematically map out your path to financial freedom.
              </p>
              <button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="inline-flex justify-center sm:justify-start items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto shadow-lg group hover:-translate-y-1">
                Try Calculators <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn delay={300} direction="zoom">
              <div className="bg-white border border-emerald-100 p-8 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-200/50 hover:shadow-emerald-200 transition-shadow duration-700">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-6">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-medium text-zinc-900 mb-2">SIP Calculator Pro</h4>
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest">Projected Growth</p>
                  </div>
                  <BarChart3 className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm sm:text-base mb-3"><span className="text-zinc-500 font-light">Monthly Investment</span><span className="text-zinc-900 font-medium">₹25,000</span></div>
                    <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-1/3 relative"><div className="absolute inset-0 bg-white/20 animate-pulse"></div></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm sm:text-base mb-3"><span className="text-zinc-500 font-light">Time Period</span><span className="text-zinc-900 font-medium">15 Years</span></div>
                    <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-1/2 relative"><div className="absolute inset-0 bg-white/20 animate-pulse"></div></div>
                    </div>
                  </div>
                  <div className="pt-8 mt-8 border-t border-zinc-100">
                    <p className="text-zinc-500 font-bold tracking-widest text-[10px] sm:text-xs mb-3 uppercase">Estimated Future Value</p>
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-emerald-600">
                      ₹<AnimatedNumber end={1.26} decimals={2} duration={2500} /> Cr.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Pre-Footer CTA --- */}
      <section className="bg-zinc-50 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left border-t border-zinc-200">
        <div className="w-full max-w-[1800px] mx-auto relative z-10 flex flex-col items-start">
          <FadeIn direction="up" className="flex flex-col items-start max-w-3xl">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 border border-zinc-200 shadow-xl shadow-emerald-100/50">
              <TrendingUp className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter text-zinc-950 mb-8 leading-[1.05]">
              Ready to build your <br />
              <span className="font-medium text-emerald-600">
                financial fortress?
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-zinc-600 font-light mb-12 leading-relaxed">
              Join over 26 Lakh investors who trust Ask Geo to navigate the complexities of wealth creation and preservation.
            </p>
            <button onClick={() => openContactModal('Start Your Journey')} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-medium transition-all duration-300 shadow-[0_10px_40px_rgba(16,185,129,0.3)] flex items-center gap-3 text-base sm:text-lg w-full sm:w-auto justify-start group hover:-translate-y-1">
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </FadeIn>
        </div>
      </section>
          </>
        )}
      </main>

      {/* --- Clean Align-Left Footer --- */}
      <footer className="bg-[#09090b] text-[#a1a1aa] pt-24 pb-12 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-zinc-900 text-left">
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 border-b border-zinc-800 pb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className="flex items-center gap-3 group cursor-pointer mb-8" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-500 shadow-md">
                  <TrendingUp className="text-white w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <span className="text-2xl sm:text-3xl font-light tracking-tight text-white">Ask <span className="font-medium transition-colors duration-500 text-emerald-500 group-hover:text-emerald-400">Geo</span></span>
              </div>
              <p className="text-sm sm:text-base font-light leading-relaxed mb-10 max-w-sm text-zinc-400">
                A premier financial advisory firm dedicated to building, managing, and preserving wealth through highly customized, data-driven strategies and AI-optimized planning.
              </p>
              <div className="flex gap-5">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-all duration-300">
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-all duration-300">
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-all duration-300">
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-all duration-300">
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 lg:col-start-7">
              <h4 className="text-white font-medium mb-8 text-base">Quick Links</h4>
              <ul className="space-y-5 text-sm sm:text-base font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Home</button></li>
                <li><button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">About Geo</button></li>
                <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('ai-tools')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-emerald-400 transition-colors text-left pl-4 border-l-2 border-zinc-800">AI Insight Engine</button></li>
                <li><button onClick={() => { setCurrentPage('insights'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left pl-4 border-l-2 border-zinc-800">Market Intelligence</button></li>
                <li><button onClick={() => openContactModal('Contact Us')} className="hover:text-emerald-400 transition-colors text-left">Contact Us</button></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3 lg:col-start-10">
              <h4 className="text-white font-medium mb-8 text-base">Our Services</h4>
              <ul className="space-y-5 text-sm sm:text-base font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Wealth Management</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Portfolio Analysis</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Insurance Planning</button></li>
                <li><button onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Retirement Strategy</button></li>
                <li><button onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Tax Optimization</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-500">
            <p>© {new Date().getFullYear()} Ask Geo Financial Services.</p>
            <div className="flex flex-wrap gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">SEBI Registration</a>
            </div>
          </div>
        </div>
      </footer>
      <GeneralContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} title={contactModalTitle} />
    </div>
  );
};

export default AskGeoApp;
