# Variables
NPM = npm
DEV_MODE = dev
PROD_MODE = compile
TEST = test
DEBUG_DEV = dev:debug
DEBUG_TEST = test:debug
GENERATE-SWAGGER = generate-swagger
API_URL = http://localhost:8000/api/v1/examples

# Install dependencies
install:
	$(NPM) install

# Linting
lint:
	npx eslint . --fix

# Formating
format:
	npx prettier --write .

# Clean up node_modules and generated files
clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage

# Run in development mode
dev:
	$(NPM) run $(GENERATE-SWAGGER)
	npx nodemon server/index.ts | npx pino-pretty

# Generates Swagger
swagger:
	$(NPM) run $(GENERATE-SWAGGER)

# Run in production mode
prod:
	$(NPM) start

# Run tests
test:
	$(NPM) run $(TEST)

# Run tests in debug mode
test-debug:
	$(NPM) run $(DEBUG_TEST)

# Debug the server
debug:
	$(NPM) run $(DEBUG_DEV)

# Curl the example endpoint
try:
	curl $(API_URL)

# Help message
help:
	@echo "Makefile for estia backend"
	@echo ""
	@echo "Usage:"
	@echo "  make install         # Install dependencies"
	@echo "  make clean           # Remove node_modules and generated files"
	@echo "  make dev             # Run in development mode"
	@echo "  make prod            # Run in production mode"
	@echo "  make test            # Run tests"
	@echo "  make test-debug      # Run tests in debug mode"
	@echo "  make debug           # Debug the server"
	@echo "  make try             # Invoke the /examples endpoint"
	@echo "  make help            # Show this help message"

.PHONY: install clean dev prod test test-debug debug try help
