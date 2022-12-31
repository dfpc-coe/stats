import cf from '@mapbox/cloudfriend';
import API from './lib/api.js';
import DB from './lib/db.js';
import KMS from './lib/kms.js';
import S3 from './lib/s3.js';
import Secret from './lib/signing.js';
import Lambda from './lib/lambda.js';
import alarms from '@openaddresses/batch-alarms';

export default cf.merge(
    API,
    S3,
    DB,
    KMS,
    Secret,
    Lambda,
    {
        Description: 'Template for @tak-ps/etl',
        Parameters: {
            GitSha: {
                Description: 'GitSha that is currently being deployed',
                Type: 'String'
            },
            AlarmEmail: {
                Type: 'String',
                Description: 'Email to send alarms to'
            },
            Username: {
                Type: 'String',
                Description: 'Temporary Username until LDAP lands'
            },
            Password: {
                Type: 'String',
                Description: 'Temporary Password until LDAP lands'
            },
            VPC: {
                Description: 'VPC ID to deploy into',
                Type: 'String'
            },
            SubnetPublicA: {
                Description: 'VPC SubnetPublicA to deploy into',
                Type: 'String'
            },
            SubnetPublicB: {
                Description: 'VPC SubnetPublicB to deploy into',
                Type: 'String'
            },
            SubnetPrivateA: {
                Description: 'VPC SubnetPrivateA to deploy into',
                Type: 'String'
            },
            SubnetPrivateB: {
                Description: 'VPC SubnetPrivateB to deploy into',
                Type: 'String'
            }
        }
    },
    alarms({
        prefix: 'Batch',
        email: cf.ref('AlarmEmail'),
        apache: cf.stackName,
        cluster: cf.ref('ECSCluster'),
        service: cf.getAtt('Service', 'Name'),
        loadbalancer: cf.getAtt('ELB', 'LoadBalancerFullName'),
        targetgroup: cf.getAtt('TargetGroup', 'TargetGroupFullName')

    })
);
