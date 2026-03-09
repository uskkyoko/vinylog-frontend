import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; 2025 Vinylog. All Rights Reserved.</p>
        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
