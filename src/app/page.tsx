import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-3xl font-bold text-blue-600 mb-4">
            PayMe
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Stop Chasing Payments,
            <span className="text-blue-600 block">Start Getting Paid</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            The all-in-one platform that turns contracts into cash in 3 days, not 30 days
          </p>

          {/* Sign Up Form */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Ready to get paid faster?
              </h3>
              <form 
                className="space-y-4"
                action="/dashboard"
                method="GET"
              >
                <div>
                  <Input 
                    type="text" 
                    name="name"
                    placeholder="Your name"
                    className="w-full h-12 text-lg"
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="Your email"
                    className="w-full h-12 text-lg"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Start Getting Paid
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                Free 14-day trial • No credit card required
              </p>
            </div>
          </div>
        </div>

        {/* Pain Points */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">😤</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tired of spending 8 hours/week on paperwork?
              </h3>
              <p className="text-gray-600">
                Instead of building your business, you're stuck doing admin work
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">🤯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Frustrated juggling 5 different apps?
              </h3>
              <p className="text-gray-600">
                Google Docs → DocuSign → QuickBooks → Stripe → Excel (it's exhausting)
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">😠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sick of waiting 30+ days to get paid?
              </h3>
              <p className="text-gray-600">
                Your clients forget, invoices get lost, cash flow suffers
              </p>
            </div>
          </div>
        </div>

        {/* Success Proof */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Join 500+ freelancers who now get paid in 3 days average
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium text-gray-700">Save 6+ hours per week</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium text-gray-700">Get paid 4x faster</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium text-gray-700">Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}