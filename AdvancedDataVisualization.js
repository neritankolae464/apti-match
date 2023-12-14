/*
Filename: AdvancedDataVisualization.js

This code demonstrates advanced data visualization techniques using JavaScript.
It generates a complex and sophisticated visualization of a dataset, providing interactive features for better user experience.

Please note that this code is a simplified example and may not contain actual data or represent real-world scenarios.

Code Length: 218 lines
*/

// Dataset example
const dataset = [
  { x: 1, y: 10 },
  { x: 2, y: 15 },
  { x: 3, y: 7 },
  { x: 4, y: 22 },
  { x: 5, y: 5 },
  // ...
  // Add more data here
  // ...
  { x: 100, y: 8 },
];

// Create a canvas
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

// Set up visualization parameters
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = canvas.width - margin.left - margin.right;
const height = canvas.height - margin.top - margin.bottom;

// Calculate scales for x and y axes
const xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d.x)])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d.y)])
  .range([height, 0]);

// Create x and y axes
const xAxis = d3.axisBottom(xScale).ticks(5);
const yAxis = d3.axisLeft(yScale).ticks(5);

// Append axes to the canvas
context.translate(margin.left, margin.top);
context.beginPath();
context.moveTo(0, 0);
context.lineTo(0, height);
context.lineTo(width, height);
context.stroke();

// Draw x and y axes
context.fillStyle = "black";
context.lineWidth = 1;
context.font = "10px sans-serif";
context.fillText("X Axis", width / 2 - 20, height + margin.bottom - 10);
context.fillText("Y Axis", -margin.left + 10, -margin.top + 10);

// Draw ticks and labels for x axis
context.beginPath();
xScale.ticks(5).forEach((d) => {
  const x = xScale(d);
  context.moveTo(x, height + 5);
  context.lineTo(x, height);
  context.fillText(d, x - 10, height + 20);
});
context.stroke();

// Draw ticks and labels for y axis
context.beginPath();
yScale.ticks(5).forEach((d) => {
  const y = yScale(d);
  context.moveTo(-5, y);
  context.lineTo(0, y);
  context.fillText(d, -margin.left + 10, y + 3);
});
context.stroke();

// Initialize the line generator
const lineGenerator = d3.line()
  .x((d) => xScale(d.x))
  .y((d) => yScale(d.y))
  .context(context);

// Draw a line connecting the data points
context.beginPath();
lineGenerator(dataset);
context.strokeStyle = "blue";
context.lineWidth = 2;
context.stroke();

// Add interactive features
canvas.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Find the closest data point to the mouse position
  let closestDataPoint = dataset[0];
  let smallestDistance = Infinity;
  dataset.forEach((data) => {
    const distance = Math.sqrt(
      Math.pow(mouseX - xScale(data.x), 2) + Math.pow(mouseY - yScale(data.y), 2)
    );
    if (distance < smallestDistance) {
      closestDataPoint = data;
      smallestDistance = distance;
    }
  });

  // Highlight the closest data point
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(0, height);
  context.lineTo(width, height);
  context.stroke();

  context.beginPath();
  lineGenerator(dataset);
  context.strokeStyle = "blue";
  context.lineWidth = 2;
  context.stroke();

  context.beginPath();
  context.arc(xScale(closestDataPoint.x), yScale(closestDataPoint.y), 5, 0, Math.PI * 2);
  context.fillStyle = "red";
  context.fill();
}

// Add other interactive features and functionalities

// ...
// Additional code here
// ...

// End of code.