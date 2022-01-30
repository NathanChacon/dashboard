import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable(props) {
    const {rows, columns, actions} = props

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {columns.map((column) => {
                        return <TableCell key={column.key}>{column.title}</TableCell>
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row,index) => {
                    const cells = Object.keys(row).map((key) => {
                        return <TableCell align="left">{row[key]}</TableCell>
                    })
                
                    return <TableRow key={index}>
                                {cells}
                            </TableRow>
                })}
            </TableBody>
      </Table>
    </TableContainer>
  );
}