const CURRENCY_CONFIG = {
  INR: {
    locale: "en-IN",
    currency: "INR",
  },

  USD: {
    locale: "en-US",
    currency: "USD",
  },

  EUR: {
    locale: "en-IE",
    currency: "EUR",
  },

  GBP: {
    locale: "en-GB",
    currency: "GBP",
  },
};

export function getSelectedCurrency() {
  try {
    const savedSettings =
      localStorage.getItem("finSightSettings");

    if (!savedSettings) {
      return "INR";
    }

    const parsedSettings =
      JSON.parse(savedSettings);

    const selectedCurrency =
      parsedSettings.currency;

    return CURRENCY_CONFIG[selectedCurrency]
      ? selectedCurrency
      : "INR";
  } catch (error) {
    console.error(
      "Failed to read currency settings:",
      error
    );

    return "INR";
  }
}

export function formatCurrency(
  amount,
  currencyCode = getSelectedCurrency()
) {
  const config =
    CURRENCY_CONFIG[currencyCode] ||
    CURRENCY_CONFIG.INR;

  const numericAmount = Number(amount) || 0;

  return new Intl.NumberFormat(
    config.locale,
    {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 2,
    }
  ).format(numericAmount);
}