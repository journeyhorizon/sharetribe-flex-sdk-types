/// <reference types="express" />
import * as express from "express";

export interface ITokenStore {
  getToken(): any;
  setToken(data: any): void | Promise<void>;
  removeToken(): void | Promise<void>;
}

export function browserCookieStore(params: {
  clientId: string;
  secure?: boolean;
}): ITokenStore;

export function expressCookieStore(params: {
  clientId: string;
  secure?: boolean;
  req: express.Request;
  res: express.Response;
}): ITokenStore;

export function memoryStore(): ITokenStore;
