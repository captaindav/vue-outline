# Install Drupal.
composer create-project drupal/recommended-project drupal
cd drupal
composer require drupal/admin_toolbar
composer require drupal/core:"8.9.x-dev"
composer require drupal/ctools
composer require drupal/dynamic_entity_reference
composer require drupal/outline
composer require cweagans/composer-patches

# Setup lando/docker.
lando init --recipe drupal8 --webroot=web --name="drupal-lando-git"

