import { Box, Typography } from "@mui/material";
import LanguageSelector from "../dropdowns/languageSelector";

interface Props {
  version: String;
}
const Footer = (props: Props) => {
  const { version } = props;
  return (
    <Box display={"flex"} flexDirection="column">
      <LanguageSelector />
      <Typography variant="caption">{version}</Typography>
    </Box>
  );
};

export default Footer;
