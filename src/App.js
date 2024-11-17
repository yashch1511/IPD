import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Chatroom from './Chatroom';
import Project from './Project';
import Announcements from './Announcements';
import { auth } from './firebase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Announcements" element={<Announcements />} />
        <Route path="/Chatroom" element={<Chatroom />} />
        <Route path="/Project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
