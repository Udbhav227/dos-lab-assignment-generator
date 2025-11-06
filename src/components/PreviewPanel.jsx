import React from "react";
import styled from "styled-components";

export default function PreviewPanel({ hostname, regNo, assignment }) {
  const host = hostname || "student@iteradmin-Vostro-1234";
  const reg = regNo || "234101234";
  const assgn = assignment || "1";

  const line = `${host}:~/DOS${reg}/DOSass${assgn}$ hello world`;

  return (
    <PreviewContainer>
      <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Preview</h2>
      <InfoText style={{ marginTop: "0.5rem" }}>
        Quick preview of the terminal
      </InfoText>
      <TerminalContainer>
        <Prompt>{line}</Prompt>
      </TerminalContainer>
    </PreviewContainer>
  );
}

const PreviewContainer = styled.div`
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #334155;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.1)
  );
  overflow: hidden; 
`;


const InfoText = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 1rem;
`;

const TerminalContainer = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  background-color: #ffffff;
  color: #333333;
  padding: 1rem 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.5;
  text-align: left;

  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: black transparent;
`;


const Prompt = styled.span`
  color: #007acc;
`;
