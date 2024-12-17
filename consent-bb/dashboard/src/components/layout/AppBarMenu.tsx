import { useEffect, useState } from "react";
import { useLogout } from "react-admin";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../service/localStorageService";
import { formatISODateToLocalString } from "../../utils/formatISODateToLocalString";
import { Box, Menu, Typography, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import defaultAvatar from "../../assets/avatar.png";
import { useFilterStore } from "../../store/store";
import { HttpService } from "../../service/HTTPService";
import { useTranslation } from "react-i18next";

type Props = {
  firstName: string;
  email: string;
  lastVisited: string;
};

export const AppBarMenu = (props: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logout = useLogout();
  const changeAvatar = useFilterStore((state) => state.changeAvatar);
  const changeAdminName = useFilterStore((state) => state.changeAdminName);
  const { t } = useTranslation("translation");

  const [userAvatar, setUserAvatar] = useState<any>(
    LocalStorageService.getUserProfilePic()
  );
  const [userName, setUserName] = useState<any>();

  useEffect(() => {
    HttpService.getAdminAvatarImage().then((imageBase64) => {
      setUserAvatar(imageBase64);
    });
  }, []);

  const handleClickLogOut = () => {
    logout();
    LocalStorageService.clear();
  };

  useEffect(() => {
    setUserAvatar(LocalStorageService.getUserProfilePic());
  }, [changeAvatar]);

  useEffect(() => {
    HttpService.getOrganisationAdminDetails().then((res) => {
      setUserName(res.data.name);
    });
  }, [changeAdminName]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleMenu}
        sx={{ marginLeft: "auto" }}
      >
        {userAvatar ? (
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "contain", background: "white" }}
            src={`data:image/jpeg;charset=utf-8;base64,${userAvatar}`}
          />
        ) : (
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={defaultAvatar}
            alt="img"
          />
        )}
      </IconButton>
      <Menu
        sx={{ mt: "65px" }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box
          style={{
            display: "grid",
            justifyItems: "center",
            minWidth: 220,
            padding: 10,
          }}
        >
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={`data:image/jpeg;charset=utf-8;base64,${userAvatar}`}
            alt="img"
          />
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            {userName || props.firstName}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "6px" }}>
            {props.email}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "3px" }}>
            {t("appbar.lastVisit")}:{" "}
            {formatISODateToLocalString(props.lastVisited)}
          </Typography>
        </Box>
        <Box style={{ color: "black", borderTop: "1px solid #BDBDBD" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              padding: 7,
              paddingLeft: 15,
              cursor: "pointer",
            }}
            onClick={() => navigate("/manageadmin")}
          >
            <SettingsOutlinedIcon />
            <Typography ml={1} variant="body2">
              {t("appbar.settings")}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              padding: 7,
              paddingLeft: 15,
              cursor: "pointer",
              marginTop: 5,
            }}
            onClick={handleClickLogOut}
          >
            <ExitToAppIcon />
            <Typography ml={1} variant="body2">
              {t("appbar.signout")}
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
};
