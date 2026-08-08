"use client";

import { useState } from "react";
import { v2Footer } from "@/lib/woody-v2-content";

export function SocialIcon({ name }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 1.9a8.1 8.1 0 1 1-4.2 15l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 0 1 12 3.9zM8.9 7.4c-.2 0-.5 0-.7.4-.3.4-1 .9-1 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.6 4 2.3.9 2.7.7 3.2.6.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.1-1.3 0-.1-.2-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.8-.3-1.5-.5-2.3-1.5-.6-.7-1-1.5-1.2-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.7-1.8c-.2-.4-.4-.4-.5-.4z" />
      </svg>
    );
  }
  return null;
}

// Site-wide footer. A single burgundy bar that spreads across the whole width so
// the block of dark red is broken up: big "bar woody" wordmark left, a playful
// "schuif aan" sign over the info columns, and the two social links rendered as
// Woody woodpecker-emblems (the "big W"s = WhatsApp + Instagram). The floating
// "boek tafel" button lands in the reserved bottom-right corner.
export default function V2Footer() {
  const [lang, setLang] = useState("nl");
  const { contact, openingstijden, adres, socials } = v2Footer;

  // split "street, city" so the address reads over two lines like the sketch
  const [addrStreet, ...addrRest] = adres.line.split(",");
  const addrCity = addrRest.join(",").trim();

  return (
    <footer className="v2-footer">
      {/* eslint-disable @next/next/no-img-element */}
      <a className="v2-footer__logo" href="/" aria-label="Bar Woody — home">
        <img src="/gfx/logo-beige.svg" alt="Bar Woody" />
      </a>

      <div className="v2-footer__mid">
        <img className="v2-footer__schuif" src="/gfx/word-schuifaan-beige.png" alt="Schuif aan" />

        <div className="v2-footer__cols">
          <div className="v2-footer__col">
            <span className="v2-footer__label">Contact</span>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>

          <div className="v2-footer__col">
            <span className="v2-footer__label">Adres</span>
            <p>{addrStreet.trim()}</p>
            {addrCity && <p>{addrCity}</p>}
            <a href={adres.routeHref} target="_blank" rel="noreferrer">
              Route
            </a>
          </div>

          <div className="v2-footer__col">
            <span className="v2-footer__label">Openingstijden</span>
            <p>{openingstijden}</p>
          </div>
        </div>
      </div>

      <div className="v2-footer__right">
        <div className="v2-footer__lang">
          <button className={lang === "nl" ? "is-on" : ""} onClick={() => setLang("nl")}>
            NL
          </button>
          <span>/</span>
          <button className={lang === "eng" ? "is-on" : ""} onClick={() => setLang("eng")}>
            ENG
          </button>
        </div>

        <div className="v2-footer__socials">
          {socials.map((s) => (
            <a
              key={s.label}
              className="v2-footer__social"
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
            >
              <img className="v2-footer__social-mark" src="/gfx/beeldmerk1-beige.svg" alt="" />
              <span className="v2-footer__social-badge">
                <SocialIcon name={s.icon} />
              </span>
            </a>
          ))}
        </div>
      </div>
      {/* eslint-enable @next/next/no-img-element */}
    </footer>
  );
}
