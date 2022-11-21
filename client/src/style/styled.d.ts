import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      footer: string;
      notfound: string;
      notfoundStrong: string;
    };
  }
}
