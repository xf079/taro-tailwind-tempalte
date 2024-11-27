import { FunctionComponent } from 'react';

export const WrapperHoc = (Page: FunctionComponent) => (props: any) => (
  <Page {...props} />
);
