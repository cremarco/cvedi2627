// Presentation override explicitly requested for the national hero map.
// The source-backed data asset and acquired originals are preserved.
export const nationalHeroMap = source => ({
  ...source,
  src:'assets/maps/italia-9-ottobre-v1.png',
  originalSrc:'../assets/plates/national-map.png',
  alt:'Italia, previsione del 9 ottobre 2026: reinterpretazione grafica della mappa iLMeteo acquisita',
});
