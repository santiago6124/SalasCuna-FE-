import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { config } from '../config';
import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { cribroom_request, child_request } from "../../../api/salasCuna.api";
 

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

async function handleExport(apiRef, selectedCribroomId, authTokens) {

  // try {
    
  //   var cribroomResponse = await cribroom_request(authTokens.authTokens, 'get', 0, {}, selectedCribroomId);

  //   console.log('cribroomResponse: ', cribroomResponse);

  //   cribroomResponse = cribroomResponse['data'];

  // } catch (error) {
  //   console.error("An error occurred (cribroom request):", error);
  // }

  // try {
  
  //   var childResponse = await child_request(authTokens.authTokens, 'get', 0, {}, selectedCribroomId, `&cribroom_id=${selectedCribroomId}`);
  //   console.log('childResponse: ', childResponse);

  //   childResponse = childResponse['data'];

  // } catch (error) {
  //   console.error("An error occurred (child request):", error);
  // }

  console.log('selectedCribroomId: ', selectedCribroomId);
  console.log('authTokens: ', authTokens);

  const data = getExcelData(apiRef);

  // const rows = data.map((row) => {
  //   const mRow = {};
  //   for (const key of config.keys) {
  //     mRow[key] = row[key];
  //   }
  //   return mRow;
  // });
  console.log('rows: ', data);

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const currentDate = new Date();

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Use a for...of loop instead of forEach
  for (const item of selectedCribroomId) {
    
    try {
      var cribroomResponse = await cribroom_request(authTokens.access, 'get', 1, {}, item);
      console.log('cribroomResponse: ', cribroomResponse);
    } catch (error) {
      console.error("An error occurred (child request):", error);
    }

    var rowValuesDict = {
      '1': ['Sala Cuna:', cribroomResponse.data.name, 'Codigo:', cribroomResponse.data.code, 'Entidad:', cribroomResponse.data.entity],
      '2': ['Capacidad maxima:', cribroomResponse.data.max_capacity, 'Niños activos:', cribroomResponse.data.actualCapacity],
      '3': ['Mes', currentMonth],
      '4': ['Año', currentYear],
      '5': ['Provincia de Córdoba'],
      // '6': [cribroomResponse['entity']],
      '7': [''],
      '8': [''],
      '9':[
        'ID',
        'SALA CUNA',
        'APELLIDO',
        'NOMBRE',
        'IDENTIFICACION',
        'TIPO IDENTIFICACION',
        'FECHA DE NACIMIENTO',
        'EDAD',
        'SEXO',
        'CALLE',
        'NUMERO',
        'LOCALIDAD',
        // 'CARACTERISTICA TELEFONICA',
        // 'TELEFONO',
        'APELLIDO TUTOR',
        'NOMBRE TUTOR',
        'IDENTIFICACION TUTOR',
        'TURNO',
        'ESTADO',
      ],
    }

    try {
      var childResponse = await child_request(authTokens.access, 'get', 1, {}, undefined, `&cribroom_id=${item}`);
      console.log('childResponse: ', childResponse);
    } catch (error) {
      console.error("An error occurred (child request):", error);
    }

    var index = 10
    for (const child of childResponse.data){
      rowValuesDict[index] = [
        child.id,
        cribroomResponse.data.name,
        child.id,
        child.first_name,
        child.last_name,
        child.identification,
        child.ident_type.type,
        child.birthdate,
        child.age,
        child.gender.gender,
        child.street,
        child.house_number,
        child.locality.locality,
        child.guardian.last_name,
        child.guardian.identification,
        child.shift.name,
        child.is_active === true ? 'Activo' : 'Inactivo',
      ];
      index += 1;
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([]); // An empty worksheet
    // Populate the worksheet with values from rowValuesDict
    let startRow = 1; // Starting row to add values
    for (const rowNum in rowValuesDict) {
      if (rowValuesDict.hasOwnProperty(rowNum)) {
        const rowData = rowValuesDict[rowNum];
        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${startRow}` });
        startRow++;
      }
    }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Metadata');
    XLSX.writeFile(workbook, `${cribroomResponse.data.name} ${cribroomResponse.data.code} ${currentMonth}${currentYear}.xlsx`, { compression: true });
  }
  
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const { selectedCribroomId, authTokens  } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, selectedCribroomId, authTokens);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Descargar Padron
    </MenuItem>
  );
}
