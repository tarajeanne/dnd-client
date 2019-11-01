import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-content">
          <p>
            This application was created by{' '}
            <a href="https://tarajpatel.com/">T.J. Patel</a> using information
            from the Player's Handbook of the Fifth Edition of{' '}
            <a href="https://dnd.wizards.com/">Dungeons and Dragons</a> by
            Wizards of the Coast.
          </p>
          <p>
            View the code{' '}
            <a href="https://github.com/tarajeanne/dnd-client">here</a>.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
