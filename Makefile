NODE_PATH := $(shell command -v node 2> /dev/null)

run:
	sudo $(NODE_PATH) ./index.js

.PHONY: run
