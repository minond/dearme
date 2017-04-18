// import { send } from '../device/sms';
// import { user } from '../repository/user';
// import { queue, connecting } from '../device/amqp';
// import { Channel, channel } from '../device/amqp';

// connecting.then((conn) =>
//     conn.createChannel().then((chan) =>
//         chan.assertQueue('texts_to_send').then(() =>
//             chan.sendToQueue('texts_to_send', new Buffer('hi')))));
//
// queue('texts_to_send').then((send) => {
// });

// channel.then((chan) =>
//     chan.assertQueue('texts_to_send').then(() =>
//         chan.sendToQueue('texts_to_send', new Buffer('hi'))));

// channel.then((chan) => {
//     console.log(chan);
// });

// channel
//     .then((chan: Channel) => chan.assertQueue('texsts_to_send'))
//     .then((ok: boolean) => console.log(ok));

// channel.then(

// send('+11231231234', 'i love your podcast');
// setTimeout(() => {
// user.save({ phone: '123', handle: 'hi' })
//   .then(console.log.bind(console))
//   .catch(console.log.bind(console));
// }, 1000);
