<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <h1>Outlines</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item target="_blank" href="https://github.com/captaindav/outline">
            <v-list-item-title>Outline Project on Github</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Outline/>
    </v-main>
  </v-app>
</template>

<script>
import Outline from './components/Outline';

export default {
  name: 'App',
  components: {
    Outline,
  },

  data: () => ({
    //
  }),
};
</script>
