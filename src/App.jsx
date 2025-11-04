import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDownloadProcess } from "./hooks/useDownloadProcess";

import { Header } from "./components/Header";
import { MainForm } from "./components/MainForm";
import { PreviewDownload } from "./components/PreviewDownload";
import { Footer } from "./components/Footer";

export default function App() {
  const [regNo, setRegNo] = useState("");
  const [assignment, setAssignment] = useState("");
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    branch: "",
    semester: "",
    section: "",
    sgpa: "",
    address: "",
  });

  const { isProcessing, progress, completed, startProcessing } =
    useDownloadProcess();

  const requiresExtra = assignment === "1";

  const isDownloadEnabled = () => {
    if (!regNo.trim() || !assignment.trim()) return false;
    if (!requiresExtra) return true;
    
    return (
      studentDetails.name.trim() ||
      studentDetails.branch.trim() ||
      studentDetails.semester.trim() ||
      studentDetails.section.trim() ||
      studentDetails.sgpa.trim() ||
      studentDetails.address.trim()
    );
  };

  const isButtonDisabled = !isDownloadEnabled() || isProcessing;

  function handleDetailsChange(e) {
    setStudentDetails((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function triggerDownload() {
    const payload = {
      regNo,
      assignment,
      ...(requiresExtra ? { student: studentDetails } : {}),
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

  function handleDownloadClick() {
    startProcessing(triggerDownload);
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <MainCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MainGrid>
            <MainForm
              regNo={regNo}
              setRegNo={setRegNo}
              assignment={assignment}
              setAssignment={setAssignment}
              studentDetails={studentDetails}
              onDetailsChange={handleDetailsChange}
              requiresExtra={requiresExtra}
            />
            <PreviewDownload
              regNo={regNo}
              assignment={assignment}
              studentDetails={studentDetails}
              requiresExtra={requiresExtra}
              isProcessing={isProcessing}
              progress={progress}
              completed={completed}
              onDownloadClick={handleDownloadClick}
              isButtonDisabled={isButtonDisabled}
            />
          </MainGrid>
          <Footer />
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
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  `;

const MainCard = styled(motion.main)`
  background: rgba(26, 36, 55, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
  0 0 0 1px rgba(255, 255, 255, 0.04);
  border-radius: 1rem;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 0 2.5rem;
    padding-top: 2.5rem;
    padding-bottom: 1rem;
  }
  `;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: .75fr 1fr;
  }
`;