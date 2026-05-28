export interface CocClanMember {
  tag: string;
  name: string;
  role: string;
  townHallLevel: number;
  trophies: number;
}

export interface CocClan {
  tag: string;
  name: string;
  description: string;
  clanLevel: number;
  members: number;
  warLeague?: {
    name: string;
  };
  badgeUrls: {
    small: string;
    medium: string;
    large: string;
  };
  memberList: CocClanMember[];
}