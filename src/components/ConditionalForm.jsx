import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export function ConditionalForm({ form, onChange }) {
  return (
    <StyledConditionalForm
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <ConditionalHeader>
        <strong>Assignment 1 requires extra details.</strong>
        <div
          style={{
            fontSize: "0.75rem",
            color: "#94a3b8",
            marginTop: "0.25rem",
          }}
        >
          This data will{" "}
          <span style={{ fontWeight: 600, color: "#fca5a5" }}>not</span> be
          stored on any server — it's asked in the assignment. You may enter
          random values.
        </div>
      </ConditionalHeader>

      <FormGrid>
        <FormInput
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
        />
        <FormInput
          name="branch"
          value={form.branch}
          onChange={onChange}
          placeholder="Branch"
        />
        <FormInput
          name="semester"
          value={form.semester}
          onChange={onChange}
          placeholder="Semester"
        />
        <FormInput
          name="section"
          value={form.section}
          onChange={onChange}
          placeholder="Section"
        />
        <FormInput
          $span
          name="sgpa"
          value={form.sgpa}
          onChange={onChange}
          placeholder="Sem wise SGPA (comma separated)"
        />
        <FormInput
          $span
          name="address"
          value={form.address}
          onChange={onChange}
          placeholder="Address"
        />
      </FormGrid>
    </StyledConditionalForm>
  );
}

const StyledConditionalForm = styled(motion.div)`
  margin-top: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  overflow: hidden;
`;

const ConditionalHeader = styled.div`
  font-size: 0.875rem;
  color: #cbd5e1;
  margin-bottom: 0.75rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FormInput = styled.input`
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.75rem;
  border: 1px solid #334155;
  width: 100%;
  color: #e2e8f0;

  &::placeholder {
    color: #64748b;
    font-size: .9rem;
  }

  &:focus {
    outline: none;
    border-color: #34d399;
  }

  ${(props) =>
    props.$span &&
    `
    @media (min-width: 768px) {
      grid-column: span 2 / span 2;
    }
  `}
`;
