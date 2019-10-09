import React, { Component } from 'react';
import api from '../../services/api';



import './styles.css';

export default class Contact extends Component {
    state = {
        contact: {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/contacts/${id}`);

        this.setState({ contact: response.data });
    }

    onDelete = (id) => {

    };

    render() {
        const { contact } = this.state;

        return (
            <div className="contact-info">
                <h1>{contact.nome}</h1>
                <p>{contact.phone}</p>

            </div>
        );
    }
}