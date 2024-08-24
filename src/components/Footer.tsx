import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="Footer">
            <div className="Footer-content">
                <p>&copy; {new Date().getFullYear()} Hogcloud, Inc. All rights reserved.</p>
                <nav className="Footer-nav">
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy Policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
