<template>
    <Field :label="label">
        <div class="group">
            <input type="text" id="name" :value="modelValue" :placeholder="$t(label)" @input="$emit('update:modelValue', $event.target.value)" />
            <input type="color" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        </div>
    </Field>
</template>

<script setup lang="ts">
import Field from '../field/index.vue'
import useTheme from '../../hooks/useTheme'

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const { lineColor } = useTheme()
</script>

<style scoped lang="scss">
.group {
    display: flex;
    margin-top: 6px;
    padding: 0 6px;
    box-sizing: border-box;
    border: 1px solid v-bind(lineColor);
    transition: box-shadow 0.4s linear;
    border-radius: 4px;
    overflow: hidden;

    &:hover {
        box-shadow: 0 0 1px 1px v-bind(lineColor);
    }

    input {
        height: 30px;
        padding: 0;
        border: 0;
        outline: none;
        background-color: transparent;
        box-sizing: border-box;
    }

    input[type='text'] {
        width: 100%;
        text-overflow: ellipsis;
        color: inherit;
        letter-spacing: 1px;
    }

    input[type='color'] {
        width: 30px;
        cursor: pointer;
    }
}
</style>
