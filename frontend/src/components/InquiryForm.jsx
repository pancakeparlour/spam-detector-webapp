import React, { useState } from 'react';
import InquiryResultPopup from './InquiryResultPopup';
import DataVisualizations from './DataVisualizations';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

function InquiryForm() {
  // REMOVE temporary state variables to hold return strings
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  // END REMOVE

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [inquiryBody, setInquiryBody] = useState('');
  const [defaultErrors, setDefaultErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // state for holding the result (fr data viz) from backend
  const [resultData, setResultData] = useState(null);
  const [resultOpen, setResultOpen] = useState(false);
  // Add state to track if charts should be shown
  const [showCharts, setShowCharts] = useState(false);
  // Store the inquiry text for charts
  const [submittedInquiryText, setSubmittedInquiryText] = useState('');

  // form submission handler (what happens when user presses 'Submit')
  const submit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!emailAddress.trim()) errors.emailAddress = 'Email is required';
    if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    if (!jobRole) errors.jobRole = 'Please select a role';
    if (!inquiryBody.trim()) errors.inquiryBody = 'Inquiry body is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailAddress && !emailRegex.test(emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }

    const phoneRegex = /^\d{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setDefaultErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmitMessage('');
      setSubmitError('');
      setIsSubmitting(true);

      try {
        // try to post form data to backend
        const response = await axios.post('http://127.0.0.1:8000/inquiry', {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          jobRole,
          inquiryBody,
        });
        // set the submit msg and reset the form
        setSubmitMessage('Form submitted successfully!');
        setResultData(response.data);
        setResultOpen(true);
        setSubmittedInquiryText(inquiryBody); // Store the inquiry text before clearing
        setShowCharts(true); // Enable charts display
        resetForm();
      } catch (err) {
        // otherwise, show error message that we caught
        setSubmitError('Could not submit form, please try again.');
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // form reset handler (what happens when user presses 'Clear')
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setPhoneNumber('');
    setJobRole('');
    setInquiryBody('');
    setDefaultErrors({});
    // Don't clear charts data here since user might want to see results after clearing form
  };

  // Function to clear all data including charts
  const clearAll = () => {
    resetForm();
    setResultData(null);
    setShowCharts(false);
    setSubmittedInquiryText('');
    setSubmitMessage('');
    setSubmitError('');
    setResultOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        backgroundColor: 'background.paper',
        p: 4,
        borderRadius: 2,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Title box */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Interested in a career with us?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Send us your details. We respond in minutes.
        </Typography>
      </Box>

      {/* Form Content ('Your Details' & 'Inquiry' sections)*/}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h3" gutterBottom>
            Your details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Make sure your contact information is accurate so we can follow up.
          </Typography>

          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Joe"
            fullWidth
            error={Boolean(defaultErrors.firstName)}
            helperText={defaultErrors.firstName}
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            fullWidth
            error={Boolean(defaultErrors.lastName)}
            helperText={defaultErrors.lastName}
          />

          <TextField
            label="Email address"
            name="emailAddress"
            type="email"
            placeholder="joe.do@mail.com"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            fullWidth
            error={Boolean(defaultErrors.emailAddress)}
            helperText={defaultErrors.emailAddress}
          />

          <TextField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            placeholder="0123 456 789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            error={Boolean(defaultErrors.phoneNumber)}
            helperText={defaultErrors.phoneNumber}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h3" gutterBottom>
            Inquiry
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a role and share what you would like us to know.
          </Typography>

          <FormControl
            component="fieldset"
            error={Boolean(defaultErrors.jobRole)}
            sx={{ mb: 3 }}
          >
            <FormLabel component="legend">I'm inquiring about:</FormLabel>
            <RadioGroup
              row
              name="jobRole"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            >
              <FormControlLabel
                value="Lead Designer"
                control={<Radio />}
                label="Lead Designer"
              />
              <FormControlLabel
                value="Designer"
                control={<Radio />}
                label="Designer"
              />
              <FormControlLabel
                value="Receptionist"
                control={<Radio />}
                label="Receptionist"
              />
            </RadioGroup>
            {defaultErrors.jobRole && (
              <FormHelperText>{defaultErrors.jobRole}</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Inquiry message"
            name="inquiryBody"
            placeholder="Write your inquiry here..."
            value={inquiryBody}
            onChange={(e) => setInquiryBody(e.target.value)}
            fullWidth
            multiline
            minRows={6}
            error={Boolean(defaultErrors.inquiryBody)}
            helperText={defaultErrors.inquiryBody}
          />
        </Box>
      </Box>

      {/* Clear & Submit buttons box */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="button" onClick={resetForm} variant="outlined" color="primary">
          Clear
        </Button>

        {/* Add Clear All button if charts are showing */}
        {showCharts && (
          <Button type="button" onClick={clearAll} variant="outlined" color="secondary">
            Clear All
          </Button>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
      
      {/* REMOVE temporary success/error messages */}
      {submitMessage && <Alert severity="success">{submitMessage}</Alert>}
      {submitError && <Alert severity="error">{submitError}</Alert>}
      {/* END REMOVE */}

      {/* The dialog popup fr showing data viz */}
      <InquiryResultPopup
        open={resultOpen}
        onClose={() => setResultOpen(false)}
        result={resultData}
      />

      {/* Prediction result visualizations - only show after successful submission */}
      {showCharts && resultData && submittedInquiryText && (
        <DataVisualizations 
          predictionResult={resultData} 
          emailText={submittedInquiryText}
        />
      )}
    </Box>
  );
}

export default InquiryForm;
