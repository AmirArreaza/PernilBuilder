import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the intial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store token after login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_START_SUCCESS,
          idToken: "some val",
          userId: "some id",
        }
      )
    ).toEqual({
      token: "some val",
      userId: "some id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
