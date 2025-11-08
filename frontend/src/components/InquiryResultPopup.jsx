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
function InquiryResultPopup({ open, onClose, result }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Inquiry Spam Results</DialogTitle>
      <DialogContent dividers>
        {result ? (
          <>
            {/* display verdict */}
            <Typography variant="h6" gutterBottom>
              Spam or not: {result.label.toUpperCase()}
            </Typography>
            {/* eg metric 2: spam probability */}
            <Typography variant="body1">
              Spam prob: { (result.probability * 100).toFixed(1) }%
            </Typography>
            {/* eg metric 3: model metrics: */}
            {Object.entries(result.metrics).map(([key, value]) => (
              <Typography key={key} variant="body2">
                {key}: {value}
              </Typography>
            ))}
          </>
        ) : ( // if no result comes back, show this msg:
          <Typography variant="body1">
            No data received! ..change this things size as necessary. use rem values for consistency.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InquiryResultPopup;