export class ReportInfo {
    reportId: number;
    title: string;
    userName: string;
    creationDateString: string;
}

export class ReportsModel {    
    reportsList: ReportInfo[];
}

export class Report extends ReportInfo {
    reportType: number;
    center: string;
    period: string;
    creationDate: Date;

    activeCasesLastDayOfPreviousMonth: number;
    newCasesCurrentMonth: number;
    closedCasesCurrentMonthFamily: number;
    closedCasesCurrentMonthAssistent: number;
    closedCasesCurrentMonthOtherOrg: number;
    activeCasesLastDayOfCurrentMonth: number;

    activeCasesLastDayOfPreviousMonthUR: number;
    newCasesCurrentMonthUR: number;
    closedCasesCurrentMonthFamilyUR: number;
    closedCasesCurrentMonthAssistentUR: number;
    closedCasesCurrentMonthOtherOrgUR: number;
    activeCasesLastDayOfCurrentMonthUR: number;

    totalChildrenNo: number;
    childrenLessThanOneNo: number;
    childrenOneToTwoNo: number;
    childrenThreeToSixNo: number;
    childrenSevenToNineNo: number;
    childrenTenToThirteenNo: number;
    childrenFourteenToSeventeenNo: number;
    childrenEighteenOrMoreNo: number;
} 

export class GeneralStatistics {
    activeCasesCurrentMonth: number;
    activeCasesPreviousMonth: number;
    activeCasesChildren: number;
}