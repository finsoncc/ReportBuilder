import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const SavedQueriesPage = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const savedQueries = JSON.parse(localStorage.getItem("reportQueries"));
  const dbConfig = JSON.parse(localStorage.getItem("dbData"));
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(savedQueries[0].query);
  const [isLoading, setIsLoading] = useState(false);
  const columns =
    data !== null
      ? Object.keys(data.results[0]).map((item) => {
          return { field: item };
        })
      : null;
  const getRowId = (row) => row.id;

  const GetReport = async () => {
    try {
      setIsLoading(true);
      setData(null);
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/reportBuilder",
        data: { dbConfig, query },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!dbConfig)
    return (
      <>
        <Header />
        <Typography variant="h1" component="h2">
          Connect your database
        </Typography>
      </>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputLabel id="savedQueries">Reports</InputLabel>
        <Select
          labelId="savedQueries"
          id="demo-multiple-name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {savedQueries.map((query) => (
            <MenuItem key={query.id} value={query.query}>
              {query.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={GetReport}
          variant="contained"
          sx={{
            color: "#183D3D",
            backgroundColor: "#93B1A6",
            "&:hover": {
              color: "#040D12",
              backgroundColor: "#93B1A6",
            },
          }}
        >
          Get Report
        </Button>
      </Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {data !== null && (
        <Box sx={{ marginX: 10 }}>
          <DataGrid
            rows={data.results}
            getRowId={getRowId}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SavedQueriesPage;
