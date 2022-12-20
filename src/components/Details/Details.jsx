import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import formatNumber from '../../utils/formatNumber';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  const options = {
    legend: {
      labels: {
        color: 'white'
      }
    }
  }
  return (
    <Card className={title === 'Income' ? classes.income : classes.expense} >
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Typography variant="h4">
          {`PHP ${formatNumber(total)}`}
        </Typography>
        <Doughnut data={chartData} options={options}
        />
      </CardContent>
    </Card >
  );
};

export default DetailsCard;
