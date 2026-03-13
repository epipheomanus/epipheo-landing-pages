/**
 * QUOKKA'S WILD LIFE — Case Study Page
 * ─────────────────────────────────────
 * Design: Cinematic Noir Editorial
 * Pure black base (#000), cyan accent (#00E5CC), orange-red (#FF5F3C)
 * Barlow Condensed ExtraBold ALL CAPS headlines
 * DM Sans body, Space Mono labels
 * Full-bleed sections, pill CTAs, editorial asymmetry
 *
 * NARRATIVE: "Imagine what YOU could do." Every section addresses the reader.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

// ─── CDN Asset URLs ──────────────────────────────────────────────────────────
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663403442584/7HgvuxorBAkLdvrb7zEXrB";
const ASSETS = {
  charDavid:  `${CDN}/char-david_4264f4f3.png`,
  charMel:    `${CDN}/char-mel_34e0c425.png`,
  charQuokka: `${CDN}/char-quokka_f7daff6e.png`,
  charKit:    `${CDN}/char-kit_a3081831.png`,
  charTee:    `${CDN}/char-tee_cfa7b221.png`,
  charPotoo:  `${CDN}/char-potoo_a112fcd2.png`,
  bgForest:   `${CDN}/bg-forest_b6d71802.jpg`,
  bgJungle:   `${CDN}/bg-jungle_37d1a7de.jpg`,
  bgRiver:    `${CDN}/bg-river_917437cb.jpg`,
  bgDesert:   `${CDN}/bg-desert_785126c3.jpg`,
};

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── FadeInUp wrapper ────────────────────────────────────────────────────────
function FadeInUp({ children, className = "", delay = 0, style: extraStyle }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
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

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="https://www.epipheo.com" target="_blank" rel="noopener noreferrer" aria-label="Epipheo homepage">
          <img
            src="https://www.epipheo.com/wp-content/uploads/2023/06/Epipheo_Logo_White.svg"
            alt="Epipheo"
            className="h-7 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const span = document.createElement("span");
              span.style.cssText = "font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;letter-spacing:-0.02em;";
              span.textContent = "EPIPHEO";
              (e.target as HTMLImageElement).parentNode?.appendChild(span);
            }}
          />
        </a>
        <div className="flex items-center gap-3">
          <span
            className="hidden md:block text-xs uppercase tracking-widest font-medium"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}
          >
            Case Study
          </span>
          <a href="#cta" className="btn-cyan text-xs py-2.5 px-5">Let's Talk</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ASSETS.bgForest}
          alt="Quokka's Wild Life animated forest background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.88) 100%)" }}
        />
      </div>

      <div className="relative container pb-16 pt-32" style={{ zIndex: 5 }}>
        <div className="max-w-2xl">
          <p className="section-label mb-6">What's Possible</p>
          <h1 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)" }}>
            Your Story.<br />
            <span style={{ color: "var(--cyan)" }}>A Real Audience.</span><br />
            Real Revenue.
          </h1>
          <p
            className="text-lg mb-8 max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.7)" }}
          >
            We built an original animated series from scratch, got it distributed on Angel Studios, and started generating revenue in 12 months. Here's the exact playbook — and how it could work for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#proof" className="btn-cyan">See the Proof</a>
            <a href="#cta" className="btn-outline">Start a Conversation</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Character Showcase ──────────────────────────────────────────────────────
function CharacterShowcase() {
  return (
    <section style={{ background: "#050505", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container py-12">
        <FadeInUp>
          <p className="text-sm text-center mb-2" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}>
            These characters didn't exist 12 months ago.
          </p>
          <p className="section-label text-center mb-8">Now they're streaming on Angel Studios.</p>
        </FadeInUp>
        <div className="flex items-end justify-center gap-2 md:gap-6 overflow-hidden">
          {[
            { src: ASSETS.charDavid,  h: "220px", mh: "140px", label: "David" },
            { src: ASSETS.charMel,    h: "190px", mh: "120px", label: "Mel" },
            { src: ASSETS.charQuokka, h: "170px", mh: "110px", label: "Quokka" },
            { src: ASSETS.charKit,    h: "150px", mh: "95px",  label: "Kit" },
            { src: ASSETS.charTee,    h: "160px", mh: "100px", label: "Tee" },
            { src: ASSETS.charPotoo,  h: "130px", mh: "85px",  label: "Potoo" },
          ].map(({ src, h, mh, label }, i) => (
            <FadeInUp key={label} delay={i * 0.08} className="flex flex-col items-center gap-2 flex-shrink-0">
              <img
                src={src}
                alt={`${label} character from Quokka's Wild Life`}
                className="w-auto"
                style={{
                  height: `clamp(${mh}, 15vw, ${h})`,
                  filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.6))",
                }}
                loading="lazy"
              />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Watch on Angel Banner ───────────────────────────────────────────────────
function WatchBanner() {
  return (
    <section style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container py-8">
        <a
          href="https://www.angel.com/watch/quokkas-wild-life"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-6 group"
          style={{ textDecoration: "none" }}
        >
          <div
            className="relative flex-shrink-0 overflow-hidden rounded-lg"
            style={{ width: "160px", height: "90px", border: "2px solid rgba(0,229,204,0.3)" }}
          >
            <img
              src={ASSETS.bgDesert}
              alt="Watch Quokka's Wild Life on Angel"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: "var(--cyan)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="#000" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}
            >
              Watch the show that proves it works
            </p>
            <p className="epipheo-headline text-white text-2xl mb-1">
              Quokka's Wild Life <span style={{ color: "var(--cyan)" }}>on Angel Studios</span>
            </p>
            <p
              className="text-sm flex items-center gap-2"
              style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}
            >
              angel.com/watch/quokkas-wild-life
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────────────────────
function StatsBar() {
  const { ref, inView } = useInView(0.3);
  return (
    <section ref={ref} style={{ background: "#0d0d0d" }}>
      <div className="container py-16">
        <FadeInUp>
          <p
            className="text-sm text-center mb-10"
            style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}
          >
            This is what the timeline looks like when you have the right partner and the right platform.
          </p>
        </FadeInUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { value: 12, suffix: " mo", label: "Idea to Launch" },
            { value: 11, suffix: " eps", label: "Season 1" },
            { value: 3, suffix: " mo", label: "To First Revenue" },
            { value: 100, suffix: "%", label: "Angel Distributed" },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="epipheo-headline mb-1" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--cyan)" }}>
                {inView ? <Counter end={value} suffix={suffix} /> : `0${suffix}`}
              </div>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proof / Playbook Section ────────────────────────────────────────────────
function Proof() {
  return (
    <section id="proof" className="relative overflow-hidden" style={{ background: "#000" }}>
      <div className="container py-24">
        <FadeInUp className="max-w-3xl mx-auto text-center mb-20">
          <p className="section-label mb-4">The Playbook</p>
          <h2 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            There's a Clear Path.<br />
            <span style={{ color: "var(--cyan)" }}>We've Already Walked It.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>
            Getting an original animated series from idea to distribution used to require years, millions of dollars, and a lot of luck. That's no longer true. Here's the exact process we used — and that you can use too.
          </p>
        </FadeInUp>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />

          {[
            {
              step: "01",
              title: "Start With a Story Worth Telling",
              body: "You don't need a finished script. You need a concept with heart — a character, a world, a reason to care. That's where we start with every project. We help you find and sharpen the idea.",
            },
            {
              step: "02",
              title: "Produce a Torch — Not a Full Season",
              body: "Angel Studios' distribution model starts with a 3-minute proof-of-concept called a Torch. It's the smartest way to test an idea before committing to full production. We handle the entire Torch from script to screen.",
            },
            {
              step: "03",
              title: "Let the Audience Decide",
              body: "The Angel Guild — a community of real viewers — votes on whether your Torch deserves a full season. If it passes, Angel offers a distribution agreement. No gatekeepers. No Hollywood politics. Just audience response.",
            },
            {
              step: "04",
              title: "Produce the Season",
              body: "Once you have distribution, we build the full season. Writing, storyboarding, character design, animation, sound, and post — all in-house. The same pipeline we've used for Google, Salesforce, and Amazon, now working for your IP.",
            },
            {
              step: "05",
              title: "Launch to a Built-In Audience",
              body: "Angel Studios brings millions of family viewers. You're not launching into the void — you're launching onto a platform with an engaged, loyal audience that's already looking for content like yours.",
            },
            {
              step: "06",
              title: "Start Earning",
              body: "Angel's revenue-sharing model means your show can generate real income. We started earning within 3 months of launch. That's not a vanity metric — it's proof that original animated content can be a genuine business.",
            },
          ].map(({ step, title, body }, i) => (
            <FadeInUp key={step} delay={i * 0.08} className="relative flex gap-8 mb-12 pl-16">
              <div
                className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 flex-shrink-0"
                style={{ borderColor: "var(--cyan)", background: "#000", transform: "translateX(-50%)" }}
              />
              <div>
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-2 block"
                  style={{ color: "var(--cyan)", fontFamily: "'Space Mono',monospace" }}
                >
                  {step}
                </span>
                <h3 className="epipheo-headline text-white mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>{title}</h3>
                <p className="leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>{body}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp className="text-center mt-12">
          <a href="#cta" className="btn-cyan text-base px-8 py-4">This Could Be Your Story</a>
        </FadeInUp>
      </div>
    </section>
  );
}

// ─── Angel Studios Section ───────────────────────────────────────────────────
function AngelSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#080808" }}>
      <div className="absolute inset-0 opacity-20">
        <img src={ASSETS.bgJungle} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 30%, transparent 70%, #080808 100%)" }} />
      </div>

      <div className="relative container py-24">
        <div className="max-w-5xl mx-auto">
          <FadeInUp className="text-center mb-16">
            <p className="section-label mb-4">The Platform</p>
            <h2 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              The Distribution Problem<br />
              <span style={{ color: "var(--cyan)" }}>Is Already Solved.</span>
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>
              The hardest part of launching a show has always been getting distribution. Angel Studios has fundamentally changed that — and it's open to you right now.
            </p>
          </FadeInUp>

          {/* Angel Studios wordmark */}
          <FadeInUp className="flex justify-center mb-16">
            <a
              href="https://www.angel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
              style={{ textDecoration: "none" }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-80 group-hover:opacity-100 transition-opacity">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M14 24 Q24 14 34 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="4" fill="white"/>
              </svg>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                Angel Studios
              </span>
            </a>
          </FadeInUp>

          {/* Process Flow */}
          <FadeInUp>
            <p className="text-sm text-center mb-8" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}>
              Your path from idea to distribution:
            </p>
          </FadeInUp>
          <div className="grid md:grid-cols-5 gap-0 items-stretch max-w-4xl mx-auto">
            {[
              { icon: "💡", label: "Your Idea", desc: "Concept + story" },
              { icon: "🎬", label: "Your Torch", desc: "3-min proof-of-concept" },
              { icon: "🗳️", label: "Guild Vote", desc: "Audience decides" },
              { icon: "📺", label: "Distribution", desc: "Angel agreement" },
              { icon: "💰", label: "Your Revenue", desc: "Ongoing earnings" },
            ].map(({ icon, label, desc }, i) => (
              <FadeInUp key={label} delay={i * 0.1} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center p-4 flex-1">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="text-white font-bold text-sm mb-1" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.05em" }}>{label}</div>
                  <div className="text-xs" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}>{desc}</div>
                </div>
                {i < 4 && (
                  <div className="hidden md:flex items-center flex-shrink-0 px-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M12 6L16 10L12 14" stroke="rgba(0,229,204,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </FadeInUp>
            ))}
          </div>

          {/* Callout */}
          <FadeInUp className="mt-16 p-8 rounded-2xl text-center" style={{ border: "1px solid rgba(0,229,204,0.2)", background: "rgba(0,229,204,0.04)" }}>
            <p className="epipheo-headline text-white mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              "We didn't have a special deal with Angel Studios.<br className="hidden md:block" /> We used the same process that's available to anyone."
            </p>
            <p className="text-sm" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}>— Epipheo, on the Angel Studios Guild process</p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

// ─── What We Bring Section ───────────────────────────────────────────────────
function WhatWeBring() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute inset-0 opacity-15">
        <img src={ASSETS.bgRiver} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)" }} />
      </div>

      <div className="relative container py-24">
        <FadeInUp className="text-center mb-16">
          <p className="section-label mb-4">What We Bring</p>
          <h2 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            You Bring the Idea.<br />
            <span style={{ color: "var(--cyan)" }}>We Bring Everything Else.</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>
            15 years of animation production for the world's biggest brands — now available for your original IP. You don't need a studio. You don't need a network. You need a partner who's already done this.
          </p>
        </FadeInUp>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "IP Strategy",
              body: "We help you develop an original concept that's built to travel — characters, world, and story that can grow into a franchise, not just a one-off.",
              icon: "✦",
            },
            {
              title: "Full Production Pipeline",
              body: "Script, storyboard, character design, animation, sound design, music, and post — everything under one roof. No outsourcing. No surprises.",
              icon: "✦",
            },
            {
              title: "Angel Studios Path",
              body: "We've navigated the Torch process, the Guild vote, and the distribution agreement. We know exactly what it takes — and we'll guide you through every step.",
              icon: "✦",
            },
          ].map(({ title, body, icon }, i) => (
            <FadeInUp
              key={title}
              delay={i * 0.12}
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="mb-4" style={{ color: "var(--cyan)", fontSize: "1.2rem" }}>{icon}</div>
              <h3 className="epipheo-headline text-white mb-3" style={{ fontSize: "1.5rem" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}>{body}</p>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who This Is For Section ─────────────────────────────────────────────────
function WhoThisIsFor() {
  return (
    <section style={{ background: "#080808" }}>
      <div className="container py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Text */}
            <div>
              <FadeInUp>
                <p className="section-label mb-4">Who This Is For</p>
                <h2 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  You Have a Story.<br />
                  <span style={{ color: "var(--cyan)" }}>We Have the Path.</span>
                </h2>
                <p className="leading-relaxed mb-8" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>
                  This works for brands, creators, and entrepreneurs who have an idea worth animating — and who want a proven partner to take it from concept to a streaming series that generates real revenue.
                </p>
              </FadeInUp>
              <div className="flex flex-col gap-4">
                {[
                  {
                    who: "Brands with a story to tell",
                    what: "Turn your brand's values or characters into an original series that builds audience loyalty beyond advertising.",
                  },
                  {
                    who: "Creators with an IP idea",
                    what: "You have the concept. We have the production pipeline and the Angel Studios relationship to bring it to life.",
                  },
                  {
                    who: "Companies exploring content",
                    what: "Original animated content is one of the most durable, ownable assets a company can build. We'll show you how.",
                  },
                ].map(({ who, what }, i) => (
                  <FadeInUp
                    key={who}
                    delay={i * 0.1}
                    className="p-5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.05em", fontSize: "1rem" }}>{who}</p>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)" }}>{what}</p>
                  </FadeInUp>
                ))}
              </div>
            </div>

            {/* Timeline visual */}
            <FadeInUp delay={0.2} className="flex flex-col justify-center gap-3">
              {[
                { label: "Your Idea",         note: "The spark — a character, a world, a story",       active: false },
                { label: "Torch Production",   note: "3-minute proof-of-concept, fully produced",       active: false },
                { label: "Guild Vote",         note: "Real audience validates your concept",            active: false },
                { label: "Distribution Deal",  note: "Angel Studios agreement signed",                  active: false },
                { label: "Season Launch",      note: "Live to millions of family viewers",              active: false },
                { label: "Revenue",            note: "Ongoing earnings from Angel's sharing model",    active: true  },
              ].map(({ label, note, active }, i) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div
                      className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: active ? "var(--cyan)" : "rgba(255,255,255,0.2)",
                        background: active ? "var(--cyan)" : "transparent",
                      }}
                    />
                    {i < 5 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.08)", minHeight: "24px" }} />}
                  </div>
                  <div className="pb-3">
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        color: active ? "var(--cyan)" : "rgba(255,255,255,0.7)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {label}
                    </p>
                    <p className="text-xs" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.35)" }}>{note}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs mt-2 italic" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.25)" }}>
                We did this in 12 months. So can you.
              </p>
            </FadeInUp>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section with HubSpot Form ──────────────────────────────────────────
function CTA() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formLoaded = useRef(false);

  useEffect(() => {
    if (formLoaded.current) return;
    // Wait for HubSpot script to be available
    const loadForm = () => {
      if ((window as any).hbspt && formContainerRef.current) {
        formLoaded.current = true;
        (window as any).hbspt.forms.create({
          region: "na1",
          portalId: "20864859",
          formId: "348b82c1-f306-4caa-9c13-9f8c6b1ec0ff",
          target: "#hubspot-form-container",
        });
      }
    };

    // Try immediately, then retry with interval
    loadForm();
    if (!formLoaded.current) {
      const interval = setInterval(() => {
        loadForm();
        if (formLoaded.current) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section id="cta" className="relative overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute inset-0 opacity-25">
        <img src={ASSETS.bgDesert} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #000 0%, transparent 30%, transparent 70%, #000 100%)" }} />
      </div>

      <div className="relative container py-32" style={{ zIndex: 3 }}>
        <FadeInUp className="text-center mb-12">
          <p className="section-label mb-6">Your Turn</p>
          <h2 className="epipheo-headline text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            What Could<br />
            <span style={{ color: "var(--cyan)" }}>Your Show</span><br />
            Look Like?
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>
            We built Quokka's Wild Life to prove this was possible. Now we want to do it with you. Let's talk about your idea — no pitch deck required.
          </p>
        </FadeInUp>

        {/* HubSpot Form */}
        <FadeInUp delay={0.2} className="max-w-lg mx-auto mb-10">
          <div
            className="hs-form-container rounded-2xl p-8"
            style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          >
            <div id="hubspot-form-container" ref={formContainerRef} />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3} className="text-center">
          <a
            href="https://www.angel.com/watch/quokkas-wild-life"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base px-8 py-4"
          >
            Watch the Show First
          </a>
          <p className="text-sm mt-4" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.3)" }}>
            Or just watch the show. That's the best pitch we have.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="https://www.epipheo.com" target="_blank" rel="noopener noreferrer" aria-label="Epipheo homepage">
          <img
            src="https://www.epipheo.com/wp-content/uploads/2023/06/Epipheo_Logo_White.svg"
            alt="Epipheo"
            className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const span = document.createElement("span");
              span.style.cssText = "font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.2rem;color:rgba(255,255,255,0.6);letter-spacing:-0.02em;";
              span.textContent = "EPIPHEO";
              (e.target as HTMLImageElement).parentNode?.appendChild(span);
            }}
          />
        </a>
        <p className="text-xs" style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.3)" }}>
          &copy; {new Date().getFullYear()} Epipheo. All rights reserved.
        </p>
        <a
          href="https://www.angel.com/watch/quokkas-wild-life"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:opacity-100 transition-colors"
          style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)" }}
        >
          Watch on Angel Studios →
        </a>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        <CharacterShowcase />
        <WatchBanner />
        <StatsBar />
        <Proof />
        <AngelSection />
        <WhatWeBring />
        <WhoThisIsFor />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
