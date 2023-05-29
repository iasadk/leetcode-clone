import MainTopBar from "@/components/MainTopBar";
import { BsInstagram,BsGithub } from "react-icons/bs";
import { AiOutlineTwitter,AiOutlineMail } from "react-icons/ai";
import ProblemsTable from "@/components/ProblemsTable";
export default function Home() {
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
        {/* {loadingProblems && (
						<div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)} */}
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
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
}
