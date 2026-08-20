// Task 1: AppointmentCard is a reusable, purely presentational component.
// It receives everything through props from its parent — it holds no state of its own.
// Props required: patientName, doctorName, date, timeSlot, status
function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  // status drives which CSS class is applied, which is what changes its appearance
  const statusClass = `status-badge status-${status}`;

  return (
    <div className="appointment-card">
      <div className="appointment-card-row">
        <span className="label">Patient:</span> <span>{patientName}</span>
      </div>
      <div className="appointment-card-row">
        <span className="label">Doctor:</span> <span>{doctorName}</span>
      </div>
      <div className="appointment-card-row">
        <span className="label">Date:</span> <span>{date}</span>
      </div>
      <div className="appointment-card-row">
        <span className="label">Time Slot:</span> <span>{timeSlot}</span>
      </div>
      <div className="appointment-card-row">
        <span className={statusClass}>{status}</span>
      </div>
    </div>
  );
}

export default AppointmentCard;
