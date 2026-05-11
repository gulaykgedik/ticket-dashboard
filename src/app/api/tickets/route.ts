
import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../../api/models/ticket";




export async function POST(request: Request) {
 try {
  await connectMongo();

  const body = await request.json() as ITicket;

  const newTicket = await new Ticket(body).save();
   return res.json({message: "Ticket oluşturuldu", ticket: newTicket}, {status: 200})
 } catch (error) {
 
    return res.json({message: "Ticket oluşturulurken bir hata oluştu", error: error}, {status: 400})
  };
}

export async function GET(request: Request) {
    try {
      await connectMongo();

      const tickets = await Ticket.find();
        return res.json({message: "Ticketler getirildi", tickets: tickets}, {status: 200})
    } catch (error) {
        return res.json({message: "Ticketler getirilirken bir hata oluştu", error: error}, {status: 400})
    }
}

