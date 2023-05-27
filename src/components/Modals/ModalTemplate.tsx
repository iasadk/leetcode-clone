"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import ResetPassModal from "./ResetPassModal";
import { ModalTypes, authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
type Props = {};

const ModalTemplate = (props: Props) => {
  const authModal = useRecoilValue(authModalState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const handlCloseModal = () => {
    setAuthModalState((prev) => ({ type: ModalTypes.Login, isOpen: false }));
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-orange-500 to-yellow-300 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white w-[25px] justify-center"
                onClick={handlCloseModal}
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
