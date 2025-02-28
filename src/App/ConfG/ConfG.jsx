import React, { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';
import MainContent from "../../main-content/mainContent";
import Input from "../../components/Input";
import ToastNotification from "../../components/ToastNotification";
import Button from "../../components/button";
import Textarea from "../../components/Textarea";

export const ConfG = () => {
    const invoke = window.__TAURI__.core.invoke;

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [form, setForm] = useState({
        companyname: "",
        companygstno: "",
        companypan: "",
        company: "",
        year: "",
        invnum: "",
        hsn: "",
        igst: "",
        sgst: "",
        cgst: "",
        paymenterms: "",
        address: "",
        bankmicr: "",
        bankifsc: "",
        bankbranch: "",
        bankaccno: "",
        bankname: "",
        username: "",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await invoke("get_settings");
                console.log("Fetched settings:", settings);
                if (settings) {
                    setForm(settings);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };

        fetchSettings();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", form);

        try {
            await invoke("update_settings", { settings: form });
            setToast({
                show: true,
                message: "Settings updated successfully!",
                variant: "success",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setToast({
                show: true,
                message: "An error occurred while updating settings.",
                variant: "danger",
            });
        }
    };

    return (
        <MainContent>
            <ToastNotification
                message={toast.message}
                variant={toast.variant}
                show={toast.show}
                setShow={(show) => setToast((prev) => ({ ...prev, show }))}
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title fw-semibold">Invoice Setup</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3 className="card-title fw-semibold">Bill Details</h3>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="companyname"
                                                    placeholder="Company Name"
                                                    value={form.companyname}
                                                    onChange={handleChange}
                                                    label="Company Name"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="companygstno"
                                                    placeholder="Company GST No."
                                                    value={form.companygstno}
                                                    onChange={handleChange}
                                                    label="Company GST No."
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="companypan"
                                                    placeholder="Company PAN"
                                                    value={form.companypan}
                                                    onChange={handleChange}
                                                    label="Company PAN"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="invoicenumber" className="font-weight-bold"><strong>Invoice Number</strong></label>
                                                    <div className="row d-flex">
                                                        <div className="col-lg-3 col-md-4 col-sm-12">
                                                            <Input
                                                                type="text"
                                                                name="company"
                                                                placeholder="PHP"
                                                                value={form.company}
                                                                onChange={handleChange}
                                                                label="Company"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-4 col-sm-12">
                                                            <Input
                                                                type="text"
                                                                name="year"
                                                                placeholder="25-26"
                                                                value={form.year}
                                                                onChange={handleChange}
                                                                label="Year"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-4 col-sm-12">
                                                            <Input
                                                                type="text"
                                                                name="invnum"
                                                                placeholder="001"
                                                                value={form.invnum}
                                                                onChange={handleChange}
                                                                label="Inv Num"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-4 col-sm-12">
                                                            <Input
                                                                type="text"
                                                                name="hsn"
                                                                placeholder="3855"
                                                                value={form.hsn}
                                                                onChange={handleChange}
                                                                label="HSN"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="igst"
                                                    placeholder="3%"
                                                    value={form.igst}
                                                    onChange={handleChange}
                                                    label="IGST"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="sgst"
                                                    placeholder="3%"
                                                    value={form.sgst}
                                                    onChange={handleChange}
                                                    label="SGST"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="cgst"
                                                    placeholder="3%"
                                                    value={form.cgst}
                                                    onChange={handleChange}
                                                    label="CGST"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="paymenterms"
                                                    placeholder="15"
                                                    value={form.paymenterms}
                                                    onChange={handleChange}
                                                    label="Payment Terms"
                                                />
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <Textarea
                                                    name="address"
                                                    label="Address"
                                                    placeholder="Enter your address..."
                                                    value={form.address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h3 className="card-title fw-semibold">Company Bank Details</h3>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="bankname"
                                                    placeholder="Bank Name"
                                                    value={form.bankname}
                                                    onChange={handleChange}
                                                    label="Bank Name"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="bankaccno"
                                                    placeholder="Bank Account No."
                                                    value={form.bankaccno}
                                                    onChange={handleChange}
                                                    label="Bank Account No."
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="bankbranch"
                                                    placeholder="Bank Branch"
                                                    value={form.bankbranch}
                                                    onChange={handleChange}
                                                    label="Bank Branch"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="bankifsc"
                                                    placeholder="Bank IFSC Code"
                                                    value={form.bankifsc}
                                                    onChange={handleChange}
                                                    label="Bank IFSC Code"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="bankmicr"
                                                    placeholder="Bank MICR Code"
                                                    value={form.bankmicr}
                                                    onChange={handleChange}
                                                    label="Bank MICR Code"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <Button
                                        text="Update Details"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainContent>
    );
};

export default ConfG;
