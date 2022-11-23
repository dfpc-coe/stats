import Err from '@openaddresses/batch-error';
import TileBase from 'tilebase'

export default async function router(schema, config) {
    await schema.get('/states', {
        name: 'TileJSON',
        group: 'States',
        auth: 'public',
        description: 'Retrieve TileJSON for States MVTs',
        res: 'res.TileJSON.json'
    }, async (req, res) => {
        try {
            return res.json({});
        } catch (err) {
            return Err.respond(err, res);
        }
    });

    await schema.get('/states/:z/:x/:y', {
        name: 'Get Tile',
        group: 'States',
        auth: 'public',
        description: 'Get MVT for a given tile',
        ':z': 'integer',
        ':x': 'integer',
        ':y': 'integer'
    }, async (req, res) => {
        try {
            return res.json({});
        } catch (err) {
            return Err.respond(err, res);
        }
    });
}
