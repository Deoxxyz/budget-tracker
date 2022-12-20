import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    height: "100%",
    background: "#fff",/*"rgba( 209, 158, 255, 0.3)",*/
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1rem)",
    borderRadius: "var(--BorderRadius)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderLeft: "5px solid rgba(0, 255, 100, 0.5)",
    transition: "all 350ms ease",
    '&:hover': {
        background: "rgba(240,210,240,.4)",
        boxShadow: "5px 8px 32px 0 rgba(200,200,200,.4)",
        borderLeft: "15px solid rgba(0, 255, 100, 0.5)",
    },
    '& *': {
        color: "var(--White)",
    }
  },
  expense: {
    height: "100%",
    background: "#fff",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1rem)",
    borderRadius: "var(--BorderRadius)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderLeft: "5px solid rgba(255, 0, 0, 0.5)",
    '&:hover': {
        background: "rgba(240,210,240,.4)",
        boxShadow: "5px 8px 32px 0 rgba(200,200,200,.4)",
        borderLeft: "15px solid rgba(255, 0, 0, 0.5)",
    },
    '& *': {
        color: "var(--White)",
    }
  },
}));
