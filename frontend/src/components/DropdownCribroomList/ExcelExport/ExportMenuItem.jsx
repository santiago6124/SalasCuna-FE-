import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { config } from './config';
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

  var rowValuesDict = {
    // '1': ['Sala Cuna:', cribroomResponse['code']],
    // '2': [cribroomResponse['name']],
    '3': ['Mes', 'generate'],
    '4': ['Año', 'generate', '', '', '', '', '', '', '', '', '', '', '', '', '', 'CANTIDAD DE NIÑOS', 'amount'],
    '5': ['Provincia de Córdoba'],
    // '6': [cribroomResponse['entity']],
    '7': [''],
    '8': [''],
    '9':[
      'N°',
      'SALA CUNA',
      'APELLIDO',
      'NOMBRE',
      'N° DNI',
      'FECHA DE NACIMIENTO',
      'EDAD',
      'SEXO',
      'CALLE',
      'NUMERO',
      'DEPARTAMENTO',
      'LOCALIDAD',
      'CARACTERISTICA TELEFONICA',
      'TELEFONO',
      'APELLIDO Y NOMBRE MADRE',
      'DNI',
      'TURNO',
      'ESTADO',
    ],
  }

  const data = getExcelData(apiRef);

  const rows = data.map((row) => {
    const mRow = {};
    for (const key of config.keys) {
      mRow[key] = row[key];
    }
    return mRow;
  });
  console.log('rows: ', rows);

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

  // Trigger the file download
  XLSX.writeFile(workbook, config.fileName, { compression: true });
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const { selectedCribroomId } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, selectedCribroomId);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}
