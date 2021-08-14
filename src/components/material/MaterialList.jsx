import React from "react";
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next';
import { getMaterialsApiCall } from '../../apiCalls/materialsApiCalls'
import MaterialListTable from './MaterialListTable'

class MaterialList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            materials: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchMaterialsList()
    }

    fetchMaterialsList = () => {
        getMaterialsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        materials: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { t } = this.props;
        const { error, isLoaded, materials } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie adresów...</p>
        } else {
            content = <MaterialListTable materialsList={materials} />
        }

        return (
            <main>
                <h2>{t('material.list.title')}</h2>
                <p className="success">{this.state.notice}</p>
                <p className="section-buttons">
                    <Link to="/materials/add" className="list-actions-button-add">{t('material.list.addNew')}</Link>
                </p>
                {content}
            </main>
        )
    }
}
export default withTranslation()(MaterialList)