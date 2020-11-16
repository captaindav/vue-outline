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
cp -R scripts/drupal drupal
cd drupal
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

You may in to the site as user "admin" with password "admin" at <http://drupal-outline.lndo.site/user>.

## Rebuild or Reinitialize Lando / Reinstall Drupal

If Lando/Drupal are not working / broken in some way try a Lando rebuild:

```bash
lando rebuild
```

To reinitialize Lando and reinstall Drupal:

```bash
lando destroy
lando start
lando install-drupal-core
lando install-drupal-modules
```

## Vue app commands

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```
