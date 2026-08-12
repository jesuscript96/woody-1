"use client";

import { useState, useEffect } from "react";
import { v2NavLinks, v2Brand, v2Book, v2Footer } from "@/lib/woody-v2-content";

// Sticky nav-menu: fixed logo (left) + hamburger (right); the hamburger opens a
// full-screen burgundy overlay with big Exposure links + the shared footer.
// `solid`   = pages without a dark hero (cream bar from the start).
// `overlay` = pages with a full-bleed photo hero (transparent bar, cream marks).
// `light`   = cream-bg page, no dark hero: transparent bar, burgundy marks.
export default function V2Nav({ solid = false, overlay = false, light = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > (window.innerHeight - 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Determine if header elements should render burgundy (over cream) or beige (over dark)
  const isLightContext = light || (overlay && pastHero) || (!overlay && !open);
  
  const barClass = [
    "v2-nav",
    isLightContext ? "v2-nav--light" : "v2-nav--dark",
    scrolled && "v2-nav--scrolled",
    open && "v2-nav--open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={barClass}>
        <a
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

        {/* Instagram icon top-left, aligned with the menu items below */}
        <a
          className="v2-overlay__ig"
          href="https://www.instagram.com/barwoody"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
            <circle cx="12" cy="12" r="4.4" />
            <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
          </svg>
        </a>

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

        {/* flikkering "reserveren" sign */}
        <a
          className="v2-flikker"
          href={v2Book.href}
          onClick={() => setOpen(false)}
          aria-label={v2Book.label}
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
