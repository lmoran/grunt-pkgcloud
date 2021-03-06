# grunt-pkgcloud

> Grunt task for deploying using [pkgcloud](https://github.com/pkgcloud/pkgcloud)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pkgcloud --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pkgcloud');
```

## Testing

### Pre-requiremnts

* Mocha `~2.3.3` has to be installed globally:
`npm install mocha -g'
* Make sure you have a cloud instance you can talk to (only OpenStatck has been tested so far)
* Create a `config.json` file in the root directory with your credentials, written as:
```json
{
  "objectstore": {
    "username": "",
    "password": "",
    "tenant": ""
  },
  "pkgcloud": {
    "client": {
      "authUrl" : "",
      "region" : "",
      "username": "",
      "password": "",
      "provider" : "",
      "tenantName" : ""
    },
    "test" : {
      "tenantId" : "",
      "availability_zone" : "",
      "imageRef" : "",
      "flavorRef" : "",
      "key_name" : "",
      "remoteIpPrefix" : ""
    }
  }
}
```
...and fill in the blanks. The "test" object is needed only if you want to run the integration tests.
(This file is not under Git in order to protect your sensitive data.)
To load the config data you have to add to your Gruntfile.js:
```
    pkgcloud : {
      options : {
        client : grunt.file.readJSON("config.json").pkgcloud.client
      },
```

### Running unit tests

`npm run test`


### Running integration tests

Make sure you have a cloud instance you can talk to (only OpenStatck has been tested so far)

`npm run testit`


## The "pkgcloud" task

### Overview
In your project's Gruntfile, add a section named `pkgcloud` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pkgcloud: {
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

#### options.createContainer
Type: `Boolean`
Default value: `true`

If the specified `dest` container does not exists, should one be created?

#### options.metadata
Type: `Object`
Default value: `{}`

Extra metadata to apply to the uploaded files.

#### options.client
Type: `Object`
Default value: `undefined`

The client definition for a pkgcloud [storage provider](https://github.com/pkgcloud/pkgcloud#storage).

### Usage Examples

#### Deployment of files
FIXME: this is part of the old versio of this package, I think it is no longer current
Deploy files to your OpenStack environment in the `test` container using the default settings. The `files` section
currently only has support Grunt's "Files Array" mapping format, and the `cwd` option has to be specified.

```js
grunt.initConfig({
  pkgcloud: {
    staging: {
      options: {
        client: {
          authUrl: 'https://identity.stack.cloudvps.com',
          username: 'foo',
          password: 'bar',
          provider: 'openstack',
          tenantId: 'moo'
        }
      },
      files: [{
        cwd: 'dist',
        src: '**',
        dest: 'test'
      }]
    }
  }
});
```

<<<<<<< HEAD
#### Management of security groups and rules

CLI examples:

```
grunt pkgcloud:createsecuritygroup \
   --name="testSecurityGroup" \
   --description="Security group used for test" \
   --tenantId="OpenAPI"
```

`grunt pkgcloud:getsecuritygroups`

```
grunt pkgcloud:destroysecuritygroup  \
   --id="5bfa89da-ce9f-4e84-8312-cde56e2d3a07"
```

```
grunt pkgcloud:createsecuritygrouprule \
   --securityGroupId="5b769304-1904-4abc-a4fa-fcf0c37b5a30" \
   --name="testSecurityGroupRule" \
   --description="Security group rule used for test" \
   --direction="ingress" --ethertype="IPv4" \
   --portRangeMin="8000" --portRangeMax="8080" \
   --protocol="tcp" --remoteIpPrefix="128.250.0.0/16" \
   --tenantId="OpenAPI"
```

`grunt pkgcloud:getservers`

`grunt pkgcloud:getimages`

`grunt pkgcloud:getflavors`

`grunt pkgcloud:getsecuritygroups`

`grunt pkgcloud:getsecuritygrouprules`

```
grunt pkgcloud:createserver --tenantId="OpenAPI" \
   --security_groups="[{'name':'default'},{'name':'consul'},{'name':'LB'}]" \
   --availability_zone="melbourne-np" \
   --imageRef="81f6b78f-6d51-4de9-a464-91d47543d4ba" \
   --flavorRef="cba9ea52-8e90-468b-b8c2-777a94d81ed3" \
   --name="testServerX" --key_name="lmorandini" \
   --user_data="ZWNobyAicG9zdC1paW5zdGFsbGF0aW9uIiA+PiAvdmFyL2xvZy9wb3N0LmxvZw=="
```

`grunt pkgcloud:stopserver --id="2dec4a6f-41c8-4eac-8f2f-27e5e63a8e1f"`

`grunt pkgcloud:startserver --id="2dec4a6f-41c8-4eac-8f2f-27e5e63a8e1f"`

```
grunt pkgcloud:renameserver --id="2dec4a6f-41c8-4eac-8f2f-27e5e63a8e1f" \
    --name="newServer"
```

`grunt pkgcloud:destroyserver --id="2dec4a6f-41c8-4eac-8f2f-27e5e63a8e1f"`

=======
##### Updating headers (Rackspace)

```js
grunt.initConfig({
  pkgcloud: {
    options: {
      client: {
        provider: 'rackspace',
        username: 'username',
        apiKey: 'awesomeAPIKey',
        region: 'IAD'
      }
    },
    files: [{
      cwd: 'dist/css',
      src: '**',
      dest: 'test/css'
    },{
      cwd: 'dist/fonts',
      src: '**',
      dest: 'test/fonts',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },{
      cwd: 'dist/image',
      src: '**',
      dest: 'test/image'
    },{
      cwd: 'dist/js',
      src: '**',
      dest: 'test/js'
    }]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
>>>>>>> ae2f0b401a5892bb1966c14a2b75c6fa16703794

