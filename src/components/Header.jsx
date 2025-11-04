import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export function Header() {
  return (
    <StyledHeader
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeaderFlex>
        <div>
          <Title>AcadEasy</Title>
          <Subtitle>Assignments made easy</Subtitle>
        </div>
        <div style={{ textAlign: "right" }}>
          <StatusLabel>Status</StatusLabel>
          <StatusValue>Ready</StatusValue>
        </div>
      </HeaderFlex>
    </StyledHeader>
  );
}

const StyledHeader = styled(motion.header)`
  border-radius: 12px;
  margin-bottom: 1.5rem;
  padding: 0.75rem 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 4.5rem;
    padding: 1rem 1.5rem;
  }
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 64rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.25rem;
`;

const StatusLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #94a3b8;
`;

const StatusValue = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #34d399;
`;
