import React from 'react';

function FormSelect(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const options = props.option
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
                {options.map(option =>
                    (<option key={option.id} value={option} label={option}
                            selected={(selection === option) ? true : false}></option>)
                )}
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormSelect