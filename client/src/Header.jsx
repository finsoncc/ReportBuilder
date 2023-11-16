import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        paddingX: 10,
        paddingY: 1,
        backgroundColor: "#93B1A6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 900,
          color: "#040D12",
        }}
      >
        Report Builder
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        <Link
          component={RouterLink}
          to="/connect"
          sx={{
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 500,
            color: "#040D12",
            "&:hover": {
              color: "#183D3D",
            },
          }}
        >
          ConnectDB
        </Link>
        <Link
          component={RouterLink}
          to="/createReport"
          sx={{
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 500,
            color: "#040D12",
            "&:hover": {
              color: "#183D3D",
            },
          }}
        >
          Reports
        </Link>
        <Link
          component={RouterLink}
          to="/savedReport"
          sx={{
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 500,
            color: "#040D12",
            "&:hover": {
              color: "#183D3D",
            },
          }}
        >
          Saved Reports
        </Link>
        {/* <Link
          component={RouterLink}
          to="/clientReport"
          sx={{
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 500,
            color: "#040D12",
            "&:hover": {
              color: "#183D3D",
            },
          }}
        >
          Client Reports
        </Link> */}
      </Box>
    </Box>
  );
};

export default Header;
