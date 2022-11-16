import fs from 'fs';
import test from 'tape';
import assert from 'assert';
import Flight from './flight.js';

const flight = new Flight();

flight.init(test);
flight.takeoff(test);

test('POST: api/record - no auth', async () => {
    try {
        const res = await flight.fetch('/api/record', {
            method: 'POST',
            body: {
                count: 50,
                businesscategory: {
                    'SAR': 15,
                    uncategorized: 35
                },
                o: {
                    'Mesa SAR': 43,
                    uncategorized: 7
                },
                ou: {
                    'Ground Team': 5,
                    uncategorized: 45
                },
                title: {
                    tech: 4,
                    ground: 4,
                    uncategorized: 42
                }
            }
        }, false);

        assert.equal(res.status, 401, 'http: 401');
        assert.deepEqual(res.body, {
            status: 401,
            message: 'Unauthorized',
            messages: []
        });
    } catch (err) {
        assert.ifError(err, 'no error');
    }
});

test('POST: api/record - success', async () => {
    try {
        const res = await flight.fetch('/api/record', {
            method: 'POST',
            headers: {
                authorization: `bearer coe-wildland-fire`
            },
            body: {
                count: 50,
                businesscategory: {
                    'SAR': 15,
                    uncategorized: 35
                },
                o: {
                    'Mesa SAR': 43,
                    uncategorized: 7
                },
                ou: {
                    'Ground Team': 5,
                    uncategorized: 45
                },
                title: {
                    tech: 4,
                    ground: 4,
                    uncategorized: 42
                }
            }
        }, true);

        assert.deepEqual(res.body, {
            status: 200,
            message: 'Unauthorized'
        })
    } catch (err) {
        assert.ifError(err, 'no error');
    }
});

flight.landing(test);
