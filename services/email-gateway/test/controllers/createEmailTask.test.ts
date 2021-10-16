const mockValidationResultIsEmpty = jest.fn();

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: mockValidationResultIsEmpty
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true),
    array: jest.fn(() => ["Error Message"]),
  })),
}));

import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";

AWSMock.setSDKInstance(AWS);
AWSMock.mock("SQS", "listQueues", () => Promise.resolve());
AWSMock.mock("SQS", "sendMessage", () => Promise.resolve());

import { Models } from "@email-service/commons";
import { createEmailTask } from "../../src/controllers";

describe("controllers/createEmailTask", () => {
  test("422 for invalid input", async () => {
    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const req = Object.create(null);

    await createEmailTask(req, res);

    expect(res.status).toBeCalledWith(422);
    expect(res.json).toBeCalledWith({ errors: ["Error Message"] });
  });

  test("Success: Email submitted", async () => {
    const spy = jest
      .spyOn(Models.Email, "create")
      .mockResolvedValue({ id: 100 });

    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const req = {
      body: { to: "to@abc.com", from: "from@abc.com", body: "Text" },
    };

    await createEmailTask(req, res);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(res.status).toBeCalledWith(202);
    expect(res.json).toBeCalledWith({ id: 100 });
  });
});
