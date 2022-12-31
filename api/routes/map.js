import Err from '@openaddresses/batch-error';
import Auth from '../lib/auth.js';

export default async function router(schema, config) {
    await schema.get('/zipcodes', {
        name: 'TileJSON',
        group: 'Zipcodes',
        auth: 'public',
        description: 'Retrieve TileJSON for zipcode MVTs',
        res: 'res.TileJSON.json'
    }, async (req, res) => {
        try {
            await Auth.is_auth(req);

            if (!config.tb.isopen) throw new Err(400, null, 'Map Backend has not initiated');

            return res.json(config.tb.tilejson());
        } catch (err) {
            return Err.respond(err, res);
        }
    });

    await schema.get('/zipcodes/:z/:x/:y', {
        name: 'Get Tile',
        group: 'Zipcodes',
        auth: 'public',
        description: 'Get MVT for a given tile',
        ':z': 'integer',
        ':x': 'integer',
        ':y': 'integer'
    }, async (req, res) => {
        try {
            await Auth.is_auth(req);

            if (!config.tb.isopen) throw new Err(400, null, 'Map Backend has not initiated');

            const encodings = req.headers['accept-encoding'].split(',').map((e) => e.trim());
            if (!encodings.includes('gzip')) throw new Err(400, null, 'Accept-Encoding must include gzip');

            const tile = await config.tb.tile(req.params.z, req.params.x, req.params.y);

            res.writeHead(200, {
                'Content-Type': 'application/vnd.mapbox-vector-tile',
                'Content-Encoding': 'gzip',
                'cache-control': 'no-transform'
            });
            res.end(tile);
        } catch (err) {
            return Err.respond(err, res);
        }

    });
}
