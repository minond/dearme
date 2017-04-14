// import { send } from '../device/sms';
import { user } from '../repository/user';

// send('+11231231234', 'i love your podcast');
setTimeout(() => {
user.save({ phone: '123', handle: 'hi' })
  .then(console.log.bind(console))
  .catch(console.log.bind(console));
}, 1000);
