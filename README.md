### These must be globally installed:
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

### Installation Instructions

#### Clone the outline app
```
git clone git@github.com:captaindav/vue-outline
```

#### Install Drupal code using composer:
```
cd vue-outline
composer create-project drupal/recommended-project drupal
cd drupal
COMPOSER_MEMORY_LIMIT=-1 composer require drupal/admin_toolbar drupal/core drupal/ctools drupal/dynamic_entity_reference drupal/graphql drupal/outline
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drush/drush drupal/devel
```

#### Create settings.php file
```
cp web/sites/default/default.settings.php web/sites/default/settings.php
vi web/sites/default/settings.php
```
Replace line 91 with:
```
  $databases['default']['default'] = [
    'database' => 'drupal8',
    'username' => 'drupal8',
    'password' => 'drupal8',
    'host' => 'localhost',
    'port' => '3306',
    'driver' => 'mysql',
    'prefix' => '',
    'collation' => 'utf8mb4_general_ci',
  ];
```

On line 277 enter a hash_salt value.

#### Initialize Lando/Docker
 For the first step, when asked, pick 'current working directory' as codebase location.
```
lando init --recipe drupal8 --webroot=web --name="drupal-outline"
lando start
lando drush site:install demo_umami -y
lando drush en -y admin_toolbar ctools devel dynamic_entity_reference graphql outline
 ```

### Add this line to ../drupal/web/sites/default/settings.php
```
$settings['trusted_host_patterns'][] = '\.lndo\.site$';
```


