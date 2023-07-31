export type SectionType = 'donation' | 'featured-collection' | 'image-banner' | 'video-banner' | 'youtube-feed' | 'instagram-feed';

export type Section = {
  sectionType: SectionType
}

export type WebsiteDefinition = {
  font: string,
  titleFont: string,
  sections: Section[],
}