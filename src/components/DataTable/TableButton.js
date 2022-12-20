import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import {
    Tooltip, Button, Grid, TextField, FormControl,
    InputAdornment,
} from '@mui/material';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

const TableButton = (props) => {

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const { search_class } = useStyles();
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(props.excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: filetype });
        FileSaver.saveAs(data, props.fileName + fileExtension);
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <FormControl className={search_class}>
                        <TextField
                            size="small"
                            variant="outlined"
                            onChange={(e) => props.handleSearch(e.target.value)}
                            value={props.search}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{
                                            cursor: "pointer",
                                            display: props.search ? "flex" : "none"
                                        }}
                                        onClick={props.clearSearch}
                                    >
                                        <ClearIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Grid item xs={6} space={1}>
                        <Tooltip title="Add New Record">
                            <Button
                                sx={{ m: 1, p: 1 }}
                                variant="contained"
                                fullWidth={false}
                                size="small"
                                color="primary"
                                onClick={() => props.handleClickOpen(props.row, { type: "add", open: true })}
                            >
                                Add
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title="Excel Export">
                            <Button
                                fullWidth={false}
                                variant="contained"
                                size="small"
                                sx={{ m: 1, p: 1 }}
                                onClick={(e) => exportToExcel(props.apiData, props.fileName)} color="success"
                            >
                                Download
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TableButton;
