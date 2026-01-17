import { o as objectType, q as dateType, v as arrayType, s as stringType, w as numberType, x as coerce } from './astro/server_Bz_JKUht.mjs';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
objectType({
  tags: arrayType(stringType()).optional(),
  lastModified: dateType().optional()
});

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

const renderEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const imageSchema = objectType({
  url: stringType(),
  width: numberType(),
  height: numberType()
});
const featuredImagesSchema = objectType({
  thumbnail: imageSchema,
  medium: imageSchema,
  medium_large: imageSchema,
  large: imageSchema,
  full: imageSchema
});
const BaseWPSchema = objectType({
  id: numberType(),
  slug: stringType(),
  title: objectType({
    rendered: stringType()
  }),
  content: objectType({
    rendered: stringType()
  }),
  featured_images: featuredImagesSchema,
  acf: objectType({
    subtitle: stringType()
  })
});
const gallerySchema = objectType({
  large: imageSchema,
  full: imageSchema
});
const GalleryPageSchema = BaseWPSchema.extend({
  gallery: arrayType(gallerySchema)
});
const processSchema = objectType({
  title: stringType(),
  description: stringType(),
  image: stringType()
});
const ProcessWPSchema = BaseWPSchema.extend({
  acf: objectType({
    subtitle: stringType()
  }).catchall(processSchema)
});
const CategorySchema = objectType({
  id: numberType(),
  name: stringType(),
  slug: stringType()
});
const CategoriesSlugSchema = arrayType(
  CategorySchema.pick({ slug: true })
);
const CategoriesSchema = arrayType(CategorySchema);
const PostSchema = BaseWPSchema.omit({
  acf: true
}).extend({
  date: stringType(),
  category_details: CategoriesSchema
});
const PostsSchema = arrayType(PostSchema);
const MenuItemSchema = BaseWPSchema.pick({
  title: true,
  featured_images: true
}).extend({
  acf: objectType({
    description: stringType(),
    price: coerce.number()
  })
});
const MenuItemsSchema = arrayType(MenuItemSchema);
const MarkerSchema = objectType({
  label: stringType(),
  lat: numberType(),
  lng: numberType()
});
const LocationSchema = objectType({
  lat: numberType(),
  lng: numberType(),
  zoom: numberType(),
  markers: arrayType(MarkerSchema)
});
const TestimonialSchema = BaseWPSchema.pick({
  title: true,
  content: true
});
const TestimonialsSchema = arrayType(TestimonialSchema);
const ContactPageSchema = BaseWPSchema.extend({
  acf: objectType({
    subtitle: stringType()
  }).catchall(LocationSchema)
});

export { BaseWPSchema as B, CategorySchema as C, GalleryPageSchema as G, MenuItemsSchema as M, PostsSchema as P, TestimonialsSchema as T, CategoriesSlugSchema as a, PostSchema as b, ContactPageSchema as c, ProcessWPSchema as d };
