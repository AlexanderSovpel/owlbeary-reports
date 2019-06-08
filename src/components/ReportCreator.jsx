import React from 'react';
import { Formik } from 'formik';

import styled from 'styled-components';
import DetailsContainer from './DetailsContainer';

const TitleEditor = styled.input`
  width: 100%;
  display: block;
  border: none;
  background: transparent;
  padding: 0px;
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: inherit;
`;
const ContentEditor = styled.textarea`
  width: 100%;
  height: 90vh;
  display: block;
  border: none;
  background: transparent;
  padding: 0px;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
`;

const initialValues = {
  title: '',
  content: '',
};

function ReportCreator(props) {
  return (
    <DetailsContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={console.log}
      >
        { formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <TitleEditor
              name="title"
              value={formProps.values.title}
              onChange={formProps.handleChange}
              autoFocus={true}
            />
            <ContentEditor
              name="content"
              value={formProps.values.content}
              onChange={formProps.handleChange}
            />
          </form>
        ) }
      </Formik>
    </DetailsContainer>
  );
}

export default ReportCreator;