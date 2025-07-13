import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-4xl font-bold text-blue-600 mb-8">
            PayMe
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Can We Help You Get Started?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your priority to get started and see results in minutes
          </p>
        </div>

        {/* Module Options */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Contract Module */}
            <Link href="/setup?flow=contract">
              <Card className="group cursor-pointer bg-white hover:bg-blue-50 transition-all duration-200 hover:shadow-lg hover:scale-105">
                <div className="p-8 text-center">
                  <div className="text-6xl mb-6">📝</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Create Your First Contract
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Stop scrambling with Word docs - get contracts signed in minutes
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Invoice Module */}
            <Link href="/setup?flow=invoice">
              <Card className="group cursor-pointer bg-white hover:bg-green-50 transition-all duration-200 hover:shadow-lg hover:scale-105">
                <div className="p-8 text-center">
                  <div className="text-6xl mb-6">💰</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Send Your First Invoice
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Turn signed contracts into cash flow automatically
                  </p>
                  <div className="flex items-center justify-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Card>
            </Link>

          </div>
        </div>

        {/* Optional: Quick stats */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Most users see their first payment within 3 days of creating their first contract
          </p>
        </div>
      </div>
    </div>
  )
}