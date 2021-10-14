"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESAdapter = void 0;
class SESAdapter {
    static toSESRequest(input) {
        const { to, from, subject, body } = input;
        return {
            Source: from,
            Destination: { ToAddresses: to.split(",") },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Text: {
                        Data: body,
                    },
                },
            },
        };
    }
}
exports.SESAdapter = SESAdapter;
//# sourceMappingURL=SESAdapter.js.map