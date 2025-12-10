# Options

The following environment variables are used by FikraTracker. You can also create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

- [Database](#database)
- [Port](#port)
- [Username and password](#username-and-password)
- [TTL](#ttl)
- [Tracker](#tracker)
- [Environment](#environment)

## Database

MongoDB connection URI. See the [MongoDB connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more detail.

```
FIKRA_MONGODB=mongodb://localhost:27017/fikratracker
```

*or*

```
MONGODB_URI=mongodb://localhost:27017/fikratracker
```

## Port

The port FikraTracker should listen on. Defaults to `3000`.

```
FIKRA_PORT=3000
```

*or*

```
PORT=3000
```

## Username and password

Username and password. Both are required to generate a new token.

```
FIKRA_USERNAME=username
FIKRA_PASSWORD=password
```

## TTL

Specifies how long a generated token is valid. Defaults to `3600000` (1 day).

```
FIKRA_TTL=3600000
```

## Tracker

Pick a custom name for the tracking script of FikraTracker to avoid getting blocked by browser extensions. The default script will always be available via `/tracker.js`. You custom script will be available via `/custom%20name.js`. FikraTracker will encode your custom name to a URL encoded format. Avoid characters that can't be used in filenames.

Make sure to adjust the tracking script URL on your sites when changing this option. Sites that are using the default URL won't be affected.

```
FIKRA_TRACKER=custom name
```

## Environment

Set the environment to `development` to see additional details in the console and to disable caching.

```
NODE_ENV=development
```

## CORS headers

Quick solution for setting [CORS headers](CORS%20headers.md) instead of using a [reverse proxy](SSL%20and%20HTTPS.md). This is helpful if you are running FikraTracker on a platform that handles SSL for you.

```
FIKRA_ALLOW_ORIGIN=https://example.com
```

*or*

```
FIKRA_ALLOW_ORIGIN=https://example.com,https://one.example.com,https://two.example.com
```

Setting a wildcard (`*`) is also supported, but not recommended. It's neither a secure solution nor does it allow FikraTracker to ignore your own visits. Please disable the `ignoreOwnVisits` option in fikra-tracker if using a wildcard is the only option for you.

```
FIKRA_ALLOW_ORIGIN=*
```

As opposed to manually configuring CORS domains, you can also automatically add CORS Headers for domains in the domain list that have [fully qualified domain names](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) as titles. To achieve this, set:

```
FIKRA_AUTO_ORIGIN=true
```