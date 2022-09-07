const assert = require("assert");
const { Warehouse, Storefront } = require("./index");

// Customers can buy CDs, searching on the title and the
// artist. Their credit card payment is processed by an external provider. Record labels send batches of CDs to the warehouse. Keep a
// stock count of how many copies of each title are in the warehouse.
// Customers can leave reviews for CDs they’ve bought through the warehouse, which gives each title an integer rating from 1- 10 and the text of their review if they want to say more.

// Buy CDs
// Search by title
// Warehouse recieves CDs
// Customers can review

describe("CD Warehouse", () => {
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
      {
        title: "Greatest Hits",
        artist: "Michael Buble",
        stockCount: 13,
        id: 1,
      },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 2 },
    ]);

    assert.equal(26, getTotalCDCount());
  });

  it("Can search for a CD by artist where one exists", () => {
    const { searchCDsByArtist, recieve } = Warehouse();

    recieve([
      {
        title: "Greatest Hits",
        artist: "Michael Buble",
        stockCount: 13,
        id: 1,
      },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 2 },
    ]);

    assert.deepEqual(
      [
        {
          title: "Greatest Hits",
          artist: "Michael Buble",
          stockCount: 13,
          id: 1,
        },
      ],
      searchCDsByArtist("Michael Buble")
    );
  });

  it("Can search for a CD by artist where multiple exist", () => {
    const { searchCDsByArtist, recieve } = Warehouse();

    recieve([
      {
        title: "Greatest Hits",
        artist: "Michael Buble",
        stockCount: 13,
        id: 1,
      },
      {
        title: "Call me irresponsible",
        artist: "Michael Buble",
        stockCount: 13,
        id: 2,
      },
      { title: "Bat Out of Hell", artist: "Meat Loaf", stockCount: 13, id: 3 },
    ]);

    assert.deepEqual(
      [
        {
          title: "Greatest Hits",
          artist: "Michael Buble",
          stockCount: 13,
          id: 1,
        },
        {
          title: "Call me irresponsible",
          artist: "Michael Buble",
          stockCount: 13,
          id: 2,
        },
      ],
      searchCDsByArtist("Michael Buble")
    );
  });

  it("Can search for a CD by title", () => {
    const { searchCDsByTitle, recieve } = Warehouse();

    recieve([
      { title: "Toxicity", artist: "System of a Down", stockCount: 666, id: 4 },
    ]);

    assert.deepEqual(
      [
        {
          title: "Toxicity",
          artist: "System of a Down",
          stockCount: 666,
          id: 4,
        },
      ],
      searchCDsByTitle("Toxicity")
    );
  });

  it("Can buy a CD from the warehouse", () => {
    const { buy } = Storefront();
    const { decreaseCDStockLevelById, recieve } = Warehouse();

    recieve([
      { title: "Toxicity", artist: "System of a Down", stockCount: 666, id: 4 },
    ]);

    assert.deepEqual(
      { title: "Toxicity", artist: "System of a Down", stockCount: 665, id: 4 },
      buy(4, decreaseCDStockLevelById, () => true)
    );
  });

  it("Can Decrease CD Stock level by ID", () => {
    const { decreaseCDStockLevelById, recieve } = Warehouse();
    recieve([{ id: 10, stockCount: 10 }]);

    assert.deepEqual({ id: 10, stockCount: 9 }, decreaseCDStockLevelById(10));
  });

  it("Don't change stock level if payment fails", () => {
    const { buy } = Storefront();
    const { decreaseCDStockLevelById, recieve, findById } = Warehouse();

    recieve([{ id: 10, stockCount: 10 }]);

    function handlePayment() {
      return false;
    }

    assert.deepEqual(
      { id: 10, stockCount: 10 },
      buy(10, decreaseCDStockLevelById, handlePayment, findById)
    );
  });

  it("notifies chart on purchase", () => {
    const { buy } = Storefront();
    const { decreaseCDStockLevelById, recieve, findById } = Warehouse();

    let notifyChartsArgs = null;
    function notifyCharts(...args) {
      notifyChartsArgs = args
    }

    recieve([{ id: 11, artist: "Westlife", title: "Coast to Coast", stockCount: 10 }])

    buy(11, decreaseCDStockLevelById, () => true, findById, 1, notifyCharts)

    assert.deepEqual(
      [{artist: "Westlife", title:"Coast to Coast", copies: 1}],
      notifyChartsArgs
    )
  });

  it ("can buy multiple cds", () => {
    const { buy } = Storefront();
    const { decreaseCDStockLevelById, recieve, findById } = Warehouse();

    recieve([{ id: 10, stockCount: 10 }]);

    assert.deepEqual(
      {id: 10, stockCount: 8},
      buy(10, decreaseCDStockLevelById, () => true, findById, 2)
    )
  });

  it ("discounts albums in top 100", () => {
    const {getPrice} = Storefront();

    assert.deepEqual(9.00,
      getPrice({
        title: "Jagged Little Pill",
        artist: "Alanis Morissette",
        stockCount: 13,
        price: 11.00,
        id: 12,
      }, () => true, () => 10.00)
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
