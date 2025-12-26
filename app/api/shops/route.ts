import { NextResponse } from "next/server";
import { Shop } from "@/types";

export const dynamic = "force-dynamic";

const shopsData: Shop[] = [
  {
    id: "1",
    name: "Jornalis Junction (Under-G)",
    address: "UnderG Area, Ogbomoso, Oyo State",
    phone: "08061154835",
    services: ["Gas Refill", "Oil", "POS", "phone accesoriess", "Solar Pickup"],
    hasGas: true,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.3575857394369!2d4.262613328514675!3d8.159323627019127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370d00345597ff%3A0x84cfe0dfb9e40f99!2sSahnaf%20Global%20Tech!5e0!3m2!1sen!2sng!4v1766671519746!5m2!1sen!2sng",
  },
  {
    id: "2",
    name: "Opposite Anbode Filling Station",
    address: "Randa Area, Ogbomoso, Oyo State",
    phone: "08032580975",
    services: ["Solar Consults", "Tech Pickup", "POS"],
    hasGas: false,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947.4976989608405!2d4.228605665229266!3d8.136903045764882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103713ce14357323%3A0x91aef1b44edb59ed!2sSAHNAF%20GLOBAL%20TECH!5e0!3m2!1sen!2sng!4v1766684295434!5m2!1sen!2sng",
  },
];

export async function GET() {
  return NextResponse.json(shopsData);
}
