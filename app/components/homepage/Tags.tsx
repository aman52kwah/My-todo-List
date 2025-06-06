
type TagsType = {
    tagText: string;
}

export function Tag({tagText}:TagsType) {
return <span className=" p-2 bg-slate-100 text-slate-600 text-sm rounded-sm h-fit 
font-bold "> {tagText} </span>;
         
}