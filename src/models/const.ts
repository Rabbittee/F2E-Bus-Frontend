export enum Direction {
  Departure = 0,
  Destination = 1,
  Loop = 2,
  Unknown = 255,
}

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export function formatDay(day: Day) {
  return {
    monday: "週一",
    tuesday: "週二",
    wednesday: "週三",
    thursday: "週四",
    friday: "週五",
    saturday: "週六",
    sunday: "週日",
  }[day];
}

export type City =
  | "Taipei"
  | "NewTaipei"
  | "Taoyuan"
  | "Taichung"
  | "Tainan"
  | "Kaohsiung"
  | "Keelung"
  | "Hsinchu"
  | "HsinchuCounty"
  | "MiaoliCounty"
  | "ChanghuaCounty"
  | "NantouCounty"
  | "YunlinCounty"
  | "ChiayiCounty"
  | "Chiayi"
  | "PingtungCounty"
  | "YilanCounty"
  | "HualienCounty"
  | "TaitungCounty"
  | "KinmenCounty"
  | "PenghuCounty"
  | "LienchiangCounty";

export function formatCity(city: City) {
  return {
    Taipei: "臺北市",
    NewTaipei: "新北市",
    Taoyuan: "桃園市",
    Taichung: "臺中市",
    Tainan: "臺南市",
    Kaohsiung: "高雄市",
    Keelung: "基隆市",
    Hsinchu: "新竹市",
    HsinchuCounty: "新竹縣",
    MiaoliCounty: "苗栗縣",
    ChanghuaCounty: "彰化縣",
    NantouCounty: "南投縣",
    YunlinCounty: "雲林縣",
    ChiayiCounty: "嘉義縣",
    Chiayi: "嘉義市",
    PingtungCounty: "屏東縣",
    YilanCounty: "宜蘭縣",
    HualienCounty: "花蓮縣",
    TaitungCounty: "臺東縣",
    KinmenCounty: "金門縣",
    PenghuCounty: "澎湖縣",
    LienchiangCounty: "連江縣",
  }[city];
}
