import { screenType } from '../storeShapes';

type functionType = (...args: any) => any;

export function adaptDispatchToScreen(screen: screenType) {
  return <T extends functionType>(dispatchAction: T) => {
    return (args?: Omit<Parameters<T>[0], 'screen'>) => {
      return dispatchAction({
        ...args,
        screen,
      });
    };
  };
}
