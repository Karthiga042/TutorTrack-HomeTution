import React from 'react';
import { Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { LocationOn, Subject, School, Info, HelpOutline, Gavel, Feedback } from '@mui/icons-material';
import { Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-header">
              Top Locations
            </Typography>
            <List>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Delhi" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Bangalore" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Pondicherry" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Hyderabad" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Mumbai" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Chennai" />
                </Link>
              </ListItem>
              <ListItem>
                <LocationOn className="footer-icon" />
                <Link href="/topcities" color="inherit" underline="none">
                  <ListItemText primary="All Locations" />
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-header">
              Top Subjects
            </Typography>
            <List>
              <ListItem>
                <Subject className="footer-icon" />
                <Link href="/shopcategory/mathematics" color="inherit" underline="none">
                  <ListItemText primary="Mathematics" />
                </Link>
              </ListItem>
              <ListItem>
                <Subject className="footer-icon" />
                <Link href="/shopcategory/english" color="inherit" underline="none">
                  <ListItemText primary="English" />
                </Link>
              </ListItem>
              <ListItem>
                <Subject className="footer-icon" />
                <Link href="/shopcategory/biology" color="inherit" underline="none">
                  <ListItemText primary="Biology" />
                </Link>
              </ListItem>
              <ListItem>
                <Subject className="footer-icon" />
                <Link href="/shopcategory/computerscience" color="inherit" underline="none">
                  <ListItemText primary="Computer Science" />
                </Link>
              </ListItem>
              <ListItem>
                <Subject className="footer-icon" />
                <Link href="/courses" color="inherit" underline="none">
                  <ListItemText primary="All Subjects" />
                </Link>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-header">
              Tuition Jobs
            </Typography>
            <List>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Delhi" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Bangalore" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Pondicherry" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Hyderabad" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Mumbai" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link color="inherit" underline="none">
                  <ListItemText primary="Chennai" />
                </Link>
              </ListItem>
              <ListItem>
                <School className="footer-icon" />
                <Link href="/topcities" color="inherit" underline="none">
                  <ListItemText primary="All Locations" />
                </Link>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-header">
              About
            </Typography>
            <List>
              <ListItem>
                <Info className="footer-icon" />
                <Link href="/contactus" color="inherit" underline="none">
                  <ListItemText primary="Contact Us" />
                </Link>
              </ListItem>
              <ListItem>
                <Info className="footer-icon" />
                <Link href="/aboutus" color="inherit" underline="none">
                  <ListItemText primary="Who are We" />
                </Link>
              </ListItem>
              <ListItem>
                <HelpOutline className="footer-icon" />
                <Link href="/help" color="inherit" underline="none">
                  <ListItemText primary="Help Center" />
                </Link>
              </ListItem>
              <ListItem>
                <Gavel className="footer-icon" />
                <Link href="/privacy" color="inherit" underline="none">
                  <ListItemText primary="Terms and Conditions" />
                </Link>
              </ListItem>
              <ListItem>
                <Feedback className="footer-icon" />
                <Link href="/feedback" color="inherit" underline="none">
                  <ListItemText primary="Feedback" />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
