import { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../Header";

const ReportPage = () => {
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
  const dbConfig = JSON.parse(localStorage.getItem("dbData"));
  const [reportName, setReportName] = useState("");
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [graphFeild, setGraphFeild] = useState("");
  const [graphLable, setGraphLable] = useState("");
  // const [reportType, setReportType] = useState("simple");
  const [reportType, setReportType] = useState("graph");

  const columns =
    data !== null
      ? Object.keys(data.results?.[0]).map((item) => {
          return { field: item };
        })
      : null;

  const getRowId = (row) => row.id;

  const handleClick = async () => {
    if (query.length === 0) return;

    try {
      setIsLoading(true);
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

  const handleSaveReport = async () => {
    if (reportName.length === 0 || query.length === 0) return;

    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/saveQuery",
        data: { dbConfig, data: { name: reportName, query } },
      });
      console.log(response.data);
      localStorage.setItem(
        "reportQueries",
        JSON.stringify(response.data.reportQueries)
      );
      alert("Report saved");
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
        gap: 5,
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <TextField
          label="SQL query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: "50%" }}
        />
        <Button
          onClick={handleClick}
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
          Get Data
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
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              paddingX: 10,
            }}
          >
            <Box>
              {reportType === "simple" ? (
                <Button
                  onClick={() => setReportType("graph")}
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
                  Graph Report
                </Button>
              ) : (
                <Button
                  onClick={() => setReportType("simple")}
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
                  Simple Report
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <TextField
                label="Report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                sx={{}}
              />
              <Button
                onClick={handleSaveReport}
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
                Save Report
              </Button>
            </Box>
          </Box>
          {reportType === "graph" && (
            <Box
              sx={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
                <InputLabel id="graphFeilds">Select feild</InputLabel>
                <Select
                  label="Select Options"
                  labelId="graphFeilds"
                  value={graphFeild}
                  onChange={(e) => setGraphFeild(e.target.value)}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {columns.map((item) => (
                    <MenuItem key={item.field} value={item.field}>
                      {item.field}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
                <InputLabel id="grapgLable">Select Lable</InputLabel>
                <Select
                  labelId="grapgLable"
                  value={graphLable}
                  onChange={(e) => setGraphLable(e.target.value)}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {columns.map((item) => (
                    <MenuItem key={item.field} value={item.field}>
                      {item.field}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}

          {reportType === "graph" &&
            graphFeild.length > 0 &&
            graphLable.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <BarChart
                  width={800}
                  height={400}
                  data={data.results}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={`${graphLable}`} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={`${graphFeild}`} fill="#8884d8" />
                </BarChart>
              </Box>
            )}

          {reportType === "simple" && (
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
      )}
    </Box>
  );
};

export default ReportPage;
