import { config } from 'dotenv';
import { Promise } from 'bluebird';
// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
import Consumer from 'sqs-consumer';

config();

// Set the region and configure AWS
AWS.config.update({
  region: 'us-west-1',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
});

// const app = Consumer.create({
//   queueUrl: process.env.SQS_MYQUEUE_URL, //  some queue url, idk what yet
// handleMessage: (message, done) => {
//     // do some work with `message` that's coming in from reservations
//     done();
//   },
//   sqs: new AWS.SQS({ apiVersion: '2012-11-05' }),
// });


// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

//  Send reservations params
const reservationParams = {
  DelaySeconds: 10,
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'Yay reservation params',
    },
  },
  MessageBody: 'test message, reservations SQS',
  QueueUrl: process.env.SQS_RESERVATIONSQUEUE_URL,
};

sqs.sendReservations = (message) => {
  const reservationMessage = Object.assign({}, reservationParams);
  reservationMessage.MessageBody = message;
  sqs.sendMessage(reservationMessage, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};


const clientFacingParams = {
  DelaySeconds: 10,
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'Yay client params',
    },
  },
  MessageBody: 'test message, client SQS',
  QueueUrl: process.env.SQS_CLIENTQUEUE_URL,
};

sqs.sendClient = (message) => {
  const clientMessage = Object.assign({}, clientFacingParams);
  clientMessage.MessageBody = message;
  sqs.sendMessage(clientMessage, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
}

export default sqs;

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
