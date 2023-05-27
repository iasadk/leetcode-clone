import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
type Props = {};

const Navbar: React.FC<Props> = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex justify-between py-4 mobile:px-4">
      <Link href={"/"}>
        <Image src={"/logo-full.png"} width={150} height={150} alt="logo" />
      </Link>
      <button
        className="bg-brand-orange rounded-md px-2 py-1 font-medium hover:bg-white hover:text-black transition-colors duration-200 ease-in-out"
        onClick={handleClick}
      >
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
