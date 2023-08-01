export type SectionType = 'donation' | 'featured-collection' | 'image-banner' | 'video-banner' | 'youtube-feed' | 'instagram-feed';

export type Section = {
  sectionType: SectionType
}

export type WebsiteDefinition = {
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