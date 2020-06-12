import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    livro: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditLivro extends React.Component<RouteComponentProps<any>, IFormState> {
    
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            livro: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:4000/livros/${this.state.id}`).then(data => {
            this.setState({ livro: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:4000/livros/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.livro &&
                    <div>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Atualizar Livro </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Livro atualizado com sucesso </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    
                                <div className="form-group row">
                                     <label htmlFor="titulo" className="col-sm-2 col-form-label">Título</label>
                                     <div className="col-sm-10"> 
                                        <input type="text" id="titulo" defaultValue={this.state.livro.titulo} 
                                               onChange={(e) => this.handleInputChanges(e)} name="titulo" className="form-control" 
                                               placeholder="Informe o título do livro" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="autor" className="col-sm-2 col-form-label"> Autor </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="autor" defaultValue={this.state.livro.autor} 
                                               onChange={(e) => this.handleInputChanges(e)} name="autor" className="form-control" 
                                               placeholder="Informe nome autor do livro" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="editora" className="col-sm-2 col-form-label"> Editora </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="editora" defaultValue={this.state.livro.editora} 
                                               onChange={(e) => this.handleInputChanges(e)} name="editora" className="form-control" 
                                               placeholder="Informe editora do livro" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="area" className="col-sm-2 col-form-label"> Área </label>
                                    <div className="col-sm-10"> 
                                        <input type="text" id="area" defaultValue={this.state.livro.area} 
                                               onChange={(e) => this.handleInputChanges(e)} name="area" className="form-control" 
                                               placeholder="Informe área do livro" />
                                    </div>
                                </div>    

                                <div className="form-group float-right">
                                    <button className="btn btn-primary" type="submit">
                                        Atualizar </button>
                                    {loading &&
                                        <span className="fa fa-circle-o-notch fa-spin" />
                                    }
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditLivro)