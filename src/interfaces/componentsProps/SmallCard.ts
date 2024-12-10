export interface SmallCardProps {
  image: string;
  id: string;
  name: string;
  status: string;
  species: string;
  location: { name: string };
  episode: {name: string}[];
}