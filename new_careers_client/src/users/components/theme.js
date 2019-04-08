import styled from '@emotion/styled/macro';

export const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 50rem) {
    width: 48rem;
  }
  margin-top: 5rem;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
