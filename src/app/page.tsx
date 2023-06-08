"use client";
import MainTopBar from "@/components/MainTopBar";
import { BsInstagram, BsGithub } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import ProblemsTable from "@/components/ProblemsTable";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { problems } from "@/mock/mockProblems";
import Image from "next/image";
export default function Home() {
  const [input, setInput] = useState({
    id: "",
    title: "",
    order: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
  });
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    // Converting order to int
    const newProblem = {
      ...input,
      order: Number(input.order),
    };
    // Add a new document in collection "problems"
    await setDoc(doc(firestore, "problems", input.id), newProblem);
  };

  // const addInBulk = async ()=>{
  //   problems.forEach(async (v) => {
  //   await setDoc(doc(firestore, "problems", v.id), {...v,link:"",likes:0,dislikes:0});
  //   })
  // }

  // useEffect(()=>{
  //   addInBulk();
  // },[])

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  return (
    <main className="min-h-screen bg-dark-layer-2">
      <MainTopBar />
      {/* <div className="w-5/12 flex items-center justify-around mx-auto mt-10">
        <div >
          <BsInstagram color="white" size={18}/>
        </div>
        <div>
          <AiOutlineTwitter color="white" size={18}/>
        </div>
        <div>
          <BsGithub color="white" size={18}/>
        </div>
        <div>
          <AiOutlineMail color="white" size={18}/>
        </div>
      </div> */}
      <div className="relative overflow-x-auto mx-auto px-6 pb-10 mt-12">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>

              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Solution
              </th>
            </tr>
          </thead>
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </table>
        {loadingProblems && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        <div>
          {isOnline ? (
            null
          ) : (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full flex justify-center flex-col items-center">
              <Image src={"/offline.png"} width={350} height={350} alt="offline-img" className="my-4"/>
              <p className="text-white text-2xl text-center mt-4 font-semibold">
                You are offline. Please check your internet connection.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* temp-form */}
      {/* <footer>
        <form
          action="#"
          className="flex flex-col justify-center bg-gray-400 p-2 gap-3 w-6/12 mx-auto my-4 pb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="id"
            name="id"
            value={input.id}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="title"
            name="title"
            value={input.title}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="difficulty"
            name="difficulty"
            value={input.difficulty}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="category"
            name="category"
            value={input.category}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="order"
            value={input.order}
            name="order"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            value={input.videoId}
            placeholder="videoId?"
            name="videoId"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-1 text-black outline-none rounded-sm"
            placeholder="link?"
            name="link"
            value={input.link}
            onChange={(e) => handleChange(e)}
          />
          <button className="bg-slate-700 px-2 py-1 text-white">
            Save to DB
          </button>
          <button
            className="bg-slate-700 px-2 py-1 text-white"
            onClick={(e) =>
              setInput({
                id: "",
                title: "",
                order: "",
                difficulty: "",
                category: "",
                videoId: "",
                link: "",
              })
            }
          >
            Clear All
          </button>
        </form>
      </footer> */}
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
