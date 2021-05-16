import * as React from 'react';
import { Button, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,   UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
    import Avatar from 'react-avatar';
import ErrorMessage from './ErrorMessage';
import withAuthProvider, { AuthComponentProps } from '../AuthProvider';
import { Link } from 'react-router-dom';
import './NavMenu.css';

class NavMenu extends React.PureComponent<AuthComponentProps, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        let error = null;
        if (this.props.error) {
          error = <ErrorMessage
            message={this.props.error.message}
            debug={this.props.error.debug} />;
        }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Aad.Spa</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {
                                    !this.props.isAuthenticated && (
                                        <NavItem>
                                        <Button
                                            onClick={() => this.props.login()}
                                            className="btn-link nav-link border-0"
                                            color="link">Sign In</Button>
                                    </NavItem>                                
                                    )
                                }
                                {
                                    this.props.isAuthenticated && (
                                        <UncontrolledDropdown>
                                        <DropdownToggle nav caret>
                                            <Avatar size="32" src={URL.createObjectURL(this.props.user.photo)} round="20px" style={{marginRight: "12px"}}/>
                                          <span>{this.props.user.displayName}</span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                          <h5 className="dropdown-item-text mb-0">{this.props.user.displayName}</h5>
                                          <p className="dropdown-item-text text-muted mb-0">{this.props.user.email}</p>
                                          <DropdownItem divider />
                                          <DropdownItem onClick={() => this.props.logout()}>Sign Out</DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>                                
                                    )
                                }
                                </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default withAuthProvider(NavMenu);