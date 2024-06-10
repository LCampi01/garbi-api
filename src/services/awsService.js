const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

class AwsService {
    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        this.types = {
            xml: 'text/xml',
            tmx: 'text/xml',
            xlf: 'text/xml',
            xliff: 'text/xml',
            zip: 'application/zip',
            json: 'application/json'
        };
    }

    async uploadDocument(fileName, content, type, folder = null) {
        try{
            await this.s3Client.send(new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: folder ? `${folder}/${fileName}.${type}` : `${fileName}.${type}`,
                Body: content,
                ContentType: this.types[type]
            }));
        } catch(err) {
            throw new Error(err);
        }
    }

    async getSignedUrl(fileName, type) {
        try {
            return await getSignedUrl(this.s3Client, new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: `${fileName}.${type}`,
                ResponseContentDisposition: 'attachment'
            }), { expiresIn: 604800 });

        } catch(err) {
            throw new Error(err);
        }

    }

    getDocumentUrl(fileName, type, folder = null) {
        try {
            const bucketName = process.env.AWS_BUCKET;
            const url = folder ?
                `https://${bucketName}.s3.amazonaws.com/${folder}/${fileName}.${type}` : `https://${bucketName}.s3.amazonaws.com/${fileName}.${type}`;
            return url;
        } catch(err) {
            throw new Error(err);
        }
    }

    async downloadDocument(fileName, type, folder = null) {
        try {
            const { Body } = await this.s3Client.send(new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: folder ? `${folder}/${fileName}.${type}` : `${fileName}.${type}`
            }));
            if(type === 'zip' || type === 'jpg' || type === 'jpeg' || type === 'png') {
                return Body.transformToByteArray();
            } else
                return await Body.transformToString();

        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteDocument(fileName, type) {
        try {
            await this.s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: `${fileName}.${type}`
            }));
        } catch (err) {
            throw new Error(err);
        }
    }

    async getSecretFromSecretManager(secretName) {
        try {
            const client = new SecretsManagerClient({
                region: process.env.AWS_REGION
            });

            const response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secretName,
                    VersionStage: 'AWSCURRENT' // VersionStage defaults to AWSCURRENT if unspecified
                })
            );
            const jsonReponse = JSON.parse(response.SecretString);
            return jsonReponse;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new AwsService();
