const assert = require('assert');

const Job = () => ({
  location: {
    lat: 56.395,
    lng: 3.4308,
  },
  search(locums, isInRange) {
    const availableLocums = locums.reduce((acc, locum) => {
      if (isInRange(this.location, locum.location)) acc.push(locum);
      return acc;
    }, []);

    return availableLocums;
  },
});
const Locum = () => ({});

describe('Stores able to search for locums', () => {
  it('finds no locums when none in vacinity', () => {
    // init data
    const job = Job();
    const bob = Locum();
    const locums = [bob];
    //create new job where:
    // GIVEN	a job in Perth
    // AND	where role is lab technician
    // AND	Store is in Perth
    // AND	date is 6 septemer 2022
    // AND	locums need to be familiar with Essilor, Rimless glasses
    // expecet no locums when searched
    const availableLocums = job.search(locums, () => false);
    assert.deepEqual(availableLocums, []);
  });

  it('finds no locums when none have required specialities', () => {
    // init data
    //create new job where:
    //     GIVEN	a job in London
    // AND	where role is lab technician
    // AND	Store is in London
    // AND	date is 6 septemer 2022
    // AND	locums need to be familiar with Essilor, Rimless glasses, Surfacing Glass Lenses, Customer Facing
    // expecet no locums when searched
  });

  it('finds one locum', () => {
    // init data
    //create new job where:
    //     GIVEN	a job in norwich store
    // AND	where role is lab technician
    // AND	Store is Norwich North
    // AND	date is 6 septemer 2022
    // AND	locums need to be familiar with Essilor, Rimless glasses
    // expecet to find bob when searched
  });

  it('finds many locums', () => {
    // init data
    //create new job where:
    // GIVEN	a job in Woodbridge
    // AND	where role is lab technician
    // AND	Store is Woodbridge
    // AND	date is 6 septemer 2022
    // AND	locums need to be familiar with Essilor, Rimless glasses
    // expecet to find bob and jane when searched
  });
});
