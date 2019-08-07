const fs = require('fs');
const csv = require('fast-csv');
require('dotenv').config();


const populateDb2 = () => {
	const mysql = require('mysql')

	if (process.env.JAWSDB_URL){
		// Database is JawsDB on Heroku
		connection = mysql.createConnection(process.env.JAWSDB_URL)
	}else{
	    connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'testdb',
		
	});
	}
	
	let updatedData = [];
	let headerDatas = []
	let orginalHeaderDatas = [];
	let headersWithProperties = [];
	let myData = [];
	let correctHeaderFormat = [];

	// Reads CSV file
	let dataArr = [];


	csv.parseFile('./upload/CD 2.csv', { headers: true, skip_blanks: true
	})

		.on("data", data => {
			dataArr.push(data);
		})

		.on("end", () => {
	// captures all data in CSV
	let stream = fs.createReadStream('./upload/CD 2.csv')	
	let csvStream = csv
		.parse({ ignoreEmpty: true })
		.on("data", function (data) {
			myData.push(data);
		})
		.on("end", function () {
			myData.shift();
			
			if (dataArr.length > 0) {
				let columnsIn = dataArr[0];
				
				for (let key in columnsIn) {
					headerDatas.push(key)
				}
				for (let key in columnsIn) {
					orginalHeaderDatas.push(key)
				}
		
				for (i = 0; i < headerDatas.length; i++) {
					newData = headerDatas[i].split(' ').join('_');
					correctHeaderFormat.push(newData)
				}
		
				//Extracts constant headers to remove from forloop and assigns approriate Sql property
				let databaseId = headerDatas[0].split(' ').join('_');
				let leaseDiscription = headerDatas[1].split(' ').join('_');
		
				headerDatas.shift();
				headerDatas.shift();
		
				let newdatabaseId = databaseId + " int(25) NOT NULL"
				let newleaseDiscription = leaseDiscription + " varchar(255) NULL"
		
				//adds property to the end of the remaining headers in array
				for (i = 0; i < headerDatas.length; i++) {
					newData = headerDatas[i].split(' ').join('_') + ' dec(25,2) NULL';
					updatedData.push(newData)
				}
		
				//Adds headers that were removed from array and primary key to updated array
				let key = 'PRIMARY KEY (Database_ID)'
				headersWithProperties.push(updatedData)
				headersWithProperties.unshift(newleaseDiscription)
				headersWithProperties.unshift(newdatabaseId)
				headersWithProperties.push(key)		
		
				
		
			} else {
				console.log("No columns");
			}
			
			// open the connection
			connection.connect((error) => {
				
						
				if (error) {
					console.error(error);
				} else {
					
					let dropTable = 'DROP TABLE IF EXISTS `CD 2`'
					let createTable = 'CREATE TABLE `CD 2`' + '(' + headersWithProperties + ')'
					
					let insertData = 'INSERT INTO `CD 2` ' + '(' + correctHeaderFormat + ') ' + 'VALUES ?'
					//drop table
					connection.query(dropTable, (error, response) => {
						console.log("bottom" + connection.query)
						console.log(error || response);
					});
		

					//create table
					connection.query(createTable, (error, response) => {
					console.log("bottom" + connection.query)
						console.log(error || response);
					});
				
					//insert data
					connection.query(insertData, [myData], (error, response) => {
						console.log("bottom" + connection.query)
						console.log(error || response);
					});

				}

			});
		});

	stream.pipe(csvStream);
			// extracts header from dataArr and pushes header to new headerDatas Array
			});
}

module.exports = populateDb2;
	
	
		