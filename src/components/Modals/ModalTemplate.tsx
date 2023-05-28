"use client";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import ResetPassModal from "./ResetPassModal";
import { ModalTypes, authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { usePathname,useRouter } from "next/navigation";
type Props = {};

const ModalTemplate = (props: Props) => {
  const authModal = useRecoilValue(authModalState);
  const handleCloseModal = useCloseModal();
  
  
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={handleCloseModal}
      >
      <Toaster />

      </div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-orange-500 to-yellow-300 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white w-[25px] justify-center"
                onClick={handleCloseModal}
              >
                <AiOutlineClose />
              </button>
            </div>
            {authModal.type === "login" && <LoginModal />}
            {authModal.type === "register" && <SignUp />}
            {authModal.type === "forgotpassword" && <ResetPassModal />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTemplate;

const useCloseModal = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModalState((prev) => ({
      ...prev,
      isOpen: false,
      type: ModalTypes.Login,
    }));
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return closeModal;
};
