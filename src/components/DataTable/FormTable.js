import React from 'react'
import TextField from '@mui/material/TextField';
import { Grid, Button, Divider } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { incomeCategories, expenseCategories } from "../../constants/categories";

export default function FormTable(props) {

  const [form, setFormData] = React.useState(props.record);
  const [categories, setCategories] = React.useState(props.record.type === "Income" ? incomeCategories : expenseCategories);

  const handleChangeType = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      type: value
    }));
    setCategories(value === "Income" ? incomeCategories : expenseCategories);
  }

  return (
    <>
      <Grid container spacing={1} sx={{ minWidth: 500, padding: "10px" }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="date"
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => setFormData((prevState) => ({
                ...prevState,
                date: e.target.value
              }))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={form.type}
              label="Type"
              onChange={(e) => handleChangeType(e.target.value)}
            >
              <MenuItem value={"Income"}>Income</MenuItem>
              <MenuItem value={"Expense"}>Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category}
              label="Category"
              onChange={(e) => setFormData((prevState) => ({
                ...prevState,
                category: e.target.value
              }))}
            >
              {
                categories.map((category, index) => {
                  return (
                    <MenuItem key={`cat${index}`} value={category.type}>{category.type}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              style={{ marginTop: "10px" }}
              label={"Amount"}
              type="number"
              value={form.amount}
              onChange={(e) => setFormData((prevState) => ({
                ...prevState,
                amount: parseFloat(e.target.value)
              }))}
            />
          </FormControl>
        </Grid>

      </Grid>
      <Divider />
      <Grid container alignItems="center" justifyItems="center">
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button onClick={props.handleClose}>Cancel</Button>
        </Grid>
        <Grid item xs={2}>
          <Button disabled={form.category === "" || form.amount === ""} onClick={() => props.saveRecord(form)} autoFocus>Save</Button>
        </Grid>
      </Grid>
    </>
  )
}
