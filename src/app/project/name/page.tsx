"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, FolderPlus, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ProjectName() {
  const [projectName, setProjectName] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Get form data
    const formData = new FormData(e.currentTarget)
    
    const projectData = {
      name: formData.get('projectName') || projectName,
      createdAt: new Date().toISOString()
    }

    // Store project data
    sessionStorage.setItem('projectData', JSON.stringify(projectData))
    
    // Redirect to dashboard to choose contract or invoice
    window.location.href = '/dashboard'
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
            <FolderPlus className="w-8 h-8 text-gray-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              What is the name of this project?
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This will help organize your contracts and invoices
          </p>
        </div>

        {/* Back Button */}
        <div className="max-w-xl mx-auto mb-6">
          <Link 
            href="/client/new"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Client Details
          </Link>
        </div>

        {/* Project Name Form */}
        <div className="max-w-xl mx-auto">
          <Card className="bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="projectName"
                  name="projectName"
                  type="text" 
                  placeholder="Website Redesign"
                  className="h-12 text-lg"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  autoFocus
                />
                <p className="text-sm text-gray-500">
                  Examples: "Website Redesign", "Q1 Marketing Campaign", "Mobile App Development"
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={!projectName.trim()}
                >
                  Create Project
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
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="ml-3">Setup Complete</span>
              </div>
              <p className="text-center text-gray-600 mt-3">
                Next: Choose to create a contract or invoice
              </p>
            </div>
          </Card>
        </div>

        {/* Preview of what happens next */}
        <div className="max-w-xl mx-auto mt-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium">
              Your project will be organized in your dashboard with all related contracts and invoices
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}