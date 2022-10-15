const fs = require("fs");

function mergeObjects(objectList) {
  const newObject = {};
  objectList.forEach((o) => {
    Object.keys(o).forEach((key) => {
      newObject[key] = o[key];
    });
  });
  return newObject;
}

function getLongestRow(collection) {
  let longestRow = collection[0];
  collection.forEach((row) => {
    const numRowKeys = Object.keys(row).length;
    const numLongestRowKeys = Object.keys(longestRow).length;
    if (numRowKeys > numLongestRowKeys) {
      longestRow = row;
    }
  });
  return longestRow;
}

function getBodyProps(bodyString) {
  const properties = bodyString
    .split(' "')
    .filter((s) => s !== " " && s !== "")
    .map((messyString, i) => {
      const split = messyString.split('"');
      const key = split[0].trim();
      const value = split[1].trim();
      return { [key]: value };
    });
  return properties;
}

function getHeadProps(headString) {
  const regexQuoteNearSpace = /\s\"|\"\s/; // matches [space then "] or [" then space]
  const regexInQutes = /\"[^\"]*\"/g; // matches anything in quotes
  const regexMultipleSpaces = /\s+/g; // matches one or more spaces
  const name = headString.split(regexQuoteNearSpace)[1];

  const headerPropsList = headString
    .replaceAll(regexInQutes, "")
    .split(regexMultipleSpaces)
    .filter((s) => s !== "");
  const h1 = headerPropsList[0];
  const h2 = headerPropsList[1];
  const h3 = headString.split(regexQuoteNearSpace)[3];
  const h4 = headerPropsList[4].split("=")[1];

  const headerProps = [{ name }, { h1 }, { h2 }, { h3 }, { h4 }];
  return headerProps;
}
function chunksToCollection(chunks) {
  return chunks.map((chunk) => {
    const lines = chunk.split("/\r\n");
    const headString = lines[0];
    const bodyString = lines.slice(1).join("").split("\r\n")[0];

    const bodyProps = getBodyProps(bodyString);
    const headProps = getHeadProps(headString);

    const row = mergeObjects([...headProps, ...bodyProps]);
    return row;
  });
}

function dydToChunks(filename) {
  const dyd = fs.readFileSync(filename, "utf8");
  const chunks = dyd.split("cmpldw").slice(1);
  return chunks;
}

function dydToCollection(filename) {
  const chunks = dydToChunks(filename);
  const collection = chunksToCollection(chunks);
  return collection;
}

function collectionToCsv(origCollection) {
  const collection = transposeCollection(origCollection);
  const header = Object.keys(collection[0]);
  const rows = collection.map((row) => Object.values(row));
  const csv = [header, ...rows].map((row) => row.join(",")).join("\r\n");
  return csv;
}

function transposeCollection(collection) {
  const longestRow = getLongestRow(collection);
  const transposed = Object.keys(longestRow).map((key) => {
    const values = collection.map((row) => {
      return { [row.name]: row[key] } || { [row.name]: "" };
    });
    return mergeObjects([{ name: key }, ...values]);
  });
  return transposed.slice(1);
}

function dydToCsv(inputFilename, outputFilename) {
  const collection = dydToCollection(inputFilename); // a collection is a list of objects
  const csv = collectionToCsv(collection);
  fs.writeFileSync(outputFilename, csv, "utf8");
}

function findDydFilenames(dir) {
  const filenames = fs.readdirSync(dir);
  const dydFilenames = filenames.filter((file) => file.endsWith(".dyd"));
  return dydFilenames;
}

// dyd to chunks to collection to csv
// current folder
const inputDir = "./";
const dydFilenames = findDydFilenames(inputDir);
dydFilenames.forEach((inputFilenames) => {
  const outputFilename = inputFilenames.replace(".dyd", ".csv");
  dydToCsv(inputFilenames, outputFilename);
});
