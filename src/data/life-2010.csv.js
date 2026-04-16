import {csvParse, csvFormat} from "d3-dsv";

async function text(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.text();
}

const url = "https://datavis.cs.columbia.edu/files/data/gapminder/life-expectancy.csv";

const rawText = await text(url);
const lifeExpectancy = csvParse(rawText);

const filteredData = lifeExpectancy.filter(d => d.Year === "2010");


process.stdout.write(csvFormat(filteredData));


