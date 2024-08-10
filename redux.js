import React, { useState } from 'react';
import axios from 'axios';
import './Booked.css'; // Import the CSS file

const Booked = () => {
  const [formData, setFormData] = useState({
    riderName: '',
    riderAge: '',
    riderGender: '',
    riderExperience: '',
    riderContact: '',
    riderEmail: '',
    tourName: '',
    accommodationType: '',
    numRiders: '',
    tripType: '',
    bikeType: '',
    bikeModel: '',
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.riderName === '' || formData.riderEmail === '') {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Form Data Submitted:', response.data);
        setIsPopupVisible(true);
        setFormData({
          riderName: '',
          riderAge: '',
          riderGender: '',
          riderExperience: '',
          riderContact: '',
          riderEmail: '',
          tourName: '',
          accommodationType: '',
          numRiders: '',
          tripType: '',
          bikeType: '',
          bikeModel: '',
        });
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-section">
            <legend>Riders Information</legend>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="riderName">Name:</label>
                <input
                  type="text"
                  id="riderName"
                  name="riderName"
                  value={formData.riderName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="riderAge">Age:</label>
                <input
                  type="number"
                  id="riderAge"
                  name="riderAge"
                  value={formData.riderAge}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="riderGender">Gender:</label>
                <select
                  id="riderGender"
                  name="riderGender"
                  value={formData.riderGender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="riderExperience">Riders Experience:</label>
                <input
                  type="text"
                  id="riderExperience"
                  name="riderExperience"
                  value={formData.riderExperience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="riderContact">Contact Number:</label>
                <input
                  type="text"
                  id="riderContact"
                  name="riderContact"
                  value={formData.riderContact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="riderEmail">Email:</label>
                <input
                  type="email"
                  id="riderEmail"
                  name="riderEmail"
                  value={formData.riderEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Trip Information</legend>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="tourName">Tour Name:</label>
                <input
                  type="text"
                  id="tourName"
                  name="tourName"
                  value={formData.tourName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="accommodationType">Accommodation Type:</label>
                <select
                  id="accommodationType"
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="twin">Twin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="numRiders">Number of Riders:</label>
                <input
                  type="number"
                  id="numRiders"
                  name="numRiders"
                  value={formData.numRiders}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tripType">Type of Trip:</label>
                <select
                  id="tripType"
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="fixed">Fixed Departure</option>
                  <option value="custom">Customized</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bikeType">Bike Type:</label>
                <input
                  type="text"
                  id="bikeType"
                  name="bikeType"
                  value={formData.bikeType}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bikeModel">Bike Model:</label>
                <input
                  type="text"
                  id="bikeModel"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-content">
                <button className="popup-close" onClick={closePopup}>✖</button>
                <h3>Booking Confirmed!</h3>
                <p>Your booking has been successfully submitted.</p>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booked;
