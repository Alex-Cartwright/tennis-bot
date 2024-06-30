import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { TableBody, TableHead } from '@mui/material';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { id: string }>({ data, columns }: TableProps<Entry>) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead sx={{textAlign: "left"}}>
          <tr>
            {columns.map((column, index) => (
              <th key={column.title + index}>{column.title}</th>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {data.map((entry, entryIndex) => (
            <tr key={entry?.id || entryIndex}>
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <td key={title + columnIndex}>
                  {Cell ? <Cell entry={entry} /> : (entry[field] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};