import { Card } from "@/components/ui/card"
import { ArrowRight, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContractTemplate() {
  const templates = [
    {
      id: 'hourly',
      icon: '⏰',
      title: 'Hourly Consulting Agreement',
      description: 'Perfect for ongoing work where time varies',
      useCase: 'Ideal for consultations, development, or flexible projects',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      id: 'fixed-price',
      icon: '🎯',
      title: 'Fixed-Price Project Contract',
      description: 'Set price for a specific deliverable',
      useCase: 'Great for websites, designs, or defined scope projects',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      id: 'retainer',
      icon: '📅',
      title: 'Monthly Retainer Agreement',
      description: 'Recurring monthly payments for ongoing work',
      useCase: 'Perfect for marketing, maintenance, or ongoing services',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'Design Services Agreement',
      description: 'Specialized for creative and design work',
      useCase: 'Logos, branding, web design, or creative projects',
      color: 'hover:bg-pink-50 hover:border-pink-200'
    },
    {
      id: 'development',
      icon: '💻',
      title: 'Development Services Contract',
      description: 'Work with milestones and deliverables',
      useCase: 'Apps, websites, software, or technical implementations',
      color: 'hover:bg-indigo-50 hover:border-indigo-200'
    },
    {
      id: 'maintenance',
      icon: '🔧',
      title: 'Maintenance Agreement',
      description: 'Ongoing support and maintenance services',
      useCase: 'Website maintenance, app updates, or technical support',
      color: 'hover:bg-orange-50 hover:border-orange-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-blue-600 mb-6">
            PayMe
          </div>
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              What type of contract do you want to create?
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the template that best fits your project
          </p>
        </div>

        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Template Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <Link 
                key={template.id}
                href={`/contract/create?template=${template.id}`}
              >
                <Card className={`group cursor-pointer bg-white transition-all duration-200 hover:shadow-lg hover:scale-105 ${template.color} border-2 border-transparent`}>
                  <div className="p-6 text-center">
                    <div className="text-5xl mb-4">{template.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm font-medium">
                      {template.description}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {template.useCase}
                    </p>
                    <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Select Template
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-px bg-blue-600"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-px bg-blue-600"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <span className="ml-3">Step 3 of 3</span>
            </div>
            <p className="text-center text-gray-600 mt-3">
              Next: Customize your contract details
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}