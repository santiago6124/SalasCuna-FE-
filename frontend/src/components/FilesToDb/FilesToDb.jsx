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

        var parsedDataKeys = Object.keys(parsedData[6])
        console.log(parsedDataKeys);
        // console.log(parsedData[6]);

        var locality =  {
          "locality": parsedData[8][parsedDataKeys[11]]
        }
        var localityResponse = {'id':1};

        var cribroom = {
          "name": parsedData[0]['Sala Cuna:'],
          "entity": parsedData[4]['Sala Cuna:'],
          // "CUIT": "",
          "code": files[i].name.split('-')[1],
          // "max_capacity": 0,
          "is_active": true,
          // "street": "",
          // "house_number": 0,
          "locality": {
              "id": localityResponse.id,
          },
          // "department": {
          //     "id": 7,
          //     "department": "South Kevinland"
          // },
          // "neighborhood": {
          //     "id": 14,
          //     "neighborhood": "town"
          // },
          // "shift": {
          //     "id": 19,
          //     "name": "get"
          // },
          // "zone": {
          //     "id": 16,
          //     "name": "Port Brittany"
          // }
        }
        console.log(cribroom);

        for (let rowIndex = 7; rowIndex < parsedData.length; rowIndex++) {
          if (parsedData[rowIndex][parsedDataKeys[1]] == cribroom.code && typeof parsedData[rowIndex][parsedDataKeys[0]] === 'number' ) {
            console.log('parsedData[rowIndex][parsedDataKeys[1]]: ' , parsedData[rowIndex][parsedDataKeys[1]]);
            console.log('name: ' , parsedData[rowIndex][parsedDataKeys[3]]);

            var phone_Feature = {
              "feature": parsedData[rowIndex][parsedDataKeys[12]]
            }
            var phone_FeatureResponse = {'id':1};

            var guardian = {
                  "first_name": parsedData[rowIndex][parsedDataKeys[14]],
                  "last_name": parsedData[rowIndex][parsedDataKeys[14]],
                  "dni": parsedData[rowIndex][parsedDataKeys[15]],
                  "phone_number": parsedData[rowIndex][parsedDataKeys[13]],
                  "phone_Feature": {
                      "id": phone_FeatureResponse.id,
                  }, 
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
        console.log(child);
        console.log(phone_Feature);
        console.log(guardian);
        console.log(neighborhood_or_department);
        console.log(gender);
        console.log(shift);


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

