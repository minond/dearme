![dear me](https://raw.githubusercontent.com/minond/dearme/master/assets/images/dearme.png)

the easiest way to journal ever. we send a few texts a day. you answer. we add
your instagram photos. you have a journal.

### messaging rules

Three text groups go out at:
- 12:00 PM
- 3:30 PM
- 8:00 PM

If there are only two groups send them at:
- 12:00 PM
- 8:00 PM

If there is only one group send it at:
- 8:00 PM

### running the app

```bash
make install
make pm
```

### configuration

configuration is retrieved using [acm](https://www.npmjs.com/package/acm). see
`config/` directory for additional configuration options. required values:

```bash
export MONGO_URL=
export AMQP_URL=

APP_USERNAME=                      # some endpoint use basic-http authentication
APP_PASSWORD=                      # some endpoint use basic-http authentication

export KEY_COOKIE=                 # cookies encryption key
export KEY_SESSION=                # session encryption key
export KEY_MESSAGES=               # user response encryption key

export TWILIO_ACCOUNT_SID=         # your twilio account id
export TWILIO_AUTH_TOKEN=          # your twilio account auth token
export TWILIO_SERVICE_SID=         # your twilio messaging service id
```

### building, running linters and tests

run `make` to build everything. `make lint test` runs the linters and all
tests.
