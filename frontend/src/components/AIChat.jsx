export default function AIChat() {
  return (
    <div>
      <h2>AI Assistant</h2>

      <div
        style={{
          height: "500px",
          border: "1px solid lightgray",
          padding: "15px",
          marginTop: "20px",
          marginBottom: "20px",
          overflowY: "auto",
        }}
      >
        Chat messages will appear here...
      </div>

      <input
        type="text"
        placeholder="Describe interaction..."
      />

      <button>Log</button>
    </div>
  );
}