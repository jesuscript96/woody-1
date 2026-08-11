"use client";

import { useEffect, useRef } from "react";
import { closing } from "@/lib/content";
import Woord from "@/components/woodyv2/Woord";

// Colours the banner border + text cycle through, every 300ms.
const DEFAULT_COLORS = [
  "#e63946",
  "#111111",
  "#6d150f",
];

export default function ClosingBanner({ dancing = false, colors = DEFAULT_COLORS }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % colors.length;
      el.style.setProperty("--banner-color", colors[i]);
    }, 300);
    return () => clearInterval(id);
  }, [colors]);

  return (
    <>
      <section className="closing" id="reserveren">
        <div
          className="closing__image"
          style={{ backgroundImage: `url(${closing.image})` }}
        />
      </section>
      <section className="closing__bar" ref={bannerRef}>
        <div className="closing__pre-label">
          <span>Er is hier altijd plek.</span>
          <Woord
            name="schuifaan"
            color="rood"
            alt="Schuif aan"
            className="closing__pre-img"
          />
        </div>
        <a
          className="closing__banner"
          href="#gstpln_openBookingWidget"
          aria-label={closing.bannerLabel}
        >
          {/* the designed word, filled with the cycling banner colour (mask) */}
          <span className="closing__banner-word" aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
