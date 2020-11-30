# Vue Outline

## Introduction

## Hierarchical Data Display

One of the advantages of organizing data in a hierarchy is the ability to collapse portions of the data so
that initially only entries contained within an expanded entry display in the outline tree.
Once the visible entries are loaded, then a background task fetches the hidden entries, so they may be
quickly displayed using cached data rather than making a trip to the server if their parent becomes expanded.

## Project setup

These must be installed globally prior to installation: git, node, npm, vue, composer, lando/docker.
Before installation, make sure you have drupal account set up with git access, SSH Key, and your global git user/email set.

### Clone and install project

```bash
git clone git@github.com:captaindav/vue-outline
cd vue-outline
npm i
```

### Initialize Drupal development server

```bash
cp -R scripts/drupal packages/drupal
cd packages/drupal
COMPOSER_MEMORY_LIMIT=-1 composer install
lando poweroff
lando start
lando site-setup
```

#### Post install

- Login at [http://drupal-outline.lndo.site/user](http://drupal-outline.lndo.site/user), username=admin password=admin
- Navigate to [http://drupal-outline.lndo.site/admin/config/graphql](http://drupal-outline.lndo.site/admin/config/graphql) and create a GraphQL server with these settings:
-- Label: Outline
-- Schema: Outline Schema
-- Endpoint: /outline-graphql
-- Check 'Allow query batching' and 'Enable caching'
- Navigate to: [http://drupal-outline.lndo.site/admin/people/permissions](http://drupal-outline.lndo.site/admin/people/permissions) and give the Anonymous role the permissions:
-- Outline: Execute arbitrary requests
-- Outline: Execute persisted requests

To enable VS Code support:

- In the top level vue-outline directory:

```bash
cp -R scripts/vscode .vscode
```

To view the site status:

```bash
lando drush status
```

## Rebuild or Reinitialize Lando / Reinstall Drupal

If Lando/Drupal are not working / broken in some way try a Lando rebuild:

```bash
lando rebuild
```

To reinitialize Lando and reinstall Drupal:

```bash
lando destroy
lando start
lando site-setup
```

## Packages

- api
  - Simple express api server.
  - Can use puppeteer.
- drupal
  - Main dev/drupal environment
  - Only generated when following the Initialize Drupal development server instructions above
- outline
  - Main vue-outline client/application
  - Requires drupal server to function

## General repository commands

### root level

- `build <package>`: runs build on all packages. Accepts `<package>` parameter to target specific packages
- `clean`: Cleans node_modules from all packages
- `lint`: Runs lint on all packages
- `lint:fix`: Runs `lint --fix` on all packages
- `serve <package>`: Runs `serve` on all packages. Accepts `<package>` parameter to target specific packages
- `start`: Starts drupal development server. Requires lando to function

### api package

- `serve`: Starts express api server

### outline package

- `build`: Compiles and minifies outline client for production
- `lint`: Lints and fixes outline client files
- `serve`: Compiles and hot-reloads outline client for development
