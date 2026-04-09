import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ─── Portfolio Videos ────────────────────────────────────────────────────── */
const PORTFOLIO_VIDEOS = [
  { id: "kc6uuxxwkz", client: "SPLUNK", title: "App Building" },
  { id: "4yygbynwqj", client: "DEEPSEAS", title: "Overview" },
  { id: "yqpykglhv0", client: "BACKBLAZE", title: "B2B Brand Explainer" },
  { id: "n3q5yhztjo", client: "OKTA", title: "Highly Regulated Identity" },
  { id: "tv6edcxd5i", client: "EARLY WARNING", title: "Check Fraud" },
  { id: "jxxmiu2fs1", client: "NATIONAL CRYPTOCURRENCY ASSOCIATION", title: "Crypto Safety" },
];

/* ─── Client Logos ────────────────────────────────────────────────────────── */
const CLIENT_LOGOS = [
  { name: "SPLUNK", src: "/logos/splunk-logo.svg" },
  { name: "OKTA", src: "/logos/okta-logo.svg" },
  { name: "BACKBLAZE", src: "/logos/backblaze.svg" },
  { name: "EARLY WARNING", src: "/logos/epipheo-orange.svg" },
  { name: "DEEPSEAS", src: "/logos/epipheo-orange.svg" },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Wistia Video Component ──────────────────────────────────────────────── */
function WistiaVideo({ id }: { id: string }) {
  useEffect(() => {
    // Load Wistia scripts once per video
    const jsonpSrc = `https://fast.wistia.com/embed/medias/${id}.jsonp`;
    if (!document.querySelector(`script[src="${jsonpSrc}"]`)) {
      const s1 = document.createElement("script");
      s1.src = jsonpSrc;
      s1.async = true;
      document.head.appendChild(s1);
    }
    const evSrc = "https://fast.wistia.com/assets/external/E-v1.js";
    if (!document.querySelector(`script[src="${evSrc}"]`)) {
      const s2 = document.createElement("script");
      s2.src = evSrc;
      s2.async = true;
      document.head.appendChild(s2);
    }
  }, [id]);

  return (
    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
      <div
        style={{
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <div
          className={`wistia_embed wistia_async_${id} seo=true videoFoam=true`}
          style={{ height: "100%", position: "relative", width: "100%" }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
}

/* ─── HubSpot Form + Budget Dropdown ─────────────────────────────────────── */
function QuoteForm() {
  useEffect(() => {
    const src = "//js.hsforms.net/forms/embed/v2.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.onload = () => {
        if ((window as any).hbspt) {
          (window as any).hbspt.forms.create({
            region: "na1",
            portalId: "20864859",
            formId: "348b82c1-f306-4caa-9c13-9f8c6b1ec0ff",
            target: "#hs-form-target",
          });
        }
      };
      document.body.appendChild(script);
    } else if ((window as any).hbspt) {
      (window as any).hbspt.forms.create({
        region: "na1",
        portalId: "20864859",
        formId: "348b82c1-f306-4caa-9c13-9f8c6b1ec0ff",
        target: "#hs-form-target",
      });
    }
  }, []);

  return (
    <div>
      {/* Standalone budget dropdown — not part of HubSpot form */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="budget-range"
          style={{
            display: "block",
            marginBottom: "8px",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
            fontSize: "13px",
            color: "#1A1A1A",
          }}
        >
          Estimated Budget
        </label>
        <select
          id="budget-range"
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #E0E0E0",
            borderRadius: "4px",
            background: "#F9F9F9",
            color: "#1A1A1A",
            fontFamily: "'Barlow', sans-serif",
            fontSize: "16px",
            appearance: "auto" as const,
          }}
        >
          <option value="">Select a range...</option>
          <option value="under-10k">Under $10,000</option>
          <option value="10k-25k">$10,000 – $25,000</option>
          <option value="25k-50k">$25,000 – $50,000</option>
          <option value="50k-100k">$50,000 – $100,000</option>
          <option value="100k-plus">$100,000+</option>
        </select>
      </div>

      {/* HubSpot form */}
      <div id="hs-form-target" className="hs-form-container" />
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function EnterpriseExplainer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Enterprise Explainer Videos | Epipheo";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Epipheo crafts premium animated explainer videos for enterprise B2B brands. Turn complex solutions into clear, compelling stories that drive decisions."
      );
    }
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>

      {/* ── NAV (Minimal: Logo + CTA only) ─────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#111111]/95 backdrop-blur-md py-4" : "bg-[#1A1A1A]/80 backdrop-blur-sm py-6"
        }`}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <a href="https://epipheo.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/logos/epipheo-white-cropped.png"
              alt="Epipheo"
              className="h-8 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>
          <button
            onClick={() => scrollToId("get-a-quote")}
            className="bg-[#FF5F3C] text-white px-6 py-2.5 rounded-full font-bold tracking-widest uppercase hover:bg-[#ff7a5c] transition-all text-[13px]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Get a Quote
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden bg-[#1A1A1A]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn>
              <h1
                className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8 uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Complex Solutions<br />
                Deserve Clear<br />
                Explanations
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                We explain the complex so your buyers can confidently say yes. Premium animated explainer videos for enterprise B2B solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollToId("our-work")}
                  className="bg-[#FF5F3C] text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#ff7a5c] transition-all"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  See Our Work
                </button>
                <button
                  onClick={() => scrollToId("get-a-quote")}
                  className="border-2 border-white text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Get a Custom Quote
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Hero Wistia Video */}
          <FadeIn delay={0.2} className="max-w-4xl mx-auto">
            <WistiaVideo id="l8418oscmu" />
          </FadeIn>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────── */}
      <section className="bg-[#F0F0F0] py-20 px-8 text-[#1A1A1A]">
        <div className="container mx-auto text-center">
          <h2
            className="text-2xl font-bold tracking-widest uppercase mb-14"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Trusted by the World's Most Iconic Brands
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-20">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="bg-white px-8 py-6 rounded shadow-sm flex items-center justify-center min-w-[120px] h-20"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    maxHeight: "40px",
                    maxWidth: "100%",
                    filter: "grayscale(100%) brightness(2)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { num: "6,000+", label: "Videos Delivered" },
              { num: "15+", label: "Years Experience" },
              { num: "50+", label: "Fortune 500 Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-5xl font-bold text-[#FF5F3C] mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-sm font-bold tracking-widest uppercase text-[#1A1A1A]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ─────────────────────────────────────────── */}
      <section className="bg-white py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <FadeIn>
            <div
              className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              The Problem
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase mb-8"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Your Product is Powerful. But if prospects don't understand it, they won't buy it.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stop losing deals to confusion. In enterprise B2B, complexity is the enemy of conversion.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div
              className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              The Solution
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase mb-8"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              We explain the complex so your buyers can confidently say yes.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Epipheo crafts strategic storytelling that turns complexity into clarity for decision-makers.
            </p>
            <div className="bg-[#F0F0F0] p-8 border-l-4 border-[#FF5F3C]">
              <h4
                className="font-bold uppercase tracking-widest mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                The Epipheo Difference
              </h4>
              <p className="text-gray-600">
                Strategic narrative and animation that speak directly to enterprise buyers.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── METHODOLOGY ────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-32 px-8">
        <div className="container mx-auto">
          <FadeIn>
            <div
              className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Our Methodology
            </div>
            <h2
              className="text-5xl font-bold uppercase mb-20"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              The Epipheo Way
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {[
              {
                num: "01",
                title: "Discovery",
                text: 'We dive deep into your complex solution to find the core epiphany. Our strategists interview your team to understand the "why" behind your product.',
              },
              {
                num: "02",
                title: "Script",
                text: "Crafting a narrative that resonates with enterprise decision-makers. We translate technical jargon into a persuasive, human-centric story.",
              },
              {
                num: "03",
                title: "Production",
                text: "High-fidelity animation (2D, 3D, or Motion Graphics) that matches your brand. Every frame is designed to maintain engagement and clarity.",
              },
              {
                num: "04",
                title: "Launch",
                text: "Delivering a strategic asset that drives results. We provide the final video in multiple formats optimized for your specific sales funnel.",
              },
            ].map((step, i) => (
              <FadeIn
                key={step.num}
                delay={i * 0.1}
                className={`p-10 border-white/10 ${
                  i < 3 ? "lg:border-r" : ""
                } ${i === 0 ? "md:border-r" : ""} ${i === 2 ? "md:border-r" : ""}`}
              >
                <div
                  className="text-6xl font-bold text-[#FF5F3C] mb-6"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-2xl font-bold uppercase mb-6 tracking-widest"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{step.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ──────────────────────────────────────────────────── */}
      <section id="our-work" className="bg-white py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2
                className="text-5xl font-bold uppercase mb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                See the Epiphany in Action
              </h2>
              <p className="text-gray-500">
                Strategic storytelling for the world's most complex brands.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            {PORTFOLIO_VIDEOS.map((video, i) => (
              <FadeIn key={video.id} delay={i * 0.05}>
                <div>
                  <WistiaVideo id={video.id} />
                  <div className="mt-4">
                    <p
                      className="text-[#FF5F3C] text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {video.client}
                    </p>
                    <h4
                      className="font-bold uppercase tracking-widest text-base"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {video.title}
                    </h4>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ─────────────────────────────────────────────────── */}
      <section id="get-a-quote" className="bg-[#F0F0F0] py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2
                className="text-5xl font-bold uppercase mb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Get Your Custom Quote
              </h2>
              <p className="text-gray-500">
                Ready to clarify your message? Fill out the form below and our team will be in touch.
              </p>
            </div>
          </FadeIn>
          <div className="bg-white p-10 md:p-14 rounded shadow-xl">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] pt-24 pb-12 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand */}
            <div>
              <a href="https://epipheo.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logos/epipheo-white-cropped.png"
                  alt="Epipheo"
                  className="h-10 w-auto mb-8"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
              <div className="text-gray-400 space-y-2 mb-8 text-sm">
                <p>888.687.7620</p>
                <p>hello@epipheo.com</p>
                <p>Cincinnati, OH</p>
              </div>
              <div className="flex gap-5">
                <a
                  href="https://www.facebook.com/epipheo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF5F3C] transition-colors text-sm"
                >
                  FB
                </a>
                <a
                  href="https://twitter.com/epipheo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF5F3C] transition-colors text-sm"
                >
                  TW
                </a>
                <a
                  href="https://www.linkedin.com/company/epipheo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF5F3C] transition-colors text-sm"
                >
                  LI
                </a>
                <a
                  href="https://www.instagram.com/epipheo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF5F3C] transition-colors text-sm"
                >
                  IG
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h5
                className="font-bold uppercase tracking-widest text-[#FF5F3C] mb-8 text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Services
              </h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {[
                  ["Explainer Videos", "https://epipheo.com/services/explainer-videos/"],
                  ["3D Explainer Videos", "https://epipheo.com/services/3d-explainer-videos/"],
                  ["Testimonial Videos", "https://epipheo.com/services/testimonial-videos/"],
                  ["Educational Videos", "https://epipheo.com/services/educational-videos/"],
                  ["Trade Show Videos", "https://epipheo.com/services/trade-show-videos/"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5
                className="font-bold uppercase tracking-widest text-[#FF5F3C] mb-8 text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Company
              </h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {[
                  ["About Us", "https://epipheo.com/about/"],
                  ["Portfolio", "https://epipheo.com/portfolio/"],
                  ["Careers", "https://epipheo.com/careers/"],
                  ["Contact", "https://epipheo.com/contact/"],
                  ["Blog", "https://epipheo.com/blog/"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h5
                className="font-bold uppercase tracking-widest text-[#FF5F3C] mb-8 text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Industries
              </h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {[
                  ["B2B Software", "https://epipheo.com/industries/b2b-software/"],
                  ["Healthcare", "https://epipheo.com/industries/healthcare/"],
                  ["Finance", "https://epipheo.com/industries/finance/"],
                  ["Non-Profit", "https://epipheo.com/industries/non-profit/"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 uppercase tracking-widest">
            <p>© 2026 Epipheo. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a
                href="https://epipheo.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://epipheo.com/terms-of-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
