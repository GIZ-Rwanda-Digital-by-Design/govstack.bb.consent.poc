import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { store, services, auth } from "../../Provider/store";
import { withNamespaces } from "react-i18next";
import { getSession } from "authorization/utils";
import { history } from "../../history";
import { Form, Icon, Input, Checkbox, Divider, Spin } from "antd";
import { antIcon } from "./antIcon";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import "./login.css";
import loginIcon from "assets/icons/arrow.svg";
import qs from "qs";

@observer
class Login extends Component {
  constructor(props) {
    super(props);

    // Don't show login for OpenID connect subscription method
    this.state = { showLogin: true, openIdLoaderText: "" };
    this.handleOidcLogin = this.handleOidcLogin.bind(this);
  }

  componentWillMount() {
    if (auth.isLoginValid()) {
      auth.isAuthenticated = true;
      auth.accessToken = getSession("accessToken");
      auth.refreshToken = getSession("refreshToken");
      auth.userId = getSession("userId");
      store.user.name = getSession("username");
      store.user.email = getSession("email");

      // This is for handling QR code redirection if already authenticated.
      history.push("/dashboard");
    } else {
      // Read IDP configuration
      services
        .readIdp()
        .then((readIdpRes) => {
          if (readIdpRes.status === 200) {
            if (readIdpRes.data.idp !== null) {
              // Save IDP config to store
              store.idpConfig = readIdpRes.data.idp;

              // Handling OpenID connect subscription method
              const authorizationCode = qs.parse(this.props.location.search, {
                ignoreQueryPrefix: true,
              }).code;

              if (authorizationCode) {
                // Updating the loader text to be shown while waiting for the redirection towards org login page.
                this.setState({
                  openIdLoaderText:
                    "Successfully logged in, setting up your account...",
                });

                // Exchanging authorization code to fetch the access token and user details.
                const redirectUri = store.config.redirectUrl;
                console.log(store.config);
                const request = services.exchangeAuthorizationCodeWeb(
                  redirectUri,
                  authorizationCode
                );
                if (request) {
                  request
                    .then((res) => {
                      if (res.status === 200) {
                        // Updating the loader text to be shown while waiting for the redirection towards org login page.
                        this.setState({
                          openIdLoaderText:
                            "Successfully logged in, setting up your account...",
                        });

                        store.authStore.isLoading = true;
                        auth.parseOIDCAuthenticationResponse(res);

                        // TODO: Check if profile information is complete
                        // TODO: If not complete then redirect to complete profile information
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              } else {
                // Show login screen
                this.setState({
                  showLogin: true,
                });
              }
            } else {
              // Show login screen
              this.setState({
                showLogin: true,
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error occured while reading IDP: ", error);
          // Show login screen
          this.setState({
            showLogin: true,
          });
        });
    }
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    element.addEventListener("keydown", (e) => {
      this.handleKeydown(e);
    });

    store.fetchOrganisation();
  }

  handleOidcLogin() {
    const authUrl = store.idpConfig.authorisationUrl;
    const clientId = store.idpConfig.clientId;
    const redirectUri = store.config.redirectUrl;

    // Hide login
    this.setState({
      showLogin: false,
    });

    // Updating the loader text to be shown while waiting for the redirection towards org login page.
    this.setState({
      openIdLoaderText: "Redirecting to organization login page...",
    });

    // Redirecting user to configured external identity provider login
    window.location.href = `${authUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURI(
      redirectUri
    )}`;
  }

  handleKeydown(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleLogin();
    }
  }

  clearError = () => {
    if (store.authStore.error) {
      store.authStore.error = "";
    }
  };

  handleLogin = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.username && values.password) {
          store.authStore.isLoading = true;
          store.authStore.isRemember = values.remember;
          auth.login(values.username, values.password);
        }
      }
    });
  };

  render() {
    const { t } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { error } = store.authStore;

    const { getFieldDecorator } = this.props.form;
    const loading = store.authStore.isLoading;
    const { logoImageURI, data } = store.organizationStore;

    if (this.state.showLogin) {
      return (
        <div className="login-container">
          <div className="login-container-main">
            <div className="logo">
              <img src={logoImageURI ? logoImageURI : null} />
            </div>
            <p className="login-title">{t("signin")}</p>
            <Form onSubmit={this.handleLogin} className="login-form">
              <div className="login-input-group">
                <Form.Item className="username-input">
                  {getFieldDecorator("username", {
                    rules: [], //[{ required: true, message: t("messages.username") }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder={t("username")}
                      size="large"
                      onChange={this.clearError}
                    />
                  )}
                </Form.Item>
                <Divider className="login-divider-m0" />
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [], // [{ required: true, message: t("messages.password") }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder={t("password")}
                      size="large"
                      className="password-input"
                      suffix={
                        loading ? (
                          <Spin className="login-btn" indicator={antIcon} />
                        ) : (
                          <div>
                            <img
                              className="login-btn right-arrow"
                              onClick={this.handleLogin}
                              src={loginIcon}
                            />
                          </div>
                        )
                      }
                      onChange={this.clearError}
                    />
                  )}
                </Form.Item>
              </div>
              {error && <div className="login-error">{error}</div>}
              <Form.Item>
                <div className="login-checkbox">
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(<Checkbox>{t("rememberme")}</Checkbox>)}
                </div>
              </Form.Item>
              <Divider className="login-divider" />
              {!(store.idpConfig === undefined || store.idpConfig === null) ? (
                <div className="login-actions">
                  {console.log(store.idpConfig)}
                  <a onClick={this.handleOidcLogin}>
                    Login with {store.idpConfig.name}
                  </a>
                </div>
              ) : null}

              <div className="login-actions">
                <Link to={`/forgot-password`}>{t("forgot")}</Link>
              </div>
            </Form>
          </div>
          <div className="login-footer-container">
            <div className="login-footer">
              <LanguageSelector t={t} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="openid-page-container">
          <div className="openid-loader-container">
            <div class="openid-loader" />
            <p>{this.state.openIdLoaderText}</p>
          </div>
        </div>
      );
    }
  }
}

const WrappedLogin = Form.create({ name: "normal_login" })(Login);

export default withNamespaces()(WrappedLogin);
