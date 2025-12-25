import { NextResponse } from "next/server";
import { Shop } from "@/types";

const shopsData: Shop[] = [
  {
    id: "1",
    name: "Jornalis Junction (Under-G)",
    address: "UnderG Area, Ogbomoso, Oyo State",
    phone: "08032580975",
    services: ["Gas Refill", "Oil", "POS", "Tech Products", "Solar Pickup"],
    hasGas: true,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d987.357619408702!2d4.262792!3d8.15931!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1766591684285!5m2!1sen!2sng",
  },
  {
    id: "2",
    name: "Opposite Anbode Filling Station",
    address: "Randa Area, Ogbomoso, Oyo State",
    phone: "08161154835",
    services: ["Solar Consults", "Tech Pickup", "POS"],
    hasGas: false,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6514888351066!2d4.228969499999999!3d8.1369169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103713ce14357323%3A0x91aef1b44edb59ed!2sSAHNAF%20GLOBAL%20TECH!5e0!3m2!1sen!2sng!4v1766588087593!5m2!1sen!2sng",
  },
];

export async function GET() {
  return NextResponse.json(shopsData);
}
