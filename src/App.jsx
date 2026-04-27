import { useState, useEffect, useRef, useCallback } from "react";

const theme = {
  bg: "#1a1a1a",
  surface: "#262626",
  surfaceAlt: "#2e2e2e",
  nav: "#52525b",
  accent: "#e8c84a",
  accentDark: "#c9a828",
  white: "#f5f5f5",
  muted: "#a1a1aa",
  border: "#3f3f46",
  danger: "#ef4444",
};

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: theme.bg,
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    color: theme.white,
  },
  // ── Dynamic Header ──────────────────────────────────────────────────────────
  header: (scrolled, cartFlash) => ({
    backgroundColor: scrolled ? "rgba(26,26,26,0.96)" : theme.surface,
    backdropFilter: scrolled ? "blur(8px)" : "none",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: `2px solid ${cartFlash ? theme.danger : theme.accent}`,
    height: scrolled ? "52px" : "64px",
    transition: "all 0.3s ease",
    boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
  }),
  logo: (scrolled) => ({
    fontSize: scrolled ? "1.6rem" : "2rem",
    letterSpacing: "0.15em",
    color: theme.accent,
    cursor: "pointer",
    textTransform: "uppercase",
    margin: 0,
    transition: "font-size 0.3s ease",
  }),
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  headerBreadcrumb: {
    color: theme.muted,
    fontSize: "0.85rem",
    fontFamily: "sans-serif",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  loginBtn: {
    backgroundColor: "transparent",
    border: `1px solid ${theme.accent}`,
    color: theme.accent,
    padding: "6px 18px",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    transition: "all 0.2s",
  },
  cartBtn: (flash) => ({
    backgroundColor: flash ? theme.danger : theme.accent,
    border: "none",
    color: theme.bg,
    padding: "6px 18px",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background-color 0.3s ease, transform 0.15s ease",
    transform: flash ? "scale(1.08)" : "scale(1)",
  }),
  nav: {
    backgroundColor: theme.nav,
    display: "flex",
    justifyContent: "center",
    gap: "0",
    padding: "0",
  },
  navLink: (active) => ({
    color: active ? theme.accent : theme.white,
    textDecoration: "none",
    padding: "10px 28px",
    fontSize: "1.1rem",
    letterSpacing: "0.12em",
    cursor: "pointer",
    borderBottom: active ? `3px solid ${theme.accent}` : "3px solid transparent",
    transition: "all 0.15s",
    display: "inline-block",
  }),
  hero: {
    background: `linear-gradient(135deg, #0f0f0f 0%, #262626 50%, #1a1a1a 100%)`,
    padding: "5rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroTitle: {
    fontSize: "6rem",
    letterSpacing: "0.2em",
    color: theme.accent,
    margin: "0 0 0.5rem",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  heroSub: {
    fontSize: "1.5rem",
    letterSpacing: "0.3em",
    color: theme.muted,
    marginBottom: "2rem",
    textTransform: "uppercase",
  },
  heroBtn: {
    backgroundColor: theme.accent,
    color: theme.bg,
    border: "none",
    padding: "14px 48px",
    fontSize: "1.4rem",
    letterSpacing: "0.15em",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    transition: "transform 0.15s",
  },
  section: {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    letterSpacing: "0.2em",
    color: theme.accent,
    marginBottom: "0.25rem",
    textTransform: "uppercase",
  },
  sectionLine: {
    width: "60px",
    height: "3px",
    backgroundColor: theme.accent,
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  card: (hovered) => ({
    backgroundColor: theme.surface,
    border: `1px solid ${hovered ? theme.accent : theme.border}`,
    cursor: "pointer",
    transition: "all 0.2s",
    transform: hovered ? "translateY(-4px)" : "none",
    overflow: "hidden",
    position: "relative",
  }),
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
    backgroundColor: theme.surfaceAlt,
  },
  cardImgPlaceholder: (color) => ({
    width: "100%",
    height: "200px",
    backgroundColor: color || "#2e2e2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: theme.accent,
  }),
  cardBody: {
    padding: "1rem",
  },
  cardName: {
    fontSize: "1.2rem",
    letterSpacing: "0.1em",
    color: theme.white,
    margin: "0 0 0.25rem",
  },
  cardPrice: {
    fontSize: "1.1rem",
    color: theme.accent,
    margin: "0 0 0.75rem",
  },
  addToCart: {
    width: "100%",
    backgroundColor: theme.accent,
    color: theme.bg,
    border: "none",
    padding: "8px 0",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  badge: {
    backgroundColor: theme.danger,
    color: "white",
    fontSize: "0.7rem",
    padding: "2px 7px",
    borderRadius: "2px",
    marginLeft: "6px",
    fontFamily: "sans-serif",
    letterSpacing: "0.05em",
  },
  featuredRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  featuredCard: {
    backgroundColor: theme.surfaceAlt,
    border: `1px solid ${theme.accent}`,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "200px",
  },
  // ── Dynamic Footer ───────────────────────────────────────────────────────────
  footer: (page) => ({
    backgroundColor: theme.surface,
    borderTop: `2px solid ${page === "Home" ? theme.nav : theme.accent}`,
    padding: "2.5rem 2rem",
    color: theme.muted,
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    fontFamily: "sans-serif",
  }),
  cartPanel: {
    position: "fixed",
    right: 0,
    top: 0,
    height: "100vh",
    width: "340px",
    backgroundColor: theme.surface,
    borderLeft: `2px solid ${theme.accent}`,
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    boxSizing: "border-box",
  },
  cartOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 150,
  },
  emptyMsg: {
    color: theme.muted,
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "0.95rem",
  },
  loginModal: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    backgroundColor: theme.surface,
    border: `2px solid ${theme.accent}`,
    padding: "2.5rem",
    width: "340px",
  },
  input: {
    width: "100%",
    backgroundColor: theme.bg,
    border: `1px solid ${theme.border}`,
    color: theme.white,
    padding: "10px 12px",
    fontFamily: "sans-serif",
    fontSize: "0.95rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    outline: "none",
  },
};

// ── Extra product metadata for the detail drawer ──────────────────────────────
const productDetails = {
  p1: { material: "80% Cotton / 20% Elastane", fit: "Tapered", sizes: ["XS","S","M","L","XL"], desc: "Streetwear cargo jogger with flex panels and six utility pockets. Made to move." },
  p2: { material: "100% Denim", fit: "Skinny", sizes: ["28","30","32","34","36"], desc: "Heavily ripped knee and thigh. Raw hem. The blacker, the better." },
  p3: { material: "Ripstop Poly-Cotton", fit: "Wide Leg", sizes: ["XS","S","M","L","XL","XXL"], desc: "Military-grade camo, wide silhouette. Built for the block, ready for anything." },
  p4: { material: "12oz Selvedge Denim", fit: "Relaxed", sizes: ["28","30","32","34"], desc: "Distressed wash, faded knees, raw cut. Worn-in from day one." },
  p5: { material: "Polyester Tricot", fit: "Straight", sizes: ["XS","S","M","L","XL"], desc: "Double side stripe, elastic waist. Classic track silhouette with a street edge." },
  p6: { material: "Cotton Canvas", fit: "Relaxed Short", sizes: ["S","M","L","XL"], desc: "Utility shorts with oversized cargo pockets. Hot weather, cold attitude." },
  t1: { material: "330gsm Heavyweight Cotton", fit: "Oversized", sizes: ["S","M","L","XL","XXL"], desc: "Acid-wash screen print. Boxy fit, dropped shoulders. Statement piece only." },
  t2: { material: "220gsm Cotton", fit: "Cropped", sizes: ["XS","S","M","L"], desc: "Washed-black crop with raw hem. Pairs with everything, matches nothing." },
  t3: { material: "Ringspun Cotton", fit: "Long Sleeve", sizes: ["S","M","L","XL"], desc: "Skull-motif long sleeve. Heavy weight, slightly sheer. Layer or own it." },
  t4: { material: "100% Cotton", fit: "Relaxed", sizes: ["S","M","L","XL","XXL"], desc: "Hand-dyed tie-dye with structured chest print. Each one unique." },
  t5: { material: "250gsm Fleece-Back Jersey", fit: "Regular", sizes: ["XS","S","M","L","XL"], desc: "No rules. No logos. No compromises. Just a perfect tee." },
  t6: { material: "Cotton Slub", fit: "Slim", sizes: ["S","M","L","XL"], desc: "Glitch-distorted logo on chest. Slub texture, lived-in feel." },
  a1: { material: "Full-Grain Leather", fit: "Adjustable 28–42\"", sizes: ["One Size"], desc: "Triple-row pyramid studs, matte-black hardware. Doubles as a statement." },
  a2: { material: "100% Cotton Canvas", fit: "Unstructured", sizes: ["One Size"], desc: "Wide brim, unstructured crown. The only hat you'll need this season." },
  a3: { material: "Stainless Steel / Gold Plate", fit: "Layered Set", sizes: ["One Size"], desc: "Set of three layered chains. Lightweight, tarnish-resistant. Stack & flex." },
  a4: { material: "Vegan Leather", fit: "Adjustable Strap", sizes: ["One Size"], desc: "Structured crossbody with matte zip pulls. Goes from skate park to dinner." },
  a5: { material: "100% Merino Wool", fit: "Slouch Beanie", sizes: ["One Size"], desc: "Ribbed knit, no-logo. Stays put, keeps heat in, looks effortless." },
  a6: { material: "Genuine Leather", fit: "Open Fingers", sizes: ["S/M","L/XL"], desc: "Cut-off leather gloves with exposed knuckle. Grip the bar, grip the look." },
  s1: { material: "Synthetic Upper / Rubber Sole", fit: "Platform +5cm", sizes: ["36","37","38","39","40","41","42","43"], desc: "Chunky cleated sole, zip-front ankle. Heavy, imposing, unforgettable." },
  s2: { material: "Canvas Upper / Vulcanised Sole", fit: "High-Top", sizes: ["36","37","38","39","40","41","42","43","44"], desc: "High-top silhouette, unbleached canvas. The blank canvas of street footwear." },
  s3: { material: "Suede / Latex Sole", fit: "Slip-On", sizes: ["37","38","39","40","41","42","43"], desc: "Grunge-washed suede slip-on. Zero effort, maximum effect." },
  s4: { material: "Leather / Gum Sole", fit: "Low-Top", sizes: ["36","37","38","39","40","41","42","43","44"], desc: "Retro skate profile, wide toebox, gum sole. Timeless block colors." },
  s5: { material: "Full-Grain Leather / Lug Sole", fit: "Combat Boot", sizes: ["37","38","39","40","41","42","43","44"], desc: "10-hole lace-up, double-density lug. Built to last, built to intimidate." },
  s6: { material: "Engineered Mesh / EVA Sole", fit: "Runner", sizes: ["36","37","38","39","40","41","42","43","44","45"], desc: "Breathable mesh upper, lightweight EVA midsole. The streets are a track." },
};

const products = {
  pants: [
    { id: "p1", name: "Cargo Flex Jogger", price: 64, color: "#3b2a1a", icon: "👖", tag: "NEW" },
    { id: "p2", name: "Ripped Skinny Black", price: 58, color: "#1a1a1a", icon: "👖" },
    { id: "p3", name: "Wide Leg Camo", price: 72, color: "#3a4a30", icon: "👖", tag: "HOT" },
    { id: "p4", name: "Distressed Denim", price: 86, color: "#1e2a3a", icon: "👖" },
    { id: "p5", name: "Track Stripe Pant", price: 54, color: "#1a1a2e", icon: "👖" },
    { id: "p6", name: "Utility Pocket Shorts", price: 42, color: "#2a2210", icon: "👖" },
  ],
  tees: [
    { id: "t1", name: "Oversized Graphic Tee", price: 38, color: "#1e1e1e", icon: "👕", tag: "HOT" },
    { id: "t2", name: "Washed Black Crop", price: 32, color: "#111", icon: "👕" },
    { id: "t3", name: "Skull Print Long Sleeve", price: 44, color: "#1a0a0a", icon: "👕", tag: "NEW" },
    { id: "t4", name: "Tie-Dye Streetwear Tee", price: 36, color: "#1a1533", icon: "👕" },
    { id: "t5", name: "No Rules Tee", price: 34, color: "#2a1a1a", icon: "👕" },
    { id: "t6", name: "Glitch Logo Tee", price: 40, color: "#0a0f1e", icon: "👕" },
  ],
  accessories: [
    { id: "a1", name: "Studded Belt", price: 28, color: "#1a0f0a", icon: "⚡", tag: "NEW" },
    { id: "a2", name: "Bucket Hat Black", price: 24, color: "#111", icon: "🧢" },
    { id: "a3", name: "Chain Necklace Set", price: 36, color: "#1e1e1e", icon: "⚡" },
    { id: "a4", name: "Crossbody Bag", price: 52, color: "#1a1218", icon: "🎒", tag: "HOT" },
    { id: "a5", name: "Beanie Knit Black", price: 22, color: "#111", icon: "🧢" },
    { id: "a6", name: "Fingerless Gloves", price: 18, color: "#1a1a1a", icon: "⚡" },
  ],
  shoes: [
    { id: "s1", name: "Platform Chunky Boot", price: 118, color: "#1a0f0a", icon: "👟", tag: "HOT" },
    { id: "s2", name: "High-Top Canvas", price: 86, color: "#111", icon: "👟" },
    { id: "s3", name: "Slip-On Grunge", price: 72, color: "#1a1a1a", icon: "👟", tag: "NEW" },
    { id: "s4", name: "Retro Skate Shoe", price: 94, color: "#1e1428", icon: "👟" },
    { id: "s5", name: "Combat Lace-Up", price: 128, color: "#0f0f0f", icon: "👟" },
    { id: "s6", name: "Mesh Runner", price: 102, color: "#1a1e24", icon: "👟" },
  ],
};

const navItems = ["Home", "Pants", "Tees", "Accessories", "Shoes"];

// ── Page-level metadata for dynamic header/footer ─────────────────────────────
const pageConfig = {
  Home: {
    tagline: "Street. Bold. Unfiltered.",
    footerLinks: ["New Arrivals", "Best Sellers", "Lookbook", "About"],
    footerNote: "The street doesn't wait. Neither do we.",
  },
  Pants: {
    tagline: "Bottoms Built for the Block",
    footerLinks: ["Cargo", "Denim", "Track Pants", "Size Guide"],
    footerNote: "Free shipping on orders over $80.",
  },
  Tees: {
    tagline: "Graphic. Heavy. Raw.",
    footerLinks: ["Oversized", "Crop", "Long Sleeve", "Care Guide"],
    footerNote: "New graphics drop every Friday.",
  },
  Accessories: {
    tagline: "Finish the Look. Own the Room.",
    footerLinks: ["Belts", "Hats", "Jewellery", "Bags"],
    footerNote: "Accessories ship same day before 3pm.",
  },
  Shoes: {
    tagline: "Sole First. Always.",
    footerLinks: ["Boots", "Canvas", "Runners", "Fit Guide"],
    footerNote: "Free returns on all footwear within 30 days.",
  },
};

// ── Event bubbling toast system ───────────────────────────────────────────────
function BubbleToast({ toasts }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 500,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
      pointerEvents: "none",
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          backgroundColor: t.color,
          color: t.textColor || "#1a1a1a",
          padding: "8px 20px",
          fontSize: t.size || "0.9rem",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          animation: "bubbleIn 0.3s ease",
          opacity: t.opacity ?? 1,
          transition: "opacity 0.4s ease",
          borderLeft: `4px solid ${t.accent || "transparent"}`,
        }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ── Product Detail Drawer ─────────────────────────────────────────────────────
function ProductDrawer({ product, onClose, onAdd }) {
  const details = productDetails[product.id] || {};
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 250, backdropFilter: "blur(2px)",
        }}
      />
      <div style={{
        position: "fixed", right: 0, top: 0, height: "100vh", width: "400px",
        backgroundColor: theme.surface, borderLeft: `2px solid ${theme.accent}`,
        zIndex: 260, display: "flex", flexDirection: "column",
        padding: "2rem 1.5rem", boxSizing: "border-box", overflowY: "auto",
        animation: "slideInRight 0.25s ease",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          alignSelf: "flex-end", background: "none", border: "none",
          color: theme.muted, fontSize: "1.5rem", cursor: "pointer", marginBottom: "1rem",
        }}>✕</button>

        {/* Product Image Placeholder */}
        <div style={{
          ...styles.cardImgPlaceholder(product.color),
          height: "220px", marginBottom: "1.5rem",
          fontSize: "5rem",
        }}>
          {product.icon}
        </div>

        {/* Name + Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: theme.white, margin: 0, letterSpacing: "0.1em" }}>
            {product.name}
          </h2>
          {product.tag && <span style={styles.badge}>{product.tag}</span>}
        </div>

        {/* Price */}
        <p style={{ fontSize: "1.4rem", color: theme.accent, margin: "0 0 1rem" }}>${product.price}</p>

        {/* Description */}
        <p style={{ fontFamily: "sans-serif", fontSize: "0.9rem", color: theme.muted, lineHeight: 1.6, marginBottom: "1.25rem" }}>
          {details.desc || "Premium streetwear. No compromises."}
        </p>

        {/* Info Pills */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {details.material && (
            <span style={{ backgroundColor: theme.surfaceAlt, border: `1px solid ${theme.border}`, color: theme.muted, fontFamily: "sans-serif", fontSize: "0.75rem", padding: "4px 10px", letterSpacing: "0.05em" }}>
              {details.material}
            </span>
          )}
          {details.fit && (
            <span style={{ backgroundColor: theme.surfaceAlt, border: `1px solid ${theme.border}`, color: theme.accent, fontFamily: "sans-serif", fontSize: "0.75rem", padding: "4px 10px", letterSpacing: "0.05em" }}>
              {details.fit}
            </span>
          )}
        </div>

        {/* Size Picker */}
        {details.sizes && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", color: theme.muted, fontFamily: "sans-serif", marginBottom: "0.5rem", letterSpacing: "0.08em" }}>
              SELECT SIZE
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {details.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    padding: "6px 12px",
                    fontFamily: "sans-serif",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    border: `1px solid ${selectedSize === sz ? theme.accent : theme.border}`,
                    backgroundColor: selectedSize === sz ? theme.accent : "transparent",
                    color: selectedSize === sz ? theme.bg : theme.muted,
                    transition: "all 0.15s",
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          style={{
            ...styles.addToCart,
            padding: "12px 0",
            fontSize: "1.2rem",
            backgroundColor: added ? "#22c55e" : theme.accent,
            transition: "background-color 0.3s ease",
          }}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd, onViewDetails, onBubblePurchase }) {
  const [hovered, setHovered] = useState(false);

  // Event bubbling demo: click Add to Cart propagates up through card → grid → section
  const handleAddClick = (e) => {
    // Let the event bubble naturally; parent containers log it
    onAdd(product);
    onBubblePurchase(product, e);
    // We don't call e.stopPropagation() — bubbling is intentional
  };

  return (
    <div
      style={styles.card(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewDetails(product)}
    >
      <div style={styles.cardImgPlaceholder(product.color)}>
        <span style={{ fontSize: "3.5rem" }}>{product.icon}</span>
      </div>
      <div style={styles.cardBody}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
          <p style={styles.cardName}>{product.name}</p>
          {product.tag && <span style={styles.badge}>{product.tag}</span>}
        </div>
        <p style={styles.cardPrice}>${product.price}</p>
        <button
          style={styles.addToCart}
          onClick={handleAddClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── Product Page ──────────────────────────────────────────────────────────────
function ProductPage({ category, onAdd, onViewDetails, onBubblePurchase }) {
  const items = products[category];
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    // data-section attribute used by event bubbling to log the section level
    <div data-section={category} style={styles.section} onClick={(e) => {
      if (e.target.closest("button[data-purchase]")) {
        console.log(`[Event Bubble] Section: ${category}`);
      }
    }}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionLine} />
      <div data-grid={category} style={styles.grid} onClick={(e) => {
        if (e.target.closest("button[data-purchase]")) {
          console.log(`[Event Bubble] Grid: ${category}`);
        }
      }}>
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            onViewDetails={onViewDetails}
            onBubblePurchase={onBubblePurchase}
          />
        ))}
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, onAdd, onViewDetails, onBubblePurchase }) {
  const featured = [
    products.pants[2], products.tees[0], products.shoes[0], products.accessories[3],
  ];
  return (
    <>
      <div style={styles.hero}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, #e8c84a 30px, #e8c84a 31px)",
          pointerEvents: "none",
        }} />
        <h1 style={styles.heroTitle}>Teenage Kicks</h1>
        <p style={styles.heroSub}>Street. Bold. Unfiltered.</p>
        <button style={styles.heroBtn} onClick={() => setPage("Tees")}>
          Shop Now
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Drops</h2>
        <div style={styles.sectionLine} />
        <div style={styles.grid}>
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAdd}
              onViewDetails={onViewDetails}
              onBubblePurchase={onBubblePurchase}
            />
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: theme.surfaceAlt, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={styles.featuredRow}>
            <div style={styles.featuredCard}>
              <div>
                <h3 style={{ fontSize: "2rem", color: theme.accent, margin: "0 0 0.5rem", letterSpacing: "0.15em" }}>NEW SEASON</h3>
                <p style={{ color: theme.muted, fontFamily: "sans-serif", fontSize: "0.9rem", margin: 0 }}>
                  Fresh kicks & fits just dropped. Be the first to wear what the streets are talking about.
                </p>
              </div>
              <button style={{ ...styles.heroBtn, padding: "10px 28px", fontSize: "1.1rem", marginTop: "1.5rem", alignSelf: "flex-start" }}
                onClick={() => setPage("Shoes")}>
                View Shoes
              </button>
            </div>
            <div style={{ ...styles.featuredCard, backgroundColor: theme.bg }}>
              <div>
                <h3 style={{ fontSize: "2rem", color: theme.white, margin: "0 0 0.5rem", letterSpacing: "0.15em" }}>ACCESSORIES</h3>
                <p style={{ color: theme.muted, fontFamily: "sans-serif", fontSize: "0.9rem", margin: 0 }}>
                  Complete the look with our curated accessories. Chains, bags, hats & more.
                </p>
              </div>
              <button style={{ ...styles.heroBtn, padding: "10px 28px", fontSize: "1.1rem", marginTop: "1.5rem", alignSelf: "flex-start", backgroundColor: theme.nav }}
                onClick={() => setPage("Accessories")}>
                Shop Accessories
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Cart Panel ────────────────────────────────────────────────────────────────
function CartPanel({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  return (
    <>
      <div style={styles.cartOverlay} onClick={onClose} />
      <div style={styles.cartPanel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", letterSpacing: "0.15em", margin: 0, color: theme.accent }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: theme.muted, fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
        </div>
        {cart.length === 0 ? (
          <p style={styles.emptyMsg}>Your cart is empty.</p>
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <p style={{ margin: 0, fontSize: "1rem", letterSpacing: "0.08em", color: theme.white }}>{item.name}</p>
                  <p style={{ margin: 0, color: theme.accent, fontSize: "0.95rem" }}>${item.price}</p>
                </div>
                <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", color: theme.muted, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div style={{ marginTop: "1.5rem", borderTop: `2px solid ${theme.accent}`, paddingTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.3rem", letterSpacing: "0.1em" }}>Total</span>
              <span style={{ fontSize: "1.3rem", color: theme.accent }}>${total}</span>
            </div>
            <button style={{ ...styles.heroBtn, width: "100%", padding: "12px 0", fontSize: "1.2rem" }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Login Modal ───────────────────────────────────────────────────────────────
function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div style={styles.loginModal} onClick={onClose}>
      <div style={styles.loginBox} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: "2rem", color: theme.accent, margin: "0 0 1.5rem", letterSpacing: "0.15em" }}>Login</h2>
        <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button style={{ ...styles.heroBtn, width: "100%", padding: "12px 0", fontSize: "1.2rem" }}>
          Sign In
        </button>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: theme.muted, textAlign: "center", marginTop: "1rem" }}>
          Don't have an account? <span style={{ color: theme.accent, cursor: "pointer" }}>Sign Up</span>
        </p>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: theme.muted, fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
      </div>
    </div>
  );
}

// ── Dynamic Footer ────────────────────────────────────────────────────────────
function Footer({ page }) {
  const config = pageConfig[page] || pageConfig.Home;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={styles.footer(page)}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Dynamic links row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {config.footerLinks.map((link) => (
            <span key={link} style={{ color: theme.muted, cursor: "pointer", fontSize: "0.85rem", letterSpacing: "0.1em", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.target.style.color = theme.accent}
              onMouseLeave={(e) => e.target.style.color = theme.muted}>
              {link}
            </span>
          ))}
        </div>
        {/* Dynamic note */}
        <p style={{ color: theme.accent, fontSize: "0.8rem", textAlign: "center", marginBottom: "1rem", letterSpacing: "0.12em" }}>
          {config.footerNote}
        </p>
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.8rem" }}>© 2026 Teenage Kicks — All rights reserved</p>
          <p style={{ margin: 0, fontSize: "0.75rem" }}>Street Style · Unfiltered · Bold</p>
          <button onClick={scrollToTop} style={{
            background: "none", border: `1px solid ${theme.border}`, color: theme.muted,
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em",
            padding: "4px 12px", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.target.style.borderColor = theme.accent; e.target.style.color = theme.accent; }}
            onMouseLeave={(e) => { e.target.style.borderColor = theme.border; e.target.style.color = theme.muted; }}
          >
            ↑ TOP
          </button>
        </div>
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [drawerProduct, setDrawerProduct] = useState(null);
  const toastCounter = useRef(0);

  // ── Scroll listener for dynamic header ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Cart flash effect ────────────────────────────────────────────────────────
  const flashCart = useCallback(() => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 700);
  }, []);

  // ── Add to cart ─────────────────────────────────────────────────────────────
  const addToCart = useCallback((product) => {
    setCart((c) => [...c, product]);
    flashCart();
  }, [flashCart]);

  const removeFromCart = (i) => {
    setCart((c) => c.filter((_, idx) => idx !== i));
  };

  // ── Event bubbling: fires a chain of toasts representing bubble levels ───────
  // Card → Grid → Section → Page (DOM bubbling visualised as sequential toasts)
  const handleBubblePurchase = useCallback((product) => {
    const id = ++toastCounter.current;
    const bubbleChain = [
      { message: `🛒 Card: "${product.name}" added`, color: theme.accent, delay: 0, size: "1rem" },
      { message: `📦 Grid: item registered in grid`, color: theme.surfaceAlt, textColor: theme.white, accent: theme.accent, delay: 220, size: "0.85rem" },
      { message: `📄 Section: cart updated`, color: theme.nav, textColor: theme.white, delay: 440, size: "0.8rem" },
      { message: `🌐 Page: total is now ${cart.length + 1} item${cart.length + 1 !== 1 ? "s" : ""}`, color: theme.bg, textColor: theme.muted, accent: theme.border, delay: 660, size: "0.75rem" },
    ];

    bubbleChain.forEach(({ message, color, textColor, accent, delay, size }) => {
      setTimeout(() => {
        const toastId = `${id}-${delay}`;
        setToasts((prev) => [...prev, { id: toastId, message, color, textColor, accent, size }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        }, 2000);
      }, delay);
    });
  }, [cart.length]);

  const renderPage = () => {
    if (page === "Home") return (
      <HomePage
        setPage={setPage}
        onAdd={addToCart}
        onViewDetails={setDrawerProduct}
        onBubblePurchase={handleBubblePurchase}
      />
    );
    return (
      <ProductPage
        category={page.toLowerCase()}
        onAdd={addToCart}
        onViewDetails={setDrawerProduct}
        onBubblePurchase={handleBubblePurchase}
      />
    );
  };

  const config = pageConfig[page] || pageConfig.Home;

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />

      {/* ── Dynamic Header ── */}
      <header style={styles.header(scrolled, cartFlash)}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={styles.logo(scrolled)} onClick={() => setPage("Home")}>Teenage Kicks</h1>
          {/* Dynamic breadcrumb */}
          {page !== "Home" && (
            <div style={styles.headerBreadcrumb}>
              <span style={{ cursor: "pointer" }} onClick={() => setPage("Home")}>Home</span>
              <span>›</span>
              <span style={{ color: theme.accent }}>{page}</span>
              {/* Dynamic tagline on bigger screens */}
              <span style={{ color: theme.border, margin: "0 0.25rem" }}>—</span>
              <span style={{ color: theme.muted, fontStyle: "italic" }}>{config.tagline}</span>
            </div>
          )}
        </div>
        <div style={styles.headerRight}>
          <button style={styles.loginBtn} onClick={() => setLoginOpen(true)}>Login</button>
          <button style={styles.cartBtn(cartFlash)} onClick={() => setCartOpen(true)}>
            Cart {cart.length > 0 && (
              <span style={{
                backgroundColor: theme.bg, color: theme.accent, borderRadius: "50%",
                width: "20px", height: "20px", display: "inline-flex",
                alignItems: "center", justifyContent: "center", fontSize: "0.75rem",
              }}>{cart.length}</span>
            )}
          </button>
        </div>
      </header>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <span key={item} style={styles.navLink(page === item)} onClick={() => setPage(item)}>
            {item}
          </span>
        ))}
      </nav>

      {renderPage()}

      {/* ── Dynamic Footer ── */}
      <Footer page={page} />

      {/* ── Event Bubbling Toast Chain ── */}
      <BubbleToast toasts={toasts} />

      {/* ── Product Detail Drawer ── */}
      {drawerProduct && (
        <ProductDrawer
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onAdd={(p) => { addToCart(p); handleBubblePurchase(p); }}
        />
      )}

      {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
