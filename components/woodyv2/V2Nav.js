"use client";

import { useState, useEffect, useRef } from "react";
import { v2NavLinks, v2Brand, v2Footer } from "@/lib/woody-v2-content";

// Sticky nav-menu: fixed logo (left) + hamburger (right); the hamburger opens a
// full-screen burgundy overlay with big Exposure links + the shared footer.
// `solid`   = pages without a dark hero (cream bar from the start).
// `overlay` = pages with a full-bleed photo hero (transparent bar, cream marks).
// The logo + hamburger colours are chosen per SECTION by a contrast sampler that
// reads the background behind each mark independently.
export default function V2Nav({ solid = false, overlay = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // mark colours refined by the sampler after mount (SSR default from the prop)
  const [logoMark, setLogoMark] = useState(overlay ? "beige" : "rood");
  const [burgerMark, setBurgerMark] = useState(overlay ? "cream" : "red");

  const logoRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section-level contrast: sample what sits behind the logo and behind the
  // hamburger separately, and pick the mark colour that contrasts. A photo (or
  // any dark fill) → light mark; a light fill → dark mark. This is why a page
  // with a light body but a photo top-right gets a dark logo + a light burger.
  useEffect(() => {
    const logo = logoRef.current;
    const burger = burgerRef.current;
    if (!logo || !burger) return;

    const themeAt = (x, y) => {
      const stack = document.elementsFromPoint(x, y);
      for (const el of stack) {
        if (el.closest(".v2-nav") || el.classList.contains("woo-cursor")) continue;
        let node = el;
        while (node && node.nodeType === 1 && node !== document.documentElement) {
          if (node.tagName === "IMG" || node.tagName === "VIDEO") return "dark";
          const cs = getComputedStyle(node);
          if (cs.backgroundImage && cs.backgroundImage !== "none") return "dark";
          const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
          if (m) {
            const p = m[1].split(",").map((n) => parseFloat(n));
            const a = p[3] === undefined ? 1 : p[3];
            if (a >= 0.5) {
              const lum = (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255;
              return lum > 0.55 ? "light" : "dark";
            }
          }
          node = node.parentElement;
        }
        break;
      }
      return overlay ? "dark" : "light";
    };

    let raf = 0;
    const sample = () => {
      raf = 0;
      const lr = logo.getBoundingClientRect();
      const br = burger.getBoundingClientRect();
      if (!window.innerWidth || !lr.width || !br.width) return; // degenerate layout
      setLogoMark(
        themeAt(lr.left + lr.width / 2, lr.top + lr.height / 2) === "light" ? "rood" : "beige"
      );
      setBurgerMark(
        themeAt(br.left + br.width / 2, br.top + br.height / 2) === "light" ? "red" : "cream"
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [overlay]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const barClass = [
    "v2-nav",
    overlay ? "v2-nav--overlay" : (scrolled || solid) && "v2-nav--solid",
    open && "v2-nav--open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header
        className={barClass}
        data-logo={open ? "beige" : logoMark}
        data-burger={open ? "cream" : burgerMark}
      >
        <a
          ref={logoRef}
          className="v2-nav__logo"
          href="/"
          aria-label={v2Brand}
          onClick={() => setOpen(false)}
        >
          {/* both colourways stacked; CSS shows one by context and flips on hover */}
          {/* eslint-disable @next/next/no-img-element */}
          <img className="v2-nav__logo-img is-beige" src="/gfx/logo-beige.svg" alt="Woody" />
          <img className="v2-nav__logo-img is-rood" src="/gfx/logo-rood.svg" alt="" />
          {/* eslint-enable @next/next/no-img-element */}
        </a>
        <button
          ref={burgerRef}
          className={`v2-nav__burger${open ? " is-open" : ""}`}
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`v2-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
        {/* eslint-disable @next/next/no-img-element */}

        {/* top-left woodpecker emblem (the "bar woody" wordmark sits centred in
            the bar above; the X lives top-right) */}
        <img
          className="v2-overlay__brandmark"
          src="/gfx/beeldmerk1-beige.svg"
          alt=""
          aria-hidden="true"
        />

        {/* small teal club-suit accent */}
        <span className="v2-overlay__club" aria-hidden="true" />

        <nav className="v2-overlay__links">
          {v2NavLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* flikkering "reserveren" sign → the reserveren page (not the widget) */}
        <a
          className="v2-flikker"
          href="/reserveren"
          onClick={() => setOpen(false)}
          aria-label="Reserveren"
        >
          <img
            className="v2-flikker__word"
            src="/gfx/word-reserveren-beige.png"
            alt=""
            aria-hidden="true"
          />
        </a>

        {/* flickering editorial photo collage (two frames swap) */}
        <div className="v2-overlay__collage" aria-hidden="true">
          <img className="v2-collage__frame is-a" src="/full-size-menu/collage-1.jpg" alt="" />
          <img className="v2-collage__frame is-b" src="/full-size-menu/collage-2.jpg" alt="" />
        </div>

        {/* footer info lives in the left space (the collage owns the right).
            The reference's four marks were the *positions* of these blocks. */}
        <div className="v2-overlay__foot">
          <div className="v2-footer__col">
            <span className="v2-footer__label">Contact</span>
            <a href={`tel:${v2Footer.contact.phone.replace(/[^+\d]/g, "")}`}>
              {v2Footer.contact.phone}
            </a>
            <a href={`mailto:${v2Footer.contact.email}`}>{v2Footer.contact.email}</a>
          </div>

          <div className="v2-footer__col">
            <span className="v2-footer__label">Adres</span>
            {(() => {
              const [street, ...rest] = v2Footer.adres.line.split(",");
              const city = rest.join(",").trim();
              return (
                <>
                  <p>{street.trim()}</p>
                  {city && <p>{city}</p>}
                </>
              );
            })()}
            <a href={v2Footer.adres.routeHref} target="_blank" rel="noreferrer">
              Route
            </a>
          </div>

          <div className="v2-footer__col">
            <span className="v2-footer__label">Openingstijden</span>
            <p>{v2Footer.openingstijden}</p>
          </div>
        </div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </>
  );
}
