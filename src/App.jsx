
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { SectionProvider } from './context/context';
function App() {

  return (
    <>
      <SectionProvider>
        <div className='flex'>
          <Sidebar />
          <Canvas />
        </div>
      </SectionProvider>
    </>
  );
}

export default App;
