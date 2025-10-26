import React, { useState } from 'react';
import { Box, Button, Typography, Alert} from '@mui/material';
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
      // alert('Form submitted');
      setSubmitMessage('');
      setSubmitError('');

      try {
        // try to post form data to backend
        await axios.post('http://127.0.0.1:8000/inquiry', {
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          jobRole,
          inquiryBody,
        });
        // set the submit msg and reset the form
        setSubmitMessage('form submitted successfully!');
        resetForm();
      } catch (err) {
        // otherwise, show error message that we caught
        setSubmitError('coulnt submit form, pls try again.');
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
          Job Inquiry
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Provide your details so we can respond to your interest quickly.
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
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Your details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ensure your contact information is accurate so we can follow up.
          </Typography>

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Joe"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {defaultErrors.firstName && <div>{defaultErrors.firstName}</div>}
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Doe"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {defaultErrors.lastName && <div>{defaultErrors.lastName}</div>}
          <br />

          <label htmlFor="emailAddress">Email address:</label>
          <input
            type="text"
            placeholder="joe.do@mail.com"
            name="emailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          {defaultErrors.emailAddress && <div>{defaultErrors.emailAddress}</div>}
          <br />

          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="text"
            placeholder="0123 456 789"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {defaultErrors.phoneNumber && <div>{defaultErrors.phoneNumber}</div>}
          <br />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Inquiry
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a role and share what you would like us to know.
          </Typography>

          <div>
            <label htmlFor="jobRole">I'm inquiring about:</label> <br />
            <input
              type="radio"
              name="jobRole"
              value="Lead Designer"
              checked={jobRole === 'Lead Designer'}
              onChange={(e) => setJobRole(e.target.value)}
            />
            {' '}
            Lead Designer
            <input
              type="radio"
              name="jobRole"
              value="Designer"
              checked={jobRole === 'Designer'}
              onChange={(e) => setJobRole(e.target.value)}
            />
            {' '}
            Designer
            <input
              type="radio"
              name="jobRole"
              value="Receptionist"
              checked={jobRole === 'Receptionist'}
              onChange={(e) => setJobRole(e.target.value)}
            />
            {' '}
            Receptionist
            {defaultErrors.jobRole && <div>{defaultErrors.jobRole}</div>}
          </div>

          <br />

          <div>
            <label htmlFor="inquiryBody">Inquiry message:</label> <br />
            <textarea
              name="inquiryBody"
              id="inquiryBody"
              cols="80"
              rows="10"
              placeholder="Write your inquiry here..."
              value={inquiryBody}
              onChange={(e) => setInquiryBody(e.target.value)}
            />
            {defaultErrors.inquiryBody && <div>{defaultErrors.inquiryBody}</div>}
          </div>
        </Box>
      </Box>

      {/* Clear & Submit buttons box */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="button" onClick={resetForm} variant="contained" color="inherit">
          Clear
        </Button>

        <Button type="submit" variant="contained" color="inherit">
          Submit
        </Button>
      </Box>
      
      {/* REMOVE temporary success/error messages */}
      {submitMessage && <Alert severity="success">{submitMessage}</Alert>}
      {submitError && <Alert severity="error">{submitError}</Alert>}
      {/* END REMOVE */}
    </Box>
  );
}

export default InquiryForm;
