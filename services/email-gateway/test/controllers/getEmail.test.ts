import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

AWSMock.setSDKInstance(AWS);
AWSMock.mock("SQS", "listQueues", () => Promise.resolve());
AWSMock.mock("SQS", "sendMessage", () => Promise.resolve());

import { Models } from "@email-service/commons";
import { getEmail } from "../../src/controllers";

describe("controllers/getEmail", () => {
  test("404", async () => {
    const spy = jest
      .spyOn(Models.Email, "findByPk")
      .mockResolvedValueOnce(null);

    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await getEmail(
      {
        params: { id: 100 },
      },
      res
    );

    expect(spy).toHaveBeenCalledWith(100);
    expect(spy).toHaveBeenCalledTimes(1);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ errors: "Email not found." });

    spy.mockRestore();
  });

  test("Success: return email record in response", async () => {
    const EMAIL_RECORD = {
      id: 100,
      to: "abc@gmail.com",
      from: "xyz@gmail.com",
      body: "Text",
      createdAt: "2021-10-16T02:46:08.000Z",
      updatedAt: "2021-10-16T02:46:16.000Z",
    };

    const spy = jest
      .spyOn(Models.Email, "findByPk")
      .mockResolvedValueOnce(EMAIL_RECORD);

    const res = Object.create(null);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await getEmail(
      {
        params: { id: 100 },
      },
      res
    );

    expect(spy).toHaveBeenCalledWith(100);
    expect(spy).toHaveBeenCalledTimes(1);

    expect(res.json).toBeCalledWith(EMAIL_RECORD);

    spy.mockRestore();
  });
});
