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
  PersonOutline as PersonOutlineIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const navItems = [
  { label: 'About Us', hasMenu: true },
  { label: 'Hmm', hasMenu: true },
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <ListItemButton key={item.label}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
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
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  endIcon={
                    item.hasMenu ? (
                      <KeyboardArrowDownIcon fontSize="small" />
                    ) : undefined
                  }
                  sx={{ fontWeight: 500, textTransform: 'none' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" size="large">
            <PersonOutlineIcon />
          </IconButton>
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
    </>
  );
}

export default NavBar;
