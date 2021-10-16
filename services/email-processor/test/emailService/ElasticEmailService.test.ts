jest.mock("../../src/historyTracker", () => ({
  on: jest.fn(),
}));

import { ElasticEmailService } from "../../src/emailService/ElasticEmailService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
});

describe("emailService/ElasticEmailService", () => {
  test("Should send email", () => {
    const testService = new ElasticEmailService();

    const input = {
      id: "100",
      to: "to1@abc.com;to2@abc.com",
      from: "from@abc.com",
      body: "Text",
      subject: "Subject",
    };

    testService.sendEmail(input);

    const requestStr =
      "api_key=0E164F82A09EE27C783CA883E06F55D6E7D2F5D6253068254EA3432C5E5C730903C242BF3A3246C6578F913B80EB96B8&username=puneet11.dce%40gmail.com&from=from%40abc.com&msgTo=to1%40abc.com%3Bto2%40abc.com&subject=Subject&body_text=Text";

    expect(mockAxios.post).toHaveBeenCalledWith("/v2/email/send", requestStr, {
      timeout: 3000,
      headers: {
        "Content-Length": String(requestStr.length),
      },
    });

    mockAxios.post.mockResolvedValue({
      data: { success: true },
    });
  });
});
