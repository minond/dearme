npm = npm
webpack = ./node_modules/.bin/webpack
tslint = ./node_modules/.bin/tslint
tsc = ./node_modules/.bin/tsc
pm2 = ./node_modules/.bin/pm2

dir_src = src
dir_dist = dist
dir_conf = config
dir_script = script

build: clean build-server build-client build-worker

install:
	$(npm) install

clean:
	-rm -r $(dir_dist)

lint:
	$(tslint) --config $(dir_conf)/tslint.json \
		$(dir_src)/*.ts \
		$(dir_src)/**/*.ts \
		$(dir_src)/**/*.tsx

watch-client:
	$(webpack) --config $(dir_conf)/webpack.js --watch

build-client:
	$(webpack) --config $(dir_conf)/webpack.js

build-server:
	$(tsc) @$(dir_conf)/tsconfig.txt \
		--outDir $(dir_dist) \
		$(dir_src)/declarations.d.ts \
		$(dir_src)/server/main.ts

build-worker:
	$(tsc) @$(dir_conf)/tsconfig.txt \
		--outDir $(dir_dist) \
		$(dir_src)/declarations.d.ts \
		$(dir_src)/worker/main.ts

worker:
	node dist/worker/main.js

pm:
	$(pm2) start config/processes.yml --no-daemon
