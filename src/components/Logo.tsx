import Image from "next/image";
import Home365 from "../../public/images/home356.jpg";

type LogoSizes = "lg" | "md" | "sm" | "xs";
type LogoDimensions = {
  width: number;
  height: number;
};

interface SizeProps {
  size: LogoSizes;
}
export default function Logo({ size }: SizeProps) {
  const logoVariations: Record<LogoSizes, LogoDimensions> = {
    xs: { width: 76, height: 40 },
    sm: { width: 102.57, height: 53.85 },
    md: { width: 129.79, height: 68.15 },
    lg: { width: 226.66, height: 119.01 },
  };
  return (
    <Image
      src={Home365}
      alt="Logo"
      width={logoVariations[size].width}
      height={logoVariations[size].height}
    />
  );
}
