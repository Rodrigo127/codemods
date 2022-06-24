const { join } = require('path');
const fs = require('fs-extra');

/**
 * Renames files in an api to use a singularize name
 * 
 * @param {string} path - The original path
 * @param {string} oldName - The original name
 * @param {string} newName - The new name to use
 */
const renameApiFilesToSingular = async (path, oldName, newName) => {
  const oldPath = join(path, oldName);
  const newPath = join(path, newName);
  await fs.rename(oldPath, newPath);
  await fs.rename(
    join(newPath, 'controllers', `${oldName}.js`),
    join(newPath, 'controllers', `${newName}.js`)
  );
  const documentationDir = join(newPath, 'documentation');
  const documentationExists = await fs.exists(documentationDir);
  if (documentationExists) {
    const documentationDirs = await fs.readdir(documentationDir);
    for (const dir of documentationDirs) {
      await fs.rename(
        join(documentationDir, dir, `${oldName}.json`),
        join(documentationDir, dir, `${newName}.json`)
      );
    }
  }
  await fs.rename(
    join(newPath, 'services', `${oldName}.js`),
    join(newPath, 'services', `${newName}.js`)
  );
  await fs.rename(
    join(newPath, 'models', `${oldName}.js`),
    join(newPath, 'models', `${newName}.js`)
  );
  await fs.rename(
    join(newPath, 'models', `${oldName}.settings.json`),
    join(newPath, 'models', `${newName}.settings.json`)
  );
};

module.exports = renameApiFilesToSingular
