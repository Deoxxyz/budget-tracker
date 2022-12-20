import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "./Dialog";
import { Grid, Button } from "@mui/material";
import FormTable from './FormTable';
import TableButton from './TableButton';
import formatDate from "../../utils/formatDate";
import { ExpenseTrackerContext } from '../../context/context';
import formatNumber from '../../utils/formatNumber';
const columns = [
  { id: 'date', label: 'Date', minWidth: 100, align: "center" },
  { id: 'type', label: 'Type', minWidth: 100, align: "center" },
  { id: 'category', label: 'Category', minWidth: 100, align: "center" },
  { id: 'amount', label: 'Amount', minWidth: 100, align: "center", type: "currency" }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: 450,
    maxHeight: 450,
  },
});

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index])
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((el) => el[0])
}

export default function DataTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState("amount");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialog, setOpenDialog] = React.useState({ type: "add", open: false });
  const [record, setRecord] = React.useState(initialState);
  const [search, setSearch] = React.useState('');
  const {
    transactions,
    deleteTransaction,
    addTransaction,
    getTransactions,
    balance,
    updateTransaction
  } = React.useContext(ExpenseTrackerContext);
  const [table_data, setTableData] = React.useState(transactions.data);
  useEffect(() => {
    getTransactions();
    setTableData(transactions.data);
  }, [balance])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteRecord = () => {
    deleteTransaction(record.id)
    handleClose();
  }

  const saveRecord = (data) => {
    if (dialog.type === "add") {
      data.id = uuidv4();
      addTransaction(data)
    } else {
      const objIndex = transactions.data.findIndex((row => row.id === data.id));
      transactions.data[objIndex] = data;
      updateTransaction(transactions.data[objIndex])
    }
    setOpenDialog({ type: "", open: false });
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (row, dialog) => {
    setRecord(row)
    setOpenDialog(dialog);
  };

  const handleClose = () => {
    setRecord({});
    setOpenDialog({ type: "", open: false });
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (search) => {
    const tmp = searchData(search);
    setTableData(tmp);
    setSearch(search)

  }

  const clearSearch = () => {
    setTableData(transactions.data);
    setSearch('');
  }

  const searchData = (to_search) => {
    return transactions.data.filter(transaction =>
      Object.values(transaction).some(val =>
        String(val).toLowerCase().includes(to_search)
      )
    );
  }

  return (
    <>
      <Paper style={{ padding: "20px" }}>
        <TableButton
          handleClickOpen={handleClickOpen}
          row={initialState}
          excelData={table_data}
          apiData={"Excel Export"}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          search={search}
          fileName={"Budget Tracker"}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell style={{ minWidth: 50 }} align={"center"}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                sortedRowInformation(
                  table_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                  getComparator(order, orderBy)
                ).map((row, rowIndex) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.type === 'currency' ? `PHP${formatNumber(value)}` : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align={"center"} style={{ minWidth: 50 }}>
                        <Grid container alignItems="center" justifyContent={"center"}>
                          <Grid item xs={4}>
                            <Button onClick={() => handleClickOpen(row, { type: "edit", open: true })}>Edit</Button>
                          </Grid>
                          <Grid item xs={4}>
                            <Button onClick={() => handleClickOpen(row, { type: "delete", open: true })}>Delete</Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactions.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={dialog.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialog.type.toUpperCase()}
          </DialogTitle>
          <DialogContent>
            {dialog.type === "delete" ? (
              <DialogContentText id="alert-dialog-description">
                Do you want to delete this record?
              </DialogContentText>
            ) : (
              <FormTable record={record} handleClose={handleClose} saveRecord={saveRecord} />
            )}
          </DialogContent>
          {dialog.type === "delete" && (
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={deleteRecord} autoFocus>Yes</Button>
            </DialogActions>
          )}
        </Dialog>
      </Paper>
    </>
  );
}
