const assert = require("assert");
const Warehouse = require("./index");

// Customers can buy CDs, searching on the title and the
// artist. Their credit card payment is processed by an external provider. Record labels send batches of CDs to the warehouse. Keep a
// stock count of how many copies of each title are in the warehouse.
// Customers can leave reviews for CDs they’ve bought through the warehouse, which gives each title an integer rating from 1- 10 and the text of their review if they want to say more.

// Buy CDs
// Search by title
// Warehouse recieves CDs
// Customers can review

describe.only("CD Warehouse", () => {
  it("Warehouse returns no CDs if none added", () => {
    const { getCDCount } = Warehouse();

    assert.equal(0, getCDCount());
  });

  it("Warehouse can recieve CDs from Record Labels", () => {
    const { getCDCount, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Micheal Buble" },
      { title: "Bat Out of Hell", artist: "Meat Loaf" },
    ]);

    assert.equal(2, getCDCount());
  });

  it("Can search for a CD by artist", () => {
    const { searchCDsByArtist, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Michael Buble" },
      { title: "Bat Out of Hell", artist: "Meat Loaf" },
    ]);

    assert(
      { title: "Greatest Hits", artist: "Micheal Buble" },
      searchCDsByArtist("Michael Buble")
    );
  });

  // Get total count of all CDs in warehouse
  // Warehouse can receive CDs and total CD count will increase
  // Can search CD inventory

  // Buy CD
  // Reduce inventory
  // mock payment provider

  // Review CD
  // Can accept integer rating and text
  // Can only be reviewed by purchaser
});
