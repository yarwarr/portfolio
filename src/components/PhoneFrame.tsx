import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

export const PhoneFrame = ({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "relative rounded-[2.25rem] p-[6px] bg-gradient-to-b from-white/30 via-white/10 to-white/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div className="rounded-[1.9rem] overflow-hidden bg-black ring-1 ring-black">
        <Image src={src} alt={alt} className="block w-full h-auto" />
      </div>
    </div>
  );
};
