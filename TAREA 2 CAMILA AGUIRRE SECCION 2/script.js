// Datos del sueño (horas por día)
const sueno = [
    {dia: "Lunes", horas: 7.5},
    {dia: "Martes", horas: 10},
    {dia: "Miércoles", horas: 10},
    {dia: "Jueves", horas: 7.5},
    {dia: "Viernes", horas: 10},
    {dia: "Sábado", horas: 12},
    {dia: "Domingo", horas: 12}
];

const svg = d3.select("svg");
const svgWidth = +svg.attr("width");
const svgHeight = +svg.attr("height");

// Márgenes para separar barras de los bordes y del eje X
const margin = { top: 50, right: 30, bottom: 50, left: 100 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Crear un grupo dentro del SVG para respetar los márgenes
const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Escalas
const x = d3.scaleBand()
    .domain(sueno.map(d => d.dia))
    .range([0, width])
    .padding(0.4);

const y = d3.scaleLinear()
    .domain([0, d3.max(sueno, d => d.horas) + 2]) // espacio extra arriba
    .range([height, 0]);

// Dibujar barras
g.selectAll("rect")
  .data(sueno)
  .join("rect")
  .attr("x", d => x(d.dia))
  .attr("y", d => y(d.horas))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.horas))
  .attr("fill", "steelblue")
  .attr("rx", 12)
  .attr("ry", 12);

// Eje X (días)
g.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("font-size", "14px");

// Eje Y (horas)
g.append("g")
  .call(d3.axisLeft(y).ticks(6))
  .selectAll("text")
  .attr("font-size", "12px");

// Etiqueta del eje Y
g.append("text")
  .attr("x", -height/2)
  .attr("y", -margin.left + 20)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Horas de sueño")
  .attr("fill", "#1e3a8a")
  .attr("font-size", 14);

// Etiquetas sobre cada barra
g.selectAll("text.bar-label")
  .data(sueno)
  .join("text")
  .attr("class", "bar-label")
  .attr("x", d => x(d.dia) + x.bandwidth()/2)
  .attr("y", d => y(d.horas) - 8)
  .attr("text-anchor", "middle")
  .text(d => d.horas + "h")
  .attr("fill", "#1e3a8a")
  .attr("font-size", 12);
// http://localhost:8000/index.html vizualisar grafico//
