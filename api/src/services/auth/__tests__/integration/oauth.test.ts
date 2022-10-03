import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import fetch, { Response as _Response } from "node-fetch";
import { container as _container } from "tsyringe";

import { CoreTypes } from "@/core";
import prisma from "@/lib/prisma";
import { IUserRepository, Types as RepositoryTypes } from "@/repositories";
import UserRepository from "@/repositories/users";
import { Types as ServiceTypes } from "@/services";
import AuthService from "@/services/auth";
import { IAuthService, IUserService } from "@/services/interfaces";
import UserService from "@/services/users";

import { setupMocks } from "../__mocks__/feide";

import { OAuthCase } from "./interfaces";

const { Response: ActualResponse } = jest.requireActual<{
  Response: typeof _Response;
}>("node-fetch");

jest.mock("node-fetch");

const container = _container.createChildContainer();

describe("OAuth", () => {
  beforeAll(() => {
    container.register<IUserService>(ServiceTypes.UserService, { useClass: UserService });
    container.register<IUserRepository>(RepositoryTypes.UserRepository, { useClass: UserRepository });
    container.register<IAuthService>(ServiceTypes.AuthService, { useClass: AuthService });
    container.register<PrismaClient>(CoreTypes.Prisma, { useValue: prisma });
  });

  beforeEach(() => {
    const db = container.resolve<PrismaClient>(CoreTypes.Prisma);
    db.user.delete({
      where: {
        id: "new_id",
      },
    });

    db.user.upsert({
      where: {
        id: "existing_id",
      },
      update: {
        username: "new",
        feideId: "new_id",
        firstName: "first",
        lastName: "last",
        email: "new@example.com",
      },
      create: {
        username: "new",
        feideId: "new_id",
        firstName: "first",
        lastName: "last",
        email: "new@example.com",
      },
    });
  });

  const cases: OAuthCase[] = [
    {
      name: "should create a new user if one does not exist",
      responses: {
        token: {
          status: 200,
          data: {
            access_token: "access_token",
            id_token: "id_token",
          },
        },
        userInfo: {
          status: 200,
          data: {
            sub: "new_id",
            name: "first last",
            "dataporten-userid_sec": ["new@ntnu.no"],
            email: "new@example.com",
          },
        },
      },
      expected: {
        username: "new",
        feideId: "new_id",
        firstName: "first",
        lastName: "last",
        email: "new@example.com",
      },
    },
    {
      name: "should fetch an existing user",
      responses: {
        token: {
          status: 200,
          data: {
            access_token: "access_token",
            id_token: "id_token",
          },
        },
        userInfo: {
          status: 200,
          data: {
            sub: "existing_id",
            name: "first last",
            "dataporten-userid_sec": ["existing@ntnu.no"],
            email: "existing@example.com",
          },
        },
      },
      expected: {
        username: "existing",
        feideId: "existing_id",
        firstName: "first",
        lastName: "last",
        email: "existing@example.com",
      },
    },
  ];
  test.each(cases)("authentication - $name", async ({ responses, expected }) => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockImplementation((url) => {
      const { json, status } = setupMocks(url, responses);
      const res = new ActualResponse(undefined, { status });
      res.json = json;
      return Promise.resolve(res);
    });

    const auth = container.resolve<IAuthService>(ServiceTypes.AuthService);
    const { username, feideId, firstName, lastName, email } = await auth.getUser({
      code: "code",
      codeVerifier: "verifier",
    });

    expect({ username, feideId, firstName, lastName, email }).toEqual(expected);
  });
});
