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

    // Featured posts (homepage)
  eleventyConfig.addCollection("featured", function(collectionApi) {
    return collectionApi
      .getAllSorted()
      .filter(item => item.data.featured);
  });

  // Latest writings (excluding books)
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

  // Latest books
  eleventyConfig.addCollection("latestBooks", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/posts/books/*.md")
      .reverse();
  });


  // Bengali Date Filter
const bengaliMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর"
];

const bnNumbers = (value) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

eleventyConfig.addFilter("bnDate", function(date) {
  const d = new Date(date);

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