module.exports = function(eleventyConfig) {
  
  // THE SAFETY NET: Map the old layout name to the new Nunjucks file
  eleventyConfig.addLayoutAlias('base.html', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('layouts/base.html', 'layouts/base.njk');

  // Your static asset copies
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};