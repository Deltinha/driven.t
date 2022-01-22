const validations = {
  number: {
    isValid: (number) => number.split(" ").join("").length === 16,
    message: "Digite um cartão válido",
  },
  issuer: {
    isValid: (number) => isCardIssuerValid(number.split(" ").join("")),
    message: "Não trabalhamos com essa operadora de cartão",
  },
  name: {
    isValid: (name) => name.trim().length >= 3,
    message: "Digite um nome válido",
  },
  expiry: {
    month: {
      isValid: (expiry) => expiry.split("/")[0] >= 1 && expiry.split("/")[0] <= 12 && expiry.length === 5,
      message: "Digite um mês válido",
    },
    expired: {
      isValid: (expiry) => !isCardExpired(expiry),
      message: "Esse cartão já venceu"
    },
  },
  cvc: {
    isValid: (cvc) => cvc.length === 3,
    message: "Digite um código válido",
  },
};

export default validations;

function isCardIssuerValid(number) {
  const valid = {
    dankort: /^(5019)\d+$/,
    unionpay: /^(62)\d+$/,
    visa: /^4[0-9]{6,}$/,
    mastercard: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
    amex: /^3[47][0-9]{5,}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    jcb: /^(35[0-9]{3})[0-9]{3,}$/
  };

  for(var key in valid) {
    if(valid[key].test(number)) {
      return true;
    }
  }

  return false;
}

function isCardExpired(expiry) {
  const [expiryMonth, expiryYear] = expiry.split("/");
  const presentYear = new Date().getFullYear();
  const presentMonth = new Date().getMonth() + 1;

  if (Number(`20${expiryYear}`) < presentYear) return true;
  if (Number(expiryMonth) < presentMonth) return true;
  return false;
}
