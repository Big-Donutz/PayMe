"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ContractCreate() {
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'hourly'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Get form data
    const formData = new FormData(e.currentTarget)
    
    // Collect all form data
    const contractData = {
      template,
      projectTitle: formData.get('projectTitle'),
      projectDescription: formData.get('projectDescription'),
      
      // Template-specific fields
      hourlyRate: formData.get('hourlyRate'),
      estimatedHours: formData.get('estimatedHours'),
      paymentTerms: formData.get('paymentTerms'),
      invoiceFrequency: formData.get('invoiceFrequency'),
      
      projectTotal: formData.get('projectTotal') || formData.get('designTotal') || formData.get('developmentTotal'),
      paymentSchedule: formData.get('paymentSchedule'),
      projectStart: formData.get('projectStart'),
      projectDeadline: formData.get('projectDeadline'),
      deliverables: formData.get('deliverables'),
      
      monthlyFee: formData.get('monthlyFee') || formData.get('maintenanceFee'),
      hoursIncluded: formData.get('hoursIncluded'),
      overageRate: formData.get('overageRate') || formData.get('additionalWorkRate'),
      contractLength: formData.get('contractLength'),
      billingDate: formData.get('billingDate'),
      
      designType: formData.get('designType'),
      revisions: formData.get('revisions'),
      additionalRevisionRate: formData.get('additionalRevisionRate'),
      deliverableFormats: formData.get('deliverableFormats'),
      usageRights: formData.get('usageRights'),
      
      developmentType: formData.get('developmentType'),
      milestones: formData.get('milestones'),
      techStack: formData.get('techStack'),
      hosting: formData.get('hosting'),
      sourceCode: formData.get('sourceCode'),
      
      maintenanceType: formData.get('maintenanceType'),
      responseTime: formData.get('responseTime'),
      servicesIncluded: formData.get('servicesIncluded'),
      emergencySupport: formData.get('emergencySupport'),
      
      cancellationPolicy: formData.get('cancellationPolicy'),
      additionalTerms: formData.get('additionalTerms')
    }

    // Store in sessionStorage and redirect
    sessionStorage.setItem('contractData', JSON.stringify(contractData))
    window.location.href = '/contract/preview'
  }

  const templateInfo = {
    hourly: {
      icon: '⏰',
      title: 'Hourly Consulting Agreement',
      description: 'Perfect for ongoing work where time varies'
    },
    'fixed-price': {
      icon: '🎯',
      title: 'Fixed-Price Project Contract',
      description: 'Set price for a specific deliverable'
    },
    retainer: {
      icon: '📅',
      title: 'Monthly Retainer Agreement',
      description: 'Recurring monthly payments for ongoing work'
    },
    design: {
      icon: '🎨',
      title: 'Design Services Agreement',
      description: 'Specialized for creative and design work'
    },
    development: {
      icon: '💻',
      title: 'Development Services Contract',
      description: 'Work with milestones and deliverables'
    },
    maintenance: {
      icon: '🔧',
      title: 'Maintenance Agreement',
      description: 'Ongoing support and maintenance services'
    }
  }

  const currentTemplate = templateInfo[template as keyof typeof templateInfo] || templateInfo.hourly

  const renderTemplateFields = () => {
    switch(template) {
      case 'hourly':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Hourly Rate & Terms
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">
                  Hourly Rate <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    placeholder="150"
                    className="h-11 pl-8"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours (Optional)</Label>
                <Input 
                  id="estimatedHours"
                  name="estimatedHours"
                  type="number"
                  placeholder="40"
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select name="paymentTerms" defaultValue="net15">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net15">Net 15 days</SelectItem>
                  <SelectItem value="net30">Net 30 days</SelectItem>
                  <SelectItem value="due-on-receipt">Due on receipt</SelectItem>
                  <SelectItem value="weekly">Weekly invoicing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceFrequency">Invoice Frequency</Label>
              <Select name="invoiceFrequency" defaultValue="monthly">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="project-end">At project completion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'fixed-price':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Project Details & Pricing
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="projectTotal">
                Total Project Cost <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input 
                  id="projectTotal"
                  name="projectTotal"
                  type="number"
                  placeholder="5000"
                  className="h-11 pl-8"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentSchedule">Payment Schedule</Label>
              <Select name="paymentSchedule" defaultValue="50-50">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100-upfront">100% upfront</SelectItem>
                  <SelectItem value="50-50">50% upfront, 50% on completion</SelectItem>
                  <SelectItem value="33-33-33">33% upfront, 33% midway, 33% completion</SelectItem>
                  <SelectItem value="25-75">25% upfront, 75% on completion</SelectItem>
                  <SelectItem value="milestone">Custom milestone schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectStart">Project Start Date</Label>
                <Input 
                  id="projectStart"
                  name="projectStart"
                  type="date"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectDeadline">Project Deadline</Label>
                <Input 
                  id="projectDeadline"
                  name="projectDeadline"
                  type="date"
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverables">
                Project Deliverables <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                id="deliverables"
                name="deliverables"
                placeholder="List the specific deliverables and what's included..."
                className="resize-none"
                rows={4}
                required
              />
            </div>
          </div>
        )

      case 'retainer':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Retainer Terms
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyFee">
                  Monthly Retainer Fee <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="monthlyFee"
                    name="monthlyFee"
                    type="number"
                    placeholder="5000"
                    className="h-11 pl-8"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hoursIncluded">Hours Included Per Month</Label>
                <Input 
                  id="hoursIncluded"
                  name="hoursIncluded"
                  type="number"
                  placeholder="40"
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overageRate">Overage Rate (per hour)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input 
                  id="overageRate"
                  name="overageRate"
                  type="number"
                  placeholder="150"
                  className="h-11 pl-8"
                />
              </div>
              <p className="text-sm text-gray-500">
                Rate charged for hours beyond the monthly allocation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractLength">Contract Length</Label>
                <Select name="contractLength" defaultValue="6-months">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">3 months</SelectItem>
                    <SelectItem value="6-months">6 months</SelectItem>
                    <SelectItem value="12-months">12 months</SelectItem>
                    <SelectItem value="ongoing">Ongoing (30-day notice)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingDate">Monthly Billing Date</Label>
                <Select name="billingDate" defaultValue="1st">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st of month</SelectItem>
                    <SelectItem value="15th">15th of month</SelectItem>
                    <SelectItem value="last">Last day of month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 'design':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Design Project Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="designType">Design Type</Label>
              <Select name="designType" defaultValue="">
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select design type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logo">Logo Design</SelectItem>
                  <SelectItem value="branding">Brand Identity Package</SelectItem>
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="print">Print Design</SelectItem>
                  <SelectItem value="packaging">Packaging Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="designTotal">
                Total Project Cost <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input 
                  id="designTotal"
                  name="designTotal"
                  type="number"
                  placeholder="3000"
                  className="h-11 pl-8"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revisions">Revisions Included</Label>
                <Select name="revisions" defaultValue="3">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 revisions</SelectItem>
                    <SelectItem value="3">3 revisions</SelectItem>
                    <SelectItem value="5">5 revisions</SelectItem>
                    <SelectItem value="unlimited">Unlimited revisions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalRevisionRate">Additional Revision Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="additionalRevisionRate"
                    name="additionalRevisionRate"
                    type="number"
                    placeholder="150"
                    className="h-11 pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverableFormats">Deliverable Formats</Label>
              <Textarea 
                id="deliverableFormats"
                name="deliverableFormats"
                placeholder="e.g., AI, EPS, PNG, JPG files..."
                className="resize-none"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageRights">Usage Rights</Label>
              <Select name="usageRights" defaultValue="full-ownership">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-ownership">Full ownership transfer</SelectItem>
                  <SelectItem value="exclusive-license">Exclusive license</SelectItem>
                  <SelectItem value="non-exclusive">Non-exclusive license</SelectItem>
                  <SelectItem value="limited-use">Limited use license</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'development':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Development Project Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="developmentType">Development Type</Label>
              <Select name="developmentType" defaultValue="">
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select development type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-app">Web Application</SelectItem>
                  <SelectItem value="mobile-app">Mobile Application</SelectItem>
                  <SelectItem value="website">Website Development</SelectItem>
                  <SelectItem value="api">API Development</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Site</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="developmentTotal">
                Total Project Cost <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input 
                  id="developmentTotal"
                  name="developmentTotal"
                  type="number"
                  placeholder="15000"
                  className="h-11 pl-8"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestones">
                Project Milestones <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                id="milestones"
                name="milestones"
                placeholder="Milestone 1: Project setup and planning (20%)&#10;Milestone 2: Core functionality development (40%)&#10;Milestone 3: Testing and deployment (40%)"
                className="resize-none"
                rows={5}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="techStack">Technology Stack</Label>
                <Input 
                  id="techStack"
                  name="techStack"
                  placeholder="React, Node.js, MongoDB..."
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hosting">Hosting Requirements</Label>
                <Select name="hosting" defaultValue="client-provided">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client-provided">Client provides hosting</SelectItem>
                    <SelectItem value="developer-setup">Developer sets up hosting</SelectItem>
                    <SelectItem value="developer-manages">Developer manages hosting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceCode">Source Code Ownership</Label>
              <Select name="sourceCode" defaultValue="client-owns">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client-owns">Client owns all source code</SelectItem>
                  <SelectItem value="shared-ownership">Shared ownership</SelectItem>
                  <SelectItem value="developer-retains">Developer retains ownership</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Maintenance & Support Terms
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="maintenanceType">Maintenance Type</Label>
              <Select name="maintenanceType" defaultValue="">
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select maintenance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website Maintenance</SelectItem>
                  <SelectItem value="app">Application Maintenance</SelectItem>
                  <SelectItem value="server">Server Maintenance</SelectItem>
                  <SelectItem value="software">Software Support</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceFee">
                  Monthly Maintenance Fee <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input 
                    id="maintenanceFee"
                    name="maintenanceFee"
                    type="number"
                    placeholder="500"
                    className="h-11 pl-8"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responseTime">Response Time SLA</Label>
                <Select name="responseTime" defaultValue="24-hours">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4-hours">4 hours (business days)</SelectItem>
                    <SelectItem value="24-hours">24 hours</SelectItem>
                    <SelectItem value="48-hours">48 hours</SelectItem>
                    <SelectItem value="72-hours">72 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servicesIncluded">
                Services Included <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                id="servicesIncluded"
                name="servicesIncluded"
                placeholder="• Security updates and patches&#10;• Content updates (up to 2 hours/month)&#10;• Performance monitoring&#10;• Backup management&#10;• Technical support"
                className="resize-none"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencySupport">Emergency Support</Label>
              <Select name="emergencySupport" defaultValue="business-hours">
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business-hours">Business hours only</SelectItem>
                  <SelectItem value="extended">Extended hours (8am-8pm)</SelectItem>
                  <SelectItem value="24-7">24/7 support (+$200/month)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalWorkRate">Additional Work Rate</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input 
                  id="additionalWorkRate"
                  name="additionalWorkRate"
                  type="number"
                  placeholder="150"
                  className="h-11 pl-8"
                />
              </div>
              <p className="text-sm text-gray-500">
                Hourly rate for work beyond included services
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-blue-600 mb-6">
            PayMe
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">{currentTemplate.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {currentTemplate.title}
              </h1>
              <p className="text-lg text-gray-600">
                {currentTemplate.description}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <Link 
            href="/contract/template"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
        </div>

        {/* Contract Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Project Overview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Project Overview
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="projectTitle">
                    Project Title <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="projectTitle"
                    name="projectTitle"
                    type="text" 
                    placeholder="Website Redesign Project"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">
                    Project Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="projectDescription"
                    name="projectDescription"
                    placeholder="Describe the scope of work, objectives, and key requirements..."
                    className="resize-none"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Template-specific fields */}
              {renderTemplateFields()}

              {/* Contract Terms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Contract Terms
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                  <Select name="cancellationPolicy" defaultValue="30-day">
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14-day">14 days written notice</SelectItem>
                      <SelectItem value="30-day">30 days written notice</SelectItem>
                      <SelectItem value="no-cancellation">No cancellation allowed</SelectItem>
                      <SelectItem value="anytime">Cancellation anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                  <Textarea 
                    id="additionalTerms"
                    name="additionalTerms"
                    placeholder="Any additional terms, conditions, or special requirements..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Create Contract for Signature
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Review your contract before sending to your client
                </p>
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
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="ml-3">Contract Creation Complete</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}