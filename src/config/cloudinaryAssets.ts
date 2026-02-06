/**
 * Cloudinary Assets Configuration
 * 
 * Upload your project images to Cloudinary, then replace the placeholder URLs below
 * with your actual Cloudinary URLs.
 * 
 * Cloudinary URL format:
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/folder/filename.jpg
 * 
 * For videos:
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/folder/filename.mp4
 */

export interface ProjectAsset {
  thumbnail: string;
  images?: string[];
  videos?: string[];
  demo?: string;
  github?: string;
}

export interface CloudinaryAssets {
  // Profile Images
  profile: {
    formal: string;
    casual?: string;
    avatar?: string;
  };

  // UI/UX Design Projects
  uiux: {
    [key: string]: ProjectAsset;
    ferryeasy: ProjectAsset;
    creativePro: ProjectAsset;
    ecommerce: ProjectAsset;
    healthcare: ProjectAsset;
    analytics: ProjectAsset;
  } & { [key: string]: ProjectAsset };

  // Graphic Design Projects
  graphicDesign: {
    [key: string]: ProjectAsset;
    businessCards: ProjectAsset;
    cebudocShirts: ProjectAsset;
    coffeescapeCards: ProjectAsset;
    coffeescapeLogo: ProjectAsset;
    coffeescapePackaging: ProjectAsset;
    ferryeasyLogo: ProjectAsset;
    packagingDesign: ProjectAsset;
    tartetartBoxes: ProjectAsset;
    scsPoloshirts: ProjectAsset;
  } & { [key: string]: ProjectAsset };

  // Video Production Projects
  videoProduction: {
    [key: string]: ProjectAsset;
    purpleCowAgency: ProjectAsset;
    purpleCowPhilippines: ProjectAsset;
    delishDeli: ProjectAsset;
    synergy: ProjectAsset;
    boligcenterGarden: ProjectAsset;
    queenPoblacion: ProjectAsset;
    xeleqtAgility: ProjectAsset;
    xeleqtAware: ProjectAsset;
    xeleqtMobility: ProjectAsset;
    returnZero: ProjectAsset;
  } & { [key: string]: ProjectAsset };

  // Web Development Projects
  webDevelopment: {
    [key: string]: ProjectAsset;
    portfolio: ProjectAsset;
    // Add your web projects here
  } & { [key: string]: ProjectAsset };

  // Mobile App Projects
  mobileApps: {
    [key: string]: ProjectAsset;
  } & { [key: string]: ProjectAsset };
}

// Replace these placeholder URLs with your actual Cloudinary URLs
export const cloudinaryAssets: CloudinaryAssets = {
  profile: {
    formal: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1770309344/des-formal-pic_yybba8.jpg',
    casual: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/profile/des-casual.jpg',
    avatar: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/profile/avatar.jpg',
  },

  uiux: {
    ferryeasy: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/ferryeasy/thumbnail.jpg',
      images: [
        'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/ferryeasy/screen-1.jpg',
        'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/ferryeasy/screen-2.jpg',
        'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/ferryeasy/screen-3.jpg',
      ],
      demo: 'https://ferryeasy-demo.com',
      github: 'https://github.com/yourname/ferryeasy',
    },
    creativePro: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/creative-pro/thumbnail.jpg',
      images: [],
    },
    ecommerce: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/ecommerce/thumbnail.jpg',
      images: [],
    },
    healthcare: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/healthcare/thumbnail.jpg',
      images: [],
    },
    analytics: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/analytics/thumbnail.jpg',
      images: [],
    },
  },

  graphicDesign: {
    businessCards: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916541/bc-mockup-1_owv2d0.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916541/bc-mockup-1_owv2d0.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916542/bc-mockup-2_lqpsv9.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916543/bc-mockup-3_wchukl.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916546/bc-mockup-4_pzkhnu.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769916547/bc-mockup-5_jxdbkp.png',
      ],
    },
    cebudocShirts: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918593/new_man_front_qvmpdj.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918593/new_man_front_qvmpdj.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918590/new_man_back_fac_zpwjy4.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918592/new_man_back_soc_a13gj2.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918594/new_man_front_and_back_fac_yvve8f.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918594/new_man_front_and_back_soc_xm40kg.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918600/new_woman_front_rpi0j4.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918595/new_woman_back_fac_deh0iv.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918597/new_woman_back_soc_answ2l.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918597/new_woman_front_and_back_fac_xpssja.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918598/new_woman_front_and_back_soc_ocghfz.png',
      ],
    },
    coffeescapeCards: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918643/business_card_front-01_pcvjls.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918643/business_card_front-01_pcvjls.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918646/to_print_-_business_cards-02_back_mm24r8.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918644/coffeescape_-_brochure_o8m0g2.png',
      ],
    },
    coffeescapeLogo: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918682/logo_with_typeface_-_transparent_ejrwcj.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918682/logo_with_typeface_-_transparent_ejrwcj.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918681/logo_with_typeface_-_black_transparent_kckpyh.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918673/logo_-_transparent_bucssb.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918672/logo_-_black_transparent_gqbepf.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918679/logo_and_typeface_w_ph_zjytmk.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918675/logo_and_typeface_w_ph_-_black_yctttn.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918677/logo_and_typeface_w_ph_-_white_xkifw2.png',
      ],
    },
    coffeescapePackaging: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918733/mockup_zwhnuh.jpg',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918733/mockup_zwhnuh.jpg',
      ],
    },
    ferryeasyLogo: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918769/ferryeasy-logo-01_x2pepz.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918769/ferryeasy-logo-01_x2pepz.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918770/ferryeasy-logo-02_lsgnb6.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918772/ferryeasy-logo-03_fjlit9.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918775/ferryeasy-logo-04_irzzy0.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918777/ferryeasy-logo-05_kkvnm9.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918779/ferryeasy-logo-06_tgvuqh.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918780/white_logo-02_eyh0uu.png',
      ],
    },
    packagingDesign: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918848/aim_nuance_1_roiurd.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918848/aim_nuance_1_roiurd.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918850/aim_nuance_2_qoltbt.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918852/aim_nuance_3_bwfpob.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769918854/box_new_perspective_qiebkw.png',
      ],
    },
    tartetartBoxes: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919182/tarteart_box_mockup_1_hibunk.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919182/tarteart_box_mockup_1_hibunk.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919184/tarteart_box_mockup_2_zicb3p.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919186/tarteart_box_mockup_3_yu6gs6.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919190/tarteart_box_mockup_4_y0tczj.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919191/tarteart_box_mockup_5_gpwybm.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919194/tarteart_box_mockup_6_swcjlm.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919197/tarteart_box_mockup_7_aauhlg.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919201/tartetart_box_mockup_ne1nka.png',
      ],
    },
    scsPoloshirts: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919140/design_1_man_front_ig8sfd.png',
      images: [
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919140/design_1_man_front_ig8sfd.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919137/design_1_man_back_lcjc8n.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919145/design_1_woman_front_q8urvx.png',
        'https://res.cloudinary.com/du4nug3uk/image/upload/v1769919142/design_1_woman_back_bevhy2.png',
      ],
    },
  },

  videoProduction: {
    purpleCowAgency: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_0/v1769918820/Purple_Cow_Agency_g2jsuq.jpg',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769918820/Purple_Cow_Agency_g2jsuq.mp4',
      ],
    },
    purpleCowPhilippines: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_0/v1769918814/Purple_Cow_Philippines_g3uri5.jpg',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769918814/Purple_Cow_Philippines_g3uri5.mp4',
      ],
    },
    delishDeli: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_0/v1769918817/Delish_Deli_-_1Nito_Tower_pejste.jpg',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769918817/Delish_Deli_-_1Nito_Tower_pejste.mp4',
      ],
    },
    synergy: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_0/v1769918817/Synergy768_zlqtyh.jpg',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769918817/Synergy768_zlqtyh.mp4',
      ],
    },
    boligcenterGarden: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_0/v1769916483/is_your_garden_screaming_4_lgbsgs.jpg',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769916483/is_your_garden_screaming_4_lgbsgs.mp4',
      ],
    },
    queenPoblacion: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_8/v1770304867/queen_poblacion_into_final_frfwh0.jpg?v=2',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1770304867/queen_poblacion_into_final_frfwh0.mp4',
      ],
    },
    xeleqtAgility: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_12/v1769919666/agility_avp_final_woeg4w.jpg?v=2',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769919666/agility_avp_final_woeg4w.mp4',
      ],
    },
    xeleqtAware: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_12/v1769919672/aware_avp_final_gzihxt.jpg?v=2',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769919672/aware_avp_final_gzihxt.mp4',
      ],
    },
    xeleqtMobility: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_2/v1769919693/xeleqt_mobility_uuek1r.jpg?v=2',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1769919693/xeleqt_mobility_uuek1r.mp4',
      ],
    },
    returnZero: {
      thumbnail: 'https://res.cloudinary.com/du4nug3uk/video/upload/so_20/v1770305288/return_zero_vtr_final_wes0vb.jpg?v=2',
      videos: [
        'https://res.cloudinary.com/du4nug3uk/video/upload/v1770305288/return_zero_vtr_final_wes0vb.mp4',
      ],
    },
  },

  webDevelopment: {
    portfolio: {
      thumbnail: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/projects/portfolio/thumbnail.jpg',
      images: [],
      demo: 'https://your-portfolio.com',
      github: 'https://github.com/yourname/portfolio',
    },
  },

  mobileApps: {},
};

// Helper function to get asset URL with fallback
export function getCloudinaryAsset(
  category: keyof CloudinaryAssets,
  project: string,
  type: 'thumbnail' | 'images' | 'videos' | 'demo' | 'github' = 'thumbnail',
  index?: number
): string | string[] | undefined {
  try {
    const categoryAssets = cloudinaryAssets[category];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projectAsset = (categoryAssets as any)[project] as ProjectAsset;

    if (!projectAsset) return undefined;

    if (type === 'images' && index !== undefined && projectAsset.images) {
      return projectAsset.images[index];
    }

    if (type === 'videos' && index !== undefined && projectAsset.videos) {
      return projectAsset.videos[index];
    }

    return projectAsset[type];
  } catch (error) {
    console.error(`Failed to get Cloudinary asset: ${category}/${project}/${type}`, error);
    return undefined;
  }
}

// Helper to adapt ProjectAsset to component format (thumbnail + assets array)
export function getProjectAssets(
  category: keyof CloudinaryAssets,
  project: string
): { thumbnail: string; assets: string[] } | undefined {
  try {
    const categoryAssets = cloudinaryAssets[category];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projectAsset = (categoryAssets as any)[project] as ProjectAsset;

    if (!projectAsset) return undefined;

    // Combine images and videos into a single assets array
    const assets = [
      ...(projectAsset.images || []),
      ...(projectAsset.videos || []),
    ];

    return {
      thumbnail: projectAsset.thumbnail,
      assets,
    };
  } catch (error) {
    console.error(`Failed to get project assets: ${category}/${project}`, error);
    return undefined;
  }
}

// Helper to get all assets for a category
export function getCategoryAssets(
  category: keyof CloudinaryAssets
): Record<string, { thumbnail: string; assets: string[] }> {
  const categoryData = cloudinaryAssets[category];
  const result: Record<string, { thumbnail: string; assets: string[] }> = {};

  for (const [key, value] of Object.entries(categoryData)) {
    if (typeof value === 'object' && 'thumbnail' in value) {
      const assets = [
        ...((value as ProjectAsset).images || []),
        ...((value as ProjectAsset).videos || []),
      ];
      result[key] = {
        thumbnail: (value as ProjectAsset).thumbnail,
        assets,
      };
    }
  }

  return result;
}

// Export individual categories for easier access
export const {
  profile,
  uiux,
  graphicDesign,
  videoProduction,
  webDevelopment,
  mobileApps,
} = cloudinaryAssets;
