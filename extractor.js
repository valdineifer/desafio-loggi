const buildError = require("./buildError");
const { regions, types } = require("./constants");
const format = require("./format");
const inactiveSellers = require('./inactiveSellers.json');

/**
 * Extrai código da região de origem
 * @param {string} code Código do produto
 * @returns {string} Código da região de origem
 */
const extractOrigin = (code) => code.slice(0, 3);

/**
 * Extrai código da região de destino
 * @param {string} code Código do produto
 * @returns {string} Código da região de destino
 */
const extractDestination = (code) => code.slice(3, 6);

/**
 * Extrai código da Loggi
 * @param {string} code Código do produto
 * @returns {string} Código da Loggi
 */
const extractLoggiCode = (code) => code.slice(6, 9);

/**
 * Extrai código do vendedor
 * @param {string} code Código do produto
 * @returns {string} Código do vendedor
 */
const extractSellerCode = (code) => code.slice(9, 12);

/**
 * Extrai código do tipo de produto
 * @param {string} code Código do produto
 * @returns {string} Código do tipo de produto
 */
const extractTypeCode = (code) => code.slice(12);

/**
 * Extrai os dados do código do pacote
 * 
 * @param {object} package Pacote
 * @param {string} package.name Nome do pacote
 * @param {string} package.code Código do pacote
 */
function extractData({ name, code }) {
  if (code.length != 15) {
    throw buildError('INVALID_CODE', `Código do produto '${name}' é inválido`);
  }

  const obj = {
    name,
    origin: format.region(extractOrigin(code)),
    destination: format.region(extractDestination(code)),
    loggiCode: extractLoggiCode(code),
    sellerCode: extractSellerCode(code),
    type: format.type(extractTypeCode(code))
  };

  if (obj.origin === regions.CENTROOESTE && obj.type === types.JOIAS) {
    throw buildError('INVALID_CODE', `Código do produto '${name}' é inválido`);
  }

  if (inactiveSellers.find((value) => value === obj.sellerCode)) {
    throw buildError('INVALID_CODE', `Código do produto '${name}' é inválido`);
  }

  return obj;
}

module.exports = extractData;