import { useState } from "react";
import axios from "axios";

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
    <form onSubmit={submit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} />
      <input name="serviceName" placeholder="Service" onChange={handleChange} />
      <input type="date" name="preferredDate" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
      <button>Book Now</button>
    </form>
  );
}

export default BookingForm;

