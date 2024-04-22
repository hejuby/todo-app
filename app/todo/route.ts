import { NextRequest, NextResponse } from "next/server";
import { getTodoList } from "#db/todo";

export async function GET(_: NextRequest) {
    const data = await getTodoList();
    return NextResponse.json(data);
}
