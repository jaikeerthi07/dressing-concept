import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Move3d,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const storage = "/manus-storage/";

const categories = [
  { no: "01", name: "Formal", copy: "Sharp silhouettes. Refined details.", image: `${storage}dc-formal_052d1eb5.jpg`, accent: "#d9c0a4" },
  { no: "02", name: "Casual", copy: "Everyday pieces. Elevated.", image: `${storage}dc-casual_33e3f1fc.jpg`, accent: "#97a4ab" },
  { no: "03", name: "Coat & Suit", copy: "Tailoring built with presence.", image: `${storage}dc-hero_d76063ee.jpg`, accent: "#6f8492" },
  { no: "04", name: "Blazers", copy: "Structure your style.", image: `${storage}dc-craft_bffdf8df.jpg`, accent: "#a48970" },
  { no: "05", name: "T-Shirts", copy: "Essential. Refined. Modern.", image: `${storage}dc-casual_33e3f1fc.jpg`, accent: "#c7b9aa" },
  { no: "06", name: "Shirts", copy: "Classic forms. Contemporary attitude.", image: `${storage}dc-hero_d76063ee.jpg`, accent: "#8193a0" },
  { no: "07", name: "Pants", copy: "Built around the right fit.", image: `${storage}dc-formal_052d1eb5.jpg`, accent: "#9a958e" },
];

const products = [
  { id: "01", name: "The Regent Blazer", category: "Blazers", price: "₹12,800", image: `${storage}dc-formal_052d1eb5.jpg`, tone: "Midnight" },
  { id: "02", name: "Atelier Shirt", category: "Shirts", price: "₹4,200", image: `${storage}dc-hero_d76063ee.jpg`, tone: "Ivory" },
  { id: "03", name: "Oriel Overshirt", category: "Casual", price: "₹7,600", image: `${storage}dc-casual_33e3f1fc.jpg`, tone: "Stone" },
  { id: "04", name: "The Line Trouser", category: "Pants", price: "₹5,900", image: `${storage}dc-craft_bffdf8df.jpg`, tone: "Carbon" },
];

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Objects", href: "#objects" },
  { label: "Journal", href: "#journal" },
];

function AppButton({ children, onClick, dark = false }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <button onClick={onClick} className={`dc-button ${dark ? "dc-button-dark" : ""}`}>
      <span>{children}</span>
      <ArrowUpRight size={15} strokeWidth={1.5} />
    </button>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span className="eyebrow-dot" />{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const onMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const filteredProducts = useMemo(() => selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory), [selectedCategory]);

  const handleNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    toast.success("You’re on the list.", { description: "The next Dressing Concept dispatch is coming your way." });
    setEmail("");
  };

  const closeLayers = () => { setMenuOpen(false); setSearchOpen(false); setCartOpen(false); };

  return (
    <main className="dc-shell">
      <div className="grain" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <a href="#top" className="brand-lockup" onClick={closeLayers}>
          <span className="brand-mark">DC</span>
          <span className="brand-wordmark">Dressing<br /><i>Concept</i></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-action" onClick={() => setSearchOpen(true)} aria-label="Open search"><Search size={18} strokeWidth={1.5} /></button>
          <button className="bag-action" onClick={() => setCartOpen(true)} aria-label="Open bag"><ShoppingBag size={18} strokeWidth={1.5} /><span>0</span></button>
          <button className="menu-action" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} strokeWidth={1.5} /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-bg" style={{ transform: `translate3d(${mouse.x * -10}px, ${mouse.y * -8}px, 0) scale(1.04)` }}>
          <img src={`${storage}dc-hero_d76063ee.jpg`} alt="Model wearing a charcoal blazer in a moody studio" />
        </div>
        <div className="hero-wash" />
        <div className="hero-orbit orbit-one" style={{ transform: `translate3d(${mouse.x * 14}px, ${mouse.y * 8}px, 0)` }} />
        <div className="hero-orbit orbit-two" style={{ transform: `translate3d(${mouse.x * -18}px, ${mouse.y * -12}px, 0)` }} />
        <div className="hero-copy">
          <div className="hero-kicker"><span>CHENNAI · INDIA</span><span className="hero-kicker-line" /><span>EST. 2017</span></div>
          <p className="hero-overline">A considered wardrobe for the<br />way you move through the world.</p>
          <h1>Define<br /><em>your</em><br />style.</h1>
          <div className="hero-ctas"><AppButton dark onClick={() => document.getElementById("objects")?.scrollIntoView({ behavior: "smooth" })}>Shop new arrivals</AppButton><button className="text-link" onClick={() => document.getElementById("film")?.scrollIntoView({ behavior: "smooth" })}><span className="play-icon"><Play size={11} fill="currentColor" /></span> Watch the film</button></div>
        </div>
        <div className="hero-aside"><span>01</span><div className="hero-aside-rule" /><span>04</span></div>
        <div className="hero-meta"><span>SPRING / SUMMER 26</span><span>↓ SCROLL TO EXPLORE</span></div>
        <div className="hero-float-card"><span className="float-card-index">01 / 04</span><span className="float-card-copy">The new<br /><i>uniform.</i></span><ArrowDownRight size={18} strokeWidth={1.2} /></div>
      </section>

      <section className="statement-section" id="film">
        <div className="statement-number">01</div>
        <div className="statement-copy"><SectionLabel>THE HOUSE</SectionLabel><h2>Clothes that<br /><em>hold a room.</em></h2></div>
        <div className="statement-body"><p>We make modern menswear for people who move with intention. Clean lines, honest materials, and a point of view shaped in Chennai.</p><a href="#journal" className="arrow-link">Our point of view <ArrowUpRight size={16} strokeWidth={1.5} /></a></div>
        <div className="statement-line" />
      </section>

      <section className="collection-section" id="collections">
        <div className="collection-head"><div><SectionLabel>THE COLLECTION</SectionLabel><h2>Built in <em>chapters.</em></h2></div><p>Seven expressions of a considered wardrobe.<br />Move through the edit at your own pace.</p></div>
        <div className="collection-grid">
          {categories.map((category, index) => (
            <a href="#objects" className={`collection-card card-${index + 1}`} key={category.name} onClick={() => { setSelectedCategory(category.name === "Formal" ? "Blazers" : category.name); }}>
              <img src={category.image} alt={`${category.name} collection`} />
              <div className="collection-shade" />
              <div className="collection-card-top"><span>{category.no}</span><span className="card-line" /></div>
              <div className="collection-card-bottom"><div><h3>{category.name}</h3><p>{category.copy}</p></div><span className="card-arrow"><ArrowUpRight size={18} strokeWidth={1.3} /></span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="objects-section" id="objects">
        <div className="objects-top"><div><SectionLabel>THE OBJECTS</SectionLabel><h2>New <em>arrivals.</em></h2></div><div className="objects-top-right"><p>04 pieces / 01 point of view</p><a href="#objects" className="arrow-link">View all objects <ArrowUpRight size={16} strokeWidth={1.5} /></a></div></div>
        <div className="filter-row" role="tablist" aria-label="Filter products">
          {["All", "Blazers", "Shirts", "Casual", "Pants"].map((filter) => <button className={selectedCategory === filter ? "filter-active" : ""} key={filter} onClick={() => setSelectedCategory(filter)}>{filter}</button>)}
        </div>
        <div className="product-grid">
          {filteredProducts.length ? filteredProducts.map((product) => (
            <button className="product-card" key={product.id} onClick={() => setSelectedProduct(product)}>
              <div className="product-image-wrap"><img src={product.image} alt={product.name} /><span className="product-index">{product.id}</span><span className="product-add"><Plus size={19} strokeWidth={1.3} /></span></div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.category} · {product.tone}</p></div><strong>{product.price}</strong></div>
            </button>
          )) : <div className="empty-products">No objects in this edit yet. Try another chapter.</div>}
        </div>
      </section>

      <section className="craft-section">
        <div className="craft-image"><img src={`${storage}dc-craft_bffdf8df.jpg`} alt="Macro detail of black suiting fabric and horn button" /><div className="craft-overlay" /><span className="craft-image-caption">01 — WOOL / HORN / HAND</span></div>
        <div className="craft-copy"><SectionLabel>THE DETAIL</SectionLabel><h2>The difference<br />is in the <em>close-up.</em></h2><p>Every piece begins with the material. We source cloth with a hand you can feel, then cut it into silhouettes that get better with wear.</p><div className="craft-points"><div><span>01</span><strong>Fabrics with a point of view.</strong></div><div><span>02</span><strong>Cut for the Indian climate.</strong></div><div><span>03</span><strong>Made to leave the rack.</strong></div></div><AppButton onClick={() => toast("Craft notes", { description: "Material stories are coming to the journal soon." })}>Read the craft notes</AppButton></div>
      </section>

      <section className="journal-section" id="journal">
        <div className="journal-head"><SectionLabel>FROM THE JOURNAL</SectionLabel><a href="#journal" className="arrow-link">Read all stories <ArrowUpRight size={16} strokeWidth={1.5} /></a></div>
        <div className="journal-grid"><article className="journal-feature"><div className="journal-image"><img src={`${storage}dc-casual_33e3f1fc.jpg`} alt="Model walking through a Chennai-inspired corridor" /><span>FIELD NOTE / 01</span></div><h3>On getting dressed<br /><em>for the in-between.</em></h3><a href="#journal" className="journal-link">Read story <ArrowUpRight size={15} /></a></article><article className="journal-note"><span>THE EDIT / 02</span><h3>Five pieces,<br /><em>infinite tempo.</em></h3><p>A study in repeat wear, soft structure, and the freedom that comes with knowing what works.</p><a href="#journal" className="arrow-link">Open the edit <ArrowUpRight size={16} /></a></article><article className="journal-note journal-note-blue"><span>THE CITY / 03</span><h3>Chennai,<br /><em>after dark.</em></h3><p>Notes from the city that keeps us curious — from ECR to Egmore and everywhere between.</p><a href="#journal" className="arrow-link">Read the dispatch <ArrowUpRight size={16} /></a></article></div>
      </section>

      <section className="store-section">
        <div className="store-copy"><SectionLabel>THE STORE</SectionLabel><h2>Come by<br /><em>the house.</em></h2><p>Try the pieces in person, meet the people behind the rail, and take your time with the details.</p><AppButton dark onClick={() => toast("Visit the house", { description: "Appointments are open at our Chennai studio." })}>Plan your visit</AppButton></div>
        <div className="store-details"><div className="store-detail"><MapPin size={18} strokeWidth={1.2} /><div><span>STUDIO / CHENNAI</span><p>12 Rutland Gate 5th Street<br />Nungambakkam, Chennai 600006</p></div></div><div className="store-detail"><Clock3 size={18} strokeWidth={1.2} /><div><span>OPENING HOURS</span><p>Mon — Sat / 11:00 — 20:00<br />Sunday / By appointment</p></div></div><div className="store-detail"><Move3d size={18} strokeWidth={1.2} /><div><span>THE EXPERIENCE</span><p>Private fittings, alterations,<br />and considered advice.</p></div></div></div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-mark"><Sparkles size={22} strokeWidth={1.2} /><span>THE<br />DISPATCH</span></div>
        <div className="newsletter-copy"><SectionLabel light>JOIN THE LIST</SectionLabel><h2>A little more<br /><em>to wear into.</em></h2><p>New objects, field notes, and the occasional invitation. No noise.</p></div>
        <form className="newsletter-form" onSubmit={handleNewsletter}><label htmlFor="email">Your email address</label><div><input id="email" type="email" placeholder="name@email.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={18} strokeWidth={1.3} /></button></div><span>By signing up, you agree to receive occasional notes from Dressing Concept.</span></form>
      </section>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">DC</span><span>Chennai · India</span></div><div className="footer-links"><a href="#collections">Collections</a><a href="#objects">Objects</a><a href="#journal">Journal</a><a href="#top">Back to top ↑</a></div><div className="footer-social"><a href="#top" aria-label="Instagram"><Instagram size={17} strokeWidth={1.3} /></a><a href="mailto:hello@dressingconcept.in" aria-label="Email"><Mail size={17} strokeWidth={1.3} /></a><span>© 2026 Dressing Concept</span></div></footer>

      {(menuOpen || searchOpen || cartOpen) && <div className="layer-scrim" onClick={closeLayers} />}
      {menuOpen && <aside className="side-panel"><button className="panel-close" onClick={closeLayers} aria-label="Close menu"><X size={20} strokeWidth={1.4} /></button><SectionLabel>THE HOUSE</SectionLabel><h2>Move with<br /><em>intention.</em></h2><nav className="panel-nav">{[...navLinks, { label: "Visit the store", href: "#top" }].map((link) => <a key={link.label} href={link.href} onClick={closeLayers}>{link.label}<ArrowUpRight size={16} /></a>)}</nav><div className="panel-foot"><span>CHENNAI · INDIA</span><span>EST. 2017</span></div></aside>}
      {searchOpen && <aside className="search-panel"><button className="panel-close" onClick={closeLayers} aria-label="Close search"><X size={20} strokeWidth={1.4} /></button><SectionLabel>SEARCH THE HOUSE</SectionLabel><div className="search-input-wrap"><Search size={22} strokeWidth={1.3} /><input autoFocus placeholder="Try blazer, shirt, wool..." onKeyDown={(event) => { if (event.key === "Enter") { toast("Search", { description: `Showing results for “${(event.target as HTMLInputElement).value}”` }); closeLayers(); } }} /></div><div className="search-suggestions"><span>Popular chapters</span><button onClick={() => { setSelectedCategory("Blazers"); closeLayers(); document.getElementById("objects")?.scrollIntoView({ behavior: "smooth" }); }}>Blazers</button><button onClick={() => { setSelectedCategory("Shirts"); closeLayers(); document.getElementById("objects")?.scrollIntoView({ behavior: "smooth" }); }}>Shirts</button><button onClick={() => { setSelectedCategory("Casual"); closeLayers(); document.getElementById("objects")?.scrollIntoView({ behavior: "smooth" }); }}>Casual</button></div></aside>}
      {cartOpen && <aside className="cart-panel"><button className="panel-close" onClick={closeLayers} aria-label="Close bag"><X size={20} strokeWidth={1.4} /></button><SectionLabel>YOUR BAG / 00</SectionLabel><div className="empty-bag"><ShoppingBag size={30} strokeWidth={1.1} /><h2>Nothing here<br /><em>yet.</em></h2><p>Objects you love will appear here.</p><button className="arrow-link" onClick={() => { closeLayers(); document.getElementById("objects")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the objects <ArrowUpRight size={16} /></button></div></aside>}
      {selectedProduct && <div className="modal-scrim" onClick={() => setSelectedProduct(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product detail"><X size={18} strokeWidth={1.4} /></button><div className="modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div><div className="modal-copy"><SectionLabel>OBJECT / {selectedProduct.id}</SectionLabel><h2>{selectedProduct.name}</h2><p className="modal-category">{selectedProduct.category} · {selectedProduct.tone}</p><p className="modal-description">A considered essential with an easy silhouette, precise construction, and the kind of material that keeps its composure.</p><div className="modal-price">{selectedProduct.price}</div><button className="modal-add" onClick={() => { toast.success("Added to bag", { description: selectedProduct.name }); setSelectedProduct(null); }}>Add to bag <ShoppingBag size={16} strokeWidth={1.4} /></button><p className="modal-note"><Check size={13} /> Complimentary Chennai delivery</p></div></div></div>}
    </main>
  );
}
