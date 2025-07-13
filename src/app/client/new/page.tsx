import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  // Get form data
  const formData = new FormData(e.currentTarget)
  
  // Collect client data
  const clientData = {
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    businessName: formData.get('businessName'),
    clientAddress: formData.get('clientAddress')
  }

  // Store client data
  sessionStorage.setItem('clientData', JSON.stringify(clientData))
  
  // Redirect to project name page
  window.location.href = '/project/name'
}

export default function NewClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-blue-600 mb-6">
            PayMe
          </div>
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Add Your First Client
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about the client you want to work with
          </p>
        </div>

        {/* Back Button */}
        <div className="max-w-2xl mx-auto mb-6">
          <Link 
            href="/setup"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Link>
        </div>

        {/* Client Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Required Client Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Client Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="clientName">
                    Client Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="clientName"
                    name="clientName"
                    type="text" 
                    placeholder="John Smith"
                    className="h-11"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    The person you'll be working with
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail">
                    Client Email <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="clientEmail"
                    name="clientEmail"
                    type="email" 
                    placeholder="john@example.com"
                    className="h-11"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Where we'll send contracts and invoices
                  </p>
                </div>
              </div>

              {/* Optional Business Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Business Details (Optional)
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business/Company Name</Label>
                  <Input 
                    id="businessName"
                    name="businessName"
                    type="text" 
                    placeholder="Leave blank if working with an individual"
                    className="h-11"
                  />
                  <p className="text-sm text-gray-500">
                    This will appear on contracts and invoices
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Client Address</Label>
                  <Textarea 
                    id="clientAddress"
                    name="clientAddress"
                    placeholder="123 Business St&#10;City, State 12345"
                    className="resize-none"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    Used on invoices for professional appearance
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Add Client & Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>

            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-8 h-px bg-blue-600"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-8 h-px bg-blue-600"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <span className="ml-3">Step 2 of 3</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview of what happens next */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium">
              Next: Choose your contract template
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}