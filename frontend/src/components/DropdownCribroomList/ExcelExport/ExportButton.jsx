import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton(props) {

  const { salaCunaId, childrenListId } = props;

  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem
      salaCunaId={salaCunaId}
      childrenListId={childrenListId}
      />
    </GridToolbarExportContainer>
  );
}
