type FoodBlockProps = {
  sectionTitle?: string
  foods: Food[]
}
type Media = {
  url: string
  alt?: string
}

type Food = {
  id: string
  title: string
  subtitle?: string
  icon?: string
  type: 'canteen' | 'snacks' | 'restaurant'
  image?: Media | null
}

export default function ContestFoodBlockComponent({ sectionTitle, foods }: FoodBlockProps) {
  if (!foods?.length) return null

  return (
    <section className="w-full py-16 bg-[#faf7fb]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#7b1f6a] mb-10">
          {sectionTitle || 'Foods & Canteen'}
        </h2>

        {/* Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div
              key={food.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
            >
              {/* Image / Icon */}
              <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                {food.image?.url ? (
                  <img
                    src={food.image.url}
                    alt={food.image.alt || food.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-5xl">{food.icon || '🍽️'}</span>
                )}

                {/* Type Badge */}
                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold capitalize">
                  {food.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{food.title}</h3>

                {food.subtitle && <p className="text-sm text-gray-600">{food.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
