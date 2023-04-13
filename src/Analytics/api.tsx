export interface ReportData {
  date: string;
  app_id: number;
  app_name: string;
  requests: number;
  responses: number;
  impressions: number;
  clicks: number;
  revenue: number;
  fill_rate: string;
  ctr: string;
  [key: string]: any;
}

export const fetchReportData = async (
  apiUrl: string,
  startDate: string,
  endDate: string
): Promise<ReportData[]> => {
  const response = await fetch(
    `${apiUrl}/dummy/report?startDate=${startDate}&endDate=${endDate}`
  );
  const appResponse = await fetch(`http://go-dev.greedygame.com/v3/dummy/apps`);
  const appData = await appResponse.json();
  const appMap = appData.data.reduce(
    (acc: { [key: number]: string }, curr: any) => {
      acc[curr.app_id] = curr.app_name;
      return acc;
    },
    {}
  );
  const data = await response.json();
  const result = data.data.map((item: ReportData) => {
    const appName = appMap[item.app_id] || "Unknown";
    const fillRate = formatPercentage((item.responses / item.requests) * 100);
    const ctr = formatPercentage((item.clicks / item.impressions) * 100);
    return { ...item, app_name: appName, fill_rate: fillRate, ctr: ctr };
  });
  return result;
};

export const formatNumber = (num: number) => {
  return num.toLocaleString("en-IN");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN");
};

export const formatPercentage = (num: number) => {
  return `${num.toFixed(2)}%`;
};
