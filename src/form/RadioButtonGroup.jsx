import React from 'react';

function RadioButtonGroup(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    var isChecked1 = props.checked1
    var isChecked2 = props.checked2

  
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title="required" aria-label="required">*</abbr>}
            </label>
            <form>
                <div className="radio">
                    <label><input type="radio" value="supplier" checked={isChecked1} />{props.value1}</label>
                </div>
                <div className="radio">
                    <label><input type="radio" value="contractor" checked={isChecked2}  />{props.value2}</label>
                </div>
            </form>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default RadioButtonGroup