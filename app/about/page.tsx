import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us | Franco Electronics",
  description:
    "Learn about Franco Electronics - our mission, vision, and commitment to quality electronic products.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
            About Franco Electronics
          </h1>

          <div className="space-y-8 text-lg leading-relaxed text-gray-700">
            <p>
              Franco Electronics is a leading electronic brand dedicated to
              delivering premium products that empower our customers to express
              their unique style and confidence.
            </p>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">
                Our Mission
              </h2>
              <p>
                To provide high-quality, innovative electronic products that are
                accessible, affordable, and environmentally conscious. We
                believe that everyone deserves to feel beautiful and confident.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Our Vision</h2>
              <p>
                To become the most trusted Electronics brand globally, known for
                our commitment to quality, innovation, and customer
                satisfaction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Our Values</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Quality:</strong> We use only the finest products
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously develop new
                  formulas and products
                </li>
                <li>
                  <strong>Sustainability:</strong> We care about our planet and
                  use eco-friendly packaging
                </li>
                <li>
                  <strong>Customer Care:</strong> Your satisfaction is our
                  priority
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">
                Why Choose Us?
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Premium quality products at competitive prices</li>
                <li>Fast and reliable delivery</li>
                <li>Excellent customer support</li>
                <li>Cruelty-free and ethically sourced ingredients</li>
                <li>Easy returns and refunds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
