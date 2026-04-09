import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ─── Constants ───────────────────────────────────────────────────────────── */
const ACCENT = "#FF5F3C";
const DARK = "#1A1A1A";
const DARK_DEEPER = "#111111";
const WHITE = "#FFFFFF";
const GRAY_TEXT = "#A0A0A0";
const LIGHT_BG = "#F0F0F0";

const LOGO_WHITE = "/logos/epipheo-white.svg";

const CLIENT_LOGOS = [
  { name: "OKTA", src: "/logos/okta.png" },
  { name: "SPLUNK", src: "/logos/splunk.png" },
  { name: "DELOITTE", src: "/logos/deloitte.png" },
  { name: "IRACING", src: "/logos/iracing.png" },
  { name: "CLEO", src: "/logos/cleo.png" },
  { name: "POET", src: "/logos/poet.png" },
];

const PORTFOLIO_VIDEOS = [
  { id: "n3q5yhztjo", title: "PASSKEYS EXPLAINER", client: "OKTA" },
  { id: "kc6uuxxwkz", title: "OBSERVABILITY PLATFORM", client: "SPLUNK" },
  { id: "deloitte-placeholder", title: "CONVERGEHEALTH", client: "DELOITTE" },
  { id: "iracing-placeholder", title: "FLAGSHIP EXPERIENCE", client: "IRACING" },
  { id: "poet-placeholder", title: "FACILITY PROCESS", client: "POET" },
  { id: "cleo-placeholder", title: "PLATFORM EXPLAINER", client: "CLEO" },
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
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Components ──────────────────────────────────────────────────────────── */

function HubSpotForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: "na1",
          portalId: "20864859",
          formId: "348b82c1-f306-4caa-9c13-9f8c6b1ec0ff",
          target: "#hs-form-target"
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id="hs-form-target" className="hs-form-container" />;
}

export default function EnterpriseExplainer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    document.title = "Enterprise Explainer Videos | Epipheo";
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-['Barlow']">
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-8 flex items-center justify-between">
          <a href="https://epipheo.com" target="_blank" rel="noopener noreferrer">
            <img src={LOGO_WHITE} alt="Epipheo" className="h-8" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold tracking-widest uppercase font-['Oswald']">
            <a href="#" className="hover:text-[#FF5F3C] transition-colors">Portfolio</a>
            <a href="#" className="hover:text-[#FF5F3C] transition-colors">Services</a>
            <a href="#" className="hover:text-[#FF5F3C] transition-colors">Industries</a>
            <a href="#" className="hover:text-[#FF5F3C] transition-colors">Resources</a>
            <button 
              onClick={() => scrollTo('quote')}
              className="bg-[#FF5F3C] text-white px-6 py-2.5 rounded-full hover:bg-[#ff7a5c] transition-all transform hover:-translateY-0.5"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold font-['Oswald'] leading-[1.1] mb-8 uppercase">
                Complex Solutions<br />
                Deserve <span className="text-white">Clear</span><br />
                Explanations
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                We explain the complex so your buyers can confidently say yes. Premium animated explainer videos for enterprise B2B solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollTo('quote')}
                  className="bg-[#FF5F3C] text-white px-10 py-4 rounded-full font-bold font-['Oswald'] tracking-widest uppercase hover:bg-[#ff7a5c] transition-all"
                >
                  Get Your Custom Quote
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold font-['Oswald'] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                  Watch Our Reel
                </button>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 w-full">
            <FadeIn delay={0.2}>
              <div className="aspect-video bg-black/40 rounded-lg border border-white/10 flex items-center justify-center relative group cursor-pointer">
                <div className="w-20 h-20 bg-[#FF5F3C] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                  [ Background Video Placeholder ]
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────── */}
      <section className="bg-[#F0F0F0] py-20 px-8 text-[#1A1A1A]">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold font-['Oswald'] tracking-widest uppercase mb-12">
            Trusted by the World's Most Iconic Brands
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-20">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.name} className="bg-white px-8 py-4 rounded shadow-sm flex items-center justify-center min-w-[140px]">
                <span className="font-bold font-['Oswald'] text-gray-300 tracking-widest">{logo.name}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold font-['Oswald'] text-[#FF5F3C] mb-2">6,000+</div>
              <div className="text-sm font-bold font-['Oswald'] tracking-widest uppercase">Videos Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold font-['Oswald'] text-[#FF5F3C] mb-2">15+</div>
              <div className="text-sm font-bold font-['Oswald'] tracking-widest uppercase">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold font-['Oswald'] text-[#FF5F3C] mb-2">50+</div>
              <div className="text-sm font-bold font-['Oswald'] tracking-widest uppercase">Fortune 500 Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ─────────────────────────────────────────── */}
      <section className="bg-white py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <FadeIn>
            <div className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-6">The Problem</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] leading-tight uppercase mb-8">
              Your Product is Powerful. But if prospects don't understand it, they won't buy it.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stop losing deals to confusion. In enterprise B2B, complexity is the enemy of conversion.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-6">The Solution</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] leading-tight uppercase mb-8">
              We explain the complex so your buyers can confidently say yes.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Epipheo crafts strategic storytelling that turns complexity into clarity for decision-makers.
            </p>
            <div className="bg-[#F0F0F0] p-8 border-l-4 border-[#FF5F3C]">
              <h4 className="font-bold font-['Oswald'] uppercase tracking-widest mb-2">The Epipheo Difference</h4>
              <p className="text-gray-600">Strategic narrative and animation that speak directly to enterprise buyers.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── METHODOLOGY ────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-32 px-8">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="text-[13px] font-bold text-[#FF5F3C] tracking-widest uppercase mb-4">Our Methodology</div>
            <h2 className="text-5xl font-bold font-['Oswald'] uppercase">The Epipheo Way</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {[
              { num: "01", title: "Discovery", text: "We dive deep into your complex solution to find the core epiphany. Our strategists interview your team to understand the \"why\" behind your product." },
              { num: "02", title: "Script", text: "Crafting a narrative that resonates with enterprise decision-makers. We translate technical jargon into a persuasive, human-centric story." },
              { num: "03", title: "Production", text: "High-fidelity animation (2D, 3D, or Motion Graphics) that matches your brand. Every frame is designed to maintain engagement and clarity." },
              { num: "04", title: "Launch", text: "Delivering a strategic asset that drives results. We provide the final video in multiple formats optimized for your specific sales funnel." }
            ].map((step, i) => (
              <div key={step.num} className={`p-10 border-white/10 ${i < 3 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''}`}>
                <div className="text-6xl font-bold font-['Oswald'] text-[#FF5F3C] mb-6">{step.num}</div>
                <h3 className="text-2xl font-bold font-['Oswald'] uppercase mb-6 tracking-widest">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ──────────────────────────────────────────────────── */}
      <section className="bg-white py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-['Oswald'] uppercase mb-4">See the Epiphany in Action</h2>
            <p className="text-gray-500">Strategic storytelling for the world's most complex brands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PORTFOLIO_VIDEOS.map((video) => (
              <div key={video.title} className="group cursor-pointer">
                <div className="aspect-video bg-black rounded mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="w-12 h-12 bg-[#FF5F3C] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                <h4 className="font-bold font-['Oswald'] uppercase tracking-widest text-lg mb-1">{video.title}</h4>
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">{video.client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ─────────────────────────────────────────────────── */}
      <section id="quote" className="bg-[#F0F0F0] py-32 px-8 text-[#1A1A1A]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-['Oswald'] uppercase mb-4">Get Your Custom Quote</h2>
            <p className="text-gray-500">Ready to clarify your message? Fill out the form below and our team will be in touch.</p>
          </div>
          <div className="bg-white p-12 rounded shadow-xl">
            <HubSpotForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] pt-24 pb-12 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <img src={LOGO_WHITE} alt="Epipheo" className="h-10 mb-8" />
              <div className="text-gray-400 space-y-2 mb-8">
                <p>888.687.7620</p>
                <p>hello@epipheo.com</p>
                <p>Cincinnati, OH</p>
              </div>
              <div className="flex gap-6 text-xl">
                <a href="#" className="hover:text-[#FF5F3C] transition-colors">f</a>
                <a href="#" className="hover:text-[#FF5F3C] transition-colors">t</a>
                <a href="#" className="hover:text-[#FF5F3C] transition-colors">in</a>
                <a href="#" className="hover:text-[#FF5F3C] transition-colors">ig</a>
              </div>
            </div>
            <div>
              <h5 className="font-bold font-['Oswald'] uppercase tracking-widest text-[#FF5F3C] mb-8">Services</h5>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Explainer Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">3D Explainer Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonial Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Educational Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trade Show Videos</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold font-['Oswald'] uppercase tracking-widest text-[#FF5F3C] mb-8">Company</h5>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold font-['Oswald'] uppercase tracking-widest text-[#FF5F3C] mb-8">Industries</h5>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">B2B Software</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Finance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Non-Profit</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4 text-[11px] text-gray-600 uppercase tracking-widest">
            <p>© 2026 Epipheo. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
