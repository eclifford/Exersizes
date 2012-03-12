# I would have liked to use mocha directly, using a Makefile
# like:
# https://github.com/visionmedia/mocha/blob/master/Makefile
# but I needed a custom test command (see bin/test) to support
# using requirejs in both browser and node.
REPORTER ?= dot
UNITTESTS ?= $(shell find test/unit -name "*.coffee" -type f)
DEBUG ?=

build:
	@/usr/bin/env npm \
		install

test: test-unit

test-unit:
	@/usr/bin/env node \
		$(DEBUG) \
		./bin/test

test-xunit:
	@/usr/bin/env node \
		./bin/test \
		--xunit

watch: watch-unit-ubuntu

watch-unit-ubuntu:
	@./bin/ubuntu-autotest.py

run:
	@./node_modules/serve/bin/serve .

.PHONY: run test test-unit watch watch-unit
