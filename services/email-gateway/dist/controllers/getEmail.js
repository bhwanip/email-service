"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmail = void 0;
const commons_1 = require("@email-service/commons");
function getEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: emailId } = req.params;
        console.log("=======>", emailId);
        const email = yield commons_1.DAO.Email.findByPk(emailId);
        if (!email) {
            return res.status(404).json({ errors: "Email not found." });
        }
        return res.json(email);
    });
}
exports.getEmail = getEmail;
//# sourceMappingURL=getEmail.js.map