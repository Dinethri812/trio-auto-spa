import { useState } from "react";
import axios from "axios";
import { SERVICES } from "./servicesData";

function BookingForm() {
  const [form, setForm] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/bookings", form);
    alert("Booking submitted");
  };

  return (
    <form className="BookingForm" onSubmit={submit}>
      <div className="BookingForm-row">
        <div className="BookingForm-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="BookingForm-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            placeholder="Mobile number"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="BookingForm-row">
        <div className="BookingForm-field">
          <label htmlFor="vehicleType">Vehicle type</label>
          <input
            id="vehicleType"
            name="vehicleType"
            placeholder="SUV, sedan, truck, etc."
            onChange={handleChange}
            required
          />
        </div>
        <div className="BookingForm-field">
          <label htmlFor="serviceName">Service</label>
          <select
            id="serviceName"
            name="serviceName"
            onChange={handleChange}
            required
          >
            <option value="">Select a service...</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={`${s.name} - $${s.price}`}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="BookingForm-row">
        <div className="BookingForm-field">
          <label htmlFor="preferredDate">Preferred date</label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="BookingForm-field">
        <label htmlFor="message">Notes</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your vehicle, location, and any special requests."
          rows={4}
          onChange={handleChange}
        ></textarea>
      </div>

      <button className="BookingForm-submit">Book now</button>
    </form>
  );
}

export default BookingForm;

