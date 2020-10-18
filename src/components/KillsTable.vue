<template>
  <v-card class="elevation-3 grey--text text--lighten-3" color="#23272A" dark>
    <v-card-title>
      {{ this.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      must-sort
      sort-by="kills"
      :sort-desc="true"
      show-expand
      single-expand
      :expanded.sync="expanded"
      item-key="group"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="d-flex justify-space-around">
            <span>Rebels killed: {{ item.killed_rebels }}</span>
            <span>Police killed: {{ item.killed_police }}</span>
            <span> Poseidon killed: {{ item.killed_poseidon }} </span>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    entries: Array,
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: "Gang",
          sortable: false,
          value: "group",
          width: "25%",
        },
        { text: "Kills", value: "kills", align: "center" },
        { text: "Deaths", value: "deaths", align: "center" },
        { text: "K/D Ratio", value: "kd_ratio", align: "center" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    items() {
      const items = [];

      this.entries.forEach((entry) => {
        let kd = entry.kills.toFixed(2);
        if (entry.deaths > 0) {
          kd = (entry.kills / entry.deaths).toFixed(2);
        }
        // eslint-disable-next-line no-param-reassign
        entry.kd_ratio = kd;
        items.push(entry);
      });

      return items;
    },
  },
};
</script>

<style>
</style>
