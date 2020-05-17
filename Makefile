
start:
	docker-compose down
	docker-compose up -d

stop:
	docker-compose down

status:
	docker-compose ps

followlogs:
	docker-compose logs -f
