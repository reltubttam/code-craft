function Storefront() {
  return {
    buy: function (id, decrementCdCount, handlePayment, findById) {
      const paymentSuccessful = handlePayment();

      if (!paymentSuccessful) {
        return findById(id);
      }
      const boughtCd = decrementCdCount(id);

      return boughtCd;
    },
  };
}

function Warehouse() {
  let cds = [];
  return {
    recieve: function (incomingCds) {
      cds.push(...incomingCds);
      return cds;
    },
    getTotalCDCount: function () {
      return cds
        .map(({ stockCount }) => stockCount)
        .reduce((total, stockCount) => total + stockCount, 0);
    },
    searchCDsByArtist: function (queryArtist) {
      return cds.filter(({ artist }) => artist === queryArtist);
    },
    searchCDsByTitle: function (queryTitle) {
      return cds.filter(({ title }) => title === queryTitle);
    },
    decreaseCDStockLevelById: function (cdId) {
      const foundCd = cds.find(({ id }) => id === cdId);
      foundCd.stockCount -= 1;
      return foundCd;
    },
    findById: function (cdId) {
      return cds.find(({ id }) => id === cdId);
    },
  };
}

module.exports = { Warehouse, Storefront };
