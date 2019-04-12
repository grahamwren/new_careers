import styled from '@emotion/styled/macro';

export const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 50rem) {
    width: 48rem;
  }
  margin: 1rem 0;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
