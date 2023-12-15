
export const groupingPayrolls = (payrolls, frequencyType)=>{
    const groupedPayrolls = groupData(payrolls, frequencyType);
    return groupedPayrolls;
}

function getStartDate(date, interval) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Reset time

    switch (interval) {
        case 'Weekly':
            newDate.setDate(newDate.getDate() - newDate.getDay());
            break;
        case 'Biweekly':
            const biweeklyOffset = newDate.getDate() % 14;
            newDate.setDate(newDate.getDate() - biweeklyOffset);
            break;
        case 'Monthly':
            newDate.setDate(1);
            break;
        case 'Annually':
            newDate.setMonth(0, 1);
            break;
    }

    return newDate;
}

function groupData(data, interval) {
    const groups = {};

    data.forEach(item => {
        if(!!!item.createdAt) return null
        const createdAt = new Date(item.createdAt);
        const groupStart = getStartDate(createdAt, interval).toISOString();

        if (!groups[groupStart]) {
            groups[groupStart] = {
                startDate: createdAt.toISOString(),
                endDate: createdAt.toISOString(),
                totalSalary: 0,
                totalHours: 0,
                totalBonus: 0,
                totalCommissionEarned: 0,
                totalPayment: 0,
                data: []
            };
        }

        groups[groupStart].data.push(item);

        groups[groupStart].totalSalary += parseFloat(item.totalHours);
        groups[groupStart].totalHours += parseFloat(item.totalHours);
        groups[groupStart].totalBonus += parseFloat(item.bonus);
        groups[groupStart].totalCommissionEarned += parseFloat(item.commissionEarned);
        groups[groupStart].totalPayment += item.totalPayment;

        if (new Date(groups[groupStart].startDate) > createdAt) {
            groups[groupStart].startDate = createdAt.toISOString();
        }

        if (new Date(groups[groupStart].endDate) < createdAt) {
            groups[groupStart].endDate = createdAt.toISOString();
        }
        
        // const sDate = groups[groupStart].startDate.split("T")[0];
        // const eDate = groups[groupStart].endDate.split("T")[0];
        // const [sYY, sMM, sDD] = sDate.split("-");
        // const [eYY, eMM, eDD] = eDate.split("-");

        // groups[groupStart].startDate = `${sDD}/${sMM}/${sYY}`;
        // groups[groupStart].endDate = `${eDD}/${eMM}/${eYY}`;

        groups[groupStart].startDate = groups[groupStart].startDate.split("T")[0];
        groups[groupStart].endDate = groups[groupStart].endDate.split("T")[0];
    });

    // return groups; // returns groups in object
    return Object.values(groups); // returns groups in array.
}