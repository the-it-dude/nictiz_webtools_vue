SERVER ?= http://localhost:9123
CORS_DEBUG ?= 1

serve:
	cd node && CORS_DEBUG=${CORS_DEBUG} CHOKIDAR_USEPOLLING=true npm run serve --port=9123

install:
	cd node && npm i
