COMPOSER_MEMORY_LIMIT=-1 composer create-project drupal/recommended-project drupal
cd drupal
COMPOSER_MEMORY_LIMIT=-1 composer require drupal/admin_toolbar drupal/ctools drupal/dynamic_entity_reference drupal/graphql:"^4.0" drupal/paragraphs drupal/pathauto drupal/token
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drush/drush drupal/console
COMPOSER_MEMORY_LIMIT=-1 composer require --dev drupal/devel drupal/devel_php drupal/config_devel drupal/core-dev
