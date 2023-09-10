import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { config } from './config';
import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

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

function handleExport(apiRef, selectedCribroomId) {
  const data = getExcelData(apiRef);

  const rows = data.map((row) => {
    const mRow = {};
    for (const key of config.keys) {
      mRow[key] = row[key];
    }
    return mRow;
  });

  // Create a new worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Add the first blank row
  XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: 'A1' });

  const firstRowValues = [
    'selectedCribroomId',
    selectedCribroomId,
  ];
  console.log('firstRowValues: ', firstRowValues);

  // Add the second row with specified cell values
  const secondRowValues = [
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
  ];
  XLSX.utils.sheet_add_aoa(worksheet, [secondRowValues], { origin: 'A3' });

  // Create a new workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, config.sheetName);

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
