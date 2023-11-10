export const convertMinuteToHour = (minutes : number) => {
    const playtime_hours = Math.floor(minutes / 60);
    const playtime_minutes = minutes % 60;
    return `${playtime_hours.toString()} hours ${playtime_minutes.toString()} minutes`;
  };


export const convertDate = (date: string) => {
    const day = date.split('-')[2];
    const month = date.split('-')[1];
    const year = date.split('-')[0];
    return `${day}-${month}-${year}`;
  };
  