import * as React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";

import {
  Drawer,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import { FormProvider, useForm } from "react-hook-form";
import { HttpService } from "../../service/HTTPService";
import { isFormDataChanged } from "../../utils/isFormDataChanged";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  idpDetails: any;
}

const OrganisationSubscriptionMethod = ["Open-ID Connect"];

export default function EditUserAccesModal(props: Props) {
  const { open, setOpen, headerText, idpDetails } = props;
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<
    string[]
  >([]);
  const { t } = useTranslation("translation");

  const handleChange = (
    event: SelectChangeEvent<typeof subscriptionMethodValue>
  ) => {
    const {
      target: { value },
    } = event;
    setSubscriptionMethodValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const methods = useForm({
    mode: "onChange",
  });

  const { register, reset } = methods;

  useEffect(() => {
    let defaultValues = {
      authorisationUrl: "",
      tokenUrl: "",
      issuerUrl: "",
      logoutUrl: "",
      userInfoUrl: "",
      jwksUrl: "",
      clientId: "",
      clientSecret: "",
      defaultScope: "",
    };

    if (idpDetails) {
      defaultValues = idpDetails;
    }
    reset({ ...defaultValues });
  }, [open]);

  const onSubmit = (createdData: any) => {
    const payload = {
      idp: createdData,
    };

    if (idpDetails) {
      if (isFormDataChanged(methods.formState)) {
        HttpService.updateIdpByid(payload, idpDetails.id).then(() => {
          setOpen(false);
        });
      }
    } else {
      HttpService.addNewIDP(payload).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <HeaderContainer>
                <Box pl={2}>
                  <Typography color="#F3F3F6">{headerText}</Typography>
                </Box>
                <CloseIcon
                  onClick={() => setOpen(false)}
                  sx={{ paddingRight: 2, cursor: "pointer", color: "#F3F3F6" }}
                />
              </HeaderContainer>
              <DetailsContainer>
                <Box p={1.5}>
                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.authProtocol")}
                  </Typography>
                  <FormControl fullWidth sx={{ marginBottom: "15px" }}>
                    <Select
                      displayEmpty
                      value={subscriptionMethodValue}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>{t("userAccess.openIDConnect")}</em>;
                        }

                        return selected.join(", ");
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {OrganisationSubscriptionMethod.map(
                        (OrganisationSubscriptionMethod) => (
                          <MenuItem
                            key={OrganisationSubscriptionMethod}
                            value={OrganisationSubscriptionMethod}
                          >
                            {OrganisationSubscriptionMethod}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.authURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    autoFocus
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.authURL")}
                    {...register("authorisationUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.tokenURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.tokenURL")}
                    {...register("tokenUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.logoutURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.logoutURL")}
                    {...register("logoutUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.issueURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.issueURL")}
                    {...register("issuerUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.userInfoURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.userInfoURL")}
                    {...register("userInfoUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.jwksURL")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.jwksURL")}
                    {...register("jwksUrl", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.clientID")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.clientID")}
                    {...register("clientId", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                    {t("userAccess.clientSecret")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    sx={{ margin: 0, marginBottom: "10px" }}
                    variant="outlined"
                    fullWidth
                    placeholder={t("userAccess.clientSecret")}
                    {...register("clientSecret", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <Typography variant="subtitle1" mb={0}>
                  {t("userAccess.defaultScopes")}
                    <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "60px" }}
                    placeholder={t("userAccess.defaultScopes")}
                    {...register("defaultScope", {
                      required: true,
                      minLength: 1,
                    })}
                  />
                </Box>
              </DetailsContainer>
              <FooterContainer>
                <Button
                  onClick={() => setOpen(false)}
                  style={buttonStyle}
                  sx={{
                    marginRight: "10px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                >
                  {t("common.close")}
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  style={
                    methods.formState.isValid &&
                    isFormDataChanged(methods.formState)
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor:
                      methods.formState.isValid &&
                      isFormDataChanged(methods.formState)
                        ? "pointer"
                        : "not-allowed",
                    marginRight: "20px",
                    color:
                      methods.formState.isValid &&
                      isFormDataChanged(methods.formState)
                        ? "black"
                        : "#6D7676",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                >
                  {t("common.save")}{" "}
                </Button>
              </FooterContainer>
            </form>
          </FormProvider>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
