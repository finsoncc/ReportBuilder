import { Box, Button, InputLabel, TextField } from "@mui/material";

import axios from "axios";
import { useState } from "react";
import Header from "../Header";

const ConnectPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dbData, setDbData] = useState({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "11111111",
    database: "test",
  });

  const ConnectDb = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/connect",
        headers: {
          "Content-Type": "application/json",
        },
        data: dbData,
      });

      console.log(response.data.reportQueries);

      localStorage.setItem("dbData", JSON.stringify(dbData));
      localStorage.setItem(
        "reportQueries",
        JSON.stringify(response.data.reportQueries)
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          maxWidth: 400,
          margin: "auto",
          marginTop: 10,
        }}
      >
        <TextField
          label="Host"
          id="host"
          value={dbData.host}
          onChange={(e) =>
            setDbData((prevVal) => {
              return { ...prevVal, host: e.target.value };
            })
          }
          sx={{}}
        />
        <TextField
          label="Port"
          id="port"
          value={dbData.port}
          onChange={(e) =>
            setDbData((prevVal) => {
              return { ...prevVal, port: e.target.value };
            })
          }
          sx={{}}
        />
        <TextField
          label="Username"
          id="user"
          value={dbData.user}
          onChange={(e) =>
            setDbData((prevVal) => {
              return { ...prevVal, user: e.target.value };
            })
          }
          sx={{}}
        />
        <TextField
          label="Password"
          id=" password"
          value={dbData.password}
          onChange={(e) =>
            setDbData((prevVal) => {
              return { ...prevVal, password: e.target.value };
            })
          }
          sx={{}}
        />

        <TextField
          label="Database"
          id=" database"
          value={dbData.database}
          onChange={(e) =>
            setDbData((prevVal) => {
              return { ...prevVal, database: e.target.value };
            })
          }
          sx={{}}
        />

        <Button
          onClick={ConnectDb}
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
          Connect Database
        </Button>
      </Box>
    </>
  );
};

export default ConnectPage;
