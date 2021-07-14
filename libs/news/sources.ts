export type SourceId =
  | "cafebiz"
  | "cafef"
  | "laodong"
  | "nhandan"
  | "soha"
  | "thanhnien"
  | "tinhte"
  | "tuoitre"
  | "vietcetera"
  | "vietnambiz"
  | "vietnamnet"
  | "vnexpress"
  | "vtv";

export type Category =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

type Language = "en" | "vi";

type Country = "vn";

export type Source = {
  id: SourceId;
  name: string;
  url: string;
  description?: string;
  content?: string;
  category?: Category;
  language?: Language;
  country?: Country;
  categories?: Record<Category, string>;
};

export type Article = {
  source: Source;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export const sources: Array<Source> = [
  {
    id: "cafebiz",
    name: "CafeBiz",
    url: "https://cafebiz.vn/",
    description:
      "Phân tích, bình luận chuyên sâu về môi trường kinh doanh. Các câu chuyện thú vị về các doanh nhân Việt Nam và thế giới.",
    category: "business",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://cafebiz.vn/kinh-te-vi-mo.rss",
      entertainment: "",
      general: "",
      health: "https://cafebiz.vn/suc-khoe.rss",
      technology: "https://cafebiz.vn/cong-nghe.rss",
      science: "https://cafebiz.vn/khoa-hoc.rss",
      sports: "",
    },
  },
  {
    id: "cafef",
    name: "CafeF",
    description:
      "Kênh tin tức kinh tế, tài chính, thông tin chứng khoán của Việt Nam mới nhất được cập nhật liên tục, chính xác và đầy đủ,chuyên sâu.",
    url: "https://cafef.vn",
    category: "business",
    language: "vi",
    country: "vn",
    categories: {
      business: "",
      entertainment: "",
      general: "",
      health: "",
      technology: "",
      science: "",
      sports: "",
    },
  },
  {
    id: "laodong",
    name: "Lao Động",
    description:
      "Báo LAO ĐỘNG điện tử - LAODONG.VN cung cấp tin tức 24h thời sự, chính trị, kinh tế, văn hóa, xã hội, công đoàn, người lao động nhanh nhất và tin cậy nhất",
    url: "https://laodong.vn/",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "",
      entertainment: "",
      general: "https://laodong.vn/rss/home.rss",
      health: "",
      technology: "",
      science: "",
      sports: "",
    },
  },
  {
    id: "nhandan",
    name: "Nhân Dân",
    description:
      "Nhan Dan Online brings you the latest news from Vietnam, find breaking news, opinion on Vietnam's politics, business, society, culture, sports, travel and technology.",
    url: "https://en.nhandan.vn/",
    category: "general",
    language: "en",
    country: "vn",
    categories: {
      business: "",
      entertainment: "",
      general: "",
      health: "",
      technology: "",
      science: "",
      sports: "",
    },
  },
  {
    id: "soha",
    name: "Soha",
    description:
      "Cập nhật tin tức sự kiện nóng, tin nhanh báo chí mới nhất VN & thế giới: Thời sự, Quân sự, Sức khỏe, Quốc tế, Thể thao, Giải trí, Kinh doanh, Cư dân mạng, khám phá, đời sô...",
    url: "https://soha.vn/",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://soha.vn/kinh-doanh.rss",
      entertainment: "https://soha.vn/giai-tri.rss",
      general: "https://soha.vn/thoi-su.rss",
      health: "https://soha.vn/song-khoe.rss",
      technology: "https://soha.vn/cong-nghe.rss",
      science: "",
      sports: "https://soha.vn/the-thao.rss",
    },
  },
  {
    id: "thanhnien",
    name: "Thanh Niên",
    description:
      "Tin tức 24h, đọc báo TN cập nhật tin nóng online Việt Nam và thế giới mới nhất trong ngày, tin nhanh thời sự, chính trị, xã hội hôm nay, tin tức chính thống VN",
    url: "https://thanhnien.vn",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://thanhnien.vn/rss/tai-chinh-kinh-doanh.rss",
      entertainment: "https://thanhnien.vn/rss/giai-tri.rss",
      general: "https://thanhnien.vn/rss/home.rss",
      health: "https://thanhnien.vn/rss/suc-khoe.rss",
      technology: "https://thanhnien.vn/rss/cong-nghe.rss",
      science: "",
      sports: "https://thethao.thanhnien.vn/rss/home.rss",
    },
  },
  {
    id: "tinhte",
    name: "Tinh Tế",
    description:
      "Cộng đồng công nghệ, thủ thuật, tư vấn về điện thoại, máy tính, camera, đồ điện gia dụng và âm thanh, khoa học kĩ thuật. Nơi giải đáp thắc mắc, hỏi đáp công nghệ.",
    url: "https://tinhte.vn",
    category: "technology",
    language: "vi",
    country: "vn",
    categories: {
      business: "",
      entertainment: "",
      general: "",
      health: "",
      technology: "https://tinhte.vn/rss",
      science: "",
      sports: "",
    },
  },
  {
    id: "tuoitre",
    name: "Tuổi Trẻ",
    description:
      "Tin tức nhanh - mới - nóng nhất đang diễn ra về: kinh tế, chính trị, xã hội, thế giới, giáo dục, thể thao, văn hóa, giải trí, công nghệ.",
    url: "https://tuoitre.vn/",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://tuoitre.vn/rss/kinh-doanh.rss",
      entertainment: "https://tuoitre.vn/rss/giai-tri.rss",
      general: "https://tuoitre.vn/rss/tin-moi-nhat.rss",
      health: "https://tuoitre.vn/rss/suc-khoe.rss",
      technology: "https://tuoitre.vn/rss/nhip-song-so.rss",
      science: "https://tuoitre.vn/rss/khoa-hoc.rss",
      sports: "https://tuoitre.vn/rss/the-thao.rss",
    },
  },
  {
    id: "vietnambiz",
    name: "VietnamBiz",
    description:
      "Thông tin thị trường tài chính, chứng khoán, doanh nghiệp, ngân hàng, vĩ mô, nhà đất, giá cả hàng hóa nguyên liệu, nông - lâm - thủy sản",
    url: "https://vietnambiz.vn/",
    category: "business",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://vietnambiz.vn/kinh-doanh.rss",
      entertainment: "",
      general: "https://vietnambiz.vn/trang-chu.rss",
      health: "",
      technology: "",
      science: "",
      sports: "",
    },
  },
  {
    id: "vietnamnet",
    name: "VietNamNet",
    description:
      "Đọc báo điện tử VietNamNet, cập nhật tin nhanh Việt Nam và thế giới. Sự kiện, tin báo mới trong ngày, kinh tế, xã hội, pháp luật 24h qua.",
    url: "https://vietnamnet.vn",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://vietnamnet.vn/rss/kinh-doanh.rss",
      entertainment: "https://vietnamnet.vn/rss/giai-tri.rss",
      general: "https://vietnamnet.vn/rss/tin-moi-nong.rss",
      health: "https://vietnamnet.vn/rss/suc-khoe.rss",
      technology: "https://vietnamnet.vn/rss/cong-nghe.rss",
      science: "",
      sports: "https://vietnamnet.vn/rss/the-thao.rss",
    },
  },
  {
    id: "vnexpress",
    name: "VnExpress",
    description:
      "VnExpress tin tức mới nhất - Thông tin nhanh & chính xác được cập nhật hàng giờ. Đọc báo tin tức online Việt Nam & Thế giới nóng nhất trong ngày về thể thao, thời sự, pháp luật, kinh doanh,...",
    url: "https://vnexpress.net",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://vnexpress.net/rss/kinh-doanh.rss",
      entertainment: "https://vnexpress.net/rss/giai-tri.rss",
      general: "https://vnexpress.net/rss/tin-moi-nhat.rss",
      health: "https://vnexpress.net/rss/suc-khoe.rss",
      technology: "https://vnexpress.net/rss/so-hoa.rss",
      science: "https://vnexpress.net/rss/khoa-hoc.rss",
      sports: "https://vnexpress.net/rss/the-thao.rss",
    },
  },
  {
    id: "vtv",
    name: "VTV",
    description:
      "Mời độc giả đón đọc tin tức thời sự về chính trị, kinh tế, đời sống, xã hội, pháp luật, thể thao, văn hoá, giải trí... Xem truyền hình trực tuyến, TV Online các kênh VTV trên Internet.",
    url: "https://vtv.vn",
    category: "general",
    language: "vi",
    country: "vn",
    categories: {
      business: "https://vtv.vn/kinh-te.rss",
      entertainment: "https://vtv.vn/van-hoa-giai-tri.rss",
      general: "https://vtv.vn/trong-nuoc.rss",
      health: "https://vtv.vn/doi-song/suc-khoe.rss",
      technology: "https://vtv.vn/cong-nghe.rss",
      science: "",
      sports: "https://vtv.vn/the-thao.rss",
    },
  },
];
