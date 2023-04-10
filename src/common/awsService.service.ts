import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
require("dotenv").config();

const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET

const storage = new S3({
    region,
    accessKey,
    secretAccessKey,
})
storage.config.update({
  region: region,
  apiVersion: 'latest',
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
    
  }
})
@Injectable()
export class AwsService {

    async getBucket(files) {
       return this.getImageFromBucket('ad7e972d-9abb-4d40-98f5-630c4e6dc7f8','images')
       //return this.deleteImage('gatito.jpg','banners')
        //return this.getImageFromBucket('logos','dcfe2519-05a8-4972-a318-14588c3f98a22')
      //return this.uploadImage('dcfe2519-05a8-4972-a318-14588c3f98a2','logos',files)
    }
    async getImageFromBucket(nombre,carpeta){
        let key = carpeta + '/' + nombre
        let respuesta = await this.getObject(nombre,carpeta);
        if (!respuesta.ContentType){
            throw new NotFoundException(`Image with id ${nombre} not exist.`)
        }
        else {

        const signedUrlExpireSeconds = 60 * 10

        const url = storage.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: key,
            Expires: signedUrlExpireSeconds
        })

        return url
        }
        
        
    }
    async getObject(nombre,carpeta){
        let key = carpeta + '/' + nombre
        const params = {
            Bucket:bucket,
            Key:key,
        }
        try {
            let result = await storage.getObject(params).promise()
            return result
        } catch (error) {
           return {
            code:0,
            error:error.message
           }
        }
    }
    async uploadImage (nombre,carpeta,file,type?){
        let key = carpeta + '/' + nombre
       // const stream = fs.createReadStream(file.tempFilePath);
       let base64data = Buffer.from(file.buffer, 'utf8')
       let params
        if (!type) {
         params = {
            Bucket:bucket,
            Key:key,
            Body:base64data,
            ContentType:"image/jpeg"
        }
        }
        else{
             params = {
            Bucket:bucket,
            Key:key,
            Body:base64data,
            ContentType:type
        }
        }
       await storage.putObject(params).promise();

       return nombre;
        
    }

    async deleteImage (carpeta,nombre){
        let key = carpeta + '/' + nombre
        const params = {
            Bucket:bucket,
            Key:key,
        }
        return await storage.deleteObject(params).promise();
        
    }

   
}