"use client"
import { useState } from 'react'
import { X, Info, Map, Eye, Calendar, Users, ExternalLink, AlertTriangle } from 'lucide-react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">How the map works</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close help"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* View Modes Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              View Modes
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <strong>Standard:</strong> Shows visited countries (green), USA as home (blue), confirmed future visits (orange), and unvisited countries (gray).
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <strong>Chronological:</strong> Organizes by visit year with different colors for each year (2022-2025).
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <strong>Multiple Visits:</strong> Green for 1 visit, yellow for 2 visits, red for 3+ visits.
                </div>
              </div>
            </div>
          </section>

          {/* Interaction Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" />
              Map Interaction
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Hover:</strong> Over visited countries to see basic information.</p>
              <p><strong>Click:</strong> On visited countries to pin the tooltip and see all details.</p>
              <p><strong>Zoom:</strong> Use mouse wheel or pinch gestures to zoom.</p>
              <p><strong>Navigation:</strong> Drag to move the map around.</p>
            </div>
          </section>


          {/* Important Notes Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Important Notes
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="font-semibold text-yellow-800 mb-2">Visit Tracking Criteria</p>
                <p className="text-yellow-700">
                  This map only shows streams/videos where the <strong>primary objective was to explore the country</strong>. 
                  Some countries like the UK show 2 visits on the map, but Speed has been there many more times for other purposes 
                  (events, collaborations, etc.). These additional visits are hard to track comprehensively, so only main exploration trips are counted.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold text-blue-800 mb-2">Disputed Territories</p>
                <p className="text-blue-700">
                  Some regions visited by Speed involve territorial disputes. For example, he visited Northern Ireland, 
                  but Ireland is not marked as "visited" since Northern Ireland is internationally recognized as part of the UK. 
                  The map follows internationally recognized borders and nomenclature.
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Project</h3>
            <p className="text-gray-700">
              This interactive map tracks IShowSpeed's global travels, showing his destinations, visit dates, 
              and links to corresponding videos. The project is a tribute to fans who want to follow his worldwide journey 
              and discover the places he's explored on stream.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Got it, let's explore!
          </button>
        </div>
      </div>
    </div>
  )
} 