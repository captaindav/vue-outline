<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      max-width="400px"
    >
      <v-card height="300px">
        {{aboutText}}
      </v-card>
    </v-dialog>

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

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            left
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="dialog = true">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <outline />
    </v-main>
  </v-app>
</template>

<script>
  import AppDrawer from './components/AppDrawer';
  import Outline from './components/Outline';

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