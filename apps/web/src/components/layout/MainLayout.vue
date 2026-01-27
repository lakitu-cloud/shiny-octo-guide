<template>
    <div className="flex h-screen bg-gray-50">
        <Sidebar :is-collapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />
        <div className="flex-1 flex flex-col">
            <Header :is-sidebar-collapsed="isCollapsed" />
            <main className="p-4 overflow-auto">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import { RouterView } from "vue-router";

const isCollapsed = ref(false)
</script>