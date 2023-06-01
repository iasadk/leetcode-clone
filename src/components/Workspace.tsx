'use client'
import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";
import { Problem } from "@/utils/types/problem";
type Props = {
  currentProblem: Problem
};

const Workspace = ({currentProblem}: Props) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={currentProblem}/>
      <Playground problem={currentProblem}/>
    </Split>
  );
};

export default Workspace;
