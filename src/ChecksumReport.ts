import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import fsp from 'fs/promises';

// --------------
// INTERNAL TYPES
// --------------

/** The checksum of a single file. */
export declare type ChecksumFile = {

	/** The relative path to the file in the checksum package. */
	path: string;

	/** The unique file hash based on it's contents. */
	hash: string;
};

/** The checksum of a package of files. */
export declare type Checksum = {

	/** The unique identifier of the checksum. */
	id: string;

	/** The date the checksum was generated. */
	timestamp: Date;

	/** The package of files. */
	files: ChecksumFile[];
};

// --------------
// MODULE EXPORTS
// --------------

/**
 * NodeJS utility library to generate checksums for files and directories.
 * 
 * @example
 * ```js
 * import { ChecksumReport } from '@objekt/checksum-generator';
 * 
 * // Generate and save a checksum for a directory.
 * const report = await ChecksumReport.get('./dist', './dist/checksum.json');
 * ```
 */
export const ChecksumReport = {

	/**
	 * Generate a checksum file for a given directory path.
	 * 
	 * @param directoryPath - The path to generate a checksum for.
	 * 
	 * @returns A JSON string containing the directory checksum.
	 */
	get: async (buildPath: string): Promise<string> => {

		// Generate a checksum output for the build.
		const filePaths = await getDirectoryFileList(buildPath);
		const checksum: Checksum = { id: '', timestamp: new Date(), files: [] };

		for (const filePath of filePaths) {

			checksum.files.push({
				path: path.relative(buildPath, filePath),
				hash: await getFileHash(filePath)
			} as ChecksumFile);
		}

		// Create an unique id for the build by combining all hashes.
		checksum.id = getDataHash(checksum.files.reduce((acc, curr) => acc + curr.hash, ''));

		// Return the resulting checksum hash once done.
		return JSON.stringify(checksum);
	},

	/**
	 * Generate a checksum file for a given directory path and saves it to disk.
	 * 
	 * @param directoryPath - The path to the directory to generate a checksum for.
	 * @param outputPath - The path to save the checksum output to, defaults to checksum.json in the given directory.
	 */
	save: async (directoryPath: string, outputPath?: string): Promise<void> => {

		// Set the default output file path.
		if (!outputPath) {
			outputPath = path.join(directoryPath, 'checksum.json');
		}

		// Generate the directory checksum.
		const checksum = ChecksumReport.get(directoryPath);

		// Write the checksum output the specified directory.
		await fsp.writeFile(
			outputPath,
			JSON.stringify(checksum)
		);
	}
};

// ----------------
// HELPER FUNCTIONS
// ----------------

/**
 * Gets a flat lists of file paths that exist in a given directory and its sub-directories.
 * 
 * @param directory - The directory to get a file list for.
 * 
 * @returns The list of file path in the directory structure.
 */
async function getDirectoryFileList(directory: string): Promise<string[]> {

	const files = [];

	const filesInDirectory = await fsp.readdir(directory);

	for (const file of filesInDirectory) {

		const absolute: string = path.join(directory, file);

		if ((await fsp.stat(absolute)).isDirectory()) {
			files.push(...(await getDirectoryFileList(absolute)));
		} else {
			files.push(absolute);
		}
	}

	return files;
}

/**
 * Generates a checksum hash string for a given string value.
 * 
 * @param value - The string value to generate a checksum for.
 * 
 * @returns The checksum hash string.
 */
function getDataHash(value: string): string {

	// Create a hashing function to apply against the data value.
	const hash = crypto.createHash('sha1');
	hash.setEncoding('hex');

	// Write the value through the hashing function to generate the checksum.
	hash.write(value);

	// Return the resulting checksum hash once done.
	return hash.digest('hex');
}

/**
 * Generates a checksum string for a given file.
 * 
 * @param filePath - The file to generate a checksum for.
 * 
 * @returns The checksum hash string.
 */
async function getFileHash(filePath: string): Promise<string> {

	// Create a stream to read the file.
	const fileStream = fs.createReadStream(filePath);

	// Create a hashing function to apply against the file contents.
	const hash = crypto.createHash('sha1');
	hash.setEncoding('hex');

	// Pipe the file through the hashing function to generate the checksum.
	fileStream.pipe(hash);

	// Return the resulting checksum hash once done.
	return new Promise(function (resolve, reject) {
		fileStream.on('end', () => resolve(hash.read() as string));
		fileStream.on('error', reject);
	});
}