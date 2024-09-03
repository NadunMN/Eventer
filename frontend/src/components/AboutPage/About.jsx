import React from 'react';
import './Abouts.css'; // Import the CSS file for styling
import teamMember1 from '../../asset/team-member1.jpg';
import teamMember2 from '../../asset/team-member2.jpg';
import headerBg from '../../asset/aboutImage.jpg'; // Import the background image

export const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <h1>About Us</h1>
      </header>

      {/* Introduction Section */}
      <section className="about-intro">
        <h2>Introduction</h2>
        <p>Our event management web app is designed to simplify the process of organizing and attending events. Whether you are planning a small gathering or a large conference, our app has all the features you need to make your event a success.</p>
      </section>

      {/* Mission Statement Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>Our mission is to provide a seamless event management experience that saves you time and effort, allowing you to focus on what really matters - creating unforgettable experiences.</p>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={teamMember2} alt="Team Member 1" />
            <h3>Sachith</h3>
            <p>Event Organizer</p>
          </div>
          <div className="team-member">
            <img src={teamMember1} alt="Team Member 2" />
            <h3>Nadun Madushanka</h3>
            <p>Event Coordinator</p>
          </div>
          <div className="team-member">
            <img src={teamMember2} alt="Team Member 2" />
            <h3>Mahesh Kumara</h3>
            <p>Attendee Manager</p>
          </div>
          <div className="team-member">
            <img src={teamMember2} alt="Team Member 2" />
            <h3>Dinuka</h3>
            <p>Technical Support</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="about-features">
        <h2>Features Overview</h2>
        <ul>
          <li>Event Planning Tools</li>
          <li>Real-time Updates</li>
          <li>Attendee Management</li>
          <li>Customizable Event Pages</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <h2>User Testimonials</h2>
        <blockquote>
          "This app made organizing our conference so much easier! Highly recommend it."
          <cite>- Emily Johnson</cite>
        </blockquote>
      </section>
    </div>
  );
};
