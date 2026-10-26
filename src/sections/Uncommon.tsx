import homeShot from "@/assets/images/apps/uncommon-home.jpg";
import orderShot from "@/assets/images/apps/uncommon-order.jpg";
import shopShot from "@/assets/images/apps/uncommon-shop.jpg";
import cafesShot from "@/assets/images/apps/uncommon-cafes.jpg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LiveBadge, StackChips } from "@/components/StackChips";

const screens = [
  { src: homeShot, alt: "Uncommon Grounds app home screen with pickup café and rewards" },
  { src: orderShot, alt: "Café menu with hot drinks, bagels and smoothies" },
  { src: shopShot, alt: "Retail shop selling coffee beans by the pound" },
  { src: cafesShot, alt: "Map of Uncommon Grounds cafés with opening hours" },
];

const features = [
  "iOS & Android app: full café menus with sizes and add-ons, a coffee & tea shop, scheduled pickup, tips and tax",
  "Rewards program: 1 point per $1, free drinks at 100 and 200 points, safe against cancel-and-reuse",
  "Staff dashboard for live orders, customers, prices, store hours, reports and an audit log",
  "New orders print on in-store ticket printers, split across counter, bar and kitchen",
];

export const UncommonSection = () => {
  return (
    <div className="py-16 lg:py-24 relative overflow-x-clip">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(168,68,63,0.22),transparent)] -z-10"></div>
      <div className="container">
        <SectionHeader
          eyebrow="Featured Product"
          title="Uncommon Grounds"
          description="An ordering app I built to sell to Uncommon Grounds, the coffee roaster and bagel bakery with cafés across New York's Capital Region."
        />

        <div className="mt-12 md:mt-16 -mx-4 px-4 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 md:grid md:grid-cols-4 md:overflow-visible md:mx-0 md:px-0 [scrollbar-width:none]">
          {screens.map((screen, i) => (
            <PhoneFrame
              key={screen.alt}
              src={screen.src}
              alt={screen.alt}
              className={`w-[62%] sm:w-[45%] md:w-auto flex-none snap-center ${i % 2 === 1 ? "md:translate-y-10" : ""}`}
            />
          ))}
        </div>

        <Card className="mt-10 md:mt-20 p-8 md:p-10 lg:p-12">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#A8443F] text-white">
                  Built to sell
                </span>
                <LiveBadge label="API live" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mt-5">
                Their own app, instead of a rented ordering site
              </h3>
              <p className="mt-4 text-white/60">
                The cafés take online orders through a third-party site. I rebuilt the whole
                experience as a product they can own: the customer app, the staff
                tools and the printers behind the counter.
              </p>
              <StackChips
                className="mt-6"
                items={["React Native", "Expo", "TypeScript", "Hono", "Prisma", "PostgreSQL", "Next.js", "Better Auth"]}
              />
            </div>
            <div className="lg:col-span-3 mt-8 lg:mt-0">
              <ul className="flex flex-col gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm md:text-base text-white/70">
                    <CheckCircleIcon className="size-5 md:size-6 flex-none text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col md:flex-row gap-3">
                <a
                  href="#contact"
                  className="bg-white text-gray-950 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
                >
                  <span>Ask for a demo</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
                <a
                  href="https://uncommon-api.mubashar.cc/v1/healthz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/15 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <span>API status</span>
                  <ArrowUpRightIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
