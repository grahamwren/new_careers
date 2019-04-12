import styled from '@emotion/styled/macro';

export const Container = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 30rem) {
    width: 28rem;
  }
  margin: 1rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
