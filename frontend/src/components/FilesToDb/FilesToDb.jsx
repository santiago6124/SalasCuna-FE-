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
        localityResponse = localityResponse.data['id'];
      } else {
        console.log("The array is not empty. (localityResponse)");
        localityResponse = localityResponse.data[0]['id'];
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
        "locality": localityResponse
      };
      var cribroomResponse = await axios.post('/api/cribroom/', cribroom);
      cribroomResponse = cribroomResponse.data['id'];

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
            phoneFeatureResponse = phoneFeatureResponse.data['id']
          } else {
            phoneFeatureResponse = phoneFeatureResponse.data[0]['id'];
          }

          console.log('phoneFeatureResponse:' , phoneFeatureResponse);

          var guardian = {
                "first_name": parsedData[rowIndex][parsedDataKeys[14]],
                "last_name": parsedData[rowIndex][parsedDataKeys[14]],
                "dni": parsedData[rowIndex][parsedDataKeys[15]],
                "phone_number": parsedData[rowIndex][parsedDataKeys[13]].toString().split('/')[0],
                "phone_Feature": phoneFeatureResponse,
                'guardian_Type' : 1,
                'gender' : 1,
                // "guardian_Type": {
                //     "id": 2,
                //     "type": "Guardian"
                // },
                // "gender": {
                //     "id": 2,
                //     "gender": "Female"
                // }
          }
          console.log('guardian: ', guardian);
          var guardianResponse = await axios.post('/api/GuardianListCreateView/', guardian);
          guardianResponse = guardianResponse.data['id'];

          var neighborhood_or_department = {
              "neighborhood": parsedData[rowIndex][parsedDataKeys[10]]
          }
          var neighborhood_or_departmentURL = `/api/NeighborhoodListCreateView/?neighborhood=${neighborhood_or_department.neighborhood}`;

          var neighborhood_or_departmentResponse = await axios.get(neighborhood_or_departmentURL);
          if (neighborhood_or_departmentResponse.data.length === 0) {
            var neighborhood_or_departmentResponse = await axios.post('/api/NeighborhoodListCreateView/', neighborhood_or_department);
            neighborhood_or_departmentResponse = neighborhood_or_departmentResponse.data['id']
          } else {
            neighborhood_or_departmentResponse = neighborhood_or_departmentResponse.data[0]['id'];
          }

          var gender = {
            "gender": parsedData[rowIndex][parsedDataKeys[7]]
          }
          var genderURL = `/api/GenderListCreateView/?gender=${gender.gender}`;

          var genderResponse = await axios.get(genderURL);
          if (genderResponse.data.length === 0) {
            var genderResponse = await axios.post('/api/GenderListCreateView/', gender);
            genderResponse = genderResponse.data['id']
          } else {
            genderResponse = genderResponse.data[0]['id'];
          }

          var shift = {
            "name": parsedData[rowIndex][parsedDataKeys[16]]
          }
          var shiftURL = `/api/ShiftListCreateView/?shift=${shift.name}`;

          var shiftResponse = await axios.get(shiftURL);
          if (shiftResponse.data.length === 0) {
            var shiftResponse = await axios.post('/api/ShiftListCreateView/', shift);
            shiftResponse = shiftResponse.data['id']
          } else {
            shiftResponse = shiftResponse.data[0]['id'];
          }
          console.log('shiftResponse: ', shiftResponse);
          console.log('shift: ', shift);

          var child = {
              "guardian": guardianResponse,
              "first_name": parsedData[rowIndex][parsedDataKeys[3]],
              "last_name": parsedData[rowIndex][parsedDataKeys[2]],
              "dni": parsedData[rowIndex][parsedDataKeys[4]],
              // "birthdate": parsedData[rowIndex][parsedDataKeys[5]],
              "birthdate": '1913-06-15',
              "street": parsedData[rowIndex][parsedDataKeys[8]],
              "house_number": parsedData[rowIndex][parsedDataKeys[9]],
              "registration_date": "2022-07-23",
              // "disenroll_date": "2023-08-09",
              "is_active": parsedData[rowIndex][parsedDataKeys[17]] == 'BAJA' ? false : true,
              "locality": localityResponse,
              "neighborhood": neighborhood_or_departmentResponse,
              "gender": genderResponse,
              "cribroom": cribroomResponse,
              "shift": shiftResponse,
          }
          console.log('child: ', child);
          var childResponse = await axios.post('/api/ChildListCreateView/', child);
          console.log('childResponse: ', childResponse);

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
