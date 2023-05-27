'use client'
import { authModalState } from "@/atoms/authModalAtom";
import ModalTemplate from "@/components/Modals/ModalTemplate";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import {useRecoilValue} from "recoil"

type Props = {};

const AuthPage = (props: Props) => {
  const authModal = useRecoilValue(authModalState)

  return (
    <div className="bg-gradient-to-t from-slate-900 to-blue-900 h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex justify-center mt-36 ">
            <Image src={"/hero-img.png"} width={650} height={650} alt="Hero Image" className="md:w-[500px] lg:w-[650px] mobile:w-[300px] transition-all duration-300 ease-in-out"/>
        </div>
        {authModal.isOpen && <ModalTemplate/>}
      </div>
    </div>
  );
};

export default AuthPage;
