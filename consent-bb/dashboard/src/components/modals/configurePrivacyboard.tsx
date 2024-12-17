import * as React from "react";
import { Dispatch, SetStateAction } from "react";

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
} from "./modalStyle";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headerText: string;
}

const OrganisationSubscriptionMethod = ["v1.1.14", "v1.1.15", "v1.1.16",];

export default function ConfigurePrivacyboard(props: Props) {
  const { open, setOpen, headerText } = props;
  const [subscriptionMethodValue, setSubscriptionMethodValue] = React.useState<
    string[]
  >([]);

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

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open}>
        <Container>
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
                Dashboard Release:
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: "15px" }}>
                <Select
                  displayEmpty
                  value={subscriptionMethodValue}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>v1.1.16</em>;
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
                Deployed Domain Address:
              </Typography>
              <Box sx={{display:"flex", alignItems:"center"}}>
                <TextField
                  sx={{ margin: 0, marginBottom: "10px", width: "70%" }}
                  autoFocus
                  variant="standard"
                  // fullWidth
                  placeholder="Please type atleast 3 characters"
                />
                <Typography>.igrant.io</Typography>
              </Box>
            </Box>
          </DetailsContainer>
          <FooterContainer>
            <Button
              onClick={() => setOpen(false)}
              style={buttonStyle}
              sx={{ marginRight: "10px" }}
              variant="outlined"
            >
              CLOSE
            </Button>
            <Button
              style={buttonStyle}
              variant="outlined"
              sx={{
                marginRight: "20px",
              }}
              onClick={() => {}}
            >
              CONFIRM{" "}
            </Button>
          </FooterContainer>
        </Container>
      </Drawer>
    </React.Fragment>
  );
}
