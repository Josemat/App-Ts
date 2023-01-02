import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { AuthContext } from '../context/setAuth';
import { Link } from 'wouter';

const settings = ['Perfil', 'Cuenta', 'Logout'];

function ResponsiveAppBar() {
  const context = React.useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '5px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Icono componente */}
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Asistencias
            </Typography>
          </Link>

          {context?.user.nombre ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav || null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/asistencianueva">
                    <Typography textAlign="center">Crear asistencia</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/buscarcoche">
                    <Typography textAlign="center">Buscar coche</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
          {/* icono componente XS */}
          <Link href="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Asistencias
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', color: 'white' },
            }}
          >
            {context?.user.nombre ? (
              <>
                <Link href="/asistencianueva">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Crear asistencia
                  </Button>
                </Link>
                <Link href="/buscarcoche">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Buscar coche
                  </Button>
                </Link>
              </>
            ) : null}
          </Box>
          {!context?.user.nombre ? (
            <Link href="/login">
              <Button color="warning" variant="contained" href="/login">
                Login
              </Button>
            </Link>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`Panel de ${context.user.nombre}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={context.user.nombre} src={context.user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser || null}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link href="/perfil">
                  <MenuItem key="perfil" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Perfil</Typography>
                  </MenuItem>
                </Link>
                <MenuItem
                  key="Logout"
                  onClick={() => {
                    handleCloseUserMenu;
                    context.logOut();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
