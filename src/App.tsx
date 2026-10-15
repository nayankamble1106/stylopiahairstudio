import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Phone,
  MapPin,
  X,
  MessageCircle,
  Menu
} from 'lucide-react';
import gsap from 'gsap';

interface MinimalService {
  id: string;
  title: string;
  price: string;
  image: string;
}

const MINIMAL_SERVICES: MinimalService[] = [
  {
    id: 'keratin',
    title: 'Keratin & Smooth',
    price: 'From ₹3,999',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'couture-cut',
    title: 'Haute Couture Cut',
    price: 'From ₹799',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'balayage',
    title: 'French Balayage',
    price: 'From ₹4,499',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'scalp-spa',
    title: 'Cellular Scalp Spa',
    price: 'From ₹1,499',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'hair-botox',
    title: 'Molecular Hair Botox',
    price: 'From ₹3,499',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'occasion',
    title: 'Occasion & Styling',
    price: 'From ₹1,899',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85'
  }
];

export default function App() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(MINIMAL_SERVICES[0].title);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [dispatched, setDispatched] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vogue-fade', {
        opacity: 0,
        y: 24,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*STYLOPIA HAIR STUDIO · VIP RESERVATION*
━━━━━━━━━━━━━━━━━━
Name: ${name || 'Discerning Guest'}
Phone: ${phone || 'Not provided'}
Ritual: ${selectedService}
Preferred Date: ${date || 'Earliest available'}
Time Slot: ${time}
Location: 1st Floor, Jhansi Rani Square, Sitabuldi, Nagpur
━━━━━━━━━━━━━━━━━━`;

    window.open(`https://wa.me/919226539619?text=${encodeURIComponent(text)}`, '_blank');
    setDispatched(true);
  };

  const openBookingFor = (title?: string) => {
    if (title) setSelectedService(title);
    setDispatched(false);
    setIsBookOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#C8102E] selection:text-white font-sans antialiased">
      {/* 1. CLEAN VOGUE NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo (Left) */}
          <a href="#" className="flex flex-col group">
            <span className="font-serif text-2xl font-light tracking-[0.28em] text-white uppercase group-hover:text-neutral-200 transition-colors">
              STYLOPIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-[#C8102E] font-medium -mt-1">
              HAIR STUDIO
            </span>
          </a>

          {/* 4 Minimal Links (Center) */}
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
            <a href="#editorial" className="hover:text-white transition-colors">
              Editorial
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#studio" className="hover:text-white transition-colors">
              Studio
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Single 'Book' CTA (Right) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => openBookingFor()}
              className="px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] font-medium border border-white/20 hover:border-[#C8102E] hover:text-[#C8102E] transition-all duration-300 rounded-none bg-transparent"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D0D0D] border-b border-white/10 px-6 py-8 space-y-6">
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-[0.25em] text-neutral-300">
              <a href="#editorial" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8102E]">
                Editorial
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8102E]">
                Services
              </a>
              <a href="#studio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8102E]">
                Studio
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C8102E]">
                Contact
              </a>
            </div>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingFor();
                }}
                className="w-full py-3 text-xs uppercase tracking-[0.25em] font-medium bg-[#C8102E] text-white"
              >
                Reserve Appointment
              </button>
              <a
                href="tel:09226539619"
                className="w-full py-3 text-xs uppercase tracking-[0.25em] text-center border border-white/15 text-neutral-300"
              >
                Call: 092265 39619
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO: VOGUE HIGH-FASHION MINIMALIST EDITORIAL */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center px-6 lg:px-12 py-20 overflow-hidden">
        {/* Full-bleed Editorial Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2200&q=85"
            alt="Stylopia Haute Couture"
            className="w-full h-full object-cover object-top opacity-20 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="vogue-fade block text-[10px] uppercase tracking-[0.5em] text-[#C8102E] mb-6 font-medium">
            Nagpur · Sitabuldi
          </span>

          <h1 className="vogue-fade font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-none">
            Elegance <span className="italic font-normal">Redefined.</span>
          </h1>

          <p className="vogue-fade text-xs uppercase tracking-[0.3em] text-neutral-400 font-light max-w-md mx-auto mb-12">
            Haute coiffure & bespoke hair architecture
          </p>

          <div className="vogue-fade flex items-center justify-center gap-6">
            <button
              onClick={() => openBookingFor()}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium bg-white text-[#0D0D0D] hover:bg-neutral-200 transition-colors"
            >
              Reserve
            </button>
            <a
              href="#services"
              className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-light text-neutral-300 border border-white/20 hover:border-white transition-colors"
            >
              Collection
            </a>
          </div>
        </div>
      </section>

      {/* 3. SLEEK 2-COLUMN IMAGE LAYOUT (ABOUT REPLACED) */}
      <section id="editorial" className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] font-medium">
              01 / Studio Editorial
            </span>
            <span className="text-xs font-serif italic text-neutral-400 mt-2 md:mt-0">
              Hair as living sculpture.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left Image: High-gloss hair artistry */}
            <div className="relative group overflow-hidden bg-neutral-900 aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                alt="Stylopia Editorial Hair Artistry"
                className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8102E] block mb-1">
                  Craftsmanship
                </span>
                <p className="font-serif text-lg text-white">
                  Precision texture & bond restoration
                </p>
              </div>
            </div>

            {/* Right Image: Studio ambience & shears */}
            <div className="relative group overflow-hidden bg-neutral-900 aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                alt="Stylopia Studio Ambience"
                className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8102E] block mb-1">
                  Sanctuary
                </span>
                <p className="font-serif text-lg text-white">
                  Jhansi Rani Square · Sitabuldi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MINIMAL SERVICE SECTION (NO CLUTTER, IMAGE + TITLE + PRICE + EXPLORE ON HOVER) */}
      <section id="services" className="py-24 px-6 lg:px-12 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] font-medium block mb-1">
                02 / Signature Menu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                Services
              </h2>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2 md:mt-0 font-light">
              Bespoke Pricing
            </span>
          </div>

          {/* Large Image Cards Grid with Clean Hover Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINIMAL_SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => openBookingFor(service.title)}
                className="group relative cursor-pointer bg-[#111111] border border-white/5 overflow-hidden flex flex-col"
              >
                {/* Large Editorial Photo with Zoom on Hover */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

                  {/* Clean Hover Animation: Reveals single 'Explore' link */}
                  <div className="absolute inset-0 bg-[#0D0D0D]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white border border-white/40 bg-black/60 group-hover:border-[#C8102E] transition-colors">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C8102E]" />
                    </span>
                  </div>
                </div>

                {/* Card Title & Starting Price ONLY - No descriptions or pills */}
                <div className="p-5 flex items-center justify-between border-t border-white/5 bg-[#0D0D0D]">
                  <h3 className="font-serif text-base sm:text-lg font-light text-white group-hover:text-[#C8102E] transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-light">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STUDIO LOCATION & CONTACT (MINIMALIST) */}
      <section id="studio" className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] font-medium">
              03 / Studio & Visit
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
              Sitabuldi, Nagpur
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
                1st Floor, Jhansi Rani Square, Sitabuldi
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
                Nagpur, Maharashtra 440012
              </p>

              <div className="pt-6 flex flex-wrap items-center gap-6">
                <a
                  href="https://maps.google.com/?q=Stylopia+Hair+Studio+Jhansi+Rani+Square+Sitabuldi+Nagpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs uppercase tracking-[0.25em] font-medium border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors inline-flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href="tel:09226539619"
                  className="px-6 py-3 text-xs uppercase tracking-[0.25em] font-medium border border-white/30 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>092265 39619</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 border border-white/10 bg-[#111111] space-y-4">
              <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-neutral-400">
                <span>Hours</span>
                <span className="text-emerald-400 font-medium">Open Daily</span>
              </div>
              <p className="font-serif text-2xl text-white">
                10:00 AM – 9:00 PM
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Google Verified</span>
                <span className="font-serif text-white font-medium">4.7 ★ (513 Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMALIST VOGUE FOOTER */}
      <footer id="contact" className="py-16 px-6 lg:px-12 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-8 text-neutral-400">
          <div>
            <span className="font-serif text-xl tracking-[0.25em] text-white uppercase block mb-1">
              STYLOPIA
            </span>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8102E]">
              1st Floor, Jhansi Rani Sq, Sitabuldi, Nagpur
            </p>
          </div>

          <div className="flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
            <a href="tel:09226539619" className="hover:text-white transition-colors">
              092265 39619
            </a>
            <button onClick={() => openBookingFor()} className="hover:text-white transition-colors">
              Book Appointment
            </button>
            <a
              href="https://maps.google.com/?q=Stylopia+Hair+Studio+Jhansi+Rani+Square+Sitabuldi+Nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Directions
            </a>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            © {new Date().getFullYear()} Stylopia Hair Studio
          </p>
        </div>
      </footer>

      {/* 7. MINIMALIST BOOKING DRAWER */}
      {isBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#111111] border border-white/15 p-8 text-white">
            <button
              onClick={() => setIsBookOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {dispatched ? (
              <div className="text-center py-8 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] block">
                  Dispatched
                </span>
                <h3 className="font-serif text-2xl font-light">
                  Reservation Prepared
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 max-w-xs mx-auto">
                  Our concierge at Jhansi Rani Square will confirm your appointment shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsBookOpen(false)}
                    className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] border border-white/20 hover:border-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C8102E] block mb-2">
                  Stylopia Concierge
                </span>
                <h3 className="font-serif text-2xl font-light text-white mb-6">
                  Reserve an Experience
                </h3>

                <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      Ritual
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#181818] border border-white/10 p-3 text-white focus:outline-none focus:border-[#C8102E]"
                    >
                      {MINIMAL_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181818] border border-white/10 p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      Contact
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181818] border border-white/10 p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-[0.2em] text-neutral-400 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#181818] border border-white/10 p-3 text-white focus:outline-none focus:border-[#C8102E]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-[0.2em] text-neutral-400 mb-1">
                        Slot
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#181818] border border-white/10 p-3 text-white focus:outline-none focus:border-[#C8102E]"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs uppercase tracking-[0.25em] font-medium bg-[#C8102E] hover:bg-[#a10d25] text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm via WhatsApp</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
