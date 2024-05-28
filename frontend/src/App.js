import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import CoverPage from './pages/CoverPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={CoverPage} exact />
        <Route path="/chats" component={ChatPage} />
        <Route path="/auth" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;
