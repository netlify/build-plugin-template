<img src="static/logo.png" width="400"/><br>

Template repository to create new Netlify Build plugins.

# Initialization

To create a repository with a new Netlify Build plugin, click on the following
button.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/build-plugin-template)

[Clone the repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
locally.

Inside the new repository directory, run the following command:

```
npm run init
```

# Usage

The plugin's logic should be added to [`./src/main.js`](/src/main.js). Comments
in that file will guide you through the creation of a Build plugin.

The following development tasks are already setup.

```bash
$ npm run build
```

Runs a Netlify Build locally with the current plugin. This can be used for
debugging and manual tests.

The local Build configuration file is located at
[`./test/helpers/netlify.yml`](/test/helpers/netlify.yml) and can be modified.

```bash
$ npm run ava
```

Runs [unit tests](/test/main.js).

```bash
$ npm run lint
```

Lints source files.

```bash
$ npm test
```

Runs both unit tests and linting.

```bash
$ npm run release
```

Publishes this plugin to `npm`.

More information is available in the
[`CONTRIBUTING.md`](/CONTRIBUTING.md#development-tasks).
