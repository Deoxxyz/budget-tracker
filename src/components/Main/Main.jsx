import React, { useContext, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import formatNumber from '../../utils/formatNumber';
const ExpenseTracker = () => {
  const classes = useStyles();
  const { balance, getTransactions, transactions } = useContext(ExpenseTrackerContext);
  useEffect(() => {
    getTransactions();
  }, [balance]);
  return (
    <Card className={classes.root}>
      <CardHeader title="Budget Tracker" subheader="Powered by Speechly" />
      <CardContent>
        <Typography align="center" variant="h5">
          {`Total Balance PHP${formatNumber(balance)}`}
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
