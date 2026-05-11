import { StatisticsResponse, TicketsResponse, TicketResponse } from "@/types";

const APP_URI = process.env.NEXT_PUBLIC_APP_URI || "http://localhost:3000";

export const getStatistics = async (): Promise<StatisticsResponse> => {
    const res = await fetch(`${APP_URI}/api/statistics`);
    return res.json();
}

export const getTickets = async (): Promise<TicketsResponse> => {
    const res = await fetch(`${APP_URI}/api/tickets`);
    return res.json();
}

export const createTicket = async (ticketData: { title: string; description: string }) => {
    const res = await fetch(`${APP_URI}/api/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
    });
    return res.json();
}

export const deleteTicket = async (id: string) => {
    const res = await fetch(`${APP_URI}/api/tickets/${id}`, {
        method: "DELETE",
    });
    return res.json();
}

export const getTicketById = async (id: string): Promise<TicketResponse> => {
    const res = await fetch(`${APP_URI}/api/tickets/${id}`);
    return res.json();
}



