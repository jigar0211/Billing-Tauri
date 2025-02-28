import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadVendorFiles } from '../utils/loadVendors';

const MainContent = ({ children }) => {
    useEffect(() => {
        loadVendorFiles();
    }, []);
    // useEffect(() => {
    //     invoke("start_mongodb")
    //         .then((message) => console.log(message))
    //         .catch((error) => console.error("Error starting MongoDB:", error));
    // }, []);

    return (
        <div className="page">
            <div className="page-main">
                <div className="header py-4">
                    <Header />
                </div>
                <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
                    <Navbar />
                </div>
                <div className="my-3 my-md-5">
                    <div className="container-fluid">
                        {children} {/* This will render dynamic content */}
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