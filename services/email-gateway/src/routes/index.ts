import { router as emailRouter } from "./submitEmail";

export function initEmailRoutes(app: any) {
    app.use("/api", emailRouter)
}