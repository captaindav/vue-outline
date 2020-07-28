<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
<!--        <div v-for="outline in outlines" :key="outline.oid">-->
<!--            {{ outlines}}-->
<!--        </div>-->
        <v-treeview :items="computedOutlines" item-key="eid" item-text="name" item-children="children"></v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useQuery, useResult } from '@vue/apollo-composable';  //useMutation
  import outlinesQuery from '../graphql/queries/outlines.query.gql';

  export default {
    setup() {
      const {result: outlinesResult, loading } = useQuery(outlinesQuery);
      const outlines = useResult(
              outlinesResult,
              null,
              data => data.outlines.outlines
      )
      return { loading, outlines };
    },
    name: 'Outline',
    data: () => ({
    }),
    computed: {
      computedOutlines () {
        const outlines = []
        for (const i of this.outlines) {
          outlines.push(i.rootEntry);
        }
        return outlines;
      }
    }
  }
</script>
