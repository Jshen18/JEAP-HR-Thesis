import { config } from 'dotenv';
import { Promise } from 'bluebird';
// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';

config();
// Set the region and configure AWS

AWS.config.update({
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

// Create an SQS service object, {apiVersion: '2012-11-05'}
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
//  Create SNS service object

const params = {
  DelaySeconds: 10,
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'The Whistler',
    },
    Author: {
      DataType: 'String',
      StringValue: 'John Grisham',
    },
    WeeksOn: {
      DataType: 'Number',
      StringValue: '6',
    },
  },
  MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  QueueUrl: process.env.SQS_MYQUEUE_URL,
};

sqs.sendMessage(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.MessageId);
  }
});

// const sns = new AWS.SNS();

// app.get('/create', function(req, res) {
//   const params = {
//     QueryName: 'first Queue'
//   };
//   sqs.createQueue(params, function(err, data) {
//     if(!err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   })
// });

// app.get('/send', function(req, res) {
//   const params = {
//     MessageBody = 'Hello World',
//     QueueUrl = queryUrl,
//     DelaySeconds = 0
//   }
//   sqs.sendMessage(params, function(err, data) {
//     if(!err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   })
// });

// app.get('receive', function(req, res) {
//   const params = {
//     QueueUrl = QueueUrl,
//     VisibilityTimeout: 600
//   };
//   sqs.receiveMessage(params, function(err, data) {
//     if(!err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   })
// })
