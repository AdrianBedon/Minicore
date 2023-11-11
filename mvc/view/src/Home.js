import React from "react";
import './App.css';
import AppNavbar from "./AppNavbar";
import LoginForm from "./LoginForm";
import WelcomeContent from "./WelcomeContent";
import { setAuthHeader, request, getAuthToken, setRole } from "./helper/axios_helper";

class Home extends React.Component {
    constructor(props) {
        super(props);
        const authToken = getAuthToken();
        this.state = {
            componentToShow: authToken !== null && authToken !== "null" ? "welcome" : "login"
        };
    }

    login = () => {
        this.setState({componentToShow: "login"})
    };

    logout = () => {
        this.setState({componentToShow: "login"})
        setAuthHeader(null);
    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                setRole(response.data.role);
                this.setState({ componentToShow: "welcome" });
            }).catch(
            (error) => {
                setAuthHeader(null);
                setRole(null);
                this.setState({ componentToShow: "login" });
            }
        );
    };

    onRegister = (event, firstName, lastName, username, password, role) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password,
                role: role,
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                setRole(response.data.role);
                this.setState({ componentToShow: "welcome" });
            }).catch(
            (error) => {
                setAuthHeader(null);
                setRole(null);
                this.setState({ componentToShow: "login" });
            }
        );
    };

    render() {
        return (
            <div color="dark" className="home-container">
                <AppNavbar />
                {this.state.componentToShow === "welcome" && <WelcomeContent logout={this.logout}/>}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    };
}

export default Home;