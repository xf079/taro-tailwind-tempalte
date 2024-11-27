import { CSSTransition } from 'react-transition-group';
import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

export enum TransitionName {
  Fade = 'fade',
  SlideUp = 'slide-up',
  SlideDown = 'slide-down',
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right'
}

export type TransitionNameType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

export interface TransitionProps {
  open: boolean;
  name?: TransitionNameType;
  duration?: number;
  appear?: boolean;
  /**
   * By default, the child component is mounted immediately along with the
   * parent Transition component. If you want to "lazy mount" the component on
   * the first `in={true}` you can set `mountOnEnter`. After the first enter
   * transition the component will stay mounted, even on "exited", unless you
   * also specify `unmountOnExit`.
   */
  mountOnEnter?: boolean | undefined;

  /**
   * By default, the child component stays mounted after it reaches the
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
  const { open, name = 'fade', duration = 300, children, ...restProps } = props;

  const nodeRef = useRef(null);

  const classNames = useMemo(() => {
    switch (name) {
      case TransitionName.Fade:
        return {
          appearActive: 'animate-fade-in fill-mode-both',
          enterActive: `animate-fade-in fill-mode-both`,
          exitActive: `animate-fade-out fill-mode-both`
        };
      case TransitionName.SlideUp:
        return {
          appearActive: 'animate-slide-up-enter fill-mode-both',
          enterActive: `animate-slide-up-enter fill-mode-both`,
          exitActive: `animate-slide-up-exit fill-mode-both`
        };
      case TransitionName.SlideDown:
        return {
          appearActive: `animate-slide-down-enter fill-mode-both`,
          enterActive: `animate-slide-down-enter fill-mode-both`,
          exitActive: `animate-slide-down-exit fill-mode-both`
        };
      case TransitionName.SlideLeft:
        return {
          appearActive: `animate-slide-left-enter fill-mode-both`,
          enterActive: `animate-slide-left-enter fill-mode-both`,
          exitActive: `animate-slide-left-exit fill-mode-both`
        };
      case TransitionName.SlideRight:
        return {
          appearActive: `animate-slide-right-enter fill-mode-both`,
          enterActive: `animate-slide-right-enter fill-mode-both`,
          exitActive: `animate-slide-right-exit fill-mode-both`
        };
      default:
        return {
          appearActive: 'animate-fade-in fill-mode-both',
          enterActive: `animate-fade-in fill-mode-both`,
          exitActive: `animate-fade-out fill-mode-both`
        };
    }
  }, [name]);

  const getChildren = useCallback(() => {
    if (Array.isArray(children) || !React.isValidElement(children)) {
      return null;
    }
    // @ts-ignore
    return React.cloneElement(children, { ref: nodeRef });
  }, [children]);

  return (
    <CSSTransition
      in={open}
      nodeRef={nodeRef}
      timeout={duration}
      appear
      mountOnEnter
      unmountOnExit
      style={`--duration: ${duration}ms;`}
      classNames={classNames}
      {...restProps}
    >
      {getChildren()}
    </CSSTransition>
  );
};
