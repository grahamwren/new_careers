import styled from '@emotion/styled/macro';

export const RegisterContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 30rem) {
    width: 28rem;
  }
  margin-top: 5rem;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
