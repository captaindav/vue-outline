### Must be globally installed:
##### node, npm, vue, composer, lando/docker

### Project setup
```
npm install
```

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

#### Execute these commands to create a Lando/Docker development environment for Drupal with the Outline module:
```
composer create-project drupal/recommended-project drupal
cd drupal
COMPOSER_MEMORY_LIMIT=-1 composer require drupal/admin_toolbar drupal/core drupal/ctools drupal/dynamic_entity_reference drupal/graphql drupal/outline
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drupal/devel

lando init --recipe drupal8 --webroot=web --name="drupal-outline"
lando start
lando drush site:install demo_umami -y
lando drush en -y admin_toolbar ctools devel dynamic_entity_reference graphql outline
 ```

### Add this line to ../drupal/web/sites/default/settings.php
```
$settings['trusted_host_patterns'][] = '\.lndo\.site$';
```


