import { Model } from 'mongoose';

import { MarketplaceInterface, ProductInterface } from '@/interfaces';

const createUniqueSlug = async (
    model: Model<MarketplaceInterface> | Model<ProductInterface>,
    value: string
) => {
    let slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const count = await model.countDocuments({
        slug: new RegExp('^' + slug + '(-[0-9]*)?$', 'i'),
    });
    if (count > 0) {
        slug = slug + '-' + count;
    }
    return slug;
};

export default createUniqueSlug;
