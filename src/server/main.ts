import { configuration, application } from '../application';

const config = configuration();
const server = application(config);

server.get('/', (req, res) =>
    res.render('index'));

server.listen(3000, () =>
    console.log("ready"));
