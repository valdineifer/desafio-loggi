/**
 * Gera uma instância de Erro
 * @param {string} errorType Tipo do erro a ser gerado 
 */
function buildError(errorType, message) {
    const error = new Error(message);
    error.type = errorType;
}

module.exports = buildError;