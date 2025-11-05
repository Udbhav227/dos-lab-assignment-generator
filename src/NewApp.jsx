import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FormPanel } from "./components/FormPanel";
import PreviewPanel from "./components/PreviewPanel";
import { ConditionalForm } from "./components/ConditionalForm";

// app wrapper styling
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(225deg, #141e30, #243b55);
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 64rem;
  color: #e2e8f0;
  padding: 1rem 1.5rem;
`;

// Header styling
const Header = styled(motion.header)`
  border-radius: 12px;
  margin-bottom: 1.5rem;
  padding: 0.75rem 0.5rem;
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 64rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
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

// Footer styling
const Footer = styled(motion.footer)`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #64748b;
`;

// MainPanel styling
const MainPanel = styled(motion.main)`
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
    grid-template-columns: .8fr 1fr;
  }
`;

const NewApp = () => {
  const [hostname, setHostname] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [assignment, setAssignment] = React.useState("");
  const [studentDetails, setStudentDetails] = React.useState({
    name: "",
    branch: "",
    semester: "",
    section: "",
    sgpa: "",
    address: "",
  });

  const requiresExtra = assignment === "1";

  function handleDetailsChange(e) {
    setStudentDetails((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  return (
    <Container>
      <Wrapper>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderFlex>
            <div>
              <Title>AcadEasy</Title>
              <Subtitle>DPOS lab assignment generator</Subtitle>
            </div>
            <div style={{ textAlign: "right" }}>
              <StatusLabel>Status</StatusLabel>
              <StatusValue>Ready</StatusValue>
            </div>
          </HeaderFlex>
        </Header>

        <MainPanel
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MainGrid>
            <FormPanel
              hostname={hostname}
              setHostname={setHostname}
              regNo={regNo}
              setRegNo={setRegNo}
              assignment={assignment}
              setAssignment={setAssignment}
              studentDetails={studentDetails}
              onDetailsChange={handleDetailsChange}
              requiresExtra={requiresExtra}
            />

            <PreviewPanel
              hostname={hostname}
              regNo={regNo}
              assignment={assignment}
              studentDetails={studentDetails}
            />
          </MainGrid>

          <Footer />
        </MainPanel>

        <Footer>
          <div>Made with ♥ in Tsunade Labs</div>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default NewApp;
