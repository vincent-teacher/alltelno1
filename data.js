/* 楊梅高中分機一覽表 — 資料來源：桃園市立楊梅高級中學語音電話分機一覽表（編製：總務處，版本 115/09/07）
   每個項目：[中文名稱, English name, 分機（多支以空白分隔）, 聯絡人] */
window.PHONE = {
  version: "115/09/07",
  editor: { zh: "總務處", en: "General Affairs Office" },
  main: [
    { num: "03-4789618", zh: "代表號", en: "Main line" },
    { num: "03-4780449", zh: "二線", en: "Line 2" },
    { num: "03-4780740", zh: "三線", en: "Line 3" }
  ]
};

window.CATS = [
  { id: "admin", zh: "行政處室", en: "Administration", icon: "🏛️" },
  { id: "office", zh: "教師辦公室", en: "Teacher Offices", icon: "👩‍🏫" },
  { id: "room", zh: "教室與場館", en: "Classrooms & Venues", icon: "🏫" }
];

window.UNITS = [
  { id: "principal", cat: "admin", icon: "🎓", color: "#e8467c", zh: "校長室", en: "Principal's Office", fax: "4856117",
    items: [
      ["校長", "Principal", "1101", "鍾校長"],
      ["秘書", "Secretary", "1102", "黃秘書"],
      ["技工", "Technician", "1103", "劉小姐"],
      ["校長宿舍", "Principal's Residence", "1104", ""]
    ] },
  { id: "partner", cat: "admin", icon: "🤝", color: "#8e5bd8", zh: "協力組織", en: "Support Units",
    items: [
      ["警衛室", "Security Guard Room", "1110", ""],
      ["聯合辦公室", "Joint Office", "1112", ""],
      ["第一會議室", "Meeting Room 1", "1113", ""],
      ["交通安全教室", "Traffic Safety Classroom", "1114", ""],
      ["第二會議室", "Meeting Room 2", "1115", ""]
    ] },
  { id: "personnel", cat: "admin", icon: "🧑‍💼", color: "#f08a24", zh: "人事室", en: "Personnel Office", tel: "4784103", fax: "4755774",
    items: [
      ["主任", "Director", "1121", "邱主任"],
      ["組員", "Staff", "1122", "陳先生"]
    ] },
  { id: "accounting", cat: "admin", icon: "🧮", color: "#13a89e", zh: "會計室", en: "Accounting Office", tel: "4789683", fax: "4782322",
    items: [
      ["主任", "Director", "1131", "林主任"],
      ["組員", "Staff", "1132", "張小姐"],
      ["佐理員", "Assistant", "1133", "陳小姐"]
    ] },
  { id: "academic", cat: "admin", icon: "📚", color: "#2f7de1", zh: "教務處", en: "Academic Affairs Office", tel: "4783574", fax: "4882675",
    items: [
      ["主任", "Director", "1201", "李主任"],
      ["教學組長", "Chief, Instruction Section", "1211", "邱組長"],
      ["幹事", "Clerk", "1212", "張小姐"],
      ["印刷室", "Printing Room", "1213", "陳先生"],
      ["註冊組長", "Chief, Registration Section", "1221", "賴組長"],
      ["幹事", "Clerk", "1222", "曾小姐"],
      ["設備組長", "Chief, Equipment Section", "1231", "鄭組長"],
      ["助理員", "Assistant", "1232", "謝小姐"],
      ["書記", "Clerical Staff", "1233", "吳先生"],
      ["數位前導助理", "Digital Pilot Assistant", "1234", "王小姐"],
      ["實驗研究組長", "Chief, Research & Experiment Section", "1241", "邱組長"],
      ["幹事", "Clerk", "1242", "宋先生"],
      ["均質化專案助理", "Equalization Project Assistant", "1243", ""],
      ["學期歷程檔案助理", "Learning Portfolio Assistant", "1244", "楊小姐"],
      ["試務組組長", "Chief, Examination Section", "1251", "蘇組長"],
      ["幹事", "Clerk", "1252", "蔡小姐"],
      ["（原表未標示）", "(Not labeled)", "1261", ""],
      ["英語教師", "English Teacher", "1262", ""],
      ["雙語助理", "Bilingual Assistant", "1263", "葉先生"],
      ["雙語教師", "Bilingual Teacher", "1264", "高老師"]
    ] },
  { id: "student", cat: "admin", icon: "🏅", color: "#e53935", zh: "學務處", en: "Student Affairs Office", tel: "4758950", fax: "4757034",
    items: [
      ["主任", "Director", "1301", "呂主任"],
      ["午餐秘書", "Lunch Secretary", "1302", "李老師"],
      ["學務創新人力", "Student Affairs Staff", "1303", "呂先生"],
      ["訓育組長", "Chief, Discipline & Guidance Section", "1311", "簡組長"],
      ["幹事", "Clerk", "1312", "傅小姐"],
      ["活動組長", "Chief, Activities Section", "1321", "魏組長"],
      ["學務創新人力", "Student Affairs Staff", "1322", "林先生"],
      ["體育組長", "Chief, Physical Education Section", "1331", "廖組長"],
      ["游泳池", "Swimming Pool", "1333", "陳先生"],
      ["管理員", "Facility Manager", "1334", "鍾小姐"],
      ["跆拳道館", "Taekwondo Hall", "1335", ""],
      ["衛生組長", "Chief, Health Section", "1341", "詹組長"],
      ["護理師(健康中心)", "School Nurse (Health Center)", "1342", "陳小姐"],
      ["學務創新人力", "Student Affairs Staff", "1343", "張先生"],
      ["健康中心", "Health Center", "1119", "陳小姐"],
      ["禮堂準備室", "Auditorium Prep Room", "1324", ""]
    ] },
  { id: "safety", cat: "admin", icon: "🛡️", color: "#546e7a", zh: "校安中心", en: "Campus Safety Center", tel: "4854998", fax: "4780428",
    items: [
      ["學務創新人力", "Student Affairs Staff", "1351", "廖先生"],
      ["生輔組長", "Chief, Student Life Section", "1352", "張組長"],
      ["學務創新人力", "Student Affairs Staff", "1353", "李先生"],
      ["學務創新人力", "Student Affairs Staff", "1354", "陳先生"],
      ["幹事", "Clerk", "1355", "范小姐"],
      ["學務創新人力", "Student Affairs Staff", "1356", "郭先生"],
      ["學務創新人力", "Student Affairs Staff", "1357", "彭先生"]
    ] },
  { id: "general", cat: "admin", icon: "🔧", color: "#7cb342", zh: "總務處", en: "General Affairs Office", tel: "4783349", fax: "4780164",
    items: [
      ["主任", "Director", "1401", "劉主任"],
      ["文書組長", "Chief, Documents Section", "1411", "黃組長"],
      ["臨時人員", "Temporary Staff", "1412", "鍾小姐"],
      ["出納組長", "Chief, Cashier Section", "1421", "黃組長"],
      ["庶務組長", "Chief, General Services Section", "1431", "劉組長"],
      ["財管管理員", "Property Manager", "1432", "謝先生"],
      ["採購幹事", "Procurement Clerk", "1433", "張先生"],
      ["學務創新人力", "Student Affairs Staff", "1434", "彭先生"],
      ["臨時人員", "Temporary Staff", "1435", "宋先生"]
    ] },
  { id: "coop", cat: "admin", icon: "🛒", color: "#ff7043", zh: "員生社", en: "School Co-op Store", tel: "4750453",
    items: [
      ["員生社", "Co-op Store", "1491", "林小姐"]
    ] },
  { id: "counsel", cat: "admin", icon: "💗", color: "#ec407a", zh: "輔導室", en: "Counseling Office", tel: "4758437",
    items: [
      ["輔導主任", "Director of Counseling", "1503", "林主任"],
      ["專任輔導教師", "Full-time Counselor", "1504", "陳老師"],
      ["專任輔導教師", "Full-time Counselor", "1507", "吳老師"],
      ["專任輔導教師", "Full-time Counselor", "1501", "金老師"],
      ["專任輔導教師", "Full-time Counselor", "1502", "陳老師"],
      ["特教教師1", "Special Education Teacher 1", "1505", "何老師"],
      ["特教教師2", "Special Education Teacher 2", "1506", "林老師"],
      ["特教教師3", "Special Education Teacher 3", "1511", "曾老師"],
      ["生涯資訊室", "Career Information Room", "1508", ""],
      ["團體諮商室", "Group Counseling Room", "1509", ""],
      ["學習中心", "Learning Center", "1510", ""]
    ] },
  { id: "library", cat: "admin", icon: "📖", color: "#00acc1", zh: "圖書館", en: "Library", tel: "4780586",
    items: [
      ["主任", "Director", "1601", "施主任"],
      ["讀者服務組長", "Chief, Reader Services Section", "1602", "何組長"],
      ["資訊媒體組長", "Chief, Information & Media Section", "1603", "賴組長"],
      ["幹事/讀者服務櫃台", "Clerk / Circulation Desk", "1605", "呂小姐"],
      ["喜閱學堂", "Joyful Reading Room", "1606", ""],
      ["演藝廳", "Performance Hall", "1607", ""]
    ] },
  { id: "practice", cat: "admin", icon: "⚙️", color: "#5c6bc0", zh: "實習處", en: "Practicum Office",
    items: [
      ["實習處主任", "Director of Practicum", "1701", "簡主任"],
      ["實習就業組長", "Chief, Internship & Employment Section", "1702", "蔡組長"],
      ["資訊科主任", "Head, Dept. of Information Technology", "1703", "廖主任"],
      ["技佐", "Technical Assistant", "1704", "林先生"],
      ["電子科主任", "Head, Dept. of Electronics", "1705", "余主任"],
      ["技士", "Technician", "1706", "卓小姐"]
    ] },
  { id: "homeroom", cat: "office", icon: "🧑‍🏫", color: "#fb8c00", zh: "導師辦公室", en: "Homeroom Teachers' Offices",
    items: [
      ["悅知樓1樓導師室(高一)", "Yuezhi Bldg 1F Homeroom Office (Grade 10)", "1361 1365", ""],
      ["悅知樓2樓導師室(高一)", "Yuezhi Bldg 2F Homeroom Office (Grade 10)", "1366", ""],
      ["悅知樓3樓導師室(高二)", "Yuezhi Bldg 3F Homeroom Office (Grade 11)", "1362 1364", ""],
      ["日新樓1樓導師室(高三)", "Rixin Bldg 1F Homeroom Office (Grade 12)", "1363 1367", ""]
    ] },
  { id: "subject", cat: "office", icon: "🗂️", color: "#8d6e63", zh: "專任教師辦公室", en: "Subject Teachers' Offices",
    items: [
      ["蘊慧樓1樓專一辦公室", "Yunhui Bldg 1F Teachers' Office 1", "1271 1275", ""],
      ["蘊慧樓2樓專二辦公室", "Yunhui Bldg 2F Teachers' Office 2", "1272", ""],
      ["日新樓2樓專三辦公室", "Rixin Bldg 2F Teachers' Office 3", "1273", ""],
      ["日新樓3樓專四辦公室", "Rixin Bldg 3F Teachers' Office 4", "1274", ""]
    ] },
  { id: "lab", cat: "room", icon: "🧪", color: "#43a047", zh: "實驗室", en: "Laboratories",
    items: [
      ["化學實驗室", "Chemistry Lab", "1373", ""],
      ["基礎理化實驗室", "Basic Physics & Chemistry Lab", "1374", ""],
      ["物理實驗室", "Physics Lab", "1375", ""],
      ["生物實驗室", "Biology Lab", "1376", ""],
      ["基礎生物實驗室", "Basic Biology Lab", "1378", ""],
      ["地科實驗室", "Earth Science Lab", "1379", ""]
    ] },
  { id: "special", cat: "room", icon: "💻", color: "#1e88e5", zh: "專科教室", en: "Specialized Classrooms",
    items: [
      ["啟明樓校史室", "Qiming Bldg School History Room", "1284", ""],
      ["語言教室", "Language Lab", "1285", ""],
      ["蘊慧樓電腦機房", "Yunhui Bldg Server Room", "1286", ""],
      ["電腦教室一", "Computer Classroom 1", "1287", ""],
      ["視聽一教室", "Audio-Visual Room 1", "1288", ""],
      ["電腦教室二", "Computer Classroom 2", "1289", ""],
      ["美術教室", "Art Classroom", "1291", ""],
      ["科技應用教室", "Technology Application Classroom", "1292", ""],
      ["新興科技推廣教室", "Emerging Technology Classroom", "1293", ""],
      ["雙語教室", "Bilingual Classroom", "1294", ""],
      ["電腦教室三", "Computer Classroom 3", "1295", ""],
      ["探究與實作教室", "Inquiry & Practice Classroom", "1296", ""],
      ["環境教育中心", "Environmental Education Center", "1297", ""]
    ] },
  { id: "rixin", cat: "room", icon: "🎭", color: "#d81b60", zh: "日新樓專科教室", en: "Rixin Bldg Specialized Rooms",
    items: [
      ["英語情境教室", "English Immersion Classroom", "1711", ""],
      ["日新樓展演中心", "Rixin Bldg Exhibition Center", "1712", ""],
      ["護理教室", "Nursing Classroom", "1751", ""],
      ["計概教室", "Computer Concepts Classroom", "1752", ""],
      ["音樂教室", "Music Classroom", "1761", ""],
      ["藝術生活教室", "Arts & Living Classroom", "1764", ""],
      ["視覺藝術教室", "Visual Arts Classroom", "1765", ""]
    ] },
  { id: "yufeng", cat: "room", icon: "🌬️", color: "#26a69a", zh: "御風樓", en: "Yufeng Building",
    items: [
      ["御風2-1", "Yufeng Room 2-1", "2421", ""],
      ["御風2-2", "Yufeng Room 2-2", "2422", ""],
      ["御風2-3", "Yufeng Room 2-3", "2423", ""],
      ["御風3-1", "Yufeng Room 3-1", "2431", ""],
      ["御風3-2", "Yufeng Room 3-2", "2432", ""],
      ["御風3-3", "Yufeng Room 3-3", "2433", ""],
      ["御風3-4", "Yufeng Room 3-4", "2434", ""],
      ["社團教室2", "Club Room 2", "2435", ""]
    ] },
  { id: "lifesci", cat: "room", icon: "🍳", color: "#fdd835", zh: "生科大樓", en: "Life Technology Building",
    items: [
      ["體育器材室", "Sports Equipment Room", "1811", ""],
      ["烹飪教室", "Cooking Classroom", "1822", ""],
      ["生活科技教室", "Living Technology Classroom", "1821", ""],
      ["家政教室", "Home Economics Classroom", "1822", ""]
    ] }
];

/* 聯絡人英文：姓氏拼音 + 稱謂 */
window.SURNAME = { "鍾":"Chung","黃":"Huang","劉":"Liu","簡":"Chien","蔡":"Tsai","廖":"Liao","林":"Lin","余":"Yu","卓":"Cho","呂":"Lu","李":"Lee","傅":"Fu","魏":"Wei","陳":"Chen","詹":"Chan","張":"Chang","邱":"Chiu","賴":"Lai","曾":"Tseng","鄭":"Cheng","謝":"Hsieh","吳":"Wu","王":"Wang","宋":"Sung","楊":"Yang","蘇":"Su","葉":"Yeh","高":"Kao","范":"Fan","郭":"Kuo","彭":"Peng","金":"Chin","何":"Ho","施":"Shih" };
window.HONOR = { "校長":"Principal","秘書":"Secretary","主任":"Director","組長":"Chief","小姐":"Ms.","先生":"Mr.","老師":"Teacher" };
