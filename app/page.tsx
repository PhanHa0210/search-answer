"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Database } from "lucide-react"

// Import dữ liệu từ file data
import { questionsData } from "@/data/questions-data"

export default function AnswerLookup() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("P1")

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return []

    const allQuestions = Object.values(questionsData).flat()
    return allQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const currentTabData = questionsData[activeTab] || []

  // Tính tổng số câu hỏi
  const totalQuestions = Object.values(questionsData).reduce((total, questions) => total + questions.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            Tra Cứu Đáp Án
          </h1>
          <p className="text-gray-600">Tìm kiếm câu hỏi và đáp án từ ngân hàng đề thi</p>
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
              Tìm Kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Nhập từ khóa để tìm kiếm câu hỏi hoặc đáp án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg p-4 h-12"
            />
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm.trim() && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Kết Quả Tìm Kiếm ({filteredResults.length} kết quả)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredResults.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không tìm thấy kết quả nào cho "{searchTerm}"</p>
              ) : (
                filteredResults.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="space-y-3">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Câu {item.id}
                        </Badge>
                        <p className="font-medium text-gray-900 leading-relaxed">{item.question}</p>
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                        <p className="text-green-800 font-medium">{item.answer}</p>
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
