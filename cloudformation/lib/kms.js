import cf from '@openaddresses/cloudfriend';

export default {
    Resources: {
        KMS: {
            Type : 'AWS::KMS::Key',
            Properties: {
                Description: cf.stackName,
                Enabled: true,
                EnableKeyRotation: false,
                KeyPolicy: {
                    Id: cf.stackName,
                    Statement: [{
                        Effect: 'Allow',
                        Principal: { AWS: cf.accountId },
                        Action: ['kms:*'],
                        Resource: '*'
                    }]
                }
            }
        }
    }
};
