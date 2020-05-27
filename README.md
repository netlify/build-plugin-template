<img src="static/logo.png" width="400"/><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/79deda3b-d696-4878-b15d-d9f3a862bdfc/deploy-status)](https://app.netlify.com/sites/awesome-swanson-e132b6/deploys)

Template repository to create new Netlify Build plugins.

# Initialization

To create a repository with a new Netlify Build plugin, click on the
["Use this template" button](https://github.com/netlify/build-plugin-template/generate)
on top of the page.

The repository name should start with `netlify-plugin-`, for example
`netlify-plugin-gatsby`.

[Clone the repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
locally.

Inside the new repository directory, run the following command.

```
npm run init
```

Some questions will be asked. Make sure the plugin's name matches the repository
name.

Among other things, this will replace this `README.md` with the plugin's user
documentation. Development documentation will still be available in the
[`CONTRIBUTING.md`](/CONTRIBUTING.md#development-tasks).

# Usage

The plugin's logic should be added to [`./src/main.js`](/src/main.js). Comments
in that file will guide you through the creation of a Build plugin.

## Development tasks

The following development tasks are available. Please check the
[`package.json`](/package.json) `scripts` property for more information.

```bash
npm run build
```

Runs a Netlify Build locally with the current plugin. This can be used for
debugging and manual tests.

The local Build configuration file is [`netlify.toml`](/netlify.toml) and can be
modified.

```bash
npm run ava
```

Runs [unit tests](/test/main.js).

```bash
npm run lint
```

Lints and prettifies source files.

```bash
npm test
```

Runs both unit tests and linting.

```bash
npm run release
```

Publishes this plugin to `npm`.
