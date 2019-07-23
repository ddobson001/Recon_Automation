const connection = require('../config/connection');
const excel = require('exceljs');

const exportResultMonth3 = () => {
const reconQuery = 'SELECT T1.Database_ID, Lease_Description, SUM(BR_Current_Month_Cash - BR_Current_Month_Cash_Client) total, SUM(CAM_Current_Month_Cash - CAM_Current_Month_Cash_Client) total2, SUM(TAX_Current_Month_Cash - TAX_Current_Month_Cash_Client) total3, SUM(Insurance_Current_Month_Cash - Insurance_Current_Month_Cash_Client) total4, SUM(Sales_Tax_Current_Month_Cash - Sales_Tax_Current_Month_Cash_Client) total5  FROM `lq 3` AS T1  INNER JOIN `cd 3` AS T2 ON T1.Database_ID = T2.Database_ID GROUP BY Database_ID'

  
      connection.query( reconQuery,
        function (err, reconQuery, field) {
      
          const jsonReconData = JSON.parse(JSON.stringify(reconQuery));

          
          let workbook = new excel.Workbook(); //creating workbook
          let worksheet = workbook.addWorksheet('Month 3'); //creating worksheet

          //  WorkSheet Header
     //  WorkSheet Header
  worksheet.columns = [
    { header: 'Database ID', key: 'Database_ID', width: 10 },
    { header: 'Lease Description', key: 'Lease_Description', width: 30 },
    { header: 'Base Rent Difference', key: 'total', width: 30},
      { header: 'CAM Difference', key: 'total2', width: 30},
      { header: 'Tax Difference', key: 'total3', width: 30},
      { header: 'Insurance Difference', key: 'total4', width: 30},
      { header: 'Sales Tax Difference', key: 'total5', width: 30},




  ];


          // Add Array Rows
          worksheet.addRows(jsonReconData);
          

         
          // Write to File
          workbook.xlsx.writeFile("month3.xlsx")
          .then(function() {
            console.log("file saved!");
          });
        })
      }

      module.exports = exportResultMonth3;
