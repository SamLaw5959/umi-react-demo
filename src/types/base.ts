import React,{ReactNode} from 'react';

export type IProps ={
  children?: ReactNode;
  readonly history: IHistory;
  readonly location: ILocation;
  readonly match: IMatch;
  route: IRoute;
  routes: IRoute;
  staticContext: unknown;
  wrappers?:string[];
}

export interface IGeneralObj {
  [key: string]: any;
}

export interface IHistory {
  go: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
  push: (path: string, state?: unknown) => void;
  replace: (path: string, state?: unknown) => void;
  location: Partial<ILocation>;
}

export interface ILocation {
  readonly hash: string;
  readonly key: string;
  readonly pathname: string;
  readonly query: IGeneralObj;
  readonly search: string;
  readonly state: any;
}

type IMatch = {
  readonly isExact: boolean;
  readonly params: IGeneralObj;
  readonly path: string;
  readonly url: string;
};

export type IRoute = IrouteObj[];
export interface IrouteObj {
  path: string;
  exact?: boolean;
  component: React.FC;
  routes: IrouteObj[];
}

export type IdispatchParmas = {
    type:string,
    payload:unknown
}


