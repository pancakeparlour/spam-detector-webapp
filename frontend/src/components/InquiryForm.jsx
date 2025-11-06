import React, { useState } from 'react';
import InquiryResultPopup from './InquiryResultPopup';
import '../App.css';
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
  Tooltip,
  IconButton,
  Snackbar,
  Fade,
} from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
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

  // state for holding the result (fr data viz) from backend
  const [resultData, setResultData] = useState(null);
  const [resultOpen, setResultOpen] = useState(false);

  // state to toggle help tooltips
  const [showHelp, setShowHelp] = useState(false);

  // state for tooltip that tells user to scroll down
  const [showScrollPopup, setShowScrollPopup] = useState(false);

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

      try {
        const response = await axios.post('http://127.0.0.1:8000/inquiry', {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          jobRole,
          inquiryBody,
        });

        setSubmitMessage('form submitted successfully!');
        setResultData(response.data);
        setResultOpen(true);
        resetForm();

        // shows temporary tooltip saying to scroll
        setShowScrollPopup(true);
        setTimeout(() => setShowScrollPopup(false), 3000);
      } catch (err) {
        setSubmitError('couldnt submit form, pls try again.');
        console.error(err);
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
  };

  return (
    <>
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
        {/* Help button at the top */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setShowHelp((prev) => !prev)}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Box>

        {/* Title box */}
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Interested in a career with us?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill out the inquiry form below, and we will let you know of any job opportunities.
          </Typography>
        </Box>

        {/* Form Content ('Your Details' & 'Inquiry' sections) */}
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

            <Tooltip
              title="Enter your first name here."
              placement="right"
              classes={{ tooltip: 'tooltip' }}
              open={showHelp}
            >
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
            </Tooltip>

            <Tooltip
              title="Enter your last name here."
              placement="right"
              classes={{ tooltip: 'tooltip' }}
              open={showHelp}
            >
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
            </Tooltip>

            <Tooltip
              title="Enter a valid personal email address that you check regularly."
              placement="right"
              classes={{ tooltip: 'tooltip' }}
              open={showHelp}
            >
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
            </Tooltip>

            <Tooltip
              title="Enter your valid 10-digit phone number."
              placement="right"
              classes={{ tooltip: 'tooltip' }}
              open={showHelp}
            >
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
            </Tooltip>
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
              <Tooltip
                title="Select a role you would like to inquire about."
                placement="top"
                classes={{ tooltip: 'tooltip' }}
                open={showHelp}
              >
                <FormLabel component="legend">I'm inquiring about:</FormLabel>
              </Tooltip>
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

            <Tooltip
              title="Include information about your career background, why you're interested, and any questions you have about the role."
              placement="bottom"
              classes={{ tooltip: 'tooltip' }}
              open={showHelp}
            >
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
            </Tooltip>
          </Box>
        </Box>

        {/* Clear & Submit buttons box */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip
            title="Click to clear all fields in the form."
            placement="bottom"
            classes={{ tooltip: 'tooltip' }}
            open={showHelp}
          >
            <Button type="button" onClick={resetForm} variant="outlined" color="primary">
              Clear
            </Button>
          </Tooltip>

          <Tooltip
            title="Click to submit the form."
            placement="right"
            classes={{ tooltip: 'tooltip' }}
            open={showHelp}
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Tooltip>
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
      </Box>

      {/* Tooltip saying to scroll down */}
      <Snackbar
        open={showScrollPopup}
        onClose={() => setShowScrollPopup(false)}
        autoHideDuration={3000}
        message="Scroll down to view your spam detection result"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Fade}
      />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          py: 2,
          textAlign: 'center',
          borderTop: 1,
          borderColor: 'divider',
          mt: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Developed by XLR Web Solutions Ltd
        </Typography>
      </Box>
    </>
  );
}

export default InquiryForm;
