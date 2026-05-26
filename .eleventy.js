module.exports = function(eleventyConfig) {
  
  // 1. PASSTHROUGH FILES (Copies static assets directly to the live build folder)
  // Copies the entire admin folder containing index.html and config.yml
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Copies your media uploads folder so Decap CMS and your HTML can access the images
  eleventyConfig.addPassthroughCopy("src/images");

  // 2. SHORTCUTS & CONFIGURATION
  // Allows you to use short names like 'layouts/base.html' cleanly in your files
  eleventyConfig.addLayoutAlias('layouts/base.html', 'layouts/base.html');

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes", // Look here for layouts and structural components
      data: "_data"          // Look here for global data files like site.json
    },
    // Enables parsing of HTML files with liquid/nunjucks template engines
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};