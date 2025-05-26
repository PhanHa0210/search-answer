// File này để bạn dán dữ liệu từ Google Sheet vào
// Copy nội dung từ Google Sheet và paste vào đây theo format

export interface Question {
  id: number
  question: string
  answer: string
}

export interface QuestionsData {
  [key: string]: Question[]
}

// Template - Bạn thay thế nội dung này bằng dữ liệu thực từ Google Sheet
export const questionsData: QuestionsData = {
  P1: [
    // Dán dữ liệu P1 vào đây
    {
      id: 1,
      question:
        "Trong việc phân cấp chăm sóc người bệnh, điều dưỡng cần phải lưu ý điều gì khi phân chia các bệnh nhân?",
      answer: "Đáp án C: Phân cấp chăm sóc dựa trên tình trạng sức khỏe và mức độ nghiêm trọng của bệnh",
    },
    {
      id: 2,
      question: "Điều dưỡng có được phép xác định chẩn đoán điều dưỡng không?",
      answer: "Đáp án B: Có, và ưu tiên các chẩn đoán tác động trực tiếp đến tình trạng",
    },
    // Thêm các câu hỏi P1 khác vào đây...
  ],

  P2: [
    // Dán dữ liệu P2 vào đây
    {
      id: 3,
      question: "Nội dung nào sau đây không thuộc truyền thống, giáo dục sức khỏe?",
      answer: "Đáp án B: Hướng dẫn giải thích cam kết phẫu thuật",
    },
    // Thêm các câu hỏi P2 khác vào đây...
  ],

  P3: [
    // Dán dữ liệu P3 vào đây
    {
      id: 4,
      question: "Khi đánh giá kết quả, điều dưỡng có được điều chỉnh can thiệp chăm sóc không?",
      answer: "Đáp án B: Có, trong phạm vi chuyên môn",
    },
    // Thêm các câu hỏi P3 khác vào đây...
  ],

  P4: [
    // Dán dữ liệu P4 vào đây
    {
      id: 5,
      question: "Nhiệm vụ nào sau đây thuộc về Hội đồng điều dưỡng?",
      answer: "Đáp án B: Tham mưu cho giám đốc về kế hoạch phát triển điều dưỡng",
    },
    // Thêm các câu hỏi P4 khác vào đây...
  ],

  P5: [
    // Dán dữ liệu P5 vào đây
    {
      id: 6,
      question: "Theo Thông tư 31/2021/TT-BYT, điều dưỡng viên có vai trò gì trong việc nhận định người bệnh?",
      answer: "Đáp án B: Khám, nhận định tình trạng sức khỏe và nhu cầu cơ bản của người bệnh",
    },
    // Thêm các câu hỏi P5 khác vào đây...
  ],
}
