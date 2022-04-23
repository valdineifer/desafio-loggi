const { regions, types } = require('./constants');
const data = require('./data.json');
const extractData = require('./extractor');
const format = require('./format');

/**
 * 1. Identificar a região de destino de cada pacote,
 * com totalização de pacotes (soma região);
 */
function packageDestination() {
  const report = {
    pacotes: {},
    somaRegiao: {
      'Sudeste': 0,
      'Sul': 0,
      'Centro-oeste': 0,
      'Nordeste': 0,
      'Norte': 0,
    }
  };

  for (package of data) {
    try {
      let { destination } = extractData(package);

      report.pacotes[package.name] = destination;
      report.somaRegiao[destination]++;
    } catch (e) {
      continue;
    }
  }

  return report;
}

/**
 * 2. Saber quais pacotes possuem códigos de barras válidos e/ou inválidos;
 */
function isValidPackages() {
  for (package of data) {
    const report = {};
    try {
      let packageData = extractData(package);

      report[packageData.name] = 'VÁLIDO';
    } catch (e) {
      report[packageData.name] = 'INVÁLIDO';
    }
  }
}

/**
 * 3. Identificar os pacotes que têm como origem
 * a região Sul e Brinquedos em seu conteúdo;
 */
function filterSulAndBrinquedos() {
  const packages = [];

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (
        formattedPackage.origin === regions.SUL
        || formattedPackage.type === types.BRINQUEDOS
      ) {
        packages.push(formattedPackage);
      }
    } catch (e) {
      continue;
    }
  };

  return packages;
}

/**
 * 4. Listar os pacotes agrupados por região de destino (Considere apenas
pacotes válidos);
 */
function groupValidPackagesByRegion() {
  const report = {
    'Sudeste': [],
    'Sul': [],
    'Centro-oeste': [],
    'Nordeste': [],
    'Norte': []
  };

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      report[formattedPackage.destination].push(formattedPackage);
    } catch (e) {
      continue;
    }
  }

  return report;
}

/**
 * 5. Listar o número de pacotes enviados por cada vendedor
 * (Considere apenas pacotes válidos);
 */
function validPackagesPerSeller() {
  const report = {};

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (report[formattedPackage.sellerCode]) {
        report[formattedPackage.sellerCode]++;
      } else {
        report[formattedPackage.sellerCode] = 1;
      }
    } catch (e) {
      continue;
    }
  }

  return report;
}

/**
 * 6. Gerar o relatório/lista de pacotes por destino e por tipo
 * (Considere apenas pacotes válidos);
 */
function packagesReportByDestinationAndType(destination, type) {
  const packages = [];

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (
        formattedPackage.destination === destination
        || formattedPackage.type === type
      ) {
        packages.push(formattedPackage);
      }
    } catch (e) {
      continue;
    }
  };
}

/**
 * 7. Se o transporte dos pacotes para o Norte passa pela Região Centro-Oeste,
 * quais são os pacotes que devem ser despachados no mesmo caminhão?
 */
function getNortePackagesThroughCentroOeste() {
  const packages = [];

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (
        formattedPackage.destination === regions.CENTROOESTE
        || formattedPackage.destination === regions.NORTE
      ) {
        packages.push(formattedPackage);
      }
    } catch (e) {
      continue;
    }
  };

  return packages;
}

/**
 * 8. Se todos os pacotes fossem uma fila qual seria a ordem de carga para o Norte
 * no caminhão para descarregar os pacotes da Região Centro Oeste primeiro;
 */
function organizePackagesToNorteAndCentroOeste() {
  const nortePackages = [];
  const centroOestePackages = [];

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (formattedPackage.destination === regions.NORTE) {
        nortePackages.push(formattedPackage);
      }
      if (formattedPackage.destination === regions.CENTROOESTE) {
        centroOestePackages.push(formattedPackage);
      }
    } catch (e) {
      continue;
    }

    // Colocando a carga do Norte primeiro para a de Centro-oeste ser retirada primeiro
    // Funcionaria na verdade como uma pilha (stack)
    return [
      ...nortePackages,
      ...centroOestePackages
    ];
  };

  return packages;
}

/**
 * 9. No item acima considerar que as jóias fossem sempre
 * as primeiras a serem descarregadas;
 */
function organizePackagesWithJoias() {
  const nortePackages = [];
  const centroOestePackages = [];

  for (package of data) {
    try {
      let formattedPackage = extractData(package);

      if (formattedPackage.destination === regions.NORTE) {
        nortePackages.push(formattedPackage);
      }
      if (formattedPackage.destination === regions.CENTROOESTE) {
        centroOestePackages.push(formattedPackage);
      }
    } catch (e) {
      continue;
    }

    // Colocando a carga do Norte primeiro para a de Centro-oeste ser retirada primeiro
    // Funcionaria na verdade como uma pilha (stack)
    return [
      ...nortePackages.sort,
      ...centroOestePackages
    ];
  };

  return "Não processado";
}

/**
 * 10. Listar os pacotes inválidos.
 */
function getInvalidPackages() {
  const packages = [];

  for (package of data) {
    try {
      extractData(package);
    } catch (e) {
      packages.push(package);
    }
  };

  return packages;
}