import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export function ProgressBar({ progress }) {
  return (
    <ProgressTrack>
      <StyledProgressBar
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear" }}
      />
    </ProgressTrack>
  );
}

const ProgressTrack = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: #1e293b;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const StyledProgressBar = styled(motion.div)`
  height: 100%;
  background-color: rgba(52, 211, 153, 0.8);
`;
