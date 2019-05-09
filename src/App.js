import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';

import ReportsListService from './reportsList';

const Container = styled.main`
  background-color: ivory;
  font-family: 'Consolas', Courier New, monospace;
  display: grid;
  grid-template-columns: 300px auto;
  height: 100vh;
`;
const Aside = styled.aside`
  overflow: auto;
  border-right: 1px solid #ccc;
`;

const ReportsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px 4px;
`;
const ReportListItem = styled.li`
  padding: 8px 16px;
`;

const ReportDetails = styled.section`
  overflow: auto;
  padding: 8px 40px;
  text-align: justify;
`;

function App() {
  const [reports, setReports] = React.useState([]);
  const [current, setCurrent] = React.useState(null);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      Axios.get('http://localhost:8000/auth', { params: { code } })
        .then(response => {
          const reportsList = new ReportsListService(response.data);
          setReports(reportsList);
        });
    } else {
      Axios.get('http://localhost:8000')
        .then(response => window.location.href = response.data);
    }
  }, []);

  const onSelect = (report) => setCurrent(report);

  return (
    <Container>
      <Aside>
        <ReportsList>
          { reports.map((report, i) => (
            <ReportListItem key={i} onClick={onSelect.bind(this, report)}>
              <a href={'#' + i}>{ report.title }</a>
            </ReportListItem>
          )) }
        </ReportsList>
      </Aside>
      <ReportDetails>
        { current && (
          <React.Fragment>
            <h3>{ current.title }</h3>
            { current.content.map((paragraph, i) => (
              <p key={i}>{ paragraph }</p>
            )) }
          </React.Fragment>
        ) }
      </ReportDetails>
    </Container>
  );
}

export default App;
