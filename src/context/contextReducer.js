const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      const data = state.data.filter((transaction) => transaction.id !== action.payload);
      transactions = {
        data: data,
        loading: false
      };
      return transactions;
    case 'ADD_TRANSACTION':
      transactions = {
        ...action.payload,
        ...state
      };
      return transactions;

    case 'UPDATE_TRANSACTION':
      transactions = {
        ...action.payload,
        ...state
      };
      return transactions;

    case 'GET_TRANSACTIONS':
      transactions = {
        data: action.payload.data,
        loading: false
      };
      return transactions;

    case 'CLEAR_TRANSACTIONS':

      transactions = {
        ...action.payload,
        ...state
      };
      console.log("CLEAR",transactions)
      return transactions;

    default:
      return state;
  }
};

export default contextReducer;