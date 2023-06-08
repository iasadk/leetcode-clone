import { ModalTypes, authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { makeToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Toaster, toast } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

type Props = {};

const LoginModal = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleResetPassModal = () => {
    setAuthModalState((prev) => ({ ...prev, type: ModalTypes.ForgotPass }));
  };
  const handleRegisterModal = () => {
    setAuthModalState((prev) => ({ ...prev, type: ModalTypes.Register }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      makeToast("All fields are required", "error");
      return;
    } else {
      try {
        toast.promise(
          signInWithEmailAndPassword(inputs.email, inputs.password),
          {
            loading: "Verifying...",
            success: (data) => {
              if (!data) throw new Error(`Verification Failed.`);
              router.push("/");
              return <b>Authorized.</b>;
            },
            error: <b>Verification Failed.</b>,
          }
        );
      } catch (error: any) {
        makeToast(error.message, "error", "650px");
      }
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        makeToast("User Not found", "error");
      } else {
        makeToast(error.code, "error");
      }
    }
  }, [error]);
  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-white"
        >
          Your Email
        </label>
        <input
          onChange={(e) => handleInputChange(e)}
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
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-white"
        >
          Your Password
        </label>
        <input
          onChange={(e) => handleInputChange(e)}
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
        Log In
      </button>
      <button className="flex w-full justify-end cursor-pointer">
        <span
          className="text-sm block text-orange-900 hover:underline w-full text-right"
          onClick={handleResetPassModal}
        >
          Forgot Password?
        </span>
      </button>
      <div
        className="text-sm font-medium text-gray-900 cursor-pointer"
        onClick={handleRegisterModal}
      >
        Not Registered?{" "}
        <span className="text-blue-700 hover:underline">Create account</span>
      </div>
    </form>
  );
};

export default LoginModal;
