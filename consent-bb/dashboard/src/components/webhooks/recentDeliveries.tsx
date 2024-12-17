import {
  Paper,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { FiBox } from "react-icons/fi";
import { formatISODateToLocalString } from "../../utils/formatISODateToLocalString";
import { useTranslation } from "react-i18next";

const RecentDeliveries = (props: any) => {
  const { recentDeliveryValues } = props;
  const { t } = useTranslation("translation");

  return (
    <Box mt={-3}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {t("webhooks.recentDeliveries")}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ display: "flex", justifyContent: "center", boxShadow: "none" }}
      >
        <Table
          aria-label="simple table"
          sx={{
            overflow: "auto",
            width: "100%",
          }}
        >
          <TableBody>
            {recentDeliveryValues.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{
                  height: 0,
                }}
              >
                <TableCell sx={{ width: "10px" }}>
                  {row.status === "completed" ? (
                    <DoneIcon
                      color="success"
                      style={{ height: "15px", width: "15px" }}
                    />
                  ) : (
                    <ClearIcon
                      color="error"
                      style={{ height: "15px", width: "15px" }}
                    />
                  )}
                </TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      color: "grey",
                      fontSize: "14px",
                      display: "inline-block",
                      backgroundColor: "#E1F3FE",
                      textAlign: "center",
                    }}
                  >
                    <FiBox
                      style={{
                        color: "grey",
                        height: "15px",
                        width: "15px",
                        marginRight: "10",
                      }}
                    />
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: "grey", fontSize: "14px" }}>
                    {formatISODateToLocalString(row.timestamp)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentDeliveries;
