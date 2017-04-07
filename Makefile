npm = npm

browserify = ./node_modules/.bin/browserify
tslint = ./node_modules/.bin/tslint
tsc = ./node_modules/.bin/tsc \
	--module commonjs \
	--removeComments \
	--noUnusedLocals \
	--moduleResolution node \
	--noImplicitAny \
	--noImplicitThis \
	--noImplicitReturns \
	--alwaysStrict \
	--forceConsistentCasingInFileNames \
	--experimentalDecorators \
	--strictNullChecks \
	--pretty \

dir_src = src
dir_dist = dist
dir_conf = config
dir_script = script

build: clean build-server build-client

install:
	$(npm) install

clean:
	-rm -r $(dir_dist)

lint:
	$(tslint) --config $(dir_conf)/tslint.json $(dir_src)/*.ts

build-client:
	-mkdir -p dist/client
	$(tsc) \
		--outDir $(dir_dist)/client \
		--jsx react \
		$(dir_src)/client/main.tsx
	$(browserify) \
		$(dir_dist)/client/main.js \
		--full-paths > $(dir_dist)/client/bundle.js

build-server:
	$(tsc) \
		--outDir $(dir_dist) \
		$(dir_src)/declarations.d.ts \
		$(dir_src)/server/main.ts
