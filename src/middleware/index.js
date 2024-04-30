import { sequence } from "astro:middleware";
import { auth } from './auth.js';
import { log } from './log.js';
import {MiddlewareFilter} from './MiddlewareFilter.js';

const loggingMiddleware = new MiddlewareFilter("*", log).onRequest;
const authMiddleware = new MiddlewareFilter("!/auth*", auth).onRequest;

export const onRequest = sequence(loggingMiddleware, authMiddleware);
