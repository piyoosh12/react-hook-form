
/*
This is a helper function that extracts date from the DateTimestamp
*/
export const extractDate = (date: Date)=>{
    if(date){
        return date.toISOString().split("T")[0];
    }
    return null;

}