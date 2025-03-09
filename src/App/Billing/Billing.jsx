import React, { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import Input from "../../components/Input";
import ToastNotification from "../../components/ToastNotification";
import Button from "../../components/button";
import Textarea from "../../components/Textarea";
import MainContent from '../../main-content/mainContent';

export default function Billing() {
    const [form, setForm] = useState({
        companyname: "",
        companygstno: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    };
    return (
        <MainContent>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm" style={{ borderRadius: "1rem" }}>
                        <div className="row my-2 my-md-2">
                                {/* First Column */}
                                <div className="col-md-6">
                                    <div className="form-group d-flex align-items-start mb-2">
                                        <label className="col-2">Customer Name:</label>
                                        <input type="text" className="form-control form-control-sm w-100" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-2">Address:</label>
                                        <input type="text" className="form-control form-control-sm w-75" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Mobile No.:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-2">Customer GST No.:</label>
                                        <input type="text" className="form-control form-control-sm w-75" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Payment By:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Invoice No.:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>
                                </div>

                                {/* Second Column */}
                                <div className="col-md-6">
                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Invoice Date:</label>
                                        <input type="date" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Buyer's Order No.:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Buyer's Order Dt.:</label>
                                        <input type="date" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Dispatch through:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Dispatch Date:</label>
                                        <input type="date" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Payment Terms:</label>
                                        <input type="text" className="form-control form-control-sm w-50" />
                                    </div>

                                    <div className="form-group d-flex align-items-center mb-2">
                                        <label className="col-4">Payment Details:</label>
                                        <input type="text" className="form-control form-control-sm w-75" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </MainContent>
    );
}
