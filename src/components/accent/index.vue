<template>
    <Field :label="label">
        <div class="group">
            <span v-for="v in accents" class="outer-circle" :class="{ selected: accentColor === v }" @click="changeAccent(v)">
                <span :style="{ backgroundColor: v }" class="inner-circle"></span>
            </span>
        </div>
    </Field>
</template>

<script setup lang="ts">
import Field from '../field/index.vue'
import useTheme from '../../hooks/useTheme'
import useSiteStore from '../../stores/site'

const props = defineProps<{
    label: string,
    accents: string[]
}>()

const { accentColor } = useTheme()

const site = useSiteStore()

const changeAccent = (color: string) => {
    site.accent = color
}
</script>

<style scoped lang="scss">
.group {
    display: flex;
    flex-wrap: wrap;

    .outer-circle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.15s linear;
        .inner-circle {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: all 0.15s linear;
        }
    }
    .selected {
        border: 3px solid v-bind(accentColor);
        .inner-circle {
            display: block;
            width: 70%;
            height: 70%;
            border-radius: 50%;
        }
    }
}
</style>
