import { DefaultHeroBanner } from './DefaultHeroBanner/Component'

type Props = {
  slug: string
  hero: {
    type: string
    heading?: string
    image?: any
  }
}

export const RenderHero: React.FC<Props> = ({ hero }) => {
  if (!hero || hero.type === 'none') return null
  const { heading, image } = hero
  const resolvedImage = typeof image === 'object' && image !== null ? image : undefined
  return (
    <DefaultHeroBanner
      heading={heading}
      image={resolvedImage}
    />
  )
}
