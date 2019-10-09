import React, { Component } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css';


export default class Main extends Component {
    state = {
        lends: [],
        lendInfo: [],
        page: 1
    };

    componentDidMount() {
        this.loadLends();
    }

    loadLends = async (page = 1) => {
        const response = await api.get(`/lends?page=${page}`);

        const { docs, ...lendInfo } = response.data;

        this.setState({ lends: docs, lendInfo, page });
    };

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadLends(pageNumber);
    }

    nextPage = () => {
        const { page, lendInfo } = this.state;

        if (page === lendInfo.pages) return;

        const pageNumber = page + 1;

        this.loadLends(pageNumber);
    }

    delete = (id) => {
        api.delete(`/lends/${id}`)
            .then(response => console.log(response))
            .catch(e => console.log(e));
    }

    onEdit = (id) => {

    }

    render() {
        const { lends, page, lendInfo } = this.state;
        return (
            <div className="container">
                <div className="lend-list">
                    <h2>Meus Empréstimos</h2>
                    {lends.map(lend => (
                        <article key={lend._id}>
                            <strong>{lend.item}</strong>
                            <p>Contato: <Link to={`/contacts/${lend.contact}`}>
                                João
                            </Link></p>
                            <p>Data do empréstimo: {lend.datelend}</p>
                            <p>Data para devolução: {lend.daterefund} <i disabled={lend.datalend < Date.now || lend.completed === true}> em atraso!</i></p>
                            <label>
                                Entregue
                                <input
                                    name="entregue"
                                    type="checkbox"
                                    disabled
                                    defaultChecked={lend.completed}
                                />
                            </label>

                            <Link id="edit" to={`/lends/${lend._id}`}>Editar</Link>
                            <button onClick={e => this.delete(lend._id)}>Excluir</button>

                        </article>

                    ))}
                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={page === lendInfo.pages} onClick={this.nextPage}>Próxima</button>
                    </div>
                </div>
            </div>
        );
    };
};