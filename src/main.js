// This is the main file for the Netlify Build plugin {{name}}.
// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information about how to write Netlify Build plugins at
// https://github.com/netlify/build/blob/master/docs/creating-a-plugin.md

/* eslint-disable no-unused-vars */
module.exports = {
  // Name of the Netlify Build plugin. Should match the package name on npm.
  name: 'netlify-plugin-{{name}}',

  // The plugin main logic uses `on...` event handlers that are triggered on
  // each new Netlify Build.
  // Anything can be done inside those event handlers.
  // Information about the current build are passed as arguments. The build
  // configuration file and some core utilities are also available.
  async onInit({
    // Whole configuration file. For example, content of `netlify.yml`
    netlifyConfig,
    // Plugin configuration object specified by user with the `config` property
    // of that plugin.
    pluginConfig,
    // onError event handlers receive the error instance as argument
    error,

    // Build constants
    constants: {
      // The build directory of the site
      BUILD_DIR,
      // Path to the netlify configuration file
      CONFIG_PATH,
      // The directory where function source code lives
      FUNCTIONS_SRC,
      // The directory where built serverless functions are placed before deployment
      FUNCTIONS_DIST,
    },

    // Core utilities
    utils: {
      // Utility for running commands.
      // See https://github.com/netlify/build/blob/master/packages/run-utils/README.md
      run,
      // Utility for caching files.
      // See https://github.com/netlify/build/blob/master/packages/cache-utils/README.md
      cache,
      // Utility for dealing with modified, created, deleted files since a git commit.
      // See https://github.com/netlify/build/blob/master/packages/git-utils/README.md
      git,
      // Utility for adding Function files.
      // See https://github.com/netlify/build/blob/master/packages/functions-utils/README.md
      functions,
    },
  }) {
    // Commands are printed in Netlify logs
    await run('echo', ['Hello world!\n'])

    // Console logs are shown in Netlify logs
    console.log('Netlify configuration', netlifyConfig)
    console.log('Plugin configuration', pluginConfig)
    console.log('Build directory', BUILD_DIR)

    // Throwing an error will stop the build and print the error message in logs
    // throw new Error('Error message')
  },

  // The `onInit` runs at the beginning on each build.
  // The following events are also available to target specific build
  // lifecycle events.
  /*
  // Before build commands are executed
  onPreBuild() {},
  // Build commands are executed
  onBuild() {},
  // After Build commands are executed
  onPostBuild() {},
  // Runs on build success
  onSuccess() {},
  // Runs on build error
  onError() {},
  // Runs on build error or success
  onEnd() {},
  */

  // Users can pass a configuration options object to any plugin in their
  // Netlify configuration file.
  // For example:
  //
  //   plugins
  //     - package: netlify-plugin-{{name}}
  //       config:
  //         foo: bar
  //
  // It is possible to validate that options object using the following `config`
  // property. Its value is a JSON schema v7 describing each configuration property.
  // Learn more about JSON schema at https://json-schema.org/understanding-json-schema/`)
  /*
  config: {
    // Make `config.foo` required
    required: ['foo'],
    // If false (the default value), users cannot pass unknown `config.*`
    // properties
    additionalProperties: false,
    // Each property can be validated using any JSON schema keyword.
    // `default` can be used to assign default values.
    properties: {
      foo: { type: 'string' },
      hello: { type: 'boolean', default: true },
    },
  },
  */
}
