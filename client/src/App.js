import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    notes: ""
  });

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leads/${id}`,
        { status }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/leads",
        formData
      );

      fetchLeads();

      setFormData({
        name: "",
        email: "",
        source: "",
        notes: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Mini CRM</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Add Lead
        </button>
      </form>

      <h2>Leads</h2>

      {leads.map((lead) => (
        <div className="lead-card" key={lead._id}>
          <h3>{lead.name}</h3>

          <p>Email: {lead.email}</p>

          <p>Source: {lead.source}</p>

          <p className={`status-${lead.status}`}>
            Status: {lead.status}
          </p>

          <div className="status-buttons">
            <button
              onClick={() =>
                updateStatus(lead._id, "new")
              }
            >
              New
            </button>

            <button
              onClick={() =>
                updateStatus(lead._id, "contacted")
              }
            >
              Contacted
            </button>

            <button
              onClick={() =>
                updateStatus(lead._id, "converted")
              }
            >
              Converted
            </button>
          </div>

          <p>Notes: {lead.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default App;