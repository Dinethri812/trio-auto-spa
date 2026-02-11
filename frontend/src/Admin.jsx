import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVICES } from "./servicesData";
import "./Admin.css";

const API = "http://localhost:5000/api/bookings";
const AUTH_API = "http://localhost:5000/api/auth";

const getToken = () => localStorage.getItem("trio_admin_token");
const setToken = (t) => (t ? localStorage.setItem("trio_admin_token", t) : localStorage.removeItem("trio_admin_token"));
const getAuthHeaders = () => (getToken() ? { Authorization: `Bearer ${getToken()}` } : {});

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(null);
    axios
      .post(`${AUTH_API}/login`, loginForm)
      .then((res) => {
        setToken(res.data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => setLoginError(err.response?.data?.message || "Login failed"));
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setBookings([]);
    setEditing(null);
  };

  const fetchBookings = () => {
    if (!getToken()) return;
    setLoading(true);
    axios
      .get(API, { headers: getAuthHeaders() })
      .then((res) => {
        setBookings(res.data);
        setError(null);
      })
      .catch((err) => {
        if (err.response?.status === 401) handleLogout();
        else setError(err.response?.data?.message || "Failed to load bookings");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isLoggedIn) fetchBookings();
  }, [isLoggedIn]);

  const apiPatch = (url, body) =>
    axios.patch(url, body, { headers: getAuthHeaders() });

  const apiDelete = (url) =>
    axios.delete(url, { headers: getAuthHeaders() });

  const confirmBooking = (id) => {
    apiPatch(`${API}/${id}`, { status: "Confirmed" })
      .then(() => fetchBookings())
      .catch((err) => alert(err.response?.data?.message || "Failed to confirm"));
  };

  const rejectBooking = (id) => {
    apiPatch(`${API}/${id}`, { status: "Rejected" })
      .then(() => fetchBookings())
      .catch((err) => alert(err.response?.data?.message || "Failed to reject"));
  };

  const deleteBooking = (id) => {
    if (!window.confirm("Delete this booking?")) return;
    apiDelete(`${API}/${id}`)
      .then(() => fetchBookings())
      .catch((err) => alert(err.response?.data?.message || "Failed to delete"));
  };

  const startEdit = (b) => {
    setEditing(b._id);
    setEditForm({
      name: b.name,
      phone: b.phone,
      vehicleType: b.vehicleType,
      serviceName: b.serviceName,
      preferredDate: b.preferredDate ? new Date(b.preferredDate).toISOString().slice(0, 10) : "",
      message: b.message || "",
      status: b.status,
    });
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = (id) => {
    apiPatch(`${API}/${id}`, editForm)
      .then(() => {
        fetchBookings();
        setEditing(null);
      })
      .catch((err) => alert(err.response?.data?.message || "Failed to update"));
  };

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const canConfirmOrReject = (status) =>
    status !== "Confirmed" && status !== "Completed" && status !== "Rejected";

  if (!isLoggedIn) {
    return (
      <div className="Admin Admin-login">
        <header className="Admin-header">
          <div className="Admin-header-inner">
            <Link to="/" className="Admin-back">← Back to site</Link>
            <h1>Admin Login</h1>
          </div>
        </header>
        <main className="Admin-main Admin-login-main">
          <form className="Admin-login-form" onSubmit={handleLogin}>
            <h2>Sign in</h2>
            {loginError && <p className="Admin-login-error">{loginError}</p>}
            <div className="Admin-login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                autoComplete="username"
              />
            </div>
            <div className="Admin-login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="Admin-btn Admin-btn-primary Admin-login-submit">
              Log in
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="Admin">
      <header className="Admin-header">
        <div className="Admin-header-inner">
          <Link to="/" className="Admin-back">← Back to site</Link>
          <h1>Admin — Bookings</h1>
          <button type="button" className="Admin-btn Admin-btn-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="Admin-main">
        {loading && <p className="Admin-message">Loading bookings...</p>}
        {error && <p className="Admin-error">{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <p className="Admin-message">No bookings yet.</p>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="Admin-table-wrap">
            <table className="Admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className={editing === b._id ? "Admin-row-editing" : ""}>
                    {editing === b._id ? (
                      <>
                        <td colSpan={7} className="Admin-edit-cell">
                          <div className="Admin-edit-form">
                            <div className="Admin-edit-row">
                              <label>Name</label>
                              <input
                                value={editForm.name || ""}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              />
                            </div>
                            <div className="Admin-edit-row">
                              <label>Phone</label>
                              <input
                                value={editForm.phone || ""}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              />
                            </div>
                            <div className="Admin-edit-row">
                              <label>Vehicle</label>
                              <input
                                value={editForm.vehicleType || ""}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, vehicleType: e.target.value })}
                              />
                            </div>
                            <div className="Admin-edit-row">
                              <label>Service</label>
                              <select
                                value={editForm.serviceName || ""}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, serviceName: e.target.value })}
                              >
                                <option value="">Select service...</option>
                                {SERVICES.map((s) => (
                                  <option key={s.id} value={`${s.name} - $${s.price}`}>
                                    {s.name} — ${s.price}
                                  </option>
                                ))}
                                {editForm.serviceName &&
                                  !SERVICES.some((s) => `${s.name} - $${s.price}` === editForm.serviceName) && (
                                    <option value={editForm.serviceName}>{editForm.serviceName} (current)</option>
                                  )}
                              </select>
                            </div>
                            <div className="Admin-edit-row">
                              <label>Date</label>
                              <input
                                type="date"
                                value={editForm.preferredDate || ""}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, preferredDate: e.target.value })}
                              />
                            </div>
                            <div className="Admin-edit-row">
                              <label>Status</label>
                              <select
                                value={editForm.status || ""}
                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                            <div className="Admin-edit-row Admin-edit-row-full">
                              <label>Notes</label>
                              <textarea
                                value={editForm.message || ""}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, message: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="Admin-edit-actions">
                              <button
                                type="button"
                                className="Admin-btn Admin-btn-primary"
                                onClick={() => saveEdit(b._id)}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="Admin-btn Admin-btn-secondary"
                                onClick={cancelEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{formatDate(b.preferredDate)}</td>
                        <td>{b.name}</td>
                        <td>{b.phone}</td>
                        <td>{b.vehicleType}</td>
                        <td>{b.serviceName}</td>
                        <td>
                          <span className={`Admin-status Admin-status-${(b.status || "").toLowerCase()}`}>
                            {b.status || "Pending"}
                          </span>
                        </td>
                        <td>
                          <div className="Admin-actions">
                            {canConfirmOrReject(b.status) && (
                              <>
                                <button
                                  type="button"
                                  className="Admin-btn Admin-btn-confirm"
                                  onClick={() => confirmBooking(b._id)}
                                  title="Confirm"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  className="Admin-btn Admin-btn-reject"
                                  onClick={() => rejectBooking(b._id)}
                                  title="Reject"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              className="Admin-btn Admin-btn-edit"
                              onClick={() => startEdit(b)}
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="Admin-btn Admin-btn-delete"
                              onClick={() => deleteBooking(b._id)}
                              title="Delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
