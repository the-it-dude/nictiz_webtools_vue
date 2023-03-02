SERVER ?= http://localhost:8000
CORS_DEBUG ?= 1

serve:
	cd node && SERVER=${SERVER} CORS_DEBUG=${CORS_DEBUG} CHOKIDAR_USEPOLLING=true npm run serve
