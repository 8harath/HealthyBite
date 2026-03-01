import Link from "next/link";

const stats = [
  { value: "10K+", label: "Happy Users" },
  { value: "50+", label: "Curated Meals" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const features = [
  {
    icon: "🧬",
    title: "AI-Powered Analysis",
    description: "Our Gemini AI analyzes your health profile, BMI, allergies, and goals to create the perfect meal plan just for you.",
  },
  {
    icon: "🥗",
    title: "Expert-Curated Meals",
    description: "40+ nutritionist-designed meals spanning Indian, Mediterranean, Keto, Paleo, and more — tailored to your taste.",
  },
  {
    icon: "📊",
    title: "Nutritional Insights",
    description: "Detailed macro breakdowns, personalized health tips, and calorie tracking to keep you on target every day.",
  },
  {
    icon: "🚀",
    title: "Flexible Subscriptions",
    description: "Weekly, monthly, or quarterly plans with convenient delivery. Pause or cancel anytime — zero commitment.",
  },
  {
    icon: "🛡️",
    title: "Allergy-Safe Filters",
    description: "Smart allergy detection covers dairy, gluten, nuts, seafood, and more. Your safety is never compromised.",
  },
  {
    icon: "🌙",
    title: "Dark Mode & Responsive",
    description: "Beautiful experience on any device, any time of day. Designed with accessibility and comfort in mind.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your health goals, dietary preferences, and allergies.",
    icon: "📝",
  },
  {
    num: "02",
    title: "AI Analyzes Your Data",
    description: "Our Gemini AI processes your profile to understand your unique nutritional needs.",
    icon: "🤖",
  },
  {
    num: "03",
    title: "Get Personalized Meals",
    description: "Receive 5 expert-crafted meal recommendations with full nutritional breakdowns.",
    icon: "🍽️",
  },
  {
    num: "04",
    title: "Subscribe & Enjoy",
    description: "Pick a plan and get fresh, healthy meals delivered right to your doorstep.",
    icon: "✨",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Lost 8kg in 3 months",
    quote: "HealthyBite understood my vegetarian preferences perfectly. The AI recommendations were spot-on, and I never felt like I was on a diet!",
    avatar: "👩‍💼",
  },
  {
    name: "Rahul Mehta",
    role: "Fitness Enthusiast",
    quote: "As someone on a high-protein muscle-gain diet, finding the right meals was always hard. HealthyBite made it effortless with its AI-powered suggestions.",
    avatar: "🧑‍💻",
  },
  {
    name: "Anita Roy",
    role: "Working Professional",
    quote: "The weekly meal plans save me so much time. I love that it considers my budget and cooking preferences. Truly personalized!",
    avatar: "👩‍🔬",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-bg-hero relative py-20 md:py-28 lg:py-36">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-300/20 dark:bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-on-load animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                Powered by Gemini AI
              </span>
            </div>

            <h1 className="animate-on-load animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Eat Smarter with{" "}
              <span className="gradient-text">AI-Powered</span>{" "}
              Meal Plans
            </h1>

            <p className="animate-on-load animate-fade-in-up delay-200 text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Personalized nutrition designed around your body, goals, and taste.
              Get meals that fit your lifestyle — not the other way around.
            </p>

            <div className="animate-on-load animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
              >
                Start Free Today
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="animate-on-load animate-fade-in-up delay-500 mt-16 md:mt-20 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-primary-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for{" "}
              <span className="gradient-text">Healthy Living</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From AI analysis to doorstep delivery — we handle every step of your nutrition journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-float">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four simple steps to transform your eating habits forever.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  {/* Connector line (hidden on mobile and last item) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />
                  )}

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 tracking-widest uppercase">
                      Step {step.num}
                    </span>
                    <h4 className="text-lg font-bold mt-2 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our users have to say about their HealthyBite experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex gap-0.5 mt-4 text-yellow-400">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-14 rounded-3xl bg-gradient-to-br from-primary-600 via-green-600 to-teal-600 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-8 -translate-x-8" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Health?
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl mx-auto">
                Join thousands who have already started their journey to healthier eating with HealthyBite.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started — It&apos;s Free
                <span className="text-xl">🚀</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
