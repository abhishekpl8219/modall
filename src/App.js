import React, { useState } from "react";
import "./styles.css";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser validation behavior

    const { username, email, phone, dob } = formData;

    // Get form element to check HTML5 validity
    const form = e.target;
    const isValid = form.checkValidity();

    // Trigger browser validation UI
    form.reportValidity();

    if (!isValid) return; // Stop if basic validations fail

    // Validate phone number (ensure exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Validate date of birth (must not be in future)
    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return;
    }

    // Reset form values but keep modal open
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div>
      {/* Open Form Button */}
      <button
        onClick={openModal}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open Form
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content">
            <h2>Fill Details</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                title="Username must be at least 3 characters long."
              />

              {/* Email */}
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                title="Please enter a valid email address."
              />

              {/* Phone Number */}
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="\d*"
                title="Please enter a 10-digit phone number."
              />

              {/* Date of Birth */}
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              {/* Submit Button */}
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
