import { useState } from "react";
import AppointmentCard from "../components/AppointmentCard.jsx";

const API_URL = "http://localhost:5000/api/v1/appointments";

function BookingPage() {
  // State value #1: all the form fields together
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    timeSlot: "",
    reason: "",
  });

  // State value #2: the appointment that was just booked (or null before submit).
  // This is used meaningfully — it switches what's rendered on the page.
  const [submittedAppointment, setSubmittedAppointment] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      const result = await response.json();
      setSubmittedAppointment(result.data); // triggers the confirmation card below
    } catch (err) {
      setSubmitError(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Book an Appointment</h1>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Patient Name
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Doctor Name
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>

        <label>
          Time Slot
          <input
            type="text"
            name="timeSlot"
            placeholder="e.g. 10:00 AM"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} />
        </label>

        <button type="submit">Book Appointment</button>
      </form>

      {/* Displays the entered patient name live, as formData state changes */}
      {formData.patientName && (
        <p className="live-preview">Booking for: {formData.patientName}</p>
      )}

      {submitError && <p className="error-text">Error: {submitError}</p>}

      {submittedAppointment && (
        <div className="confirmation">
          <h3>Appointment Requested</h3>
          <AppointmentCard
            patientName={submittedAppointment.patientName}
            doctorName={submittedAppointment.doctorName}
            date={submittedAppointment.date}
            timeSlot={submittedAppointment.timeSlot}
            status={submittedAppointment.status}
          />
        </div>
      )}
    </div>
  );
}

export default BookingPage;
