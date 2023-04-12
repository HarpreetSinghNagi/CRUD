export interface ReportData {
    date: string;
    app_id: number;
    requests: number;
    responses: number;
    impressions: number;
    clicks: number;
    revenue: number;
    fill_rate: number;
    ctr: number;
  }


  export const fetchReportData = async (apiUrl: string, startDate: string, endDate: string): Promise<ReportData[]> => {
    const response = await fetch(
      `${apiUrl}/dummy/report?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    return data.data;
    };
    
    export const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
    };
    
    export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN');
    };
    
    export const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
    };