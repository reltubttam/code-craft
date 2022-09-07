const assert = require('assert');
const {search} = require('./index')

describe.only('Stores able to search for locums', () => {
  it('finds no locums when none in vacinity', () => {
    // init data
    const job = {
      timeStart: new Date('2022-09-07T09:00:00Z'),
      timeEnd: new Date('2022-09-07T17:00:00Z'),
      role: 'lab technician',
      store: {
        name: "norwich",
        lat:	52.6293,
        lng:	1.2979,
      },
    };
    const locums = [];
    //create new job where:
    // GIVEN	a job in Perth
    // AND	where role is lab technician
    // AND	Store is in Perth
    // AND	date is 6 septemer 2022
    // AND	locums need to be familiar with Essilor, Rimless glasses
    // expecet no locums when searched
    const availableLocums = search(job, locums);
    assert.deepEqual(availableLocums, []);
  });
  
  it('finds no locums when none have required specialities', () => {
    const job = {
      timeStart: new Date('2022-09-07T09:00:00Z'),
      timeEnd: new Date('2022-09-07T17:00:00Z'),
      role: 'lab technician',
      store: {
        name: "norwich",
        lat:	52.6293,
        lng:	1.2979,
      },
      specialities: [
        { name: "Surfacing Glass Lenses" },
      ]
    }
    const locums = [{
      name: 'Bob',
      homeLat:	52.6293,
      homeLng:	1.2979,
      availRadiusMiles:	10,
      specialities: [
        { name: "Essilor equipment" },
        { name: "Rimless Glasses" },
      ]
    }];
    const availableLocums = search(job, locums)
    assert.deepEqual(availableLocums, [])


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
