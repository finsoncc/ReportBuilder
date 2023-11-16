import Express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = Express();
app.use(Express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.post("/connect", (req, res) => {
  // This is the format that is required in the req.body
  // {
  //     "host":"127.0.0.1",
  //     "port": "3306",
  //     "user":"root",
  //     "password":"11111111",
  //     "database": "test"
  // }

  const connection = mysql.createConnection(req.body);
  console.log(req.body);

  connection.connect(function (err) {
    if (err) {
      // If there's an error in connecting, you can handle it here.
      console.error("Connection error:", err);
      res.json({ connectionStatus: false, err });
    } else {
      // Connection is successful
      console.log("Connected!");

      //   create ReportBuilder table if it doesn't exists in the database
      const query =
        "CREATE TABLE IF NOT EXISTS ReportBuilder ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),query TEXT);";
      connection.query(query, function (err, results) {
        if (err) {
          console.error("Error fetching tables:", err);
          res.json({ error: "Error fetching tables" });
        } else {
          // Here we get all the saved queries from the ReportBuilder table
          const query = "SELECT * from ReportBuilder;";

          connection.query(query, function (err, reportQueries) {
            if (err) {
              console.log("Error fetching saved queries", err);
              res.json({ error: "Error fetching saved queries" });
            } else {
              // return all the saved queries
              res.json({ connectionStatus: true, reportQueries, error: null });
            }
          });
        }

        // Close the database connection
        connection.end();
      });
    }
  });
});

// takes the query from the user and sends it to the DB and returns the data
app.post("/reportBuilder", (req, res) => {
  // SQL query sent by the user
  const { query, dbConfig } = req.body;

  const connection = mysql.createConnection(dbConfig);

  connection.connect(function (err) {
    if (err) {
      // If there's an error in connecting, you can handle it here.
      console.error("Connection error:", err);
      res.json({ connectionStatus: false });
    } else {
      // Connection is successful
      console.log("Connected!");

      connection.query(query, function (err, results) {
        if (err) {
          console.error("Error fetching data", err);
          res.json({ error: "Error fetching data" });
        } else {
          // returns the query data
          res.json({ results, error: null });
        }

        // Close the database connection
        connection.end();
      });
    }
  });
});

app.post("/getTablesName", (req, res) => {
  const { database } = req.body;

  const connection = mysql.createConnection(req.body);
  connection.connect(function (err) {
    if (err) {
      console.log(err);
      res.json({ error: "Error connecting to DB" });
    } else {
      // Connection is successful
      console.log("Connected!");

      const query = "SHOW TABLES;";
      connection.query(query, function (err, results) {
        if (err) {
          console.log("Error fetching tables", err);
          res.json({ error: "Error fetching tables" });
        } else {
          // return all the saved queries
          const tables = results
            .map((item) => item[`Tables_in_${database}`])
            .filter((item) => item !== "ReportBuilder");
          res.json({ tables, error: null });
        }
      });
    }

    // Close the database connection
    connection.end();
  });
});

app.post("/getTableFeilds", (req, res) => {
  const { table, dbConfig } = req.body;

  const connection = mysql.createConnection(dbConfig);
  connection.connect(function (err) {
    if (err) {
      console.log(err);
      res.json({ error: "Error connecting to DB" });
    } else {
      // Connection is successful
      console.log("Connected!");

      const query = `DESCRIBE ${table};
`;
      connection.query(query, function (err, results) {
        if (err) {
          console.log("Error fetching tables", err);
          res.json({ error: "Error fetching tables" });
        } else {
          // return all the saved queries

          const feilds = results.map((feild) => feild.Field);

          res.json({ feilds, error: null });
        }
      });
    }

    // Close the database connection
    connection.end();
  });
});

app.post("/saveQuery", (req, res) => {
  const { data, dbConfig } = req.body;
  const connection = mysql.createConnection(dbConfig);

  connection.connect(function (err) {
    if (err) {
      // If there's an error in connecting, you can handle it here.
      console.error("Connection error:", err);
      res.json({ connectionStatus: false });
    } else {
      // Connection is successful
      console.log("Connected!");

      const query = `INSERT INTO ReportBuilder (name, query) VALUES ('${data.name}','${data.query}');`;

      connection.query(query, function (err, results) {
        if (err) {
          console.error("Error saving query data", err);
          res.json({ error: "Error saving query data" });
        } else {
          // returns the query data
          const query = "SELECT * from ReportBuilder;";

          connection.query(query, function (err, reportQueries) {
            if (err) {
              console.error("Error saving query data", err);
              res.json({ error: "Error saving query data" });
            } else {
              // returns the query data
              res.json({ reportQueries, error: null });
            }
          });
        }

        // Close the database connection
        connection.end();
      });
    }
  });
});

app.post("/getSavedReports", (req, res) => {
  const connection = mysql.createConnection(req.body);

  connection.connect(function (err) {
    if (err) {
      // If there's an error in connecting, you can handle it here.
      console.error("Connection error:", err);
      res.json({ connectionStatus: false });
    } else {
      // Connection is successful
      console.log("Connected!");

      const query = "SELECT * from ReportBuilder;";

      connection.query(query, function (err, results) {
        if (err) {
          console.error("Error saving query data", err);
          res.json({ error: "Error saving query data" });
        } else {
          // returns the query data
          res.json({ results, error: null });
        }

        // Close the database connection
        connection.end();
      });
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
