
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Video, Monitor, Palette, Search, Zap, CheckCircle2, 
  MessageCircle, Menu, X, Facebook, Linkedin, Mail, Send, CheckCircle, ArrowRight, Eye, Building2, ShieldCheck, Globe, Rocket
} from 'lucide-react';

/**
 * --- MAPPAGE DES VIDÉOS VIZO ---
 * Ces chemins correspondent aux fichiers présents dans votre dossier racine.
 */
const VIDEO_ASSETS = {
  hero: "./hero.mp4",        
  vision: "./hero.mp4",      // Utilise la vidéo hero pour l'ambiance vision
  services: "./process.mp4",  // Utilise la vidéo process pour l'ambiance services
  flux: "./process.mp4",      
  contact: "./contact.mp4",
  // Détails modaux
  analyze: "./process.mp4", 
  production: "./process.mp4",
  impact: "./process.mp4"
};

const LINKS = {
  whatsapp: "https://wa.me/22677952919?text=Bonjour%20VIZO%2C%20je%20souhaite%20booster%20ma%20visibilit%C3%A9.",
  tiktok: "https://www.tiktok.com/@vizo394?_r=1&_t=ZN-92gpKprEgcw",
  facebook: "https://www.facebook.com/share/1GHDC3pZHG/?mibextid=wwXIfr",
  linkedin: "https://www.linkedin.com/in/vizo-undefined-0711b53a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  googleBusiness: "https://www.google.com/search?q=VIZO+Agency+Burkina+Faso"
};

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const DynamicSection: React.FC<{
  id: string;
  videoSrc: string;
  children: React.ReactNode;
  activeOpacity: number; 
  dormantOpacity?: number;
}> = ({ id, videoSrc, children, activeOpacity, dormantOpacity = 0.4 }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden transition-colors duration-1000"
    >
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover -z-20 transition-opacity duration-1000"
        style={{ opacity: isIntersecting ? 0.6 : 0.2 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      <div 
        className="absolute inset-0 -z-10 transition-all duration-700 ease-in-out"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${isIntersecting ? activeOpacity : dormantOpacity})`,
          backdropFilter: isIntersecting ? 'blur(10px)' : 'blur(0px)'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

const SERVICES_DATA = {
  community: {
    title: "Community Management",
    icon: <Users size={48} />,
    desc: "Prenez le contrôle de l'attention digitale.",
    fullText: "VIZO transforme vos réseaux sociaux en véritables quartiers généraux d'influence. Nous ne gérons pas de simples pages, nous bâtissons des communautés engagées et fidèles.",
    benefits: ["Stratégie d'influence", "Contenus viraux", "Modération 24/7", "Publicité ciblée"],
    video: VIDEO_ASSETS.services
  },
  studio: {
    title: "Studio Vidéo",
    icon: <Video size={48} />,
    desc: "L'impact visuel à l'état pur.",
    fullText: "Notre studio fusionne technologie 4K et direction artistique de prestige pour créer des œuvres cinématiques qui imposent votre autorité sur le marché.",
    benefits: ["Production 4K", "Post-production VFX", "Scripts narratifs", "Sound Design"],
    video: VIDEO_ASSETS.contact
  },
  web: {
    title: "Web Design",
    icon: <Monitor size={48} />,
    desc: "Votre ambassade numérique haute performance.",
    fullText: "Nous concevons des sites web qui sont de véritables machines à vendre. Vitesse, esthétique futuriste et conversion sont au cœur de notre architecture.",
    benefits: ["Interface UI/UX", "Vitesse éclair", "SEO International", "E-commerce"],
    video: VIDEO_ASSETS.flux
  },
  design: {
    title: "Design Graphique",
    icon: <Palette size={48} />,
    desc: "Identité visuelle de prestige.",
    fullText: "Forgeons ensemble une image de marque iconique. De la création de logo à la charte graphique complète, nous imposons votre style.",
    benefits: ["Logo Visionnaire", "Branding 360°", "Supports de Luxe", "Packaging"],
    video: VIDEO_ASSETS.vision
  }
};

const FLOW_DATA = {
  analyze: {
    title: "ANALYZE",
    icon: <Search size={48} />,
    content: "Audit stratégique de votre présence.",
    fullText: "Nous analysons votre marché pour identifier les opportunités de croissance. Pas de suppositions, seulement des données concrètes.",
    video: VIDEO_ASSETS.analyze
  },
  production: {
    title: "PRODUCTION",
    icon: <Zap size={48} />,
    content: "Création de haute qualité.",
    fullText: "Nos experts créent vos contenus et plateformes avec une exigence millimétrée. L'excellence est notre seul standard.",
    video: VIDEO_ASSETS.production
  },
  impact: {
    title: "IMPACT",
    icon: <CheckCircle2 size={48} />,
    content: "Explosion de votre visibilité.",
    fullText: "Nous déployons votre stratégie pour conquérir votre audience et transformer l'attention en résultats réels.",
    video: VIDEO_ASSETS.impact
  }
};

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, data: any }> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose}></div>
      <div className="glass relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-vizo-cyan/30 animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 z-50 p-3 glass text-white hover:text-vizo-cyan transition-all rounded-full">
          <X size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <video src={data.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-10">
              <h3 className="text-4xl font-black font-tech uppercase tracking-tighter">{data.title}</h3>
            </div>
          </div>
          <div className="p-10 md:p-14 space-y-8 flex flex-col justify-center bg-black/40">
            <p className="text-xl font-light text-gray-200 leading-relaxed italic">{data.fullText}</p>
            {data.benefits && (
              <ul className="grid grid-cols-1 gap-4">
                {data.benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-center text-[10px] text-white font-black uppercase tracking-widest bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="mr-3 text-vizo-cyan" size={16} /> {benefit}
                  </li>
                ))}
              </ul>
            )}
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-vizo-cyan text-black font-black uppercase tracking-widest hover:bg-white transition-all text-center rounded-xl">
              DÉMARRER LE PROJET
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [modalData, setModalData] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 2000);
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-vizo-cyan selection:text-black scroll-smooth">
      {/* Menu Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 md:py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="font-tech text-3xl font-black tracking-tighter">VIZO<span className="text-vizo-cyan">.</span></a>
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-tech font-bold uppercase tracking-[0.3em]">
            <a href="#expertises" className="hover:text-vizo-cyan transition-all">Expertises</a>
            <a href="#flux" className="hover:text-vizo-cyan transition-all">Parcours</a>
            <a href="#contact" className="hover:text-vizo-cyan transition-all">Contact</a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-vizo-cyan text-black hover:bg-white transition-all font-black rounded-lg">DÉMARRER</a>
          </div>
          <button className="md:hidden text-vizo-cyan" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden glass absolute top-full left-0 w-full p-12 flex flex-col items-center space-y-8 font-tech uppercase tracking-widest bg-black/95">
            <a href="#expertises" onClick={() => setMobileMenuOpen(false)}>Expertises</a>
            <a href="#flux" onClick={() => setMobileMenuOpen(false)}>Parcours</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href={LINKS.whatsapp} className="w-full py-5 bg-vizo-cyan text-black text-center font-black rounded-xl">WHATSAPP</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <DynamicSection id="hero" videoSrc={VIDEO_ASSETS.hero} activeOpacity={0.6}>
        <div className="text-center animate-float">
          <h1 className="text-7xl md:text-[16rem] font-black font-tech leading-none tracking-tighter text-glow-cyan mb-4 uppercase">VIZO</h1>
          <p className="text-lg md:text-3xl font-tech font-light text-vizo-cyan tracking-[0.6em] uppercase mb-16 opacity-80">CRÉEZ. INNOVEZ. IMPACTEZ.</p>
          <a href="#contact" className="group glass px-16 py-7 border border-vizo-cyan/50 font-tech text-xs hover:bg-vizo-cyan hover:text-black transition-all shadow-[0_0_40px_rgba(0,242,255,0.2)] uppercase tracking-widest inline-flex items-center gap-4 rounded-xl">
            Démarrer votre projet <Rocket size={18} />
          </a>
        </div>
      </DynamicSection>

      {/* Services Grid */}
      <DynamicSection id="expertises" videoSrc={VIDEO_ASSETS.services} activeOpacity={0.7}>
        <h2 className="text-5xl md:text-8xl font-black font-tech uppercase mb-24 text-center">Nos <span className="text-vizo-cyan">Expertises</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {Object.entries(SERVICES_DATA).map(([key, service]) => (
            <button key={key} onClick={() => setModalData(service)} className="glass text-left p-12 group hover:border-vizo-cyan/50 transition-all min-h-[400px] flex flex-col justify-between rounded-[3rem] border border-white/5">
              <div>
                <div className="mb-10 text-vizo-cyan group-hover:scale-110 transition-all duration-500 origin-left">{service.icon}</div>
                <h3 className="text-3xl font-black font-tech mb-6 uppercase tracking-tight group-hover:text-vizo-cyan">{service.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{service.desc}</p>
              </div>
              <div className="flex items-center text-[10px] font-tech font-bold uppercase tracking-[0.5em] text-vizo-cyan mt-8">DÉCODER LA STRATÉGIE →</div>
            </button>
          ))}
        </div>
      </DynamicSection>

      {/* Process Flow */}
      <DynamicSection id="flux" videoSrc={VIDEO_ASSETS.flux} activeOpacity={0.9}>
        <div className="text-center">
          <h2 className="text-6xl md:text-9xl font-black font-tech uppercase mb-32 tracking-tighter">Le Flux <span className="text-vizo-cyan">Vizo</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-7xl mx-auto">
            {Object.entries(FLOW_DATA).map(([key, step], i) => (
              <button key={key} onClick={() => setModalData(step)} className="group flex flex-col items-center active:scale-95 transition-all">
                <div className="w-36 h-36 glass flex items-center justify-center mb-12 relative rounded-full group-hover:border-vizo-cyan border border-white/10">
                  <span className="absolute -top-4 -right-4 w-12 h-12 bg-vizo-cyan text-black text-sm font-black flex items-center justify-center font-tech rounded-full border-2 border-black">0{i+1}</span>
                  {step.icon}
                </div>
                <h4 className="text-3xl font-black font-tech mb-6 text-white group-hover:text-vizo-cyan tracking-widest">{step.title}</h4>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em]">VOIR LES DÉTAILS</p>
              </button>
            ))}
          </div>
        </div>
      </DynamicSection>

      {/* Contact Form */}
      <DynamicSection id="contact" videoSrc={VIDEO_ASSETS.contact} activeOpacity={0.8}>
        <div className="max-w-6xl mx-auto glass p-12 md:p-28 rounded-[4rem] border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vizo-cyan via-vizo-violet to-vizo-cyan"></div>
          {formSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in">
              <CheckCircle size={56} className="text-vizo-cyan mb-8" />
              <h3 className="text-5xl font-black font-tech uppercase mb-8 text-glow-cyan">MISSION ACCEPTÉE.</h3>
              <p className="text-2xl text-gray-300 font-light uppercase tracking-widest">NOUS VOUS RECONTACTONS SOUS 24H.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-5xl md:text-8xl font-black font-tech uppercase mb-12 tracking-tighter leading-none">Conquérir le <span className="text-vizo-cyan">Futur</span></h2>
                <div className="flex flex-col gap-6">
                  <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-10 py-6 bg-green-600 hover:bg-green-500 transition-all text-white font-black tracking-widest uppercase rounded-2xl">
                    <div className="flex items-center"><MessageCircle className="mr-4" /> WhatsApp</div>
                    <ArrowRight />
                  </a>
                  <a href={LINKS.googleBusiness} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-10 py-6 glass hover:bg-white hover:text-black transition-all font-black tracking-widest uppercase rounded-2xl">
                    <div className="flex items-center"><Building2 className="mr-4" /> Google Business</div>
                    <ArrowRight />
                  </a>
                </div>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-8 bg-black/30 p-10 rounded-[2.5rem] border border-white/5">
                <input type="text" placeholder="NOM OU ENTREPRISE" required className="w-full bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-vizo-cyan transition-all font-tech text-xs uppercase tracking-widest text-white rounded-xl" />
                <input type="email" placeholder="EMAIL PROFESSIONNEL" required className="w-full bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-vizo-cyan transition-all font-tech text-xs uppercase tracking-widest text-white rounded-xl" />
                <textarea placeholder="VOTRE VISION..." rows={4} required className="w-full bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-vizo-cyan transition-all font-tech text-xs uppercase tracking-widest text-white rounded-xl resize-none"></textarea>
                <button type="submit" disabled={loading} className="w-full py-6 bg-vizo-cyan text-black font-black uppercase tracking-[0.5em] hover:bg-white transition-all disabled:opacity-50 font-tech text-sm flex items-center justify-center gap-4 rounded-xl shadow-[0_15px_40px_rgba(0,242,255,0.2)]">
                  {loading ? "TRANSMISSION..." : (<>LANCER L'IMPACT <Send size={20} /></>)}
                </button>
              </form>
            </div>
          )}
        </div>
      </DynamicSection>

      {/* Footer */}
      <footer className="py-24 bg-black border-t border-white/5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-700 font-tech font-black uppercase tracking-[0.6em] gap-10">
          <div className="flex items-center gap-8">
            <span className="text-3xl text-white font-black tracking-tighter">VIZO.</span>
            <span>© {new Date().getFullYear()} — BURKINA FASO</span>
          </div>
          <div className="flex space-x-12">
            <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="social-glow flex items-center gap-3 group">
              <TikTokIcon size={18} /><span className="group-hover:text-vizo-cyan">TikTok</span>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-glow flex items-center gap-3 group">
              <Linkedin size={18} /><span className="group-hover:text-vizo-cyan">LinkedIn</span>
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="social-glow flex items-center gap-3 group">
              <Facebook size={18} /><span className="group-hover:text-vizo-cyan">Facebook</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Bouton WhatsApp Flottant */}
      <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-10 right-10 z-[80] p-6 bg-green-600 text-white rounded-full shadow-[0_0_50px_rgba(22,163,74,0.4)] hover:scale-110 transition-all animate-bounce">
        <MessageCircle size={32} />
      </a>

      {/* Sécurité Visuelle */}
      <div className="fixed bottom-0 left-0 p-4 z-[90] opacity-20 pointer-events-none hidden md:block">
        <div className="flex items-center gap-3 text-[7px] font-tech text-green-500 uppercase tracking-widest">
          <ShieldCheck size={10} /> CONNEXION SÉCURISÉE VIZO ACTIVE
        </div>
      </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </div>
  );
};

export default App;
