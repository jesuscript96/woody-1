// Nav + footer strings for the Woody site (sticky nav-menu, full-screen overlay,
// floating book button, shared footer). Reuses lib/content.js where possible.

// Brand shown in the navbar + hero background photo.
export const v2Brand = "woody";
export const v2HeroPhoto = "/img/sfeer-kegs.jpg";

export const v2NavLinks = [
  { label: "Agenda", href: "/agenda" },
  { label: "Over", href: "/over" },
  { label: "Menu", href: "/menu" },
  { label: "Team", href: "/team" },
  { label: "Lokaal", href: "/lokaal" },
  { label: "Groepen", href: "/groepen" },
  { label: "Reserveren", href: "/reserveren" },
];

// Reservation trigger: any link with this href opens the Guestplan booking
// widget (the widget script, loaded in app/layout.js, binds it via a
// document-level click listener).
export const v2ReserveHref = "#gstpln_openBookingWidget";

// Floating circular button (aiyanna-style, in Woody's yellow).
export const v2Book = { label: "Reserveren", href: v2ReserveHref };

// Shared footer (bottom of every page + inside the menu overlay).
export const v2Footer = {
  contact: {
    phone: "026 - 202 0258",
    email: "hallo@barwoody.nl",
  },
  openingstijden: "dinsdag t/m zondag 11:00–01:00 (of later)",
  adres: {
    line: "Toy Story Street 66, Rotterdam",
    routeHref: "https://maps.google.com/?q=Toy+Story+Street+66+Rotterdam",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/barwoody", icon: "instagram" },
    { label: "WhatsApp", href: "https://wa.me/31000000000", icon: "whatsapp" },
  ],
};
