<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div v-for="outline in outlines" :key="outline.oid">{{ outline.name }}</div>
      </v-col>
    </v-row>
<!--    <ApolloQuery-->
<!--            :query="gql => gql`-->
<!--        query {-->
<!--            outlines {-->
<!--                name-->
<!--                oid-->
<!--            }-->
<!--        }`">-->
<!--    </ApolloQuery>-->
  </v-container>

</template>

<script>
  // import gql from "graphql-tag";
  import { useQuery, useResult } from '@vue/apollo-composable';  //useMutation
  import outlinesQuery from '../graphql/queries/outlines.query.gql';

  export default {
    setup() {
      const {result: outlinesResult, loading } = useQuery(outlinesQuery);
      const outlines = useResult(
              outlinesResult,
              null,
              data => data.outlines.results
      )
      return { loading, outlines };
    },
    name: 'Outline',
    // apollo: {
    //   outlines: gql
    //     query {
    //       outlines {
    //         name
    //         id
    //       }
    //     }
    // },
    data: () => ({

    }),
  }
</script>
