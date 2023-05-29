"use client";
import { auth } from "@/firebase/firebase";
import { makeToast } from "@/utils/toast";
import React, { useEffect } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { AiOutlineLogout } from "react-icons/ai";
type Props = {
  x_distance?: String;
};

function Logout({x_distance = "-translate-x-2/4"}: Props) {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      makeToast("Bye 🥺", "success", "150px");
    } else {
      makeToast("Logout Failed!!", "error");
    }
  };
  useEffect(() => {
    if (error) makeToast(error.message, "error");
  }, [error]);
  return (
    <button onClick={handleLogout} className="cursor-pointer group relative">
      <AiOutlineLogout className="text-brand-orange" />
      <div className={`absolute top-[2.4rem] left-2/4 ${x_distance} mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out`}>
        <p className="text-sm">Logout</p>
      </div>
    </button>
  );
}

export default Logout;
