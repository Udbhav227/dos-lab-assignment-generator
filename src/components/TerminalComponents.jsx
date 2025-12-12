import React from 'react';
import styled from 'styled-components';

export const PageContainer = styled.div`
  background: white;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 15mm;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  color: #333;
  font-family: 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;

  @media print {
    width: 100%;
    margin: 0;
    padding: 10mm;
    box-shadow: none;
    
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

const TerminalLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  white-space: pre-wrap;
  word-break: break-all;
`;

const PromptUser = styled.span`
  color: #4e9a06;
  font-weight: bold;
`;

const PromptPath = styled.span`
  color: #3465a4;
  font-weight: bold;
`;

const Separator = styled.span`
  color: #333;
  margin: 0 2px;
`;

const CommandText = styled.span`
  color: #333;
  margin-left: 8px;
  font-weight: 500;
`;

const OutputText = styled.div`
  color: #000;
  white-space: pre-wrap;
  margin-bottom: 12px;
  width: 100%;
`;

const SectionHeader = styled.div`
  border-bottom: 2px solid #ddd;
  margin-top: 30px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  font-family: sans-serif;
  color: #666;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  page-break-after: avoid;
`;

export const Prompt = ({ user, host, path, cmd }) => (
  <TerminalLine>
    <PromptUser>{user}@{host}</PromptUser>
    <Separator>:</Separator>
    <PromptPath>{path}</PromptPath>
    <Separator>$</Separator>
    {cmd && <CommandText>{cmd}</CommandText>}
  </TerminalLine>
);

export const Output = ({ children }) => {
  if (!children) return null;
  return <OutputText>{children}</OutputText>;
};

export const ExerciseBlock = ({ 
  data, 
  user, 
  host, 
  basePath 
}) => {
  const path = `${basePath}`;

  return (
    <div style={{ pageBreakInside: 'avoid' }}>
      <SectionHeader>Question {data.id}: {data.question}</SectionHeader>
      
      {/* 1. Show the code using 'nano' or 'cat' */}
      <Prompt 
        user={user} 
        host={host} 
        path={path} 
        cmd={`cat ${data.filename}`} 
      />
      <Output>{data.code}</Output>

      {/* 2. Show execution commands */}
      {data.commands.map((cmdStep, idx) => (
        <React.Fragment key={idx}>
          <Prompt 
            user={user} 
            host={host} 
            path={path} 
            cmd={cmdStep.cmd} 
          />
          <Output>{cmdStep.output}</Output>
        </React.Fragment>
      ))}
    </div>
  );
};