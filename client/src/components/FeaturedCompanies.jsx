import React, { useRef } from 'react'
import { assets } from '../assets/assets'

const companies = [
  { id: 1, name: 'Accenture', slug: 'accenture', website: 'https://www.accenture.com', logo: assets.accenture_logo, rating: '3.3', reviews: '111.2K+' , desc: "Explore challenging and exciting opportunities at accenture" },
  { id: 2, name: 'Amazon', slug: 'Amazon', website: 'https://www.amazon.com', logo: assets.amazon_logo, rating: '3.9', reviews: '27K+' , desc: "Building India's largest retail company" },
  { id: 3, name: 'Samsung', slug: 'Samsung', website: 'https://www.samsung.com', logo: assets.samsung_logo, rating: '3.9', reviews: '5.7K+' , desc: "Create a better #TomorrowWithUs" },
  { id: 4, name: 'Adobe', slug: 'Adobe', website: 'https://www.adobe.com', logo: assets.adobe_logo, rating: '4.0', reviews: '7.7K+' , desc: "Leading digital health tech company in India." },
  { id: 5, name: 'Microsoft', slug: 'microsoft', website: 'https://www.microsoft.com', logo: assets.microsoft_logo, rating: '4.1', reviews: '92K+' , desc: "Innovate and scale with Microsoft" },
  { id: 6, name: 'Walmart', slug: 'walmart', website: 'https://www.walmart.com', logo: assets.walmart_logo, rating: '3.8', reviews: '50K+' , desc: "Global retail & e-commerce opportunities" },
]

export default function FeaturedCompanies() {
  const containerRef = useRef(null)

  const handlePrev = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: -containerRef.current.clientWidth * 0.7, behavior: 'smooth' })
  }

  const handleNext = () => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({ left: containerRef.current.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section className="my-12">
      <div className="container px-4 2xl:px-20 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured companies actively hiring</h2>
          <div className="flex gap-3">
            <button onClick={handlePrev} aria-label="previous" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <img src={assets.left_arrow_icon} alt="prev" className="w-4 h-4" />
            </button>
            <button onClick={handleNext} aria-label="next" className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <img src={assets.right_arrow_icon} alt="next" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="overflow-x-auto no-scrollbar -mx-2 py-2">
          <div className="flex gap-6 px-2">
            {companies.map((c) => (
              <div key={c.id} className="min-w-[260px] md:min-w-[300px] bg-white rounded-xl p-6 shadow-xl flex-shrink-0">
                <div className="flex justify-center mb-3">
                  <img src={c.logo} alt={c.name} className="max-h-12 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-3">{c.name}</h3>
                <div className="bg-gray-50 rounded-md py-3 px-4 mb-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{c.rating}</span>
                    <span className="text-gray-400">| {c.reviews} reviews</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-5 text-center">{c.desc}</p>
                <div className="flex justify-center">
                  <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-50 text-blue-600 px-5 py-2 rounded-full shadow-sm hover:bg-blue-100">View more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
