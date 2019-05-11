const d3 = window.d3;

const ChartTitle = 'Title';
const chartWidth = 800;
const chartHeight = 400;

window.addEventListener('DOMContentLoaded', (e) => {
  getData();
});

const drawChart = (data) => {
  logData(data);

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
    .style('box-shadow', '1px 1px 1px 1px #222222');
  // .style('border', '1px red solid');

  // Axes
  const xScale = d3.scaleLinear();
  // .range([d3.min((d) => d[0]), d3.max((d) => d[1])]);
  const yScale = d3
    .scaleLinear()
    .range([d3.min((d) => d[1]), d3.max((d) => d[1])]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append('g')
    .attr('id', 'x-axis')
    .call(xAxis);

  svg
    .append('g')
    .attr('id', 'y-axis')
    .call(yAxis);

  // Draw bars
  svg
    .selectAll('rect')
    .data(data.data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', 'blue')
    .attr('x', (d, i) => i * (5 + 1))
    .attr('y', (d) => chartHeight - d[1] / 10)
    .attr('width', 5)
    .attr('height', (d) => d[1]);
};

const getData = () => {
  // Retrieve data
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = () => {
    drawChart(JSON.parse(xhr.responseText));
  };

  xhr.send();
};

const logData = (data) => {
  // console.log(data);
};
