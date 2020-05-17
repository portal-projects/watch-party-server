
start:
	docker-compose down
	docker-compose up -d

start-prod:
	docker-compose down
	docker-compose -f docker-compose-prod-images.yml down
	docker-compose -f docker-compose-prod-images.yml up -d

stop:
	docker-compose down

status:
	docker-compose ps

followlogs:
	docker-compose logs -f

secrets:
	docker-compose exec -T php sh -c 'echo $$ADMIN_PASSWORD'
	docker-compose exec -T php sh -c 'echo $$YOUTUBE_API_KEY'
