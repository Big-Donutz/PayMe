"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, FileText, Edit3, Send, Save } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function ContractPreview() {
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'hourly'

  // State to handle client-side data loading
  const [contractData, setContractData] = useState({
    template: template,
    projectTitle: "",
    projectDescription: "",
    hourlyRate: 0,
    estimatedHours: 0,
    paymentTerms: "Net 15 days",
    projectTotal: 0,
    projectStart: "",
    projectDeadline: ""
  })

  const [userData, setUserData] = useState({
    contractorName: "Your Name",
    contractorBusiness: "Your Consulting LLC", 
    contractorEmail: "you@example.com",
    contractorAddress: "123 Business St\nCity, State 12345",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    businessName: "Smith Marketing Agency"
  })

  const [isLoading, setIsLoading] = useState(true)

  // Load data on client side to avoid hydration mismatch
  useEffect(() => {
    const storedContractData = sessionStorage.getItem('contractData')
    if (storedContractData) {
      setContractData(JSON.parse(storedContractData))
    }
    
    // Load user data from previous steps
    const storedSetupData = sessionStorage.getItem('setupData')
    const storedClientData = sessionStorage.getItem('clientData')
    const storedProjectData = sessionStorage.getItem('projectData')
    
    if (storedSetupData || storedClientData) {
      const setupData = storedSetupData ? JSON.parse(storedSetupData) : {}
      const clientData = storedClientData ? JSON.parse(storedClientData) : {}
      const projectData = storedProjectData ? JSON.parse(storedProjectData) : {}
      
      setUserData({
        contractorName: "Your Name", // Would come from user session
        contractorBusiness: setupData.businessName || "Your Consulting LLC",
        contractorEmail: "you@example.com", // Would come from user session
        contractorAddress: setupData.address || "123 Business St\nCity, State 12345",
        contractorWebsite: setupData.website || "",
        contractorLogo: setupData.logo || null,
        clientName: clientData.clientName || "John Smith",
        clientEmail: clientData.clientEmail || "john@example.com",
        businessName: clientData.businessName || "Smith Marketing Agency",
        clientAddress: clientData.clientAddress || "",
        projectName: projectData.name || "New Project"
      })
    }
    
    setIsLoading(false)
  }, [])

  // Show loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading contract preview...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const renderContractContent = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })

    return (
      <div className="space-y-8 text-gray-800 leading-relaxed">
        
        {/* Contract Header */}
        <div className="border-b pb-6">
          <div className="flex items-start justify-between mb-4">
            {userData.contractorLogo && (
              <img 
                src={userData.contractorLogo} 
                alt="Company Logo" 
                className="h-16 w-auto object-contain"
              />
            )}
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900">{userData.contractorBusiness}</h2>
              {userData.contractorWebsite && (
                <p className="text-sm text-gray-600">{userData.contractorWebsite}</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {contractData.template === 'hourly' && 'HOURLY CONSULTING AGREEMENT'}
              {contractData.template === 'fixed-price' && 'FIXED-PRICE PROJECT AGREEMENT'}
              {contractData.template === 'retainer' && 'MONTHLY RETAINER AGREEMENT'}
              {contractData.template === 'design' && 'DESIGN SERVICES AGREEMENT'}
              {contractData.template === 'development' && 'DEVELOPMENT SERVICES AGREEMENT'}
              {contractData.template === 'maintenance' && 'MAINTENANCE & SUPPORT AGREEMENT'}
            </h1>
            <p className="text-gray-600">Contract Date: {currentDate}</p>
            <p className="text-lg font-semibold text-blue-600 mt-2">Project: {userData.projectName}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">SERVICE PROVIDER</h3>
            <div className="space-y-1">
              <p className="font-medium">{userData.contractorBusiness}</p>
              <p>{userData.contractorName}</p>
              <p>{userData.contractorEmail}</p>
              {userData.contractorWebsite && <p className="text-blue-600">{userData.contractorWebsite}</p>}
              <div className="whitespace-pre-line text-sm text-gray-600">
                {userData.contractorAddress}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">CLIENT</h3>
            <div className="space-y-1">
              <p className="font-medium">{userData.businessName}</p>
              <p>{userData.clientName}</p>
              <p>{userData.clientEmail}</p>
              {userData.clientAddress && (
                <div className="whitespace-pre-line text-sm text-gray-600">
                  {userData.clientAddress}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">PROJECT DETAILS</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Project Title:</h4>
              <p>{contractData.projectTitle}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Project Description:</h4>
              <p>{contractData.projectDescription}</p>
            </div>
            {contractData.projectStart && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Start Date:</h4>
                  <p>{formatDate(contractData.projectStart)}</p>
                </div>
                {contractData.projectDeadline && (
                  <div>
                    <h4 className="font-medium text-gray-900">Target Completion:</h4>
                    <p>{formatDate(contractData.projectDeadline)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Payment Terms - Template Specific */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">PAYMENT TERMS</h3>
          {contractData.template === 'hourly' && (
            <div className="space-y-2">
              <p><strong>Hourly Rate:</strong> ${contractData.hourlyRate}/hour</p>
              {contractData.estimatedHours && <p><strong>Estimated Hours:</strong> {contractData.estimatedHours} hours</p>}
              {contractData.hourlyRate && contractData.estimatedHours && (
                <p><strong>Estimated Total:</strong> ${Number(contractData.hourlyRate) * Number(contractData.estimatedHours)}</p>
              )}
              <p><strong>Payment Terms:</strong> {contractData.paymentTerms || 'Net 15 days'}</p>
              <p><strong>Invoicing:</strong> {contractData.invoiceFrequency || 'Monthly'} invoicing for hours worked</p>
            </div>
          )}
          {contractData.template === 'fixed-price' && (
            <div className="space-y-2">
              <p><strong>Total Project Cost:</strong> ${contractData.projectTotal}</p>
              <p><strong>Payment Schedule:</strong> {contractData.paymentSchedule || '50% upfront, 50% on completion'}</p>
              <p><strong>Payment Terms:</strong> {contractData.paymentTerms || 'Net 15 days'}</p>
              {contractData.deliverables && (
                <div>
                  <p><strong>Deliverables:</strong></p>
                  <p className="text-sm whitespace-pre-line pl-4">{contractData.deliverables}</p>
                </div>
              )}
            </div>
          )}
          {contractData.template === 'retainer' && (
            <div className="space-y-2">
              <p><strong>Monthly Retainer Fee:</strong> ${contractData.monthlyFee}</p>
              {contractData.hoursIncluded && <p><strong>Hours Included:</strong> {contractData.hoursIncluded} hours/month</p>}
              {contractData.overageRate && <p><strong>Overage Rate:</strong> ${contractData.overageRate}/hour</p>}
              <p><strong>Contract Length:</strong> {contractData.contractLength || '6 months'}</p>
              <p><strong>Billing Date:</strong> {contractData.billingDate || '1st'} of each month</p>
            </div>
          )}
          {contractData.template === 'design' && (
            <div className="space-y-2">
              <p><strong>Design Type:</strong> {contractData.designType || 'Custom Design'}</p>
              <p><strong>Total Project Cost:</strong> ${contractData.projectTotal}</p>
              <p><strong>Revisions Included:</strong> {contractData.revisions || '3'} revisions</p>
              {contractData.additionalRevisionRate && <p><strong>Additional Revision Rate:</strong> ${contractData.additionalRevisionRate}/revision</p>}
              {contractData.deliverableFormats && <p><strong>Deliverable Formats:</strong> {contractData.deliverableFormats}</p>}
              <p><strong>Usage Rights:</strong> {contractData.usageRights || 'Full ownership transfer'}</p>
            </div>
          )}
          {contractData.template === 'development' && (
            <div className="space-y-2">
              <p><strong>Development Type:</strong> {contractData.developmentType || 'Custom Development'}</p>
              <p><strong>Total Project Cost:</strong> ${contractData.projectTotal}</p>
              {contractData.techStack && <p><strong>Technology Stack:</strong> {contractData.techStack}</p>}
              {contractData.hosting && <p><strong>Hosting:</strong> {contractData.hosting}</p>}
              <p><strong>Source Code Ownership:</strong> {contractData.sourceCode || 'Client owns all source code'}</p>
              {contractData.milestones && (
                <div>
                  <p><strong>Project Milestones:</strong></p>
                  <p className="text-sm whitespace-pre-line pl-4">{contractData.milestones}</p>
                </div>
              )}
            </div>
          )}
          {contractData.template === 'maintenance' && (
            <div className="space-y-2">
              <p><strong>Maintenance Type:</strong> {contractData.maintenanceType || 'Comprehensive Support'}</p>
              <p><strong>Monthly Fee:</strong> ${contractData.monthlyFee}</p>
              <p><strong>Response Time:</strong> {contractData.responseTime || '24 hours'}</p>
              <p><strong>Emergency Support:</strong> {contractData.emergencySupport || 'Business hours only'}</p>
              {contractData.overageRate && <p><strong>Additional Work Rate:</strong> ${contractData.overageRate}/hour</p>}
              {contractData.servicesIncluded && (
                <div>
                  <p><strong>Services Included:</strong></p>
                  <p className="text-sm whitespace-pre-line pl-4">{contractData.servicesIncluded}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legal Terms */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">TERMS & CONDITIONS</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">1. Scope of Work</h4>
              <p>The Service Provider agrees to perform the services described in the Project Details section above. Any changes to the scope of work must be agreed upon in writing by both parties.</p>
            </div>
            
            <div>
              <h4 className="font-medium">2. Payment Terms</h4>
              <p>Payment is due according to the payment schedule outlined above. Late payments may incur a 1.5% monthly service charge.</p>
            </div>
            
            <div>
              <h4 className="font-medium">3. Intellectual Property</h4>
              <p>Upon full payment, all work product created specifically for this project will be owned by the Client. The Service Provider retains ownership of any pre-existing intellectual property and general methodologies.</p>
            </div>
            
            <div>
              <h4 className="font-medium">4. Cancellation</h4>
              <p>Either party may terminate this agreement with {contractData.cancellationPolicy === '14-day' ? '14 days' : contractData.cancellationPolicy === '30-day' ? '30 days' : contractData.cancellationPolicy === 'no-cancellation' ? 'no cancellation allowed' : contractData.cancellationPolicy === 'anytime' ? 'immediate' : '30 days'} written notice. Client agrees to pay for all work completed up to the termination date.</p>
            </div>
            
            {contractData.additionalTerms && (
              <div>
                <h4 className="font-medium">6. Additional Terms</h4>
                <p className="whitespace-pre-line">{contractData.additionalTerms}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium">5. Limitation of Liability</h4>
              <p>The Service Provider's liability shall not exceed the total amount paid under this agreement.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-600 mb-6">
            PayMe
          </div>
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Contract Preview
              </h1>
              <p className="text-lg text-gray-600">
                Review your contract before signing
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <Link 
            href={`/contract/create?template=${template}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit Contract
          </Link>
        </div>

        {/* Contract Document */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white p-12 shadow-lg">
            {renderContractContent()}
            
            {/* Signature Section */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">SIGNATURES</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contractor Signature */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Service Provider</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="contractorSignature">Digital Signature</Label>
                      <Input 
                        id="contractorSignature"
                        name="contractorSignature"
                        type="text"
                        placeholder="Type your full name to sign"
                        className="h-12 font-serif text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contractorDate">Date</Label>
                      <Input 
                        id="contractorDate"
                        name="contractorDate"
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Client Signature (Preview) */}
                <div className="space-y-4 opacity-50">
                  <h4 className="font-medium text-gray-900">Client</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Digital Signature</Label>
                      <div className="h-12 border border-gray-200 rounded-md bg-gray-50 flex items-center px-3 text-gray-400">
                        Client will sign here
                      </div>
                    </div>
                    <div>
                      <Label>Date</Label>
                      <div className="h-12 border border-gray-200 rounded-md bg-gray-50 flex items-center px-3 text-gray-400">
                        Client will date here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                type="button"
                variant="outline"
                className="h-12 text-lg"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Contract
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="h-12 text-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Save as Draft
              </Button>
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <Send className="w-5 h-5 mr-2" />
              Sign & Send to Client
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Your client will receive an email with the contract to review and sign
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}