import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";

AWSMock.setSDKInstance(AWS);
AWSMock.mock("SQS", "listQueues", () => Promise.resolve());
AWSMock.mock("SQS", "sendMessage", () => Promise.resolve());

import { Models } from "@email-service/commons";
import { getEmailHistory } from "../../src/controllers";

describe("controllers/getEmailHistory", () => {
  test("404", async () => {
    const spy = jest
      .spyOn(Models.EmailHistory, "findAll")
      .mockResolvedValueOnce(null);

    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await getEmailHistory(
      {
        params: { id: 100 },
      },
      res
    );

    expect(spy).toHaveBeenCalledWith({
      where: { emailId: 100 },
    });
    expect(spy).toHaveBeenCalledTimes(1);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ errors: "Email not found." });

    spy.mockRestore();
  });

  test("Success: return email histories record in response", async () => {
    const EMAIL_HISTORY_RECORD = [
      {
        id: "2",
        emailId: "100",
        provider: "ELASTIC_EMAIL",
        status: "SUCCESS",
        response: '"1c14117c-499c-013b-e07c-ad6d73dcf194"',
        createdAt: "2021-10-16T02:46:16.000Z",
        updatedAt: "2021-10-16T02:46:16.000Z",
      },
      {
        id: "1",
        emailId: "100",
        provider: null,
        status: "PROCESSING",
        response: null,
        createdAt: "2021-10-16T02:46:14.000Z",
        updatedAt: "2021-10-16T02:46:14.000Z",
      },
    ];

    const spy = jest
      .spyOn(Models.EmailHistory, "findAll")
      .mockResolvedValueOnce(EMAIL_HISTORY_RECORD);

    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await getEmailHistory(
      {
        params: { id: 100 },
      },
      res
    );

    expect(spy).toHaveBeenCalledWith({
      where: { emailId: 100 },
    });
    expect(spy).toHaveBeenCalledTimes(1);

    expect(res.json).toBeCalledWith(EMAIL_HISTORY_RECORD);

    spy.mockRestore();
  });
});
