"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.updateUserSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().min(3),
    password: zod_1.default.string().min(6)
});
exports.updateUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().min(4).optional(),
    password: zod_1.default.string().min(6).optional()
});
exports.createBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(4),
    imageLink: zod_1.default.string().min(2),
    content: zod_1.default.string().min(20)
});
exports.updateBlogSchema = zod_1.default.object({
    title: zod_1.default.string().min(4).optional(),
    imageLink: zod_1.default.string().min(2),
    content: zod_1.default.string().min(20).optional(),
});
