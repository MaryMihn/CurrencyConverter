import { useReducer, useState } from "react";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import {
  Box,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchCurrency } from "../hooks/fetchCurrency";
import { ACTIONS, initialState, reducer } from "../reducers/CurrencyConverterReduser";

const currencies = ["UAH", "USD", "EUR"];

const CurrencyConverter = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { amount1, currency1, amount2, currency2 } = state;
  const [loading, setLoading] = useState<boolean>(false);

  const changeAmount1 = async (number: string) => {
    dispatch({ type: ACTIONS.SET_AMOUNT1, payload: number });
    setLoading(true);
    const convertedAmount2 = await fetchCurrency(currency1, currency2, number);
    dispatch({ type: ACTIONS.SET_AMOUNT2, payload: convertedAmount2 });
    setLoading(false);
  };

  const changeCurrency1 = async (currency: string) => {
    dispatch({ type: ACTIONS.SET_CURRENCY1, payload: currency });
    setLoading(true);
    const convertedAmount2 = await fetchCurrency(currency, currency2, amount1);
    dispatch({ type: ACTIONS.SET_AMOUNT2, payload: convertedAmount2 });
    setLoading(false);
  };

  const changeAmount2 = async (number: string) => {
    dispatch({ type: ACTIONS.SET_AMOUNT2, payload: number });
    setLoading(true);
    const convertedAmount1 = await fetchCurrency(currency2, currency1, number);
    dispatch({ type: ACTIONS.SET_AMOUNT1, payload: convertedAmount1 });
    setLoading(false);
  };

  const changeCurrency2 = async (currency: string) => {
    dispatch({ type: ACTIONS.SET_CURRENCY2, payload: currency });
    setLoading(true);
    const convertedAmount1 = await fetchCurrency(currency, currency1, amount2);
    dispatch({ type: ACTIONS.SET_AMOUNT1, payload: convertedAmount1 });
    setLoading(false);
  };

  const swapValues = async () => {
    const tempCurrency = currency1;
    dispatch({ type: ACTIONS.SWAP_VALUES });
    setLoading(true);
    const newAmount2 = await fetchCurrency(currency2, tempCurrency, amount2);
    dispatch({ type: ACTIONS.SET_AMOUNT2, payload: newAmount2 });
    setLoading(false);
  };

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexDirection: smallScreen ? "column" : "row",
        }}
      >
        <Box>
          <TextField
            type="number"
            value={amount1}
            onChange={(e) => changeAmount1(e.target.value)}
            onFocus={() =>
              amount1 && dispatch({ type: ACTIONS.SET_AMOUNT1, payload: "" })
            }
          />
          <TextField
            select
            value={currency1}
            onChange={(e) => changeCurrency1(e.target.value)}
            sx={{ ml: 2 }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          onClick={swapValues}
          variant="contained"
          sx={{ mx: 2 }}
          disabled={loading} 
        >
          <SwapHorizontalCircleIcon />
        </Button>
        <Box>
          <TextField
            type="number"
            value={amount2}
            onChange={(e) => changeAmount2(e.target.value)}
          />
          <TextField
            select
            value={currency2}
            onChange={(e) => changeCurrency2(e.target.value)}
            sx={{ ml: 2 }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      {loading && <CircularProgress />}
    </Box>
  );
};

export default CurrencyConverter;
