import React from 'react';

function FormSelectAddress(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const allMaterials = props.option
  //  const selection = props.value

    
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
                {allMaterials.map(material =>
                    (<option key={material.id} value={material.id} label={material.name + " " + material.unitPrice + " PLN"}
            //</select>                selected={(selection.id === material.id) ? true : false}

                            ></option>)
                )}
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormSelectAddress