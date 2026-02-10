import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Bookings: {data.totalBookings}</p>
      <p>Pending: {data.pendingBookings}</p>
    </div>
  );
}

export default Dashboard;
