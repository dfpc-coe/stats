import Err from '@openaddresses/batch-error';
import Total from '../lib/types/total.js';
import Field from '../lib/types/field.js';

export default async function router(schema, config) {
    await schema.post('/record', {
        name: 'Record Stats',
        group: 'Record',
        auth: 'user',
        description: 'The daily ETL process will push updates to this endpoint',
        body: 'req.body.Record.json',
        res: 'res.Standard.json'
    }, async (req, res) => {
        try {
            await Total.generate(config.pool, {
                count: req.body.count
            });
            delete req.body.count;

            for (const field in req.body) {
                await Field.generate(config.pool, {
                    dim: field,
                    stats: req.body[field]
                });
            }

            return res.json({
                status: 200,
                message: 'Recorded Stats'
            });
        } catch (err) {
            return Err.respond(err, res);
        }
    });
}
