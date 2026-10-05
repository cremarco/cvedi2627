<script setup lang="ts">
withDefaults(defineProps<{ id: string; emphasized?: boolean }>(), { emphasized: false })
</script>

<template>
  <form :aria-label="`Esempio illustrativo ${emphasized ? 'B' : 'A'}: prenotazione`" @submit.prevent>
    <fieldset class="fieldset gap-2 text-lg">
      <legend class="fieldset-legend" :class="emphasized ? 'text-2xl font-semibold' : 'text-lg font-normal'">Visita di fisioterapia</legend>
      <div :class="{ 'font-semibold': emphasized }">45 minuti · 50 €</div>
      <label class="label text-base-content" :for="`${id}-orario`">Orario</label>
      <input :id="`${id}-orario`" class="input w-full border! border-base-300! rounded-field px-3" type="text" value="Martedì · 18:00" readonly tabindex="-1" />
      <label class="label text-base-content" :for="`${id}-nome`">Nome</label>
      <input :id="`${id}-nome`" class="input w-full border! border-base-300! rounded-field px-3" type="text" value="Viola" readonly tabindex="-1" />
      <div class="card-actions mt-3">
        <button type="button" class="btn w-full border! rounded-field" :class="emphasized ? 'btn-primary bg-primary! border-primary! text-primary-content!' : 'btn-outline border-base-content!'" aria-disabled="true" tabindex="-1" @click.stop.prevent>Prenota la visita</button>
      </div>
    </fieldset>
  </form>
</template>
