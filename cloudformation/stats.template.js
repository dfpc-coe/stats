import cf from '@mapbox/cloudfriend';
import API from './lib/api.js';
import DB from './lib/db.js';
import KMS from './lib/kms.js';

export default cf.merge(
    API,
    DB,
    KMS,
    {
        Description: 'Template for @tak-ps/etl',
        Parameters: {
            GitSha: {
                Description: 'GitSha that is currently being deployed',
                Type: 'String'
            },
            VPC: {
                Description: 'VPC ID to deploy into',
                Type: 'String'
            },
            SubnetA: {
                Description: 'VPC SubnetA to deploy into',
                Type: 'String'
            },
            SubnetB: {
                Description: 'VPC SubnetB to deploy into',
                Type: 'String'
            }
        }
    }
);
