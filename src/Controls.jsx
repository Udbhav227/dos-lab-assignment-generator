import React from "react";
import styled from "styled-components";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Download, Banana } from "lucide-react";

const Panel = styled.aside`
  width: 350px;
  background: #1e293b;
  border-right: 1px solid #334155;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100vh;
  position: sticky;
  top: 0;
  color: #f8fafc;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled(LabelPrimitive.Root)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
`;

const Input = styled.input`
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 10px 12px;
  color: #fff;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #38bdf8;
  }
`;

const Footer = styled(Label)`
  margin-top: auto;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  line-height: 1.5;
`;

const StyledLink = styled.a`
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #7dd3fc;
    text-decoration: underline;
  }
`;

const PrintButton = styled.button`
  background: #38bdf8;
  color: #0f172a;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #7dd3fc;
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.9;

  img {
    height: 20px;
    border-radius: 3px;
  }
`;

export const Controls = ({ config, setConfig, onPrint }) => {
  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  return (
    <Panel>
      <Title>
        <div
          style={{
            width: 24,
            height: 24,
            background: "#38bdf8",
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Banana size={20} />
        </div>
        DPOSLabGen <span style={{ fontSize: "0.8em", opacity: 0.5 }}>v1</span>
      </Title>

      <FieldGroup>
        <Label htmlFor="hostname">Host Name</Label>
        <Input
          id="hostname"
          name="hostName"
          value={config.hostName}
          onChange={handleChange}
          placeholder="iteradmin-Vostro-1234"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="regNo">Registration No</Label>
        <Input
          id="regNo"
          name="regNo"
          value={config.regNo}
          onChange={handleChange}
          placeholder="234101234"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="assignNo">Assignment No</Label>
        <Input
          id="assignNo"
          name="assignNo"
          value={config.assignNo}
          onChange={handleChange}
          disabled={true}
          style={{ color: "grey", cursor: "not-allowed" }}
        />
      </FieldGroup>

      <PrintButton onClick={onPrint}>
        <Download size={18} />
        Download PDF
      </PrintButton>

      <Footer>
        <BadgeWrapper>
          <img
            src="https://visitor-badge.laobi.icu/badge?page_id=dposlabgen.home&left_text=Visitors+Count"
            alt="visitor count"
          />
        </BadgeWrapper>

        <span>
          Made with ❤️ by{" "}
          <StyledLink href="mailto:r6913096@gmail.com">Corvo</StyledLink>
        </span>
      </Footer>
    </Panel>
  );
};
