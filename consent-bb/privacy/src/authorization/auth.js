import axios from "axios";
import { getSession, setSession } from "./utils";


import { history } from "../history";
// const loginEndpoint = store.config.apiEndpoints.login;
// const logoutEndpoint = store.config.apiEndpoints.logout;

class Auth {
    constructor(store) {
        this.store = store;
        // this.loginEndpoint = store.config.apiEndpoints && store.config.apiEndpoints.login || null;
        // this.logoutEndpoint = store.config.apiEndpoints && store.config.apiEndpoints.logout || null;
    }

    error = null;
    isAuthenticated = false;

    // Access token
    accessToken = null;
    accessTokenExpiresIn = null;

    // Refresh token
    refreshToken = null;

    get token() {
        return this.accessToken;
    }



    login = (username, password) => {
        this.authorize(username, password);
    };

    // Parse JWT token
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // Check if the object is valid.
    isValidObject = (obj) => {
        return obj !== 'null' && obj !== 'undefined'
    };

    // Handle refresh token
    handleRefreshToken = () => {

        if (this.isAuthenticated && this.isValidObject(this.accessToken) && this.isValidObject(this.refreshToken)) {
            const accessTokenExpiresIn = this.parseJwt(this.accessToken).exp;
            const currentDateInUTC = Math.floor((new Date()).getTime() / 1000);
            const refreshTokenExpiresIn = this.parseJwt(this.refreshToken).exp;

            if (refreshTokenExpiresIn - currentDateInUTC < 10) {
                // Refresh token is expired.

                // Logout the user.
                this.logout();
            } else {
                // Check if access token is expired
                if (accessTokenExpiresIn - currentDateInUTC < 10) {

                    if (getSession("isIdpLogin") === "true") {
                        // Perform local logout by clearing local storage
                        this.clearSession();
                        this.isAuthenticated = false;
                        history.replace("/dashboard");
                    } else {
                        let body = {
                            refreshtoken: this.refreshToken,
                            clientId: this.store.config.clientId
                        }

                        axios.post(`${this.store.config.apiEndpoints.refreshToken}`, body, {
                            headers: { "Content-Type": "application/json" }
                        }).then(response => {

                            let expireAt = JSON.stringify(
                                response.data.expiresIn * 1000 + new Date().getTime()
                            );

                            this.refreshToken = response.data.refreshToken;
                            this.accessToken = response.data.accessToken;

                            // Set new access token
                            localStorage.setItem("accessToken", response.data.accessToken);

                            // Set new refresh token
                            localStorage.setItem("refreshToken", response.data.refreshToken);

                            // Set new expire at
                            localStorage.setItem("expiresIn", expireAt);


                        }).catch(error => {

                        });
                    }



                }
            }


        }




    }

    // for creating user.
    backgroundLogin = (username, password) => {
        if (username && password) {
            let body = {
                Username: username,
                Password: password
            };
            return axios.post(`${this.store.config.apiEndpoints.login}`, body, {

                headers: { "Content-Type": "application/json" }
            })
        }

    };


    forgotPassword = (username) => {
        // Forgot password
        const body = {
            username: username,
        };

        return axios.put(`${this.store.config.apiEndpoints.forgotPassword}`, body, {
            headers: { "Content-Type": "application/json" }
        })

    };

    authorize = (username, password) => {
        if (username && password) {
            let body = {
                username: username,
                password: password
            };
            axios
                .post(`${this.store.config.apiEndpoints.login}`, body, {
                    headers: { "Content-Type": "application/json" }
                })
                .then(this.parseAuthenticationResponse)
                .catch(error => {
                    // console.error("Error occured while login: ", error.response.data.errorDescription);
                    // Save error to the store
                    if (error.response) {
                        this.store.authStore.error = error.response.data.errorDescription
                    } else { this.store.authStore.error = error.message; }
                    // Hide loader
                    this.store.authStore.isLoading = false;
                })
        }
    };

    logout = () => {
        try {
            // Perform online logout for IDP if available
            if (getSession("isIdpLogin") === "true") {
                // const data = {
                //     client_id: this.store.idpConfig.clientId,
                //     refresh_token: this.refreshToken,
                //     redirect_uri: 'http://userapp.bb-consent.local'
                // }

                if (!this.store) {
                    return;
                }


                if (!this.store.idpConfig) {
                    return;
                }

                if (!this.store.idpConfig.logoutUrl) {
                    return;
                }

                this.clearSession();
                this.isAuthenticated = false;

                // Create form to send POST request.
                const form = document.createElement("form");

                form.setAttribute("method", "POST");
                form.setAttribute("action", this.store.idpConfig.logoutUrl);
                form.style.display = "none";

                // Add data to form as hidden input fields.
                const data = {
                    refresh_token: this.refreshToken,
                    client_id: this.store.idpConfig.clientId
                };

                for (const [name, value] of Object.entries(data)) {
                    const input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", name);
                    input.setAttribute("value", value);

                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();

                // axios.post(this.store.idpConfig.logoutUrl, data, {
                //     headers: {
                //         'Authorization': `Bearer ${this.accessToken}`,
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     }
                // }).then((res) => { }).catch((error) => {
                //     // Perform local logout by clearing local storage
                //     this.clearSession();
                //     this.isAuthenticated = false;
                //     history.replace("/dashboard");
                // })
            }
        } finally {
            // Perform local logout by clearing local storage
            this.clearSession();
            this.isAuthenticated = false;
            history.replace("/dashboard");
        }


    };

    parseOIDCAuthenticationResponse = res => {
        // Parse authentication response

        // Hide loader
        this.store.authStore.isLoading = false;

        // Check response status code is 200
        if (res.status === 200) {
            const loginRes = res.data;
            this.error = null;
            if (loginRes.token) {
                console.log(loginRes);
                if (this.store.authStore.isRemember) {
                    // Remember me - store credentials in session
                    setSession({
                        ...loginRes.token,
                        userId: loginRes.userInfo.subject,
                        username: loginRes.userInfo.email,
                        email: loginRes.userInfo.email,
                        isIdpLogin: "true"
                    });
                }
                // Access token
                this.accessToken = loginRes.token.accessToken;
                // Refresh token
                this.refreshToken = loginRes.token.refreshToken;
                // Access token expires in
                this.accessTokenExpiresIn = loginRes.token.expiresIn;
                // Individual id
                this.userId = loginRes.userInfo.subject;
                // Is authenticated or not
                this.isAuthenticated = true;

            } else {
                console.error("Error: Access token is not present in login response");
            }
            if (loginRes.userInfo) {
                // Update individual store
                this.store.user.name = loginRes.userInfo.profile;
                this.store.user.email = loginRes.userInfo.email;
            }
        }

        // Navigate to dashboard
        // Since login is successful
        history.push("/dashboard");

    };

    parseAuthenticationResponse = res => {
        // Parse authentication response

        // Hide loader
        this.store.authStore.isLoading = false;

        // Check response status code is 200
        if (res.status === 200) {
            const loginRes = res.data;
            this.error = null;
            if (loginRes.token) {
                if (this.store.authStore.isRemember) {
                    // Remember me - store credentials in session
                    setSession({
                        ...loginRes.token,
                        userId: loginRes.individual.id,
                        username: loginRes.individual.name,
                        email: loginRes.individual.email,
                        isIdpLogin: "false"
                    });
                }
                // Access token
                this.accessToken = loginRes.token.accessToken;
                // Refresh token
                this.refreshToken = loginRes.token.refreshToken;
                // Access token expires in
                this.accessTokenExpiresIn = loginRes.token.expiresIn;
                // Individual id
                this.userId = loginRes.individual.id;
                // Is authenticated or not
                this.isAuthenticated = true;

            } else {
                console.error("Error: Access token is not present in login response");
            }
            if (loginRes.individual) {
                // Update individual store
                this.store.user.name = loginRes.individual.name;
                this.store.user.email = loginRes.individual.email;
            }
        }

        // Navigate to dashboard
        // Since login is successful
        history.push("/dashboard");

    };

    clearSession = () => {
        // Clear access token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("isIdpLogin");
    };

    isLoginValid = () => {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem("expiresIn"));
        if (expiresAt == null) {
            return false;
        }
        return new Date().getTime() < expiresAt;
    };
}

// const auth = new Auth();
export default Auth;
