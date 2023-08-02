import MembershipTile from "../components/MembershipTile";
import { MembershipTier } from "../lib/types";

export default function Memberships(props: {
  tiers: MembershipTier[]
}) {
  return <div className="tiled">
    {props.tiers.map((membership, index) => {
      return <MembershipTile key={index} {...membership} />
    })}
  </div> 
}

