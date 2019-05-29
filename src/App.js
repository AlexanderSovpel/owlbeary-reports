import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ReportCreator from './components/ReportCreator';
import ReportDetails from './components/ReportDetails';
import Navigation from './components/Navigation';

import * as reportsActions from './state/actions';

import './App.css';

const Container = styled.main`
  background-color: ivory;
  font-family: 'Consolas', Courier New, monospace;
  color: #000;
  display: grid;
  grid-template-columns: 300px auto;
  height: 100vh;
`;

function App(props) {
  const { authLink, signedIn } = props;

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');

  React.useEffect(() => {
    if (code) {
      props.singIn(code);
    }

    if (!signedIn && !code) {
      props.getAuthLink();

      if (authLink) {
        window.location.href = authLink;
      }
    } else {
      props.getReports();
    }
  }, [code, signedIn, authLink, props]);

  return (
    <Container>
      <BrowserRouter>
        <Route path="/" component={Navigation} />

        <Switch>
          <Route path="/:id" component={ReportDetails} />

          <Route path="/new-report" component={ReportCreator} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = state => ({
  signedIn: state.signedIn,
  authLink: state.authLink,
});
const mapDispatchToProps = dispatch => ({
  getAuthLink: () => dispatch(reportsActions.getAuthLinkRequest()),
  singIn: (authCode) => dispatch(reportsActions.signInRequest(authCode)),
  getReports: () => dispatch(reportsActions.getReportsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
