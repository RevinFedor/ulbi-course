export interface SideBarItemType {
  path: string;
  text: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  authOnly?: boolean;
}
