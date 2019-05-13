const d3 = window.d3;

window.addEventListener('DOMContentLoaded', (e) => {
  getData();
});

const drawChart = (data) => {
  const ChartTitle = 'United States GDP';
  const chartWidth = 800;
  const chartHeight = 500;
  const chartPadding = 50;
  const barWidth = 2.2;

  // Title
  d3.select('#chart-container')
    .append('h1')
    .attr('id', 'title')
    .text(ChartTitle);

  // Create the chart svg
  const svg = d3
    .select('#chart-container')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('class', 'chart')
    .style('box-shadow', '1px 1px 1px 1px #222222');

  // Axes
  const quarters = data.map((data) => {
    const year = parseInt(data[0].split('-')[0]);
    const month = parseInt(data[0].split('-')[1]);
    switch (month) {
      case 4:
        return year + 0.25;
        break;
      case 7:
        return year + 0.5;
        break;
      case 10:
        return year + 0.75;
        break;
      default:
        return year;
    }
  });
  const gdp = data.map((data) => data[1]);

  const xDomain = [d3.min(quarters), d3.max(quarters)];
  const xRange = [0, `${chartWidth - chartPadding * 2}`];

  const yDomain = [d3.max(gdp), 0];
  const yRange = [0, `${chartHeight - chartPadding * 2}`];

  const xScale = d3
    .scaleLinear()
    .domain(xDomain)
    .range(xRange);

  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range(yRange);

  const xAxis = d3.axisBottom(xScale).ticks(10, 'f');
  const yAxis = d3.axisLeft(yScale);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr(
      'transform',
      `translate(${chartPadding}, ${chartHeight - chartPadding})`
    )
    .call(xAxis);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${chartPadding}, ${chartPadding})`)
    .call(yAxis);

  // Draw bars
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('data-date', (data) => data[0])
    .attr('data-gdp', (data) => data[1])
    .attr('class', 'bar')
    // .attr('fill', barColor)
    .attr('x', (data, i) => parseFloat(xScale(quarters[i])) + chartPadding)
    .attr('y', (data, i) => yScale(gdp[i]) + chartPadding)
    .attr('width', barWidth)
    .attr(
      'height',
      (data, i) => chartHeight - yScale(gdp[i]) - chartPadding * 2
    );

  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar) => {
    bar.addEventListener('mouseenter', (e) => {
      const date = e.target.getAttribute('data-date');
      const gdp = e.target.getAttribute('data-gdp');
      drawTooltip(e.clientX, date, gdp);
    });
    bar.addEventListener('mouseout', (e) => {
      const tooltip = document.getElementById('tooltip');
      if (tooltip) tooltip.style.visibility = 'hidden';
    });
  });
};

const drawTooltip = (mouseX, date, gdp) => {
  const offsetX = 50;
  const positionY = 300;

  const tooltip = document.getElementById('tooltip');

  tooltip.style.top = positionY;
  // tooltip.style.left = mouseX + offsetX;
  tooltip.style.left = 100;
  tooltip.style.visibility = 'visible';
  tooltip.setAttribute('data-date', date);

  const year = parseInt(date.split('-')[0]);
  const quarter = (() => {
    switch (date.split('-')[1]) {
      case '01':
        return '1';
        break;
      case '04':
        return '2';
        break;
      case '07':
        return '3';
        break;
      case '10':
        return '4';
        break;
      default:
        console.error('Bad Value');
    }
  })();
  const text = `${year} Q${quarter}<br>$${gdp} Billion`;
  tooltip.innerHTML = text;
};

const getData = () => {
  // Retrieve data
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = () => {
    // logData(JSON.parse(xhr.responseText));
    // logData(JSON.parse(xhr.responseText).data);
    drawChart(JSON.parse(xhr.responseText).data);
  };

  xhr.send();
};

const logData = (data) => {
  console.log(data);
};
