# grunt-ftp-diff-deployer

> Incrementally push differences to FTP server.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ftp-diff-deployer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ftp-diff-deployer');
```

## The "ftp-diff-deployer" task

### Overview
In your project's Gruntfile, add a section named `ftp-diff-deployer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'ftp-diff-deployer': {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

All available options and default values.

```js
{
  host: 'localhost',
  port: 21,
  auth: {
    username: '',
    password: ''
  },
  diff: 'simple',
  memory: './.grunt/grunt-ftp-diff-deployer/memory.{taskTarget}.json',
  exclude: [],
  reporter: 'simple', //{ simple | null }
  src: null, //(Required)
  dest: null, //(Required)
  retry: 3
}
```

#### host
Type: `String`   
Default value: `localhost`

FTP host to which the files will be uploaded.

#### port
Type: `Number`   
Default value: `21`

Port of the host to connect to.

#### auth
Type: `Object`   
Default value: `{ username: '', password: '' }`

Object holding the credentials for the server.
If `username` and `password` are both null, anonymous authentication will be used.

#### src _(required)_
Type: `String`

Path to the source directory, containing the files that will be uploaded to the server.

#### dest _(required)_
Type: `String`

Path to the destination directory (on the server) where all the files will be uploaded.

#### exclude
Type: `String[]`   
Default value: `[]`

Array of patterns that will be used to exclude some files from the diff.

#### diff
Type: `String`   
Default value: `simple`   
Possible values: `simple`

Diff method to use to compute the differences to upload to the server.
For more informations, go to [ftp-diff-deployer](https://github.com/95ulisse/ftp-diff-deployer).

`Simple` diff method provides another option:

* `memory`: Path to the file used to keep track of the uploaded files.

#### reporter
Type: `String`   
Default value: `simple`   
Possible values: `simple`, `null`

Type of reporter to use. For more informations, go to [ftp-diff-deployer](https://github.com/95ulisse/ftp-diff-deployer).

#### retry
Type: `Number`   
Default value: `3`

Number of attempts to try before declaring failure and throwing an error.

### Usage Examples

#### Basic example
In this example, we upload the directory `www` to the server `ftp.example.com`, providing username and password for authentication.

```js
grunt.initConfig({
  'ftp-diff-deployer': {
    options: {},
    www: {
      options: {
        host: 'ftp.example.com',
        auth: {
          username: 'foo',
          password: 'bar'
        },
        src: 'www',
        dest: '/'
      }
    }
  }
});
```

#### Complete example
In this example, we upload the directory `www` to the server `ftp.example.com`, providing username and password for authentication. All that annoying `Thumbs.db` files are excluded from the diff, and no output is shown.

```js
grunt.initConfig({
  'ftp-diff-deployer': {
    options: {},
    www: {
      options: {
        host: 'ftp.example.com',
        auth: {
          username: 'foo',
          password: 'bar'
        },
        src: 'www',
        dest: '/',
        exclude: [ '[Tt]humbs.db' ],
        reporter: 'null'
      }
    }
  }
});
```

#### Anonymous authentication
In this example, we upload the directory `www` to the server `ftp.example.com`, using anonymous authentication

```js
grunt.initConfig({
  'ftp-diff-deployer': {
    options: {},
    www: {
      options: {
        host: 'ftp.example.com',
        src: 'www',
        dest: '/'
      }
    }
  }
});
```