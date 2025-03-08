import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadVendorFiles } from '../utils/loadVendors';

const MainContent = ({ children }) => {
    useEffect(() => {
        loadVendorFiles();
    }, []);

    return (
        <div className="page">
            <div className="page-main">
                <div className="header py-4">
                    <Header />
                </div>
                <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
                    <Navbar />
                </div>
                <div className="my-2 my-md-2">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
                <footer className="footer fixed-bottom">
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
export default MainContent;