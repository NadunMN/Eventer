import { Grid, Box, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import '../App.css'
import logo from '../asset/logoOriginal.png'

export const Footer = () => {
  return (
    <div className="footer-main-div">
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column logo-column">
          <img
            src={logo}
            alt="Eventer Logo"
            className="footer-logo"
          />
          <p>
            Want To Create Something <br />
            Great Together?
          </p>
          <p>Get In Touch..</p>
          
          <p>
            <a href="mailto:eventer@official.com">eventer@official.com</a>
          </p>
          
          <p>Our Location</p>
          
          <p>
            43, Reid Avenue, <br /> Colombo 7, Sri Lanka
          </p>
        </div>
        <div className="footer-column">
          <h3>Support & Education</h3>
          <ul>
            <li>
              <a href="#">Help & Support</a>
            </li>
            <li>
              <a href="#">Trust & Safety</a>
            </li>
            <li>
              <a href="#">Quality Guide</a>
            </li>
            <li>
              <a href="#">Selling on Eventer</a>
            </li>
            <li>
              <a href="#">Buying on Eventer</a>
            </li>
            <li>
              <a href="#">Eventer Guides</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press & News</a>
            </li>
            <li>
              <a href="#">Partnerships</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li>
              <a href="#">About Business Solutions</a>
            </li>
            <li>
              <a href="#">Eventer Pro</a>
            </li>
            <li>
              <a href="#">Eventer Certified</a>
            </li>
            <li>
              <a href="#">Become an Agency</a>
            </li>
            <li>
              <a href="#">ClearVoice</a>
            </li>
            <li>
              <a href="#">Content Marketing</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>&copy; Eventer Sri Lanka (Pvt) Ltd 2024</p>
        </div>
        <div className="footer-bottom-right">
          <FacebookIcon/>
          <TwitterIcon/>
          <InstagramIcon/>
          <LinkedInIcon/>
          
        </div>
      </div>
    </footer>
    </div>
  );
};
