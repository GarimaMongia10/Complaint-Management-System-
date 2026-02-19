import React, { useState } from "react";
import { createComplaint } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComplaint(formData);
      alert("Complaint created successfully");
      navigate("/complaints");
    } catch (error) {
      console.error(error);
      alert("Failed to create complaint");
    }
  };

  return (
    <div>
      <h2>Create New Complaint</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <select name="category" onChange={handleChange}>
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
        </select>

        <button type="submit">Create Complaint</button>
      </form>
    </div>
  );
};

export default CreateComplaint;
