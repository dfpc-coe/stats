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
                Role: cf.getAtt('ETLFunctionRole', 'Arn'),
                Code: {
                    ImageUri: cf.join([cf.accountId, '.dkr.ecr.', cf.region, '.amazonaws.com/coe-ecr-stats:etl-', cf.ref('GitSha')]),
                }
            }
        },
        ETLFunctionRole: {
            Type: 'AWS::IAM::Role',
            Properties: {
                RoleName: cf.join([cf.stackName, '-lambda-role']),
                AssumeRolePolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [{
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        },
                        Action: 'sts:AssumeRole'
                    }]
                },
                Path: '/',
                Policies: []
            }
        }
    }
};
