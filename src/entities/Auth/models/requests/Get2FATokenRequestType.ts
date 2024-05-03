export type Get2FATokenRequestType =
    | {
          type: "RequestCode"
      }
    | {
          code: string
          type: "SendVerifyCode"
      }
