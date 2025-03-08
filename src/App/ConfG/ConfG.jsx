import React, { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import MainContent from "../../main-content/mainContent";
import Input from "../../components/Input";
import ToastNotification from "../../components/ToastNotification";
import Button from "../../components/button";
import Textarea from "../../components/Textarea";

export const ConfG = () => {
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

    // Fetch initial settings
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const db = await Database.load("sqlite:billing.db");
                const settings = await db.select(
                    "SELECT * FROM settings"
                );

                const newForm = {};
                settings.forEach(({ sname, parameter }) => {
                    newForm[sname] = parameter;
                });
                setForm(newForm);
            } catch (error) {
                console.error("Error loading settings:", error);
                setToast({
                    show: true,
                    message: "Failed to load settings",
                    variant: "error"
                });
            }
        };
        loadSettings();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = await Database.load("sqlite:billing.db");

            const settingsUpdates = Object.entries(form).map(([sname, parameter]) => ({
                sname,
                parameter
            }));

            await db.execute("BEGIN TRANSACTION");
            for (const setting of settingsUpdates) {
                await db.execute(
                    "INSERT OR REPLACE INTO settings (sname, parameter) VALUES ($1, $2)",
                    [setting.sname, setting.parameter]
                );
            }
            await db.execute("COMMIT");
            setToast({
                show: true,
                message: "Settings updated successfully!",
                variant: "success"
            });
        } catch (error) {
            console.error("Error saving settings:", error);
            await db.execute("ROLLBACK");
            setToast({
                show: true,
                message: "Failed to save settings",
                variant: "danger"
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
                    <form onSubmit={handleSubmit} className="">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card shadow-sm mb-3" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
                                        <h3 className="card-title fw-semibold">Company Information</h3>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="companyname"
                                                    placeholder="Company Name"
                                                    value={form.companyname || ""}
                                                    onChange={handleChange}
                                                    label="Company Name"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="companygstno"
                                                    placeholder="Company GST No."
                                                    value={form.companygstno}
                                                    onChange={handleChange}
                                                    label="Company GST No."
                                                />
                                            </div>
                                            <div className="col-md-12">
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
                                </div>

                                {/* Invoice Numbering */}
                                <div className="card shadow-sm" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
                                        <h3 className="card-title fw-semibold">Invoice Numbering</h3>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="company"
                                                    placeholder="PHP"
                                                    value={form.company}
                                                    onChange={handleChange}
                                                    label="Company"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="year"
                                                    placeholder="25-26"
                                                    value={form.year}
                                                    onChange={handleChange}
                                                    label="Year"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="invnum"
                                                    placeholder="001"
                                                    value={form.invnum}
                                                    onChange={handleChange}
                                                    label="Invoice Number (Unique ID)"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="hsn"
                                                    placeholder="3855"
                                                    value={form.hsn}
                                                    onChange={handleChange}
                                                    label="HSN Code"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Bank Details + Tax + Payment + Address */}
                            <div className="col-md-6">
                                {/* Company Bank Details */}
                                <div className="card shadow-sm mb-3" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
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
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bankaccno"
                                                    placeholder="Bank Account No."
                                                    value={form.bankaccno}
                                                    onChange={handleChange}
                                                    label="Bank Account No."
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bankbranch"
                                                    placeholder="Bank Branch"
                                                    value={form.bankbranch}
                                                    onChange={handleChange}
                                                    label="Bank Branch"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bankifsc"
                                                    placeholder="Bank IFSC Code"
                                                    value={form.bankifsc}
                                                    onChange={handleChange}
                                                    label="Bank IFSC Code"
                                                />
                                            </div>
                                            <div className="col-md-6">
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

                                {/* Tax Details */}
                                <div className="card shadow-sm mb-3" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
                                        <h3 className="card-title fw-semibold">Tax Details</h3>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="igst"
                                                    placeholder="3%"
                                                    value={form.igst}
                                                    onChange={handleChange}
                                                    label="IGST (%)"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="sgst"
                                                    placeholder="3%"
                                                    value={form.sgst}
                                                    onChange={handleChange}
                                                    label="SGST (%)"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Input
                                                    type="text"
                                                    name="cgst"
                                                    placeholder="3%"
                                                    value={form.cgst}
                                                    onChange={handleChange}
                                                    label="CGST (%)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Terms */}
                                <div className="card shadow-sm mb-3" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body">
                                        <h3 className="card-title fw-semibold">Payment Terms</h3>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Input
                                                    type="text"
                                                    name="paymenterms"
                                                    placeholder="15"
                                                    value={form.paymenterms}
                                                    onChange={handleChange}
                                                    label="Payment Terms (Days)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="card-footer text-right">
                            <Button text="Update Details" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </MainContent>
    );
};

export default ConfG;
