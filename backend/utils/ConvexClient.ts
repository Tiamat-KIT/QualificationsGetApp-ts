import { ConvexClient } from "convex/browser";

export default function OpenConvexClient() {
    return new ConvexClient(process.env["CONVEX_URL"]!)
}