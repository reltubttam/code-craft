function warehouse() {
  let cds = [];
  return {
    recieve: function (incomingCds) {
      cds.push(...incomingCds);
      return cds;
    },
    getCDCount: function () {
      return cds.length;
    },
    searchCDsByArtist: function (queryArtist) {
      return cds.find(({ artist }) => artist === queryArtist);
    },
  };
}

module.exports = warehouse;
