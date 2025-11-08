import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

// play around w/ this component for data viz. separate code
// into more files if needed
function AboutUsPopup({ open, onClose, result }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>About Us</DialogTitle>
      <DialogContent dividers>
        PixelNestLabs is an Australian-owned and operated graphic design studio operating in Hawthorn, Melbourne. We create professional grade branding and visuals for companies here in Australia, and internationally.
        <br /><br />
        We are looking for creatives of any skill level to join our team. Training will be provided if needed, so anyone is welcome to inquire about positions with us.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutUsPopup;