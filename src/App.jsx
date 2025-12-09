import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import jsPDF from "jspdf";

import { assignment3 } from "./data/assignmentData";
import {
  PageContainer,
  ExerciseBlock,
  Prompt,
} from "./components/TerminalComponents";
import { Controls } from "./Controls";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background: #0f172a;
  }

  .ScrollAreaScrollbar {
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background: transparent;
    transition: background 160ms ease-out;
  }
  .ScrollAreaScrollbar:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .ScrollAreaThumb {
    flex: 1;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    position: relative;
  }
`;

const Layout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const PreviewArea = styled.main`
  flex: 1;
  background: #334155;
  display: flex;
  justify-content: center;

  .ScrollAreaRoot {
    width: 100%;
    height: 100%;
  }

  .ScrollAreaViewport {
    width: 100%;
    height: 100%;
    padding: 40px;
    display: flex;
    justify-content: center;
  }
`;

export default function App() {
  const [config, setConfig] = useState({
    hostName: "iteradmin-Vostro-1234",
    regNo: "234101234",
    assignNo: "3",
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const lineHeight = 5;
    const fontSize = 10;
    const contentWidth = pageWidth - margin * 2;

    let cursorY = 10;

    doc.setFont("courier", "normal");
    doc.setFontSize(fontSize);

    const checkPageBreak = (heightNeeded = lineHeight) => {
      if (cursorY + heightNeeded > pageHeight - margin) {
        doc.addPage();
        cursorY = 20; // Reset to top margin
      }
    };

    const drawPrompt = (cmd) => {
      const userHost = `${"student"}@${config.hostName}`;
      const path = `~/DOS_${config.regNo}/DOSass${config.assignNo}`;

      checkPageBreak();

      doc.setTextColor(78, 154, 6); // #4e9a06
      doc.setFont("courier", "bold");
      doc.text(userHost, margin, cursorY);
      const userWidth = doc.getTextWidth(userHost);

      doc.setTextColor(0, 0, 0);
      doc.text(":", margin + userWidth, cursorY);
      const sep1Width = doc.getTextWidth(":");

      doc.setTextColor(52, 101, 164); // #3465a4
      doc.text(path, margin + userWidth + sep1Width, cursorY);
      const pathWidth = doc.getTextWidth(path);

      doc.setTextColor(0, 0, 0);
      doc.text("$ ", margin + userWidth + sep1Width + pathWidth, cursorY);
      const sep2Width = doc.getTextWidth("$ ");

      if (cmd) {
        const startX = margin + userWidth + sep1Width + pathWidth + sep2Width;
        doc.setFont("courier", "normal"); // Commands aren't usually bold in terminals, but adjustable
        doc.text(cmd, startX, cursorY);
      }

      cursorY += lineHeight;
    };

    const drawOutput = (text) => {
      if (!text) return;

      doc.setFont("courier", "normal");
      doc.setTextColor(0, 0, 0); // Black

      const lines = doc.splitTextToSize(text, contentWidth);

      lines.forEach((line) => {
        checkPageBreak();
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
    };

    const drawHeader = (id, text) => {
      checkPageBreak(lineHeight * 2);
      cursorY += 5; // Extra spacing before header

      doc.setFont("courier", "bold");
      doc.setTextColor(100, 100, 100); // Greyish
      doc.text(`QUESTION ${id}: ${text.toUpperCase()}`, margin, cursorY);

      const textWidth = doc.getTextWidth(
        `QUESTION ${id}: ${text.toUpperCase()}`
      );
      doc.setDrawColor(221, 221, 221); // Light grey line
      doc.line(margin, cursorY + 1, margin + textWidth, cursorY + 1);

      doc.setFont("courier", "normal"); // Reset
      cursorY += lineHeight * 1.5;
    };

    drawPrompt(`echo "Starting Assignment ${config.assignNo}"`);

    assignment3.forEach((q) => {
      drawHeader(q.id, q.question);

      drawPrompt(`nano ${q.filename}`);
      drawOutput(q.code);

      q.commands.forEach((cmdStep) => {
        drawPrompt(cmdStep.cmd);
        if (cmdStep.output) {
          drawOutput(cmdStep.output);
        }
      });
    });

    cursorY += 5;
    drawPrompt("echo 'All done'");
    drawOutput("All done");

    doc.save(`assignment_${config.assignNo}_${config.regNo}.pdf`);
  };

  const basePath = `~/DOS_${config.regNo}/DOSass${config.assignNo}`;

  return (
    <>
      <GlobalStyles />
      <Layout>
        <Controls config={config} setConfig={setConfig} onPrint={generatePDF} />

        <PreviewArea>
          <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport className="ScrollAreaViewport">
              <PageContainer>
                <Prompt
                  user="student"
                  host={config.hostName}
                  path={basePath}
                  cmd={`echo "Starting Assignment ${config.assignNo}"`}
                />

                {assignment3.map((q) => (
                  <ExerciseBlock
                    key={q.id}
                    data={q}
                    user="student"
                    host={config.hostName}
                    basePath={basePath}
                  />
                ))}

                <div style={{ marginTop: "20px" }}>
                  <Prompt
                    user="student"
                    host={config.hostName}
                    path={basePath}
                    cmd="echo 'All done'"
                  />
                  <div style={{ color: "#000" }}>All done</div>
                </div>
              </PageContainer>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </PreviewArea>
      </Layout>
    </>
  );
}
