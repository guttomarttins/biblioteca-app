import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    titulo: string,
    autor: string,
    editora: string,
    area: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            titulo: '',
            autor: '',
            editora: '',
            area: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            titulo: this.state.titulo,
            autor: this.state.autor,
            editora: this.state.editora,
            area: this.state.area
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:4000/livros`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Cadastrar Livro </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Preencha os campos para cadastrar
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Cadastro realizado com sucesso!!!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        
                        <div className="form-group row">
                            <label htmlFor="titulo" className="col-sm-2 col-form-label">Título</label>
                            <div className="col-sm-10">
                              <input type="text" id="titulo" onChange={(e) => this.handleInputChanges(e)} required
                                   name="titulo" className="form-control" placeholder="Informe o título do livro" />
                            </div>
                        </div> 

                        <div className="form-group row">
                            <label htmlFor="autor" className="col-sm-2 col-form-label"> Autor </label>
                            <div className="col-sm-10">
                                   <input type="text" id="autor" onChange={(e) => this.handleInputChanges(e)} 
                                   name="autor" className="form-control" placeholder="Informe nome autor do livro" />
                             </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="editora" className="col-sm-2 col-form-label"> Editora </label>
                            <div className="col-sm-10">
                                  <input type="text" id="editora" onChange={(e) => this.handleInputChanges(e)} 
                                   name="editora" className="form-control" placeholder="Informe nome editora do livro" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="area" className="col-sm-2 col-form-label"> Área </label>
                            <div className="col-sm-10">
                                <input type="text" id="area" onChange={(e) => this.handleInputChanges(e)} 
                                    name="area" className="form-control" placeholder="Informa área do livro" />
                            </div> 
                        </div>

                        <div className="form-group float-right">
                            <button className="btn btn-success" type="submit">
                                Salvar
                            </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)