import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { ApplicationState } from './store';
import * as WebSettingsStore from './store/WebSettings';

import './custom.css'

type WebSettingsProps = 
    WebSettingsStore.WebSettingsState
    & typeof WebSettingsStore.actionCreators;

class App extends React.PureComponent<WebSettingsProps> {

    public componentDidMount() {
        this.props.requestWebSettings();
    }

    public render() {
        return (    
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            </Layout>
        );
    }
}

export default connect((state: ApplicationState) => state.webSettings, WebSettingsStore.actionCreators)(App as any);