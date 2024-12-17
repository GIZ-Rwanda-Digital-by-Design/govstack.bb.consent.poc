/* eslint-disable no-lone-blocks */
import { useState } from "react";
import { Form, TextInput, useLogin } from "react-admin";
import {
  Box,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import Logo from "../../assets/GovstackLogoBlue.svg";
import SnackbarComponent from "../../components/notification";
import { configStore } from "../../store/configStore";
import { useTranslation } from "react-i18next";
import Footer from "../../components/layout/Footer";

const FooterContainer = styled("div")({
  position: "fixed",
  left: 0,
  bottom: 16,
  width: "100%",
  textAlign: "center",
});

export const Login = () => {
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState("");
  let version = configStore.appVersion;
  const { t } = useTranslation("translation");

  const submit = () => {
    login({ username, password })
      .then((res) => {})
      .catch((error) => {
        setError(t("login.errorMessage"));
        setOpenSnackBar(true);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <Box
      style={{
        display: "grid",
        minHeight: "90dvh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFF",
      }}
    >
      <Form onSubmit={submit}>
        <SnackbarComponent
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          message={error}
        />
        <Box sx={{ width: 350 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={Logo} alt="Logo1" />
          </Box>
          <Box
            sx={{
              marginTop: ".5em",
              marginBottom: ".5em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">{t("login.header")}</Typography>
          </Box>
          <Box
            style={{
              boxSizing: "border-box",
              padding: 5,
              border: "1px solid #cecece",
              borderRadius: 7,
            }}
          >
            <TextInput
              autoFocus
              name="email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              source="username"
              variant="standard"
              sx={{ height: "25px" }}
              label={false}
              placeholder={t("login.userid")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <PersonOutlineOutlinedIcon style={{ color: "#A1A1A1" }} />
                ),
                disableUnderline: true,
                onKeyPress: handleKeyPress,
              }}
            />
            <Divider />
            <TextInput
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              source="password"
              variant="standard"
              label={false}
              placeholder={t("login.password")}
              fullWidth
              sx={{ height: "25px" }}
              InputProps={{
                startAdornment: <LockOpenIcon style={{ color: "#A1A1A1" }} />,
                disableUnderline: true,
                onKeyPress: handleKeyPress,
                endAdornment: (
                  <ArrowCircleRightOutlinedIcon
                    style={{ color: "#A1A1A1", cursor: "pointer" }}
                    onClick={submit}
                  />
                ),
              }}
            />
          </Box>
          <FormGroup>
            <Box
              sx={{
                width: "100%",
                marginTop: ".5em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "#A1A1A1",
                      "&.Mui-checked": {
                        color: "#1890FF",
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    {t("login.rememberMe")}
                  </Typography>
                }
                style={{ color: "#A1A1A1" }}
              />
            </Box>
          </FormGroup>
        </Box>
      </Form>
      <FooterContainer>
        <Footer version={version} />
      </FooterContainer>
    </Box>
  );
};

export default Login;
