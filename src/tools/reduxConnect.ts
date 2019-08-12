import * as React from 'react';
import {
  connect as originalConnect,
  MapStateToPropsParam,
  MergeProps,
  Options,
} from 'react-redux';
import { AppState } from '../store/store';

export interface IDisPatchProps {
  [key: string]: (...args: any[]) => any;
}

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>
>(
  component: TComponent,
) => TComponent;

export interface IConnectProps {
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, AppState>,
    mapDispatchToProps?: IDisPatchProps,
  ): InferableComponentEnhancerWithProps<
    TStateProps & TDispatchProps,
    TOwnProps
  >;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, AppState>,
    mapDispatchToProps?: IDisPatchProps,
    mergeProps?: MergeProps<
      TStateProps,
      TDispatchProps,
      TOwnProps,
      TMergedProps
    >,
    options?: Options<TStateProps, TOwnProps, TMergedProps>,
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
}

// declare module 'react-redux' {
//   // tslint:disable-next-line
//   interface Connect extends IConnectProps {}
// }

export const myConnect = originalConnect as IConnectProps;
