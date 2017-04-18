npm = npm
node = node
webpack = ./node_modules/.bin/webpack
tslint = ./node_modules/.bin/tslint
tsc = ./node_modules/.bin/tsc
pm2 = ./node_modules/.bin/pm2
tape = ./node_modules/.bin/tape

dir_src = src
dir_dist = dist
dir_conf = config
dir_script = script
dir_test = test

opt_webpack_config = --config $(dir_conf)/webpack.js
opt_tsc_config = @$(dir_conf)/tsconfig.txt

opt_tsc_worker = --outDir $(dir_dist) \
	$(dir_src)/declarations.d.ts \
	$(dir_src)/worker/main.ts

opt_tsc_server = --outDir $(dir_dist) \
	$(dir_src)/declarations.d.ts \
	$(dir_src)/server/main.ts

opt_tsc_client_tests = --jsx react \
	--outDir $(dir_dist)/tests_build \
	$(dir_src)/declarations.d.ts \
	$(dir_test)/src/client/*.tsx \
	$(dir_test)/src/client/*.ts

build: clean build-server build-worker build-test build-client

install:
	@$(npm) install

clean:
	-rm -r $(dir_dist)

.PHONY: test
test:
	$(tape) dist/tests_build/test/src/client/*.js

lint:
	$(tslint) --config $(dir_conf)/tslint.json \
		$(dir_src)/*.ts \
		$(dir_src)/**/*.ts \
		$(dir_src)/**/*.tsx \
		$(dir_test)/*.ts \
		$(dir_test)/**/*.ts \
		$(dir_test)/**/*.tsx

watch-client:
	$(webpack) $(opt_webpack_config) --watch

build-client:
	$(webpack) $(opt_webpack_config)

watch-server:
	$(tsc) $(opt_tsc_config) $(opt_tsc_server) --watch

build-server:
	$(tsc) $(opt_tsc_config) $(opt_tsc_server)

watch-worker:
	$(tsc) $(opt_tsc_config) $(opt_tsc_worker) --watch

build-worker:
	$(tsc) $(opt_tsc_config) $(opt_tsc_worker)

watch-test:
	$(tsc) $(opt_tsc_config) $(opt_tsc_client_tests) --watch

build-test:
	$(tsc) $(opt_tsc_config) $(opt_tsc_client_tests)

worker:
	$(node) $(dir_dist)/worker/main.js

server:
	$(node) $(dir_dist)/server/main.js

pm:
	$(pm2) start config/processes.yml --no-daemon
