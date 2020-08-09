# Project

## Start

### Project setup

Must be installed globally prior to installation: git, node, npm, vue, composer, lando/docker.

#### Clone and install project

```bash
git clone git@github.com:captaindav/vue-outline
cd vue-outline
npm install
```

#### Fetch the latest Drupal 8 code

```bash
COMPOSER_MEMORY_LIMIT=-1 composer create-project drupal/recommended-project drupal@8
cd drupal
COMPOSER_MEMORY_LIMIT=-1 composer require drupal/admin_toolbar drupal/ctools drupal/dynamic_entity_reference drupal/graphql:"4.x-dev" drupal/outline
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drush/drush drupal/devel
```

#### Initialize Lando

```bash
lando poweroff
lando init --source cwd --recipe drupal8 --webroot=web --name="drupal-outline"
lando start
```

#### Install Drupal, set admin password, and enable Drupal contrib modules

```bash
lando drush site-install standard --account-pass admin —notify global --site-name=drupal-outline --db-url='mysql://drupal8:drupal8@database/drupal8' -y
lando drush en -y admin_toolbar admin_toolbar_search admin_toolbar_tools ctools devel dynamic_entity_reference graphql kint outline outline_graphql
```

To view the site status:

```bash
lando drush status
```

You may in to the site as user "admin" with password "admin" at <http://drupal-outline.lndo.site/user>.

### Rebuild or Reinitialize Lando / Reinstall Drupal

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

### Vue app commands

#### Compiles and hot-reloads for development

```bash
npm run serve
```

#### Compiles and minifies for production

```bash
npm run build
```

#### Lints and fixes files

```bash
npm run lint
```
