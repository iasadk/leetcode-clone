"use client";
import {useState} from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";
import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
type Props = {
  currentProblem: Problem,
};

const Workspace = ({ currentProblem }: Props) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false)
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={currentProblem} _solved={solved}/>
      <div className="bg-dark-fill-2">
        <Playground problem={currentProblem} setSuccess={setSuccess} setSolved={setSolved}/>
        {success && <Confetti
          width={width - 1}
          height={height - 1}
          gravity={0.3}
          tweenDuration={4000}
        />}
      </div>
    </Split>
  );
};

export default Workspace;
