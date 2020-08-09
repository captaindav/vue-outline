<template>
  <v-container fluid class="py-0 fill-height">
    <v-row class="fill-height">
      <v-col style="border-right: 2px solid #CCC" cols="3">
        <v-treeview
            activatable
            :items="treeViewItems"
            item-key="eid"
            item-text="name"
            item-children="children"
        >
          <template v-slot:label="{ item, open }">
            <div @click="treeViewLabelClick(item)">
              <v-icon v-if="['Outline 1', 'Outline 2'].includes(item.name)">
                $outline
              </v-icon>
              <v-icon v-else-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
              <span>{{item.name}}</span>
              {{item.expanded}}
            </div>
          </template>
        </v-treeview>
      </v-col>
      <v-col cols="9">
        <v-row  class="fill-height">
          <v-col v-if="false" style="border-bottom: 2px solid #CCC; height: 50%" cols="12">
            Entries
          </v-col>
          <v-col style="height: 100%" cols="12">
            <span v-html="renderedContent.content"></span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useQuery, useResult } from '@vue/apollo-composable';  //useMutation
  import outlinesQuery from '../graphql/queries/outlines.query.gql';
  import { computed, reactive } from '@vue/composition-api';

  export default {
    setup() {
      const {result: outlinesResult, loading } = useQuery(outlinesQuery);
      const outlines = useResult(
              outlinesResult,
              null,
              data => data.outlines.outlines);
      const treeViewItems = computed(() =>  {
        const rootEntries = [];
        if (outlines && outlines.value) {
          for (const outline of outlines.value) {
            rootEntries.push(outline.rootEntry);
          }
        }
        return rootEntries;
      });

      let renderedContent = reactive({content: ""});
      const treeViewLabelClick = (item) => {
        renderedContent.content = item.rendered;
        console.log(renderedContent, item.rendered)
      }
      return { loading, outlines, treeViewItems, renderedContent, treeViewLabelClick };
    },
    name: 'Outline',
  }
</script>
