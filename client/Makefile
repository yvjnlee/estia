.PHONY: install lint start clean

install:
	npm install

lint:
	npx eslint . --fix

format:
	npx prettier --write .

start:
	npm start

clean:
	rm -rf node_modules
	rm -f package-lock.json