# Vue Outline

## Introduction

## Hierarchical Data Display

One of the advantages of organizing data in a hierarchy is the ability to collapse portions of the data so
that initially only entries contained within an expanded entry display in the outline tree.
Once the visible entries are loaded, then a background task fetches the hidden entries, so they may be
quickly displayed using cached data rather than making a trip to the server if their parent becomes expanded.

## Project setup

These must be installed globally prior to installation: git, node, npm, vue, composer, lando/docker.

### Clone and install project

```bash
git clone git@github.com:captaindav/vue-outline
cd vue-outline
npm install
```

### Initialize Drupal development server.

```bash
mkdir drupal
cp composer/composer.json drupal
cd drupal
composer install
lando poweroff
lando start
lando install
```

### Install Drupal, set admin password, and enable Drupal contrib modules

```bash
lando drush site-install standard --account-pass admin —notify global --site-name=drupal-outline --db-url='mysql://drupal8:drupal8@database/drupal8' -y
lando drush en -y admin_toolbar admin_toolbar_search admin_toolbar_tools ctools devel dynamic_entity_reference graphql kint outline outline_graphql
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
lando drush site-install standard --account-pass admin —notify global --site-name=drupal-outline --db-url='mysql://drupal8:drupal8@database/drupal8' -y
lando drush en -y admin_toolbar admin_toolbar_search admin_toolbar_tools ctools devel dynamic_entity_reference graphql kint outline outline_graphql
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
