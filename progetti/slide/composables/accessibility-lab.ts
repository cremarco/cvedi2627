import type { InjectionKey, Ref } from 'vue'

// Teaching controls are rendered outside the service interface they exercise.
export const accessibilityLabTargetKey: InjectionKey<Ref<HTMLElement | undefined>> = Symbol('accessibility-lab-target')
