import Err from '@openaddresses/batch-error';
import Total from '../lib/types/total.js';

export default async function router(schema, config) {
    await schema.get('/total', {
        name: 'Get Totals',
        group: 'Total',
        auth: 'public',
        description: 'Retrieve total users across time',
        res: 'res.ListTotal.json'
    }, async (req, res) => {
        try {
            const list = await Total.list(config.pool);
            return res.json(list);
        } catch (err) {
            return Err.respond(err, res);
        }
    });
}
