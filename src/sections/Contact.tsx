import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import grainImage from "@/assets/images/grain.jpg";

export const ContactSection = () => {
  return (
    <div className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0">
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{
              backgroundImage: `url(${grainImage.src})`,
            }}
          ></div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let&apos;s create something
              </h2>
              <p className="text-sm md:text-base mt-2">
                Ready to bring your next project to life? Let&apos;s connect and
                discuss if I can help you achieve your goals.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 flex-none">
              <a
                href="mailto:maw8051@rit.edu"
                className="text-white bg-gray-900 inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900"
              >
                <span className="font-semibold">Contact Me</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mubashar-warriach/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 hover:bg-gray-900/10 transition"
              >
                <LinkedInIcon className="size-4" />
                <span className="font-semibold">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
