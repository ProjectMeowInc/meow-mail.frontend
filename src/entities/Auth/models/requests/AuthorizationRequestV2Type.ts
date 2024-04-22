export type AuthorizationRequestV2Type =
    | {
          login: string
          password: string
          type: "Base"
      }
    | {
          code: string
          request_id: string
          type: "TwoFactor"
      }
