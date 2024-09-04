import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="text-white text-center py-4 mt-auto" style={{ backgroundColor: '#322933' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <Link to="/mentions" style={{ color: 'white'}}>Mentions légales</Link>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Contact</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123456789</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><button className="btn btn-link text-white">Facebook</button></li>
                            <li><button className="btn btn-link text-white">Twitter</button></li>
                            <li><button className="btn btn-link text-white">Instagram</button></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="mb-0">&copy; 2024 PingPro. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

