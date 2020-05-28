
start:
	docker-compose down
	docker-compose up -d
	docker-compose exec -T php composer install

start-prod:
	docker-compose down
	docker-compose -f docker-compose-prod-images.yml down
	docker-compose -f docker-compose-prod-images.yml up -d
	docker-compose -f docker-compose-prod-images.yml exec -T php composer install

stop:
	docker-compose down
	docker-compose -f docker-compose-prod-images.yml down

status:
	docker-compose ps

followlogs:
	docker-compose logs -f

secrets:
	docker-compose exec -T php sh -c 'echo $$ADMIN_PASSWORD'
	docker-compose exec -T php sh -c 'echo $$YOUTUBE_API_KEY'
