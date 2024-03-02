export const getCardType = (number) => {
    // This is very basic implementation:
    // Note: In a real-world scenario, we will use a library e.g credit-card-type via npm
    const firstDigit = number[0];
    switch (firstDigit) {
      case '3': return 'amex';
      case '4': return 'visa';
      case '5': return 'mastercard';
      case '6': return 'discover';
      default: return 'unknown'; 
    }
  }
  