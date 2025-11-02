.PHONY: help install dev dev-backend dev-frontend build setup clean

help: ## Показать помощь
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm install
	cd frontend && npm install

setup: ## Первоначальная настройка проекта
	./scripts/setup.sh

dev: ## Запустить весь проект
	npm run dev

dev-backend: ## Запустить только backend
	cd backend && ./pocketbase serve

dev-frontend: ## Запустить только frontend
	cd frontend && npm run dev

build: ## Собрать frontend
	cd frontend && npm run build

clean: ## Очистить зависимости и сборки
	rm -rf node_modules frontend/node_modules
	rm -rf frontend/.next
	rm -rf frontend/dist

download-pb: ## Скачать Pocketbase
	cd backend/scripts && ./download-pocketbase.sh

.DEFAULT_GOAL := help

