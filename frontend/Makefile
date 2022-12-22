install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push railway main

start:
	make start-backend & make start-frontend
