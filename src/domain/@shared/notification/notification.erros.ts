import e from "express";
import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
    constructor(public erros: NotificationErrorProps[]) {
        super(erros.map(erro =>`${erro.context}: ${erro.message}`).join(","));
    }
}