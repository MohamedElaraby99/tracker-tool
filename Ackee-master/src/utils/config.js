'use static'

const { day } = require('./times')

// Must be a function or object that loads and returns the env variables at runtime.
// Otherwise it wouldn't be possible to mock the env variables with mockedEnv.
module.exports = new Proxy({}, {
	get: function (target, prop) {
		const data = {
			ttl: process.env.FIKRA_TTL || day,
			port: process.env.FIKRA_PORT || process.env.PORT || 3000,
			dbUrl: process.env.FIKRA_MONGODB || process.env.MONGODB_URI,
			allowOrigin: process.env.FIKRA_ALLOW_ORIGIN,
			autoOrigin: process.env.FIKRA_AUTO_ORIGIN === 'true',
			username: process.env.FIKRA_USERNAME,
			password: process.env.FIKRA_PASSWORD,
			isDemoMode: process.env.FIKRA_DEMO === 'true',
			isDevelopmentMode: process.env.NODE_ENV === 'development',
			isPreBuildMode: process.env.BUILD_ENV === 'pre',
		}

		return data[prop]
	},
})