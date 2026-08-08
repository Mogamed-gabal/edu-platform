"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
const nodemailer = __importStar(require("nodemailer"));
const otp_email_template_1 = require("./templets/otp-email.template");
const reset_password_email_template_1 = require("./templets/reset-password-email.template");
const email_type_enum_1 = require("../enums/email-type.enum");
let mailService = class mailService {
    config;
    emailQueue;
    transporter;
    sender;
    constructor(config, emailQueue) {
        this.config = config;
        this.emailQueue = emailQueue;
        const host = this.config.get('mailtrap.host');
        const port = this.config.get('mailtrap.port');
        const user = this.config.get('mailtrap.user');
        const pass = this.config.get('mailtrap.pass');
        const email = this.config.get('mailtrap.senderEmail') || 'info@eduplatform.com';
        const name = this.config.get('mailtrap.senderName') || 'Edu Platform';
        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: { user, pass },
        });
        this.sender = { address: email, name };
    }
    async sendOtpToTheQueue(email, otp, type = email_type_enum_1.EmailType.VERIFICATION) {
        await this.emailQueue.add('send-otp', { email, otp, type });
    }
    async sendOtpEmailDirectly(toEmail, otp) {
        await this.transporter.sendMail({
            from: `"${this.sender.name}" <${this.sender.address}>`,
            to: toEmail,
            subject: 'Verification Code - Edu Platform',
            html: (0, otp_email_template_1.getOtpEmailTemplate)(otp),
        });
    }
    async sendResetPasswordEmailDirectly(toEmail, otp) {
        await this.transporter.sendMail({
            from: `"${this.sender.name}" <${this.sender.address}>`,
            to: toEmail,
            subject: 'Reset Your Password - Edu Platform',
            html: (0, reset_password_email_template_1.getResetPasswordEmailTemplate)(otp),
        });
    }
};
exports.mailService = mailService;
exports.mailService = mailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_2.InjectQueue)('email-queue')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        bullmq_1.Queue])
], mailService);
//# sourceMappingURL=mail.service.js.map