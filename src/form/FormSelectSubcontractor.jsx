import React from 'react';

function FormSelectSubcontractor(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const allSubcontractors = props.option
    const selection = props.subcontractorId ? props.subcontractorId : props.value
    const hidden = props.isBSMode ? 'hidden' : ''

    return (
        <>
            <div className={hidden}>
                <label htmlFor={props.name}>
                    {props.label}:
                {props.required && <abbr title="required" aria-label="required">*</abbr>}
                </label>
            </div>
            <select
                className={hidden}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                display={props.display}>
                <option value=""> -----</option>
                {allSubcontractors.map(subcontractor =>
                (<option key={subcontractor.id} value={subcontractor.id} label={subcontractor.name + ", " + subcontractor.address.city + ", ul. " + subcontractor.address.street + " " + subcontractor.address.houseNumber}
                    selected={(selection.id === subcontractor.id) ? true : false}></option>)
                )}
            </select>
            <span id={errorSpanId} className={props.isBSMode ? 'hidden' : 'errors-text'}>{props.error}</span>
        </>
    )
}

export default FormSelectSubcontractor