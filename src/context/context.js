import React, { useReducer, createContext, useState } from 'react';
import contextReducer from './contextReducer';
import fire from "../fire";
const db = fire.firestore();
const collection = db.collection("tracker")
const initialState = {
  data: [],
  loading: true
};

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    collection.doc(id).delete().then(() => {
      transactions.data = [];
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  const getTransactions = () => {
    const user_id = localStorage.getItem("uid");
    collection.get().then((docs) => {
      let data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
      });
      dispatch({ type: "GET_TRANSACTIONS", payload: { data: data.filter(row => row.uid === user_id), loading: false } });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  };

  const addTransaction = (transaction) => {
    transaction["uid"] = localStorage.getItem("uid");
    collection.doc(transaction.id).set(transaction).then(() => {
      transactions.data.push(transaction)
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: { data: transactions.data.filter(row => row.uid === localStorage.getItem("uid")), loading: false }
      });
    }).catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });;
  };

  const updateTransaction = (transaction) => {
    const docRef = collection.doc(transaction.id);
    return docRef.update(transaction).then(() => {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: initialState });
    }).catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  };

  const clearTransactions = () => {
    transactions.data = [];
    dispatch({ type: 'CLEAR_TRANSACTIONS', payload: initialState });
  }

  const balance = transactions.data.reduce((acc, currVal) => (currVal.type === 'Expense' ? parseFloat(acc) - parseFloat(currVal.amount) : parseFloat(acc) + parseFloat(currVal.amount)), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
      getTransactions,
      updateTransaction,
      clearTransactions
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
