const connection = require('../config/connection');



const cdHeaderQuery = 'SELECT * FROM `cd 1`';
const lqQuery1='SELECT * FROM `lq 1`';

//Headers from table are stored here inorder for querys to be dynamic
let headersFromTable = [];
let headersFromTable2 =[];
let columnHeaders = headersFromTable
let columnHeaders2 = headersFromTable2

connection.query(cdHeaderQuery, function(err, res) {
    if (err){ throw err;
}else{
    setValue(res);
}
  
  });

  connection.query(lqQuery1, function(err, res) {
    if (err){ throw err;
}else{
    setValue(res);
}
  
  });

 function setValue(value){
    //console.log(data)
    if (value.length > 0) {
        let columnsIn = value[0];
        let headerDatas = []

        for (let key in columnsIn) {
            headerDatas.push(key)

        }
        for (let key in columnsIn) {
            headersFromTable.push(key)
        }
      // console.log(headersFromTable)
       let newColumnHeaders = columnHeaders.toString()

       console.log(newColumnHeaders)
      //  console.log(headersFromTable2)
        // const cd1Query = '('+'SELECT ' + newColumnHeaders + ' ' + 'FROM `cd 1`'+')' + 'UNION ALL' +
        //  '(' + 'SELECT ' + newColumnHeaders + ' ' + 'FROM `lq 1`'+')' + 'ORDER BY `Database_ID` DESC ' 

      
 }}
 function setValue(value){
  //console.log(data)
  if (value.length > 0) {
      let columnsIn = value[0];
      let headerDatas2 = []

      for (let key in columnsIn) {
          headerDatas2.push(key)

      }
      for (let key in columnsIn) {
        headersFromTable2.push(key)
      }
    // console.log(headersFromTable)
     let newColumnHeaders2 = columnHeaders2.toString()

     console.log(newColumnHeaders2)
    //  console.log(headersFromTable2)
      // const cd1Query = '('+'SELECT ' + newColumnHeaders + ' ' + 'FROM `cd 1`'+')' + 'UNION ALL' +
      //  '(' + 'SELECT ' + newColumnHeaders + ' ' + 'FROM `lq 1`'+')' + 'ORDER BY `Database_ID` DESC ' 

    
}

}

