import useSiteStore from '../stores/site'
import { computed } from 'vue'

const useTheme = () => {
    const site = useSiteStore()

    const backgroundColor = computed(() => site.background)
    const bodyColor = computed(() => site.body)
    const fontColor = computed(() => site.font)
    const selectionColor = computed(() => site.selection)
    const lineColor = computed(() => site.line)
    const accentColor = computed(() => site.accent)

    return {
        backgroundColor,
        bodyColor,
        fontColor,
        selectionColor,
        lineColor,
        accentColor
    }
}

export default useTheme
