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
  it("Warehouse returns no CDs if none in stock", () => {
    const { getTotalCDCount } = Warehouse();

    assert.equal(0, getTotalCDCount());
  });

  it("Warehouse returns no CDs if multiple in stock", () => {
    const { getTotalCDCount, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Michael Buble", stockCount: 13 },
    ]);

    assert.equal(13, getTotalCDCount());
  });

  it("Warehouse can recieve CDs from Record Labels", () => {
    const { getTotalCDCount, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Michael Buble", stockCount: 13, id: 1 },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 2 },
    ]);

    assert.equal(26, getTotalCDCount());
  });

  it("Can search for a CD by artist where one exists", () => {
    const { searchCDsByArtist, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Michael Buble", stockCount: 13, id: 1 },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 2 },
    ]);

    assert.deepEqual(
      [{ title: "Greatest Hits", artist: "Michael Buble", stockCount: 13, id: 1 }],
      searchCDsByArtist("Michael Buble")
    );
  });


  it("Can search for a CD by artist where multiple exist", () => {
    const { searchCDsByArtist, recieve } = Warehouse();

    recieve([
      { title: "Greatest Hits", artist: "Michael Buble", stockCount: 13, id: 1 },
      { title: "Call me irresponsible", artist: "Michael Buble", stockCount: 13, id: 2 },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 3 },
    ]);

    assert.deepEqual(
      [
        { title: "Greatest Hits", artist: "Michael Buble", stockCount: 13, id: 1 },
        { title: "Call me irresponsible", artist: "Michael Buble", stockCount: 13, id: 2 },
      ],
      searchCDsByArtist("Michael Buble")
    );
  });

  it ("Can search for a CD by title", () => {
    const { searchCDsByTitle, recieve } = Warehouse();

    recieve([
      {title: "Toxicity", artist: "System of a Down", stockCount: 666, id: 4},
    ]);

    assert.deepEqual(
      [{title: "Toxicity", artist: "System of a Down", stockCount: 666, id: 4}],
      searchCDsByTitle("Toxicity")
    )
  })

  // it ("buying a cd out of stock fails", () => {
  //   try {
  //     buy(id)
  //   } catch (err) {
  //     assert.equal(err.message, "NOT IN STOCK")
  //   }
    
  // })

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
