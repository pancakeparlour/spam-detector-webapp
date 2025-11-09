import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import AboutUsPopup from './AboutUsPopup';
import ModelMetrics from './ModelMetrics';

const navItems = [
  { label: 'About Us' },
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false); // moved inside component
  const [metricsOpen, setMetricsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 260,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PixelNestLabs
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => {
              if (item.label === 'About Us') setAboutUsOpen(true);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        
        <ListItemButton onClick={() => setMetricsOpen(true)}>
          <ListItemText primary="Model Metrics" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="lg"
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                mr: { xs: 1, md: 4 },
              }}
            >
              PixelNestLabs
            </Typography>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2,
                marginLeft: 'auto',
              }}
            >
              <Button
                color="primary"
                onClick={() => setMetricsOpen(true)}
                sx={{ fontWeight: 500, textTransform: 'none' }}
              >
                Model Metrics
              </Button>

              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  endIcon={
                    item.hasMenu ? (
                      <KeyboardArrowDownIcon fontSize="small" />
                    ) : undefined
                  }
                  onClick={() => {
                    if (item.label === 'About Us') setAboutUsOpen(true);
                  }}
                  sx={{ fontWeight: 500, textTransform: 'none', '&:hover': { backgroundColor: '#b4b4b4ff' } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconButton
                color="inherit"
                size="large"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                aria-label="open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* About Us popup*/}
      <AboutUsPopup
        open={aboutUsOpen}
        onClose={() => setAboutUsOpen(false)}
      />

        {/* model metrics popup*/}
      <ModelMetrics
        open={metricsOpen}
        onClose={() => setMetricsOpen(false)}
      />
    </>
  );
}

export default NavBar;
