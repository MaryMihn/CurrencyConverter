import { useState } from "react";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import {
  Box,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { fetchCurrency } from "../hooks/fetchCurrency";

const currencies = ["UAH", "USD", "EUR"];

const CurrencyConverter = () => {
  const theme = useTheme();
  const [amount1, setAmount1] = useState<string>("0");
  const [currency1, setCurrency1] = useState<string>("UAH");
  const [amount2, setAmount2] = useState<string>("0");
  const [currency2, setCurrency2] = useState<string>("USD");

  const changeAmount1 = async (number: string) => {
    setAmount1(number);
    const amount2 = await fetchCurrency(currency1, currency2, number);
    return setAmount2(amount2);
  };

  const changeCurrency1 = async (string: string) => {
    setCurrency1(string);
    const amount2 = await fetchCurrency(string, currency2, amount1);
    return setAmount2(amount2);
  };

  const changeAmount2 = async (number: string) => {
    setAmount2(number);
    const amount1 = await fetchCurrency(currency2, currency1, number);
    return setAmount1(amount1);
  };
  const changeCurrency2 = async (string: string) => {
    setCurrency2(string);
    const amount1 = await fetchCurrency(string, currency1, amount2);
    return setAmount1(amount1);
  };

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const swapValues = async () => {
    const oldCurrency1 = currency1;
    setAmount1(amount2);
    setCurrency1(currency2);
    setCurrency2(oldCurrency1);
    const newAmount2 = await fetchCurrency(currency2, oldCurrency1, amount2);
    setAmount2(newAmount2);
  };

  return (
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
          onFocus={() => amount1 && setAmount1("")}
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
      <Button onClick={swapValues} variant="contained" sx={{ margin: 2 }}>
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
  );
};

export default CurrencyConverter;



