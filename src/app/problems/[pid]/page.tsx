'use client'
import MainTopBar from "@/components/MainTopBar";
import Workspace from "@/components/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type ProblemPageProps = {
  data: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ data }) => {
  const pathname = usePathname();
  const [currentProblem, setCurrentProblem] = useState(
    problems[pathname.split("/")[2]]
  );
  useEffect(() => {
    setCurrentProblem(problems[pathname.split("/")[2]]);
  }, [pathname]);

  return (
    <div>
      <MainTopBar problemPage />
      <Workspace currentProblem={currentProblem}/>
    </div>
  );
};
export default ProblemPage;

// fetch the local data
//  SSG
// getStaticPaths => it create the dynamic routes
// export const getStaticPaths = async ()=> {
//   const paths = Object.keys(problems).map((key) => {
//     return {
//       params: { pid: key },
//     };
//   });

//   console.log(paths)
//   return {
//     paths,
//     fallback: false,
//   };
// }

// // getStaticProps => it fetch the data

// export const getStaticProps = async (context : any) => {
// 	const pid = context.params.pid
// 	// const problem = problems[pid];
// 	// console.log("first",pid,problem)
// 	const res = await fetch("'https://jsonplaceholder.typicode.com/todos/1'");
// 	const data = await res.json();
// 	// if (!problem) {
// 	// 	return {
// 	// 		notFound: true,
// 	// 	};
// 	// }
// 	// problem.handlerFunction = problem.handlerFunction.toString();
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// }
