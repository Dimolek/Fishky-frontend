import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link, useHistory} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import {logout} from "./user/Logout";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
    },
    bar: {
        color: 'white',
        backgroundColor: "#D13434"
    },
}));


export default function MenuAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const history = useHistory();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = event => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    {props.isAuthenticated && (
                        <div>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                        onClick={handleMenu}>
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link to='/' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Home</MenuItem>
                                </Link>
                                <Link to='/Manage' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Manage flashcards</MenuItem>
                                </Link>
                                <Link to='/Practice' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Practice</MenuItem>
                                </Link>
                                <MenuItem onClick={e => { logout(props, history) }}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!props.isAuthenticated && (
                        <div>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                        onClick={handleMenu}>
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link to='/' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Home</MenuItem>
                                </Link>
                                <Link to='/Login' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Login</MenuItem>
                                </Link>
                                <Link to='/Register' style={{textDecoration: 'none', display: 'block'}}>
                                    <MenuItem onClick={handleClose}>Create account</MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )}
                    <Typography variant="h6" className={classes.content}>
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}