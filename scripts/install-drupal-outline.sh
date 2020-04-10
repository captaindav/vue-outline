
# Install Vue Outline
git clone git@github.com:captaindav/vue-outline

# Install Drupal
composer create-project drupal/recommended-project drupal
cd drupal
composer require drupal/admin_toolbar
composer require cweagans/composer-patches
composer require drupal/ctools
composer require drupal/dynamic_entity_reference
composer require drupal/outline
