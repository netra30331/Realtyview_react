export const WeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const Months = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export enum AUTH {
  ADMIN = 'admin',
  USER = 'user',
  VISITOR = 'visitor',
}

// configuration for layouts
export enum LAYOUTS {
  SIDEBAR_WIDTH_DESKTOP = 258,
  HEADER_HEIGHT = 81,
}

export const MIN_PASSWORD_LENGTH = 8

export const importanceLevels = [
  {title: 'Critial', color: '#6DA172FF'},
  {title: 'High', color: '#6DA172C0'},
  {title: 'Medium', color: '#6DA17299'},
  {title: 'Low', color: '#6DA17266'},
  {title: 'Minor', color: '#6DA17233'},
]

export const FormatFileSize = (size:number) => {
  let res = parseFloat((size/1024).toString()).toFixed(1);
  
  if (parseInt(res) > 1024){
      res = parseFloat((size/1024).toString()).toFixed(1);
      return res.toString() + 'MB';
  } else {
      return res.toString() + 'KB';
  }
}

export const formatSlashDate = (date:any) => {
  if (date === undefined || date === null || date === '') return '';
  const dates = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return month + '/' + dates + '/' + year;
}

export const formatTime = (date:any) => {
  if (date === undefined || date === null || date === '') return '';
  let hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  let surfix = 'AM';
  if (hours > 12){
      hours = hours -12;
      surfix = 'PM';
  }
  return hours.toString() + ':' + minutes + ' ' + surfix;
}


export const getDay = (date: any) => {
  const day = new Date(date).getDay();
  return WeekDays[day];
}

export const getTime = (date: any) => {
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();
  return hours + ":" + min;
}

export const formatWeekDate = (date:any) => {
  const dates = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDay();

  return WeekDays[day] + ', ' + Months[month] + ' ' + dates;
}