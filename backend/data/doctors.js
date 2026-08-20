// Task 3: "appointments and doctors may initially be stored in in-memory arrays"
// This is a small hardcoded doctors list, separate from the Mongoose Doctor model in Task 5.
const doctors = [
  {
    id: "d1",
    name: "Dr. Aditi Sharma",
    email: "aditi.sharma@medcareplus.com",
    specialisation: "Cardiology",
    available: true,
  },
  {
    id: "d2",
    name: "Dr. Rohan Mehta",
    email: "rohan.mehta@medcareplus.com",
    specialisation: "Orthopedics",
    available: false,
  },
  {
    id: "d3",
    name: "Dr.Nair",
    email: "priya.nair@medcareplus.com",
    specialisation: "Dermatology",
    available: true,
  },
];

// In-memory appointments array — starts empty, grows as POST requests come in.
// NOTE: this resets every time the server restarts (that's expected for Task 3;
// persistent storage is handled separately by Mongoose in Task 5).
const appointments = [];

module.exports = { doctors, appointments };
