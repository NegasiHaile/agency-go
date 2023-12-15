interface Split{
    agency:number;
    splitPercentile: string;
}

export const agencyCreatorSplit = (CurrentModelBalance: number, splitPercent:string)=>{

    const split = splitPercent.split('/')
    const agencyPercent = Number(split[0]); 
    const creatorPercent = Number(split[1])

    const agencyShare = ((CurrentModelBalance * agencyPercent)/100).toFixed(2)
    const creatorShare = ((CurrentModelBalance * creatorPercent)/100).toFixed(2)
    return {
        agencyShare: agencyShare,
        creatorShare: creatorShare
    } 

}