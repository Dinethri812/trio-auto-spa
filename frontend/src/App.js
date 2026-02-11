import { Link } from "react-router-dom";
import './App.css';
import BookingForm from "./BookingForm";
import { SERVICES } from "./servicesData";

function App() {
  return (
    <div className="App">
      <header className="App-shell-header">
        <div className="App-nav">
          {/* Replace the src below with your provided logo file inside /public or /src */}
          <div className="App-brand">
            <img
              src="/logo.png"
              alt="Trio Auto Spa logo"
              className="App-logo"
            />
            <div className="App-brand-text">
              <span className="App-brand-title">TRIO AUTO SPA</span>
              <span className="App-brand-subtitle">Premium Detailing & Wash</span>
            </div>
          </div>

          <nav className="App-nav-links">
            <a href="#services">Services</a>
            <a href="#booking">Book Now</a>
            <a href="#contact">Contact</a>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="App-main">
        <section className="App-hero">
          <div className="App-hero-text">
            <p className="App-pill">Ultra-clean. Ultra-convenient.</p>
            <h1>Make your car look <span className="App-hero-highlight">brand new</span>.</h1>
            <p className="App-hero-subtitle">
              Trio Auto Spa delivers showroom-level detailing, deep interior cleaning,
              and protection packages that keep your vehicle glowing on every drive.
            </p>
            <div className="App-hero-actions">
              <a href="#booking" className="App-cta-primary">Book a Detail</a>
              <a href="#services" className="App-cta-secondary">View services</a>
            </div>
            <div className="App-hero-meta">
              <span>✓ Same-day appointments when available</span>
              <span>✓ Professional products & equipment</span>
            </div>
          </div>

          <div className="App-hero-card">
            <div className="App-hero-stat">
              <span className="App-hero-stat-number">1,200+</span>
              <span className="App-hero-stat-label">Vehicles detailed</span>
            </div>
            <div className="App-hero-stat">
              <span className="App-hero-stat-number">4.9/5</span>
              <span className="App-hero-stat-label">Client rating</span>
            </div>
            <div className="App-hero-stat">
              <span className="App-hero-stat-number">7 days</span>
              <span className="App-hero-stat-label">A week available</span>
            </div>
          </div>
        </section>

        <section id="services" className="App-section App-services">
          <h2>Signature detailing packages</h2>
          <p className="App-section-subtitle">
            Choose the level of clean that fits your vehicle. Every package includes a careful hand wash.
          </p>
          <div className="App-services-grid">
            {SERVICES.map((s) => (
              <article key={s.id} className="App-service-card">
                <div className="App-service-card-header">
                  <h3>{s.name}</h3>
                  <span className="App-service-price">${s.price}</span>
                </div>
                <p>{s.description}</p>
                <ul>
                  {s.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="booking" className="App-section App-booking">
          <div className="App-section-header">
            <h2>Book your appointment</h2>
            <p className="App-section-subtitle">
              Tell us about your vehicle and preferred date. We’ll confirm your appointment as soon as possible.
            </p>
          </div>
          <div className="App-booking-grid">
            <div className="App-booking-form-wrapper">
              <BookingForm />
            </div>
            <div className="App-booking-aside">
              <h3>Why book with Trio?</h3>
              <ul>
                <li>Flexible scheduling that works around you</li>
                <li>Attention to detail on every surface</li>
                <li>Transparent pricing with no surprises</li>
              </ul>
              <p className="App-booking-note">
                Need a special package or have fleet vehicles? Add details in the message field and we’ll follow up.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="App-section App-contact">
          <div className="App-contact-grid">
            <div>
              <h2>Contact & hours</h2>
              <p className="App-section-subtitle">
                Reach out for custom quotes, mobile services, or questions about our packages.
              </p>
            </div>
            <div className="App-contact-details">
              <p><strong>Phone:</strong> (000) 000-0000</p>
              <p><strong>Email:</strong> info@trioautospa.com</p>
              <p><strong>Hours:</strong> Mon–Sun, 9:00am – 7:00pm</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <span>© {new Date().getFullYear()} Trio Auto Spa. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
