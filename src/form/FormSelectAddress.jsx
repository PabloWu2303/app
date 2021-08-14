import React from 'react';

function FormSelectAddress(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const allAddresses = props.option
    const selection = props.value

    
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title="required" aria-label="required">*</abbr>}
            </label>
            <select
                name={props.name}
                id={props.name}
                onChange={props.onChange} >
                <option value=""> -----</option>
                {allAddresses.map(address =>
                    (<option key={address.id} value={address.id} label={address.city + ", ul. " + address.street + " " + address.houseNumber + (address.flatNumber ? ("/" + address.flatNumber + ", ") : ", ") + address.postalCode }
                            selected={(selection.id === address.id) ? true : false}></option>)
                )}
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormSelectAddress