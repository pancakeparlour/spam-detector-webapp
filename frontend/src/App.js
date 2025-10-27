import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import InquiryForm from './components/InquiryForm';

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          pt: { xs: 3, md: 5 },
          px: { xs: 2, md: 6 },
          pb: 6,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <InquiryForm />
      </Box>
    </>
  );
}

export default App;
