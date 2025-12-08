export default function HeroSkeleton() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Heading */}
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-10 bg-gray-300 rounded w-5/6" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>

            {/* Search bar */}
            <div className="h-12 bg-gray-200 rounded-lg" />

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-10 bg-gray-300 rounded w-32" />
              <div className="h-10 bg-gray-200 rounded w-32" />
            </div>
          </div>

          <div className="hidden md:block h-96 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
