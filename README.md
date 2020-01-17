<img src="static/logo.png" width="400"/><br>

<!-- START -->

Template repository to create new Netlify Build plugins.

## Usage

To create a repository with a new Netlify Build plugin, click on the following
button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/build-plugin-template)

Clone the repository locally. Go to the new repository directory then run the
following command:

```
npm run init
```

After answering few questions, the Netlify Build plugin will be ready. You can
add any logic to
[the main file at `src/main.js`](https://github.com/netlify/build-plugin-template/blob/master/src/main.js).
This file's comments will guide you through the creation of a Build plugin.

The following development tasks are already setup:

- `npm run ava` runs unit tests.
- `npm run lint` lints source files.
- `npm test` runs both unit tests and linting.
- `npm run release` publishes this plugin to `npm`.

## Plugin documentation

<!-- END -->

Netlify Build plugin - {{description}}.

## Install

```
npm install netlify-plugin-{{name}}
```

## Usage

Add this plugin to the `plugins` array in your
[`netlify.yml` configuration file](https://docs.netlify.com/configure-builds/file-based-configuration):

```yml
plugins:
  - package: netlify-plugin-{{name}}
    config: {}
```

## Configuration

The following `config` options are available:

### foo

_Type_: `string`\
_Default_: `bar`

Example description of the `foo` option.
