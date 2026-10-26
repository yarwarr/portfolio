"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import Image from "next/image";
import JavascriptIcons from "@/assets/icons/square-js.svg";
import ReactIcon from "@/assets/icons/react.svg";
import GithubIcon from "@/assets/icons/github.svg";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import CardHeader from "@/components/CardHeader";
import ToolboxItems from "@/components/ToolboxItems";
import {motion} from "framer-motion";
import { useRef } from "react";
import { brandIcon } from "@/components/BrandIcon";
import {
  siApple,
  siCloudflare,
  siDocker,
  siExpo,
  siGithubactions,
  siHono,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siSwift,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

const toolboxItems = [
  { title: "TypeScript", iconType: brandIcon(siTypescript) },
  { title: "React", iconType: ReactIcon },
  { title: "Next.js", iconType: brandIcon(siNextdotjs) },
  { title: "React Native", iconType: brandIcon(siExpo) },
  { title: "Swift", iconType: brandIcon(siSwift) },
  { title: "Node.js", iconType: brandIcon(siNodedotjs) },
  { title: "PostgreSQL", iconType: brandIcon(siPostgresql) },
  { title: "Prisma", iconType: brandIcon(siPrisma) },
];

const toolboxItems2 = [
  { title: "Tailwind CSS", iconType: brandIcon(siTailwindcss) },
  { title: "Cloudflare", iconType: brandIcon(siCloudflare) },
  { title: "Hono", iconType: brandIcon(siHono) },
  { title: "GitHub Actions", iconType: brandIcon(siGithubactions) },
  { title: "JavaScript", iconType: JavascriptIcons },
  { title: "Docker", iconType: brandIcon(siDocker) },
  { title: "iOS", iconType: brandIcon(siApple) },
  { title: "Github", iconType: GithubIcon },
];

const hobbies = [
  { title: "Fitness", emoji: "🏋️", left: "5%", top: "5%" },
  { title: "Photography", emoji: "📸", left: "50%", top: "5%" },
  { title: "Gaming", emoji: "🎮", left: "10%", top: "35%" },
  { title: "Hiking", emoji: "🥾", left: "35%", top: "40%" },
  { title: "Music", emoji: "🎵", left: "70%", top: "45%" },
  { title: "Driving", emoji: "🏎️", left: "5%", top: "65%" },
  { title: "Traveling", emoji: "✈️", left: "45%", top: "70%" },
];
export const AboutSection = () => {
  const constraintsRef = useRef(null);
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="RIT-trained engineer who likes owning the whole stack, and squeezing a little more out of hardware than it was meant to do."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 col-span-3 lg:col-span-3">
              <CardHeader
                className=""
                title="My Toolbox"
                description="What I reach for, from native iOS to the servers behind it."
              />
              <ToolboxItems
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
                items={toolboxItems}
              />
              <ToolboxItems
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:25s]"
                items={toolboxItems2}
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                className="px-6 py-6"
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
              />
              <div className="relative flex-1" ref={constraintsRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                  drag
                  dragConstraints={constraintsRef}
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{ left: hobby.left, top: hobby.top }}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileMemoji}
                  alt="smiling memoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
