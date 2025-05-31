"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSockit = exports.SockitProvider = void 0;
// Main entrypoint for @sockit/client
var SockitProvider_1 = require("./SockitProvider");
Object.defineProperty(exports, "SockitProvider", { enumerable: true, get: function () { return __importDefault(SockitProvider_1).default; } });
var useSockit_1 = require("./useSockit");
Object.defineProperty(exports, "useSockit", { enumerable: true, get: function () { return __importDefault(useSockit_1).default; } });
