
export const fetchCurrency = async (
    currency1: string,
    currency2: string,
    amount: string
  ) => {
    const key = import.meta.env.VITE_API_KEY;
    const pass = `https://api.exchangerate.host/convert?access_key=${key}&from=${currency1}&to=${currency2}&amount=${amount}`;
    try {
      const response = await fetch(pass);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // return data.result.toFixed(2);
      return data.result?.toFixed(2);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };