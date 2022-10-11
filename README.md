# Parse DYD

Parse DYD is a script that converts `.dyd` files into `.csv` files. It is written in JavaScript but can run on any operating system as an executable file.

## Usage

1. Download the right executable for your operating system. To download, click the file in the list above and click "Download" on the top right.
2. Create a new folder somewhere on your computer and place the downloaded executable in that folder.
3. Copy the `.dyd` file you want to convert to the same folder and rename it `input.dyd`.
4. Run the script by double clicking the exectuable file. The `output.csv` file will be added to the folder.
5. Optional: Move the output file to the desired directory on your system and delete the folder with the script and the input file.
![ezgif-1-d6bc7018be](https://user-images.githubusercontent.com/36087610/195167992-2802a7e9-fc14-4edb-8275-9f04dd68a8ca.gif)



### Notes
* You may receive some warnings from your computer about running these executables, you can ignore these
* To speed things up, you can do all the steps above from within your downloads folder. This will work fine so long as you don't have any files called "input.dyd" or "output.csv" already in your Downloads.


## Development

[Node.js](https://nodejs.org/en/) must be installed on your system.

1. Clone the repository
2. Edit the `parseDyd.js` file
3. Package the script using `pkg parseDyd.js` (you will need to install [`pkg`](https://www.npmjs.com/package/pkg) first)

### Dev Notes

* This has only been tested on one file at the time of writing
