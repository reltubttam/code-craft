function Warehouse() {
  let cds = [];
  return {
    recieve: function (incomingCds) {
      cds.push(...incomingCds);
      return cds;
    },
    getTotalCDCount: function () {
      return cds.map(({stockCount}) => stockCount).reduce((total, stockCount) => total + stockCount, 0);
    },
    searchCDsByArtist: function (queryArtist) {
      return cds.filter(({ artist }) => artist === queryArtist);
    },
    searchCDsByTitle: function (queryTitle) {
      return cds.filter(({title}) => title === queryTitle);
    }
  };
}

module.exports = Warehouse;
