"use client";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillYoutube } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
type Props = {
  setLoadingProblems : React.Dispatch<React.SetStateAction<boolean>>
};

function ProblemsTable({setLoadingProblems}: Props) {
  const [youtubeState, setYoutubeState] = useState({
    isOpen: false,
    videoId: "",
  });
	const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  console.log(problems)
  const closeModal = () => {
    setYoutubeState((prev) => ({ videoId: "", isOpen: false }));
  };
  useEffect(() => {
    // For YoutubePlayer : 
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficulyColor =
            problem.difficulty === "Easy"
              ? "text-dark-green-s"
              : problem.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                
                {solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={"18"} width="18" />}
              </th>
              <td className="px-6 py-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {problem.difficulty}
              </td>
              <td className={"px-6 py-4"}>{problem.category}</td>
              <td className={"px-6 py-4"}>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600 text-red-500"
                    onClick={() =>
                    	setYoutubeState({ isOpen: true, videoId: problem.videoId as string })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubeState.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtubeState.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
}

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			// fetching data logic
			setLoadingProblems(true);
			try {
        const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp: DBProblem[] = [];
			querySnapshot.forEach((doc : any) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
      setProblems(tmp);
      } catch (error) {
        console.log(error)
      }
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}
function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth)
	useEffect(() => {
		const getProblems = async () => {
			// fetching data logic
			try {
        const docRef = doc(firestore, "users", user!.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          setSolvedProblems(docSnap.data()!.solvedProblems);
        }
      }
      catch(e){
        alert("Error While fetching solved Problems!!");
      }
      
		};
    if(user) getProblems();
    if(!user) setSolvedProblems([]);
	}, [user]);
	return solvedProblems;
}