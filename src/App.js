import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "username",
    email: "",
    phone: "",
    dob: "2025-07-09",
  });

  const modalRef = useRef(null);

  // Detect click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // if (!email.includes("@")) {
    //   alert("Invalid email. Please check your email address.");
    //   return;
    // }

    // Step-by-step validation per field to match Cypress tests
    // if (!username) {
    //   alert("Please fill all fields.");
    //   return;
    // }
    // if (!email) {
    //   alert("Please fill all fields.");
    //   return;
    // }
    // if (!email.includes("@")) {
    //   alert("Invalid email. Please check your email address.");
    //   return;
    // }
    // if (!phone) {
    //   alert("Please fill all fields.");
    //   return;
    // }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number");
      return;
    }
    // if (!dob) {
    //   alert("Please fill all fields.");
    //   return;
    // }
    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      alert("Invalid date of birth");
      return;
    }

    // All validations passed
    setShowModal(true);
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  return (
    <div className="app" id="root">
      {!showModal && (
        <button onClick={() => setShowModal(true)}>Open Form</button>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
