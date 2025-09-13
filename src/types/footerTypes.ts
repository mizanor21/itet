export interface CampusLink {
  label: string;
  path: string;
}

export interface PageLink {
  label: string;
  path: string;
}

export interface RecentPost {
  date: string;
  title: string;
  image: string;
  href: string;
}

export interface FooterData {
  campusLinks: CampusLink[];
  pageLinks: PageLink[];
}



