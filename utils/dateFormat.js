const addDateSuffix = (date) => {
  const dateStr = date.toString();  // Convert the date to a string
  
  // Special case for numbers in "teens" 
  if (dateStr.length > 1 && dateStr.charAt(dateStr.length - 2) === '1') {
      return `${dateStr}th`; 
  }

  // Check the last digit and apply the corresponding suffix
  switch(dateStr.slice(-1)) {
      case '1':
          return `${dateStr}st`;
      case '2':
          return `${dateStr}nd`;
      case '3':
          return `${dateStr}rd`;
      default:
          return `${dateStr}th`;
  }
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  // Define arrays for month names in short and full forms
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Choose month names array based on 'monthLength' option
  const months = monthLength === 'short' ? shortMonths : longMonths;

  const dateObj = new Date(timestamp);  // Convert the timestamp to a Date object
  const formattedMonth = months[dateObj.getMonth()];  // Get the month name

  // Get the day of the month, optionally with suffix, e.g., "2nd"
  const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  
  const year = dateObj.getFullYear();  // Get the full year
  
  let hour = dateObj.getHours();  
  // Determine AM/PM period of the day
  const periodOfDay = hour >= 12 ? 'pm' : 'am'; 
  
  // Convert to 12-hour format and handle midnight as 12
  hour = hour % 12 || 12;
  
  // Ensure minutes are always two digits, e.g., "09"
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  // Construct and return the formatted timestamp string
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  return formattedTimeStamp;
};
