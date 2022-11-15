<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <main-navbar />
    </q-header>

    <q-drawer class="bg-accent" v-model="drawerState" side="left">
      <main-drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <q-toolbar>
        <q-toolbar-title style="font-size: 1em">Follow Us On</q-toolbar-title>
        <q-btn flat round color="white" icon="fa-brands fa-instagram" />
        <q-btn flat round color="white" icon="fa-brands fa-facebook" />
        <q-btn flat round color="white" icon="fa-brands fa-linkedin" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import mainNavbar from "components/MainNavbar.vue";
import mainDrawer from "components/MainDrawer.vue";
import { useDrawerState } from "../stores/drawer-store";

const { drawerState } = useDrawerState();
</script>
