"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridAdapter = void 0;
const mapToSendGridList = (emailsString, delimiter) => {
    return emailsString.split(delimiter).map((val) => ({
        email: val,
    }));
};
class SendGridAdapter {
    static toSendGridRequest(input) {
        const { to, delimiter, from, cc, bcc, subject, body } = input;
        const sendGridTo = mapToSendGridList(to, delimiter);
        const sendGridCC = cc && mapToSendGridList(cc, delimiter);
        const sendGridBCC = bcc && mapToSendGridList(bcc, delimiter);
        const sendGridFrom = { email: from };
        return {
            personalizations: [
                {
                    to: sendGridTo,
                    cc: sendGridCC,
                    bcc: sendGridBCC,
                },
            ],
            from: sendGridFrom,
            subject,
            content: [
                {
                    type: "text/plain",
                    value: body,
                },
            ],
        };
    }
}
exports.SendGridAdapter = SendGridAdapter;
//# sourceMappingURL=SendGridAdapter.js.map