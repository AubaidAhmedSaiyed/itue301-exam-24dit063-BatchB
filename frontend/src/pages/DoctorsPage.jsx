import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/v1/doctors";

// Task 4: doctor data comes ONLY from the API — nothing here is hardcoded.
function DoctorsPage() {
  // Task 4 requires exactly these three states: data, loading, error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffect with an empty dependency array -> runs once, when the component mounts
    async function fetchDoctors() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        setData(result.data); // backend wraps the array inside { success, count, data }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  if (loading) return <div className="page">Loading doctors...</div>;
  if (error) return <div className="page error-text">Error: {error}</div>;

  return (
    <div className="page">
      <h1>Our Doctors</h1>
      <div className="card-list">
        {data.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Specialisation: {doctor.specialisation}</p>
            <p>Availability: {doctor.available ? "Available" : "Not available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;
