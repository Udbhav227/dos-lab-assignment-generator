import { css } from "styled-components";

export const inputSelectBase = css`
  width: 100%;
  border-radius: 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #334155;
  padding: 0.75rem 1rem;
  color: #e2e8f0;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34d399;
    border-color: #34d399;
  }
`;