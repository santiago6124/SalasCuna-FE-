import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton(props) {

  const { selectedCribroomId } = props;

  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem
      selectedCribroomId={selectedCribroomId}
      />
    </GridToolbarExportContainer>
  );
}
