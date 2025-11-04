import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <StyledFooter>
      <div>Made with ♥ by Tsunade Labs</div>
    </StyledFooter>
  );
}

const StyledFooter = styled(motion.footer)`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #64748b;
`;
