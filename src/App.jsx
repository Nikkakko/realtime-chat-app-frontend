import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import styled from 'styled-components';

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chatpage />} />
      </Routes>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: #005279;
  display: flex;

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.281);

    &:hover {
      background: #555;
    }
  }
`;

export default App;
