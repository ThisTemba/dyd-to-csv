# Parse DYD

Parse DYD is a script that converts `.dyd` files into `.csv` files. It is written in JavaScript but can run on any operating system as an executable file.

## Usage

1. Download the right executable for your operating system and place it in a new folder.
2. Copy the `.dyd` file you want to convert to the same folder and rename it `input.dyd`.
3. Run the script by double clicking the exectuable file. The csv output `output.csv` will be added to the same folder.
4. Optional: Rename the output file, move it to the desired directory on your system and delete the folder with the script and the input file.

## Development

[Node.js](https://nodejs.org/en/) must be installed on your system.

1. Clone the repository
2. Edit the `parseDyd.js` file
3. Package the script using `pkg parseDyd.js` (you will need to install [`pkg`](https://www.npmjs.com/package/pkg) first)
