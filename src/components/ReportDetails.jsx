import React from 'react';
import { connect } from 'react-redux';

// import Splitting from 'splitting';
// import "splitting/dist/splitting.css";
// import "splitting/dist/splitting-cells.css";

import styled from 'styled-components';
import DetailsContainer from './DetailsContainer';

import { selectReportRequest } from '../state/actions';

const ReportTitle = styled.h3`
  margin: 1rem 0;
  font-size: 1.25rem;
`;

function ReportDetails(props) {
  const { current, selectReport } = props;
  const reportId = props.match.params.id;

  if (reportId && reportId !== 'new-report') {
    selectReport(reportId);
  }

  // React.useEffect(() => {
  //   if (current) {
  //     Splitting({
  //       target: '.report-p',
  //       by: 'chars',
  //     });
  //   }
  // }, [current]);

  return (
    <DetailsContainer>
      { current && (
        <React.Fragment>
          <ReportTitle>{ current.title }</ReportTitle>
          { current.content.map((paragraph, i) => (
            <p className="report-p" key={i}>{ paragraph }</p>
          )) }
        </React.Fragment>
      ) }
    </DetailsContainer>
  );
}

const mapStateToProps = state => ({
  current: state.current,
});
const mapDispatchToProps = dispatch => ({
  selectReport: (reportId) => dispatch(selectReportRequest(reportId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails);