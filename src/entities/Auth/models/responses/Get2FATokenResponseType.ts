export type Get2FATokenResponseType =
    | {
          type: "RequireVerifyCode"
      }
    | {
          token: string
          type: "Success"
      }
