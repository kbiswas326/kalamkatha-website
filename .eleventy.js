module.exports = function(eleventyConfig) {
  
  eleventyConfig.addLayoutAlias('base.html', 'base.njk');
  eleventyConfig.addLayoutAlias('layouts/base.html', 'base.njk');

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

  eleventyConfig.addCollection("featured", function(collectionApi) {
    return collectionApi
      .getAllSorted()
      .filter(item => item.data.featured);
  });

  eleventyConfig.addCollection("latest", function(collectionApi) {
    return collectionApi
      .getAllSorted()
      .filter(item => {
        return (
          item.inputPath.includes("/posts/") &&
          !item.inputPath.includes("/posts/books/")
        );
      })
      .reverse();
  });

  eleventyConfig.addCollection("latestBooks", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/posts/books/*.md")
      .reverse();
  });

  // Bengali Date Filter — null-safe
  const bengaliMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const bnNumbers = (value) =>
    String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  eleventyConfig.addFilter("iso", function(date) {
    if (!date) return '';
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("bnDate", function(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return `${bnNumbers(d.getDate())} ${bengaliMonths[d.getMonth()]} ${bnNumbers(d.getFullYear())}`;
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
