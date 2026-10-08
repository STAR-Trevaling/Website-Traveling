"use server";
import { revalidatePath } from "next/cache"; import { authenticatedFetch } from "@/lib/auth";
export type ActionState={ok:boolean;message:string};
async function messageFrom(response:Response,fallback:string){try{const body=await response.json(); return body?.error?.message||body?.detail||Object.values(body||{}).flat().join(' ')||fallback}catch{return fallback}}
export async function submitReview(place:string,rating:number,body:string):Promise<ActionState>{try{const r=await authenticatedFetch('/reviews/',{method:'POST',body:JSON.stringify({place,rating,body})}); if(!r.ok)return{ok:false,message:await messageFrom(r,'Could not submit review.')}; revalidatePath('/experiences'); return{ok:true,message:'Review published.'}}catch{return{ok:false,message:'Please sign in before reviewing.'}}}
export async function toggleFavorite(place:string):Promise<ActionState>{try{const list=await authenticatedFetch('/favorites/'); if(!list.ok)return{ok:false,message:'Could not load favorites.'}; const body=await list.json(); const rows=Array.isArray(body)?body:body.results||[]; const existing=rows.find((x:{place:string})=>x.place===place); const r=existing?await authenticatedFetch(`/favorites/${existing.id}/`,{method:'DELETE'}):await authenticatedFetch('/favorites/',{method:'POST',body:JSON.stringify({place})}); if(!r.ok)return{ok:false,message:await messageFrom(r,'Could not update favorite.')}; revalidatePath('/experiences'); return{ok:true,message:existing?'Removed from favorites.':'Saved to favorites.'}}catch{return{ok:false,message:'Please sign in to save favorites.'}}}
export async function submitPartnerApplication(input:{business_name:string;email:string;phone:string;website:string;message:string}):Promise<ActionState>{try{const r=await authenticatedFetch('/partner-applications/',{method:'POST',body:JSON.stringify(input)}); if(!r.ok)return{ok:false,message:await messageFrom(r,'Could not submit application.')}; return{ok:true,message:'Application submitted for review.'}}catch{return{ok:false,message:'Please sign in before applying.'}}}

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  destination?: string;
  tour?: string;
  travelDate?: string;
  guests?: string | number;
  message?: string;
  inquiry_type?: "consultation" | "tour_booking" | "general_support";
}

export async function submitInquiry(input: InquiryInput): Promise<ActionState> {
  const baseUrl = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";
  try {
    const payload = {
      full_name: input.name,
      email: input.email,
      phone: input.phone,
      destination_slug: input.destination || "",
      tour_slug: input.tour || "",
      travel_date: input.travelDate ? input.travelDate : null,
      guests: Number(input.guests || 1),
      message: input.message || "",
      inquiry_type: input.inquiry_type || (input.tour ? "tour_booking" : "consultation"),
      source: "website",
    };
    const r = await fetch(`${baseUrl}/inquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      return { ok: false, message: await messageFrom(r, "Could not submit inquiry.") };
    }
    return { ok: true, message: "Inquiry submitted successfully." };
  } catch (err) {
    return { ok: false, message: "Network connection error. Please try again." };
  }
}
