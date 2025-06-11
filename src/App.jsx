
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { SectionProvider } from './context/context';
import Signup from './components/Signup';


const user = localStorage.getItem("user")
function App() {

  return (
    <>
      <SectionProvider>
        {!user ? (<Signup />) : (<div className='flex'>
          <Sidebar />
          <Canvas />
        </div>)}

      </SectionProvider>
    </>
  );
}

export default App;
