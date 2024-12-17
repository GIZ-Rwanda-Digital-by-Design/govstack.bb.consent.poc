import * as React from "react";
import { Dispatch, SetStateAction } from "react";

import { Drawer, Typography, Button, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  HeaderContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import { useForm } from "react-hook-form";
import { HttpService } from "../../service/HTTPService";
import CheckboxTreeForAPIKey from "../checkboxTreeforDeveloperApi";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
  onRefetch: any;
  setApiKeyValue: Dispatch<SetStateAction<any>>;
  setShowAPI: Dispatch<SetStateAction<boolean>>;
}

export default function CreateApiKeyModal(props: Props) {
  const { open, setOpen, headerText, onRefetch, setApiKeyValue, setShowAPI } =
    props;
  const [checkScopeIsSelected, setCheckScopeIsSelected] = React.useState(false);
  const { t } = useTranslation("translation");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    register,
    formState,
    reset,
  } = useForm<any>({
    defaultValues: {
      name: "",
      expiryInDays: 30,
      radioGroup: "selected",
      scopes: {
        config: false,
        audit: false,
        service: false,
        onboard: false,
      },
    },
    mode: "onChange",
  });

  const onSubmit = (createdData: any) => {
    if (formState.isValid && checkScopeIsSelected) {
      let scope = Object.keys(createdData.scopes).map((key) => ({
        key: key,
        value: createdData.scopes[key],
      }));

      let selectedScopes = scope
        .filter((scope) => scope.value === true)
        .map((scope) => scope.key)
        .map((scope) => {
          return scope.toLowerCase();
        });

      let payload = {
        apiKey: {
          name: createdData.name,
          scopes: selectedScopes,
          expiryInDays: createdData.expiryInDays,
        },
      };

      HttpService.addNewApiKey(payload).then((res) => {
        setShowAPI(true);
        setApiKeyValue(res.data.apiKey.apiKey);
        onRefetch();
        reset();
        setOpen(false);
      });
    }
  };

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {t("common.name")}
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <TextField
                  autoComplete="off"
                  sx={{ margin: 0 }}
                  autoFocus
                  variant="standard"
                  fullWidth
                  placeholder={t("developerAPIs.keyNamePlaceholder")}
                  {...register("name", {
                    required: true,
                  })}
                />
                <Typography variant="subtitle1" mb={0} mt={2}>
                  {t("developerAPIs.expiryDate")}
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <TextField
                  autoComplete="off"
                  sx={{ margin: 0 }}
                  autoFocus
                  variant="standard"
                  fullWidth
                  type="number"
                  placeholder={t("developerAPIs.expiryDatePlaceholder")}
                  {...register("expiryInDays", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                <Typography variant="subtitle1" mb={0} mt={2}>
                  {t("developerAPIs.scopes")}
                  <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                </Typography>
                <CheckboxTreeForAPIKey
                  control={control}
                  getValues={getValues}
                  setValue={setValue}
                  setCheckScopeIsSelected={setCheckScopeIsSelected}
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
                style={
                  formState.isValid && checkScopeIsSelected
                    ? buttonStyle
                    : disabledButtonstyle
                }
                sx={{
                  cursor:
                    formState.isValid && checkScopeIsSelected
                      ? "pointer"
                      : "not-allowed",
                  marginRight: "20px",
                  color:
                    formState.isValid && checkScopeIsSelected
                      ? "black"
                      : "#6D7676",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                variant="outlined"
                type="submit"
              >
                {t("common.save")}{" "}
              </Button>
            </FooterContainer>
          </form>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
