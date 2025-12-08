import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { assignment3 } from './data/assignmentData';
import { PageContainer, ExerciseBlock, Prompt } from './components/TerminalComponents';
import { Controls } from './Controls';

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

const PrintWrapper = styled.div`
  @media print {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 9999;
  }
`;

export default function App() {
  const [config, setConfig] = useState({
    hostName: 'iteradmin-Vostro-1234',
    regNo: '234101234',
    assignNo: '3',
  });

  const handlePrint = () => {
    window.print();
  };

  const basePath = `~/DOS_${config.regNo}/DOSass${config.assignNo}`;

  return (
    <>
      <GlobalStyles />
      <Layout>
        <Controls 
          config={config} 
          setConfig={setConfig} 
          onPrint={handlePrint} 
        />

        <PreviewArea>
          <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport className="ScrollAreaViewport">
              
              <PrintWrapper>
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
                  
                  <div style={{ marginTop: '20px' }}>
                     <Prompt 
                      user="student" 
                      host={config.hostName} 
                      path={basePath} 
                      cmd="echo 'All done'" 
                    />
                    <div style={{color: '#000'}}>All done</div>
                  </div>

                </PageContainer>
              </PrintWrapper>

            </ScrollArea.Viewport>
            
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </PreviewArea>
      </Layout>
    </>
  );
}