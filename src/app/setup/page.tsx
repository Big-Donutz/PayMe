"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload, ArrowRight, X, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Setup() {
  const [logoFile, setLogoFile] = useState<string | null>(null)
  const [logoFileName, setLogoFileName] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size must be less than 2MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoFile(e.target?.result as string)
        setLogoFileName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoFileName("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Get form data
    const formData = new FormData(e.currentTarget)
    
    // Collect setup data
    const setupData = {
      businessName: formData.get('businessName'),
      website: formData.get('website'),
      address: formData.get('address'),
      logo: logoFile,
      logoFileName: logoFileName
    }

    // Store in sessionStorage and redirect
    sessionStorage.setItem('setupData', JSON.stringify(setupData))
    window.location.href = '/client/new'
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-blue-600 mb-6">
            PayMe
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tell us a little more about yourself
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add these details to make your contracts and invoices look more professional (all optional)
          </p>
        </div>

        {/* Back Button */}
        <div className="max-w-2xl mx-auto mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Setup Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Optional Business Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Optional Business Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input 
                    id="businessName"
                    name="businessName"
                    type="text" 
                    placeholder="Leave blank to use '[Your Name] Consulting'"
                    className="h-11"
                  />
                  <p className="text-sm text-gray-500">
                    This will appear on your contracts and invoices
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website"
                    name="website"
                    type="url" 
                    placeholder="https://yourwebsite.com"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address (Optional)</Label>
                  <Textarea 
                    id="address"
                    name="address"
                    placeholder="123 Main Street&#10;City, State 12345"
                    className="resize-none"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    Used on invoices for professional appearance
                  </p>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Logo (Optional)</Label>
                  {!logoFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={logoFile} 
                            alt="Logo preview" 
                            className="w-12 h-12 object-contain rounded border"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{logoFileName}</p>
                            <p className="text-xs text-gray-500">Logo uploaded</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeLogo}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Complete Setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full h-12 text-lg"
                  onClick={() => {
                    // Skip setup but still store empty data
                    sessionStorage.setItem('setupData', JSON.stringify({}))
                    window.location.href = '/client/new'
                  }}
                >
                  Skip for Now
                </Button>
              </div>
            </form>

            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-8 h-px bg-blue-600"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <span className="ml-3">Step 1 of 3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}