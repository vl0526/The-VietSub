export interface Video {
  id: string;
  title: string;
  category: string;
  date: string;
  views: string;
  description?: string;
  thumbnail?: string;
}

export const CATEGORIES = ["Tất cả", "Hệ Thống", "Tu Tiên", "Trọng Sinh", "Báo Thù", "Xuyên Không", "Huyền Huyễn"];

export const VIDEOS: Video[] = [
  {
    id: "ZM0ictfJu5M",
    title: "Full (Tập 1-40) | Hệ Thống Nghèo Rớt Mồng Tơi Tôi Là Thần Tài Của Các Tỷ Phú",
    category: "Hệ Thống",
    date: "11 giờ trước",
    views: "2K",
    description: "Câu chuyện về một chàng trai nghèo khổ bất ngờ nhận được hệ thống Thần Tài, giúp anh trở thành người giàu nhất thế giới."
  },
  {
    id: "edOyad5H3MA",
    title: "Full (Tập 1-25) | Kỷ Nguyên Bệnh Biến Giáng Lâm Tôi Là Siêu Bệnh Thần Mạnh Nhất",
    category: "Hệ Thống",
    date: "15 giờ trước",
    views: "3K",
    description: "Thế giới lâm vào cảnh tận thế bệnh biến, nhân vật chính thức tỉnh hệ thống Bệnh Thần để cứu rỗi nhân loại."
  },
  {
    id: "E8i-y9G72Ac",
    title: "Full (Tập 1-40) | Vạn Cổ Bạo Quân Giáng Lâm",
    category: "Tu Tiên",
    date: "1 ngày trước",
    views: "9K",
    description: "Một bạo quân từ vạn cổ trước trọng sinh trở lại, quyết tâm tu luyện để thống trị tam giới một lần nữa."
  },
  {
    id: "j4f7L9D5Jlw",
    title: "Full (Tập 1-40) | Căn Nhà Này Không Phải Gia Đình Tôi",
    category: "Trọng Sinh",
    date: "1 ngày trước",
    views: "16K",
    description: "Sau khi bị gia đình phản bội, nhân vật chính trọng sinh để trả thù và tìm lại hạnh phúc thực sự."
  },
  {
    id: "RUw3sPQlE9I",
    title: "Full (Tập 1-90) | Con Đường Giang Hồ",
    category: "Báo Thù",
    date: "1 ngày trước",
    views: "32K",
    description: "Bản hùng ca về một lãng khách trên con đường báo thù cho gia tộc bị thảm sát."
  },
  {
    id: "fs7R_LMLOVg",
    title: "Full (Tập 1-50) | Tôi Ăn Thịt Yêu Thú Thành Thần",
    category: "Tu Tiên",
    date: "1 ngày trước",
    views: "24K",
    description: "Hành trình tu tiên độc lạ của một thiếu niên có khả năng thăng cấp sức mạnh bằng cách ăn thịt yêu thú."
  },
  {
    id: "LDZXIBrWfAQ",
    title: "Full (Tập 1-40) | Thiếu Gia Sát Thần Trở Về Báo Thù",
    category: "Báo Thù",
    date: "10 giờ trước",
    views: "5K",
    description: "Thiếu gia bị hãm hại, sau nhiều năm tu luyện sát thần công pháp đã trở về quét sạch kẻ thù."
  },
  {
    id: "zrQ4qp4l6Pc",
    title: "Sinh Tồn Xe Buýt Xuyên Không Cùng 41 Đại Mỹ Nữ (Full End)",
    category: "Xuyên Không",
    date: "4 ngày trước",
    views: "30K",
    description: "Một chuyến xe buýt bất ngờ xuyên không đến dị giới, nơi nhân vật chính phải dẫn dắt mọi người sinh tồn."
  },
  {
    id: "JC8gioBkC2s",
    title: "Full (Tập 1-40) | Hệ Thống Giao Hàng Vạn Giới",
    category: "Hệ Thống",
    date: "7 ngày trước",
    views: "46K",
    description: "Shipper xuyên không qua các thế giới để giao hàng và nhận được những phần thưởng vô tiền khoáng hậu."
  },
  {
    id: "VdU6IlXVSbA",
    title: "Full (Tập 1-60) | Thức Tỉnh Thiên Phú Vạn Cổ Song Tôi Là Võ Giả Cửu Giai Mạnh Nhất",
    category: "Tu Tiên",
    date: "11/02/2026",
    views: "28K",
    description: "Thức tỉnh thiên phú hiếm có, nhân vật chính từng bước trở thành võ giả mạnh nhất cửu giai."
  },
  {
    id: "Wo-3cx4r6xE",
    title: "Full (Tập 1-40) | Hệ Thống Đại Y Cấp Thần",
    category: "Hệ Thống",
    date: "21/01/2026",
    views: "182K",
    description: "Sở hữu hệ thống y thuật thần cấp, nhân vật chính cứu người lấy đức, vang danh thiên hạ."
  },
  {
    id: "DY1jIqsMzhk",
    title: "Full (Tập 1-50) | Hệ Thống Ngộ Tính Nghịch Thiên SSS",
    category: "Hệ Thống",
    date: "Gần đây",
    views: "50K",
    description: "Với ngộ tính cấp SSS, mọi công pháp tu luyện đều trở nên dễ dàng như trở bàn tay."
  },
  {
    id: "Hul8KgBuewc",
    title: "Full Version | Hệ Thống Nhập Vai Cấp SSS",
    category: "Hệ Thống",
    date: "20 ngày trước",
    views: "70K",
    description: "Sở hữu hệ thống nhập vai cấp SSS, nhân vật chính có thể biến thân thành bất kỳ ai để thực hiện nhiệm vụ."
  },
  {
    id: "ArsRNBHtAu0",
    title: "Full (Tập 1-40) | Vòng Lặp Tử Thần - Tôi Là Thợ Săn Kẻ Phản Bội",
    category: "Hệ Thống",
    date: "6 ngày trước",
    views: "40K",
    description: "Mắc kẹt trong vòng lặp thời gian, nhân vật chính phải tìm ra và tiêu diệt kẻ phản bội để thoát ra."
  }
];
