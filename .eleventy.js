module.exports = function(eleventyConfig) {
  
  // THE SAFETY NET: Map the old layout name to the new Nunjucks file
  eleventyConfig.addLayoutAlias('base.html', 'base.njk');
  eleventyConfig.addLayoutAlias('layouts/base.html', 'base.njk');

  // Your static asset copies
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");

    eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/stories/*.md");
  });

  eleventyConfig.addCollection("poems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/poems/*.md");
  });

  eleventyConfig.addCollection("novels", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/novels/*.md");
  });

  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/essays/*.md");
  });

  eleventyConfig.addCollection("screenplays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/screenplays/*.md");
  });

  eleventyConfig.addCollection("translations", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/translations/*.md");
  });

  eleventyConfig.addCollection("books", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/books/*.md");
  });

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