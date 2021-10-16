jest.mock("../../src/historyTracker", () => ({
  on: jest.fn(),
}));

import mockAxios from "jest-mock-axios";
import { SendGridService } from "../../src/emailService/SendGridService";

afterEach(() => {
  mockAxios.reset();
});

describe("emailService/SendGridService", () => {
  test("Should send email", () => {
    const testService = new SendGridService();

    const input = {
      id: "100",
      to: "to1@abc.com;to2@abc.com",
      from: "from@abc.com",
      body: "Text",
      subject: "Subject",
    };

    testService.sendEmail(input);

    expect(mockAxios.post).toHaveBeenCalledWith(
      "/v3/mail/send",
      {
        personalizations: [
          {
            to: [
              {
                email: "to1@abc.com",
              },
              {
                email: "to2@abc.com",
              },
            ],
          },
        ],
        from: { email: "from@abc.com" },
        subject: "Subject",
        content: [
          {
            type: "text/plain",
            value: "Text",
          },
        ],
      },
      {
        timeout: 3000,
      }
    );

    mockAxios.post.mockResolvedValue({
      data: "some data",
    });
  });
});
