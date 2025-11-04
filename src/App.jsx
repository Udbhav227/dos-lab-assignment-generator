import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

export default function App() {
  const [regNo, setRegNo] = useState("");
  const [assignment, setAssignment] = useState("");
  const [form, setForm] = useState({
    name: "",
    branch: "",
    semester: "",
    section: "",
    sgpa: "",
    address: "",
  });
  const [downloadReady, setDownloadReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const requiresExtra = assignment === "1";

  const allRequiredFilled = () => {
    if (!regNo || !assignment) return false;
    if (!requiresExtra) return true;
    return (
      form.name.trim() ||
      form.branch.trim() ||
      form.semester.trim() ||
      form.section.trim() ||
      form.sgpa.trim() ||
      form.address.trim()
    );
  };

  function handleFormChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function startBackgroundWorkAndDownload() {
    // Enable visual 'background work' with animated progress and then trigger a download
    setIsProcessing(true);
    setCompleted(false);
    setProgress(0);
    // Simulate staged processing (fast but noticeable) using intervals
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 25 + 10);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setCompleted(true);
            triggerDownload();
            setDownloadReady(true);
          }, 350);
        }
        return next;
      });
    }, 300);
  }

  function triggerDownload() {
    const payload = {
      regNo,
      assignment,
      ...(requiresExtra ? { student: form } : {}),
      note: "This file was generated locally in your browser. Per the UI, the data is NOT stored on any server.",
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assignment-${assignment || "NA"}-reg-${
      regNo || "unknown"
    }.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Wrapper>
      <Container>
        <StyledHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderFlex>
            <div>
              <Title>MyApp</Title>
              <Subtitle>
                Dark, responsive, and animated UI — Vite + React ready
              </Subtitle>
            </div>
            <div style={{ textAlign: "right" }}>
              <StatusLabel>Status</StatusLabel>
              <StatusValue>Ready</StatusValue>
            </div>
          </HeaderFlex>
        </StyledHeader>

        <MainCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MainGrid>
            <FormSection>
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
                  <ConditionalForm
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
                        <span style={{ fontWeight: 600, color: "#fca5a5" }}>
                          not
                        </span>{" "}
                        be stored on any server — it's asked in the assignment.
                        You may enter random values.
                      </div>
                    </ConditionalHeader>

                    <FormGrid>
                      <FormInput
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="Name"
                      />
                      <FormInput
                        name="branch"
                        value={form.branch}
                        onChange={handleFormChange}
                        placeholder="Branch"
                      />
                      <FormInput
                        name="semester"
                        value={form.semester}
                        onChange={handleFormChange}
                        placeholder="Semester"
                      />
                      <FormInput
                        name="section"
                        value={form.section}
                        onChange={handleFormChange}
                        placeholder="Section"
                      />
                      <FormInput
                        $span
                        name="sgpa"
                        value={form.sgpa}
                        onChange={handleFormChange}
                        placeholder="Sem wise SGPA (comma separated)"
                      />
                      <FormInput
                        $span
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
                        placeholder="Address"
                      />
                    </FormGrid>
                  </ConditionalForm>
                )}
              </AnimatePresence>

              <InfoText>
                After filling inputs the{" "}
                <span style={{ fontWeight: 500, color: "#6ee7b7" }}>
                  Download
                </span>{" "}
                button will be enabled. Some processing will happen in the UI
                when you press it — everything runs locally in your browser.
              </InfoText>
            </FormSection>

            <FormSection>
              <PreviewBox>
                <div>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                    Preview
                  </h2>
                  <InfoText style={{ marginTop: "0.5rem" }}>
                    Quick preview of what will be generated
                  </InfoText>

                  <PreviewCode>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-words",
                      }}
                    >{`regNo: ${regNo || "(empty)"}
assignment: ${assignment || "(not selected)"}
${
  requiresExtra ? `name: ${form.name || "(empty)"}` : "(no extra data required)"
}`}</pre>
                  </PreviewCode>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <DownloadButton
                    whileTap={{ scale: 0.98 }}
                    onClick={startBackgroundWorkAndDownload}
                    disabled={!allRequiredFilled() || isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : completed
                      ? "Downloaded ✅"
                      : "Download"}
                  </DownloadButton>

                  <div style={{ marginTop: "0.75rem" }}>
                    <ProgressTrack>
                      <ProgressBar
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </ProgressTrack>
                    <InfoText
                      style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}
                    >
                      Progress: {Math.round(progress)}%
                    </InfoText>
                  </div>
                </div>
              </PreviewBox>
            </FormSection>
          </MainGrid>

          <StyledFooter>
            <div>Made with ♥ by Tsunade Labs</div>
            <div>Responsive • Animated • Dark</div>
          </StyledFooter>
        </MainCard>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(225deg, #141e30, #243b55);
  color: #e2e8f0;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 64rem;
`;

const StyledHeader = styled(motion.header)`
  margin-bottom: 1.5rem;
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const MainCard = styled(motion.main)`
  background: rgba(26, 36, 55, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04);

  border-radius: 1rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LabelText = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #cbd5e1;
  margin-bottom: 0.25rem;
`;

const inputSelectBase = `
  width: 100%;
  border-radius: 0.75rem; /* rounded-xl */
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #334155; /* border-slate-700 */
  padding: 0.75rem 1rem; /* px-4 py-3 */
  color: #e2e8f0;

  &::placeholder {
    color: #64748b; /* placeholder:text-slate-500 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34d399; /* focus:ring-2 focus:ring-emerald-400 */
    border-color: #34d399;
  }
`;

const StyledInput = styled.input`
  ${inputSelectBase}
`;

const StyledSelect = styled.select`
  ${inputSelectBase}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;

  option {
    background-color: #0b1220;
    color: #e2e8f0;
  }
`;

const ConditionalForm = styled(motion.div)`
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
  /* font-family: monospace; */
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

const ProgressTrack = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: #1e293b;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: rgba(52, 211, 153, 0.8);
`;

const StyledFooter = styled(motion.footer)`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
`;
