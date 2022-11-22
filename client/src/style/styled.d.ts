import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      body: string;
      footer: string;
      white: string;
      black: string;
      lightBlack: string;
      gray: string;
      lightGray: string;
      purple: string;
      lightPurple: string;
      hoverPurple: string;
      membership: string;
    };
  }
}
