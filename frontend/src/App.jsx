import './App.css';
import { Button } from "@chakra-ui/button"
import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="app">
      <Route path="/" exact component={Homepage}/>
      <Route path="/chat" component={ChatPage}/>
    </div>
  );
}

export default App;
