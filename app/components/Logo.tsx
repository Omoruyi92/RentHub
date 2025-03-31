import Image from "next/image";

export default function Logo() {
  return (
    <Image src="/logo.png" alt="Company Logo" width={100} height={500} className="rounded-md hover:scale-105"/>
  );
}