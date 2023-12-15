export const format_MMM_DD_YYYY =(timestamp:string) =>{
        if(!!timestamp){
        const date = new Date(timestamp);
        const options:any = { year: 'numeric', month: 'short', day: '2-digit' }; // use year: '2-digit' for something like this "Dec, 01, 23"
        return date.toLocaleDateString('en-US', options);
        // return format "Dec, 01, 2023"
        }else{
        return "";
        }
}