import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

const Header = () => {
  const rates = useCurrencyRates();

  return (
    <AppBar sx={{ width: "100%" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Currency Converter</Typography>
        </Box>
        <Typography variant="body1">
          1 USD = {rates?.usdToUah.toFixed(2)} UAH
        </Typography>
        <Box sx={{ mx: 2 }} />
        <Typography variant="body1">
          1 EUR = {rates?.eurToUah?.toFixed(2)} UAH
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
