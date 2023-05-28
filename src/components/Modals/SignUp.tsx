import { ModalTypes, authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import React, { useEffect, useState} from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { makeToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
type Props = {};

const SignUp = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLoginModal = () => {
    setAuthModalState((prev) => ({ ...prev, type: ModalTypes.Login }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.displayName || !inputs.email || !inputs.password) {
      makeToast("All fields are required", "error");
      return;
    } else {
      try {
        toast.promise(
          createUserWithEmailAndPassword(inputs.email, inputs.password),
          {
            loading: "Registering..",
            success: (data) => {
              if (data === undefined) throw new Error(`Registration Failed.`);
              setInputs({
                email: "",
                displayName: "",
                password: "",
              })
              return <b>Registration Completed.</b>;
            },
            error: <b>Registration Failed.</b>,
          }
        );
      } catch (error: any) {
        makeToast(error.message, "error", "650px");
      }
    }
  };

  useEffect(() => {
    if (error) {
      if (error.code === "auth/email-already-in-use") {
        makeToast("Email already in use.", "error");
      } else {
        makeToast(error.code, "error");
      }
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
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
          value={inputs.email}
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
          onChange={(e) => handleInputChange(e)}
          type="text"
          name="displayName"
          value={inputs.displayName}
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
          onChange={(e) => handleInputChange(e)}
          type="password"
          name="password"
          value={inputs.password}
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
        {loading ? "Registring" : "Create Account"}
      </button>
      <div
        className="text-sm font-medium text-gray-900 cursor-pointer"
        onClick={handleLoginModal}
      >
        Already Registered?{" "}
        <span className="text-blue-700 hover:underline">login</span>
      </div>
    </form>
  );
};

export default SignUp;
