import styled from '@emotion/styled/macro';

export const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 50rem) {
    width: 48rem;
  }
  margin: 1rem 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    &:not(:last-child) {
      flex-grow: 1;
      margin-bottom: 1rem;
    }
    flex-grow: 1000;
  }
  @media(min-width: 50rem) {
    & > *:not(:last-child) {
      margin-bottom: 0;
      margin-right: 1rem;
    }
    flex-direction: row;
  }
  margin: 1rem 0;
`;

export const Header = styled.div`
  padding: 0.5rem;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
