"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Database, Zap } from "lucide-react"
import { HighlightedText } from "@/components/highlighted-text"

// Import dữ liệu từ file data
import { questionsData } from "@/data/questions-data"
import { calculateRelevanceScore } from "@/utils/search-utils"

interface SearchResult {
  id: number
  question: string
  answer: string
  score: number
  tab: string
}

export default function AnswerLookup() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("P1")

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []

    const allQuestions: SearchResult[] = []

    // Collect all questions with their tab info
    Object.entries(questionsData).forEach(([tab, questions]) => {
      questions.forEach((question) => {
        allQuestions.push({
          ...question,
          tab,
          score: 0,
        })
      })
    })

    // Calculate relevance scores
    const scoredResults = allQuestions.map((item) => {
      const questionScore = calculateRelevanceScore(item.question, searchTerm)
      const answerScore = calculateRelevanceScore(item.answer, searchTerm) * 0.7 // Answer có trọng số thấp hơn

      return {
        ...item,
        score: questionScore + answerScore,
      }
    })

    // Filter and sort by relevance
    return scoredResults
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20) // Giới hạn 20 kết quả tốt nhất
  }, [searchTerm])

  const currentTabData = questionsData[activeTab] || []

  // Tính tổng số câu hỏi
  const totalQuestions = Object.values(questionsData).reduce((total, questions) => total + questions.length, 0)

  // Gợi ý tìm kiếm
  const searchSuggestions = [
    "chăm sóc người bệnh",
    "điều dưỡng",
    "phân cấp",
    "chẩn đoán",
    "can thiệp",
    "theo dõi",
    "hội đồng",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            NHM-C
          </h1>
          <p className="text-gray-600">Tìm kiếm thông minh câu hỏi và đáp án</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Database className="w-4 h-4" />
            <span>Tổng cộng: {totalQuestions} câu hỏi</span>
          </div>
        </div>

        {/* Search Box */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Tìm Kiếm Thông Minh
              <Zap className="w-4 h-4 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Nhập từ khóa để tìm kiếm (có thể gõ từng từ hoặc cụm từ)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg p-4 h-12"
            />

            {/* Search suggestions */}
            {!searchTerm && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Gợi ý tìm kiếm:</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchTerm(suggestion)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search tips */}
            {searchTerm && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                💡 <strong>Mẹo:</strong> Gõ từng từ riêng biệt để tìm chính xác hơn. Ví dụ: "chăm sóc bệnh nhân" thay vì
                "chămsócbệnhnhân"
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm.trim() && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Kết Quả Tìm Kiếm ({searchResults.length} kết quả)</span>
                {searchResults.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Sắp xếp theo độ liên quan
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {searchResults.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <p className="text-gray-500">Không tìm thấy kết quả nào cho "{searchTerm}"</p>
                  <div className="text-sm text-gray-400">
                    <p>Thử:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Gõ từng từ riêng biệt</li>
                      <li>Sử dụng từ khóa ngắn hơn</li>
                      <li>Kiểm tra chính tả</li>
                      <li>Thử các từ đồng nghĩa</li>
                    </ul>
                  </div>
                </div>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={`${item.tab}-${item.id}`}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.tab} - Câu {item.id}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Điểm: {item.score.toFixed(1)}
                        </Badge>
                      </div>
                      <div>
                        <HighlightedText
                          text={item.question}
                          query={searchTerm}
                          className="font-medium text-gray-900 leading-relaxed"
                        />
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                        <HighlightedText text={item.answer} query={searchTerm} className="text-green-800 font-medium" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs for P1-P5 */}
        {!searchTerm.trim() && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Danh Sách Câu Hỏi Theo Phần</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="P1">P1 ({questionsData.P1?.length || 0})</TabsTrigger>
                  <TabsTrigger value="P2">P2 ({questionsData.P2?.length || 0})</TabsTrigger>
                  <TabsTrigger value="P3">P3 ({questionsData.P3?.length || 0})</TabsTrigger>
                  <TabsTrigger value="P4">P4 ({questionsData.P4?.length || 0})</TabsTrigger>
                  <TabsTrigger value="P5">P5 ({questionsData.P5?.length || 0})</TabsTrigger>
                </TabsList>

                {Object.keys(questionsData).map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
                    {currentTabData.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        Chưa có dữ liệu cho phần {tab}. Vui lòng thêm dữ liệu vào file questions-data.ts
                      </p>
                    ) : (
                      currentTabData.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="space-y-3">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                Câu {item.id}
                              </Badge>
                              <p className="font-medium text-gray-900 leading-relaxed">{item.question}</p>
                            </div>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                              <p className="text-blue-800 font-medium">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
