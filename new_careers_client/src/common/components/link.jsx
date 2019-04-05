import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import Typography from '@material-ui/core/Typography';

export default props => (
  <Link {...props}>
    <Typography color="secondary" variant="subtitle1" component={styled.span()}>
      {props.children}
    </Typography>
  </Link>
);
