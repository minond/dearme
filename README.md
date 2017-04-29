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
`config/` directory for additional configuration options (linkedin, embedly,
monitoring, etc.). additional services and service providers:

```bash
export TWILIO_ACCOUNT_SID=         # your twilio account id
export TWILIO_AUTH_TOKEN=          # your twilio account auth token
export TWILIO_SERVICE_SID=         # your twilio messaging service id
```

### building and test

run `make` to build everything. `make lint test` runs the linters and all
tests.
