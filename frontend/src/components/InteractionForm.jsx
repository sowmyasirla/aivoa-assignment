export default function InteractionForm({ formData }) {
  return (
    <div>
      <h1>Log HCP Interaction</h1>

      <label>HCP Name</label>
      <input value={formData.hcpName} readOnly />

      <label>Interaction Type</label>
      <input value={formData.interactionType} readOnly />

      <label>Date</label>
      <input type="date" value={formData.date} readOnly />

      <label>Time</label>
      <input type="time" value={formData.time} readOnly />

      <label>Topics Discussed</label>
      <textarea value={formData.topics} readOnly />

      <label>Materials Shared</label>
      <textarea value={formData.materials} readOnly />

      <label>Follow-up Actions</label>
      <textarea value={formData.followUp} readOnly />
    </div>
  );
}