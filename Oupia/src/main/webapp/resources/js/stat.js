document.addEventListener('DOMContentLoaded', function () {
    loadMonthChart();
    loadQuarterChart();
    loadYearChart();

});

async function loadMonthChart() {
    await fetchMonthData();
    const ctx = document.getElementById('monthChart').getContext('2d');
    const monthChart = new Chart(ctx, {
        type: 'bar',
        data: chartMonthData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const chartMonthData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
        {
            label: 'Chủ trọ',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Người tìm trọ',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

async function fetchMonthData() {
    try {
        const selectedYear = document.getElementById('monthYearSelect').value;
        const res = await fetch(`http://localhost:8080/Oupia/api/stats/month/?year=${selectedYear}`);
        if (!res.ok) {
            throw new Error('Lỗi khi lấy dữ liệu thống kê.');
        }
        const rawData = await res.json();
        chartMonthData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        chartMonthData.datasets[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (const key in rawData) {
            const month = parseInt(key);
            for (const dataPoint of rawData[key]) {
                const role = dataPoint[1];
                const count = dataPoint[2];
                const dataIndex = month - 1;
                if (role === "LANDLORD") {
                    chartMonthData.datasets[0].data[dataIndex] += count;
                } else if (role === "TENANT") {
                    chartMonthData.datasets[1].data[dataIndex] += count;
                }
            }
        }
    } catch (exception) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', exception);
    }
}

async function loadQuarterChart() {
    await fetchQuarterData();
    const ctx = document.getElementById('quarterChart').getContext('2d');
    const quarterChart = new Chart(ctx, {
        type: 'bar',
        data: chartQuarterData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const chartQuarterData = {
    labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
    datasets: [
        {
            label: 'Chủ trọ',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Người tìm trọ',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

async function fetchQuarterData() {
    try {
        const selectedYear = document.getElementById('quarterYearSelect').value;
        const res = await fetch(`http://localhost:8080/Oupia/api/stats/quarter/?year=${selectedYear}`);
        if (!res.ok) {
            throw new Error('Lỗi khi lấy dữ liệu thống kê.');
        }
        const rawData = await res.json();
        chartQuarterData.datasets[0].data = [0, 0, 0, 0];
        chartQuarterData.datasets[1].data = [0, 0, 0, 0];

        for (const key in rawData) {
            const quarter = parseInt(key);
            for (const dataPoint of rawData[key]) {
                const role = dataPoint[1];
                const count = dataPoint[2];
                const dataIndex = quarter - 1;
                if (role === "LANDLORD") {
                    chartQuarterData.datasets[0].data[dataIndex] += count;
                } else if (role === "TENANT") {
                    chartQuarterData.datasets[1].data[dataIndex] += count;
                }
            }
        }
    } catch (exception) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', exception);
    }
}

async function loadYearChart() {
    await fetchYearData();
    const ctx = document.getElementById('yearChart').getContext('2d');
    const yearChart = new Chart(ctx, {
        type: 'bar',
        data: chartYearData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const chartYearData = {
    labels: [],
    datasets: [
        {
            label: 'Chủ trọ',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Người tìm trọ',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
};

async function fetchYearData() {
    try {
        const res = await fetch("http://localhost:8080/Oupia/api/stats/year/");
        if (!res.ok) {
            throw new Error('Lỗi khi lấy dữ liệu thống kê.');
        }
        const rawData = await res.json();

        const yearLabels = [];
        const landlordData = [];
        const tenantData = [];

        for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
                const year = parseInt(key);
                yearLabels.push(year.toString());
                let landlordCount = 0;
                let tenantCount = 0;
                for (const dataPoint of rawData[key]) {
                    const role = dataPoint[1];
                    const count = dataPoint[2];
                    if (role === "LANDLORD") {
                        landlordCount += count;
                    } else if (role === "TENANT") {
                        tenantCount += count;
                    }
                }
                landlordData.push(landlordCount);
                tenantData.push(tenantCount);
            }
        }

        chartYearData.labels = yearLabels;
        chartYearData.datasets[0].data = landlordData;
        chartYearData.datasets[1].data = tenantData;
    } catch (exception) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', exception);
    }
}

function updateMonthChart() {
    const existingChart = Chart.getChart('monthChart');
    if (existingChart) {
        existingChart.destroy();
    }

    loadMonthChart();
}

function updateQuarterChart() {
    const existingChart = Chart.getChart('quarterChart');
    if (existingChart) {
        existingChart.destroy();
    }

    loadQuarterChart();
}
