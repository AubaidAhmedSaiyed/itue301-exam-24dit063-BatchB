import AppointmentCard from "../components/AppointmentCard.jsx";

// Sample data living in the PARENT (HomePage). This is what satisfies the
// requirement "Use props to pass appointment data from the parent component
// to AppointmentCard" — HomePage owns the data, AppointmentCard just renders it.
const sampleAppointments = [
  {
    id: 1,
    patientName: "Rahul Verma",
    doctorName: "Dr. Aditi Sharma",
    date: "2026-08-22",
    timeSlot: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Sneha Patil",
    doctorName: "Dr. Rohan Mehta",
    date: "2026-08-23",
    timeSlot: "2:30 PM",
    status: "pending",
  },
  {
    id: 3,
    patientName: "Aman Joshi",
    doctorName: "Dr. Priya Nair",
    date: "2026-08-20",
    timeSlot: "11:15 AM",
    status: "cancelled",
  },
];

function HomePage() {
  return (
    <div className="page">
      <h1>Welcome to MedCare Plus</h1>
      <p>Your appointments at a glance.</p>

      <div className="card-list">
        {sampleAppointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            patientName={appt.patientName}
            doctorName={appt.doctorName}
            date={appt.date}
            timeSlot={appt.timeSlot}
            status={appt.status}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
