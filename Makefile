.PHONY := all clean

all: check

build: src/*.ts
	pnpm tsc -b

check: src/*.ts
	pnpm tsc


watch:
	pnpm tsc --watch

clean:
	rm -rf ./public
