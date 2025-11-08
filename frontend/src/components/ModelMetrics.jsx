// implements the appbar + drawer impl. for the metrics
// added basic metrics viewing as a feature to have a second endpoint
import React, { useEffect, useState } from 'react';
import {Box, Button,
  Alert,Dialog,Typography,
  DialogActions,
  DialogContent,
  DialogTitle,Grid,
} from '@mui/material';
import axios from 'axios';

const METRIC_LABELS = {
  precision: 'Precision',
  recall: 'Recall',
  f1: 'F1 Score',
};

const ModelMetrics = ({ open, onClose }) => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    let active = true;

    const loadMetrics = async () => {
      setError('');
      setMetrics(null);

      try {
        const { data } = await axios.get('http://127.0.0.1:8000/metrics');
        if (active) setMetrics(data);
      } catch (err) {
        console.error(err);
        if (active) setError('Unable to load the models metrics right now.');
      }
    };

    loadMetrics();
    return () => {
      active = false;
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Here are some metrics of our spam checking ML model:</DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}

        {metrics && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.entries(METRIC_LABELS).map(([key, label]) => (
              <Grid item xs={6} key={key}>
                <Box sx={{ textAlign: 'center', p: 1.5, borderRadius: 2, backgroundColor: '#f5f8ff' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="h5">
                    {(metrics[key] * 100).toFixed(1)}%
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelMetrics;
