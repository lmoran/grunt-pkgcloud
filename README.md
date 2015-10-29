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
    "authUrl" : "",
    "region" : "",
    "username": "",
    "password": "",
    "provider" : "",
    "tenantName" : ""
  }
}
```
...and fill in the blanks (this file is not under Git in order to protect your sensitive data)


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

#### Management of security groups and rules

```
      getsecuritygroup : {
        id : grunt.option("id")
      },
      createsecuritygroup : {
        name : grunt.option("name"),
        description : grunt.option("description"),
        tenantId : grunt.option("tenantid")
      },
      destroysecuritygroup : {
        id : grunt.option("id")
      },
      getsecuritygrouprule : {
        id : grunt.option("id")
      },
      createsecuritygrouprule : {
        securityGroupId : grunt.option("securityGroupId"),
        name : grunt.option("name"),
        description : grunt.option("description"),
        direction : grunt.option("direction"),
        ethertype : grunt.option("ethertype"),
        portRangeMin : grunt.option("portRangeMin"),
        portRangeMax : grunt.option("portRangeMax"),
        protocol : grunt.option("protocol"),
        remoteGroupId : grunt.option("remoteGroupId"),
        remoteIpPrefix : grunt.option("remoteIpPrefix")
      },
      destroysecuritygrouprule : {
        id : grunt.option("id")
      }
```

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

`grunt pkgcloud:getsecuritygrouprules`
