import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  { title: "Github", href: "https://github.com/yarwarr" },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/mubashar-warriach/" },
  { title: "Instagram", href: "https://www.instagram.com/mubashar.yar?igsh=OWhxc3Q2Mmd2ZGJ1&utm_source=qr" },
  { title: "Resume", href: "https://utfs.io/f/10b806cc-5367-480f-a625-eda055e77ba2-nqi7l6.pdf" },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2024. All rights reserved.</div>

          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                className="inline-flex items-center gap-1.5 cursor-pointer"
                href={link.href}
                key={link.title}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
