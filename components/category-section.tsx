export default function CategorySection() {
  const categories = [
    { name: "BEST SELLERS", icon: "🖥️" },
    { name: "LAPTOPS", icon: "💻" },
    { name: "PHONES", icon: "📱" },
    { name: "AUDIO", icon: "🎧" },
    { name: "DEALS", icon: "🏷️" },
  ]

  return (
    <section className="px-4 md:px-8 py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:bg-gray-200 transition group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition transform">{category.icon}</div>
              <p className="text-xs md:text-sm font-bold tracking-wide">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
