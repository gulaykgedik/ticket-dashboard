
import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../../models/ticket";

interface Params {
    params:Promise<{id:string}>
}

export async function GET(request: Request, { params }: Params) {
    try {
        await connectMongo();
        // id parametresini almak için url'den id'yi çekelim

        const { id } = await params;

        const ticket = await Ticket.findById(id);
        if (!ticket) throw Error("Ticket bulunamadı");
       
        return res.json({message: "Ticketler getirildi", ticket}, {status: 200})
    } catch (error) {
        return res.json({message: "Ticketler getirilirken bir hata oluştu", error: error}, {status: 400})
    }
}


export async function DELETE(request: Request, { params }: Params) {
    try {
        await connectMongo();

        const { id } = await params;

     const ticket = await Ticket.findByIdAndDelete(id);

     if (!ticket) throw Error("Ticket bulunamadı");
        return res.json({message: "Ticketler silindi", ticket}, {status: 200})
    } catch (error) {
        return res.json({message: "Ticketler silinirken bir hata oluştu", error: error}, {status: 400})
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        await connectMongo();

        const { id } = await params;

        const body = (await request.json()) as ITicket;

        const updatedTicket = await Ticket.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTicket) throw Error("Ticket bulunamadı");
        
        return res.json({message: "Ticketler güncellendi", ticket: updatedTicket}, {status: 200})
    } catch (error) {
        return res.json({message: "Ticketler güncellenirken bir hata oluştu", error: error}, {status: 400})
    }
}
