"use client";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";

import { DBProblem, Problem } from "@/utils/types/problem";
import Image from "next/image";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useState, useEffect } from "react";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import CircleSkeleton from "./Skeletons/CircleSkeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeToast, makeToastIcon } from "@/utils/toast";
type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [user] = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction: any) => {
    // Doing Read Operation for fetching data from DB
    const userRef = doc(firestore, "users", user!.uid);
    const problemRef = doc(firestore, "problems", problem.id);

    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);

    return { userDoc, problemDoc, userRef, problemRef };
  };
  const handleLike = async () => {
    // If User Not Exist's
    if (!user) {
      makeToastIcon("Login Required", "👽");
      return;
    }
    if (updating) return;
    setUpdating(true);
    // Initiating Transactions :
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        // If Problem is Already Liked :
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setData((prev) => ({ ...prev, liked: false }));
        }
        // If problem is already disliked
        else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, liked: true, disliked: false }));
        }
        // If problem is neither like or dislike :
        else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
		if (!user) {
			makeToastIcon("Login Required", "👽");
      return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
			if (userDoc.exists() && problemDoc.exists()) {
				// already disliked, already liked, not disliked or liked
				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
          // Updating State of component
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
          // Updating State of component
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
          // Updating State of component
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});
		setUpdating(false);
	};

  const handleStar = async () => {
		if (!user) {
			makeToastIcon("Login Required", "👽");
      return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};
  return (
    <div className="bg-dark-layer-1 ">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto  border-red-500">
        <div className="px-5  w-full">
          {/* Problem heading */}
          <div className="w-full ">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {currentProblem.difficulty}
                </div>
                {solved && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)}
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                  onClick={handleLike}
                >
                  {liked && !updating && (
                    <AiFillLike className="text-dark-blue-s" />
                  )}
                  {!liked && !updating && <AiFillLike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                  <span className="text-xs">{currentProblem.likes}</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6" onClick={handleDislike}>
                  {disliked && !updating && (
                    <AiFillDislike className="text-dark-blue-s" />
                  )}
                  {!disliked && !updating && <AiFillDislike />}
                  {updating && (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  )}
                  <span className="text-xs">{currentProblem.dislikes}</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 " onClick={handleStar}>
                {starred && !updating && <AiFillStar className='text-dark-yellow' />}
									{!starred && !updating && <TiStarOutline />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
                </div>
              </div>
            )}
            {/* Loading Skeleton for problem stats */}
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}
            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {/* Example 1 */}
              {problem.examples.map((v, i) => (
                <div key={v.id}>
                  <p className="font-medium text-white ">Example {i + 1}: </p>
                  {v.img && (
                    <Image
                      src={v.img}
                      alt={`visualization-${problem.id}`}
                      height={500}
                      width={500}
                    />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {v.inputText}
                      <br />
                      <strong>Output:</strong> {v.outputText} <br />
                      {v.explanation && (
                        <>
                          <strong>Explanation:</strong>
                          {v.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul
                className="text-white mt-1"
                dangerouslySetInnerHTML={{ __html: problem.constraints }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    // Getting problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        // easy, medium, hard - difficulty levels
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };

    if (user) getUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);

  return { ...data, setData };
}
