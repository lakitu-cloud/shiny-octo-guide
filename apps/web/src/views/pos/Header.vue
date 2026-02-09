<script setup lang="ts">
import { usePosUIStore } from "../../stores/posUI";
import { ref } from "vue";
import { useRouter } from "vue-router";

const posUI = usePosUIStore();
const router = useRouter();

const showAddProductModal = ref(false);
const showAddCategoryModal = ref(false);

// Placeholder – implement real modals later
function openAddProduct() {
    showAddProductModal.value = true;
}

function openAddCategory() {
    showAddCategoryModal.value = true;
}

function logout() {
    // TODO: real logout logic
    router.push("/login");
}
</script>

<template>
    <header class="text-white">
        <div
            class="max-w-screen-full px-4 py-2 flex items-center justify-between flex-wrap gap-3"
        >
            <!-- Left group -->
            <div class="flex items-center gap-1.5 flex-wrap">
                <div
                    class="group inline-flex items-center rounded-sm overflow-hidden bg-green-600 text-white text-sm font-medium shadow-sm hover:shadow focus-within:ring-2 focus-within:ring-green-400"
                >
                    <div class="px-1.5 bg-green-700 py-2">
                        <svg
                            class="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M3 6v12 M7 6v12 M11 6v12 M15 6v12 M19 6v12"
                            />
                        </svg>
                    </div>
                    <span class="px-1.5 text-white font-semibold"
                        >Products</span
                    >
                    <button
                        @click="$emit('add')"
                        class="px-1.5 py-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-colors"
                        aria-label="Add"
                    >
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2.5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    class="group inline-flex items-center rounded-sm overflow-hidden bg-green-600 text-white text-sm font-medium shadow-sm hover:shadow focus-within:ring-2 focus-within:ring-green-400"
                >
                    <div class="px-1.5 bg-green-700 py-2">
                        <svg
                            class="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M3 6v12 M7 6v12 M11 6v12 M15 6v12 M19 6v12"
                            />
                        </svg>
                    </div>
                    <span class="px-1.5 text-white font-semibold"
                        >Categories</span
                    >
                    <button
                        @click="$emit('add')"
                        class="px-1.5 py-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-colors"
                        aria-label="Add"
                    >
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2.5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    class="group inline-flex items-center rounded-sm overflow-hidden bg-blue-400 text-white text-sm font-medium shadow-sm hover:shadow focus-within:ring-2 focus-within:ring-blue-400"
                >
                    <div class="px-1.5 bg-blue-500 py-2">
                        <svg
                            class="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M3 6v12 M7 6v12 M11 6v12 M15 6v12 M19 6v12"
                            />
                        </svg>
                    </div>
                    <span class="px-1.5 text-white text-sm font-semibold"
                        >Open Tabs</span
                    >
                </div>

                <div
                    class="group inline-flex items-center rounded-sm overflow-hidden bg-blue-600 text-white text-sm font-medium shadow-sm hover:shadow focus-within:ring-2 focus-within:ring-blue-400"
                >
                    <div class="px-1.5 bg-blue-700 py-2">
                        <svg
                            class="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M3 6v12 M7 6v12 M11 6v12 M15 6v12 M19 6v12"
                            />
                        </svg>
                    </div>
                    <span class="px-1.5 text-white font-semibold">Orders</span>
                </div>
            </div>

            <!-- Right group -->
            <div class="flex items-center gap-2 flex-wrap">
                <button
                    @click="posUI.toggleMode"
                    class="px-4 py-2 bg-green-400 hover:bg-green-600 rounded-md font-medium transition"
                >
                    {{
                        posUI.isTransactionsMode
                            ? "Transactions"
                            : "Point of Sale"
                    }}
                </button>

                <button
                    class="px-3 py-1.5 bg-green-400 hover:bg-green-600 rounded-md text-sm font-medium transition"
                >
                    Users
                </button>
                <button
                    class="px-3 py-1.5 bg-green-400 hover:bg-green-600 rounded-md text-sm font-medium transition"
                >
                    Administrator
                </button>
                <button
                    @click="logout"
                    class="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-md font-medium transition"
                >
                    Log out
                </button>
            </div>
        </div>
    </header>
</template>
