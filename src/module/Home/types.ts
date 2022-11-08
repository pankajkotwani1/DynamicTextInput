export interface IJobItemProps {
  id: string;
  title: string;
  slug: string;
  commitment: Commitment;
  cities: City[];
  countries: Country[];
  remotes: Remote[];
  description?: string;
  applyUrl?: string;
  company?: Company;
  tags: Tag[];
  isPublished?: boolean;
  isFeatured: boolean;
  locationNames: string;
  userEmail: string;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
}
