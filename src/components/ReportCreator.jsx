import React from 'react';
import styled from 'styled-components';

import DetailsContainer from './DetailsContainer';

const TitleEditor = styled.input`
  width: 100%;
  display: block;
  border: none;
  background: transparent;
  padding: 2px 4px;
  font-size: 1.5rem;
  font-weight: 600;
`;

function ReportCreator(props) {
  return (
    <DetailsContainer>
      <TitleEditor />
      <textarea></textarea>
    </DetailsContainer>
  );
}

export default ReportCreator;