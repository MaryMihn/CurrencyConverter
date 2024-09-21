import { Box } from "@mui/material";
import Header from "./components/Header";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <Header />
      <CurrencyConverter />
    </Box>
  );
}

export default App;
