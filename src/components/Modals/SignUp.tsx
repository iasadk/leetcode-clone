import { ModalTypes, authModalState } from "@/atoms/authModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

type Props = {};

const SignUp = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleLoginModal = () => {
    setAuthModalState((prev) => ({ ...prev, type: ModalTypes.Login }));
  };
  return (
    <form className="space-y-6 px-6 pb-4">
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-white"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5
            bg-gray-100 border-gray-200 placeholder-gray-600 text-black
        "
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-white"
        >
          Display Name
        </label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5
            bg-gray-100 border-gray-200 placeholder-gray-600 text-black
        "
          placeholder="John Wick"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-white"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5
            bg-gray-100 border-gray-200 placeholder-gray-600 text-black

        "
          placeholder="*******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-gray-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            "
      >
        Create Account
      </button>
      <div className="text-sm font-medium text-gray-900 cursor-pointer" onClick={handleLoginModal}>
        Already Registered?{" "}
        <span className="text-blue-700 hover:underline">
          login
        </span>
      </div>
    </form>
  );
};

export default SignUp;
