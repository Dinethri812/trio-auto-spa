import logo from './logo.svg';
import './App.css';
import BookingForm from "./BookingForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Trio Auto Spa</h2>

        {/* Booking Form */}
        <BookingForm />
      </header>
    </div>
  );
}

export default App;
