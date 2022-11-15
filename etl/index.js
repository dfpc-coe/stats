import fetcher from './lib/fetch.js';
import csv from 'csv-parser';
import { Writable } from 'stream';
import { pipeline } from 'node:stream/promises';
import fs from 'fs';

const SERVER = process.env.server || 'https://auth.cotak.gov/';
const USERNAME = process.env.LDAP_USERNAME;
const PASSWORD = process.env.LDAP_PASSWORD;

const csvpath = await fetcher(SERVER, USERNAME, PASSWORD);
//const csvpath = new URL('/tmp/ldap.csv', 'file://');

const stats = {
    count: 0,
    businesscategory: {},
    departmentnumber: {},
    postalcode: {}
};

const types = ['businesscategory', 'departmentnumber', 'postalcode'];

fs.createReadStream(csvpath.pathname)
    .pipe(csv({ columns: true, skip_empty_lines: true, delimiter: ',' }))
    .on('data', (data) => {
        ++stats.count;

        for (const type of types) {
            if (!stats[type][data[type]]) stats[type][data[type]] = 0;
            ++stats[type][data[type]];
        }
    })
    .on('end', () => {
        for (const type of types) {
            stats[type]['uncategorized'] = stats[type][''] || 0;
            delete stats[type][''];
        }

        console.error(stats);
    });

