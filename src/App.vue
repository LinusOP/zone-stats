<template>
  <v-app>
    <v-app-bar app dark color="secondary" class="text-h4 darken-1">
      RPUK Zone Stats
      <v-spacer></v-spacer>
      <span class="text-body-2 d-none d-sm-inline">
        Last Updated: {{ this.apiData.lastCall }}
      </span>
      <v-btn
        color="success"
        class="ml-4 d-none d-sm-inline"
        :disabled="btnCooldown"
        @click="refresh"
        >{{ !this.btnCooldown ? "Refresh" : "Please Wait" }}</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container class="pa-0" fluid v-if="!loading">
        <v-tabs
          v-model="tab"
          color="white"
          background-color="secondary"
          dark
          show-arrows
        >
          <v-tab v-for="title in titles" :key="title">
            {{ title }}
          </v-tab>
          <v-tabs-items v-model="tab" class="pa-4">
            <v-tab-item>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <PointsTable
                    title="Points in last 24 Hours"
                    :entries="apiData.points.rolling24h"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <KillsTable
                    title="Kills in last 24 Hours"
                    :entries="apiData.kills.rolling24h"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <PointsTable
                    title="Todays points"
                    :entries="apiData.points.currentDay"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <KillsTable
                    title="Todays kills"
                    :entries="apiData.kills.currentDay"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <PointsTable
                    title="This weeks points"
                    :entries="apiData.points.currentWeek"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <KillsTable
                    title="This weeks kills"
                    :entries="apiData.kills.currentWeek"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <PointsTable
                    title="This months points"
                    :entries="apiData.points.currentMonth"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <KillsTable
                    title="This months kills"
                    :entries="apiData.kills.currentMonth"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <PointsTable
                    title="Points of all time"
                    :entries="apiData.points.allTime"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <KillsTable
                    title="Kills of all time"
                    :entries="apiData.kills.allTime"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
      <v-container v-else fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols="1">
            <v-progress-circular
              indeterminate
              color="primary"
              size="150"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="justify-center text-caption py-1" app dark>
      <span
        >Made by
        <a
          href="https://www.roleplay.co.uk/profile/40332-nomad/"
          target="_blank"
          rel="noopener noreferrer"
          >Nomad</a
        >
        | Data and API provided by
        <a
          href="https://www.roleplay.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          >Roleplay UK</a
        >
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import moment from "moment";
import getApiData from "./api";
import PointsTable from "./components/PointsTable.vue";
import KillsTable from "./components/KillsTable.vue";

export default {
  name: "App",
  components: {
    PointsTable,
    KillsTable,
  },
  data() {
    return ({
      loading: true,
      btnCooldown: false,
      apiData: {
        yeet: "yeet",
      },
      tab: null,
      titles: [
        "Last 24h",
        "Daily",
        "Weekly",
        "Monthly",
        "All Time",
      ],
    });
  },
  methods: {
    refreshData() {
      getApiData()
        .then((data) => {
          this.apiData = {
            lastCall: moment(new Date()).format("HH:mm:ss zz"),
            ...data,
          };
        });
    },
    refresh() {
      this.refreshData();
      this.btnCooldown = true;
      setTimeout(() => {
        this.btnCooldown = false;
      }, 30 * 1000);
    },
  },
  created() {
    getApiData()
      .then((data) => {
        this.loading = false;
        this.apiData = {
          lastCall: moment(new Date()).format("HH:mm:ss zz"),
          ...data,
        };
      });
  },
};
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}

@media screen and (max-width: 960px) {
  html {
    overflow-y: scroll;
  }
}
</style>
