import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    livros: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { livros: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:4000/livros`).then(data => {
            this.setState({ livros: data.data })
        })
    }

    public deleteLivro(id: number) {
        axios.delete(`http://localhost:4000/livros/${id}`).then(data => {
            const index = this.state.livros.findIndex(livro => livro.id === id);
            this.state.livros.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const livros = this.state.livros;
        return (
            <div>
                {livros.length === 0 && (
                    <div className="text-center">
                        <h2>Nenhum livro disponível... Que tal aproveitar e cadastrar um livro!?</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Editora</th>
                                    <th scope="col">Área</th> 
                                    <th scope="col">Ações</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {livros && livros.map(livro =>
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.autor}</td>
                                        <td>{livro.editora}</td>
                                        <td>{livro.area}</td> 
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${livro.id}`} className="btn btn-sm btn-primary">Atualizar </Link>
                                                    <button className="btn btn-sm btn-danger" 
                                                            onClick={() => this.deleteLivro(livro.id)}>Excluir</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}