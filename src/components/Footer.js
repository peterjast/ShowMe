import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/footer.css';

class Footer extends React.Component {
  render() {
    return(
      <Navbar className = "footerNav" collapseOnSelect expand="lg">
      <Navbar.Brand className="footerFont" >showMe &copy; 2021</Navbar.Brand>
    </Navbar>
    )
  }
}

export default Footer;