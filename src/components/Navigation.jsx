import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
const ReportListLink = styled(Link)`
  color: #000;
`;

function Navigation(props) {
  const { reports } = props;

  return (
    <Aside>
      <ReportsList>
        { reports.map((report, i) => (
          <ReportListItem key={i}>
            <ReportListLink to={`${report.id}`}>{ report.title }</ReportListLink>
          </ReportListItem>
        )) }
        <ReportListItem>
          <ReportListLink to="/new-report">New Report</ReportListLink>
        </ReportListItem>
      </ReportsList>
    </Aside>
  );
}

const mapStateToProps = state => ({
  reports: state.reports,
});

export default connect(mapStateToProps)(Navigation);