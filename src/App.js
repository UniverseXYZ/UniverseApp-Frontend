import './assets/scss/normalize.scss';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import MyNFTs from './components/MyNFTs';
import MyAccount from './components/MyAccount';

const App = () => {
    return (
        <Routes>
            <Header />
            <Switch>
                <Route exact path="/" component={() => <MyNFTs />} />
                <Route exact path="/my-account" component={() => <MyAccount />} />
                <Route path="*" component={() => <Redirect to='/' />} />
            </Switch>
        </Routes>
    );
}

export default App;