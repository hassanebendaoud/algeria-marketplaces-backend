const createUniqueSlug = async (Model: any, value: string) => {
  let slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  let count = await Model.countDocuments({
    slug: new RegExp("^" + slug + "(-[0-9]*)?$", "i"),
  });
  if (count > 0) {
    slug = slug + "-" + count;
  }
  return slug;
};

export default createUniqueSlug;
