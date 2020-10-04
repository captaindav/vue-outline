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
      dark
    >
      <v-toolbar-title>
        <h1>Drupal Vue Outline Demo</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-toolbar-items> 
            <v-btn text v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-toolbar-items>
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

<style>
  .splitpanes--vertical > .splitpanes__splitter {
    min-width: 4px;
    background: rgba(0,0,0,.2);
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    min-height: 4px;
    background: rgba(0,0,0,.2);
  }
</style>