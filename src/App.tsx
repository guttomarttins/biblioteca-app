import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Cadastro de Livros </Link>
            </li>
            <li className='navbar-float-right'>
              <Link to={'/create'}> Adicionar Livros </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={Edit} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);