import memojiImage from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import HeroOrbit from "@/components/HeroOrbit";
import SparkleIcon from "@/assets/icons/sparkle.svg";

const stats = [
  { value: "4", label: "apps live on mubashar.cc" },
  { value: "3", label: "iPhones serving them" },
  { value: "0", label: "cloud servers" },
];

export const HeroSection = () => {
  return (
    <div className="pt-32 pb-20 md:pt-48 md:pb-28 lg:pt-56 lg:pb-32 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        {/* 
          orbitDuration?: string;
          shouldOrbit?: boolean;
          shouldSpin?: boolean;
          spinDuration?: string;
      */}
        <HeroOrbit rotation={-15} size={430} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={79} size={440} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={-41} size={520} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={178} size={530} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={20} size={550} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>

        <HeroOrbit rotation={98} size={590} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>

        <HeroOrbit rotation={-5} size={620} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={144} size={710} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={85} size={720} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20" />
        </HeroOrbit>

        <HeroOrbit rotation={-72} size={800} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
          <StarIcon className="size-28 text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={memojiImage}
            className="size-[100px]"
            alt="Person peeking from behind laptop"
          />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-center mt-8 tracking-wide font-semibold bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
            Mubashar Warriach
          </h1>
          <p className="font-serif text-2xl md:text-4xl text-center mt-6 tracking-wide">
            I build apps end to end, and host them on my own iPhones
          </p>
          <p className="mt-4 text-center text-white/60 md:text-lg max-w-xl mx-auto">
            Full-stack engineer working across native iOS, React Native and Next.js, from the
            product down to the servers it runs on.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <a href="#work" className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white/5 transition">
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
            <span>👋</span>
            <span className="font-semibold ">Let&apos;s Connect!</span>
          </a>
        </div>
        <dl className="mt-12 grid grid-cols-3 max-w-xl mx-auto divide-x divide-white/10 border border-white/10 rounded-2xl bg-gray-950/40 backdrop-blur">
          {stats.map((stat) => (
            <div key={stat.label} className="px-3 py-4 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-serif text-2xl md:text-3xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                {stat.value}
              </dd>
              <dd className="text-xs md:text-sm text-white/50 mt-1">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
