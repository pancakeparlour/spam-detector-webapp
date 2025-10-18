import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Drawer, List,
  ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import {
  Menu as MenuIcon, Home as HomeIcon, Mail as MailIcon, DataUsage as DataUsageIcon
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  
  //Inquiry form input field states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobRole, setJobRole] = useState('')
  const [inquiryBody, setInquiryBody] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

const [defaultErrors, setDefaultErrors] = useState({});

  const submit = (e) => {
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
    alert(`Form submitted`);
  }
  };

const resetForm = () => {
  setFirstName('');
  setLastName('');
  setEmailAddress('');
  setPhoneNumber('');
  setJobRole('');
  setInquiryBody('');
  setDefaultErrors({});
};


  // Nav menu drawer content
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'Inquire', 'Data visualisation'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <HomeIcon />
              ) : index === 1 ? (
                <MailIcon />
              ) : (
                <DataUsageIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PixelNest Labs Careers
          </Typography>

          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      <div className="App" style={{ textAlign: 'left', marginTop: '50px', marginLeft: '10px' }}>
      
      {/*Job inquiry form*/}
      <form onSubmit={submit}>
      <h2>Job Inquiry</h2>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>

      {/*Personal details section*/}
      <Box sx={{ flex: 1 }}>
      <h3>Your details:</h3>
      <p>Ensure your details are correct. We will want to contact you about your inquiry!</p>

      {/*First name*/}
      <label htmlFor="firstName"> First Name:</label>
        <input type="text" placeholder="Joe" name="firstName" value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
        {defaultErrors.firstName && <div>{defaultErrors.firstName}</div>}
        <br />

      {/*Last name*/}
      <label htmlFor="lastName"> Last Name:</label>
        <input type="text" placeholder="Doe" name="lastName" value={lastName}
        onChange={(e) => setLastName(e.target.value)}/>
        {defaultErrors.lastName && <div>{defaultErrors.lastName}</div>}
        <br />

      {/*Email*/}
      <label htmlFor="emailAddress"> Email address:</label>
        <input type="text" placeholder="joe.do@mail.com" name="emailAddress" value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}/>
        {defaultErrors.emailAddress && <div>{defaultErrors.emailAddress}</div>}
        <br />

      {/*Phone*/}
      <label htmlFor="phoneNumber"> Phone number:</label>
        <input type="text" placeholder="0123 456 789" name="phoneNumber" value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}/>
        {defaultErrors.phoneNumber && <div>{defaultErrors.phoneNumber}</div>}
        <br />
      </Box>

      {/*Inquiry section*/}
      <Box sx={{ flex: 1 }}>
      <h3>Inquiry:</h3>
      <p>Select a job you want to inquire about and write your enquiry in the text field below.</p>
      
      {/*Job role*/}
      <div>
        <label htmlFor="jobRole">I'm inquiring about:</label> <br />
        <input type="radio" name="jobRole" value="Lead Designer" checked={jobRole === 'Lead Designer'}
        onChange={(e) => setJobRole(e.target.value)}/> Lead Designer
        <input type="radio" name="jobRole" value="Designer" checked={jobRole === 'Designer'}
        onChange={(e) => setJobRole(e.target.value)}/> Designer
        <input type="radio" name="jobRole" value="Receptionist" checked={jobRole === 'Receptionist'}
        onChange={(e) => setJobRole(e.target.value)}/> Receptionist
        {defaultErrors.jobRole && <div>{defaultErrors.jobRole}</div>}
      </div>

      <br />

      {/*Inquiry body*/}
      <div>
        <label htmlFor="inquiryBody">Inquiry message:</label> <br />
        <textarea name="inquiryBody" id="inquiryBody" cols="80" rows="10" placeholder="Write your inquiry here..." value={inquiryBody}
        onChange={(e) => setInquiryBody(e.target.value)}/>
        {defaultErrors.inquiryBody && <div>{defaultErrors.inquiryBody}</div>}
      </div>
      </Box>

     </Box>

      <Button type="button" onClick={resetForm} variant="contained" color="inherit">
        Clear
        </Button>

      <Button type="submit" variant="contained" color="inherit">
        Submit
        </Button>
    </form>
    </div>
    </Box>
  );
}

export default App;
