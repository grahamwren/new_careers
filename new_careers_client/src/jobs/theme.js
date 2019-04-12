import styled from '@emotion/styled/macro';

export const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 50rem) {
    width: 80%;
  }
  margin: 1rem 0;
`;

export const AppListCard = styled.div`
  margin-top: 2rem;
`;

export const EditContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 30rem) {
    width: 28rem;
  }
  margin-top: 5rem;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;