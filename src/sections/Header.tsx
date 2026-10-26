const links = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#iphones", label: "iPhones" },
  { href: "#about", label: "About" },
];

export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-50 px-2">
      <nav className="flex gap-0.5 md:gap-1 p-0.5 border border-white/15 rounded-full bg-gray-900/60 backdrop-blur">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="nav-item">
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">
          Contact
        </a>
      </nav>
    </div>
  );
};
