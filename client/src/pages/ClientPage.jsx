import {
  Box,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header";

const ClientPage = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [tableList, setTableList] = useState(null);
  const [table, setTable] = useState(null);
  const [tableFeilds, setTableFeilds] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);

        const response = await axios({
          method: "post",
          url: "http://localhost:8000/getTablesName",
          data: dbConfig,
        });
        setTableList(response.data.tables);
        setTable(response.data.tables[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dbConfig]);

  useEffect(() => {
    const getFeilds = async () => {
      try {
        setIsLoading(true);

        const response = await axios({
          method: "post",
          url: "http://localhost:8000/getTableFeilds",
          data: { dbConfig, table },
        });
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getFeilds();
  }, [table]);

  return (
    <Box>
      <Header />
      {tableList !== null && (
        <Box>
          <InputLabel id="savedQueries">Reports</InputLabel>
          <Select
            labelId="savedQueries"
            id="demo-multiple-name"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {tableList.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default ClientPage;
