export type SectionType = 'donation' | 'featured-collection' | 'image-banner' | 'video-banner' | 'youtube-feed' | 'instagram-feed' | 'memberships';

export type Section = {
  widget: SectionType
  parameters: {
    [k: string]: string
  }
}

export type WebsiteDefinition = {
  title: string,
  font: string,
  backgroundColor: string,
  fontColor: string,
  sections: Section[],
}

export type GlobalSetters = {
  setFont: (f: string) => void,
  setBackgroundColor: (f: string) => void,
  setFontColor: (f: string) => void  
};

export type MembershipTier = {
  title: string,
  cost: string,
  perks: string[],
}

export type Product = {
  title: string,
  cost: string,
  image: string
}