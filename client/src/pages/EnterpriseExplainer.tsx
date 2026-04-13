import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ─── Portfolio Videos ────────────────────────────────────────────────────── */
const PORTFOLIO_VIDEOS = [
  { id: "kc6uuxxwkz", client: "SPLUNK", title: "App Building" },
  { id: "n3q5yhztjo", client: "OKTA", title: "Highly Regulated Identity" },
  { id: "yqpykglhv0", client: "BACKBLAZE", title: "B2B Brand Explainer" },
  { id: "4yygbynwqj", client: "DEEPSEAS", title: "Cybersecurity Overview" },
  { id: "tv6edcxd5i", client: "EARLY WARNING", title: "Check Fraud" },
  { id: "jxxmiu2fs1", client: "NATIONAL CRYPTOCURRENCY ASSOCIATION", title: "Crypto Safety" },
];

/* ─── Client Logos ────────────────────────────────────────────────────────── */
const CLIENT_LOGOS = [
  { name: "Google", src: "/logos/google.png", invert: false },
  { name: "Amazon", src: "/logos/amazon.png", invert: false },
  { name: "P&G", src: "/logos/pg.png", invert: false },
  { name: "Deloitte", src: "/logos/deloitte.png", invert: false },
  { name: "Splunk", src: "/logos/splunk.png", invert: true },
  { name: "Okta", src: "/logos/okta.png", invert: true },
];

/* ─── Testimonials ────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "We came to them with a monumental ask and they really delivered. They quadrupled our social media impressions, doubled requests for video content, and significantly increased web traffic.",
    name: "Marketing Manager",
    title: "Illumio (Cybersecurity)",
    rating: 5.0,
  },
  {
    quote:
      "They were transparent about the challenges and took ownership in a way that always showed integrity. Their videos received over 50 million impressions — our most successful content ever.",
    name: "Andrew Allen",
    title: "VP of Marketing, Crossover",
    rating: 5.0,
  },
  {
    quote:
      "They are creative, efficient, collaborative, great listeners, and were very responsive to our communications. Epipheo's dedication to our satisfaction was evident in every deliverable.",
    name: "Joan Giovanni",
    title: "Senior Director, BBB Institute for Marketplace Trust",
    rating: 5.0,
  },
];

/* ─── FAQ Items ───────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "How much does an enterprise explainer video cost?",
    a: "Most enterprise projects range from $15,000 to $100,000+, depending on length, style (2D, 3D, live action), and complexity. We\u2019ll scope your project during a free consultation and provide a transparent quote \u2014 no surprises.",
  },
  {
    q: "How long does production take?",
    a: "A typical explainer video takes 6\u201310 weeks from kickoff to final delivery. Rush timelines are available. We\u2019ve delivered hundreds of videos on tight enterprise deadlines \u2014 including conference launches and product rollouts.",
  },
  {
    q: "What if I don\u2019t like the creative direction?",
    a: "You\u2019ll see the concept before a single frame is animated. Our process includes a detailed script review and storyboard approval stage so you can course-correct early \u2014 before production begins.",
  },
  {
    q: "How many revisions are included?",
    a: "Every project includes multiple rounds of revisions at each stage \u2014 script, storyboard, and animation. We don\u2019t nickel-and-dime you. Our goal is a video you\u2019re proud to put your name on.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Just your time for a 30-minute discovery call. We\u2019ll ask smart questions about your product, audience, and goals. From there, we handle everything \u2014 script, design, animation, voiceover, and music.",
  },
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

/* ─── Star Rating Component ──────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.4;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={
            i < full
              ? "#FF5F3C"
              : i === full && half
                ? "url(#half)"
                : "#444"
          }
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FF5F3C" />
              <stop offset="50%" stopColor="#444" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Testimonial Card Component ─────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
}) {
  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto px-8 py-16 md:py-20 text-white">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <StarRating rating={testimonial.rating} />
          </div>
          <svg
            className="w-10 h-10 mb-6 text-[#FF5F3C]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
          </svg>
          <blockquote
            className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 max-w-3xl text-gray-200"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div>
            <p
              className="font-bold uppercase tracking-widest text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {testimonial.name}
            </p>
            <p className="text-sm mt-1 text-gray-400">{testimonial.title}</p>
          </div>
          <a
            href="https://clutch.co/profile/epipheo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs tracking-widest uppercase text-gray-500 hover:text-gray-300 transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Verified on Clutch
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── FAQ Accordion Item ─────────────────────────────────────────────────── */
function FaqItem({ item }: { item: (typeof FAQ_ITEMS)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3
          className="text-lg md:text-xl font-bold uppercase tracking-wide pr-8 group-hover:text-[#FF5F3C] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {item.q}
        </h3>
        <span
          className={`text-[#FF5F3C] text-2xl font-bold flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="text-gray-400 leading-relaxed pb-6 pr-12">{item.a}</p>
      </div>
    </div>
  );
}

/* ─── Wistia Video Component ──────────────────────────────────────────────── */
function WistiaVideo({ id }: { id: string }) {
  useEffect(() => {
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
      {/* Budget dropdown — above HubSpot form */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="budget-range"
          className="block mb-2 text-xs font-bold uppercase tracking-widest text-gray-300"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Estimated Budget
        </label>
        <select
          id="budget-range"
          className="w-full px-4 py-3 rounded bg-[#2A2A2A] border border-white/20 text-white text-base focus:outline-none focus:border-[#FF5F3C] transition-colors"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <option value="">Select a range...</option>
          <option value="10k-25k">$10,000 – $25,000</option>
          <option value="25k-50k">$25,000 – $50,000</option>
          <option value="50k-100k">$50,000 – $100,000</option>
          <option value="100k-plus">$100,000+</option>
        </select>
      </div>

      {/* HubSpot form */}
      <div id="hs-form-target" />

      {/* Style overrides for HubSpot form on dark background */}
      <style>{`
        #hs-form-target .hs-form-field label {
          color: #D1D5DB !important;
          font-family: 'Oswald', sans-serif !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 12px !important;
        }
        #hs-form-target .hs-input {
          background: #2A2A2A !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          color: #fff !important;
          border-radius: 4px !important;
          padding: 12px 16px !important;
          font-family: 'Barlow', sans-serif !important;
          font-size: 16px !important;
          width: 100% !important;
        }
        #hs-form-target .hs-input:focus {
          border-color: #FF5F3C !important;
          outline: none !important;
        }
        #hs-form-target .hs-input::placeholder {
          color: #6B7280 !important;
        }
        #hs-form-target textarea.hs-input {
          min-height: 100px !important;
        }
        #hs-form-target .hs-submit .hs-button {
          background: #FF5F3C !important;
          color: #fff !important;
          border: none !important;
          border-radius: 9999px !important;
          padding: 14px 40px !important;
          font-family: 'Oswald', sans-serif !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          font-size: 14px !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
          width: 100% !important;
        }
        #hs-form-target .hs-submit .hs-button:hover {
          background: #ff7a5c !important;
        }
        #hs-form-target .hs-error-msgs label {
          color: #FF5F3C !important;
          font-size: 12px !important;
        }
        #hs-form-target .hs-form-field {
          margin-bottom: 16px !important;
        }
        #hs-form-target .legal-consent-container .hs-form-booleancheckbox-display > span {
          color: #9CA3AF !important;
          font-size: 12px !important;
        }
        #hs-form-target .legal-consent-container a {
          color: #FF5F3C !important;
        }
        #hs-form-target .submitted-message {
          color: #fff !important;
          font-family: 'Barlow', sans-serif !important;
        }
        #hs-form-target .hs-richtext p {
          color: #9CA3AF !important;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function EnterpriseExplainer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "Enterprise Explainer Videos | Epipheo";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Epipheo crafts premium animated explainer videos for enterprise B2B brands. Turn complex solutions into clear, compelling stories that drive decisions.",
      );
    }
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#1A1A1A] text-white"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ── NAV ────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111111]/95 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <a
            href="https://epipheo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logos/epipheo-white-cropped.png"
              alt="Epipheo"
              className="h-10 w-auto"
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

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-8 overflow-hidden bg-[#1A1A1A]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h1
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-8 uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Complex Solutions
                <br />
                Deserve Clear
                <br />
                <span className="text-[#FF5F3C]">Explanations</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                We explain the complex so your buyers can confidently say yes.
                Premium animated explainer videos for enterprise B2B solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToId("get-a-quote")}
                  className="bg-[#FF5F3C] text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#ff7a5c] transition-all"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => scrollToId("our-work")}
                  className="border-2 border-white text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  See Our Work
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <WistiaVideo id="l8418oscmu" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF (Upgraded Logos) ───────────────────────────────── */}
      <section className="bg-[#111111] py-16 px-8 border-t border-b border-white/5">
        <div className="container mx-auto text-center">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-10 text-gray-500"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Trusted by the World&rsquo;s Most Iconic Brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center"
                style={{ height: "44px" }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="transition-opacity duration-300 hover:opacity-90"
                  style={{
                    maxHeight: "38px",
                    maxWidth: "130px",
                    objectFit: "contain",
                    opacity: 0.5,
                    filter: logo.invert
                      ? "brightness(0) invert(1) grayscale(100%)"
                      : "grayscale(100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-16 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
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
                  className="text-sm font-bold tracking-widest uppercase text-gray-400"
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
              Your Product is Powerful. But if prospects don&rsquo;t understand
              it, they won&rsquo;t buy it.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stop losing deals to confusion. In enterprise B2B, complexity is
              the enemy of conversion. Your sales team is spending hours
              explaining what a 90-second video could make crystal clear.
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
              Epipheo crafts strategic storytelling that turns complexity into
              clarity for decision-makers. We find the core epiphany in your
              solution and make it impossible to misunderstand.
            </p>
            <div className="bg-[#F0F0F0] p-8 border-l-4 border-[#FF5F3C]">
              <h4
                className="font-bold uppercase tracking-widest mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                The Epipheo Difference
              </h4>
              <p className="text-gray-600">
                Strategic narrative and animation that speak directly to
                enterprise buyers &mdash; not just pretty pictures, but stories
                that drive decisions.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIAL #1 ─────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] border-t border-b border-white/5">
        <TestimonialCard testimonial={TESTIMONIALS[0]} />
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
                className={`p-10 ${i < 3 ? "lg:border-r border-white/10" : ""}`}
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

      {/* ── WHY EPIPHEO (3 Pillars) ────────────────────────────────────── */}
      <section className="bg-white py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <div
                className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Why Epipheo
              </div>
              <h2
                className="text-5xl font-bold uppercase mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Not Just a Video Vendor.
                <br />
                <span className="text-[#FF5F3C]">A Strategic Partner.</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                There are thousands of video production companies. Here&rsquo;s
                why the world&rsquo;s biggest brands choose Epipheo.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#FF5F3C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                title: "Epiphany",
                desc: "We don\u2019t just make videos that look good \u2014 we tell stories that create epiphanies. Your audience doesn\u2019t just watch. They actually get it. That\u2019s the difference between a video and a strategic asset.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#FF5F3C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                ),
                title: "Guidance",
                desc: "2D, 3D, live action, social cuts, long form \u2014 whatever you need, we can produce it. Full breadth of capability under one roof. No need to manage multiple vendors or agencies.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#FF5F3C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
                title: "Expertise",
                desc: "15+ years, 6,000+ videos, Fortune 500 clients. We deliver on time, on budget, and we know how to navigate enterprise bureaucracies. Procurement, legal, brand \u2014 we\u2019ve seen it all.",
              },
            ].map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.1}>
                <div className="bg-[#F0F0F0] p-10 rounded-lg h-full">
                  <div className="mb-6">{pillar.icon}</div>
                  <h3
                    className="text-2xl font-bold uppercase tracking-widest mb-4"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL #2 ─────────────────────────────────────────────── */}
      <section className="bg-[#111111]">
        <TestimonialCard testimonial={TESTIMONIALS[1]} />
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
                Strategic storytelling for the world&rsquo;s most complex
                brands.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            {PORTFOLIO_VIDEOS.map((video, i) => (
              <FadeIn key={video.id} delay={i * 0.05}>
                <div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <WistiaVideo id={video.id} />
                  </div>
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

      {/* ── MID-PAGE CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#FF5F3C] py-20 px-8">
        <div className="container mx-auto text-center">
          <FadeIn>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase mb-6 text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Ready to Clarify Your Message?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Get a free consultation and custom quote. No pressure, no
              obligation &mdash; just a conversation about how to make your
              complex solution impossible to misunderstand.
            </p>
            <button
              onClick={() => scrollToId("get-a-quote")}
              className="bg-white text-[#1A1A1A] px-12 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-gray-100 transition-all text-base"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Get Your Custom Quote
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ / OBJECTION HANDLING ───────────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-32 px-8">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <div
              className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Common Questions
            </div>
            <h2
              className="text-5xl font-bold uppercase mb-16"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Before You Ask
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={i} item={item} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIAL #3 ─────────────────────────────────────────────── */}
      <section className="bg-[#111111]">
        <TestimonialCard testimonial={TESTIMONIALS[2]} />
      </section>

      {/* ── CLUTCH RATING + WHAT TO EXPECT ─────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-20 px-8 border-b border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Clutch Rating */}
            <FadeIn>
              <div className="text-center md:text-left">
                <a
                  href="https://clutch.co/profile/epipheo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group"
                >
                  <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                    <span
                      className="text-5xl font-bold text-white"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      4.9
                    </span>
                    <div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#FF5F3C"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        26 verified reviews
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-gray-500 text-xs tracking-widest uppercase group-hover:text-gray-300 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Rated on Clutch.co &rarr;
                  </p>
                </a>
              </div>
            </FadeIn>

            {/* What to Expect */}
            <FadeIn delay={0.15}>
              <div>
                <h3
                  className="text-xl font-bold uppercase tracking-widest mb-6"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  What Happens After You Submit
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      text: "A producer reviews your request within 1 business day",
                    },
                    {
                      step: "2",
                      text: "We schedule a 30-minute discovery call (no pitch, just questions)",
                    },
                    {
                      step: "3",
                      text: "You receive a custom proposal with timeline, cost, and creative approach",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <span
                        className="text-[#FF5F3C] font-bold text-lg flex-shrink-0 w-7"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {item.step}.
                      </span>
                      <p className="text-gray-400">{item.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mt-6 italic">
                  No spam. No sales pressure. Just a straightforward
                  conversation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ─────────────────────────────────────────────────── */}
      <section id="get-a-quote" className="bg-[#1A1A1A] py-32 px-8">
        <div className="container mx-auto max-w-2xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2
                className="text-5xl font-bold uppercase mb-4"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Get Your Custom{" "}
                <span className="text-[#FF5F3C]">Quote</span>
              </h2>
              <p className="text-gray-400">
                Ready to clarify your message? Fill out the form below and our
                team will be in touch within one business day.
              </p>
            </div>
          </FadeIn>
          <div className="bg-[#222222] p-10 md:p-14 rounded-lg border border-white/10">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] pt-24 pb-12 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <a
                href="https://epipheo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/epipheo-white-cropped.png"
                  alt="Epipheo"
                  className="h-10 w-auto mb-8"
                />
              </a>
              <div className="text-gray-400 space-y-2 mb-8 text-sm">
                <p>888.687.7620</p>
                <p>Cincinnati, OH</p>
              </div>
              <div className="flex gap-5">
                {[
                  {
                    label: "FB",
                    href: "https://www.facebook.com/epipheo",
                  },
                  { label: "TW", href: "https://twitter.com/epipheo" },
                  {
                    label: "LI",
                    href: "https://www.linkedin.com/company/epipheo",
                  },
                  {
                    label: "IG",
                    href: "https://www.instagram.com/epipheo",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FF5F3C] transition-colors text-sm"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5
                className="font-bold uppercase tracking-widest text-[#FF5F3C] mb-8 text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Services
              </h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {[
                  [
                    "Explainer Videos",
                    "https://epipheo.com/services/premium-explainer-video/",
                  ],
                  [
                    "3D Explainer Videos",
                    "https://epipheo.com/services/3d-explainer-video/",
                  ],
                  [
                    "Testimonial Videos",
                    "https://epipheo.com/services/storytelling-testimonial-video/",
                  ],
                  [
                    "Educational Videos",
                    "https://epipheo.com/services/educational-video-series/",
                  ],
                  [
                    "Trade Show Videos",
                    "https://epipheo.com/services/trade-show-video/",
                  ],
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
                  ["Portfolio", "https://epipheo.com/epipheo-portfolio/"],
                  ["Careers", "https://epipheo.com/careers/"],
                  ["Blog", "https://epipheo.com/learn/"],
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

            <div>
              <h5
                className="font-bold uppercase tracking-widest text-[#FF5F3C] mb-8 text-sm"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Industries
              </h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {[
                  ["B2B", "https://epipheo.com/b2b/"],
                  ["B2C", "https://epipheo.com/b2c/"],
                  ["Non-Profit", "https://epipheo.com/non-profit/"],
                  ["All Industries", "https://epipheo.com/industry/"],
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
            <p>&copy; 2026 Epipheo. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
