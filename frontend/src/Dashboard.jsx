import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="Dashboard">
      <div className="Dashboard-card">
        <h2>Bookings dashboard</h2>
        <p className="Dashboard-subtitle">
          Quick overview of your current bookings.
        </p>
        <div className="Dashboard-grid">
          <div className="Dashboard-stat">
            <span className="Dashboard-stat-label">Total bookings</span>
            <span className="Dashboard-stat-value">{data.totalBookings ?? "--"}</span>
          </div>
          <div className="Dashboard-stat">
            <span className="Dashboard-stat-label">Pending</span>
            <span className="Dashboard-stat-value">{data.pendingBookings ?? "--"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
