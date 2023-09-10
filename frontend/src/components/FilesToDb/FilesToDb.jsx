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
      // console.log(parsedDataKeys);

      var locality = {
        "locality": parsedData[8][parsedDataKeys[11]]
      }
      var localityURL = `/api/LocalityListView/?locality=${locality.locality}`;

      var localityResponse = await axios.get(localityURL);
      if (localityResponse.data.length === 0) {
        var localityResponse = await axios.post('/api/LocalityListCreateView/', locality);
      } else {
        console.log("The array is not empty. (localityResponse)");
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

      cribroom['code'] = files[i].name.split('-')[1];

      console.log('before for each');

      for (let rowIndex = 7; rowIndex < parsedData.length; rowIndex++) {
          if (parsedData[rowIndex][parsedDataKeys[1]] === cribroom.code && typeof parsedData[rowIndex][parsedDataKeys[0]] === 'number' ) {

          var phoneFeature = {
            "feature": parsedData[rowIndex][parsedDataKeys[12]]
          }
          var phoneFeatureURL = `/api/PhoneFeatureListCreateView/?feature=${phoneFeature.feature}`;

          // var phoneFeatureResponse = {'id':0};
          var phoneFeatureResponse = await axios.get(phoneFeatureURL);
          if (phoneFeatureResponse.data.length === 0) {
            var phoneFeatureResponse = await axios.post('/api/PhoneFeatureListCreateView/', phoneFeature);
            console.log('phoneFeatureResponse:' , phoneFeatureResponse);
          } else {
            console.log("The array is not empty.");
          }

          var guardian = {
                "first_name": parsedData[rowIndex][parsedDataKeys[14]],
                "last_name": parsedData[rowIndex][parsedDataKeys[14]],
                "dni": parsedData[rowIndex][parsedDataKeys[15]],
                "phone_number": parsedData[rowIndex][parsedDataKeys[13]],
                "phone_Feature": phoneFeatureResponse.data['id'],
                // "guardian_Type": {
                //     "id": 2,
                //     "type": "Guardian"
                // },
                // "gender": {
                //     "id": 2,
                //     "gender": "Female"
                // }
          }
          var guardianResponse = {'id':1};

          var neighborhood_or_department = {
              "neighborhood": parsedData[rowIndex][parsedDataKeys[10]]
          }
          var neighborhood_or_departmentResponse = {'id':1};

          var gender = {
            "gender": parsedData[rowIndex][parsedDataKeys[7]]
          }
          var genderResponse = {'id':1};

          var shift = {
            "name": parsedData[rowIndex][parsedDataKeys[16]]
          }
          var shiftResponse = {'id':1};

          var child = {
              "guardian": {
                  "id": guardianResponse.id,
              },
              "first_name": parsedData[rowIndex][parsedDataKeys[3]],
              "last_name": parsedData[rowIndex][parsedDataKeys[2]],
              "dni": parsedData[rowIndex][parsedDataKeys[4]],
              "birthdate": parsedData[rowIndex][parsedDataKeys[5]],
              "street": parsedData[rowIndex][parsedDataKeys[8]],
              "house_number": parsedData[rowIndex][parsedDataKeys[9]],
              // "registration_date": "2022-07-23",
              // "disenroll_date": "2023-08-09",
              "is_active": parsedData[rowIndex][parsedDataKeys[17]] == 'BAJA' ? false : true,
              "locality": {
                  "id": localityResponse.id,
              },
              "neighborhood": {
                  "id": neighborhood_or_departmentResponse.id,
              },
              "gender": {
                  "id": genderResponse.id,
              },
              "cribroom": {
                  "id": 0,
              },
              "shift": {
                  "id": shiftResponse.id,
              },
          }
        }
      }

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
