import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

import './App.css';

function App() {
  return (
    <div style={{display: 'flex'}}>
      <div className="panel left-panel">
        <Website />
      </div>
      <div className="panel right-panel">
        <Chat />
      </div>
    </div>
  )
}

export default App
