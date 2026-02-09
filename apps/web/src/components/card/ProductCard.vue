<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
    product: {
        type: Object as PropType<{
            id: string | number;
            name: string;
            price: number;
            stock: number;
            maxStock?: number; // optional - fallback to 100 if missing
            imageUrl?: string;
            category?: string;
        }>,
        required: true,
    },
});

const emit = defineEmits<{
    (e: "add", product: any): void;
}>();

const stockPercentage = computed(() => {
    const max = props.product.maxStock ?? 100;
    return Math.min(
        100,
        Math.max(0, Math.round((props.product.stock / max) * 100)),
    );
});

const barColor = computed(() => {
    if (stockPercentage.value >= 50) return "bg-green-500";
    if (stockPercentage.value >= 20) return "bg-yellow-500";
    return "bg-red-600";
});

const textColor = computed(() => {
    return stockPercentage.value < 20 ? "text-red-700" : "text-gray-700";
});

function handleClick() {
    emit("add", props.product);
}
</script>

<template>
    <button
        class="group relative flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 h-full text-left"
        @click="handleClick"
    >
        <!-- Image -->
        <div class="aspect-square bg-gray-100 relative">
            <img
                v-if="product.imageUrl"
                :src="product.imageUrl"
                :alt="product.name"
                class="w-20 h-20 object-cover"
                loading="lazy"
            />
            <div
                v-else
                class="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-medium"
            >
                NO IMAGE
            </div>

            <!-- Low stock badge -->
            <span
                v-if="stockPercentage < 20 && stockPercentage > 0"
                class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-sm"
            >
                Low
            </span>
        </div>

        <!-- Content -->
        <div class="flex-1 p-3 flex flex-col">
            <h3
                class="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] mb-1 group-hover:text-primary-700"
            >
                {{ product.name }}
            </h3>

            <div class="mt-auto space-y-2">
                <div class="text-lg font-bold text-primary-700">
                    UGX {{ product.price.toLocaleString() }}
                </div>

                <!-- Stock progress -->
                <div class="space-y-1">
                    <div
                        class="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden"
                    >
                        <div
                            :class="barColor"
                            class="h-full transition-all duration-500 ease-out"
                            :style="{ width: `${stockPercentage}%` }"
                        ></div>
                    </div>
                    <div
                        class="flex justify-between text-xs"
                        :class="textColor"
                    >
                        <span>Stock: {{ product.stock }}</span>
                        <span>{{ stockPercentage }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </button>
</template>
