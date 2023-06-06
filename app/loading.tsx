'use client';

// https://nextjs.org/docs/app/api-reference/file-conventions/loading

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { type ReactElement } from 'react';

export default function CircularIndeterminate(): ReactElement {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}
