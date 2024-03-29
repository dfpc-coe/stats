import cf from '@openaddresses/cloudfriend';

export default {
    Resources: {
        TileBaseS3: {
            Type: 'AWS::S3::Bucket',
            Properties: {
                BucketName: cf.join('-', [cf.stackName, cf.accountId, cf.region])
            }
        }
    }
};
