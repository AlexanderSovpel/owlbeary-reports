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
  display: grid;
  grid-template-columns: 300px auto;
  height: 100vh;
`;

function App(props) {
  const { authLink, signedIn } = props;

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');

  React.useEffect(() => {
    props.autoSignIn();

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
          <Route exact path="/reports/new-report" component={ReportCreator} />
          <Route path="/reports/:id" component={ReportDetails} />
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
  autoSignIn: () => dispatch(reportsActions.autoSignInRequest()),
  getReports: () => dispatch(reportsActions.getReportsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
