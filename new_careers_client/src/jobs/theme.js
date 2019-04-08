import styled from '@emotion/styled/macro';

export const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 30rem) {
    width: 28rem;
  }
  margin-top: 5rem;
`;

export const CardDetails = styled.div`
  display: 'flex',
  flexDirection: 'column'
`;

