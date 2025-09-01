import type { ProviderGetImage } from '@nuxt/image'
import { joinURL } from 'ufo'

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = 'https://spoonacular.com/cdn' } = {},
) => {
  const sizes = [100, 250, 500]
  const size = (modifiers.width || modifiers.height) ?? 100
  const nextBiggest = sizes.find(s => s >= size) || sizes[sizes.length - 1]
  const prefix = `ingredients_${nextBiggest}x${nextBiggest}`

  return {
    url: joinURL(baseURL, prefix, src),
  }
}
