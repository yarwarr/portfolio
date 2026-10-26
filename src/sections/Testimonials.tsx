import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

// Copied word for word from the recommendations on LinkedIn, newest first.
const recommendations = [
  {
    name: "Nathan Carrington",
    initials: "NC",
    position: "Vice President, Global Regulatory Affairs @ Beckman Coulter Diagnostics",
    context: "Managed me directly at BD",
    date: "May 2025",
    text: "Mubashar has provided excellent support to a number of Regulatory Affairs teams at BD, bringing strong IT expertise to streamline and optimize various regulatory workflows. Although newer to the RA space, Mubashar showed an eagerness to learn more about regulatory requirements and processes, enabling him to better create solutions that support end users. His willingness to try new things, ability to iterate and learn as projects progress, openness to feedback, positive work ethic, and cheerful demeanor have made him a strong asset to the organization.",
  },
  {
    name: "Brendan Kenny",
    initials: "BK",
    position: "Development Director @ CHESS Health",
    context: "Managed me directly during my co-op",
    date: "January 2024",
    text: "Mubashar worked for me as a co-op in the second half of 2023. He did great work for us, and showed proficiency in to both backend and frontend technologies. He picks up concepts quickly, and always is on the look out for new ideas/technologies. He would be a great addition to any agile development team.",
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          title="What Managers Say about Me"
          eyebrow="Recommendations"
          description="Don't take my word for it. Here's what the people I've reported to wrote about me on LinkedIn."
        />
        <div className="mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec) => (
            <Card key={rec.name} className="p-6 md:p-8 flex flex-col">
              <span aria-hidden className="font-serif text-6xl leading-none h-8 bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                &ldquo;
              </span>
              <blockquote className="mt-4 text-sm md:text-base text-white/80 flex-1">
                {rec.text}
              </blockquote>
              <div className="mt-6 pt-6 border-t border-white/10 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 font-semibold inline-flex items-center justify-center flex-none">
                  {rec.initials}
                </div>
                <div>
                  <div className="font-semibold">{rec.name}</div>
                  <div className="text-sm text-white/50">{rec.position}</div>
                  <div className="text-xs text-white/40 mt-1">
                    {rec.context} &middot; {rec.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.linkedin.com/in/mubashar-warriach/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/5 transition"
          >
            <LinkedInIcon className="size-4" />
            <span>Read them on LinkedIn</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
