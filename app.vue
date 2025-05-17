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
      <h1 class="mt-4 font-bold text-2xl pt-12">
        {{ recipe?.title }}
      </h1>
      <div class="flex flex-row gap-1 mt-2 flex-wrap">
        <UBadge v-for="label in recipe?.dishTypes" :key="label">
          {{ label }}
        </UBadge>
      </div>

      <section class="mt-4 flex flex-col md:flex md:flex-row-reverse gap-4 w-full">
        <NuxtImg :src="recipe?.image" :alt="recipe?.title" class="object-cover w-full rounded" placeholder />
        <p class="text-lg max-w-[40ch] text-balance" v-html="recipe?.summary" />
      </section>

      <div class="flex flex-col md:flex-row gap-2 md:gap-8">
        <section class="py-2 md:py-8 min-w-2/5">
          <div class="mb-4">
            <h2 class="text-lg font-bold">
              Ingredients
            </h2>
          </div>

          <div class="overflow-x-auto rounded-xl shadow-primary w-full">
            <div class="flex justify-end p-4">
              <UButton
                size="sm"
                color="primary"
                variant="outline"
                class="text-sm"
                @click="metricSystem = !metricSystem"
              >
                Change to {{ unit }}
              </UButton>
            </div>
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-green-50 dark:bg-green-500/50">
                <tr>
                  <th scope="col" class="px-4 md:px-6 py-3 text-left text-xs font-medium text-green-700 dark:text-green-100 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" class="px-4 md:px-6 py-3 text-left text-xs font-medium text-green-700 dark:text-green-100 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" class="px-4 md:px-6 py-3 text-left text-xs font-medium text-green-700 dark:text-green-100 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="ingredient in recipe?.extendedIngredients" :key="ingredient.id" class="hover:bg-green-50 dark:hover:bg-green-500/50 transition-colors duration-150">
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <div class="flex items-center justify-center">
                      <NuxtImg
                        v-if="ingredient.image"
                        provider="spoonacular"
                        :src="ingredient.image"
                        :alt="`image of ${ingredient.name}`"
                        :width="50"
                        :height="50"
                        class="rounded-full w-10 h-10 object-contain shadow-sm border border-green-100 shrink-0"
                      />
                      <div v-else class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <span class="text-green-500 text-xs">No image</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <span class="font-medium text-sm text-gray-900 dark:text-neutral-100">{{ ingredient.name }}</span>
                  </td>
                  <td class="px-4 md:px-6 py-2 whitespace-nowrap">
                    <div class="text-sm text-gray-700 dark:text-neutral-100">
                      <span v-if="metricSystem">
                        <span class="font-semibold">{{ ingredient.measures?.metric?.amount }}</span> {{ ingredient.measures?.metric?.unitLong }}
                      </span>
                      <span v-else>
                        <span class="font-semibold">{{ ingredient.measures?.us?.amount }}</span> {{ ingredient.measures?.us?.unitLong }}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="py-2 md:py-8">
          <h2 class="text-lg font-bold mb-4">
            Steps
          </h2>

          <div v-if="recipe?.analyzedInstructions?.[0]?.steps?.length">
            <ol class="flex flex-col gap-2.5">
              <li v-for="{ step, number } in recipe.analyzedInstructions[0].steps" :key="number">
                <span class="shrink-0 inline-flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-400 dark:opacity-90 text-primary-500 dark:text-inverted ring-1 ring-inset ring-primary-500 dark:ring-primary-400 ring-opacity-25 text-xs font-bold h-5 w-5">
                  {{ number }}
                </span>
                {{ step }}
              </li>
            </ol>
          </div>
          <p v-else class="text-gray-500 italic dark:text-neutral-400">
            No steps available for this recipe.
          </p>
        </section>
      </div>
    </UContainer>
  </UApp>
</template>
