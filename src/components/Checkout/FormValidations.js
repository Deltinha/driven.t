const validations = {
  number: {
    isValid: (number) => number.split(" ").join("").length === 16,
    message: "Digite um cartão válido",
  },
  issuer: {
    isValid: (number) => isCardIssuerValid(number),
    message: "Não reconhecemos essa operadora de cartão",
  },
  name: {
    isValid: (name) => name.trim().length >= 3,
    message: "Digite um nome válido",
  },
  expiry: {
    isValid: (expiry) => expiry.split("/")[0] >= 1 && expiry.split("/")[0] <= 12 && expiry.length === 5,
    message: "Digite uma data válida",
  },
  cvc: {
    isValid: (cvc) => cvc.length === 3,
    message: "Digite um código válido",
  },
};
  
export default validations;

function isCardIssuerValid(number) {
  const issuer = Number(number[0] + number[1]);

  if (issuer >= 34 && issuer <= 60 && issuer !== 39) return true;
  if (issuer === 62 || issuer === 65) return true;
  return false;
}
