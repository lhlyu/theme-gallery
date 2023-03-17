<template>
    <div class="field">
        <label :for="label">{{ $t(label) }}</label>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        default: ''
    }
})
</script>

<style scoped lang="scss">
.field {
    margin-top: 10px;
    label {
        font-size: 12px;
        padding: 0 6px;
    }
}
</style>
