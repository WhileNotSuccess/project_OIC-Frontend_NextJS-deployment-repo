import { Language } from "./common/types";

export const menu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    introduction: "소개",
    internationalAdmissions: "외국인 입학",
    globalProgram: "글로벌 프로그램",
    newsAndAnnouncements: "알림 및 공지사항",
    koreanLanguageEducationCenter: "한국어교육센터",
  },
  [Language.japanese]: {
    introduction: "紹介",
    internationalAdmissions: "外国人入学",
    globalProgram: "グローバルプログラム",
    newsAndAnnouncements: "ニュースとお知らせ",
    koreanLanguageEducationCenter: "韓国語教育センター",
  },
  [Language.english]: {
    introduction: "introduction",
    internationalAdmissions: "International Admissions",
    globalProgram: "Global Program",
    newsAndAnnouncements: "Notifications",
    koreanLanguageEducationCenter: "Korean Language Education Center",
  },
};

export const smallMenu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    introduction: "소개글",
    "staff-intro": "교직원 소개",
    "international-agreements": "국제협약현황",
    contact: "연락처",
    "admission-guide": "입학 안내",
    departmentInformation: "학과 안내",
    "campus-life": "캠퍼스 생활",
    "student-support": "학생 지원 서비스",
    dormitory: "기숙사 정보",
    resources: "자료실",
    "global-programs": "글로벌 프로그램",
    "global-internships": "글로벌 현장학습",
    "overseas-careers": "해외취업지원센터",
    news: "알림",
    notice: "공지사항",
    shortcut: "바로가기",
  },
  [Language.japanese]: {
    introduction: "紹介文",
    "staff-intro": "教職員紹介",
    "international-agreements": "国際協定状況",
    contact: "連絡先",
    "admission-guide": "入学案内",
    departmentInformation: "学科案内",
    "campus-life": "キャンパスライフ",
    "student-support": "学生支援サービス",
    dormitory: "寮情報",
    resources: "資料ダウンロード",
    "global-programs": "グローバルプログラム",
    "global-internships": "グローバル現場学習",
    "overseas-careers": "海外就職支援センター",
    news: "お知らせ",
    notice: "通知",
    shortcut: "ショートカット",
  },
  [Language.english]: {
    introduction: "introduction",
    "staff-intro": "Faculty And Staff Introduction",
    "international-agreements": "International Agreements Status",
    contact: "Contact Information",
    "admission-guide": "Admission Information",
    departmentInformation: "Department Information",
    "campus-life": "Campus Life",
    "student-support": "Student Support Services",
    dormitory: "Dormitory Information",
    resources: "Resources",
    "global-programs": "Global Program",
    "global-internships": "Global Field Study",
    "overseas-careers": "Overseas Employment Supporting",
    news: "Notifications",
    notice: "Announcements",
    shortcut: "Shortcut",
  },
};

export const staffPage: Record<Language, Record<string, string>> = {
  // 직원 소개 페이지
  [Language.korean]: {
    international: "국제교류원 소개",
    internationalTeam: "국제교류팀 소개",
    chinaCenter: "중국센터 소개",
  },
  [Language.japanese]: {
    international: "講師紹介",
    internationalTeam: "職員紹介",
    chinaCenter: "中国センター紹介",
  },
  [Language.english]: {
    international: "Faculty Introduction",
    internationalTeam: "Staff Introduction",
    chinaCenter: "Introduction to the China Center",
  },
};

export const editorCompo: Record<Language, Record<string, string>> = {
  // (임시) 글 업로드 하는 페이지에 사용될 메뉴들
  [Language.korean]: {
    submit: "제출",
    delete: "삭제",
    update: "수정",
    write: "작성",
    file: "파일",
    edit: "편집",
    view: "보기",
    insert: "삽입",
    format: "서식",
    table: "테이블",
    needInputTitle: "제목을 입력해주세요",
    needInputContent: "내용을 입력해주세요",
  },
  [Language.japanese]: {
    submit: "提出",
    delete: "削除",
    update: "修正",
    write: "作成",
    file: "ファイル",
    edit: "編集",
    view: "表示",
    insert: "挿入",
    format: "フォーマット",
    table: "テーブル",
    needInputTitle: "タイトルを入力してください。",
    needInputContent: "内容を入力してください。",
  },
  [Language.english]: {
    submit: "Submit",
    delete: "Delete",
    update: "Update",
    write: "Write",
    file: "File",
    edit: "Edit",
    view: "View",
    insert: "Insert",
    format: "Format",
    table: "Table",
    needInputTitle: "Please enter the title.",
    needInputContent: "Please enter the content.",
  },
};

export const homePage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    notice: "공지사항",
    download: "다운로드",
    "applied-to": "입학신청",
    "recruitment-guidelines": "모집요강",
    "Application-Form": "입학신청서",
    faq: "FAQ",
    review: "유학생 후기",
    footerAddress:
      "41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 한국어교육센터",
    footerCallEmail: "대표전화 : +82-53-940-5632 이메일 : intl@yju.ac.kr",
  },
  [Language.japanese]: {
    notice: "通知",
    download: "ダウンロード",
    "applied-to": "入学申請",
    "recruitment-guidelines": "募集要項",
    "Application-Form": "入学申請書",
    faq: "FAQ",
    review: "留学生の感想",
    footerAddress:
      "41527 大邱広域市 北区 復県路 35 (復県2洞 218) 永進専門大学 韓国語教育センター",
    footerCallEmail: "代表電話 : +82-53-940-5632 メール : intl@yju.ac.kr",
  },
  [Language.english]: {
    notice: "Notice",
    download: "Download",
    "applied-to": "Application for Admission",
    "recruitment-guidelines": "Admission Guidelines",
    "Application-Form": "Application for Admission",
    faq: "FAQ",
    review: "International Student Reviews",
    footerAddress:
      "41527 35 Bokhyeon-ro, Buk-gu, Daegu, Korea Yeungjin College Korean Language Education Center",
    footerCallEmail: "Phone: +82-53-940-5632 Email: intl@yju.ac.kr",
  },
};

export const updateError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    update: "글 수정에 실패했습니다.",
  },
  [Language.japanese]: {
    update: "記事の修正に失敗しました。",
  },
  [Language.english]: {
    update: "Failed to update post.",
  },
};

export const serverError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    server: "서버 오류가 발생했습니다.",
  },
  [Language.english]: {
    server: "A server error has occurred.",
  },
  [Language.japanese]: {
    server: "サーバーエラーが発生しました。",
  },
};

export const postSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentPost: "글 업로드에 성공했습니다.",
    appliedPost: "입학신청에 성공했습니다.",
  },
  [Language.japanese]: {
    contentPost: "記事のアップロードに成功しました。",
    appliedPost: "入学申請に成功しました。",
  },
  [Language.english]: {
    contentPost: "Successfully uploaded post.",
    appliedPost: "Successfully applied for admission.",
  },
};

export const updateSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    updatePost: "글 수정에 성공했습니다.",
  },
  [Language.japanese]: {
    updatePost: "記事の修正に成功しました。",
  },
  [Language.english]: {
    updatePost: "Successfully updated post.",
  },
};

export const koreanCurriculumList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "korean-outline", value: "개요" },
    { key: "korean-sample", value: "프로그램 샘플" },
  ],
  [Language.japanese]: [
    { key: "korean-outline", value: "概要" },
    { key: "korean-sample", value: "プログラムサンプル" },
  ],
  [Language.english]: [
    { key: "korean-outline", value: "Overview of Korean Language Program" },
    { key: "korean-sample", value: "Program Sample" },
  ],
};

export const boardMenu: Record<Language, Record<string, string>> = {
  // 게시판페이지 메뉴
  [Language.korean]: {
    review: "유학생 후기",
    "application-form": "신청 서류",
    "learning-materials": "학습 자료 안내",
    notice: "공지사항",
    news: "한국어교육센터 알림",
    faq: "FAQ",
    introduction: "한국어교육센터 소개",
    directions: "오시는 길",
    visa: "비자 안내",
    dormitory: "기숙사 안내",
    scholarship: "장학금 안내",
    facility: "학교 시설 안내",
    insurance: "건강 보험 안내",
    "korean-outline": "한국어교육과정 개요",
    "korean-sample": "한국어교육과정 프로그램 샘플",
    "opencampus-purpose": "오픈캠퍼스 목적",
    "opencampus-content": "오픈캠퍼스 일정 및 내용",
    "opencampus-schedule": "오픈캠퍼스 스케쥴",
    banner: "배너",
    "procedure-guide": "입학 신청의 절차 안내",
    guidelinesForApplicants: "모집요강",
    applicants: "입학신청서",
  },
  [Language.japanese]: {
    review: "留学生の感想",
    "application-form": "申請書類",
    "learning-materials": "学習資料案内",
    notice: "通知",
    news: "お知らせ",
    faq: "FAQ",
    introduction: "韓国語教育センター",
    directions: "アクセス",
    visa: "ビザ案内",
    dormitory: "寮案内",
    scholarship: "奨学金案内",
    facility: "学校施設案内",
    insurance: "健康保険案内",
    "korean-outline": "韓国語教育課程概要",
    "korean-sample": "韓国語教育課程プログラムサンプル",
    "opencampus-purpose": "オープンキャンパスの目的",
    "opencampus-content": "オープンキャンパスの内容",
    "opencampus-schedule": "オープンキャンパスのスケジュール",
    banner: "バナー",
    "procedure-guide": "入学申請手続き案内",
    guidelinesForApplicants: "募集要項",
    applicants: "入学申請書",
  },
  [Language.english]: {
    review: "International Student Reviews",
    "application-form": "Application Form",
    "learning-materials": "Learning Materials Guide",
    notice: "Notice",
    news: "Center News",
    faq: "FAQ",
    introduction: "Korean Education Center",
    directions: "Directions",
    visa: "Visa Information",
    dormitory: "Dormitory Information",
    scholarship: "Scholarship Information",
    facility: "School Facilities Guide",
    insurance: "Health Insurance Information",
    "korean-outline": "Overview of Korean Language Program",
    "korean-sample": "Sample Korean Language Program",
    "opencampus-purpose": "Purpose of Open Campus",
    "opencampus-content": "Open Campus Schedule and Details",
    "opencampus-schedule": "Open Campus Schedule",
    banner: "Banner",
    "procedure-guide": "Admission Procedure Guide",
    guidelinesForApplicants: "Application Guidelines",
    applicants: "Application Form",
  },
};

export const categoryList: Record<Language, { key: string; value: string }[]> =
{
  [Language.korean]: [
    { key: "introduction", value: "소개글" },
    { key: "staff-intro", value: "교직원 소개" },
    { key: "international-agreements", value: "국제협약현황" },
    { key: "contact", value: "연락처" },
    { key: "admission-guide", value: "입학 안내" },
    { key: "campus-life", value: "캠퍼스 생활" },
    { key: "student-support", value: "학생 지원 서비스" },
    { key: "dormitory", value: "기숙사 정보" },
    { key: "resources", value: "자료실" },
    { key: "globalPrograms", value: "글로벌 프로그램" },
    { key: "global-internships", value: "글로벌 현장학습" },
    { key: "overseas-careers", value: "해외취업지원센터" },
    { key: "news", value: "알림" },
    { key: "notice", value: "공지사항" },
  ],
  [Language.japanese]: [
    { key: "introduction", value: "紹介文" },
    { key: "staff-intro", value: "教職員紹介" },
    { key: "international-agreements", value: "国際協定状況" },
    { key: "contact", value: "連絡先" },
    { key: "admission-guide", value: "入学案内" },
    { key: "campus-life", value: "キャンパスライフ" },
    { key: "student-support", value: "学生支援サービス" },
    { key: "dormitory", value: "寮情報" },
    { key: "resources", value: "資料ダウンロード" },
    { key: "globalPrograms", value: "グローバルプログラム" },
    { key: "global-internships", value: "グローバル現場学習" },
    { key: "overseas-careers", value: "海外就職支援センター" },
    { key: "news", value: "お知らせ" },
    { key: "notice", value: "通知" },
  ],
  [Language.english]: [
    { key: "introduction", value: "introduction" },
    { key: "staff-intro", value: "Faculty And Staff Introduction" },
    { key: "international-agreements", value: "International Agreements Status" },
    { key: "contact", value: "Contact Information" },
    { key: "admission-guide", value: "Admission Information" },
    { key: "campus-life", value: "Campus Life" },
    { key: "student-support", value: "Student Support Services" },
    { key: "dormitory", value: "Dormitory Information" },
    { key: "resources", value: "Resources" },
    { key: "globalPrograms", value: "Global Program" },
    { key: "global-internships", value: "Global Field Study" },
    { key: "overseas-careers", value: "Overseas Employment Supporting" },
    { key: "news", value: "Notifications" },
    { key: "notice", value: "Announcements" },
  ],
};

export const paginationPage: Record<Language, Record<string, string>> = {
  // 페이지네이션 기능이 보여지는 페이지에 쓰일 메뉴
  [Language.korean]: {
    prev: "이전",
    next: "다음",
  },
  [Language.japanese]: {
    prev: "前へ",
    next: "次へ",
  },
  [Language.english]: {
    prev: "Previous",
    next: "Next",
  },
};

export const guidanceMenu: Record<Language, Record<string, string>> = {
  // 문서페이지 메뉴
  [Language.korean]: {
    introduction: "한국어교육센터",
    directions: "오시는 길",
    visa: "비자 안내",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    insurance: "건강 보험 안내",
    "korean-outline": "개요",
    "korean-sample": "프로그램 샘플",
    "opencampus-purpose": "목적",
    "opencampus-content": "일정 및 내용",
    "opencampus-schedule": "스케쥴",
    "procedure-guide": "절차 안내",
  },
  [Language.japanese]: {
    introduction: "韓国語教育センター",
    directions: "アクセス",
    visa: "ビザ案内",
    dormitory: "寮案内",
    facility: "学校施設案内",
    insurance: "健康保険案内",
    "korean-outline": "概要",
    "korean-sample": "プログラムサンプル",
    "opencampus-purpose": "目的",
    "opencampus-content": "日程と内容",
    "opencampus-schedule": "スケジュール",
    "procedure-guide": "入学申請",
  },
  [Language.english]: {
    introduction: "Korean Education Center",
    directions: "Directions",
    visa: "Visa Information",
    dormitory: "Dormitory Information",
    facility: "School Facility Guide",
    insurance: "Health Insurance Information",
    "korean-outline": "Overview of Korean Language Program",
    "korean-sample": "Program Sample",
    "opencampus-purpose": "Purpose",
    "opencampus-content": "Schedule and Content",
    "opencampus-schedule": "Schedule",
    "procedure-guide": "Procedure Guide",
  },
};

export const selectMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    "applied-to": "입학신청",
  },
  [Language.japanese]: {
    "korean-curriculum": "韓国語教育課程",
    "open-campus": "オープンキャンパス",
    "applied-to": "入学申請",
  },
  [Language.english]: {
    "korean-curriculum": "Korean Language Curriculum",
    "open-campus": "Open Campus",
    "applied-to": "Admission Application",
  },
};

export const boardPage: Record<Language, Record<string, string>> = {
  // 게시판페이지에 사용되는 메뉴들
  [Language.korean]: {
    notice: "공지",
    title: "제목",
    content: "내용",
    createDate: "작성일",
    updateDate: "수정일",
    search: "검색",
    write: "작성",
    number: "순번",
    author: "작성자",
    writeTitle: "제목을 입력하세요",
    writeSomething: "검색어를 입력하세요",
  },
  [Language.japanese]: {
    notice: "通知",
    title: "タイトル",
    content: "内容",
    createDate: "作成日",
    updateDate: "更新日",
    search: "検索",
    write: "作成",
    number: "番号",
    author: "作成者",
    writeTitle: "タイトルを入力してください",
    writeSomething: "検索語を入力してください",
  },
  [Language.english]: {
    notice: "Notice",
    title: "Title",
    content: "Content",
    createDate: "Created Date",
    updateDate: "Updated Date",
    search: "Search",
    write: "Write",
    number: "Number",
    author: "Author",
    writeTitle: "Enter a title",
    writeSomething: "Please enter a search term",
  },
};

export const getError: Record<Language, Record<string, string>> = {
  // get요청에 실패했을때의 메뉴들
  [Language.korean]: {
    staffError: "교직원 정보를 불러오지 못했습니다.",
    boardError: "게시글들을 불러올 수 없습니다.",
    htmlError: "해당 게시글을 불러올 수 없습니다.",
    bannerError: "배너를 불러올 수 없습니다.",
    newsError: "소식을 불러올 수 없습니다.",
    entranceApplicationError: "모집요강 및 입학신청를 불러올 수 없습니다.",
    searchBoardError: "검색된 게시글들을 불러올 수 없습니다.",
    fileDownloadError: "파일을 다운로드하지 못했습니다.",
  },
  [Language.japanese]: {
    staffError: "教職員の情報を読み込めませんでした。",
    boardError: "投稿を読み込むことができませんでした。",
    htmlError: "該当の投稿を読み込むことができませんでした。",
    bannerError: "バナーを読み込むことができませんでした。",
    newsError: "お知らせを読み込むことができませんでした。",
    entranceApplicationError:
      "募集要項および入学申請を読み込むことができません。",
    searchBoardError: "検索結果を読み込むことができません。",
    fileDownloadError: "ファイルをダウンロードできませんでした。",
  },
  [Language.english]: {
    staffError: "Failed to load staff and employee information.",
    boardError: "Failed to load the posts.",
    htmlError: "Failed to load the specific post.",
    bannerError: "Failed to load the banner.",
    newsError: "Failed to load the news.",
    entranceApplicationError:
      "Failed to load the recruitment guidelines and admission application.",
    searchBoardError: "Failed to load the search results.",
    fileDownloadError: "The file could not be downloaded.",
  },
};

export const postError: Record<Language, Record<string, string>> = {
  // post요청에 실패했을때의 메뉴들
  [Language.korean]: {
    imgError: "이미지 업로드에 실패했습니다.",
    subError: "제출에 실패했습니다.",
  },
  [Language.japanese]: {
    imgError: "画像のアップロードに失敗しました。",
    subError: "提出に失敗しました。",
  },
  [Language.english]: {
    imgError: "Failed to upload image.",
    subError: "Failed to submit.",
  },
};

export const deleteError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    delete: "글 삭제에 실패했습니다",
    userError: "로그인 후 이용하셔야 합니다.",
  },
  [Language.japanese]: {
    delete: "投稿の削除に失敗しました。",
    userError: "ログイン後に利用する必要があります。",
  },
  [Language.english]: {
    delete: "Failed to delete the post.",
    userError: "You need to log in to use this.",
  },
};

export const deleteSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentDelete: "글 삭제에 성공했습니다.",
  },
  [Language.japanese]: {
    contentDelete: "投稿の削除に成功しました。",
  },
  [Language.english]: {
    contentDelete: "Successfully deleted the post.",
  },
};

export const fileError: Record<Language, Record<string, string>> = {
  // 파일 다운로드 관련 에러
  [Language.korean]: {
    Error: "파일 다운로드에 실패했습니다.",
  },
  [Language.japanese]: {
    Error: "ファイルのダウンロードに失敗しました。",
  },
  [Language.english]: {
    Error: "Failed to download the file.",
  },
};

export const counselingForm: Record<Language, Record<string, string>> = {
  [Language.korean]: { counseling: "상담 신청" },
  [Language.japanese]: { counseling: "カウンセリング申し込み" },
  [Language.english]: { counseling: "Counseling Application" },
};

export const opencampusList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "opencampus-purpose", value: "목적" },
    { key: "opencampus-content", value: "일정 및 내용" },
    { key: "opencampus-schedule", value: "스케쥴" },
  ],
  [Language.japanese]: [
    { key: "opencampus-purpose", value: "目的" },
    { key: "opencampus-content", value: "日程と内容" },
    { key: "opencampus-schedule", value: "スケジュール" },
  ],
  [Language.english]: [
    { key: "opencampus-purpose", value: "Purpose" },
    { key: "opencampus-content", value: "Schedule and Content" },
    { key: "opencampus-schedule", value: "Schedule" },
  ],
};

export const applicationList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "procedure-guide", value: "절차 안내" },
    { key: "upload-documents", value: "서류 업로드" },
  ],
  [Language.japanese]: [
    { key: "procedure-guide", value: "手続きガイド" },
    { key: "upload-documents", value: "書類アップロード" },
  ],
  [Language.english]: [
    { key: "procedure-guide", value: "Procedure Guide" },
    { key: "upload-documents", value: "Upload Documents" },
  ],
};

export const categoryMap: Record<
  string,
  Record<Language, { key: string; value: string }[]>
> = {
  "korean-curriculum": koreanCurriculumList,
  "open-campus": opencampusList,
  "applied-to": applicationList,
};

export const counselingPageMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "counseling-guide":
      "상담 운영 시간은 한국 시간(KST) 기준으로\n평일 오전 9시 ~ 오후 6시,\n주말 오전 9시 ~ 오후 5시까지입니다.",
    name: "이름",
    phone: "휴대폰 번호",
    email: "이메일",
    date: "상담 일정",
    save: "저장",
  },
  [Language.japanese]: {
    "counseling-guide":
      "カウンセリングの営業時間は、韓国標準時間(KST)で\n平日午前9時～午後6時、\n週末午前9時～午後5時です。",
    name: "名前",
    phone: "携帯番号",
    email: "メール",
    date: "カウンセリング日程",
    save: "保存",
  },
  [Language.english]: {
    "counseling-guide":
      "Counseling hours are from 9 AM to 6 PM on weekdays, and 9 AM to 5 PM on weekends (KST).",
    name: "Name",
    phone: "Phone Number",
    email: "Email",
    date: "Counseling Schedule",
    save: "Save",
  },
};

export const locationMap: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "main-campus": " 대구광역시 북구 복현로 35",
  },
  [Language.japanese]: {
    "main-campus": " 大邱広域市北区復現路35",
  },
  [Language.english]: {
    "main-campus": "35, Bokhyeon-ro, Buk-gu, Daegu, South Korea",
  },
};

export const LoginCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    Login: "로그인",
    register: "회원가입",
    welcome: "영진전문대학교 국제교류원 방문을 환영합니다.",
    inputId: "아이디 입력",
    inputPassWord: "비밀번호 입력",
  },
  [Language.japanese]: {
    Login: "ログイン",
    register: "会員登録",
    welcome: "ヨンジン専門大学 国際交流院へようこそ。",
    inputId: "IDを入力",
    inputPassWord: "パスワードを入力",
  },
  [Language.english]: {
    Login: "Login",
    register: "Sign Up",
    welcome: "Welcome to Yeungjin College International Exchange Center.",
    inputId: "Enter ID",
    inputPassWord: "Enter Password",
  },
};

export const TermsAgreementMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    MainTermOfUse: "약관 동의",
    TermOfUse: "이용약관 동의 (필수)",
    TermOfUseContent: `본인은 [영진전문대학교] 의 교육 서비스를 이용하기 위해 다음과 같은 약관에 동의합니다.
1. 이용약관의 목적
본 약관은 [영진전문대학교](이하 "영진전문대학교")에서 제공하는 교육 서비스 이용에 관한 사항을 규정하는 것을 목적으로 합니다.

2. 이용자의 의무
이용자는 학교의 교육 서비스를 이용하는 동안 다른 사람의 권리를 침해하지 않으며, 학교의 규정과 지침을 준수하여야 합니다.

3. 서비스 이용
학교는 학생들에게 교육 서비스를 제공하며, 그에 필요한 자료와 정보를 제공할 수 있습니다. 서비스 이용에 따른 권리와 의무는 본 약관에 명시된 대로 이행됩니다.

3. 책임의 한계
학교는 천재지변 등 불가항력적인 사유로 인해 서비스 제공이 불가능할 경우, 이에 대한 책임을 지지 않습니다.

4. 약관의 변경
학교는 본 약관을 언제든지 변경할 수 있으며, 변경된 약관은 학교의 공식 웹사이트를 통해 고지됩니다.

5. 이용 계약의 해지
학생이 약관을 위반하거나 부정한 방법으로 서비스를 이용할 경우, 학교는 이용 계약을 해지할 수 있습니다.`,
    informationConsent: "개인정보 처리방침 동의 (필수)",
    informationConsentContext: `개인정보 처리방침 동의서

[영진전문대학교](이하 "영진전문대학교")는 학생들의 개인정보 보호를 매우 중요하게 생각하며, 다음과 같은 개인정보 처리방침을 시행합니다. 본인은 본 개인정보 처리방침에 동의합니다.

1. 개인정보 수집 항목
학교는 학생의 이름, 생년월일, 연락처, 이메일 주소, 학적 정보 등을 수집합니다.

2. 개인정보 수집 목적
학교는 수집된 개인정보를 학생의 학업 관리, 교육 서비스 제공, 공지사항 안내 등의 목적으로 사용합니다.

3. 개인정보의 보유 및 이용 기간
학생의 개인정보는 해당 교육 과정이 종료될 때까지 보유되며, 그 이후에는 법적인 의무를 제외하고는 즉시 파기됩니다.

4. 개인정보의 제3자 제공
학교는 학생의 개인정보를 제3자에게 제공하지 않으며, 법적인 요구에 따라 필요한 경우에만 제공될 수 있습니다.

5. 개인정보의 보호
학교는 학생의 개인정보를 안전하게 보호하기 위해 필요한 기술적, 관리적 조치를 취합니다.

6. 개인정보 처리에 대한 권리
학생은 언제든지 자신의 개인정보 열람, 수정, 삭제를 요구할 수 있으며, 이에 대한 절차는 학교의 개인정보 관리 부서에 문의하여 처리할 수 있습니다.

7. 개인정보 처리방침의 변경
학교는 개인정보 처리방침을 수시로 변경할 수 있으며, 변경된 사항은 학교의 웹사이트를 통해 공지됩니다.
`,
    next: "다음",
  },
  [Language.english]: {
    MainTermOfUse: "Terms Agreement",
    TermOfUse: "Agreement to Terms of Use (Required)",
    TermOfUseContent: `I agree to the following terms to use the educational services of [Yeungjin University].

1. Purpose of the Terms of Use
These terms and conditions govern the use of educational services provided by [Yeungjin University] (hereinafter referred to as "Yeungjin University").

2. Obligations of the User
The user must not infringe on the rights of others while using the school's educational services and must comply with the school's rules and guidelines.

3. Service Usage
The school provides educational services to students and may provide the necessary materials and information. The rights and responsibilities related to service usage are fulfilled as specified in these terms.

4. Limitation of Liability
The school is not responsible for service unavailability due to unavoidable circumstances such as natural disasters.

5. Changes to Terms
The school may change these terms at any time, and the updated terms will be notified through the official school website.

6. Termination of Agreement
The school may terminate the agreement if the student violates the terms or uses the service inappropriately.`,
    informationConsent: "Agreement to Privacy Policy (Required)",
    informationConsentContext: `Privacy Policy Agreement

[Yeungjin University] (hereinafter referred to as "Yeungjin University") takes the protection of student personal information very seriously and implements the following privacy policy. I agree to this privacy policy.

1. Information Collected
The school collects student information such as name, date of birth, contact details, email address, and academic records.

2. Purpose of Information Collection
The school uses the collected personal information for academic management, providing educational services, and delivering notices.

3. Retention and Use of Information
The student's personal information will be retained until the end of the educational program and will be immediately destroyed, except where required by law.

4. Provision of Information to Third Parties
The school does not provide personal information to third parties, except when required by law.

5. Protection of Information
The school takes necessary technical and administrative measures to protect the student's personal information.

6. Rights Regarding Information Processing
Students can request to view, modify, or delete their personal information at any time by contacting the school's privacy management department.

7. Changes to Privacy Policy
The school may change the privacy policy at any time, and changes will be announced on the school's website.`,
    next: "Next",
  },
  [Language.japanese]: {
    MainTermOfUse: "利用規約同意",
    TermOfUse: "利用規約同意（必須）",
    TermOfUseContent: `私は[Yeungjin University]の教育サービスを利用するために、以下の規約に同意します。

1. 利用規約の目的
本規約は、[Yeungjin University]（以下「Yeungjin University」）が提供する教育サービスの利用に関する事項を規定することを目的とします。

2. 利用者の義務
利用者は、学校の教育サービスを利用する際、他人の権利を侵害せず、学校の規則と指針を遵守しなければなりません。

3. サービス利用
学校は学生に教育サービスを提供し、必要な資料や情報を提供することがあります。サービス利用に関する権利と義務は本規約に従って履行されます。

4. 責任の制限
学校は天災などの不可抗力によってサービス提供が不可能になった場合、その責任を負いません。

5. 規約の変更
学校はいつでも本規約を変更することができ、変更された規約は学校の公式ウェブサイトで通知されます。

6. 利用契約の解除
学生が規約に違反したり、不正な方法でサービスを利用した場合、学校は利用契約を解除することがあります。`,
    informationConsent: "個人情報保護方針同意（必須）",
    informationConsentContext: `個人情報保護方針同意書

[Yeungjin University]（以下「Yeungjin University」）は、学生の個人情報の保護を非常に重要視しており、以下の個人情報保護方針を実施しています。本方針に同意します。

1. 収集する個人情報
学校は、学生の名前、生年月日、連絡先、メールアドレス、学籍情報などを収集します。

2. 収集目的
学校は収集した個人情報を、学生の学業管理、教育サービスの提供、通知案内などの目的で使用します。

3. 個人情報の保有および利用期間
学生の個人情報は、該当する教育プログラムが終了するまで保持され、その後、法的義務を除き、速やかに破棄されます。

4. 第三者への提供
学校は学生の個人情報を第三者に提供することはなく、法的要求がある場合に限り提供されることがあります。

5. 情報保護
学校は学生の個人情報を安全に保護するために必要な技術的および管理的措置を講じています。

6. 個人情報処理に関する権利
学生は、いつでも自分の個人情報の閲覧、修正、削除を要求することができ、その手続きは学校の個人情報管理部門に問い合わせて処理できます。

7. 個人情報保護方針の変更
学校は個人情報保護方針を変更することがあり、変更された事項は学校のウェブサイトを通じて通知されます。`,
    next: "次へ",
  },
};

export const RegisterCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    inputName: "한국어교육센터에서 사용할 이름을 입력해주세요.",
    register: "회원가입",
    namePlaceHolder: "이름",
    emailPlaceHolder: "이메일",
    passWordPlaceHolder: "비밀번호",
    googleRegister: "구글 회원가입",
    nameChange: "이름 변경",
    registerComplete: "이메일 인증이 필요합니다. 이메일을 확인해주세요.",
    registerError: "회원가입을 할 수 없습니다.",
    nameChangeComplete: "이름이 성공적으로 변경되었습니다.",
    nameChangeError: "이름을 변경할 수 없습니다",
  },
  [Language.english]: {
    inputName:
      "Please enter the name to be used at the Korean Language Education Center.",
    register: "Register",
    namePlaceHolder: "Name",
    emailPlaceHolder: "Email",
    passWordPlaceHolder: "Password",
    googleRegister: "Google Register",
    nameChange: "Change Name",
    registerComplete:
      "Email verification is required. Please check your email.",
    registerError: "Registration is not possible.",
    nameChangeComplete: "Your name has been successfully changed.",
    nameChangeError: "Your name cannot be changed.",
  },
  [Language.japanese]: {
    inputName: "韓国語教育センターで使用する名前を入力してください。",
    register: "登録",
    namePlaceHolder: "名前",
    emailPlaceHolder: "メール",
    passWordPlaceHolder: "パスワード",
    googleRegister: "Google サインアップ",
    nameChange: "名前変更",
    registerComplete: "メール認証が必要です。メールをご確認ください。",
    registerError: "登録できません。",
    nameChangeComplete: "名前が正常に変更されました。",
    nameChangeError: "名前を変更できません。",
  },
};

export const FormComponentMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    applicationSuccess: "상담 신청이 완료되었습니다.",
    applicationFail: "상담 신청에 실패했습니다.",
  },
  [Language.english]: {
    applicationSuccess: "The consultation application has been completed.",
    applicationFail: "Failed to apply for consultation.",
  },
  [Language.japanese]: {
    applicationSuccess: "相談申請が完了しました。",
    applicationFail: "相談申請に失敗しました。",
  },
};

export const DashboardCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    loadingOrNotFoundUser: "로딩 중이거나 사용자 정보가 없습니다.",
    userInformation: "님의 정보",
    nameChange: "이름 변경",
    connectGoogle: "구글 연동",
    submitDocument: "제출한 서류",
    submitComplete: "제출 완료",
    submitIncomplete: "제출 미완료",
    attachedFile: "첨부파일",
  },
  [Language.english]: {
    loadingOrNotFoundUser: "Loading or no user information found.",
    userInformation: "'s Information",
    nameChange: "Change Name",
    connectGoogle: "Connect Google",
    submitDocument: "Submitted Documents",
    submitComplete: "Submission Complete",
    submitIncomplete: "Submission Incomplete",
    attachedFile: "Attachment",
  },
  [Language.japanese]: {
    loadingOrNotFoundUser: "読み込み中またはユーザー情報がありません。",
    userInformation: "の情報",
    nameChange: "名前変更",
    connectGoogle: "Google連携",
    submitDocument: "提出した書類",
    submitComplete: "提出完了",
    submitIncomplete: "提出未完了",
    attachedFile: "添付ファイル",
  },
};

export const NameChangeModalMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    successNameChange: "이름이 성공적으로 변경되었습니다.",
    failNameChange: "이름 변경에 실패했습니다.",
    nameChangeError: "이름 변경 중 오류가 발생했습니다",
    nameChange: "이름 변경",
    save: "저장",
    cancel: "취소",
    newNameInput: "새로운 이름 입력",
  },
  [Language.english]: {
    successNameChange: "Name has been successfully changed.",
    failNameChange: "Failed to change name.",
    nameChangeError: "An error occurred while changing the name.",
    nameChange: "Change Name",
    save: "Save",
    cancel: "Cancel",
    newNameInput: "Enter new name",
  },
  [Language.japanese]: {
    successNameChange: "名前が正常に変更されました。",
    failNameChange: "名前の変更に失敗しました。",
    nameChangeError: "名前変更中にエラーが発生しました。",
    nameChange: "名前変更",
    save: "保存",
    cancel: "キャンセル",
    newNameInput: "新しい名前を入力",
  },
};

export const NeedLinkCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    notConnectGoogle:
      "해당 이메일로 가입되어있는 계정이 있지만, 구글 연동은 되어있지 않습니다.\n기존 계정으로 로그인 후, 마이페이지에서 구글 연동을 진행해주세요",
    connectGoogleGuide: "구글 연동 절차 안내",
    step1: "기존 계정으로 로그인한 후 이름을 클릭해 마이페이지로 이동합니다.",
    step2: "마이페이지에서 '구글 연동' 옵션을 찾아 연동을 진행합니다.",
    step3: "구글 로그인창으로 이동해 로그인합니다.",
    step4: "홈페이지로 돌아왔다면 구글 연동이 완료됩니다.",
  },
  [Language.english]: {
    notConnectGoogle:
      "An account is registered with this email, but Google is not linked.\nPlease log in with the existing account and link Google from the My Page.",
    connectGoogleGuide: "Google linking procedure guide",
    step1:
      "Log in with the existing account, then click your name to go to My Page.",
    step2:
      "Find the 'Google Linking' option on My Page and proceed with the linking.",
    step3: "Go to the Google login page and log in.",
    step4: "Once you return to the homepage, Google linking will be completed.",
  },
  [Language.japanese]: {
    notConnectGoogle:
      "このメールアドレスで登録されたアカウントがありますが、Google連携はされていません。\n既存のアカウントでログイン後、マイページでGoogle連携を行ってください。",
    connectGoogleGuide: "Google連携手順ガイド",
    step1:
      "既存のアカウントでログインした後、名前をクリックしてマイページに移動します。",
    step2: "マイページで「Google連携」オプションを見つけて連携を進めます。",
    step3: "Googleログインページに移動してログインします。",
    step4: "ホームページに戻ると、Google連携が完了します。",
  },
};

export const SelectPageCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    failLoadPosts: "해당 게시글을 불러올 수 없습니다.",
    failLoadContent: "내용을 불러올 수 없습니다.",
    failLoadCourse: "지원과정 목록을 불러올 수 없습니다.",
    failLoadUserInfo: "유저 정보를 불러오는데 실패했습니다.",
    needLogin: "로그인이 필요합니다.",
    needFile: "파일을 첨부해주세요.",
    needPhoneNumber: "전화번호를 입력해주세요.",
    needCourse: "지원과정을 선택해주세요.",
    loadingCourse: "지원과정을 불러오는 중...",
    submit: "제출",
    inputPhoneNumber: "전화번호를 입력하세요.",
    fileSelect: "파일 선택",
  },
  [Language.english]: {
    failLoadPosts: "Unable to load the post.",
    failLoadContent: "Unable to load the content.",
    failLoadCourse: "Unable to load the course list.",
    failLoadUserInfo: "Failed to load user information.",
    needLogin: "Login is required.",
    needFile: "Please attach a file.",
    needPhoneNumber: "Please enter a phone number.",
    needCourse: "Please select a course.",
    loadingCourse: "Loading courses...",
    submit: "Submit",
    inputPhoneNumber: "Enter phone number.",
    fileSelect: "file Select",
  },
  [Language.japanese]: {
    failLoadPosts: "その投稿を読み込むことができません。",
    failLoadContent: "内容を読み込むことができません。",
    failLoadCourse: "サポートコースのリストを読み込むことができません。",
    failLoadUserInfo: "ユーザー情報の読み込みに失敗しました。",
    needLogin: "ログインが必要です。",
    needFile: "ファイルを添付してください。",
    needPhoneNumber: "電話番号を入力してください。",
    needCourse: "コースを選択してください。",
    loadingCourse: "コースを読み込んでいます...",
    submit: "提出",
    inputPhoneNumber: "電話番号を入力してください。",
    fileSelect: "ファイル選択",
  },
};

export const AuthMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadError: "데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadError: "Failed to load data.",
  },
  [Language.japanese]: {
    LoadError: "データの読み込みに失敗しました。",
  },
};

export const Hamburger: Record< // 국제교류원에 맞춰서 수정 된 상태
  Language,
  { topMenu: string; subMenu: { address: string; name: string }[] }[]
> = {
  [Language.korean]: [
    {
      topMenu: "소개",
      subMenu: [
        { address: "/guidance/introduction", name: "소개글" },
        { address: "/staff/staff-intro", name: "교직원" },
        { address: "/select/international-agreements", name: "국제협약현황" },
        { address: "/guidance/contact", name: "오시는길" }, // contact로 바꿔야함
      ],
    },
    {
      topMenu: "외국인 입학",
      subMenu: [
        { address: "/guidance/admission-guide", name: "입학 안내" },
        { address: "https://ipsi.yju.ac.kr/ipsi/3828/subview.do", name: "학과 안내" },
        { address: "/campus-life", name: "캠퍼스 생활" }, // 주소 추가 해야함
        { address: "/guidance/student-support", name: "학생 지원 서비스" },
        { address: "/guidance/dormitory", name: "기숙사 안내" },
        { address: "/board/resources", name: "자료실" },
      ],
    },
    {
      topMenu: "글로벌 프로그램",
      subMenu: [
        { address: "/global-programs", name: "글로벌 프로그램" },
        { address: "/guidance/global-internships", name: "글로벌 현장학습" },
        { address: "/guidance/overseas-careers", name: "해외취업지원센터" },
      ],
    },
    {
      topMenu: "알림 및 공지사항",
      subMenu: [
        { address: "/board/news", name: "알림" },
        { address: "/board/notice", name: "공지사항" },
      ],
    },
    {
      topMenu: "한국어교육센터",
      subMenu: [
        { address: "https://kcenter.yju.ac.kr/home", name: "바로가기" },
      ],
    },
  ],
  [Language.english]: [
    {
      topMenu: "introduction",
      subMenu: [
        { address: "/guidance/introduction", name: "Introduction" },
        { address: "/staff/staff-intro", name: "Faculty and Staff Introduction" },
        { address: "/select/international-agreements", name: "International Agreements Status" },
        { address: "/guidance/contact", name: "Contact Information" }, // contact로 바꿔야 함
      ],
    },
    {
      topMenu: "International Admissions",
      subMenu: [
        { address: "/guidance/admission-guide", name: "Admission Information" },
        { address: "https://ipsi.yju.ac.kr/ipsi/3828/subview.do", name: "Department Information" },
        { address: "/campus-life", name: "Campus Life" }, // 주소 추가 해야함
        { address: "/guidance/student-support", name: "Student Support Services" },
        { address: "/guidance/dormitory", name: "Dormitory Information" },
        { address: "/board/resources", name: "Resources" },
      ],
    },
    {
      topMenu: "Global Program",
      subMenu: [
        { address: "/global-programs", name: "Global Program" },
        { address: "/guidance/global-internships", name: "Global Field Study" },
        { address: "/guidance/overseas-careers", name: "Overseas Employment Supporting" },
      ],
    },
    {
      topMenu: "Notifications",
      subMenu: [
        { address: "/board/news", name: "Notifications" },
        { address: "/board/notice", name: "Announcements" },
      ],
    },
    {
      topMenu: "Korean Language Education Center",
      subMenu: [
        { address: "https://kcenter.yju.ac.kr/home", name: "Shortcut" },
      ],
    },
  ],
  [Language.japanese]: [
    {
      topMenu: "introduction",
      subMenu: [
        { address: "/guidance/introduction", name: "紹介文" },
        { address: "/staff/staff-intro", name: "教職員紹介" },
        { address: "/select/international-agreements", name: "国際協定状況" },
        { address: "/guidance/contact", name: "連絡先" }, // contact로 바꿔야 함
      ],
    },
    {
      topMenu: "International Admissions",
      subMenu: [
        { address: "/guidance/admission-guide", name: "入学案内" },
        { address: "https://ipsi.yju.ac.kr/ipsi/3828/subview.do", name: "学科案内" },
        { address: "/campus-life", name: "キャンパスライフ" }, // 주소 추가 해야함
        { address: "/guidance/student-support", name: "学生支援サービス" },
        { address: "/guidance/dormitory", name: "寮情報" },
        { address: "/board/resources", name: "資料ダウンロード" },
      ],
    },
    {
      topMenu: "Global Program",
      subMenu: [
        { address: "/global-programs", name: "グローバルプログラム" },
        { address: "/guidance/global-internships", name: "グローバル現場学習" },
        { address: "/guidance/overseas-careers", name: "海外就職支援センター" },
      ],
    },
    {
      topMenu: "Notifications",
      subMenu: [
        { address: "/board/news", name: "お知らせ" },
        { address: "/board/notice", name: "通知" },
      ],
    },
    {
      topMenu: "Korean Language Education Center",
      subMenu: [
        { address: "https://kcenter.yju.ac.kr/home", name: "ショートカット" },
      ],
    },
  ],
};

export const postLanguageList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "korean", value: "한국어" },
    { key: "japanese", value: "일본어" },
    { key: "english", value: "영어" },
  ],
  [Language.english]: [
    { key: "korean", value: "Korean" },
    { key: "japanese", value: "Japanese" },
    { key: "english", value: "English" },
  ],
  [Language.japanese]: [
    { key: "korean", value: "韓国語" },
    { key: "japanese", value: "日本語" },
    { key: "english", value: "英語" },
  ],
};

export const HomePageTitle: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    yeungjin: "영진전문대학교",
    OfficeOfInternationalCooperation: "국제교류원",
  },
  [Language.english]: {
    yeungjin: "Yeungjin University",
    OfficeOfInternationalCooperation: "Office of International Cooperation",
  },
  [Language.japanese]: {
    yeungjin: "ヨンジン専門大学",
    OfficeOfInternationalCooperation: "国際交流院",
  },
};

export const CheckAdminAlert: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    noPermission: "잘못된 접근입니다.",
  },
  [Language.english]: {
    noPermission: "This is an invalid access",
  },
  [Language.japanese]: {
    noPermission: "不正なアクセスです",
  },
};

export const TermsOfService: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    privacyPolicy: "개인정보처리방침",
    terms: "이용약관",
  },
  [Language.japanese]: {
    privacyPolicy: "個人情報保護方針",
    terms: "利用規約",
  },
  [Language.english]: {
    privacyPolicy: "Privacy Policy",
    terms: "Terms and Conditions",
  },
};

export const AlertModalMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    close: "닫기",
  },
  [Language.english]: {
    close: "close",
  },
  [Language.japanese]: {
    close: "閉じる",
  },
};

export const CheckUserAlert: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    noPermission: "잘못된 접근입니다.",
  },
  [Language.english]: {
    noPermission: "This is an invalid access",
  },
  [Language.japanese]: {
    noPermission: "不正なアクセスです",
  },
};

export const YoutubeMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    invalidLink: "올바른 링크가 아닙니다.",
  },
  [Language.english]: {
    invalidLink: "This is not a valid link.",
  },
  [Language.japanese]: {
    invalidLink: "正しいリンクではありません。",
  },
};

export const PrideMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadingError: "PrideOfYeungjin 데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadingError: "Failed to load PrideOfYeungjin data.",
  },
  [Language.japanese]: {
    LoadingError: "PrideOfYeungjinデータの読み込みに失敗しました。",
  },


};
export const NewsMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadingError: "News 데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadingError: "Failed to load News data.",
  },
  [Language.japanese]: {
    LoadingError: "Newsデータの読み込みに失敗しました。",
  },
};

export const NoticeMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadingError: "Notice 데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadingError: "Failed to load Notice data.",
  },
  [Language.japanese]: {
    LoadingError: "Noticeデータの読み込みに失敗しました。",
  },
};

export const GlobalCarouselMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadingError: "GlobalCarousel 데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadingError: "Failed to load GlobalCarousel data.",
  },
  [Language.japanese]: {
    LoadingError: "GlobalCarouselデータの読み込みに失敗しました。",
  },
};


export const internationalAgreeMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    CountryLoadingError: "국가목록 데이터를 불러오는데 실패했습니다.",
    PartnerLoadingError: "협약기관 데이터를 불러오는데 실패했습니다.",
    CountrySelect: "국가 선택",
    CountryAndPartnerLoadingError: "국가와 협약기관 데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    CountryLoadingError: "Failed to load country list data.",
    PartnerLoadingError: "Failed to load partner data.",
    CountrySelect: "Select Country",
    CountryAndPartnerLoadingError: "Failed to load country and partner data.",
  },
  [Language.japanese]: {
    CountryLoadingError: "国名リストデータの読み込みに失敗しました。",
    PartnerLoadingError: "協定機関データの読み込みに失敗しました。",
    CountrySelect: "国を選択",
    CountryAndPartnerLoadingError: "国と協定機関データの読み込みに失敗しました。",
  },
};

export const enrollmentInfoMessage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    EnrollmentLoadingError: "입학신청서 및 모집요강 데이터를 불러오는데 실패했습니다.",
    ApplicationForm: "입학신청서",
    RecruitmentGuidelines: "모집요강",
  },
  [Language.english]: {
    EnrollmentLoadingError: "Failed to load enrollment application and recruitment guidelines data.",
    ApplicationForm: "Enrollment Application",
    RecruitmentGuidelines: "Recruitment Guidelines",
  },
  [Language.japanese]: {
    EnrollmentLoadingError: "入学申請書と募集要項データの読み込みに失敗しました。",
    ApplicationForm: "入学申請書",
    RecruitmentGuidelines: "募集要項",
  },
};

export const MainComponent: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    News: "공지사항",
    Notice: "알림",
    Admissions: "입학문의",
  },
  [Language.english]: {
    News: "News",
    Notice: "Notice",
    Admissions: "Admissions",
  },
  [Language.japanese]: {
    News: "お知らせ",
    Notice: "通知",
    Admissions: "入学案内",
  },
};
