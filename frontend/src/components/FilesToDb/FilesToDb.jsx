import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

import './FilesToDb.css';

export function FilesToDb() {
  const [data, setData] = useState([]);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const allData = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsBinaryString(files[i]);

      const fileData = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
      });

      const workbook = XLSX.read(fileData, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      allData.push(parsedData);

      var parsedDataKeys = Object.keys(parsedData[6]);
      console.log(parsedDataKeys);

      var locality = {
        "locality": parsedData[8][parsedDataKeys[11]]
      }
      var localityURL = `/api/LocalityListView/?locality=${locality.locality}`;

      var localityResponse = await axios.get(localityURL);
      if (localityResponse.data.length === 0) {
        var localityResponse = await axios.post('/api/LocalityListCreateView/', locality);
      } else {
        console.log("The array is not empty.");
      }

      var cribroom = {
        "name": parsedData[0]['Sala Cuna:'],
        "entity": parsedData[4]['Sala Cuna:'],
        "CUIT": 12,
        "street": 'NO ESPECIFICADO',
        "code": 12321,
        "max_capacity": 0,
        "is_active": true,
        "house_number": 0,
        "department": 7,
        "neighborhood": 7,
        "shift": 7,
        "zone": 7,
        "locality": localityResponse.data['id']
      };
      var cribroomResponse = await axios.post('/api/cribroom/', cribroom);

      if (allData.length === files.length) {
        // Combine data from all files
        const combinedData = allData.flat();
        setData(combinedData);
      }
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
      <br /><br />
    </div>
  );
}
