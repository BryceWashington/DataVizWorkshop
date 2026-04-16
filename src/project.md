---
title: Project Sketches
---

<style>
  .red h1 { color: red; }
  .blue h1 { color: blue; }
  .green h1 { color: green; }
  .yellow h1 { color: yellow; }
</style>

<details>
<summary>
Details
</summary>

![](https://upload.wikimedia.org/wikipedia/commons/7/72/Igel.JPG)

</details>

<div class="grid grid-cols-3">
  <div class="card red"><h1>A</h1></div>
  <div class="card yellow"><h1>B</h1></div>
  <div class="card blue"><h1>C</h1></div>
  <div class="card grid-colspan-3 green"><h1>D</h1></div>
  <div class="card red"><h1>E</h1></div>
  <div class="card yellow"><h1>F</h1></div>
  <div class="card blue"><h1>G</h1></div>
</div>

```js
const text = "foo bar baz";
const words = text.split(" ");
```

```js
const n = view(Inputs.range([1, words.length], {label: "Number of words", step: 1, value: 10}));
```

${words.slice(0, n).join(" ")}


```js
const gapminder = FileAttachment("./data/gapminder.zip").zip();
```

${gapminder.filenames}

```js
const continents = gapminder.file("gapminder/continents.csv").csv();
```

```js
Inputs.table(continents)
```

```js
const countryNames = Array.from(new Set(continents.map(d => d.Entity)));
```

${countryNames.join(", ")}

```js
const life2010 = FileAttachment("data/life-2010.csv").csv();
```

```js
Inputs.table(life2010)
```

```js
const gdp2010 = FileAttachment("data/gdp-2010.csv").csv();
```

```js
Inputs.table(gdp2010)
```

```js
const dotColor = view(Inputs.radio(["red", "green", "blue"], {label: "Pick a dot color", value: "blue"}));
```

```js
const [life, gdp] = await Promise.all([life2010, gdp2010]);

const joinedData = life.map(l => {
  const matchingGdp = gdp.find(g => g.Entity === l.Entity);
  return {
    country: l.Entity,
    lifeExpectancy: +l["Life expectancy"], // Ensure these are numbers
    gdp: matchingGdp ? +matchingGdp["GDP per capita"] : null
  };
}).filter(d => d.gdp !== null && d.lifeExpectancy !== null);

const chart = Plot.plot({
  grid: true,
  x: {
    type: "log", 
    label: "GDP per capita →",
    domain: d3.extent(joinedData, d => d.gdp)
  },
  y: {
    type: "linear", 
    label: "↑ Life Expectancy",
    domain: d3.extent(joinedData, d => d.lifeExpectancy),
    inset: 10
  },
  marks: [
    Plot.dot(joinedData, {
      x: "gdp", 
      y: "lifeExpectancy", 
      stroke: dotColor, // This reacts to the radio button
      tip: true // Adds a hover tooltip
    })
  ]
});

display(chart);

```




