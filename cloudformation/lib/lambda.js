import cf from '@mapbox/cloudfriend';

export default {
    Resources: {
        ETLFunction: {
            Type: 'AWS::Lambda::Function',
            Properties: {
                FunctionName: cf.join('-', [cf.stackName, 'etl']),
                KmsKeyArn: cf.getAtt('KMS', 'Arn'),
                MemorySize: 128,
                Timeout: 60,
                Description: 'Scrape LDAP for user stats',
                PackageType: 'Image',
                Image: cf.join([cf.accountId, '.dkr.ecr.', cf.region, '.amazonaws.com/coe-ecr-stats:etl-', cf.ref('GitSha')]),
                VpcConfig: {
                    SubnetIds: [
                        cf.ref('SubnetPublicA'),
                        cf.ref('SubnetPublicB'),
                    ]
                }
            }
        }
    }
};
