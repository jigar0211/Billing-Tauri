import React from 'react';
import Input from './Input'; // Import your existing Input component

const InputGroup = ({ label, prepend, ...inputProps }) => {
return (
    <>
        {label && <label className="form-label">{label}</label>}
        <div className="input-group">
            {prepend && (
                <span className="input-group-prepend" id="basic-addon1">
                    <span className="input-group-text">{prepend}</span>
                </span>
            )}
            <Input
                {...inputProps}
                aria-label={label || inputProps.placeholder} // Add aria-label
                aria-describedby="basic-addon1"
            />
        </div>
    </>
);
};

export default InputGroup;