import React from 'react';

function FormSelectBuildingSite(props) {
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const allBuildingSites = props.option
    const selection = props.buildingSiteId ? props.buildingSiteId : props.value
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
                {allBuildingSites.map(buildingSite =>
                (<option key={buildingSite.id} value={buildingSite.id} label={buildingSite.name + ", " + buildingSite.address.city + ", ul. " + buildingSite.address.street + " " + buildingSite.address.houseNumber}
                    selected={(selection.id === buildingSite.id) ? true : false}></option>)
                )}
            </select>
            <span id={errorSpanId} className={props.isBSMode ? 'hidden' : 'errors-text'}>{props.error}</span>
        </>
    )
}

export default FormSelectBuildingSite