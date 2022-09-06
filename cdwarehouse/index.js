function Storefront() {
  return {
    buy: function (id, decrementCdCount, handlePayment, findById, quantity, notifyCharts) {
      const paymentSuccessful = handlePayment();

      if (!paymentSuccessful) {
        return findById(id);
      }
      const boughtCd = decrementCdCount(id, quantity || 1);

      if (notifyCharts) notifyCharts({
          artist: boughtCd.artist,
          title: boughtCd.title,
          copies: quantity || 1,
      })

      return boughtCd;
    },
    getPrice: function (cd, getIsTop100, getLowestCompetitorPrice) {
      if (getIsTop100(cd.name, cd.artist)){
        return getLowestCompetitorPrice() - 1;
      }
      return cd.price
    }
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
    decreaseCDStockLevelById: function (cdId, quantity=1) {
      const foundCd = cds.find(({ id }) => id === cdId);
      foundCd.stockCount -= quantity;
      return foundCd;
    },
    findById: function (cdId) {
      return cds.find(({ id }) => id === cdId);
    },
  };
}


module.exports = { Warehouse, Storefront };
