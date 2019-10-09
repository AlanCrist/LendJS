import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class LendForm extends Component {

    state = {
        model: {
            item: '',
            contact: '',
            datelend: '',
            daterefund: ''
        },
        contacts: []
    };

    
    componentDidMount() {
        this.loadContacts();
    }
    
    loadContacts = async () => {
        const response = await api.get(`/contacts`);

        this.setState({ contacts: response.data.docs });
    }

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = event => {
        event.preventDefault();

        console.log(this.props);
        const data = {
            item: this.state.model.item,
            contact: this.state.model.contact,
            datelend: this.state.model.datelend,
            daterefund: this.state.model.daterefund,
        };

        this.setState({ model: { item: '', contact: '', datelend: '', daterefund: ''} })

        console.log(data);
        
        api.post("/lends", data)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    render() {
        const {contacts} = this.state;

        return (
            <div className="container">
                <form key={this.state.model.id} onSubmit={this.create}>
                    <h2> Cadastro de Emprestimos </h2>
                    <label>
                        Item
                        <input id="item" type="text" value={this.state.model.item} placeholder="Nome do item" 
                        onChange={e => this.setValues(e, 'item')} required />
                    </label>
                    <label>
                        Contato
                        <select onChange={e => this.setValues(e, 'contact')} defaultValue={this.state.model.contact} required>
                            {contacts.map(contact => (
                                <option key={contact._id} value={contact._id}>{contact.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Data do empréstimo
                        <input id="item" type="date" value={this.state.model.datelend} 
                        onChange={e => this.setValues(e, 'datelend')} required />
                    </label>
                    <label>
                        Data da devolução
                        <input id="item" type="date" value={this.state.model.daterefund} 
                        onChange={e => this.setValues(e, 'daterefund')}/>
                    </label>

                    <button type="submit" onClick={this.create} block="true">Salvar</button>

                </form>
            </div>
        );
    }
};

