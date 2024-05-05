import EventSourcing from "./EventSourcing";
import LongPulling from "./LongPulling";
import WebSock from "./WebSock";

function App() {
  return (
    <div className="App">
      <div>
        <WebSock />
      </div>
    </div>
  );
}

export default App;
