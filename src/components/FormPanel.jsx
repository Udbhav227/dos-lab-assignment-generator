import React from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { ConditionalForm } from "./ConditionalForm";
import { inputSelectBase } from "../styles/common";

export function FormPanel({
  hostname,
  setHostname,
  regNo,
  setRegNo,
  assignment,
  setAssignment,
  studentDetails,
  onDetailsChange,
  requiresExtra,
}) {
  return (
    <FormSection>
      <label>
        <LabelText>Host Name</LabelText>
        <StyledInput
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
          placeholder="e.g. student@iteradmin-Vostro-1234"
        />
      </label>

      <label>
        <LabelText>Registration Number</LabelText>
        <StyledInput
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="e.g. 20XXABC123"
        />
      </label>

      <label>
        <LabelText>Assignment</LabelText>
        <StyledSelect
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
        >
          <option value="">Select assignment</option>
          <option value="1">Assignment 1</option>
          <option value="2">Assignment 2</option>
          <option value="3">Assignment 3</option>
        </StyledSelect>
      </label>

      <AnimatePresence>
        {requiresExtra && (
          <ConditionalForm form={studentDetails} onChange={onDetailsChange} />
        )}
      </AnimatePresence>

      <InfoText>
        After filling inputs the{" "}
        <span style={{ fontWeight: 500, color: "#6ee7b7", }}>Download</span>{" "}
        button will be enabled.
      </InfoText>
    </FormSection>
  );
}

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LabelText = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  ${inputSelectBase}
`;

const StyledSelect = styled.select`
  ${inputSelectBase}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-TER,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;

  option {
    background-color: #0b1220;
    color: #e2e8f0;
  }
`;

const InfoText = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
`;
