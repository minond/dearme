import { config, application } from '../application';

const server = application(config);

server.get('/', (req, res) =>
    res.render('index'));

server.listen(3000, () =>
    console.log('ready'));
