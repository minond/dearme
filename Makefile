npm = npm
node = node
webpack = ./node_modules/.bin/webpack
tslint = ./node_modules/.bin/tslint
tsc = ./node_modules/.bin/tsc
pm2 = ./node_modules/.bin/pm2

dir_src = src
dir_dist = dist
dir_conf = config
dir_script = script

opt_webpack_config = --config $(dir_conf)/webpack.js
opt_tsc_config= @$(dir_conf)/tsconfig.txt

opt_tsc_worker = --outDir $(dir_dist) \
	$(dir_src)/declarations.d.ts \
	$(dir_src)/worker/main.ts

opt_tsc_server = --outDir $(dir_dist) \
	$(dir_src)/declarations.d.ts \
	$(dir_src)/server/main.ts

build: clean build-server build-worker build-client

install:
	@$(npm) install

clean:
	-rm -r $(dir_dist)

lint:
	$(tslint) --config $(dir_conf)/tslint.json \
		$(dir_src)/*.ts \
		$(dir_src)/**/*.ts \
		$(dir_src)/**/*.tsx

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

worker:
	$(node) $(dir_dist)/worker/main.js

server:
	$(node) $(dir_dist)/server/main.js

pm:
	$(pm2) start config/processes.yml --no-daemon
