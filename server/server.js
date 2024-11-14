const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 8080;

// MS SQL connection config
const config = {
	user: "sa",
	password: "Patricks321*",
	server: "localhost",
	port: 1433,
	database: "SecondBindDB",
	authentication: {
		type: "default",
	},
	options: {
		encrypt: true,
	},
	trustServerCertificate: true,
};

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/addBook", async (req, res) => {
	var conn = await sql.connect(config);
	console.log("addBook service called, req:", req);
	try {
		let preparedStmt = `EXEC InsertBook @Title='${req.body.title}',@Author='${req.body.author}',@Genre='${req.body.genres}',@Publication='${req.body.pubYear}',@ISBN='${req.body.ISBN}'`;
		console.log(preparedStmt);

		var result = await conn.request().query(preparedStmt);

		console.log("after InsertBook call, result:", result);
		res.status(200).json({ result, spSuccess: true });
	} catch (err) {
		console.log("ERROR zzzzz");
		console.log(err);
		res.send({
			message: "Something went wrong",
			error: err,
			spSuccess: false,
		});
	}
});

app.post("/filterCriteria", async (req, res) => {
	var conn = await sql.connect(config);
	// console.log("filter service called, req:", req);
	let genres = "";
	const now = new Date();
	const currentYear = now.getFullYear();

	req.body.genres.forEach((genre) => (genres += genre + ","));
	console.log(genres);

	let title = req.body.title ? req.body.title : "";
	let author = req.body.author ? req.body.author : "";
	let startDate = req.body.startDate ? req.body.startDate : "0001-01-01";
	let endDate = req.body.endDate ? req.body.endDate : currentYear + "-12-31";
	let ISBN = req.body.ISBN ? req.body.ISBN : "";
	let preparedStmt = `EXEC filterBooks @Title='${title}', @Author='${author}', @Genre='${genres}', @StartYear='${startDate}', @EndYear='${endDate}', @ISBN='${ISBN}'`;

	console.log("PREP STMT", preparedStmt);

	// Making call
	var result = await conn.request().query(preparedStmt);

	console.log("after filterBook stmt, result:", result);
	res.status(200).json(result);
});

app.get("/getAllGenres", async (req, res) => {
	var conn = await sql.connect(config);
	var resultSet = await conn.request().query(`EXEC GetUniqueGenres`);
	console.log(resultSet.recordset.length, "rows returned");
	res.status(200).json(resultSet);
});

app.get("/testConnection", async (req, res) => {
	var conn = await sql.connect(config);

	var resultSet = await conn.request().query(`SELECT * FROM Inventory`);
	console.log(resultSet.recordset.length, " rows returned");
	console.log("resultSet:", resultSet);
	// if (resultSet[0])
	res.status(200).json(resultSet);
});

// Server boot
app.listen(PORT, () => {
	console.log("App is listening on,", PORT);
});
