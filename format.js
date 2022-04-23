const buildError = require("./buildError");
const { types, regions } = require("./constants");

const isCodeBetween = (code, lowerValue, greaterValue) => (
  code >= lowerValue && code <= greaterValue
);

module.exports = {
  region(code) {
    if (isCodeBetween(code, 001, 099)) {
      return regions.SUDESTE;
    } else if (isCodeBetween(code, 100, 199)) {
      return regions.SUL;
    } else if (isCodeBetween(code, 200, 299)) {
      return regions.CENTROOESTE;
    } else if (isCodeBetween(code, 300, 399)) {
      return regions.NORDESTE;
    } else if (isCodeBetween(code, 400, 499)) {
      return regions.NORTE;
    } else {
      throw buildError('INVALID_CODE', 'Código inválido');
    }
  },

  type(code) {
    switch (code) {
      case 001:
        return types.JOIAS;
        break;
      case 111:
        return types.LIVROS;
        break;
      case 333:
        return types.ELETRONICOS;
        break;
      case 555:
        return types.BEBIDAS;
        break;
      case 888:
        return types.BRINQUEDOS;
        break;
      default:
        throw buildError('INVALID_CODE', 'Código inválido');
    }
  }
};