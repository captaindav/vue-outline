<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Outline graphic"
          class="shrink mr-2"
          contain
          src="assets/icon-outline.gif"
          transition="scale-transition"
          width="40"
        />
        <h1>Outlines</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/captaindav/outline"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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
