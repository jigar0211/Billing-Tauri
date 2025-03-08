import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastNotification = ({ message, variant, show, setShow }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 500);
        }
    }, [show]);

    return (
        <ToastContainer className="toast-container-top-right">
            {isVisible && (
                <Toast
                    className={`custom-toast ${show ? "fade-in" : "fade-out"} ${variant === "danger" ? "error-toast" : ""
                        }`}
                    bg={variant === "success" ? "transparent-success" : ""}
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            )}
        </ToastContainer>
    );
};

export default ToastNotification;
