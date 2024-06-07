import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.png`} alt="" />
      </Link>
      <header>
        <h2>Victor Olade</h2>
        <p><a href="mailto:victorolade@gmail.com">victorolade@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Victor. I build data products. With 10+ years in data engineering and growth marketing, I create innovative data products, leveraging cloud, Python, JavaScript, SQL, and agile expertise. I empower businesses with data-driven solutions, fostering sustainable growth and value.</p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Victor Olade <Link to="/">victorolade.com</Link>.</p>
    </section>
  </section>
);

export default SideBar;
