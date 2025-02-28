import React from "react";

const Textarea = ({ name, placeholder, value, onChange, className, label, rows = 5 }) => {
    return (
        <div className="form-group mb-0">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`form-control ${className}`}
                style={{
                    resize: "none",
                    height: "calc(2em * 4)", // Matches the given height calculation
                }}
            ></textarea>
        </div>
    );
};

export default Textarea;
