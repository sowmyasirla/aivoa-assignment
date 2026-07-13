import "./App.css";
import { useState } from "react";
import InteractionForm from "./components/InteractionForm";
import AIChat from "./components/AIChat";

function App() {
  const [formData, setFormData] = useState({
    hcpName: "",
    interactionType: "",
    date: "",
    time: "",
    topics: "",
    materials: "",
    followUp: "",
  });

  return (
    <div className="container">
      <div className="left-panel">
        <InteractionForm formData={formData} />
      </div>

      <div className="right-panel">
        <AIChat setFormData={setFormData} />
      </div>
    </div>
  );
}

export default App;