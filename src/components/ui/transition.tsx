import { CSSTransition } from 'react-transition-group';
import { FC, ReactNode, useMemo } from 'react';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

export enum TransitionName {
  Fade = 'fade',
  FadeUp = 'fade-up',
  FadeDown = 'fade-down',
  FadeLeft = 'fade-left',
  FadeRight = 'fade-right',
  SlideUp = 'slide-up',
  SlideDown = 'slide-down',
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right'
}

export type TransitionNameType =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

export interface TransitionProps {
  open: boolean;
  name?: TransitionNameType;
  timeout?:
    | number
    | {
        appear?: number | undefined;
        enter?: number | undefined;
        exit?: number | undefined;
      };
  /**
   * By default the child component is mounted immediately along with the
   * parent Transition component. If you want to "lazy mount" the component on
   * the first `in={true}` you can set `mountOnEnter`. After the first enter
   * transition the component will stay mounted, even on "exited", unless you
   * also specify `unmountOnExit`.
   */
  mountOnEnter?: boolean | undefined;

  /**
   * By default the child component stays mounted after it reaches the
   * 'exited' state. Set `unmountOnExit` if you'd prefer to unmount the
   * component after it finishes exiting.
   */
  unmountOnExit?: boolean | undefined;

  /**
   * Callback fired before the "entering" status is applied. An extra
   * parameter `isAppearing` is supplied to indicate if the enter stage is
   * occurring on the initial mount
   */
  onEnter?: EnterHandler<HTMLElement> | undefined;

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * isAppearing is supplied to indicate if the enter stage is occurring on
   * the initial mount
   */
  onEntering?: EnterHandler<HTMLElement> | undefined;

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * isAppearing is supplied to indicate if the enter stage is occurring on
   * the initial mount
   */
  onEntered?: EnterHandler<HTMLElement> | undefined;

  /**
   * Callback fired before the "exiting" status is applied.
   */
  onExit?: ExitHandler<HTMLElement> | undefined;

  /**
   * Callback fired after the "exiting" status is applied.
   */
  onExiting?: ExitHandler<HTMLElement> | undefined;

  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?: ExitHandler<HTMLElement> | undefined;
  children?: ReactNode;
}

export const Transition: FC<TransitionProps> = (props) => {
  const { open, name = 'fade', timeout = 300, children, ...restProps } = props;
  const classNames = useMemo(() => {
    switch (name) {
      case TransitionName.Fade:
        return {
          enter: 'opacity-0',
          enterActive: `transition-opacity duration-300 opacity-100`,
          exitActive: `transition-opacity duration-300 opacity-0`
        };
      case TransitionName.FadeUp:
        return {
          appear: 'translate-y-8 opacity-0',
          enter: 'translate-y-8 opacity-0',
          enterActive: `transition-all duration-300 translate-y-0! opacity-100!`,
          exitActive: `transition-all duration-300 translate-y-8 opacity-0`
        };
      case TransitionName.FadeDown:
        return {
          enter: '-translate-y-8 opacity-0',
          enterActive: `transition-all duration-300 -translate-y-0 opacity-100`,
          exitActive: `transition-all duration-300 translate-y-8 opacity-0`
        };
      case TransitionName.FadeLeft:
        return {
          enter: 'translate-x-8 opacity-0',
          enterActive: `transition-all duration-300 translate-x-0 opacity-100`,
          exitActive: `transition-all duration-300 translate-x-8 opacity-0`
        };
      case TransitionName.FadeRight:
        return {
          enter: '-translate-x-8 opacity-0',
          enterActive: `transition-all duration-300 -translate-x-0 opacity-100`,
          exitActive: `transition-all duration-300 -translate-x-8 opacity-0`
        };
      case TransitionName.SlideUp:
        return {
          enter: 'translate-y-full',
          enterActive: `transition-all duration-300 translate-y-0`,
          exitActive: `transition-all duration-300 translate-y-full`
        };
      case TransitionName.SlideDown:
        return {
          enter: '-translate-y-full',
          enterActive: `transition-all duration-300 -translate-y-0`,
          exitActive: `transition-all duration-300 -translate-y-full`
        };
      case TransitionName.SlideLeft:
        return {
          enter: 'translate-x-full',
          enterActive: `transition-all duration-300 translate-x-0`,
          exitActive: `transition-all duration-300 -translate-x-full`
        };
      case TransitionName.SlideRight:
        return {
          enter: '-translate-x-full',
          enterActive: `transition-all duration-300 -translate-x-0`,
          exitActive: `transition-all duration-300 -translate-x-full`
        };
      default:
        return {
          enter: 'opacity-0',
          enterActive: `transition-opacity duration-300 opacity-100`,
          exitActive: `transition-opacity duration-300 opacity-0`
        };
    }
  }, [name]);
  return (
    <CSSTransition
      in={open}
      timeout={timeout}
      classNames={classNames}
      appear
      unmountOnExit
      mountOnEnter
      {...restProps}
      children={children}
    />
  );
};
