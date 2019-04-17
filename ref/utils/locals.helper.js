exports.setActiveCategory = (categories, valueToCompare) => {
  categories.map(c => {
    if (c.CatID === valueToCompare)
      c.isActive = true;

    return c;
  });
}