export type AuthorizationResponseV2Type =
    | {
          access_token: string
          refresh_token: string
          type: "Success"
      }
    | {
          request_id: string
          type: "RequireTwoFactor"
      }
