IMAGE=raspberry/sensors
VERSION=$(shell sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json)

build: ## Build DockerImage
	docker build -t $(IMAGE):v$(VERSION) .

run: ## Run DockerContainer
	docker-compose up -d

logs: ## Logs DockerContainer
	docker-compose logs -f