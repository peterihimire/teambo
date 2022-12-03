const months = [
    'January',
    'February',
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
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednessday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const daysshort = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
  ]

const isSameDay = (a:any, b:any) => {
  const c = new Date(a);
  const d = new Date(b);
  return c.getFullYear() === d.getFullYear() &&
    c.getMonth() === d.getMonth() &&
    c.getDate()=== d.getDate()
}

const doLoop = (data:any)=>{
  const remainData:[]|any = [];

    const partone = data.filter((item:{}|any,index:number)=>{
      //if date is equal
      if(isSameDay(data[0].started_at, item.started_at)){
        return true;
      }else{
        remainData.push(item)
        return false
      }
    })
    return {remainData, partone}
}

export function formatDate(date:any){
      const newDate = new Date(date);
      const month = months[newDate.getMonth()]
      const day = days[newDate.getDay()]
      const dayshort = daysshort[newDate.getDay()]
      const dateNum =  newDate.getDate();
      const year =  newDate.getFullYear();
      return {month,day, dayshort, dateNum,year}
  }

export function getDuration(start:any, duration:any){
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + duration );
  const hour =  startDate.getHours() - 1;
  const minutes = startDate.getMinutes();
  const endhour = endDate.getHours() - 1;
  const endMinutes = endDate.getMinutes();
  return {hour, minutes, endhour, endMinutes};
}



export function formatDateData (data:any){
    // [[{},{}],[{},{}]]
    const generalObject = []
    let prevData = data
    while (prevData.length > 0){
      const {remainData, partone} = doLoop(prevData)
      prevData = remainData;
      generalObject.push(partone)
    }
    // console.log("😁😁😁😁",generalObject)
    return generalObject
}