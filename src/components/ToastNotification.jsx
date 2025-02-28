import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastNotification = ({ message, variant, show, setShow }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                bg={variant} // "success" or "danger"
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body className={variant === "danger" ? "text-white" : ""}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
