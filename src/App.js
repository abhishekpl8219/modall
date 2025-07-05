import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // Manual empty field validation
    if (!username || !email || !phone || !dob) {
      alert("Please fill all fields.");
      return;
    }

    // Phone validation - must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number");
      return;
    }

    // DOB validation - must not be in the future
    const today = new Date();
    const inputDate = new Date(dob);
    if (inputDate > today) {
      alert("Invalid date of birth");
      return;
    }

    // All validations passed
    setShowModal(false);
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
                  pattern="\d{10}"
                  title="Please enter exactly 10 digits"
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
                  max={new Date().toISOString().split("T")[0]}
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
