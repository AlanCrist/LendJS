import React, { Component } from 'react';
import api from '../../services/api';



import './styles.css';

export default class LendEdit extends Component {
    state = {
        lend: {},
        contacts: []
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/lends/${id}`);

        this.setState({ lend: response.data });

        this.loadContacts();
    }

    loadContacts = async () => {
        const response = await api.get(`/contacts`);

        this.setState({ contacts: response.data.docs });
    }

    render() {
        const { contacts } = this.state;

        return (
            <div className="contact-info">
                <form key={this.state.lend.id} onSubmit={this.create}>
                    <h2>Editar Emprestimo</h2>
                    <label>
                        Item
                        <input id="item" type="text" value={this.state.lend.item} placeholder="Nome do item" 
                        onChange={e => this.setValues(e, 'item')} required />
                    </label>
                    <label>
                        Contato
                        <select onChange={e => this.setValues(e, 'contact')} defaultValue={this.state.lend.contact} required>
                            {contacts.map(contact => (
                                <option key={contact._id} value={contact._id}>{contact.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Data do empréstimo
                        <input id="item" type="date" value={this.state.lend.datelend} 
                        onChange={e => this.setValues(e, 'datelend')} required />
                    </label>
                    <label>
                        Data da devolução
                        <input id="item" type="date" value={this.state.lend.daterefund} 
                        onChange={e => this.setValues(e, 'daterefund')}/>
                    </label>
                    <label id="checkE">
                        Entregue
                        <input
                            className="checkEntregue"
                            name="entregue"
                            type="checkbox"
                            defaultChecked={this.state.lend.completed}
                        />
                    </label>

                    <button type="submit" onClick={this.create} block="true">Salvar</button>

                </form>
            </div>
        );
    }
}