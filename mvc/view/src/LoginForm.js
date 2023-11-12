import React, { Component } from "react";
import { Modal, ModalBody, Nav, TabContent, TabPane, Form, FormGroup, Label, Input, Button, NavItem, NavLink, Container, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Row, Col} from 'reactstrap';
import classnames from 'classnames';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'login',
            firstName: '',
            lastName: '',
            login: '',
            password: '',
            role:'',
            dropdownOpen: false,
            modalOpen: false // New state for managing modal visibility
        };
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleLoginSubmit = (e) => {
        this.props.onLogin(e, this.state.login, this.state.password);
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    handleRegisterSubmit = (e) => {
        this.props.onRegister(e, this.state.firstName, this.state.lastName, this.state.login, this.state.password, this.state.role);
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    // Function to toggle the modal
    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    render() {
        return (
            <div>
                <Container fluid className="d-flex justify-content-center">
                    <Button className="btn btn-primary" style={{verticalAlign: "top"}} onClick={this.toggleModal}>Open Login Form</Button>
                </Container>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'login' })}
                                    onClick={() => this.toggleTab('login')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'register' })}
                                    onClick={() => this.toggleTab('register')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Register
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="login">
                                <Form onSubmit={this.handleLoginSubmit}>
                                    <FormGroup>
                                        <Label for="loginName">Username</Label>
                                        <Input type="text" name="login" id="loginName" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="loginPassword">Password</Label>
                                        <Input type="password" name="password" id="loginPassword" onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button color="primary" block>Sign in</Button>
                                </Form>
                            </TabPane>
                            <TabPane tabId="register">
                                <Form onSubmit={this.handleRegisterSubmit}>
                                    <p></p>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstName">First Name</Label>
                                                <Input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastName">Last Name</Label>
                                                <Input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="registerLogin">Username</Label>
                                                <Input type="text" name="login" id="registerLogin" onChange={this.handleChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="registerRole">Role</Label>
                                                <Dropdown name="role" id="registerRole" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                                    <DropdownToggle caret color="dark" className="w-100">
                                                        {this.state.role ? this.state.role : 'Select Role'}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => this.setState({ role: 'ADMIN' })}>ADMIN</DropdownItem>
                                                        <DropdownItem onClick={() => this.setState({ role: 'USER' })}>USER</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="registerPassword">Password</Label>
                                        <Input type="password" name="password" id="registerPassword" onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button color="primary" block>Sign up</Button>
                                </Form>
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LoginForm;
