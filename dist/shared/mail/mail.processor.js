"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const email_type_enum_1 = require("../enums/email-type.enum");
let MailProcessor = MailProcessor_1 = class MailProcessor extends bullmq_1.WorkerHost {
    mailService;
    logger = new common_1.Logger(MailProcessor_1.name);
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async process(job) {
        this.logger.log(`Processing job [${job.id}] of type [${job.name}] for email: ${job.data.email}`);
        switch (job.name) {
            case 'send-otp': {
                const { email, otp, type } = job.data;
                try {
                    if (type === email_type_enum_1.EmailType.RESET_PASSWORD) {
                        await this.mailService.sendResetPasswordEmailDirectly(email, otp);
                    }
                    else {
                        await this.mailService.sendOtpEmailDirectly(email, otp);
                    }
                    this.logger.log(`Successfully sent ${type || 'verification'} OTP email to: ${email}`);
                }
                catch (error) {
                    this.logger.error(`Failed to send OTP email to ${email}:`, error);
                    throw error;
                }
                break;
            }
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }
};
exports.MailProcessor = MailProcessor;
exports.MailProcessor = MailProcessor = MailProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('email-queue', {
        concurrency: 50,
        limiter: {
            max: 100,
            duration: 1000,
        },
    }),
    __metadata("design:paramtypes", [mail_service_1.mailService])
], MailProcessor);
//# sourceMappingURL=mail.processor.js.map