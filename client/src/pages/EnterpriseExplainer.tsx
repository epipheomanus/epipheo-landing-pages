import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ─── Constants ───────────────────────────────────────────────────────────── */
const ACCENT = "#FF5F3C";
const DARK = "#1A1A1A";
const DARK_DEEPER = "#111111";
const DARK_CARD = "#222222";
const WHITE = "#FFFFFF";
const WHITE_60 = "rgba(255,255,255,0.6)";
const WHITE_40 = "rgba(255,255,255,0.4)";
const WHITE_08 = "rgba(255,255,255,0.08)";

const LOGO_URL = "https://www.epipheo.com/wp-content/uploads/2023/06/Epipheo_Logo_White.svg";

const VIDEOS = [
  { id: "kc6uuxxwkz", client: "Splunk", title: "App Building" },
  { id: "4yygbynwqj", client: "DeepSeas", title: "Overview" },
  { id: "yqpykglhv0", client: "Backblaze", title: "B2B Brand Explainer" },
  { id: "n3q5yhztjo", client: "Okta", title: "Highly Regulated Identity" },
  { id: "tv6edcxd5i", client: "Early Warning", title: "Check Fraud" },
  { id: "jxxmiu2fs1", client: "National Cryptocurrency Association", title: "Crypto Safety" },
];

const CLIENTS = ["Splunk", "DeepSeas", "Backblaze", "Okta", "Early Warning"];

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dig into your product, audience, and goals. We ask the hard questions so the video answers the right ones.",
  },
  {
    num: "02",
    title: "Script",
    desc: "Our writers distill complexity into a clear, compelling narrative — the strategic backbone of every great explainer.",
  },
  {
    num: "03",
    title: "Production",
    desc: "Design, animation, voiceover, sound — our team brings the script to life with craft and precision.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Final delivery optimized for every channel. We make sure your video works as hard as you do.",
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function FadeIn({
  children,
  className,
  delay = 0,
  style: extraStyle,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Wistia Video Card ───────────────────────────────────────────────────── */
function WistiaVideo({ id, client, title }: { id: string; client: string; title: string }) {
  return (
    <div style={{ background: DARK_CARD, borderRadius: 8, overflow: "hidden" }}>
      <div
        className="wistia_responsive_padding"
        style={{ padding: "56.25% 0 0 0", position: "relative" }}
      >
        <div
          className="wistia_responsive_wrapper"
          style={{ height: "100%", left: 0, position: "absolute", top: 0, width: "100%" }}
        >
          <div
            className={`wistia_embed wistia_async_${id} seo=true videoFoam=true`}
            style={{ height: "100%", position: "relative", width: "100%" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: ACCENT,
            margin: 0,
          }}
        >
          {client}
        </p>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: WHITE,
            margin: "4px 0 0",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

/* ─── HubSpot Form ────────────────────────────────────────────────────────── */
function HubSpotForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    function tryCreate() {
      if ((window as any).hbspt?.forms?.create && containerRef.current) {
        // Clear any previous form
        containerRef.current.innerHTML = "";
        (window as any).hbspt.forms.create({
          portalId: "20864859",
          formId: "348b82c1-f306-4caa-9c13-9f8c6b1ec0ff",
          region: "na1",
          target: containerRef.current,
        });
        setLoaded(true);
      }
    }

    // Try immediately
    tryCreate();

    // Retry every 500ms for up to 10s
    const interval = setInterval(tryCreate, 500);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loaded]);

  return <div ref={containerRef} className="hs-form-container" />;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE COMPONENT                                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function EnterpriseExplainer() {
  const [scrolled, setScrolled] = useState(false);

  // SEO meta tags for this page
  useEffect(() => {
    document.title = "Enterprise Explainer Videos | Epipheo";
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", "Premium B2B explainer videos for enterprise teams. Epipheo turns complex solutions into compelling stories that drive sales. See our work and get a custom quote.");
    setMeta("property", "og:title", "Enterprise Explainer Videos | Epipheo");
    setMeta("property", "og:description", "Premium B2B explainer videos for enterprise teams. Epipheo turns complex solutions into compelling stories that drive sales.");
    setMeta("property", "og:url", "https://go.epipheo.com/enterprise-explainer");
    setMeta("name", "robots", "index, follow");
  }, []);

  useEffect(() => {
    // Load Wistia embed scripts once
    if (!document.querySelector('script[src*="fast.wistia.com/assets/external/E-v1.js"]')) {
      const s = document.createElement("script");
      s.src = "https://fast.wistia.com/assets/external/E-v1.js";
      s.async = true;
      document.head.appendChild(s);
    }
    VIDEOS.forEach((v) => {
      const scriptId = `wistia-${v.id}`;
      if (!document.getElementById(scriptId)) {
        const s = document.createElement("script");
        s.id = scriptId;
        s.src = `https://fast.wistia.com/embed/medias/${v.id}.jsonp`;
        s.async = true;
        document.head.appendChild(s);
      }
    });

    // Scroll listener for nav
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: DARK, color: WHITE, fontFamily: "'Barlow', sans-serif" }}>
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(17,17,17,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${WHITE_08}` : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="https://www.epipheo.com" target="_blank" rel="noopener noreferrer">
            <img src={LOGO_URL} alt="Epipheo" style={{ height: 28, width: "auto" }} />
          </a>
          <button
            onClick={() => scrollTo("get-a-quote")}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              background: ACCENT,
              color: WHITE,
              border: "none",
              borderRadius: 999,
              padding: "10px 28px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-1px)";
              (e.target as HTMLElement).style.boxShadow = `0 8px 24px rgba(255,95,60,0.4)`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          >
            Get a Quote
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${DARK_DEEPER} 0%, ${DARK} 50%, #1f1410 100%)`,
        }}
      >
        {/* Subtle geometric pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `radial-gradient(circle at 20% 50%, ${ACCENT} 1px, transparent 1px), radial-gradient(circle at 80% 20%, ${ACCENT} 1px, transparent 1px), radial-gradient(circle at 60% 80%, ${ACCENT} 1px, transparent 1px)`,
            backgroundSize: "120px 120px, 80px 80px, 160px 160px",
          }}
        />
        {/* Gradient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,95,60,0.08) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, padding: "120px 24px 80px" }}>
          <FadeIn>
            <h1
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 6vw, 64px)",
                lineHeight: 1.1,
                textTransform: "uppercase" as const,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Your Product Is Powerful.
              <br />
              <span style={{ color: ACCENT }}>Let Us Make It Clear.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              style={{
                fontSize: "clamp(17px, 2.2vw, 21px)",
                lineHeight: 1.6,
                color: WHITE_60,
                maxWidth: 600,
                margin: "24px auto 0",
              }}
            >
              Enterprise explainer videos that turn complex solutions into compelling stories.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("portfolio")}
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  background: ACCENT,
                  color: WHITE,
                  border: "none",
                  borderRadius: 999,
                  padding: "14px 36px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = "translateY(-2px)";
                  (e.target as HTMLElement).style.boxShadow = `0 8px 24px rgba(255,95,60,0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                  (e.target as HTMLElement).style.boxShadow = "none";
                }}
              >
                See Our Work
              </button>
              <button
                onClick={() => scrollTo("get-a-quote")}
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  background: "transparent",
                  color: WHITE,
                  border: `2px solid ${WHITE_40}`,
                  borderRadius: 999,
                  padding: "12px 36px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = ACCENT;
                  (e.target as HTMLElement).style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = WHITE_40;
                  (e.target as HTMLElement).style.color = WHITE;
                }}
              >
                Get a Custom Quote
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SOCIAL PROOF / CLIENT LOGOS ─────────────────────────────────── */}
      <section style={{ background: DARK_DEEPER, borderTop: `1px solid ${WHITE_08}`, borderBottom: `1px solid ${WHITE_08}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: WHITE_40,
              margin: "0 0 32px",
            }}
          >
            Trusted by innovative companies worldwide
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)",
              flexWrap: "wrap",
            }}
          >
            {CLIENTS.map((name) => (
              <span
                key={name}
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(16px, 2vw, 22px)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ─────────────────────────────────────────── */}
      <section style={{ background: DARK }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 44px)",
                textTransform: "uppercase" as const,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Complex Solutions Deserve{" "}
              <span style={{ color: ACCENT }}>Clear Explanations</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              style={{
                fontSize: "clamp(16px, 1.8vw, 19px)",
                lineHeight: 1.75,
                color: WHITE_60,
                marginTop: 28,
              }}
            >
              Your product does something incredible — but if your buyers can't grasp it in 90 seconds,
              you're losing deals to simpler competitors. That's the gap we close. Epipheo has spent over
              a decade turning complex B2B solutions into stories that click. We don't just make things
              pretty — we make them understood. And when people understand, they buy.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              style={{
                fontSize: "clamp(16px, 1.8vw, 19px)",
                lineHeight: 1.75,
                color: WHITE_60,
                marginTop: 20,
              }}
            >
              From cybersecurity platforms to fintech infrastructure, we've helped enterprise teams
              bridge the gap between what they build and what their audience needs to hear.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── PORTFOLIO ──────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ background: DARK_DEEPER }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 44px)",
                textTransform: "uppercase" as const,
                textAlign: "center",
                margin: "0 0 56px",
              }}
            >
              Our Work <span style={{ color: ACCENT }}>Speaks for Itself</span>
            </h2>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: 24,
            }}
          >
            {VIDEOS.map((v, i) => (
              <FadeIn key={v.id} delay={i * 0.1}>
                <WistiaVideo {...v} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────── */}
      <section style={{ background: DARK }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 24px" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 44px)",
                textTransform: "uppercase" as const,
                textAlign: "center",
                margin: "0 0 64px",
              }}
            >
              How We <span style={{ color: ACCENT }}>Work</span>
            </h2>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 32,
            }}
          >
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div
                  style={{
                    background: DARK_CARD,
                    borderRadius: 8,
                    padding: "36px 28px",
                    borderTop: `3px solid ${ACCENT}`,
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      fontSize: 40,
                      color: "rgba(255,95,60,0.2)",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                      margin: "12px 0 12px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: WHITE_60, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUBSPOT FORM ───────────────────────────────────────────────── */}
      <section id="get-a-quote" style={{ background: DARK_DEEPER }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "100px 24px" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 40px)",
                textTransform: "uppercase" as const,
                textAlign: "center",
                margin: 0,
              }}
            >
              Ready to Make Your Message{" "}
              <span style={{ color: ACCENT }}>Clear?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: WHITE_60,
                textAlign: "center",
                margin: "16px 0 48px",
              }}
            >
              Tell us about your project and we'll put together a custom proposal.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <HubSpotForm />
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: DARK_DEEPER,
          borderTop: `1px solid ${WHITE_08}`,
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="https://www.epipheo.com" target="_blank" rel="noopener noreferrer">
              <img src={LOGO_URL} alt="Epipheo" style={{ height: 22, width: "auto", opacity: 0.6 }} />
            </a>
            <span style={{ fontSize: 13, color: WHITE_40 }}>
              &copy; {new Date().getFullYear()} Epipheo. All rights reserved.
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a
              href="https://www.epipheo.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: WHITE_40, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = WHITE)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = WHITE_40)}
            >
              epipheo.com
            </a>
            <a
              href="https://www.linkedin.com/company/epipheo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: WHITE_40, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = WHITE)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = WHITE_40)}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
