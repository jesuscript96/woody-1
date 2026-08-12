"use client";

import { visit, locations, brand } from "@/lib/content";
import { woodyIntro } from "@/lib/woody-content";

// Two-column info page (answers Niki's "would that be weird to change to a two
// column setup?"). Left = practical (address / hours / contact / route /
// reserve), right = story + the four locations. Collapses to one column on
// mobile. Reuses existing content; Woody huisstijl via .theme-woody.
export default function InfoTwoCol() {
  return (
    <section className="v2-info" id="info">
      <h1 className="v2-info__title">info</h1>

      <div className="v2-info__grid">
        {/* ---- left: practical ---- */}
        <div className="v2-info__col">
          <h2>Bezoek ons</h2>

          <p className="v2-info__label">Openingstijden</p>
          <p>{visit.opening.line}</p>

          <p className="v2-info__label">Contact</p>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>

          <p className="v2-info__actions">
            <a className="v2-info__cta" href="#gstpln_openBookingWidget">
              Reserveren
            </a>
          </p>
        </div>

        {/* ---- right: story + locations ---- */}
        <div className="v2-info__col">
          <h2>{woodyIntro.heading.replace("\n", " ")}</h2>
          <p className="v2-info__body">{woodyIntro.body}</p>

          <p className="v2-info__label">Woody in</p>
          <ul className="v2-info__locs">
            {locations.map((l) => (
              <li key={l.city}>
                <strong>{l.city}</strong>
                <span>{l.address}</span>
                <span>{l.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
