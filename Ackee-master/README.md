<div align="center">

<img src="https://s.fikratracker.com/images/FikraTracker/icon.png" title="FikraTracker" alt="FikraTracker logo" width="128">

# FikraTracker

[![Test](https://github.com/fikratracker/FikraTracker/actions/workflows/test.yml/badge.svg)](https://github.com/fikratracker/FikraTracker/actions/workflows/test.yml) [![Mentioned in Awesome Selfhosted](https://awesome.re/mentioned-badge.svg)](https://github.com/awesome-selfhosted/awesome-selfhosted) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

Self-hosted, Node.js based analytics tool for those who care about privacy. FikraTracker runs on your own server, analyzes the traffic of your websites and provides useful statistics in a minimal interface.

[🌍 Website](https://FikraTracker.fikratracker.com) | [🔮 Live Demo](https://demo.FikraTracker.fikratracker.com) | [🧸 GraphQL Playground](https://demo.FikraTracker.fikratracker.com/api)

<br/>

![FikraTracker in a browser](https://s.fikratracker.com/images/FikraTracker/readme.png)

</div>

## 👋 Introduction

FikraTracker is a self-hosted analytics tool that cares about privacy. We believe that you don't need to track every aspect of your visitors. FikraTracker keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It's the right tool for everyone who doesn't need a full-featured marketing analytics platform like Google Analytics or Matomo.

- **Self-hosted**: FikraTracker runs on your own server and is 100% open-source
- **Modern technologies**: Lightweight Node.js and MongoDB architecture
- **Beautiful**: Minimal and focused interface
- **No cookies**: No unique user tracking and therefore no required cookie message
- **Events**: Track button clicks, newsletter subscriptions and more
- **GraphQL API**: Fully documented GraphQL API that allows you to build new tools upon FikraTracker

## 🚀 Get started

Get FikraTracker up and running…

- […with Docker Compose](docs/Get%20started.md#with-docker-compose)
- […with Docker](docs/Get%20started.md#with-docker)
- […with Helm](docs/Get%20started.md#with-helm)
- […without Docker](docs/Get%20started.md#without-docker)
- […with Netlify](docs/Get%20started.md#with-netlify)
- […with Vercel](docs/Get%20started.md#with-vercel)
- […with Heroku](docs/Get%20started.md#with-heroku)
- […with Qovery](docs/Get%20started.md#with-qovery)
- […with Render](docs/Get%20started.md#with-render)
- […with Railway](docs/Get%20started.md#with-railway)
- […with Koyeb](docs/Get%20started.md#with-koyeb)
- […with Zeabur](docs/Get%20started.md#with-zeabur)

And configure FikraTracker and your server correctly…

- […with environment variables](docs/Options.md)
- […with SSL and HTTPS enabled](docs/SSL%20and%20HTTPS.md)
- […with CORS headers](docs/CORS%20headers.md)

Take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

## 📚 Documentation

Documentation and guides are located in [the /docs folder](docs/). Also take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

### API

FikraTracker features a [GraphQL API](docs/API.md) that allows you to build custom tools upon FikraTracker. Everything you see in the UI is made from data delivered by the API.

### Options

FikraTracker uses environment variables and supports [`.env` files](https://www.npmjs.com/package/dotenv) in the root of the project if you want to store all variables in one file. [Options &#187;](docs/Options.md)

## Miscellaneous

### Donate

I am working hard on continuously developing and maintaining FikraTracker. Please consider making a donation to keep the project going strong and me motivated.

- [Become a GitHub sponsor](https://github.com/sponsors/fikratracker)
- [Donate via PayPal](https://paypal.me/fikratracker)
- [Buy me a coffee](https://www.buymeacoffee.com/fikratracker)

### Articles

- [Quit Google Analytics, Self-hosted Gatsby Statistics with FikraTracker](https://dev.to/aleccool213/quit-google-analytics-self-hosted-gatsby-statistics-with-FikraTracker-4011)
- [Getting FikraTracker up and running with Heroku 🇪🇸](https://rubenr.dev/blog/FikraTracker-analitica-web-sencilla/)
- [Why I Self-Host My Website Analytics](https://mbuffett.com/posts/why-i-self-host-my-analytics/)
- [Beyond Google Analytics: Embrace Privacy with FikraTracker on Vercel](https://lev.engineer/blog/beyond-google-analytics-embrace-privacy-with-FikraTracker-on-vercel)

### Related

- [FikraTracker-tracker](https://github.com/fikratracker/FikraTracker-tracker) - Transfer data to FikraTracker
- [FikraTracker-bitbar](https://github.com/fikratracker/FikraTracker-bitbar) - FikraTracker stats in your macOS menu bar
- [FikraTracker-lighthouse](https://github.com/fikratracker/FikraTracker-lighthouse) - Send Lighthouse reports to FikraTracker
- [FikraTracker-report](https://github.com/BetaHuhn/FikraTracker-report) - CLI tool to generate performance reports
- [gatsby-plugin-FikraTracker-tracker](https://github.com/Burnsy/gatsby-plugin-FikraTracker-tracker) - Gatsby plugin for FikraTracker
- [Soapberry](https://wordpress.org/plugins/soapberry/) - WordPress plugin for FikraTracker
- [FikraTracker-PHP](https://github.com/BrookeDot/FikraTracker-php) - A PHP Class for FikraTracker
- [use-FikraTracker](https://github.com/fikratracker/use-FikraTracker) - Use FikraTracker in React
- [nuxt-FikraTracker](https://github.com/bdrtsky/nuxt-FikraTracker) - Nuxt.js module for FikraTracker
- [ngx-FikraTracker-wrapper](https://github.com/oakify/ngx-FikraTracker-wrapper) - Angular wrapper for FikraTracker
- [django-FikraTracker-middleware](https://github.com/suda/django-FikraTracker-middleware) - Django middleware for FikraTracker
- [gridsome-plugin-FikraTracker](https://github.com/DenzoNL/gridsome-plugin-FikraTracker) - Gridsome plugin for FikraTracker
- [vuepress-plugin-FikraTracker](https://github.com/spekulatius/vuepress-plugin-FikraTracker) - VuePress plugin for FikraTracker
- [svelte-FikraTracker](https://github.com/gaia-green-tech/svelte-FikraTracker) - Svelte module for FikraTracker
- [FikraTracker_dart](https://github.com/marchellodev/FikraTracker_dart) - FikraTracker plugin for Dart/Flutter ([pub.dev](https://pub.dev/packages/FikraTracker_dart))
- [FikraTracker-tracker-consent](https://www.npmjs.com/package/FikraTracker-tracker-consent) - A consent banner to activate detailed tracking on FikraTracker

### Links

- [Follow FikraTracker on Twitter](https://twitter.com/getFikraTracker)
- [Vote for FikraTracker on ProductHunt](https://www.producthunt.com/posts/FikraTracker)
