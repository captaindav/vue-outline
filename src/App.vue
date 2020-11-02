<template>
  <v-app>
    <app-drawer />

    <v-app-bar
      app
      clipped-left
      color="primary"
      height="56"
      dark
    >
      <v-toolbar-title>
        <h1 class="text-h6">Drupal Vue Outline Demo</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <servers-dialog />

      <v-dialog
        v-model="dialog"
        max-width="400px"
      >
        <template #activator="{ on: don, attrs: dattrs }">
          <v-tooltip bottom>
            <template #activator="{ on: tton, attrs: ttattrs }">
              <v-btn
                icon
                v-bind="{
                  ...dattrs,
                  ...ttattrs
                }"
                v-on="{
                  ...don,
                  ...tton
                }"
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>About</span>
          </v-tooltip>
        </template>
        <v-card height="300px">
          {{aboutText}}
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <outline />
    </v-main>
  </v-app>
</template>

<script>
  import AppDrawer from './components/AppDrawer';
  import Outline from './components/Outline';
  import ServersDialog from './components/ServersDialog';

  export default {
    name: 'App',

    setup () {
      const dialog = false
      const aboutText = 'About Text'

      return {
        dialog,
        aboutText,
      }
    },

    components: {
      AppDrawer,
      Outline,
      ServersDialog,
    },
    
  };
</script>

<style lang="sass">
  .splitpanes--vertical > .splitpanes__splitter
    min-width: 4px
    background: rgba(0,0,0,.2)

  .splitpanes--horizontal > .splitpanes__splitter
    min-height: 4px
    background: rgba(0,0,0,.2)
</style>