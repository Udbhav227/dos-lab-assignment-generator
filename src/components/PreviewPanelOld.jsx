import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ProgressBar } from "./ProgressBar";

export function PreviewPanel ({
  regNo,
  assignment,
  studentDetails,
  requiresExtra,
  isProcessing,
  progress,
  completed,
  onDownloadClick,
  isButtonDisabled,
}) {
  const getPreviewText = () => {
    const mainData = `regNo: ${regNo || "(empty)"}
assignment: ${assignment || "(not selected)"}`;

    const extraData = requiresExtra
      ? `name: ${studentDetails.name || "(empty)"}`
      : "(no extra data required)";

    return `${mainData}\n${extraData}`;
  };

  const getButtonText = () => {
    if (isProcessing) return "Processing...";
    if (completed) return "Downloaded ✅";
    return "Download";
  };

  return (
    <PreviewBox>
      <div>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Preview</h2>
        <InfoText style={{ marginTop: "0.5rem" }}>
          Quick preview of the terminal
        </InfoText>

        <PreviewCode>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-words",
            }}
          >
            {getPreviewText()}
          </pre>
        </PreviewCode>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <DownloadButton
          whileTap={{ scale: 0.98 }}
          onClick={onDownloadClick}
          disabled={isButtonDisabled}
        >
          {getButtonText()}
        </DownloadButton>

        <div style={{ marginTop: "0.75rem" }}>
          <ProgressBar progress={progress} />
          <InfoText style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
            Progress: {Math.round(progress)}%
          </InfoText>
        </div>
      </div>
    </PreviewBox>
  );
}

const InfoText = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
`;

const PreviewBox = styled.div`
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #334155;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.1)
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PreviewCode = styled.div`
  margin-top: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.75rem;
  color: rgba(226, 232, 240, 0.8);
`;

const DownloadButton = styled(motion.button)`
  width: 100%;
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;

  background-color: #10b981;
  color: #000000;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &:disabled {
    background-color: #334155;
    color: #94a3b8;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
