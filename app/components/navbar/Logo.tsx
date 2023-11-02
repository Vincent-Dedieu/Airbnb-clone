"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="170"
      width="170"
      //style={{ width: "auto", height: "auto" }} // to avoid warning in the console
      priority={true} // to avoid another warning in the console (LCP)
      src="/images/airbnb-clone.png"
    />
  );
};

export default Logo;
