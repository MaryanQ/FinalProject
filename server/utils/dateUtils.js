import { format } from "date-fns";

//export const so it can be availabe in other to modules/files
//const is a way to declare variables in JavaScript that cannot be reassigned after their initial value is set. It's short for "constant."
export const formatToYYYYMMDD = (dateString) => {
  const date = new Date(dateString);
  // Adjust to YYYY-MM-DD format for MySQL
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

//export const: This statement both declares a function as a constant and makes it available for other files to import and use.

//he function is named formatToYYYYMMDD.
//It's a standard JavaScript function but is treated as a constant, meaning you cannot redefine it later.
//Function Logic:

//This function accepts a dateString as an input.
//It creates a JavaScript Date object from the provided string to handle date manipulations.
//Extracting Year, Month, Day:
//getFullYear extracts the year from the Date object.
//getMonth gets the month, but because months are zero-based (0 for January), +1 is needed.
//getDate extracts the day of the month.
//The .padStart(2, "0") function ensures that both the month and day are always two digits long. For instance, "9" becomes "09".
//Final Format:

//The function returns a string formatted in the "YYYY-MM-DD" pattern suitable for MySQL or other databases.
