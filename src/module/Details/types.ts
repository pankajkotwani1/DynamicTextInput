export type RouteParams = {
  jobDetails: {
    id: string;
    title: string;
    slug: string;
    commitment: Commitment;
    description?: string;
    applyUrl?: string;
    locationNames: string;
    userEmail: string;
    company: Company;
  };
};
