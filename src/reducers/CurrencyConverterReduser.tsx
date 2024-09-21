export const  ACTIONS = {
    SET_AMOUNT1: "SET_AMOUNT1",
    SET_CURRENCY1: "SET_CURRENCY1",
    SET_AMOUNT2: "SET_AMOUNT2",
    SET_CURRENCY2: "SET_CURRENCY2",
    SWAP_VALUES: "SWAP_VALUES",
  };
  
  interface State {
    amount1: string;
    amount2: string;
    currency1: string;
    currency2: string;
  }
  
  export const  initialState = {
    amount1: "0",
    currency1: "UAH",
    amount2: "0",
    currency2: "USD",
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const reducer = (state: State, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_AMOUNT1:
        return { ...state, amount1: action.payload };
      case ACTIONS.SET_CURRENCY1:
        return { ...state, currency1: action.payload };
      case ACTIONS.SET_AMOUNT2:
        return { ...state, amount2: action.payload };
      case ACTIONS.SET_CURRENCY2:
        return { ...state, currency2: action.payload };
      case ACTIONS.SWAP_VALUES:
        return {
          ...state,
          amount1: state.amount2,
          currency1: state.currency2,
          amount2: state.amount1,
          currency2: state.currency1,
        };
      default:
        return state;
    }
  };