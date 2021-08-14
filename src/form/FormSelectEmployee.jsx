import React from 'react';

function FormSelectEmployee(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const allEmployees = props.option
    const selection = props.value
    const hidden = props.isEmpMode ? 'hidden' : ''

    return (
        <>
            <div className={hidden}>
                <label htmlFor={props.name}>
                    {props.label}:
                {props.required && <abbr title="required" aria-label="required">*</abbr>}
                </label></div>
            <select
                className={hidden}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
            // disabled={props.isDisabled}
            >
                <option value=""> -----</option>
                {allEmployees.map(employee =>
                (<option key={employee.id} value={employee.id} label={employee.name + " " + employee.surname + ", " + employee.email}
                    selected={(selection === employee.id) ? true : false}></option>)
                )}
            </select>
            <span id={errorSpanId} className={props.isEmpMode ? 'hidden' : 'errors-text'}>{props.error}</span>
        </>
    )
}

export default FormSelectEmployee