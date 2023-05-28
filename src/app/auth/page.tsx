"use client";
import { authModalState } from "@/atoms/authModalAtom";
import ModalTemplate from "@/components/Modals/ModalTemplate";
import Navbar from "@/components/Navbar";
import { auth } from "@/firebase/firebase";
import { makeToast, makeToastIcon } from "@/utils/toast";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";

type Props = {};

const AuthPage = (props: Props) => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const path = usePathname();
  // const router = useRouter();

  useEffect(() => {
    if (user) {
      makeToastIcon("Already Logged In.", '🧐');
      // TODO: TRY TO FIX THIS ISSUE OF TOAST NOT SHOWING BECAUSE OF REDIRECTING.
      // router.push("/");

    }
    if (!loading && !user) setPageLoading(false);
  }, [user, path, loading]);

  // if(pageLoading) return null;
  return (
    <>
      <Toaster />
      {!pageLoading && <div className="bg-gradient-to-t from-slate-900 to-blue-900 h-screen relative">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="flex justify-center mt-36 ">
            <Image
              src={"/hero-img.png"}
              width={650}
              height={650}
              alt="Hero Image"
              className="md:w-[500px] lg:w-[650px] mobile:w-[300px] transition-all duration-300 ease-in-out"
            />
          </div>
          {authModal.isOpen && <ModalTemplate />}
        </div>
      </div>}
    </>
  );
};

export default AuthPage;
