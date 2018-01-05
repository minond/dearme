![dear me](https://raw.githubusercontent.com/minond/dearme/master/assets/images/dearme.png)

The easiest way to journal ever. We send a few texts a day. You answer. We add
your instagram photos. You have a journal.

### Messaging Rules

| 3 Groups | 2 Groups | 1 Group |
| -------- | -------- | ------- |
| 12:00 PM | 12:00 PM | 8:00 PM |
| 3:30 PM  | 8:00 PM  | -       |
| 8:00 PM  | -        | -       |


### Running and configuration

First, a little configuration is needed to tell the service where to save
messages and where the worker queues are. Configuration is retrieved using
[acm](https://www.npmjs.com/package/acm). See `config/` directory for
additional configuration options. required values:

```bash
export MONGO_URL=
export AMQP_URL=

export APP_USERNAME=               # some endpoint use basic-http authentication
export APP_PASSWORD=               # some endpoint use basic-http authentication

export KEY_COOKIE=                 # cookies encryption key
export KEY_SESSION=                # session encryption key
export KEY_MESSAGES=               # user response encryption key

export TWILIO_ACCOUNT_SID=         # your twilio account id
export TWILIO_AUTH_TOKEN=          # your twilio account auth token
export TWILIO_SERVICE_SID=         # your twilio messaging service id
```

Built code is checked in so now you can just run `make pm` or `make daemon` to
start the app.

### Building, running linters and tests

Run `make` to build everything. `make install` installs deps and `make lint
test` runs the linters and all tests.
