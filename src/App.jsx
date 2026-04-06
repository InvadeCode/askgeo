import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, TrendingUp, ShieldCheck, Briefcase, 
  Map, ChevronRight, Bot, Sparkles, PieChart, 
  ArrowRight, ArrowLeft, Phone, Mail, MapPin, Activity, Check,
  Target, Zap, Users, Calculator, BookOpen, Star, 
  ArrowUpRight, BarChart3, Quote, ChevronDown, ChevronsDown, RefreshCw,
  Download, Lock, Send
} from 'lucide-react';

// --- BACKEND API CONFIGURATION ---
const TARGET_EMAIL = "geoconsultant@gmail.com";

const fetchWithTimeout = async (url, options = {}, timeout = 60000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
};

const wakeBackend = async () => {
  try {
    await fetchWithTimeout("https://ask-geo.onrender.com/", { method: "GET" }, 20000);
  } catch (error) {
    console.warn("Wake ping finished (server should be spinning up).");
  }
};

const sendEmailViaBackend = async (subject, htmlBody, attachments = []) => {
  const formattedAttachments = attachments.map((att) => {
    let base64String = '';

    if (att.dataUri) {
      base64String = att.dataUri.includes(',')
        ? att.dataUri.split(',')[1]
        : att.dataUri;
    } else if (att.content) {
      base64String = att.content;
    }

    return {
      filename: att.filename,
      content: base64String,
      encoding: 'base64',
    };
  });

  await wakeBackend();

  const endpointsToTry = [
    "https://ask-geo.onrender.com/api/submit",
    "https://ask-geo.onrender.com/api/send-email"
  ];

  let response;
  let data;

  for (const endpoint of endpointsToTry) {
    try {
      response = await fetchWithTimeout(
        endpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            to: TARGET_EMAIL,
            subject,
            html: htmlBody,
            attachments: formattedAttachments,
          }),
        },
        60000
      );

      if (response.status === 404) {
        console.warn(`Endpoint ${endpoint} returned 404. Trying next fallback...`);
        continue; 
      }

      data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP Error: ${response.status}`);
      }

      console.log('Backend Delivery Status:', data);
      return data;
    } catch (error) {
      if (response && response.status !== 404) {
        throw error;
      }
    }
  }

  throw new Error("HTTP Error: 404. Both endpoints failed. Please make sure your updated backend code is fully deployed on Render.");
};

const getBeautifulEmailTemplate = (title, leadData, metrics = []) => `
  <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #047857; padding: 32px 24px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 400; letter-spacing: -0.5px;">New Lead Interaction</h2>
      <p style="color: #a7f3d0; margin: 8px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Source: ${title}</p>
    </div>
    <div style="padding: 32px;">
      <h3 style="color: #111827; font-size: 16px; font-weight: 600; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px;">Contact Details</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 36px;">
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; background-color: #f9fafb; color: #6b7280; width: 35%; font-weight: 500; font-size: 13px;">Full Name</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600; font-size: 14px;">${leadData.name || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; background-color: #f9fafb; color: #6b7280; font-weight: 500; font-size: 13px;">Phone</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600; font-size: 14px;">${leadData.phone ? '+91 ' + leadData.phone : 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; background-color: #f9fafb; color: #6b7280; font-weight: 500; font-size: 13px;">Email</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600; font-size: 14px;">${leadData.email || 'N/A'}</td>
        </tr>
        ${leadData.message ? `
        <tr>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; background-color: #f9fafb; color: #6b7280; font-weight: 500; font-size: 13px;">Message</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 400; font-size: 14px;">${leadData.message}</td>
        </tr>
        ` : ''}
      </table>

      ${metrics.length > 0 ? `
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px;">Generated Metrics</h3>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          ${metrics.map((m, index) => `
            <tr>
              <td style="padding: 16px 12px; border-bottom: ${index === metrics.length - 1 ? 'none' : '1px solid #e5e7eb'}; background-color: ${m.success ? '#ecfdf5' : '#ffffff'}; color: #6b7280; width: 55%; font-weight: 500; font-size: 13px;">${m.label}</td>
              <td style="padding: 16px 12px; border-bottom: ${index === metrics.length - 1 ? 'none' : '1px solid #e5e7eb'}; background-color: ${m.success ? '#ecfdf5' : '#ffffff'}; color: ${m.success ? '#059669' : '#111827'}; font-weight: 700; font-size: 16px;">${m.value}</td>
            </tr>
          `).join('')}
        </table>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 16px; text-align: center;"><em>*The detailed PDF blueprint has been attached to this email.</em></p>
      ` : ''}
    </div>
    <div style="background-color: #111827; padding: 20px; text-align: center; color: #9ca3af; font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
      Ask Geo Automated Intelligence System<br />
      <span style="font-weight: 400; color: #6b7280; margin-top: 4px; display: inline-block;">${new Date().toLocaleString()}</span>
    </div>
  </div>
`;

// --- SEO & GEO & AIO HOOK ---
// Dynamically updates Meta Tags and JSON-LD Structured Data for AI Overviews and Google
const useSEO = (title, description, path = '') => {
  useEffect(() => {
    document.title = `${title} | Ask Geo Financial Services`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Remove existing structured data to avoid duplication
    const existingSchema = document.querySelector('#schema-ld');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Inject rich Structured Data for Search Engines & AI Overviews
    const schema = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Ask Geo Financial Services",
      "url": `https://askgeo.in/${path}`,
      "logo": "https://static.wixstatic.com/media/548938_d02490efa777416caf274ba6f2482d6e~mv2.png",
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jai Ganesh Vision, B Wing, BR-2, Office No. 319",
        "addressLocality": "Akurdi, Pune",
        "postalCode": "411035",
        "addressCountry": "IN"
      },
      "telephone": "+919960624271",
      "priceRange": "$$",
      "areaServed": "India",
      "founder": {
        "@type": "Person",
        "name": "Geo Thomas"
      }
    };

    const script = document.createElement('script');
    script.id = 'schema-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

  }, [title, description, path]);
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

// --- Strict Flat Button Component ---
const GeoButton = ({ children, onClick, type = "button", disabled = false, className = "", wFull = false, icon: Icon }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group relative bg-[#18181b] text-white px-8 py-4 rounded-xl font-medium text-sm sm:text-base overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 ${wFull ? 'w-full' : 'w-full sm:w-auto'} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
        {Icon && <Icon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />}
      </span>
      <div className="absolute inset-0 bg-emerald-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
    </button>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const emailHtml = getBeautifulEmailTemplate(title, formData);

      await sendEmailViaBackend(
        `New Ask Geo Lead: ${title} - ${formData.name}`,
        emailHtml
      );

      setIsSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("General contact email failed:", error);
      alert(`Email failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
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
              <GeoButton type="submit" disabled={isProcessing} className="mt-4 !py-3" wFull icon={isProcessing ? Activity : ArrowRight}>
                {isProcessing ? 'Submitting...' : 'Continue'}
              </GeoButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CALCULATOR WIDGETS ---
const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const generateReport = async (config, leadData) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error("Please allow popups to download the report.");
  }

  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const refId = `AG-${Math.floor(Math.random() * 10000)}`;

  const pdfMarkup = `
    <div class="page-container" id="pdf-content">
      <div class="header">
        <div class="logo-container">
          <div style="background: #ffffff; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <img src="https://static.wixstatic.com/media/548938_d02490efa777416caf274ba6f2482d6e~mv2.png" alt="Ask Geo" style="height: 28px; width: auto; object-fit: contain;" />
          </div>
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
      </div>
      <div class="footer">
        <p style="font-size: 8px; color: #94a3b8; text-align: left; margin-bottom: 8px;">Disclaimer: This blueprint is generated by Ask Geo AI Tools for educational and planning purposes only. Calculations are subject to market risks and historical assumptions.</p>
        <div style="text-align: right; font-size: 11px; font-weight: 600; color: #0f172a;">Ask Geo Financial Services<br/><span style="color: #64748b; font-weight: 400; font-size: 10px;">www.askgeo.in | +91 99606 24271</span></div>
      </div>
    </div>
  `;

  const printHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Ask Geo - ${config.reportTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; text-align: left; }
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; color: #18181b; background: #ffffff; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .page-container { width: 210mm; min-height: 297mm; margin: 0 auto; position: relative; overflow: hidden; background: #ffffff; }
          .header { background: #047857; color: #ffffff; padding: 50px 50px 40px 50px; position: relative; overflow: hidden; }
          .logo-container { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
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
          .footer { position: absolute; bottom: 0; width: 100%; padding: 30px 50px; border-top: 1px solid #e2e8f0; background: #ffffff; box-sizing: border-box; }
        </style>
      </head>
      <body>
        ${pdfMarkup}
        <script>
          window.onload = function() {
            setTimeout(() => { window.print(); }, 500);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(printHtml);
  printWindow.document.close();

  const emailHtmlBody = getBeautifulEmailTemplate(
    `Report Download: ${config.reportTitle}`,
    leadData,
    [config.primaryMetric, ...config.secondaryMetrics]
  );

  let hiddenDiv = null;

  try {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    hiddenDiv = document.createElement('div');
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.left = '0';
    hiddenDiv.style.top = '0';
    hiddenDiv.style.width = '210mm';
    hiddenDiv.style.background = '#fff';
    hiddenDiv.style.opacity = '0.01'; 
    hiddenDiv.style.pointerEvents = 'none';
    hiddenDiv.style.zIndex = '-9999';
    hiddenDiv.innerHTML = pdfMarkup;
    document.body.appendChild(hiddenDiv);

    if (!window.html2pdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('html2pdf.js failed to load'));
        document.head.appendChild(script);
      });
    }

    const opt = {
      margin: 0,
      filename: `${config.reportTitle.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.8 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
    };

    const targetElement = hiddenDiv.querySelector('#pdf-content');
    const pdfBase64DataUri = await window.html2pdf()
      .set(opt)
      .from(targetElement)
      .outputPdf('datauristring');

    await sendEmailViaBackend(
      `Report Request: ${config.reportTitle} for ${leadData.name}`,
      emailHtmlBody,
      [{ filename: opt.filename, dataUri: pdfBase64DataUri }]
    );
  } catch (error) {
    console.error('PDF generation failed, sending email without attachment', error);

    await sendEmailViaBackend(
      `Report Request: ${config.reportTitle} for ${leadData.name}`,
      emailHtmlBody
    );
  } finally {
    if (hiddenDiv && document.body.contains(hiddenDiv)) {
      document.body.removeChild(hiddenDiv);
    }
  }
};

const LeadCaptureModal = ({ isOpen, onClose, onDownloadComplete }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', email: '' });
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendDetails = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onDownloadComplete(formData);
    }, 1200);
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
          <form onSubmit={handleSendDetails} className="space-y-5 animate-in slide-in-from-left-4 duration-300">
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
            <GeoButton type="submit" disabled={isProcessing} className="mt-4 !py-3" wFull icon={isProcessing ? Activity : Download}>
              {isProcessing ? 'Generating PDF...' : 'Verify & Download'}
            </GeoButton>
          </form>
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
        description: `Recommended deployment for your ₹${monthlyInvestment.toLocaleString('en-IN')} monthly SIP based on current market valuations.`,
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
             <div className="bg-white border border-emerald-100 rounded-2xl p-6 mt-6 shadow-xl shadow-emerald-100/50">
               <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <Bot className="w-5 h-5" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase">Live Market Allocation</h4>
               </div>
               <p className="text-sm text-zinc-600 mb-5 font-light">To achieve {expectedReturn}% p.a., Ask Geo recommends deploying your {formatCurrency(monthlyInvestment)} across these specific funds:</p>
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

        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="space-y-8 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200/70 uppercase mb-1">Total Invested</p>
                <p className="text-2xl sm:text-3xl font-light">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200/70 uppercase mb-1">Wealth Gained</p>
                <p className="text-2xl sm:text-3xl font-light text-emerald-400">+{formatCurrency(wealthGained)}</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-zinc-800/80 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">Future Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(maturityValue)}</p>
              
              <GeoButton onClick={handleDownloadInitiate} wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[40px] pointer-events-none"></div>
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
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-500/80 uppercase mb-3">Accelerated Future Value</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(futureValue)}</p>
              
              <GeoButton onClick={handleDownloadInitiate} wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <RefreshCw className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={300} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase mb-1">Sustainable Monthly STP</p>
                <p className="text-2xl sm:text-3xl font-light text-emerald-300">{formatCurrency(sustainableMonthlyStp)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase mb-1">Average SIP Equivalent</p>
                <p className="text-xl sm:text-2xl font-light">{formatCurrency(averageSipEquivalent)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-emerald-900/60 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-300 uppercase mb-3">Projected Target Corpus</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-5">{formatCurrency(targetCorpus)}</p>
              <p className="text-xs text-emerald-300 font-medium bg-emerald-900/30 inline-block px-4 py-2 rounded-lg border border-emerald-500/20 mb-8">Net gain over parked capital: {formatCurrency(wealthCreated)}</p>
              
              <GeoButton onClick={handleDownloadInitiate} wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <Activity className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[260px] h-[260px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none"></div>
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
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase mb-3">If EMI amount were invested instead</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-5">{formatCurrency(sipFutureValue)}</p>
              <p className={`text-xs font-medium inline-block px-4 py-2 rounded-lg border mb-8 ${decisionGap >= 0 ? 'text-emerald-300 bg-emerald-900/30 border-emerald-500/20' : 'text-zinc-300 bg-zinc-800/50 border-zinc-600'}`}>
                Net difference vs asset cost: {formatCurrency(decisionGap)}
              </p>
              
              <GeoButton onClick={handleDownloadInitiate} wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
              <PieChart className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
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
              
              <GeoButton onClick={handleDownloadInitiate} wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <ChevronsDown className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
        
        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent rounded-full blur-[50px] pointer-events-none"></div>
            
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

              <div className="grid grid-cols-3 gap-3 mt-6 mb-8">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[8px] font-medium tracking-widest text-emerald-200 uppercase mb-1">Saved by rate drop</p>
                    <p className="text-sm font-bold text-emerald-400 mb-1">{formatYM(safeTime(savedTimeRateDrop))}</p>
                    <p className="text-[9px] text-zinc-400">{formatShortAmt(safeMoney(savedTimeRateDrop))}</p>
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

            <GeoButton onClick={handleDownloadInitiate} className="mt-6 relative z-10" wFull icon={Download}>
              Download Strategy Report
            </GeoButton>
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
               <Sparkles className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={300} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
            
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
              
              <GeoButton onClick={handleDownloadInitiate} className="relative z-10" wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={350} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
            
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
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Required Monthly SIP to close early</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredSip)}</p>
              
              <div className="flex flex-col gap-3 mb-8">
                <div className="inline-flex items-center gap-3 bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-3 rounded-xl w-full">
                  <Activity className="w-4 h-4 shrink-0" /> Save {yearsSaved} years of EMIs
                </div>
                <div className="inline-flex items-center gap-3 bg-green-900/50 border border-green-500/30 text-green-300 text-sm font-medium px-4 py-3 rounded-xl w-full">
                  <Check className="w-4 h-4 shrink-0" /> Wealth Saved: {formatCurrency(totalSavings)}
                </div>
              </div>
              
              <GeoButton onClick={handleDownloadInitiate} className="relative z-10" wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
               <Map className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-400 uppercase mb-2">Projected Future Monthly Expense</p>
                <p className="text-2xl sm:text-3xl font-light text-white">{formatCurrency(futureAnnualExp / 12)}</p>
                <p className="text-xs text-zinc-500 mt-1">Adjusted for {inflation}% inflation</p>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-green-400 uppercase mb-3">Target F.I.R.E. Corpus</p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-4">{formatCurrency(requiredCorpus)}</p>
              
              <GeoButton onClick={handleDownloadInitiate} className="mt-6 relative z-10" wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} direction="zoom" className="bg-zinc-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
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
              
              <GeoButton onClick={handleDownloadInitiate} className="relative z-10" wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
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
        <div className="lg:col-span-5 relative">
          <FadeIn delay={400} direction="zoom" className="bg-emerald-950 text-white p-8 lg:p-10 rounded-[2rem] h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
            <div className="space-y-6 relative z-10 mb-10">
              <div className="bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] sm:text-xs font-medium tracking-widest text-emerald-200 uppercase mb-2">To reach your goal of</p>
                <p className="text-2xl sm:text-3xl font-light text-white">{formatCurrency(targetAmount)}</p>
              </div>
            </div>
            <div className="pt-8 border-t border-emerald-800/50 relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Required Monthly SIP</p>
              <p className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none mb-8">{formatCurrency(requiredSip)}</p>
              
              <GeoButton onClick={handleDownloadInitiate} className="mt-8 relative z-10" wFull icon={Download}>
                Download Strategy Report
              </GeoButton>
            </div>
          </FadeIn>
        </div>
      </div>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onDownloadComplete={handleDownloadComplete} />
    </>
  );
};

// --- HOME PAGE COMPONENT ---
const HomePage = ({ setCurrentPage, openContactModal }) => {
  useSEO("Expert Financial Advisory", "Ask Geo is a premier financial advisory firm in Pune offering holistic wealth management, portfolio architecture, and precision financial calculators.", "home");

  return (
    <>
      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 lg:pt-52 lg:pb-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden bg-zinc-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 z-10 relative">
            <FadeIn delay={0} direction="down">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200/60 shadow-sm text-zinc-700 text-[10px] sm:text-xs font-bold tracking-widest mb-8">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" strokeWidth={2} /> ADVANCED PLANNING
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
              <GeoButton onClick={() => openContactModal('Ask Geo Now')} icon={ArrowRight}>
                Ask Geo Now
              </GeoButton>
            </FadeIn>
          </div>

          {/* Hero Abstract Graphic */}
          <div className="lg:w-1/2 relative w-full h-[450px] sm:h-[550px] lg:h-[650px] mt-10 lg:mt-0 perspective-1000">
            <FadeIn delay={600} direction="zoom" className="w-full h-full relative flex items-center justify-center">
              
              <div className="w-[85%] max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] relative z-10">
                <div className="w-full bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-zinc-300/50 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 transition-opacity duration-1000">
                     <TrendingUp className="w-48 h-48 sm:w-64 sm:h-64 text-zinc-900" strokeWidth={1} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-inner transition-transform duration-500">
                      <PieChart className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 text-zinc-900">Portfolio Metrics</h3>
                    <p className="text-zinc-500 text-sm sm:text-base font-light mb-10 lg:mb-12">Historical data & active management</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-5 relative z-10">
                    <div className="bg-zinc-50 p-5 sm:p-6 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all">
                      <p className="text-[10px] sm:text-xs font-bold text-zinc-400 tracking-widest uppercase mb-2">AUM</p>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900">133K<span className="text-zinc-400 text-sm sm:text-base ml-1 font-medium">Cr</span></p>
                    </div>
                    <div className="bg-emerald-50 p-5 sm:p-6 rounded-2xl border border-emerald-100/50 hover:bg-emerald-100/50 hover:shadow-md transition-all">
                      <p className="text-[10px] sm:text-xs font-bold text-emerald-600/70 tracking-widest uppercase mb-2">XIRR</p>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-emerald-700">+12%</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Trust/Clients */}
                <div className="absolute -right-12 sm:-right-28 lg:-right-40 top-[35%] lg:top-[40%] bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xl animate-float-delayed z-20 flex items-center gap-4 cursor-default w-max">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-600" strokeWidth={1.5} />
                  </div>
                  <div className="pr-4 sm:pr-6">
                    <p className="text-[9px] sm:text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Trust</p>
                    <p className="text-sm sm:text-base font-medium text-zinc-900">26L+ Clients</p>
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
              <FadeIn key={idx} delay={idx * 200} direction="zoom" className="group text-left bg-white p-8 sm:p-10 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-100/30 transition-all duration-500">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 border border-emerald-100">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-600 font-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Philosophy Section --- */}
      <section id="about" className="py-24 sm:py-32 lg:py-40 bg-white px-6 sm:px-10 lg:px-16 xl:px-24 text-left border-b border-zinc-200">
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
              <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 mb-10 text-lg sm:text-xl font-normal text-zinc-800 leading-relaxed bg-emerald-50/50 rounded-r-xl">
                "The ‘know-nothing’ investor should practice diversification, but it is crazy if you are an expert."
              </blockquote>
            </FadeIn>
            <FadeIn delay={450} direction="left">
              <GeoButton onClick={() => openContactModal('Let\'s Build Wealth')} icon={ArrowRight}>
                Let's Build Wealth
              </GeoButton>
            </FadeIn>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 relative">
            <FadeIn delay={200} direction="zoom" className="space-y-6 sm:pt-12">
              <div className="bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 sm:p-10 transition-all duration-500 group">
                <PieChart className="text-emerald-500 w-8 h-8 mb-6 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Mutual Funds</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Expertly curated schemes for optimal growth.</p>
              </div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 sm:p-10 transition-all duration-500 group">
                <TrendingUp className="text-emerald-500 w-8 h-8 mb-6 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Equity & ETFs</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Direct market participation with strategy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={400} direction="zoom" className="space-y-6">
              <div className="bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 sm:p-10 transition-all duration-500 group">
                <ShieldCheck className="text-emerald-500 w-8 h-8 mb-6 transition-transform" strokeWidth={1.5} />
                <h4 className="font-medium text-xl mb-2 text-zinc-900">Bonds & FD</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">Secure, fixed-income instruments.</p>
              </div>
              <div className="bg-[#18181b] rounded-[2rem] p-8 sm:p-10 text-white flex flex-col justify-center min-h-[200px] shadow-xl shadow-zinc-900/20">
                <h4 className="font-light text-5xl sm:text-6xl mb-2">12%</h4>
                <p className="text-zinc-400 font-bold tracking-widest text-[10px] sm:text-xs uppercase">Historic XIRR</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="bg-emerald-50/30 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 w-full text-left">
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
                <div className="bg-white border border-zinc-200 p-10 sm:p-12 rounded-[2.5rem] transition-all duration-500 h-full flex flex-col">
                  <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-all duration-500">
                    <service.icon className="w-7 h-7 text-[#18181b] transition-colors duration-500" strokeWidth={1.5} />
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
      <section className="py-24 sm:py-32 lg:py-40 bg-zinc-50 text-zinc-900 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left border-y border-zinc-200/50">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <div className="w-full lg:w-1/2">
            <FadeIn direction="left" className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200 text-emerald-600 text-[10px] sm:text-xs font-bold tracking-widest mb-8 shadow-sm">
                <Calculator className="w-4 h-4" strokeWidth={2} /> INTERACTIVE TOOLS
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-6 leading-[1.1]">
                Visualize your <br/><span className="font-medium text-emerald-600">financial trajectory.</span>
              </h2>
              <p className="text-zinc-600 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-10">
                Don't guess your future. Use our advanced SIP, Lumpsum, and Retirement calculators to mathematically map out your path to financial freedom.
              </p>
              <GeoButton onClick={() => { setCurrentPage('tools'); window.scrollTo(0,0); }} icon={ArrowRight}>
                Try Calculators
              </GeoButton>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn delay={300} direction="zoom">
              <div className="bg-white border border-zinc-200 p-8 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 transition-shadow duration-700">
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
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#18181b]">
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
      <section className="bg-emerald-50/30 py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden text-left border-t border-emerald-100/50">
        <div className="w-full max-w-[1800px] mx-auto relative z-10 flex flex-col items-start">
          <FadeIn direction="up" className="flex flex-col items-start max-w-3xl">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 border border-emerald-100 shadow-xl shadow-emerald-100/50">
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
            <GeoButton onClick={() => openContactModal('Start Your Journey')} icon={ArrowRight}>
              Start Your Journey
            </GeoButton>
          </FadeIn>
        </div>
      </section>
    </>
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
            <img src="https://static.wixstatic.com/media/548938_d02490efa777416caf274ba6f2482d6e~mv2.png" alt="Ask Geo" className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS', 'CONTACT'].map((item) => {
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
              className={`text-[10px] xl:text-xs font-bold tracking-widest px-6 py-3 rounded-xl border-2 transition-all flex items-center gap-2 ${currentPage === 'tools' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-zinc-900 border-zinc-900 text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-lg'}`}
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
          {['HOME', 'ABOUT', 'SERVICES', 'INSIGHTS', 'CONTACT'].map((item) => {
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
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        {currentPage === 'insights' && <InsightsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'tools' && <CalculatorsPage setCurrentPage={setCurrentPage} openContactModal={openContactModal} />}
        
        {currentPage === 'legal-privacy' && <LegalPage title="Privacy Policy" />}
        {currentPage === 'legal-terms' && <LegalPage title="Terms of Service" />}
        {currentPage === 'legal-disclosure' && <LegalPage title="Disclosure" />}
        {currentPage === 'legal-regulatory' && <LegalPage title="Regulatory Information" />}
      </main>

      {/* --- Clean Align-Left Footer --- */}
      <footer className="bg-[#09090b] text-[#a1a1aa] pt-24 pb-12 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-zinc-900 text-left">
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 border-b border-zinc-800 pb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 xl:col-span-6">
              <div className="flex items-center gap-3 group cursor-pointer mb-8 w-fit" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
                <img src="https://static.wixstatic.com/media/548938_8a6929f000414ad19da4274d179ec4d1~mv2.png" alt="Ask Geo" className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="text-sm sm:text-base font-light leading-relaxed max-w-sm text-zinc-400">
                A premier financial advisory firm dedicated to building, managing, and preserving wealth through highly customized, data-driven strategies and optimized planning.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 lg:col-start-7">
              <h4 className="text-white font-medium mb-8 text-base">Quick Links</h4>
              <ul className="space-y-5 text-sm sm:text-base font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Home</button></li>
                <li><button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">About Geo</button></li>
                <li><a href="https://ewa.njindiaonline.com/ewa/login" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors text-left block">eWealth Login</a></li>
                <li><a href="https://cdesk.njwealth.in/cdesk/login" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors text-left block">ClientDesk Login</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-medium mb-8 text-base">Legal</h4>
              <ul className="space-y-5 text-sm sm:text-base font-light text-zinc-400 flex flex-col items-start">
                <li><button onClick={() => { setCurrentPage('legal-privacy'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => { setCurrentPage('legal-terms'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => { setCurrentPage('legal-disclosure'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Disclosure</button></li>
                <li><button onClick={() => { setCurrentPage('legal-regulatory'); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left">Regulatory Information</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm font-light text-zinc-500">
            <p>© {new Date().getFullYear()} Ask Geo Financial Services. All rights reserved.</p>
            <div className="flex gap-6">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Pune, Maharashtra</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 99606 24271</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Render Modals at the Root Level */}
      <GeneralContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} title={contactModalTitle} />
    </div>
  );
};

export default AskGeoApp;
