const convertTimeToInputFormat = (time) => {
    if (!time) return '';
  
    const date = new Date(time);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

  export {convertTimeToInputFormat};
  