import React from 'react';
import { Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderLeft: active ? '4px solid black' : 'none',
}));

const Sidebar = ({ activeSection, setActiveSection, onLogout, userRole }) => {
  const navigate = useNavigate();

  const handleAdminPanelClick = () => {
    setActiveSection("admin");
    navigate("/admin");
  };

  return (
    <Paper style={{ height: '50vh', padding: '16px', backgroundColor: '#F5F5F5' }}>
      <List>
        <StyledListItem
          button
          active={activeSection === 'orders' ? 1 : 0}
          onClick={() => setActiveSection('orders')}
        >
          <ListItemText primary="Zamówienia" />
        </StyledListItem>
        {userRole === "ADMIN" && (
          <>
            <Divider />
            <StyledListItem
              button
              active={activeSection === 'admin' ? 1 : 0}
              onClick={handleAdminPanelClick}
            >
              <ListItemText primary="Panel Administratora" />
            </StyledListItem>
          </>
        )}
        <Divider />
        <StyledListItem
          button
          onClick={onLogout}
        >
          <ListItemText primary="Wyloguj" />
        </StyledListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
