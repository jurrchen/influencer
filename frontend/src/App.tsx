import 'bootstrap/dist/css/bootstrap.min.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Chat from "./Chat";
import Website from './Website';

function App() {
  return (
    <div style={{display: 'flex'}}>
      <div>
        <Website />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  )
}

export default App
