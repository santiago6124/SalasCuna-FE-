import { useState } from "react";
import * as XLSX from "xlsx";

import './FilesToDb.css';

export function FilesToDb() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const allData = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsBinaryString(files[i]);

      reader.onload = (e) => {
        const fileData = e.target.result;

        const workbook = XLSX.read(fileData, { type: "binary" });

        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];
        // console.log('workbook.Sheets:' , workbook.Sheets);
        // console.log('workbook.Sheets:' , workbook.Sheets['PADRON COMPLETO']);

        const parsedData = XLSX.utils.sheet_to_json(sheet);

        allData.push(parsedData);
        console.log('parsedData ', parsedData );


        if (allData.length === files.length) {
          // Combine data from all files
          const combinedData = allData.flat();
          // console.log(combinedData);
          setData(combinedData);
        }
      };
    }
  }

  return (
    <div className="FilesToDb">
      <input
        type="file"
        accept=".xlsx, .xls"
        multiple
        onChange={handleFileUpload}
      />

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br /><br />
    </div>
  );
}

