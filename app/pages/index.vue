<script setup lang="ts">
const { data: recipe } = await useFetch('/api/recipes', {
  transform: data => data[Math.random() * data.length | 0],
})

const metricSystem = ref(true)
const unit = computed(() => metricSystem.value ? 'metric' : 'us')
</script>

<template>
  <UApp>
    <UContainer>
      <h1 class="mt-12 font-extrabold text-3xl md:text-4xl leading-tight">
        {{ recipe?.title }}
      </h1>

      <div class="flex flex-wrap gap-2 mt-2">
        <UBadge
          v-for="label in recipe?.dishTypes"
          :key="label"
          variant="subtle"
        >
          {{ label }}
        </UBadge>
      </div>

      <!-- Image and Summary -->
      <section class="mt-6 flex flex-col md:flex-row-reverse gap-6 w-full">
        <NuxtImg
          :src="recipe?.image"
          :alt="recipe?.title"
          class="aspect-video object-cover w-full md:w-1/2 rounded shadow-md"
          placeholder
        />
        <p class="text-base leading-relaxed text-balance md:w-1/2">
          <span v-html="recipe?.summary" />
        </p>
      </section>

      <!-- Ingredients and Steps -->
      <div class="mt-32 flex flex-col md:flex-row gap-8 py-4">
        <!-- Ingredients -->
        <section class="w-full md:w-2/5">
          <h2 class="text-lg font-bold mb-4">
            Ingredients
          </h2>

          <div class="overflow-x-auto rounded-xl shadow-primary w-full">
            <div class="flex justify-end mb-2">
              <UButton
                size="sm"
                color="primary"
                variant="ghost"
                @click="metricSystem = !metricSystem"
              >
                Change to {{ unit === 'metric' ? 'US' : 'metric' }}
              </UButton>
            </div>

            <table class="min-w-[500px] md:min-w-full table-auto divide-y divide-muted">
              <thead class="bg-primary/10 backdrop-blur-sm">
                <tr>
                  <th
                    scope="col"
                    class="px-4 md:px-6 py-3 text-left text-[11px] md:text-xs font-semibold text-primary uppercase tracking-widest border-b border-primary/20"
                  >
                    <span class="sr-only md:not-sr-only">Image</span>
                  </th>
                  <th
                    scope="col"
                    class="px-4 md:px-6 py-3 text-left text-[11px] md:text-xs font-semibold text-primary uppercase tracking-widest border-b border-primary/20"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 md:px-6 py-3 text-left text-[11px] md:text-xs font-semibold text-primary uppercase tracking-widest border-b border-primary/20 dark:border-primary/30"
                  >
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-muted">
                <tr
                  v-for="ingredient in recipe?.extendedIngredients"
                  :key="ingredient.id"
                  class="hover:bg-muted transition-colors duration-150 even:bg-muted/30"
                >
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <div class="flex items-center justify-center">
                      <NuxtImg
                        v-if="ingredient.image"
                        provider="spoonacular"
                        :src="ingredient.image"
                        :alt="`image of ${ingredient.name}`"
                        :width="50"
                        :height="50"
                        class="rounded-full w-10 h-10 object-contain shadow-sm border border-muted/10 shrink-0"
                      />
                      <div
                        v-else
                        class="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center shrink-0"
                      >
                        <span class="text-muted text-xs">N/A</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <span class="font-medium text-sm">{{ ingredient.name }}</span>
                  </td>
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <div class="text-sm text-muted">
                      <span v-if="metricSystem">
                        <span class="font-semibold">{{ ingredient.measures?.metric?.amount }}</span>
                        {{ ingredient.measures?.metric?.unitLong }}
                      </span>
                      <span v-else>
                        <span class="font-semibold">{{ ingredient.measures?.us?.amount }}</span>
                        {{ ingredient.measures?.us?.unitLong }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Optional scroll message -->
            <p class="text-xs text-muted mt-2 italic md:hidden px-4">
              Scroll horizontally to see the full table
            </p>
          </div>
        </section>

        <!-- Steps -->
        <section class="w-full md:flex-1 py-2 md:py-0">
          <h2 class="text-lg font-bold mb-4">
            Steps
          </h2>

          <div v-if="recipe?.analyzedInstructions?.[0]?.steps?.length">
            <ol class="flex flex-col gap-4">
              <li
                v-for="{ step, number } in recipe.analyzedInstructions[0].steps"
                :key="number"
                class="flex gap-3 items-start bg-muted/10 p-4 rounded-lg"
              >
                <span
                  class="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-inverted text-xs font-bold size-6"
                >
                  {{ number }}
                </span>
                <p class="text-sm leading-relaxed">
                  {{ step }}
                </p>
              </li>
            </ol>
          </div>

          <p v-else class="text-muted italic">
            No steps available for this recipe.
          </p>
        </section>
      </div>
    </UContainer>
  </UApp>
</template>
