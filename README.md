
### Project setup

Must be installed globally prior to installation: git, node, npm, vue, composer, lando/docker.

#### Clone and install project
```
git clone git@github.com:captaindav/vue-outline
cd vue-outline
npm install
```

#### Fetch the latest Drupal 8 code
```
COMPOSER_MEMORY_LIMIT=-1 composer create-project drupal/recommended-project drupal
cd drupal
COMPOSER_MEMORY_LIMIT=-1 composer require drupal/admin_toolbar drupal/ctools drupal/dynamic_entity_reference drupal/graphql:"4.x-dev" drupal/outline
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drush/drush drupal/devel
```

#### Initialize Lando

```
lando poweroff
lando init --source cwd --recipe drupal8 --webroot=web --name="drupal-outline"
lando start
```

#### Install Drupal, set admin password, and enable Drupal contrib modules.
```
lando drush site-install demo_umami --notify global --site-name=drupal-outline --db-url='mysql://drupal8:drupal8@database/drupal8' -y
lando drush upwd admin admin
lando drush en -y admin_toolbar ctools devel dynamic_entity_reference kint graphql graphql_core outline
```

To view the site status:
```
lando drush status
```

You may login to the site as user "admin" with password "admin" at http://drupal-outline.lndo.site/user.


### Rebuild or Reinitialize Lando / Reinstall Drupal

If Lando/Drupal are not working / broken in some way try a Lando rebuild:
```
lando rebuild
```

To reinitialize Lando and reinstall Drupal:
```
lando destroy
lando drush site-install demo_umami --notify global --site-name=drupal-outline --db-url='mysql://drupal8:drupal8@database/drupal8' -y
lando drush upwd admin admin
lando drush en -y admin_toolbar ctools devel dynamic_entity_reference graphql graphql_core outline
```

### Vue app commands

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```
