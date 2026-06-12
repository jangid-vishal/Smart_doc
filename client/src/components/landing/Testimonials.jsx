import { motion } from 'framer-motion'
import ReactSlick from 'react-slick'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

// Handle both ESM and CJS default export
const Slider = ReactSlick.default || ReactSlick

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    rating: 5,
    comment: 'Smart_Doc completely transformed my healthcare experience. Booking appointments is so seamless, and the doctors are incredibly professional. I love how I can access all my prescriptions digitally!',
    avatar: 'S',
    avatarColor: 'from-primary-400 to-primary-600',
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    rating: 5,
    comment: 'As a doctor, this platform has streamlined my practice enormously. Managing appointments, uploading prescriptions, and tracking patient records has never been easier.',
    avatar: 'M',
    avatarColor: 'from-secondary-400 to-secondary-600',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Patient',
    rating: 5,
    comment: 'The disease information section is incredibly helpful. I was able to research my symptoms and find the right specialist. The booking process was quick and hassle-free.',
    avatar: 'E',
    avatarColor: 'from-accent-400 to-accent-600',
  },
  {
    name: 'James Wilson',
    role: 'Patient',
    rating: 4,
    comment: 'Excellent platform! The ability to see doctor ratings, read reviews, and check availability in real-time saved me so much time. Highly recommend to everyone.',
    avatar: 'J',
    avatarColor: 'from-orange-400 to-orange-600',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Neurologist',
    rating: 5,
    comment: 'The analytics dashboard gives me great insights into my practice. I can track appointments, earnings, and patient satisfaction all in one beautiful interface.',
    avatar: 'P',
    avatarColor: 'from-rose-400 to-rose-600',
  },
  {
    name: 'Robert Taylor',
    role: 'Patient',
    rating: 5,
    comment: 'Being able to download prescriptions as PDFs and have my complete medical history in one place is a game-changer. Smart_Doc is the future of healthcare!',
    avatar: 'R',
    avatarColor: 'from-cyan-400 to-cyan-600',
  },
]

const TestimonialCard = ({ testimonial }) => (
  <div className="px-3 py-4">
    <div className="bg-white rounded-card p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-2xl text-primary-200 mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm text-surface-500 leading-relaxed mb-6 line-clamp-4">
        "{testimonial.comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}
        >
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-xs text-surface-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-50/60 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary-50/60 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Patients</span> Say
          </h2>
          <p className="section-subtitle">
            Real stories from real people who have experienced the Smart_Doc difference
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
