"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      style={{ width: "auto", height: "auto" }} // to avoid warning in the console
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
