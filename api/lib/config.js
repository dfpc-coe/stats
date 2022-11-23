/**
 * @class
 */
export default class Config {
    static env(args = {}) {
        const config = new Config();

        config.silent = args.silent;

        try {
            if (!process.env.AWS_DEFAULT_REGION) {
                if (!config.silent) console.error('ok - set env AWS_DEFAULT_REGION: us-east-1');
                process.env.AWS_DEFAULT_REGION = 'us-east-1';
            }

            if (!process.env.StackName || process.env.StackName === 'test') {
                if (!config.silent) console.error('ok - set env StackName: test');
                process.env.StackName = 'test';

                config.StackName = 'test';
                config.SigningSecret = 'coe-wildland-fire';
                config.TileBaseURL = new URL('./data/zipcodes.tilebase', import.meta.url);
            } else {
                if (!process.env.StackName) throw new Error('StackName env must be set');
                if (!process.env.SigningSecret) throw new Error('SigningSecret env must be set');

                config.StackName = process.env.StackName;
                config.SigningSecret = process.env.SigningSecret;
                config.TileBaseURL = new URL(process.env.TileBaseURL) || new URL('./data/zipcodes.tilebase', import.meta.url);
            }
        } catch (err) {
            throw new Error(err);
        }

        return config;
    }
}
