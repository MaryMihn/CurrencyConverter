import { useState, useEffect } from "react";

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<{
    usdToUah: number;
    eurToUah: number;
  } | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      const key = import.meta.env.VITE_API_KEY;
      try {
        const [usdResponse, eurResponse] = await Promise.all([
          fetch(
            `https://api.exchangerate.host/live?access_key=${key}&source=USD&currencies=UAH`
          ),
          fetch(
            `https://api.exchangerate.host/live?access_key=${key}&source=EUR&currencies=UAH`
          ),
        ]);

        if (!usdResponse.ok || !eurResponse.ok) {
          throw new Error("Error fetching exchange rates!");
        }

        const [usdData, eurData] = await Promise.all([
          usdResponse.json(),
          eurResponse.json(),
        ]);
        setRates({
          usdToUah: usdData.quotes["USDUAH"], 
          eurToUah: eurData.quotes["EURUAH"], 
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  return rates;
};