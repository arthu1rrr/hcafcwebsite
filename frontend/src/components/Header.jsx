import crestImg from "../assets/crest.png";

const navigationItems = [
  { label: "Teams", href: "#teams" },
  { label: "Squad", href: "#squad" },
  { label: "Fixtures", href: "#fixtures" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Hall of Fame", href: "#hall-of-fame" },
  { label: "Alumni", href: "#alumni" },
  { label: "Get involved", href: "#get-involved" },
  { label: "Committee", href: "#committee" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-hcafc-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between pl-4 pr-1 py-4">
        
        <nav className="hidden gap-4 md:flex" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded px-2 py-1 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="/" className="flex items-center">
          <img
            src={crestImg}
            alt="Homerton College AFC Crest"
            className="h-12 w-auto"
          />
        </a>
      </div>
    </header>
  );
}
