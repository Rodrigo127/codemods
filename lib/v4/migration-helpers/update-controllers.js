const { join } = require('path');
const { inspect } = require('util');
const fs = require('fs-extra');

const logger = require('../../global/utils/logger');

/**
 * @description Create core controllers.
 *
 * @param {string} apiPath Path to the current api
 * @param {string} apiName Name of the API
 */
module.exports = async (apiPath, apiName) => {
  try {
    if (String(process.env.CREATE_CORES).toUpperCase() === "TRUE") {
      // Recreate the file with new content
      const v4FilePath = join(apiPath, 'controllers', `${apiName}.js`);
      await fs.remove(v4FilePath);
      await fs.ensureFile(v4FilePath);
      const file = fs.createWriteStream(v4FilePath);
      file.write(
        `const { createCoreController } = require('@strapi/strapi').factories;`
      );
      file.write(
        `\nmodule.exports = createCoreController('api::${apiName}.${apiName}');`
      );
      file.end();
    }
  } catch (error) {
    logger.error(`an error occured when creating controllers core for ${apiName}`);
  }
};
