import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CHUNK_SIZE = 100; // Number of items per file - change this value as needed
const INPUT_FILE = 'full_data.json';
const OUTPUT_DIR = 'data';
const OUTPUT_PREFIX = 'videos_page_';

async function splitData() {
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_FILE)) {
      throw new Error(`Input file '${INPUT_FILE}' not found.`);
    }

    // Read and parse the JSON file
    console.log(`Reading ${INPUT_FILE}...`);
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    let data;
    try {
      data = JSON.parse(fileContent);
    } catch (parseError) {
      throw new Error(`Invalid JSON in '${INPUT_FILE}': ${parseError.message}`);
    }

    // Ensure data is an array
    if (!Array.isArray(data)) {
      throw new Error(`Expected an array in '${INPUT_FILE}', but got ${typeof data}`);
    }

    console.log(`Found ${data.length} items in the array.`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`Created directory '${OUTPUT_DIR}'.`);
    }

    // Split data into chunks
    const chunks = [];
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      chunks.push(data.slice(i, i + CHUNK_SIZE));
    }

    console.log(`Splitting into ${chunks.length} files with up to ${CHUNK_SIZE} items each.`);

    // Write each chunk to a file
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const fileName = `${OUTPUT_PREFIX}${i + 1}.json`;
      const filePath = path.join(OUTPUT_DIR, fileName);

      const jsonContent = JSON.stringify(chunk, null, 2); // Pretty print with 2 spaces
      fs.writeFileSync(filePath, jsonContent, 'utf8');

      console.log(`Created ${filePath} with ${chunk.length} items.`);
    }

    console.log(`\nSuccessfully created ${chunks.length} files in '${OUTPUT_DIR}'.`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
splitData();