import React from 'react'
import { Link } from 'react-router-dom';
import formMode from '../helpers/formHelper'

function FormButtons(props) {

    const submitButtonLabel = props.formMode === formMode.EDIT ? 'Edytuj' : 'Dodaj'

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="list-actions-button" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="list-actions-button">Anuluj</Link>
        </div>
    )
}

export default FormButtons